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
  MakeDateHeader,
  MakeHeader,
  MakeThreadLink,
  MakeThreadTruncated,
} from "./src/templateMakers";
import { chromium } from "playwright";
// @ts-ignore
// import RSS from "rss";

import { Browser, Page } from "playwright";
import { uploadFileToS3 } from "./upload_image";
import { unzip } from "zlib";

const buildImages = false;

const monthsOfYear: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const longMonthsOfYear: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateString(dateString: string): string {
  // Extract components from the string
  const [year, month, day, hour, minute, second] = dateString
    .split("-")
    .map(Number);

  // Create a new Date object
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Array of day names and month names
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day of the week and month name
  const dayOfWeek: string = daysOfWeek[date.getDay()];
  const monthName: string = monthsOfYear[date.getMonth()];

  // Function to get the ordinal suffix
  // function getOrdinalSuffix(day: number): string {
  //   if (day > 3 && day < 21) return "th";
  //   switch (day % 10) {
  //     case 1:
  //       return "st";
  //     case 2:
  //       return "nd";
  //     case 3:
  //       return "rd";
  //     default:
  //       return "th";
  //   }
  // }

  // Format the date and time
  // const formattedDate: string = `${dayOfWeek}, ${monthName} ${day}${getOrdinalSuffix(day)}`;
  const formattedTime: string = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${dayOfWeek} &middot; ${monthName} ${day}, ${year} &middot; ${formattedTime}`;
}

async function generateOgImage(page: Page, url: string, outputPath: string) {
  await page.goto(url, { waitUntil: "networkidle" });

  // Adjust the viewport size to the desired OG image size
  await page.setViewportSize({ width: 1000, height: 630 });

  await page.screenshot({ path: outputPath });
}

// Directory and file paths
const srcDir = "src";
const inputDir = "content/posts";
const threadInputDir = "content/threads";
const outputDir = "dist";
const cssFile = "index.css";
const jsFile = "index.js";
const indexFile = "index.html";
const socialText = "content/social/latest_social_text.md";
const monthsDebug = "months_debug.txt";

// in each month, for a thread, include the last two posts (last being last in that month)

async function buildNonThreadPages({
  markdownFiles,
}: {
  markdownFiles: string[];
}) {
  for (const file of markdownFiles) {
    await buildStandalonePage({ file, optionalRedirect: null });
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
  const timestamp = formatDateString(basename);

  const content = await fs.readFile(path.join(inputDir, file), "utf-8");
  const generatedHtmlContent = execSync(
    `pandoc -f markdown-smart-markdown_in_html_blocks+raw_html -t html`,
    {
      input: content,
    },
  ).toString();

  const excerpt = content.split("\n")[0];
  let postHeadContent = MakePageHead({
    title: timestamp,
    description: excerpt,
    image_link: `https://grant-uploader.s3.amazonaws.com/og-images/${basename}.png`,
  });
  postHeadContent += optionalRedirect ?? "";
  const templateContentWrapped = MakeWrapper({
    head: postHeadContent,
    content: MakePostPage(timestamp, generatedHtmlContent),
  });

  const formattedContent = await prettier.format(templateContentWrapped, {
    parser: "html",
  });
  const dirName = path.join(outputDir, basename);
  await fs.mkdir(dirName, { recursive: true });
  await fs.writeFile(path.join(dirName, "index.html"), formattedContent);
}

async function buildThread({ files }: { files: string[] }) {
  const firstPost = files[0];
  const threadBasename = "t-" + path.basename(firstPost, ".md");

  let threadContent = "";
  for (const file of files) {
    const basename = path.basename(file, ".md");
    const timestamp = formatDateString(basename);
    const content = await fs.readFile(path.join(inputDir, file), "utf-8");
    const generatedHtmlContent = execSync(
      `pandoc -f markdown-smart-markdown_in_html_blocks+raw_html -t html`,
      {
        input: content,
      },
    ).toString();
    const postContent = MakePostInThread({
      basename,
      timestamp,
      htmlContent: generatedHtmlContent,
      index: files.indexOf(file),
    });

    threadContent += postContent;
  }

  let postHeadContent = MakePageHead({
    title: "Thread",
    description: "placeholder",
    image_link: `https://grant-uploader.s3.amazonaws.com/og-images/t-${path.basename(
      firstPost,
      ".md",
    )}.png`,
  });

  const templateContentWrapped = MakeWrapper({
    head: postHeadContent,
    content: MakeThreadPage({
      threadLength: files.length.toString(),
      posts: threadContent,
    }),
  });

  const formattedContent = await prettier.format(templateContentWrapped, {
    parser: "html",
  });

  const dirName = path.join(outputDir, threadBasename);
  await fs.mkdir(dirName, { recursive: true });
  await fs.writeFile(path.join(dirName, "index.html"), formattedContent);
}

async function generateIndexContent({
  markdownFiles,
  threads,
}: {
  markdownFiles: string[];
  threads: string[][];
}) {
  let postsContent = "";

  let currentMonth = "";
  let monthsLookup: Record<string, number> = {};

  const activeMonths: Record<string, string[]>[] = [];
  for (const file of markdownFiles) {
    const basename = path.basename(file, ".md");
    const splits = basename.split("-");
    const yearMonth = splits.slice(0, 2).join("-");
    if (monthsLookup[yearMonth] === undefined) {
      monthsLookup[yearMonth] = 1;
      activeMonths.push({ [yearMonth]: [file] });
    } else {
      monthsLookup[yearMonth] = monthsLookup[yearMonth] + 1;
      activeMonths[activeMonths.length - 1][yearMonth].push(file);
    }
  }

  await fs.writeFile(
    path.join(outputDir, monthsDebug),
    activeMonths
      .map((section) => {
        const name = Object.keys(section)[0];
        const files = section[name].join("\n");
        return name + "\n" + files;
      })
      .join("\n\n"),
    "utf-8",
  );

  for (const activeMonth of activeMonths) {
    const monthName = Object.keys(activeMonth)[0];
    const files = Object.values(activeMonth)[0];
    for (const file of files) {
      const filePath = path.join(inputDir, file);
      const basename = path.basename(file, ".md");

      const text = await fs.readFile(filePath, "utf-8");
      let destination = basename;

      const destinationFunc = `function navigate() { window.location = '${destination}' }; navigate();`;
      const paragraphs = text.split("\n\n");
      let truncated = false;
      let truncatedText = text;
      if (paragraphs.length > 3) {
        truncated = true;
        truncatedText = paragraphs.slice(0, 3).join("\n\n");
      }

      if (currentMonth !== basename.slice(0, 7)) {
        const splits = basename.split("-");
        const yearMonth = splits.slice(0, 2).join("-");
        const year = splits[0];
        const month = Number(splits[1]) - 1;
        const postCount = monthsLookup[yearMonth];
        postsContent += MakeDateHeader({
          content: `${longMonthsOfYear[month]} ${year} &middot; ${postCount} post${postCount > 1 ? "s" : ""}`,
        });
        currentMonth = basename.slice(0, 7);
      }

      let link = "";
      let threadContent = "";
      let threadStamp = "";
      let isInThread = false;
      let isLastInThread = false;
      for (const thread of threads) {
        // only check if last because only show thread once in index
        if (thread.includes(file)) {
          isInThread = true;
          if (thread[thread.length - 1] !== file) {
            break;
          }
          isLastInThread = true;
          const threadBase = "t-" + path.basename(thread[0], ".md");
          link = threadBase;

          let truncatedThread: string[] = [];

          // Last and second to last
          truncatedThread.push(thread[thread.length - 2]);
          truncatedThread.push(thread[thread.length - 1]);

          if (thread.length > 2) {
            threadContent += MakeThreadTruncated({
              content:
                "1" + (thread.length > 3 ? "-" + (thread.length - 2) : ""),
            });
          }

          for (const file of truncatedThread) {
            const filePath = path.join(inputDir, file);
            const basename = path.basename(file, ".md");
            const index = thread.indexOf(file);

            const text = await fs.readFile(filePath, "utf-8");
            let destination = threadBase + "#" + basename;

            const destinationFunc = `function navigate() { window.location = '${destination}' }; navigate();`;
            const paragraphs = text.split("\n\n");
            let truncated = false;
            let truncatedText = text;
            if (paragraphs.length > 3) {
              truncated = true;
              truncatedText = paragraphs.slice(0, 3).join("\n\n");
            }

            const generatedHtmlContent = execSync(
              `pandoc -f markdown-smart-markdown_in_html_blocks+raw_html -t html`,
              {
                input: truncatedText,
              },
            ).toString();

            const timestamp = formatDateString(basename);

            const postContent = MakePostLink({
              postCount: index + 1,
              timestamp: timestamp,
              htmlContent: generatedHtmlContent,
              truncated,
              postlinkFunction: destinationFunc,
            });
            threadContent += postContent;
          }

          threadStamp = formatDateString(
            path.basename(thread[thread.length - 1], ".md"),
          );
          break;
        }
      }

      if (isInThread) {
        if (isLastInThread) {
          // only add to index for last
          postsContent += MakeThreadLink({
            timestamp: threadStamp,
            htmlContent: threadContent,
          });
        }
      } else {
        // is not in thread
        const generatedHtmlContent = execSync(
          `pandoc -f markdown-smart-markdown_in_html_blocks+raw_html -t html`,
          {
            input: truncatedText,
          },
        ).toString();

        const timestamp = formatDateString(basename);

        const postContent = MakePostLink({
          timestamp,
          htmlContent: generatedHtmlContent,
          truncated,
          postlinkFunction: destinationFunc,
        });

        link = destination;

        postsContent += postContent;
      }

      if (markdownFiles.indexOf(file) === 0) {
        await fs.writeFile(
          socialText,
          truncatedText + "\n" + "https://garden.grantcuster.com/" + link + "/",
          "utf-8",
        );
      }
    }
    const activeMonthNames = Object.values(activeMonths).map(
      (section) => Object.keys(section)[0],
    );
    const monthIndex = activeMonthNames.indexOf(monthName);
    const targetName = monthIndex === 0 ? "index.html" : monthName + ".html";
    // console.log(postsContent)
    console.log(monthIndex);
    const script = `const monthNames = ${JSON.stringify(activeMonthNames)};
console.log(monthNames);
let index = 0;
window.addEventListener('scroll', (e) => {
  if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 200) {
      ij
    console.log('load it')
  }
});`;
    console.log(script);

    await fs.writeFile(path.join(outputDir, "infinite.js"), script, "utf-8");

    await saveIndexContent({
      optionHead: `<script src="/infinite.js"></script>`,
      postsContent: postsContent,
      target: targetName,
    });
    console.log(`Index file created: ${targetName}`);
  }
}

type RSSPost = {
  title: string;
  url: string;
  description: string;
  date: string;
};

// async function generateRSS({ markdownFiles }: { markdownFiles: string[] }) {
//   const posts: RSSPost[] = [];
//
//   function parseCustomDate(dateString: string): Date {
//     const [year, month, day, hour, minute, second] = dateString
//       .split("-")
//       .map(Number);
//     // Note: In JavaScript, months are 0-indexed, so we need to subtract 1 from the month.
//     return new Date(year, month - 1, day, hour, minute, second);
//   }
//   for (const file of markdownFiles) {
//     const filePath = path.join(inputDir, file);
//     const basename = path.basename(file, ".md");
//     const markdownContent = await fs.readFile(filePath, "utf-8");
//     posts.push({
//       title: basename,
//       url: `https://garden.grantcuster.com/${basename}`,
//       description: markdownContent,
//       date: parseCustomDate(basename).toUTCString(),
//     });
//   }
//
//   const feed = new RSS({
//     title: "Grant's Garden",
//     description: "Work and writing in progress",
//     feed_url: "https://garden.grantcuster.com/rss.xml",
//     site_url: "https://garden.grantcuster.com",
//     image_url: "https://grant-uploader.s3.amazonaws.com/og-images/index.png",
//     managingEditor: "Grant Custer",
//     pubDate: new Date().toUTCString(),
//   });
//
//   posts.forEach((post) => {
//     feed.item(post);
//   });
//
//   await fs.writeFile(
//     path.join(outputDir, "rss.xml"),
//     feed.xml({ indent: true }),
//     "utf-8",
//   );
// }

async function saveIndexContent({
  optionHead,
  postsContent,
  target,
}: {
  optionHead?: string;
  postsContent: string;
  target: string;
}) {
  const wrapper = MakeWrapper({
    head: MakePageHead({
      title: "Home",
      description: "Work and writing in progress",
      image_link: "https://grant-uploader.s3.amazonaws.com/og-images/index.png",
      optional_head: optionHead,
    }),
    content: MakeHeader({ isHome: true }) + postsContent,
  });
  const formattedIndex = await prettier.format(wrapper, {
    parser: "html",
  });
  await fs.writeFile(path.join(outputDir, target), formattedIndex);
}

const main = async () => {
  try {
    // rebuild
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

    const threadFiles = (await fs.readdir(threadInputDir)).filter((file) =>
      file.endsWith(".txt"),
    );
    if (threadFiles.length === 0) {
      console.error(`No thread files found`);
      process.exit(1);
    }
    let threads: string[][] = [];
    for (const file of threadFiles) {
      const content = await fs.readFile(
        path.join(threadInputDir, file),
        "utf-8",
      );
      const sections = content
        .split("\n\n")
        .map((chunk) =>
          chunk
            .split("\n")
            .filter((line) => !line.startsWith("#") && line.trim() !== ""),
        );
      threads.push(...sections);
    }

    // Build threads
    for (const thread of threads) {
      await buildThread({ files: thread });
    }

    const markdownFiles = (await fs.readdir(inputDir))
      .filter((file) => file.endsWith(".md"))
      .sort()
      .reverse();
    if (markdownFiles.length === 0) {
      console.error(`No markdown files found in ${inputDir}.`);
      process.exit(1);
    }

    await buildNonThreadPages({ markdownFiles });

    const postsContent = await generateIndexContent({ markdownFiles, threads });
    // await generateRSS({ markdownFiles });

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
        const ogImagePath = path.join(outputDir, basename, "preview.png");
        await generateOgImage(page, postUrl, ogImagePath);
        console.log(`OG image generated for ${file}: ${ogImagePath}`);

        const s3Key = `og-images/${basename}.png`;
        await uploadFileToS3(ogImagePath, "grant-uploader", s3Key);
        await fs.rm(ogImagePath);
      }

      // for (const thread of threads) {
      //   const basename = thread[thread.length - 1];
      //   const threadBase = "t-" + basename;
      //   const postUrl = `http://localhost:8000/${threadBase}`;
      //   const ogImagePath = path.join(outputDir, threadBase, "preview.png");
      //   await generateOgImage(page, postUrl, ogImagePath);
      //   console.log(
      //     `OG image generated for thread ${basename}: ${ogImagePath}`,
      //   );
      //
      //   const s3Key = `og-images/${threadBase}.png`;
      //   await uploadFileToS3(ogImagePath, "grant-uploader", s3Key);
      //   await fs.rm(ogImagePath);
      // }

      await browser.close();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
