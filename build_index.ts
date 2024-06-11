import { promises as fs } from "fs";
import path from "path";
import { execSync } from "child_process";
import prettier from "prettier";

const unslugify = (str: string): string => {
  return str.replace(/-/g, " ");
};

const srcDir = "src";
const inputDir = "content/posts";
const outputDir = "dist";
const templateFile = "wrapper.html";
const cssFile = "index.css";
const indexFile = "index.html";

const main = async () => {
  try {
    // Create the output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });

    // Clear the output directory
    const files = await fs.readdir(outputDir);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(outputDir, file))),
    );

    // Copy over the index.css
    await fs.copyFile(
      path.join(srcDir, cssFile),
      path.join(outputDir, "index.css"),
    );

    // Read the necessary template and header contents
    const indexHeadContent = await fs.readFile(
      path.join(srcDir, "index_head.html"),
      "utf-8",
    );
    const indexHeaderContent = await fs.readFile(
      path.join(srcDir, "index_header.html"),
      "utf-8",
    );
    const templateContent = await fs.readFile(
      path.join(srcDir, templateFile),
      "utf-8",
    );

    // Initialize the HTML content for the index file
    let postsContent = "";

    // Loop through each markdown file in the input directory
    const markdownFiles = (await fs.readdir(inputDir))
      .filter((file) => file.endsWith(".md"))
      .sort()
      .reverse();
    if (markdownFiles.length === 0) {
      console.error(`No markdown files found in ${inputDir}.`);
      process.exit(1);
    }

    // thread builder
    const reversed = markdownFiles.slice().reverse();
    let threads: string[][] = [];
    let visited: string[] = [];
    async function checkReply(basename: string, level: number) {
      const filePath = path.join(inputDir, basename + ".md");
      const text = await fs.readFile(filePath, "utf-8");
      let lines = text.split("\n");
      if (level !== 0 && !visited.includes(basename)) {
        const current = threads[threads.length - 1];
        current.push(basename);
        // Not sure this is doing what it needs to
        visited.push(basename);
      }
      for (const line of lines) {
        if (line.startsWith("@reply")) {
          if (level === 0) {
            threads.push([basename]);
          }
          const f = line.split(" ")[1];
          await checkReply(f, level + 1);
        }
      }
    }
    for (const file of reversed) {
      const basename = path.basename(file, ".md");
      await checkReply(basename, 0);
    }
    // end thread builder

    let lookup: Record<string, string> = ({})
    for (const thread of threads) {
      const threadBase = 't-' + thread[0]
      for (const basename of thread) {
        lookup[basename] = threadBase
      }
    }
    // for (const file of markdownFiles) {
    //  const basename = path.basename(file, ".md");
    // if (!lookup[basename]) {
    //     lookup[basename] = 
    //   }
    // }

    console.log(lookup)

    for (const file of markdownFiles) {
      const filePath = path.join(inputDir, file);

      // Get the base filename without the extension
      const baseFilename = path.basename(file, ".md");

      // Extract the date and title part from the filename
      const datePart =
        baseFilename.match(
          /^([0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2})/,
        )?.[1] ?? "";
      const formattedDate = datePart
        .replace(/-/g, " ")
        .split(" ")
        .slice(0, 3)
        .join("-");
      const formattedTime = datePart
        .replace(/-/g, " ")
        .split(" ")
        .slice(3, 6)
        .join(":");

      const text = await fs.readFile(filePath, "utf-8");
      let lines = text.split("\n");
      lines = lines.map((line) => {
        if (line.startsWith("@reply")) {
          // const f = line.split(" ")[1];
          return `Part of a thread`;
        }
        return line;
      });
      const replied = lines.join("\n");

      const generatedHtmlContent = execSync(
        `pandoc -f markdown-smart -t html`,
        { input: replied },
      ).toString();

      postsContent += `<div class="px-2 py-1 border border-gray hover-bg-blue cursor-pointer">`;
      postsContent += `<div class="gray">${formattedDate} ${formattedTime}</div>`;
      postsContent += generatedHtmlContent;
      postsContent += `</div>`;
    }

    // Prepare and save the index file content
    let indexContent = `${indexHeaderContent}${postsContent}`;
    let indexContentWrapped = templateContent.replace(
      "{content}",
      indexContent,
    );
    let indexContentWithHead = indexContentWrapped.replace(
      "{head}",
      indexHeadContent,
    );
    const formattedIndex = await prettier.format(indexContentWithHead, {
      parser: "html",
    });
    await fs.writeFile(path.join(outputDir, indexFile), formattedIndex);

    // Build pages too, should split this out eventually
    for (const file of markdownFiles) {
    }

    console.log(`Index file created: ${indexFile}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
