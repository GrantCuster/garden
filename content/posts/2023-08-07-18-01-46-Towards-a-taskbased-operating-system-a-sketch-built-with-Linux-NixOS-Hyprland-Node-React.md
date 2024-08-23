# Towards a task-based operating system: a sketch built with Linux, NixOS, Hyprland, Node, React

![My customized home dashboard](https://grant-uploader.s3.amazonaws.com/2024-08-23-18-01-14-2000.jpg)

I've been working on building a task-focused operating system. Really it's more like a presentational wrapper on top of a bunch of Linux tools. You can see the configuration at [the repo](https://github.com/GrantCuster/nix/tree/6e365d778b732395b8eb3968e9e70075f342a486), for now it should only be used as a reference.

## The idea

The main idea is to have a separate workspace for each task. Workspaces are displayed on the home dashboard (accessed through Command+Tab). The workspace list is set-up similar to a command pallete: focused on being fast and keyboard-usable. Recently viewed spaces are at the top, typing filters them live, and hitting return selects the top one. You can create a new workspace directly from the filter input.

Currently workspaces themselves are pretty minimal. The workspace name is at the top left and the time at the top right. Application windows are tiled.

![The workspace for writing this blog post](https://grant-uploader.s3.amazonaws.com/2024-08-23-18-01-22-2000.jpg)

The goal is to stay focused on one task at a time. I've found just the step of having the task name in the bar to be surprisingly effective.

One piece that makes this work is that most of my applications are either terminals or browsers. I'm quite happy to open multiple new terminals and browsers for each workspace. This keeps the workspaces self-contained (no need to flip back to refer to something in the browser in another space, just open a new browser window).

## The architecture

- Operating system: Linux
- Distribution: [NixOS](https://nixos.org/) is an attempt to make your system set-up a lot more reproducible. It's not really essential to what I'm doing in my set-up, but hopefully it will make it easier to maintain and branch. Most of my config is in [home-manager](https://github.com/nix-community/home-manager) rather than the system config.
- Window manager: [Hyprland](https://hyprland.org/) is a relatively new tiling window manager and compositor. It's the basis for a lot of the customization I'm able to do on my set-up. The command-line controls available through `hyprctrl` are what allow me to make custom interfaces. It's really nice that it has a JSON output option that makes it super easy to display info like current workspaces.
- Window manager API: [Node.js websocket server](https://github.com/GrantCuster/nix/blob/main/home/home-ui/home-ui-server/server.mjs). This is, I think, where I get a bit more unconventional. I use a local websocket server to provide an interface to local web apps to command and display info from Hyprland by way of shell scripts. I also use this to send the contents of specific files (like my task list) on updates. I've never run a websocket server before and I'm sure optimizations could be made.
- Custom [home dashboard](https://github.com/GrantCuster/nix/blob/main/home/home-ui/home-ui-homepage/src/App.tsx) and [bar](https://github.com/GrantCuster/nix/blob/main/home/home-ui/home-ui-bar/src/App.tsx): React web apps. Using the websocket server as a backend, I'm able to make both a custom home dashboard and bar in React. By displaying them in chrome with the `app=` command-line flag, and Hyprland defined minimal window decorations, I'm able to get rid of all the browser chrome, so they appear as stand-alone apps.

## Why React

Mainly because it's what I'm most familiar with and therefore can move the fastest and most surely in. There's also a pattern of apps like [Waybar](https://github.com/Alexays/Waybar) adopting a subset of CSS for styling. Once I saw that and figured out the node.js to command-line piece, I thought why not just go all the way and get full access to HTML and CSS possibilities. My styling has stayed pretty minimalist so far, but there's obviously the potential to go much wilder with it.

The main concerns are latency and performance. I don't think performance is going to be hurt by keeping a few more web pages open. Latency I do feel a bit on clicks. I can't imagine React is the bottle-neck there, though, and probably I can get better results by tweaking my websocket and shell-script set-up.

## Displaying todos and screenshots

I show lists of todos and system ideas on the dashboard as well. These come from markdown files, I again use the websocket server to `cat` the file contents and then display those within React. I could/should use a markdown renderer, but my todo format is consistent enough I just parse it myself for now. I use `inotify` to watch for changes and update automatically. This seems like a really interesting pattern I'd like to experiment more with. Maybe make custom file watcher modules on the dashboard on-demand. In my case these files are also in my Obsidian vault, and since I have Obsidian sync I can get sync across my mobile devices too.

Screenshot display is similar but I watch a directory. The ability to display images (or videos) exactly like I want them is a really nice feature of doing this with HTML, and something I'll continue to explore.

## Future plans

- Timers: the other big productivity and focus piece I want to get in is timers. I tried workspace timers but I think even that is a little inflexible. I think I want to make timers on demand as another custom web app. So that they can be workspace and task based or something else. I think I can also query across them to display a global view on the dashboard.
- Scheduled workspaces: I want workspaces to show up for rituals I intend to do each day (like freewrite) this is definitely possible, just need to do more thinking about how I want to organize it.
- Beyond tiling: I think having a task tied to one workspace works most of the time. But sometimes more windows than comfortably fit in the workspace are required. I can use the group and tabs feature for Hyprland to help with this, but I'm also interested in trying some scrolling workspace solutions, similar to [PaperWM](https://github.com/paperwm/PaperWM). Hyprland isn't exactly built for this, but I have some ideas of how to programatically make it work. The stretch version of this is a spatial canvas set-up.
- Customizable dashboard: one thing I like about the current set-up is that modification is easy -- I just run a dev version of the home app and develop it as I would a regular app. I think I want to try and shift even more abilities to customize into the home app itself, so I can switch out components, or even create new ones from the dashboard interface itself. If I find the right primitives I think this is totally possible.

## Let me know what you think

I'm interested to hear from anyone doing similar experiments or what you would want if you were had your own customizable operating system.
