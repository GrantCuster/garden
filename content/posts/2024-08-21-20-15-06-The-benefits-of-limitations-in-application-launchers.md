# The benefits of limitations in application launchers

In my Linux set-up, I use dmenu as an application launcher. dmenu is basically autocomplete for applications and scripts. In many ways, it's not so different from launching things using Spotlight on a Mac.

![Opening 750words.com with dmenu and a launcher script.](https://grant-uploader.s3.amazonaws.com/2024-08-21-20-15-51.gif)

Since I started using it, dmenu has been a convenient way to launch apps. But I've only recently started to realize some of the interesting things it makes possible. A lot of the possibilities come down to the limitations of the interface, and how agnostic it is about what it launches.

Lately, I've started putting scripts to run apps, or a combination of apps, or a combination of apps and websites and terminals, in my `.local/bin` folder where they are exposed through dmenu. Some of the things I've added:

- `planner` launches my calendar, personal email, and work email all in different firefox windows.
- `750words` launches https://750words.com/ in a new firefox window.
- `blog` launches a terminal set to my blog directory, a terminal window running `npm run dev` to run the local versions, and a firefox window open to localhost.
- `record` starts a screen recording. `gif_2x` converts the last screen recording into a GIF running at 2x speed. When it's done it opens a window showing the GIF and listing the file size.

Some of these are rather involved scripts, some are very simple. What I've been surprised by is how different even the simple ones feel when launched from the application launcher. Something like `750words` is given its own space and weight as an activity, promoted from being a website I visit among other websites. It also makes my intention going in very clear, if I open `750words` my intention is to do it, versus getting lost browsing (even though, functionally, all it is doing is opening `750words` in a web browser). 

I used to go after the same effect on macOS, especially for web applications. There were several programs that would let you run a website within its own application container. That meant you could launch it from Spotlight. There were always rough edges that made clear it was a bit of a hack though. The difference between the wrapped web apps and the true apps was noticeable. This is partly because apps on macOS are expected to be polished, with their own nice-looking icon. 

**The lesson I'm interested in with dmenu, is how the limitations (an application is only a name among names) make it much easier and more satisfying to add user-configured applications and scripts.** I am surprised by how different it feels to have my scripts sit right alongside the other applications. As with my experience of lots of Linux-related stuff, it is a feeling of empowerment. It feels like a level of customization above what I'm used to, computer as tool I am control of, rather than something I'm wrestling with.

## Content limitations in web previews

I've noticed a similar effect in making websites. Often you end up making a website that you want to display a preview of on another website. I do this on [Constraint Systems](https://constraint.systems) and for the [Cloudera Fast Forward prototypes](https://blog.fastforwardlabs.com/prototypes). Through experience, I've learned you want to make the number of assets needed for the list preview as few as possible. In the case of Constraint Systems, it is a tile, a description, a preview image, and a preview GIF. It is tempting to require more elements (like several preview images) to provide a fancier preview. Whatever you require, however, you're going to have to provide for every link going forward. A surprising amount of friction can come from needing to create preview assets (and also the deploy process for those assets). Enough friction to cause you to make fewer tools or blog posts because you're dreading that part of the process.

Website meta tags have been an interesting development in relation to this. Used for creating previews on shared Twitter and Facebook links, the main meta tags are limited enough (title, description, preview image) that they're worth doing, and now that they're being regularly done across sites, even more services can dependably use them to unfurl links.
