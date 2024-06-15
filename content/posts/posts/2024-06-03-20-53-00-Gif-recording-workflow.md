# Gif recording workflow

One of the best things I had going with my old linux set up was my gif recording workflow. I had a few helper scripts connected to dmenu (and then I think rofi and fzf), where I could record the screen and then convert into gif. It was still a bit janky. But it made it pretty quick to take work-in-progress clips and post to [my feed](https://feed.grantcuster.com).

Since I tore down my set-up and rebuilt on Ubuntu server install and Nix home-manager I haven't had a good gif set up. Tonight I think I got it fixed up though I'm sure I will continue to tinker.

The bulk of what makes it work is in [gif.sh](https://github.com/GrantCuster/nix-simple/blob/a8569ed3c3b25ba11066d449bdcdb0276f07856f/home/scripts/gif.sh). The majority of which is from [this comment by IntelligentPerson_ on Reddit](https://www.reddit.com/r/swaywm/comments/vr78q2/comment/l0atg5j/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1). Slightly modified to fit with keyboard shortcuts. It's even got nice little notifications.

The rest of what makes it work are in my [sway config](https://github.com/GrantCuster/nix-simple/blob/a8569ed3c3b25ba11066d449bdcdb0276f07856f/home/sway/config) and [status script](https://github.com/GrantCuster/nix-simple/blob/a8569ed3c3b25ba11066d449bdcdb0276f07856f/home/sway/status.sh). I even have a little recording indicator this time around. Something I never had in the last one.

I can't say I enjoy writing bash, but I'm starting to see more patterns, and have more of a base to reuse snippets from.

Here's an example gif:

![My sway setup featuring pokemon oblique strategies script](https://db-feed.s3.us-east-1.amazonaws.com/next-s3-uploads/4531ea8b-91d0-4d4b-8872-d1fd9a8cec84/2024-06-04_00-39-08.gif)
