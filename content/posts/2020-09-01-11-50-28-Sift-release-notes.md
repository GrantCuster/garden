# Sift: release notes

![](https://grant-uploader.s3.amazonaws.com/2024-08-21-20-10-23.gif)

[Sift](https://sift.constraint.systems) is an experimental image editor that slices an image into layers. You can offset the layers to produce interference patterns and pseudo-3D effects. It uses an additive blending mode and pixel-based light splitting algorithm.

## Origins

I started planning Sift while standing in the ocean, thinking about waves and how to use a wave effect on the pixels of an image. I've gotten used to thinking of images as a grid of pixels, and I've done some experiments using HTML canvas and javascript to move, or even flow, pixels around. I started trying to imagine how pixels could cycle "below the surface" and then pop up on top.

For a wave effect I needed pixel depth. I needed to figure out a way to transform an array of pixels from 2D into 3D. I thought about RGB values. Coud I use the color value as the third dimension by using it to make a pixel stack? What if for a pixel with a red value of 100 I stacked 100 red pixels?

I ended up using the pixel stack idea (and cutting the wave idea, for now), but I had to get the right blending mode and slicing algorithm to get things working.

## Slicing colors

One of the issues with making pixel-specific stacks was that a pixel doesn't have just one color value, it has three (red, green, and blue). I decided to put the "brightest combo" at the top. So for an RGB value of `[10,16,24]` I would start the stack with 10 `[1,1,1]` pixels. Then `16 - 10 = 6` for 6 `[0,1,1]` pixels, and, finally, `24 - 16 = 8` for 8 `[0,0,1]` pixels. This means the white-ish pixels are on top, and then, as those are finished, you see a kind of exhaust trail of color.

(For performance reasons, the finished app bins values according to the number of layers. So instead of 192 stacked `[1,1,1]` pixels for a `[192,192,192]` value, a 16 layer edit in Sift bins `192 / 16 = 12`, for 12 `[16,16,16]` pixels.)

## Blend mode

![Overlapping red, green, and blue squares in additive blend mode.](https://grant-uploader.s3.amazonaws.com/2024-08-21-20-10-23.gif)

The color slicing only works with right blend mode, where each layer's RGB value is added together. For canvas, the blend setting is called `globalCompositeOperation` and the value for additive blending is `lighter`.

Additive blending, while not what I'm used to working with for computers, is actually how our eyes perceive light. I vaguely knew this, but it's been fun to play with it in the app and get a real feel for the consequences.

## Layers and offsets

Originally, I thought I'd build this app in Three.js, where you could rotate around the pixel (actually voxel) stacks in 3D. I thought maybe I could get the perspective such that it appeared a whole image at the start, but as you zoomed in you could see cracks between. I'm still not totally sure if the math for that could be worked out. But I quickly ran into performance issues from trying to render even binned values for every pixel in an image, so I switched over to HTML canvas. (I'm sure there are ways to do this in Three.js, possibly utilizing shaders? If you have ideas let me know.)

I knew performance might be a struggle in canvas as well, but I had a plan. I know canvas can redraw image files (with `drawImage()`) quickly. On image load I split the image into a set number of layers (16 by default), doing all the bin calculations. The render function (peformed whenever the x and y offsets are changed) then just draws those layer images on top of one another and the blend mode takes care of the rest.

## The result

Sometimes I have specific goals for [Constraint Systems](https://constraint.systems) projects, other times I just follow an effect to its end. Other than the "stack" idea, I didn't really have a goal for what Sift should make images into. I was pleasantly surprised by the early results, right after I flipped the blend mode switch. For certain images, it produces a pseudo-3d effect. [Ezekial suggested it's like an aerogel](https://twitter.com/the_ezekiel/status/1299095952339410945). It is also kind of like badly calibrated color separation in a TV (but different because of how it is stacked). Other images you can get kind of an otherwordly thing. I watched _Twin Peaks: The Return_ recently and it reminded of me some of the face distortions from that.

## Future experiments

I'm definitely intrigued by the possibilities of additive blending. Partly due to [Tyler's suggestion](https://twitter.com/tylerangert/status/1299163673424879617), I want to try layering video frames on top of each other using a similar process.

## Larger goals

One of the goals of the Constraint Systems projects is to get really used to thinking of images as a collection of pixels, and work "with the grain" of how computers store images. I think the stacking and layer ideas are good signs that that part of the project is working. My intuition for what might produce interesting image results has gotten better. The mix of having a good idea of what I wanted but not being sure of the final effect is a fun one -- it feels like a collaboration with the computer.
