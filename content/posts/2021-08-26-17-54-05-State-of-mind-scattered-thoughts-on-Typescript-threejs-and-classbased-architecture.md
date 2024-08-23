# State of mind: scattered thoughts on Typescript, three.js, and class-based architecture

I'm possibly in the midst of revising a bunch of my assumptions about how I like to code projects, so I wanted to write down my current thoughts. I'm probably in a honeymoon phase with the new set-up, so it's possible as I work longer I'll run into a bunch of walls and complications and end up re-revising. 

## Typescript

I have been avoiding trying Typescript, but I've now seen too much work from people working on involved interfaces (mainly Steve Ruiz's work and the Excalidraw project) to justify not at least trying it. So I've been trying it on the new prototype and I think I like it. Barring running into some tremendous catch, I think I'll use it from here on out.

## Combined with three.js

I think a part of why I was prepared for Typescript was because I've been using three.js a lot lately and gotten increasingly used to it's class based architecture for things like meshes and vectors. I got a lot more interested in the possibilities of Typescript when I realized it could help me create classes (or extend existing ones) to augment three.js with capabilities purpose-built for my project. The boundary between the library code and my code feels less set, which feels powerful to me. 

## Moving away from the DOM

Another contributing factor is that since the project I'm working out is all in WebGL world, I don't have the DOM to organize around. Which has made organization using things like classes more important. I wouldn't say it's an easy process, but rebuilding some of the things (like mouse over events) built into the DOM has been a good exercise in realizing that nothing is magic, and that the methods behind this kind of thing are approachable. I think it's also clarifying for me why things like the DOM and the javascript API are built the way they are. Decisions that seemed impenetrable before are now being revealed as a way to strike a balance between flexibility and organizational clarity.
