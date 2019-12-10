## Voxel-based Rigidbody Simluation

### Result

<img src="/assets/content/blogs/Collection1_PhysicsSimulation/2d_rigidbody.gif" width="50%" height="50%" style="margin:auto"/>

### Introduction

I mainly implemented a 2d rigid-body physics collision based on the 3d voxel division method. The primary reference is Chapter 29 of "GPU Gem 3", [" Real-Time Rigid Body Simulation on GPUs"](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch29.html). 

This project mainly uses WebGL, three.js, and node.js. 

This method mainly based on space division. As divided the rigidbodies into the same size particles, we only need to consider the collision between these particles. And we also divide the space into cells and get the cell occupations of the particle. Therefore, the collision between particles could directly convert to check the particles that have the same cell occupation. 

This method speeds up collision detection time between rigidbodies.

### Space Division And GPU Texture based Storage

<img src="/assets/content/blogs/Collection1_PhysicsSimulation/2d_rigidbody_1.jpg" width="50%" height="50%" style="margin:auto"/>

Currently, I only tackle the 2-dimensional situaton and divided the whole two-dimensional space and rigidbody into pixel-based cells. 

As the texture's flexibility is improving as graphics hardware evolves, we store the status of the cell and the status of the particle in textures. 

It is worth noting that GPU has a limitation on the size of texture, so we need conversions between the coordinates of textures and the index of the arrays.

### Using stencil buffer to detect collision

After updating the velocity/position of the particle, we need to solve the collision, and we can smartly tackle the cell occupation, I mentioned before, by the stencil buffer. 

Initially, we can clear the stencil buffer.

In every pass, we check the rendering times of a specific position of a texture.

For example, if we want to get the index of the second particle, which will collide in a cell, the following code could be used.

```
    glColorMask(false, true, false, false);
    glStencilOp(GL_INCR, GL_INCR, GL_INCR);
    glStencilFunc(GL_EQUAL, 1, 0xff);
```

This method could be extended to store more than four particles per pixel by rendering to multiple render targets.

### Collision response

The collision response part is introduced in this [post](http://www.plutoshe.com/blog/3dCollisionResponse).

### Reference

<https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch29.html>

<https://threejs.org/>

<https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API>