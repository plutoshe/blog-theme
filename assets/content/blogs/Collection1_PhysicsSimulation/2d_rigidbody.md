## Voxel based rigidbody simluation

### Result

### Introduction

I mainly implemented 2d rigidbody physics collision based on the 3d voxel division method. The main reference is Chapter 29 of "GPU Gem 3", [" Real-Time Rigid Body Simulation on GPUs"](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch29.html). 

This project mainly use WebGL, three.js and nodejs. 

This method mainly based on space division. As divided the rigidbodies into same size particles, we only need to consider the collision between these particles. And we also divide the space into cells, and get the cell occupations of the particle. Therefore, the collsion between particles could directy convert to check the particles whose have same cell occupation. 

This method speed up collision detecion time between rigidbodys.

### Space Division And GPU Texture based Storage

<img src="http://www.plutoshe.com/assets/content/blogs/Collection1_PhysicsSimulation/3d_collision_1.png" width="50%" height="50%" style="margin:auto"/>

Currently, I only tackle the 2-dimensional situaton, and divided the whole two-dimensional space and rigidbody into pixel based cell. 

As the texture's flexibility is improving as graphics hardware evolves, we store the status of cell and the status of particle in textures. 

It is worth noting that GPU has limitation on the size of texture, so we need to create conversion between the coordinates of textures and the index of array.

### Using stencil buffer to detect collision

After updating the velocity/position of particle, we need to solve the collision, and we can smartly tackle the cell occupation, I metioned before, by the stencil buffer. 

Initially, we clear stencil buffer.

In every pass, we check if the times of greater current 

```
    glColorMask(false, true, false, false);
    glStencilOp(GL_INCR, GL_INCR, GL_INCR);
    glStencilFunc(GL_EQUAL, 1, 0xff);
```

This method could be extended to store more than four particles per pixel by rendering to multiple render targets.

### Collision response

Collision response part is introduced in this [post](http://www.plutoshe.com/blog/3dCollisionResponse).

### Reference

https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch29.html

https://threejs.org/

https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API