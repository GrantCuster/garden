# Wysywig brainstorm

Demo that has some promise where all data is in the image file. Sources on the left, canvas layout on the top right. Data encoded as image pixels on the bottom right.

But I'm not excited to jump back into it lately so I need to figure something out.

I think it gets more interesting when I have the three ways of working with the images.

- The first way is like they're... images, the destination has them as movable, resizable boxes.
- The second way is like text. You have keybindings that print the image, and move you to the next square. One undecide piece here is are their text blocks? That complicates things, right? For their to be text blocks - maybe simplifies some things too, maybe they work kind of like they did in Sprout. Expanding out horizontally at first, to some max width then moving down. What is that data structure? Each char belongs to the text block... But that could also help explain why text gets laid out differently. It's not text that does, it's anything in this block. It's a layout in a block yea...
- The third way is paint, makes most sense with colors you could click and drag to print the same image... I guess like chars, a big part of the paint being useful is it should be able to break out of the box clumps - that's why you use it for something like annotation on top of other pieces. Maybe you group it together as you paint - i've done that before too.

But then it's more like a conventional image editor app. Maybe that's fine. I"ve tried to avoid layers before, hmmm...
