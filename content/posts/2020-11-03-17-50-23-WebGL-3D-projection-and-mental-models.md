# WebGL, 3D projection and mental models

I'm working on recreating some graphics editing programs in WebGL. To be able to zoom in on images, I've implemented a pretty standard 3D camera with projection and view matrices. I've found really understanding projection to be difficult. It's one thing to get some cubes placed and rendering in the world, it's another thing to enable mouse interactions, where you have to project and unproject between screen space, view space and world space.

Figuring out the steps for transitioning between the spaces has been difficult, but a nice consequence is that I'm developing a mental model of what is happening on screen that I can reason about. The idea is that the screen reperesents a flat window onto 3D space that extends behind it. I'm starting to be able to intuitively reason about when I can keep something in screen space (the cursor), and when I want to project it into world space (creating a bounding box on an image). Mouse-directed zoom (as movement along a ray projected from the mouse), took me a while to get right, but now I feel like I have a better handle on what it is doing then when I've implemented it in a non-3D camera set-up.

When I have done image editors with zoom in the past, things have always gotten messy while dealing with translation and zoom. Now I feel like maybe that is because I was mixing 2D and 3D concepts. Placing images in 3D perspective space with a camera has required a lot of set-up, but I'm now starting to believe it will really pay off.

The thing where the world is transformed to place the camera at origin through the view matrix is still giving me some headaches. But I'm getting excited about the possibilities that could open up after I've internalized more of this stuff
