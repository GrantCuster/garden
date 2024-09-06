# Hand landmark ideas

Brainstorming on the train. Laying out the pieces.

I can use mediapipe hand landmark. I know the positions of the fingers. I'll use pointer finger as cursor, if they have two hands up I can use both of them...

I can use pointer and thumb pincer as click. I can normalize distance based on lower knuckle thumb distance probably. Click and drag works with that motion too, although maybe it's a shame you can't just point and drag - maybe also some ability to toggle based on the other hand.

You could also try and distinguish point and drag from fist, so that raising one finger was the trigger - interesting you'd want to wait until it was fully raised though, probably need a little delay.

Idea to use your hand to 'freeze pixels' in a webcam just by dragging across an area... Question of when your fingers are 'live' and active.

Pixelate pixels by clicking, every click doubles the pixel area. That would actually work I think. I donder if I even grid it out in that case or just do it iteratively over the top... I think do it over the top but bigger pixels would overwrite smaller pixels. You'd want to set up pointerDown, pointerMove, pointerUp events, which would be fun in it's own right. And I guess you'd always track pointer as pointer... I think I'd need to chunk it up a bit though, because there's got to be some instability just sitting that there's not with a mouse or trackpad.

Maybe that's a good first demo. Pointerdown, pointermove, pointerup. What do you do when a hand goes offscreen? I think you keep it down if it's down huh? Till it comes back not down.

A bummer with webcam examples is I won't be able to write them on the train.
