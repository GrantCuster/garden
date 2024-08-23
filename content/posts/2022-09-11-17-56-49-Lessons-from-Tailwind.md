# Lessons from Tailwind

Tailwind gives you a bunch of utility classNames to write CSS with. I've been loving prototyping with it, and I'm interested in why, because it's ideas often feel counterintuitive.

## Benefits

### Pragmatism

Tailwind gives you a lot of utility classes for things I might have just wrote in inline styles. I think the selection of available classes for things like padding and margins is very pragmatic. They could have tried to limit further in the name of consistency but you can get most of the intervals you want. With things like `p-0.5` (2px) and `p-1.5` (6px) there when you really need them. This keeps you using Tailwind classes where otherwise you might have escape-hatched to inline styles (more on that escape hatch later). Mostly to me it feels reassuring, like people who have actually coded up real apps, and they're sitting there with you saying "yea sometimes you have to pull out the `p-0.5`, that's just the way it goes".

### Hover states

Because they make it easy for you to stay in the system, it's then easy for you to take advantage of the system. One of it's big advantages is the ability to directly write hover (and other psuedo-states) with the `hover:` prefix. This alone is probably worth the learning curve of moving over from inline-styles. Responsiveness works similarly (though, it should be said, is a bit messier just because that often involves more structural changes).

### Most-used filter

From a systems perspective, I always find it interesting to see what properties Tailwind has chosen to promote into utilities, particularly for things like flexbox or grid. I take what's there as a proxy for what is often used. I use it a little how I use Github Copilot in this respect. Most of the time, what is suggested or exposed is the happy path, sometimes the effect I'm going for requires moving off it, but even then, the knowledge that I'm going someplace a little unusual is useful. If it's an important/core feature I go into knowing I need to do my research and watch my step. If it's not core I can probably figure out a similar effect with more conventional components.

For certain properties, like border-radius and box-shadows, the presets are good enough for prototyping in an extremely helpful way. Keeping you from going down a shadow-tweaking rabbit hole. And then exposed through the theming system to be tweaked later.

### Extension

The VS Code extension for Tailwind is wonderful, it gives you autocomplete, once you get some hang of the properties you rarely need to refer to the documentation. The pixel values it shows you for spacing are still how I think of spacing in my head, and therefore a big help.

### Colocation

You write the styles in the components, with minimal boilerplate. I'm continually surprised at how much of a difference this makes.

### Escape hatches

One of the great things about Tailwind, that I think other framework aspire to but rarely approach, is how it never keeps you from touching the CSS directly where you need to. The apply function means you can assemble class groups where it makes sense, and you still always have inline-styles right there. This makes it so easy to try, and in my experience, have it gradually displace most of your inline-style writing. I can imagine a system similar to Tailwind where the classes instead go in as React properties, this seems cleaner in many ways, you could have more of a separation of styling versus layout, compared to the jumbled bag that is today's CSS. But Tailwind is simpler and "good enough" in a way that's great. I wonder what other opportunities there are to do something like that.
