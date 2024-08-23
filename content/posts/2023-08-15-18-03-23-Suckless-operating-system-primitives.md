# Suckless operating system primitives

_Edit: There are credible reports that suckless/folks-involved-with-suckless engage with right-wing/neo-facist/nazi views. Views I completely reject. I've never been involved in the community, and tracking down what has happened is difficult from the outside, [this](https://tilde.team/~ben/suckmore/) seems like a good collection, albeit with link rot. But I've definitely seen a neo-fascist streak (often positioned as trolling) on linux youtube content and want to be clear I do not support any of that, and advise anyone entering into the linux community to stay away from that ideology, there's lots of folks (by far the majority) interested in software customization without those views._

[suckless](https://suckless.org/) is a set of opinionated Linux software focused on simplicity and targeted towards experienced users. The most interesting part of the project to me is the attempt to break down the most common programs into a set of shareable primitives.

Their main programs and tools:

- dwm - tiling window manager
- dmenu - menu utility where you give a list of items and it lets you fuzzy filter through it. dmenu is the most impressive tool to me in terms of ability to usefully break out a workflow that can be then be combined in lots of interesting ways.
- st - a simple opinionated terminal
- surf - a simple, chromeless web browser
- tabbed - a generic tab primitive, intended to be used for tabs across their programs, including st and surf

## A full workflow

My everyday workflow typically involves web browsers and terminals. Suckless has technically made the tools to do everything I need to do in that workflow. Surf for a browser (with tabbed for tabs), st for a terminal (with tabbed for tabs), dwm for a window manager, and dmenu as a launcher. There's something very satisfying about them having identified that tabs are a primitive that can be used outside and across programs.

## Do I actually use it?

No. I have used dwm and dmenu for a while. And I think I've tried several of the others. But I've tended to end up on less opinionated/purist tools that adopt many of the ideas they've pioneered with dwm and particulary dmenu.

## Thinking about dmenu

One of the strengths of breaking things out into primitives, is giving people the tools to recombine them. Often this capability stays pretty theoretical. dmenu is one of the best personal experiences I've had with using a primitive that I could then extend into more use-cases. (I actually use Rofi, which is a friendlier descendent of dmenu, but the principles apply.)

One of dmenu's main functions is as a launcher, you script-feed it a list of programs and then fuzzy search through it to trigger the one you want to launch. It's perfectly useful for just that, but probably at some point you'll want to customize the list, or realize you have another list of items you want to operate on. For myself, I use it to go through a custom command palette, where I can do everything from launch programs, to set my computer brightness, to open a bookmarked website. **The really empowering thing for me, which you wouldn't get in siloed programs, is the ability to put all of these items on the same level. Browser bookmarks feel much more useful and personal now that I have brought them out of the browser and into the operating system context.** I feel less confined by which programs things are in and more focused on the action I'm taking.

![My dmenu-like Rofi custom command palette](https://grant-uploader.s3.amazonaws.com/2024-08-23-18-04-49-2000.jpg)

Another somewhat subtle but key point of dmenu is that it keeps most recently used items at the top of the list. This turns out to be great for workflows where you're often repeating the same two or three actions, and it lessens the cost of having extra commands -- they just sink to the bottom.
