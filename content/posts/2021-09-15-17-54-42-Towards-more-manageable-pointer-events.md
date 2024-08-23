# Towards more manageable pointer events

Working with mouse and touch events is one of the biggest challenges for me in making interactive web apps. The availability of [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) helps a lot, but I still pretty quickly end up with a mess of conditionals that are hard to reason about. I'm working on some new strategies and abstractions to help with this.

## PointerOne, PointerTwo, PointerThree

The pointer event API provides events for `pointerDown`, `pointerMove`, and `pointerUp`. Using the `pointerId` provided you can link those events together into a continuous Pointer object that contains the whole lifecycle. I put this together into a `SubPointer` class.

The `SubPointer`'s feed into another level of abstraction, based on how many active touches there are: `PointerOne`, `PointerTwo`, and `PointerThree`. This is meant to match how I think about these actions ("I want to do this when the user has two fingers down"). All of them feature fields for the `initial` and `current` pointer position. I use those values for things like drag (pan the canvas based on the distance between `current` and `initial`).

You can see code and a very barebones demo of this approach at https://github.com/GrantCuster/pointy.

### Averaging pointers

Something I formalized in this set-up is the idea of average pointers. When two fingers are down I average their position to get the midpoint between them (same for three). This makes a lot of actions, like moving the canvas on two-finger drag and rotating the camera on three-finger drag, more straightforward to code. I can mostly just feed in the values from the average Pointer.

### Managing lifecycles

The separate pointer abstraction also helps me think more clearly about pointer continuity. When you add a second touch, the already-active first touch continues. But I think you generally want to throw away that first touch, and 'start from scratch' with a new two-touch event. An example touch setup:

1. One-finger drag: draw an area select 
2. Two-finger drag: pan the canvas

In this case when you move from one-finger to two-finger you want to end or cancel the one-finger drag action, and in terms of dragging, you want to reset the initial value to an average of both pointers' current location. I work this out in the `SubPointer` class so that the `PointerOne` and `PointerTwo` behavior is exactly what I expect. Basically anytime the number of touches switch it ends the current Pointer and starts the new one. The logic in `SubPointer` still gets kind of gnarly but at least it's contained there. Overall I like the behavior of having a higher set of abstractions that, for my purposes 'just work', powered by a lower set of abstractions that I can dip into when I need to.

## Keyboard mouse buttons

Another big driver of complexity in my input management is keyboard events and modifiers. Modifying the pointer behavior based on a pressed key is often intuitive to the user but will snarl your pointer handling code quickly. 

I'm experimenting with an approach based on how the pointer events work. The trick here again turns out to be about managing lifecycles. 

If you have a key that modifies pointer behavior you need to think about how you're going to handle a user starting a pointer event then pressing the key, then unpressing the key, all while the touch is still active. I decided to just 'interrupt' the current touch behavior and restart it. That way I only need to check for the relevant keypress on `PointerOne`'s start and move events. My conditionals in those events are still growing larger than I'd like, but at least they're contained and easier to reason about.

In effect this approach is turning key presses into `pointerDown` (and `pointerUp`) events. It's early days but so far this approach has it made it much easier for me to reason about key and pointer combos.

