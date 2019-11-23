## 3D Collistion Detection

### Result

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/project1_updat1_01.gif" width="50%" height="50%" style="margin:auto"/><img src="http://www.plutoshe.com/assets/content/blogs/assignments/project1_updat2_01.gif" width="50%" height="50%" style="margin:auto"/>

### Introduction

In previous posts, I stick to two-dimensional physics simulations. After implementing tools about the mesh, I had a deeper understanding of principles on three dimensions and started to investigate how to do 3d collision. 

This post mainly discusses how to determine whether colliders collide or not.

There are several algorithms for collision detection. Here, I mainly introduce Brute Force Method, Gilbert-Johnson-Keerthi Algorithm, and the broad phase of collision detection.

### Brute Force Algorithm

The basic idea is examining whether every point of a collider is in another collider. If there is one, two colliders will overlap each other.

A collider is maybe totally inside another, so we need to check the points on both colliders.

To determine the point is in a collider, we generally check the number of intersection faces of the ray of a point is even or not. 

### Gilbert-Johnson-Keerthi

GJK only applies for convex objects collision dectection and relies heavily on a concept called the Minkowski Sum. 

Minkowski Sum of two sets of position vectors <b>A</b> and <b>B</b> is formed by adding each vector in <b>A</b> to each vector in <b>B</b>. 

```A + B = {a + b|a∈A, b∈B}```


For GJK, we use the Minkowski Sum of A and -B 

```A - B = {a – b|a∈A, b∈B}```

I will refer it as Configuration Space Object(CSO) for clarity sake.

If two shapes are overlapping, CSO will contain the origin.

You are probably thinking, "Why does CSO relate the overlapping?"

It is easy to prove why GJK can correctly represent if two shapes are intersecting. 

As the brute force algorithm mentioned, there is a point of A would be contained in the B, or a point of B would be contained in the A. 

I mainly discuss the first condition.

Let's assume this point as <b>a</b>, and ```a∈A```.

<img src="http://www.plutoshe.com/assets/content/blogs/Collection1_PhysicsSimulation/3d_collision_1.png" width="50%" height="50%" style="margin:auto"/>

If <b>a</b> is inside the <b>B</b>, the Minkowski Sum of <b>a</b> and <b>-B</b> will contain the origin. In other words, the Minkowski Sum of <b>a</b> and <b>-B</b> represents how points of origin point reflection of <b>B</b> look like in the axis whose origin is <b>a</b>. 

It is same if <b>A</b> contains a point of <b>B</b>. The Minkowski Sum of <b>A</b> and <b>b</b>,```b∈B```, will represents how points of A look like in the axis whose origin is a point of <b>B</b>.

Therefore, if there is a collision, the origin must be included in the CSO.

Conversely, if the origin is inside the CSO, there must exists a point <b>a</b> that origin is contained by the Minkowski Sum of <b>a</b> and <b>-B</b>(or <b>b</b> is inside <b>A</b>). It could be equally proved by if there is no Minkowski Sum of <b>a</b> and <b>B</b> contains origin(no collision), CSO would not include the origin. 

According to Separating Axis Theorem, we know, "If two convex objects are not penetrating, there exists an axis for which the projection of the objects will not overlap." In three dimensions, there is a common plane that could divide the origin and CSO. Therefore, the origin would not be included in the CSO.

The prove is same for the condition that <b>A</b> contains a point <b>b</b>, ```b∈B```.

One advantage of GJK is that it is not necessary to calculate the CSO; we only need to know whether the CSO encloses origin or not. The convex hull of CSO is called Simplex.

And I define a support function that returns the farthest point in some direction of the CSO.

The steps are simple, and I list as following.

<img src="http://www.plutoshe.com/assets/content/blogs/Collection1_PhysicsSimulation/3d_collision_2.png" width="50%" height="50%" style="margin:auto"/>

1. Get the tetrahedron by points of support functions of four directions. One direction is assigned, one is the reverse by the first one, the third one is perpendicular direction of the line of previous two points calculated, the last one is the normal of plane constructed by three points we calculated. Let's define this tetrahedron as <b>S</b>.
2. If the origin is all inside 4 faces of <b>S</b>,  origin is enclosed by <b>S</b>, then return.
3. Get the face of which origin is outside.
4. Get farthest point by support function on the normal of the face.
5. Reconstruct S by the face and newest point, go back to step 2.

### Broad Phase of Collision Detection

The idea behind this is to exclude impossible collisions by a faster algorithm. The classic method is Bounding Box, using a limited box to embrace the collider, and examine the axis intersection.

Another way is by using the KD tree.  Every time to query a collider, it cost ```O(logn)```.

In terms of performance, the construction of KD tree will cost ```O(n * log(n))```, so if the times comparing collider is less than ```log(n)```, it is better to use bounding box method, otherwise, KD tree is better way to use in the broad phase collision detection.

### Reference

http://www.dyn4j.org/category/gamedev/collision-detection
https://en.wikipedia.org/wiki/Minkowski_addition
