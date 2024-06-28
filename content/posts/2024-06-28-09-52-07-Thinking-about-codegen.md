# Thinking about codegen

In recent LLM model experiments I've been thinking a lot about how to get codegen into the workflow. For a lot of tasks, conventional (javascript) code would be faster, cheaper and less prone to error than an LLM call. I'd like to have the LLM generate that code once -- then the game becomes how to encapsulate, verify and sometimes modify the code it generates.

## Some inspiration:

### Future of Coding: Pygmalion

[The Pygmalion podcast episode of Future of Coding](https://futureofcoding.org/episodes/072). This keeps turning over in my head. Particularly the 'code by example' bits, and the partial execution. Feels to me like there's some loop for an LLM to try generating a call, and then if the result doesn't parse or pass some verification process, it opens up a teach-by-example workflow.

### Parameter tweaking

![](https://grant-uploader.s3.amazonaws.com/2024-06-28-10-14-02-800.jpg)

[Silicon Jungle exploring parsing generated code for parameters](https://x.com/JungleSilicon/status/1806415376512893255). This has ties to parametric UI like dat.gui. I also see people generating things like this with Claude artifacts. Maybe parametric tweakability is another piece of the puzzle.

### Reactive flows

![](https://grant-uploader.s3.amazonaws.com/2024-06-28-10-15-21-800.jpg)

[Orion Reed on stitching elements reactively together](https://x.com/OrionReedOne/status/1805602416659673116). This is a slightly different path, I think, but lots of great patterns.

## Starting point

I need to pick some simple-but-not-too-simple task, and start working through the workflow.
