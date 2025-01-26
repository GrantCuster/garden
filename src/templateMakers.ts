import { time } from "console";
import { formatDateString } from "../build_index";

export function html(strings: TemplateStringsArray, ...values: string[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
}

export function MakeWrapper({
  head,
  content,
}: {
  head: string;
  content: string;
}) {
  return html`<html class="bg-hard0 text-foreground">
    <head>
      ${head}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/index.css" />
    </head>
    <body>
      <div class="max-w-[55ch] mx-auto">${content}</div>
    </body>
  </html>`;
}

export function MakeThreadTruncated({ content }: { content: string }) {
  return html`<div class="mb-4 pl-1">
    <span class="text-aqua">${content}</span>
    <span class="text-dark4 ml-1">...</span>
  </div>`;
}

export function MakePostLink({
  timestamp,
  htmlContent,
  truncated,
  postlinkFunction,
  postCount,
}: {
  timestamp: string;
  htmlContent: string;
  truncated: boolean;
  postlinkFunction: string;
  postCount?: number;
}) {
  return html`<div>
    <div class="px-4 text-sm text-dark4 mb-2">
      ${postCount
        ? `<span class="text-aqua -ml-3">${postCount}</span> &middot; `
        : ``}${timestamp}
    </div>
    <div
      class="px-4 border border-dark1 mb-4 post cursor-pointer"
      onclick="${postlinkFunction}"
    >
      <div class="markdown">${htmlContent}</div>
      ${truncated
        ? `<div class="text-dark4 mb-2 text-sm">Read more</div>
`
        : ""}
    </div>
  </div>`;
}

export function MakeThreadLink({
  timestamp,
  htmlContent,
}: {
  timestamp: string;
  htmlContent: string;
}) {
  return html`<div>
    <div class="px-4 text-sm text-dark4 mb-2">
      <span class="text-aqua">Thread</span> &middot; ${timestamp}
    </div>
    <div class="px-4 border border-dark1 mb-4 pt-2">${htmlContent}</div>
  </div>`;
}

export function MakePageHead({
  title,
  description,
  image_link,
  url,
  optional_head,
}: {
  title: string;
  description: string;
  image_link: string;
  url: string;
  optional_head?: string;
}) {
  const descriptionReplaced = description.replace(/"/g, "'");
  const titleReplaced = title.replace(/"/g, "'");
  return html`<title>${title} - Grant's Garden</title>
    <meta name="description" content="${descriptionReplaced}" />
    <meta property="og:title" content="${titleReplaced}" />
    <meta property="og:description" content="${descriptionReplaced}" />
    <meta property="og:image" content="${image_link}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="${image_link}" />
    <meta property="og:url" content="${url}" />
    <script src="/index.js"></script>
    ${optional_head ? optional_head : ""}`;
}

export function MakeHeader({ isHome }: { isHome: boolean }) {
  return html`<div class="text-green mt-4 mb-2 px-4">
    ${isHome ? "Grant's garden" : `<a href="/">Grant's garden</a>`}
  </div>`;
}

export function MakePostPage(timestamp: string, htmlContent: string) {
  return html`${MakeHeader({ isHome: false })}
    <div class="px-4 text-sm text-dark4 mb-2">${timestamp}</div>
    <div class="px-4 border border-dark1 mb-4 post">
      <div class="markdown">${htmlContent}</div>
    </div>`;
}

export function MakeThreadPage({
  threadLength,
  posts,
}: {
  threadLength: string;
  posts: string;
}) {
  return html`${MakeHeader({ isHome: false })}
    <div class="px-4">
      <div class="text-aqua text-sm mb-2">
        <div>Thread &middot; ${threadLength} posts</div>
      </div>
    </div>
    ${posts}`;
}

export function MakePostInThread({
  basename,
  timestamp,
  htmlContent,
  index,
}: {
  basename: string;
  timestamp: string;
  htmlContent: string;
  index: number;
}) {
  return html`<div class="relative px-4 text-sm text-dark4 mb-2">
      <div class="absolute -top-4" id="${basename}"></div>
      <span class="text-aqua">${(index + 1).toString()}</span> &middot;
      ${timestamp}
    </div>
    <div class="px-4 border border-dark1 mb-4 post">
      <div class="markdown">${htmlContent}</div>
    </div>`;
}

export function MakeDateHeader({
  content,
  dayArray,
}: {
  content: string;
  dayArray: number[];
}) {
  return html`<div>
    <div class="h-24 w-full hidden px-4 mb-3 items-end border-b-2 border-dark3">
      ${dayArray
        .map(
          (_, i) =>
            `<div
              key=${i}
              class="w-full flex items-stretch justify-center"
              style="height: ${(Math.min(3, dayArray[i]) / 3) * 100}%"
            >
        <div class="h-full bg-green"
          style="width: 2px"
        ></div>

      </div>`,
        )
        .join("")}
    </div>
    <div class="px-4 mb-2 text-sm text-blue">${content}</div>
  </div>`;
}

export function Scratch() {
  return html`<svg
    swidth="36"
    height="36"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" fill="transparent" />
    <rect x="-2" y="5" width="10" height="1" fill="var(--green)" />
    <rect x="-2" y="7" width="10" height="1" fill="var(--green)" />
    <rect x="7" y="5" width="1" height="7" fill="var(--green)" />
    <rect x="16" y="5" width="6" height="1" fill="var(--green)" />
    <rect x="16" y="7" width="6" height="1" fill="var(--green)" />
    <rect x="16" y="5" width="1" height="8" fill="var(--green)" />
    <rect x="13" y="5" width="1" height="4" fill="var(--green)" />
    <rect x="10" y="5" width="4" height="1" fill="var(--green)" />
    <rect x="10" y="5" width="1" height="5" fill="var(--green)" />
    <rect x="11" y="9" width="2" height="1" fill="var(--green)" />
    <rect x="10" y="7" width="4" height="1" fill="var(--green)" />
    <rect x="8" y="4" width="2" height="1" fill="var(--green)" />
    <rect x="14" y="4" width="2" height="1" fill="var(--green)" />
    <rect x="6" y="10" width="1" height="1" fill="var(--green)" />
    <rect x="3" y="9" width="3" height="1" fill="var(--green)" />
    <rect x="2" y="10" width="1" height="3" fill="var(--green)" />
    <rect x="4" y="11" width="1" height="1" fill="var(--green)" />
    <rect x="4" y="14" width="11" height="1" fill="var(--green)" />
    <rect x="15" y="13" width="1" height="1" fill="var(--green)" />
    <rect x="3" y="13" width="1" height="1" fill="var(--green)" />
  </svg>`;
}
