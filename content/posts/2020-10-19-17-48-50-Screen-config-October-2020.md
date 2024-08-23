# Screen config: October 2020

My current set-up and some of the thinking behind it.

![A photo of the current set-up.](https://grant-uploader.s3.amazonaws.com/2024-08-23-17-49-14-2000.jpg)

## Equipment

Screens:
- 1920x1200 monitor
- 1920x1200 monitor
- 1920x1080 portable monitor
- 1920x1080 laptop screen

Computers:
- Intel NUC
- Razer Blade Stealth

## Set-up

### Vertical monitors

I've put both the desktop monitors in vertical orientation, like an open book (or a huge Surface Duo). I think for doing text-based work on the computer (code or writing) this is the ideal set-up. It's really nice they're both the 16:10 resolution (instead of the increasingly popular 16:9). 1200 pixels across is a comfy amount of horizontal space for writing. These monitors run off the Intel NUC.

### Laptop+1 for rendering

Mostly I develop things seen in a web browser. I figured out I could use my laptop screen as a web browser preview device. Especially since its aspect ratio is a more common size then a split on my vertical monitor. This set-up is also conceptually pleasing. It feels like all the dev work is happening on these two utilitarian vertical monitors, and then it is rendered out on the laptop device (which, among other things, has denser pixels).

I also have a portable monitor (same resolution as the laptop), that I got when I was doing everything (often in the backyard) on the laptop. I'm using that as a secondary rendering screen. Often I have the terminal running the local dev server on there (just to keep an eye on it). Sometimes I have a video or music player. I'm still working out what feels best there. I also like having a todo list always visible.

### Powering the monitors

This has been a journey. At first I was running everything off the laptop with a dock that used DisplayLink to power the three extra monitors. DisplayLink, despite what looks like heroic effort on the part of open source devs, is pretty buggy on Ubuntu. It worked but it was consuming a lot of CPU and often crashing.

I'd never really thought hard about what it takes to drive a bunch of monitors. I knew more pixels required more effort, but I thought that since my monitors are relatively low resolution (less in total than a 4k), I'd be OK. But it turns out there's also just the matter of having enough ports, which my laptop does not. DisplayLink solved the port issue but just wasn't working that well.

Instead, I'm now running the two vertical monitors off an Intel NUC, through the provided ports. The laptop runs itself and also the external portable display. I run [Barrier](https://flathub.org/apps/details/com.github.debauchee.barrier) to use my mouse and keyboard across both computers. It's early days, but it has been extremely surprising to me how well this works. There is noticeable lag on the keyboard/mouse sometimes. But I'm not actually on the laptop that much -- as I mentioned I usually use it render web previews and play videos or music. Things I have to get set-up and occasionally refresh but am not doing a lot of work in.

### OS and networking

Part of the reason mouse and keyboard sharing feels as good as it does is that I have my desktop and laptop similarly configured. I'll write more in-depth about it another time, but I'm running i3wm on both, which makes for a great multi-monitor experience. It will probably be a bit of a pain to keep their configs in sync (I'm investigating ways to do it). But it will also will force me to have portable Linux configs in general, which will come in handy if I have to wipe one of them or set-up a new machine at some point.

Compared to other Linux workflow topics, I've found less info on a multi-machine set-up. Part of it is just about networking, which it seems like a lot of the Linux blogs assume you already know how to do `ssh` and `sftp` stuff. I'm learning, but still trying to get a handle on the big picture of what is possible. I think I want to run most things off the desktop. Which I can do in terms of `ssh`ing from the laptop (although when they're all connected that does get me into a weird situation where I'm sending keyboard and mouse commands through Barrier from the desktop to the laptop, then running those commands through the laptop in a desktop terminal session...). Right now, I'm thinking I want to mostly share files from the desktop, so it almost becomes a NAS. Then I could do stuff like take the laptop somewhere else in the house and write code and save it back directly to the desktop, so that for code I'm working on the desktop copy is the source of truth.

### Local dev server

I use a node module called `reload` to run a local server for web apps I'm developing. It watches the directory and automatically reloads the page on changing. I was pleased to discover this worked exactly the same way if I loaded the IP address from my desktop on to my laptop screen. This really makes the "laptop as render screen" work smoothly.

I sometimes daydream about displaying my in-progress work to people passing by. This process made me realize I could do that relatively easier with another screen + computer (possibly a Raspberry Pi) directed at that local dev server.
