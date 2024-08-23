# Brush as interaction

How do you change things?

I'm interested in users having the ability to personalize websites. I've mainly thought about it as a case for UI that lets you choose different options, probably powered by CSS (see components.ai's [CSS.GUI](https://components.ai/css-gui)).

My [CSS Paint](https://css-paint.constraint.systems) project lets you use a brush. It's interesting to use a brush. Should we let people style their website using a brush to paint styles on to divs?

What out there is like a brush? There is the browser dev tools' element picker. The element picker is almost like a 2-step brush where you first select the element and then you edit it by way of CSS. With a brush you set the CSS then you target the elements.

The advantage of a brush over an element picker or indivdual panel approach is that you could apply it to more elements quickly. Possibly the painting approach puts you in a different mode, less structural, more expressive. Maybe a combo would be best. You structurally build a house and then you expressively paint the walls. Paint a little, sit back and consider, paint a little more.

## Challenges

### Targeting the divs

If I think about being able to "paint divs" to style a website one practical consideration is that, sometimes, divs are on top of other divs, or their boundaries are not obvious. In that case painting may have uninteneded effects. It'd be interesting to try and make a tool where divs always have to have a little padding, as an affordance to be targeted. You could also probably address this by using some of the tools vector tools like Figma use to target different stacked elements, although that would takes away from the simplicity I think.

### Layout shifts

CSS does such a wide range of things, some of them, like changing layout, when applied directly with a brush may be jarring in their results. Maybe you need to limit some of the properties, or maybe you can add hints to the transformations (or even some sort of diff view?) that make what's happening more apparent.

## Connections to atomic CSS / Tailwind

I've been loving using [tailwind](https://tailwind.css) for styles lately, which has some things in common with a brush approach in that you have this wide, but not infinite, set of styles you can choose from, like a palette. I wonder if brush plus tailwind could be a good fit. Prehaps another prototype.
