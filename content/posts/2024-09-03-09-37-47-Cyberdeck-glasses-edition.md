# Cyberdeck: glasses edition

![The elements: mini PC, AR glasses, portable battery, bluetooth keyboard](https://grant-uploader.s3.amazonaws.com/2024-09-03-16-21-02-2000.jpg)

![Simulation of POV from the porch. A floating window over the world.](https://grant-uploader.s3.amazonaws.com/2024-09-03-16-21-46-2000.jpg)

After trying out a [DIY deck version](/2024-04-22-20-46-52/), I've redone my cyberdeck experiment using AR glasses. It's not perfect but I've been using it pretty consistently on subway commutes and porch nights.

## Parts list

The parts list - very much inspired by the [Cyberdeck subreddit](https://www.reddit.com/r/cyberDeck/)

- Melee mini PC, Intel N100, 8gb RAM - [amazon link](https://www.amazon.com/dp/B0CP3WV82R)
- Xreal air 2 pro AR glasses - [link](https://us.shop.xreal.com/products/xreal-air-2-pro)
- INIU 45w charger - [link](https://www.amazon.com/dp/B09GJQG5S3?ref_=pe_386300_442618370_TE_sc_as_ri_0)
- Technikable bluetooth keyboard - [link](https://www.boardsource.xyz/products/Technikable)

The big plus of the mini PC is it has a powered display portout that can run the glasses, and another usb-c in for the battery (or laptop charger) power.

Most of the time this all gets transported in Bellroy crossbody bag.

- Bellroy bag

![Contents in the bag](https://grant-uploader.s3.amazonaws.com/2024-09-03-16-22-25-2000.jpg)

This is an iteration of when I had a keyboard plugging into my iPhone. The [exposed keyboard had a look](https://garden.grantcuster.com/2024-03-11-00-36-36/), but is probably not good for long term durability.

## Software

For software it runs the same thing I've been running everywhere these days. Ubuntu server with most things managed using Nix home-manager. Sway for a window manager. It is great to have things in sync with my Linux laptop, and close to sync (through home-manager) with the Mac I use at work.

## Visibility

I run the glasses in monitor mode, so there's no eye-tracking or anything. The compatibility has been great (can plug and unplug just like any other monitor). Readability can be tough, especially when looking at corners. I have the display scaled up to 2xwhich basically solves readability at the cost of information density. Sway helps here, it feels great to have basically no system chrome in the way.

![Simulation screenshot, close to what it looks like in practice](https://grant-uploader.s3.amazonaws.com/2024-09-03-16-21-46-2000.jpg)

The glasses work well in shade and rooms. In bright sunlight one of the biggest challenges is actually reflection up from your chest/shirt. The glasses cover helps a lot with this, it'd be cool to have a version that didn't also block out all light. A good candidate for 3D printing maybe.

## The keyboard

The keyboard is kind of its own whole deal, if you're doing this set up and aren't already deep in ergo keyboard world (see [ErgoMech subreddit](https://www.reddit.com/r/ErgoMechKeyboards/)), just get a conventional bluetooth keyboard + trackpad combo. That said the keyboard (using the [miryoku layout](https://github.com/manna-harbour/miryoku)) is a lot of fun as a lap keyboard, and the mouse keys feature is good in a pinch. 

Bluetooth has been the biggest hiccup, though. Sometimes the connection is choppy, with lots of latency. I don't know enough to know if it's the keyboard broadcaster, the mini PC bluetooth receiver, the bluetooth software, or some combo. Will continue investigating that. If I'm having lots of trouble and going to be sat for a while I just plug it in and use as a USB keyboard since that works to.

## Uses

### Subway

So far I mostly use it on the subway to noodle on side projects or write things like this post. I have about 45 minutes on the train, so it's great to be able to use that time I'd otherwise probably dedicate to podcasts. I've sometimes pulled out a laptop on the subway, this is less obtrusive but probably looks weirder - still I hope it's mostly an enjoyable cyberpunk-ish curiousity for the other riders. Noone has said anything to me about it yet.

### Porch

I've also been using it on the porch, especially when trying to do some writing after the baby's gone to bed. This works OK - it's pretty with the neighbordhood visible in the background, but I also feel like I'm pushing myself to use it there. Part of using it is really appreciating the laptop form factor - the extra screen space (because not scaled), the ability to look at different parts of the screen without it following you around... I wouldn't be surprised if I shift back to that more. The glasses setup really shines for the portability. But it's also a matter of getting the kinks/friction out, it's possible if I get my software set up just the right way I'll reach for the glasses more.

### TV

![](https://grant-uploader.s3.amazonaws.com/2024-09-03-16-23-14-2000.jpg)

This doesn't involve the glasses but I realized I can plug the mini PC into the TV, it's kind of nice for an almost ambient coding experience, where I can drop in, change a few lines, then walk away and straighten something up. Maybe there's some fit with the [Ambient TV](https://garden.grantcuster.com/2024-08-19-18-17-26/) setup there.

### Monitor

It also works as a regular PC, I wasn't expecting to use it much this way, but it's nice if I'm in the process of working on something and need a change of scenery. The combined display port means it plugs right into a one-cord laptop dock.

The mini PC is so small it's almost like plugging in a cartridge. I wonder if there's some fun/interesting setup with multiple task-specific mini PCs you swap out.

### Entertainment

I haven't pursued it much but I also want to have things set up to watch videos, particularly on subway rides where I don't get a seat. MPV and the media controls on bluetooth headphones should get me most of the way I think.

## Do I recommend it 

The challenge with any of this homebrew deck stuff is it's going to have sharp edges. If you really want to do this it's doable, but it definitely has a time cost. I hope to continue to iterate and make things smoother - paving the way for more alternative setups.
