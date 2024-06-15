import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";
import prettier from "prettier";
import {
  MakePostLink,
  MakePostPage,
  MakeThreadPage,
  MakeWrapper,
  MakePostInThread,
  MakePageHead,
  MakeIndexHeader,
} from "./src/templateMakers";
import { chromium } from "playwright";

import { Browser, Page } from "playwright";
import { uploadFileToS3 } from "./upload_image";

const buildImages = false;

async function generateOgImage(page: Page, url: string, outputPath: string) {
  await page.goto(url, { waitUntil: "networkidle" });

  // Adjust the viewport size to the desired OG image size
  await page.setViewportSize({ width: 1000, height: 630 });

  await page.screenshot({ path: outputPath });
}

// Directory and file paths
const srcDir = "src";
const inputDir = "content/posts";
const outputDir = "dist";
const cssFile = "index.css";
const jsFile = "index.js";
const indexFile = "index.html";

async function checkReply({
  threads,
  visited,
  basename,
  level,
}: {
  threads: string[][];
  visited: string[];
  basename: string;
  level: number;
}) {
  const filePath = path.join(inputDir, basename + ".md");
  const text = await fs.readFile(filePath, "utf-8");
  const lines = text.split("\n");

  if (level !== 0 && !visited.includes(basename)) {
    threads[threads.length - 1].push(basename);
    visited.push(basename);
  }

  for (const line of lines) {
    if (line.startsWith("@reply")) {
      if (level === 0) threads.push([basename]);
      await checkReply({
        threads,
        visited,
        basename: line.split(" ")[1],
        level: level + 1,
      });
    }
  }
}

async function generateThreadContent({ thread }: { thread: string[] }) {
  let postsContent = "";

  for (const basename of thread.slice().reverse()) {
    const filePath = path.join(inputDir, basename + ".md");
    const text = await fs.readFile(filePath, "utf-8");

    const datePart =
      basename.match(
        /^([0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2})/,
      )?.[1] ?? "";
    const formattedDate = datePart.split("-").slice(0, 3).join("-");
    const formattedTime = datePart.split("-").slice(3, 6).join(":");

    const lines = text.split("\n").filter((line) => !line.startsWith("@reply"));
    const joined = lines.join("\n").trim();

    const generatedHtmlContent = execSync(`pandoc -f markdown-smart -t html`, {
      input: joined,
    }).toString();

    postsContent += MakePostInThread({
      formattedDate,
      formattedTime,
      htmlContent: generatedHtmlContent,
    });
  }
  postsContent += `<div style="height: 70vh"></div>`;

  const ThreadContent = MakeThreadPage({
    threadLength: thread.length,
    posts: postsContent,
  });

  const ThreadHead = MakePageHead({
    title: `Thread: ${thread[0]}`,
    description: "Thread",
    image_link: `https://grant-uploader.s3.amazonaws.com/og-images/t-${thread[0]}.png`,
  });

  const templateContentWrapped = MakeWrapper({
    head: ThreadHead,
    content: ThreadContent,
  });

  const formattedContent = await prettier.format(templateContentWrapped, {
    parser: "html",
  });

  return formattedContent;
}

async function saveThreadContent({
  thread,
  content,
}: {
  thread: string[];
  content: string;
}) {
  const threadBase = "t-" + thread[0];
  const dirName = path.join(outputDir, threadBase);
  await fs.mkdir(dirName, { recursive: true });
  await fs.writeFile(path.join(dirName, "index.html"), content);
}

function buildLookupTable({ threads }: { threads: string[][] }) {
  const lookup: Record<string, string[]> = {};

  for (const thread of threads) {
    const reversed = thread.slice().reverse();
    for (const basename of thread) {
      lookup[basename] = reversed;
    }
  }

  return lookup;
}

async function buildNonThreadPages({
  markdownFiles,
  lookup,
}: {
  markdownFiles: string[];
  lookup: Record<string, string[]>;
}) {
  for (const file of markdownFiles) {
    let optionalRedirect: string | null = null;
    if (lookup[path.basename(file, ".md")]) {
      const threadBase =
        "t-" +
        lookup[path.basename(file, ".md")][
        lookup[path.basename(file, ".md")].length - 1
        ];
      const destination = threadBase + "#" + path.basename(file, ".md");
      const content = `<script>function navigate() { window.location = '/${destination}' }; navigate();</script>`;
      optionalRedirect = content;
    }
    await buildStandalonePage({ file, optionalRedirect });
  }
}

async function buildStandalonePage({
  file,
  optionalRedirect,
}: {
  file: string;
  optionalRedirect: string | null;
}) {
  const basename = path.basename(file, ".md");
  const datePart =
    basename.match(
      /^([0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2})/,
    )?.[1] ?? "";
  const formattedDate = datePart.split("-").slice(0, 3).join("-");
  const formattedTime = datePart.split("-").slice(3, 6).join(":");

  const content = await fs.readFile(path.join(inputDir, file), "utf-8");
  const generatedHtmlContent = execSync(`pandoc -f markdown-smart -t html`, {
    input: content,
  }).toString();

  const excerpt = content.split("\n")[0];
  let postHeadContent = MakePageHead({
    title: `${formattedDate} ${formattedTime}`,
    description: excerpt,
    image_link: `https://grant-uploader.s3.amazonaws.com/og-images/${basename}`,
  });
  postHeadContent += optionalRedirect ?? "";
  const templateContentWrapped = MakeWrapper({
    head: postHeadContent,
    content: MakePostPage(formattedDate, formattedTime, generatedHtmlContent),
  });

  const formattedContent = await prettier.format(templateContentWrapped, {
    parser: "html",
  });
  const dirName = path.join(outputDir, basename);
  await fs.mkdir(dirName, { recursive: true });
  await fs.writeFile(path.join(dirName, "index.html"), formattedContent);
}

async function generateIndexContent({
  markdownFiles,
  lookup,
}: {
  markdownFiles: string[];
  lookup: Record<string, string[]>;
}) {
  let postsContent = "";

  for (const file of markdownFiles) {
    const filePath = path.join(inputDir, file);
    const basename = path.basename(file, ".md");

    const datePart =
      basename.match(
        /^([0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2})/,
      )?.[1] ?? "";
    const formattedDate = datePart.split("-").slice(0, 3).join("-");
    const formattedTime = datePart.split("-").slice(3, 6).join(":");

    const text = await fs.readFile(filePath, "utf-8");
    let lines = text.trim().split("\n");
    let replyTo: string | null = null;

    lines = lines.filter((line) => {
      if (line.startsWith("@reply")) {
        replyTo = `t-${lookup[basename][lookup[basename].length - 1]}#${basename}`;
        return false;
      }
      return true;
    });

    let replied = lines.join("\n").trim();
    const inThread = lookup[basename];
    let isReplied: string | null = null;
    let destination = basename;

    if (inThread) {
      const index = inThread.indexOf(basename);
      destination = `t-${lookup[basename][lookup[basename].length - 1]}#${basename}`;
      if (index !== inThread.length - 1) {
        isReplied = `t-${lookup[basename][lookup[basename].length - 1]}#${basename}`;
      }
    }

    const destinationFunc = `function navigate() { window.location = '${destination}' }; navigate();`;
    const paragraphs = replied.split("\n\n");
    let truncated = false;
    if (paragraphs.length > 2) {
      truncated = true;
      replied = paragraphs.slice(0, 3).join("\n\n");
    }
    const generatedHtmlContent = execSync(`pandoc -f markdown-smart -t html`, {
      input: replied,
    }).toString();

    const postContent = MakePostLink(
      replyTo,
      formattedDate,
      formattedTime,
      generatedHtmlContent,
      isReplied !== null,
      truncated,
      destinationFunc,
    );
    postsContent += postContent;
  }

  return postsContent;
}

async function saveIndexContent({ postsContent }: { postsContent: string }) {
  const wrapper = MakeWrapper({
    head: MakePageHead({
      title: "Grant's Garden",
      description: "Work in progress",
      image_link: "https://grant-uploader.s3.amazonaws.com/og-images/index.png",
    }),
    content: MakeIndexHeader() + postsContent,
  });
  const formattedIndex = await prettier.format(wrapper, {
    parser: "html",
  });
  await fs.writeFile(path.join(outputDir, indexFile), formattedIndex);
}

const main = async () => {
  try {
    await fs.rm(outputDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });
    await fs.copyFile(
      path.join(srcDir, cssFile),
      path.join(outputDir, "index.css"),
    );
    await fs.copyFile(
      path.join(srcDir, jsFile),
      path.join(outputDir, "index.js"),
    );

    const markdownFiles = (await fs.readdir(inputDir))
      .filter((file) => file.endsWith(".md"))
      .sort()
      .reverse();
    if (markdownFiles.length === 0) {
      console.error(`No markdown files found in ${inputDir}.`);
      process.exit(1);
    }

    const reversed = markdownFiles.slice().reverse();
    const threads: string[][] = [];
    const visited: string[] = [];

    for (const file of reversed) {
      await checkReply({
        threads,
        visited,
        basename: path.basename(file, ".md"),
        level: 0,
      });
    }

    for (const thread of threads) {
      const threadContent = await generateThreadContent({
        thread,
      });
      await saveThreadContent({ thread, content: threadContent });
    }

    const lookup = buildLookupTable({ threads });
    await buildNonThreadPages({ markdownFiles, lookup });

    const postsContent = await generateIndexContent({ markdownFiles, lookup });
    await saveIndexContent({
      postsContent,
    });
    console.log(`Index file created: ${indexFile}`);

    // Add cname to dist
    await fs.writeFile(
      path.join(outputDir, "CNAME"),
      "garden.grantcuster.com",
      "utf-8",
    );

    if (buildImages) {
      // Launch browser once and reuse page for screenshots
      const browser = await chromium.launch();
      const page = await browser.newPage();

      let indexUrl = `http://localhost:8000/`;
      const ogImagePath = path.join(outputDir, "preview.png");
      await generateOgImage(page, indexUrl, ogImagePath);
      console.log(`OG image generated for index: ${ogImagePath}`);
      const s3Key = `og-images/index.png`;
      await uploadFileToS3(ogImagePath, "grant-uploader", s3Key);
      await fs.rm(ogImagePath);

      for (const file of markdownFiles) {
        const basename = path.basename(file, ".md");
        let postUrl = `http://localhost:8000/${basename}`;
        if (lookup[basename]) {
          const thread = lookup[basename];
          const threadBase = "t-" + thread[thread.length - 1];
          postUrl = `http://localhost:8000/${threadBase}/#${basename}`;
        }
        const ogImagePath = path.join(outputDir, basename, "preview.png");
        await generateOgImage(page, postUrl, ogImagePath);
        console.log(`OG image generated for ${file}: ${ogImagePath}`);

        const s3Key = `og-images/${basename}.png`;
        await uploadFileToS3(ogImagePath, "grant-uploader", s3Key);
        await fs.rm(ogImagePath);
      }

      for (const thread of threads) {
        const basename = thread[0];
        const threadBase = "t-" + basename;
        const postUrl = `http://localhost:8000/${threadBase}`;
        const ogImagePath = path.join(outputDir, threadBase, "preview.png");
        await generateOgImage(page, postUrl, ogImagePath);
        console.log(
          `OG image generated for thread ${basename}: ${ogImagePath}`,
        );

        const s3Key = `og-images/${threadBase}.png`;
        await uploadFileToS3(ogImagePath, "grant-uploader", s3Key);
        await fs.rm(ogImagePath);
      }

      await browser.close();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
