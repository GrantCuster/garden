# Constraint Systems draft

I'm going to give a work presentation on Constraint Systems, going to start drafting out the pieces here:

Constraint Systems is a series of side projects I've been working on for about five years now.

It's a collection of 30 alternative interfaces for creating and editing images and text.

The tools are focused on engaging with digital as a material. Whether it is pixels, text, or CSS.

I started working on these tools when I was mainly doing data visualization for a day job. Data visualization shares a lot of techniques with creative web tools, in terms of how you draw and update objects, but it was still a big jump for me to move to something where the user could draw on the screeen. It's a jump I'd been wanting to make for a long time though.tools,

I also had a lot of experience and ideas about how to make and present prototyhpes. Specifically my day job involved making a lot of prototypes, but had a lot of barriers to releasing them. I had some ideas about how to build practice around regularly releasing prototypes.

The first prototype, a simple canvas drawing app, was directly inspired by Hundred Rabbits work. They're a couple who live on a sailboat and make experimental code and art. They had done this drawing tool noodle, which was hyper-minimalist one-bit art drawing tool. And then they used it to make art everyday.

I'm still trying to pinpoint why I'm so interested in minimalist stuff, partly it is about aesthetics. I think a bigger point is that I like to see stuff that exposes how it works. That gives you a mental model of how it works as you're doing.

Something where you can say "I bet this is how this works" and you often turn out to be right.

Treating digital as a material is tricky, since computers are abstracting, "anything" machines. But they have a grain to them. If you try and trace them back to their primitives you get interestingb results. Not necessarily the 'true' primitives, but interesting ones.

Primitives I return to a lot:

- Canvas as a collection of pixels. Screen as a collection of pixsels. What you see on a computer screen is a grid of pixels. There's no denying that and I can't imagine that goes away anytime soon.
- Writing as a set of words, letters, sentences, and paragraphs. Ultimately that is all down to characters, and how those characters are laid out in sequence.

Flipping back and forth between those two concepts drives a lot of the exsperiments.

A screen is a collection of pixels: specificallyh a grid of RGBA values, ranging from 0-255.

I usually work in canvas, which feels natural to me. I don't get too much into shaders, which are arguably more natural at this pont? This is where digital as material is tricky/, I'm owrking several abstractions up.

Many of the experiences grew out of wanting to try out a specific technology more. Flow is probably the most popular, it mainly came out of realizing that the canvas drawImage function is very fast. It layers a bunch on top of each other. It's also an exercise in not overpreparing. You can bog it down by creating too many flows, I just, don't worry about that. Which is hopefully a signal of trust in some ways.

I also really want people to have control of their environments. I'm fascinated by times where you were allowed to really skin your OS. Leading to things like Hot Dog stand. Limiting people to a pretty palette can be limiting of self expression. There are lots of good reasons to have limits, accessibility and safety being main ones. But need to be balanced at times with giving user agency. Face is an exaqmple, hwere you can edit both the font and the text.

Something about this reminds me of play where you can see all of the elements you have to play with. You can think about how to combine them. The computer can hide elements for you, to save space and make things simpler. But it makes things feel brittle somehow. Like you're not on solid ground. I want to be on solid ground.

Especially in the early days, I thought about the text editor Vim inrelation to this. Vim is a text editor where there are distinct modes. By default you're in 'normal' mode where every key is a kind of shortcut for navigating or editing texxt. This system is now over 40 years old. It is interesting to me because it gives a sense of stability. It also is one of the most successful alternative methods for editing text. It has a big learning curve -- the cost of any alternative system, but people have found it valuable and/or interesting enough to keep at.
