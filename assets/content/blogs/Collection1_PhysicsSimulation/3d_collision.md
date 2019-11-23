## 3D Collistion Detection

### Introduction

In previous posts, I stick to two dimensional physics simulations. After implementing tools about the mesh, I had deeper understanding toward principles on three dimensions and started to investigate how to do 3d collision. 

This post mainly discuss how to determined whether colliders are collided or not.

There are several algorithms about collision detection. Here, I mainly introduce Brute Force Method, Gilbert-Johnson-Keerthi Algorithm, and the broad phase of collision detection.

### Brute Force Algorithm

The basic idea is examining whether every point of a collider is in the another collider. If there is one, two colliders would intersect each other.

And there is a situation that a collider is totally inside another. So we need to check conversely at same time.

In order to determined the point is in a collider, it generally checks the number of intersection faces of the ray from the point is even or not.

### Gilbert-Johnson-Keerthi

GJK only applys for convex objects collision dectection, and relies heavily on a concept called the Minkowski Sum. 

Minkowski Sum of two sets of position vectors <b>A</b> and <b>B</b> is formed by adding each vector in <b>A</b> to each vector in <b>B</b>. 

```A + B = {a + b|a∈A, b∈B}```


For GJK, we use the Minkowski Sum of A and -B 

```A - B = {a – b|a∈A, b∈B}```

I will refer it as configuraiton space object(CSO) for clarity sake.

If two shapes are overlapping, CSO will contain the origin

You are probably thinking "Why does CSO relate the overlapping situation?"

This is easy to prove why GJK can correctly represent if two shapes are intersecting. 

<!-- To simplify the sitiuation, let's look at point situation at first. -->
First, as brute force algorithm methioned, there is a point of A would be contains in the B or a point of B would be contains in the A.

Let's assume this point as <b>a</b>, and ```a∈A```.

If <b>a</b> is inside the <b>B</b>, the Minkowski Sum of <b>a</b> and <b>-B</b> contains the origin. In other words, the Minkowski Sum of <b>a</b> and <b>-B</b> represents how points of <b>-B</b> look like in the axis whose origin is <b>a</b>. 

It is same if a point of B would contains in the A. The Minkowski Sum of A and <b>b</b>,```b∈B```, will represents how points of A look like in the axis whose origin is a point of B.

Therefore, if there is a collision, the origin must be included in the CSO.

Conversely, if the origin is inside the CSO, there must exists a point <b>a</b> that origin is contained by Minkowski Sum of <b>a</b> and -B. It could be equally proved by if there is no CSO of <b>a</b> and <b>B</b> contains origin(no collision), CSO would not include the origin. 

According to Separating Axis Theorem, we know "If two convex objects are not penetrating, there exists an axis for which the projection of the objects will not overlap."  It means a plane could divide the origin and CSO, therefore, the origin would not inclded in the CSO.

The prove is same about there is a point of B will be contained by A.

One advantage GJK is that we don't need calculate the CSO, we only need to know whether origin in the CSO or not.

We make the support function return the farthest point in some direction.

The steps are simple, and I list as following.

1. Get the trihedron of, define it as <b>S</b>
2. Check if the origin is enclosed by  <b>S</b>, if ture, return.
3. Get the origin's direction by 4 faces of S, defined  
4. Get farthest point by support function on the direction of 
5. Reconstruct S, go bact to step 2.

### Broad Phase of Collision Detection

The idea behind this is to exclude impossible collision by fastter algorithm, the classic method is bounding box. Use a limited box to embrace the collider, and examine the axis intersection situation avoiding the cost of more precise collisiton detection.

Another way is using KD tree. Every time to query a collider, it cost O(logn).   

Comparing two method, the construcion of KD tree will cost O(nLogn), so if the number checking the collider is less than log(n), it is better to use bounding box method, otherwise, KD tree is good way to use in broad phase collision detection.