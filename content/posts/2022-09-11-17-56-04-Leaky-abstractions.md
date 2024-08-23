# Leaky abstractions: draft

Something I think a lot about is what level of abstraction to attack a problem on. Here is a loose cataglog of where I've been thinking about it lately.

## React libraries

Previously I've been reluctant to use libraries in my react code, generally preferring to roll my own solutions, believing that you tend to hit a wall with what you can do with libraries and working around their limitations becomes as much or more work than building your own. There are things I would use, like state management libraries, but I figured most of the interaction stuff I'd rather do myself.

On my recent project I've been useing react gesture and react dnd kit, and they've been helping in terms of getting me moving faster and also thinking about how to structure things. React DND kit in particular has this nice set-up where you can generally access either the object you're dropping into or the object your dragging from the drag or drop component. Their turn out to be cases for both and I think, had I been rolling it myself, I probably would have felt bad splitting them out like that.

## React

I settled on using React quite a while ago. I think there are lots of good ideas in there. I think what has changed is how much I trust it and how much I "live in React world". Partly out of necessity, a lot of my earlier projects escaped out of React to use three.js or draw to a canvas directly. These days I've been staying in Rect, and rendering with DOM elements. I think this is partly a shift in my mindset, and partly a feature of React getting a lot more performant in how it batches events. Browser tech, like more CSS layout options and better transform performance, have also made it possible for infinite canvas apps.

## Just JavaScript

Dan Abramove and Maggie Appleton made Just Javascript, which was a really interesting investigation of aligning the user's mental model of JavaScript with how JavaScript works -- particularly on the subject of object and property references (which were super helpful for me to nail down).

Living in a world versus understanding what's going on underneath
Living in a world measuring the performance

Living in a world, with escape hatches

Tailwind, a light abstraction on top of CSS, almost just autocomplete, but also gives you this sense of scale, it buckets things for you. I can also take tailwind defaults as signs of what
