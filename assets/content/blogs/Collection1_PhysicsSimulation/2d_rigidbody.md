## Voxel based rigidbody simluation

#### Introduction
This post is part of physics simulation series. It mainly simulate 2d rigidbody physics collision based on the 3d voxel division method. The main reference is Chapter 29, [" Real-Time Rigid Body Simulation on GPUs"](https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch29.html), of "GPU Gem 3". 

This project mainly use WebGL, three.js and nodejs. 

Through this method, 

Keyword: voxel/pixel based, rigidbody simulation, WebGL

#### Space Division And GPU Texture based Storage
Currently, we only tackle the 2-dimensional situaton, and divided the whole projec

#### Using stencil buffer to detect collision

As the ariticle metioned, we smartly tackle the collision by the stencil buffer, because