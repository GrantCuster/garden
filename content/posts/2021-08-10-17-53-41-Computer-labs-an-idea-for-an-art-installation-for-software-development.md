# Computer labs: an idea for an art installation for software development

## The idea

Get a storefront, split it into a front half and a back half. Put six computers in each half. The front half is free for anyone to come and use. The catch is that the free-to-use computers only run the software made in the lab by the in-residence developers that work in the back half. 

## Things to consider

### What level of abstraction

What do you want to be the base of the computers in the front half? How much functionality do you want to build in? As a mostly web dev, I would want to start with some baseline reasonable version of Linux, and would possibly package the programs as local web apps. Different programs might want to start elsewhere.

You also have to balance how much you actually want to enable people to do work. Pre-covid I used to work in the library a fair amount and the screens of people using the computers there were often pretty visible. Lots of kids playing browser-based games and adults looking up things on the internet or writing word docs. What base would you need to be able to make a text editing app that is actually workable for people? Could you make a game kids would return to play?

### How to handle the internet

Working through this as a thought experiment drives home how impressive and also tricky the internet is. Lots of people will want to use the internet, but if you enable it you'll be opening the door to browser-based tools that can be chosen over the software being developed in the lab. Maybe you could enable a browser and a very specific whitelist, but probably you'd want to disable the internet entirely.

### The hope of feedback

My big hope for this experiment would be that it would enable a really tight feedback loop for development. Where someone would hit a limitation of the software, communicate  that, and have a solution built for them in a few hours or the next day. It could function as an evolutionary system insulated from the mainstream, that might develop its own unique software species. It also might operate something like a music scene in a mid-size city, where ideas have room to grow and develop without needing to go up directly against the world's best.

### The possibilities of specifity

One thing I've been struggling with lately (and always) is how to handle the range of input devices and screen sizes web software is expected to run with. Being in a specific place with specific hardware could enable more focus on specific input types. The pressure to build for all situations would be relieved.

### Is the split necessary?

Is there something controlling and hierarchical about the split betweeen the front half and the back half? Possibly. The main reason I settled on the division is a practical one: to make the software the back-half developers need access to lots of tools (including the internet) that it would not be feasible to bootstrap from scratch. Hopefully there would be a point where software for the front-half computers could be written on the front-half computers, using home-grown dev tools. But I imagine that would take some time.

### Inspiration
 
[Hundred Rabbits](https://100r.co/site/about_us.html) are huge inspiration here. They've been building their own suite of creative tools, used by themselves and many others (including me). Their recent work on [Uxn](https://100r.co/site/uxn.html), a virtual computer, could function (as much as I understand it) as an alternate operating system complete with home-grown tools.

### Scaled-down versions

I've experimented a bit with using different machines for different computers. Twitter is blocked on my work desktop but available on my laptop, for example. If you have access to two machines you could run your own sort of mini-lab experiment.
