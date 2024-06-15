export function MakeWrapper({
  head,
  content,
}: {
  head: string;
  content: string;
}) {
  return `<html>
  <head>
    ${head}
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/index.css" />
  </head>
  <body>
    <div class="content">
      ${content}
    </div>
  </body>
</html>`;
}

export function MakePostLink(
  replyTo: string | null,
  formattedDate: string,
  formattedTime: string,
  htmlContent: string,
  isReplied: boolean,
  truncated: boolean,
  postlinkFunction: string,
) {
  return `<div class="px-2 py-1 post border relative border-gray-800 hover-bg-black cursor-pointer truncate" onclick="${postlinkFunction}" style="">
${replyTo ? `<div class="gray">Thread</div>` : ""}
<div class="gray">${formattedDate} ${formattedTime}</div>
${htmlContent}
${isReplied ? `<div class="gray">Thread</div>` : ""}
${truncated ? `<div class="gray">Read more</div>` : ""}
</div>`;
}

export function MakePageHead({
  title,
  description,
  image_link,
}: {
  title: string;
  description: string;
  image_link: string;
}) {
  return `<title>${title} - Grant's Garden</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title} - Grant's Garden" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image_link}" />
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:image" content="${image_link}" />
<script src="/index.js"></script>`;
}

export function MakeIndexHeader() {
  return `<svg style="margin-top: -0.5em" width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" fill="transparent"/>
<rect x="-2" y="5" width="10" height="1" fill="#98971a"/>
<rect x="-2" y="7" width="10" height="1" fill="#98971a"/>
<rect x="7" y="5" width="1" height="7" fill="#98971a"/>
<rect x="16" y="5" width="6" height="1" fill="#98971a"/>
<rect x="16" y="7" width="6" height="1" fill="#98971a"/>
<rect x="16" y="5" width="1" height="8" fill="#98971a"/>
<rect x="13" y="5" width="1" height="4" fill="#98971a"/>
<rect x="10" y="5" width="4" height="1" fill="#98971a"/>
<rect x="10" y="5" width="1" height="5" fill="#98971a"/>
<rect x="11" y="9" width="2" height="1" fill="#98971a"/>
<rect x="10" y="7" width="4" height="1" fill="#98971a"/>
<rect x="8" y="4" width="2" height="1" fill="#98971a"/>
<rect x="14" y="4" width="2" height="1" fill="#98971a"/>
<rect x="6" y="10" width="1" height="1" fill="#98971a"/>
<rect x="3" y="9" width="3" height="1" fill="#98971a"/>
<rect x="2" y="10" width="1" height="3" fill="#98971a"/>
<rect x="4" y="11" width="1" height="1" fill="#98971a"/>
<rect x="4" y="14" width="11" height="1" fill="#98971a"/>
<rect x="15" y="13" width="1" height="1" fill="#98971a"/>
<rect x="3" y="13" width="1" height="1" fill="#98971a"/>
</svg>
<div class="green">Grant's garden</div>
<div class="spacer"></div>`;
}

export function MakePostPage(
  formattedDate: string,
  formattedTime: string,
  htmlContent: string,
) {
  return `<div class=><a href="/" class="home-link">Grant's garden</a></div>
<div class="gray">Post</div>
<div class="half-spacer"></div>
<div class="px-2 py-1 border relative post border-gray-800">
<div class="gray">${formattedDate} ${formattedTime}</div>
${htmlContent}
</div>`;
}

export function MakeThreadPage({
  threadLength,
  posts,
}: {
  threadLength: number;
  posts: string;
}) {
  return `<div class="green"><a href="/" class="home-link">Grant's garden</a></div>
<div class="gray" style="display: flex; justify-content: space-between;"><div>Thread</div><div class="gray">${threadLength} posts</div></div>
<div class="half-spacer"></div>
    ${posts}`;
}

export function MakePostInThread({
  formattedDate,
  formattedTime,
  htmlContent,
}: {
  formattedDate: string;
  formattedTime: string;
  htmlContent: string;
}) {
  return `<div class="px-2 py-1 border post relative border-gray-800">
<div class="gray">${formattedDate} ${formattedTime}</div>
${htmlContent}
</div>`;
}
