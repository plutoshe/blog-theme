## 3D

### Introduction

For previous post, I stick to two dimensional physics simulation to make me learn things well. After implementing tools about the mesh, I had deeper understanding toward principless on three dimensions and started to investigate how to do 3d collision. 


### Collision Dectection

There are several algorithms about how to decide if two collider is overlap or not. Here, I mainly introduce the Gilbert-Johnson-Keerthi (GJK) algorithm, one of most famous methods about dealing with polythedron intersections. 

GJK is a binary search algorithm based on space and Minkowski Sum. Minkowski Sum of two sets of position vectors A and B is formed by adding each vector in A to each vector in B, which could apply combining the convex hulls. It only apply for convex objects collision dectection becase of the theory SAT (Separating Axis Theorem) which is "If two convex objects are not penetrating, there exists an axis for which the projection of the objects will not overlap."  

And GJK is getting the difference of convex objects A and B, and check whether or not the origin are in the combination of A and -B.

This is easy to prove why 

### Broad Phase of Collision Detection

The idea behind this is to exclude impossible collision by fastter algorithm, the classic method is bounding box. Use a limited box to embrace the collider, and 