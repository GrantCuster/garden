# Evolution generation

A lot of us are trying to figure out how to use LLMs as a creative tool. I'm interested in thinking more about approaches that focus on evolution - mutation and selection. There's a set of projects related to creative coding, that I've been interesting in thinking about more deeply.

## SerenedipityLM

[Samin](https://x.com/samim) recenterly detailed their project [SerendipityLM](https://samim.io/studio/work/serendipityLM/) that focuses on "interactive evolutionary exploration of generative design models". It features a selection of generative art, mainly shader examples, generated through their process.

It highlights picbreeder. A non-AI image generation app, where users effectively went on a branching scavenger hunt through the possibility space. The [linked slides write-up](https://wiki.santafe.edu/images/3/34/Stanley_innovation_workshop14.pdf) is interesting.

The process is admirably clear. It starts with a prompt. Experiments are generated and then ranked and critiqued by the user. Those ranking are used to generate new exxamples in an interative process.

## Spellburst

[Spellburst](https://spellburstllm.github.io/) is a paper and video demo made by [Tyler](https://x.com/tylerangert) and collaborators. It'd been a while since I'd looked at Spellburst and I think it really gets a lot of things right in terms of accomodating different levels of control for different parts of the process.

There's:
- prompts: for starting out and trying out conceptual changes in the creative code sketches. This is nice because these are often the changes that are tedious to try out quickly in code
- parameter tweaking: a dat.gui-like interface for tweaking experiment parameters. Sometimes you do want to tweak values specifically and interactively, and input elements like sliders are definitely a better interface for this than a prompt
- editing code: for real fine-tuned changes there's no substitute for direct code editing.

All of this is laid out in a node and wire interface that easily allows multiple versions and branches.

## Clicksynth and River

[Clicksynth](https://clicksynth.com) by Max Bittker lets you click through generated shaders to explore themes. Clicking into one gives you additive themes to add.

[River](https://maxbittker.com/river-notes) is similar, but focused on exploring a dataset. Clicking an image sends you into a space of similar images. The sound effects are very satisfying.

## What do I think?

These are some of the best examples of interfaces for LLMs as creative tools. I think the actually most useful thing for me to do is to investigate what I see as the things I still feel are missing. To come in another post.
