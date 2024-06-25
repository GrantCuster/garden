# Swapping color schemes across all terminals and Vim with Pywal and Base16

![Switching between light and dark colorschemes in all terminals using a hotkey.](https://grant-uploader.s3.amazonaws.com/2024-06-19-21-34-47.gif) 

I recently got instant light and dark color scheme toggle working for all open terminals, including those running Vim. I used a combination of techniques from [Pywal](https://github.com/dylanaraps/pywal) and [Base16 shell](https://github.com/chriskempson/base16-shell), and learned some things about scripting in Linux and escape sequences along the way.

## Pywal

[Pywal](https://github.com/dylanaraps/pywal) is a package for switching color schemes system wide. Mostly it is known for generating those color schemes from images, but it also comes bundled with a bunch of predefined themes. I wanted to use it to switch between [gruvbox](https://github.com/morhetz/gruvbox) light and dark themes.

Pywal can change the color schemes for all open terminals automatically. It can also switch colors for several other Linux applications.

### How Pywal works

This is what the gruvbox dark theme looks like in Pywal's colorschemes directory:

```
# Pywal gruvbox colorscheme
{
  "special": {
    "background": "#282828",
    "foreground": "#a89984",
    "cursor": "#ebdbb2"
  },
  "colors": {
    "color0": "#282828",
    "color1": "#cc241d",
    "color2": "#d79921",
    "color3": "#b58900",
    "color4": "#458588",
    "color5": "#b16286",
    "color6": "#689d6a",
    "color7": "#a89984",
    "color8": "#928374",
    "color9": "#cc241d",
    "color10": "#d79921",
    "color11": "#b58900",
    "color12": "#458588",
    "color13": "#b16286",
    "color14": "#689d6a",
    "color15": "#a89984"
  }
}
```
A JSON file declaring each color. OK, but how do those colors get communicated to the applications? The [customization](https://github.com/dylanaraps/pywal/wiki/Customization) instructions mention `~/.cache/wal` a lot, so let's see what's in there:

```
# ls ~/.cache/wal
colors                      colors-putty.reg         colors-tty.sh        colors.Xresources
colors.css                  colors-rofi-dark.rasi    colors-wal-dmenu.h   colors.yml
colors.hs                   colors-rofi-light.rasi   colors-wal-dwm.h     sequences
colors.json                 colors.scss              colors-wal-st.h      wal
colors-kitty.conf           colors.sh                colors-wal-tabbed.h
colors-konsole.colorscheme  colors-speedcrunch.json  colors-wal.vim
colors-oomox                colors-sway              colors-waybar.css
```

Ah! It's using the JSON color schemes to generate application specific color scheme files. This is  a great example of figuring out which level of abstraction to intervene at: Pywal defines a standard color scheme spec and uses application specific templates to generate files from it. If anyone wants to add a new color scheme or application template the procedure for doing so is clear and self-contained.

### Live reload and escape sequences

To change color schemes in most applications, Pywal builds the color config file and sends a message to the application to reload. For terminals, it does something different. It uses [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code), invisible character sequences that give a terminal color and formatting instructions, to instantly swap out the colors.

You can see how this works in Pywal's [sequences.py](https://github.com/dylanaraps/pywal/blob/master/pywal/sequences.py). The conversion from the JSON hex color to the terminal readable escape sequence is here: 

```
# from pywal/sequences.py
def set_color(index, color):
    """Convert a hex color to a text color sequence."""
    if OS == "Darwin" and index < 20:
        return "\033]P%1x%s\033\\" % (index, color.strip("#"))

    return "\033]4;%s;%s\033\\" % (index, color)
```

Escape sequences, which I've only seen otherwise in terminal prompt customizations, are not easy to parse or write for a human, but as part of a script they're a powerful way to achieve instant terminal color palette swaps. I don't think anyone would design an API featuring anything like escape sequences today, but in this case they make for a much smoother experience than a "change config and reload" cycle.

Now let's look at how the escape sequences get sent to the terminal:

```
# from pywal/sequences.py
def send(colors, cache_dir=CACHE_DIR, to_send=True, vte_fix=False):
    """Send colors to all open terminals."""
    if OS == "Darwin":
        tty_pattern = "/dev/ttys00[0-9]*"

    else:
        tty_pattern = "/dev/pts/[0-9]*"

    sequences = create_sequences(colors, vte_fix)

    # Writing to "/dev/pts/[0-9] lets you send data to open terminals.
    if to_send:
        for term in glob.glob(tty_pattern):
        util.save_file(sequences, term)

    util.save_file(sequences, os.path.join(cache_dir, "sequences"))
    logging.info("Set terminal colors.")
```

This shows the power of Unix's "everything is a file" approach. The script locates the file for each open terminal and writes the sequences directly to it (same as you would write to a text file). And it just works. 

### Vim issues

Pywal worked beautifully for me except for Vim. It may not be an issue depending on how your Vim and terminal color schemes are configured, but in my case to get the proper color scheme I needed to not only swap the terminal colors but also toggle the `background` setting in Vim between `light` and `dark`. I eventually got this working using `xdotool` to trigger a toggle hotkey in Vim, but it was not nearly as clean a process as the main `write directly to terminal` Pywal approach. So I went hunting for other solutions.

## Base16

[Base16](https://github.com/chriskempson/base16) is a standardized format for creating 16-color terminal color schemes. Those color schemes can then be combined with templates to produce color configurations for a wide range of applications. [Base16 shell](https://github.com/chriskempson/base16-shell) is a set of scripts that converts those color schemes into escape sequences to be applied to terminals.

The main draw for me for Base16 was that their [Vim package](https://github.com/chriskempson/base16-vim) lets you set a base Vim color scheme that works wonderfully with any Base16 terminal color scheme, no `background` setting change needed. (Pywal does also have a version of this, but I was much less impressed with the base Pywal Vim color scheme.)

### Applying Base16 to all open terminals

Base16 shell, unlike Pywal, only applies the new color scheme to your current terminal. This set-up has its own interesting possibilities (different color schemes for terminals where you `ssh`ed; random color scheme for each new terminal) but I wanted the color scheme to be applied globally. So I frankensteined a bit of Pywal into the Base16 shell script:

```
# Modified Base16 shell script
...
terms=`ls /dev/pts/[0-9]*`
terms="${terms} $PWD/.cache/base16/sequences"
for term in $terms
do
  # 16 color space
  put_template 0  $color00
  ...
done
...
```
 
I converted the Pywal `send` function into Bash, and wrapped the part of the shell script that sent the escape sequences. I also set it to save the sequences to a cache, to be run for each new terminal. This got me the exact terminal and Vim color swap I wanted. I set up a toggle script and assigned a hotkey using my window mananger `i3wm`. If I want to swap color palettes on other applications, I can add the necessary steps into the toggle script. I like knowing exactly what the toggle script is doing, vs. Pywal's "we'll try and take care of everything we can".

[The final result.](https://grant-uploader.s3.amazonaws.com/2024-06-19-21-34-47.gif)

I just modified the shell scripts for the specific gruvbox color schemes I wanted, but the cleaner way to do it would be to modify the shell template and regenerate them all. For now, I'm happy I got everything working and learned more about escape sequences and the structure of the Linux file system in the process.

## Lessons learned

Part of why I'm exploring Linux and scripting is to get a feel for how software could be more customizeable. A few things were especially interesting to me here:

1. Writing to all open terminals is a great example of the power of "everything is a file". Being able to locate all the open terminals and send the escape sequences to them through the file system interface shifted my mental model about scripting possibilities. I usually think of applications and files as very separate, and this blurred that a bit. I'd seen people talk about the power of the file concept before but this is one of the first times its been useful for something I was trying to do. I will spend some time thinking about how the file system concept could be applied to the software I make.
2. Escape sequences. I'm trying to think if you would ever want to include them (or a concept like them) in an application created from scratch. I don't think so. They're useful when you want to do formatting and the only interface you have with the program is that you can write text characters to it. The style is embedded in the text, but because the embedding is invisible it's going to be pretty unpredictable if you try and move it between programs.
3. The power of plain text and the being able to manipulate plain text. Lots of the config files for Linux applications are in a simple, plain text format. Coming from Javascript, I'm more used to intaking data as JSON and doing the manipulation in Javascript. In Linux you're more likely to manipulate the text directly, and there's a bunch of tools to help you do this. I'm sure that in some respects this leads to more formatting edge-case errors, but there's also a beauty to the simplicity. You can see this in how Pywal handles changing color config for a lot of applications: generate a color config in the proper format, then just include that in the larger appplication configuration. 
