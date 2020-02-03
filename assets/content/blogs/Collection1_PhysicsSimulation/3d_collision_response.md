## 3D Collision Response

### Effect

<img src="/assets/content/blogs/assignments/eng2_finalproject_result.gif" width="50%" height="50%" style="margin:auto"/>

### Introduction

This post wil introduce the method generating response of collided objects. I mainly use contrain based physics simulation. 

As we know about collision detection, if two objects collided, we want to influence each other. However, before causing the final effect, we need to know the current status of two objects. The most important factor is the penetration vector and closet points. 

### EPA Algorithm(Expanding Polytope Algorithm)

EPA algorithm, as GJK, also use Minkowski Sum as its base to get the closet points. The main idea is to find the shortest distance between the origin and the border of CSO.

It is not hard to prove it.

The penetration vector, in other words, is a vector which moving an object along this vector causes two objects won't collide each other.

As the definition of CSO, we could easily conduct that moving the CSO along a vector is equal to moving an object. 

Therefore, in order to get the peneration vector, we only need to get the shortest distance between the border of CSO and the origin, as moving the CSO along it will cause that CSO doesn't contain the origin, which means two objects will not collide with each other. And the contact points are the closet points.
    
The steps to achieve this algorithm are listing fllowing.

  1. Get the simplex after GJK finished, if the simplex is less than 4 vertices, expand it to 4. Then use 4 faces of the tetrahedron as the intial polytope.
  2. Get the closet faces, you currently have, to the origin.
  3. Remove current closet face, use the face normal to find the farthest point of CSO.
  4. If the farthest point has been involved(which means current closet face is on border of CSO), end this algorithm.
  5. Remove all faces which cannot ensure current polytope is convex. In other words, remove the faces which the current choosing porint is positve to its normal.
  6. Reconstrcut the polytope based on remaining polytope and current choosing point.
  7. Go back to step 2.

### Contact Constraints

### Reference

<http://web.cse.ohio-state.edu/~parent.1/classes/888/math/impulseForces.pdf>

<https://www.physicsclassroom.com/calcpad/momentum>

<https://en.wikipedia.org/wiki/Collision_response>

<http://www.mft-spirit.nl/files/MTamis_ConstraintBasedPhysicsSolver.pdf>

<http://www.allenchou.net/2013/12/game-physics-resolution-contact-constraints/>

<https://www.youtube.com/watch?v=SHinxAhv1ZE&list=WL&index=58&t=662s>

<https://www.youtube.com/watch?v=7_nKOET6zwI&list=WL&index=57&t=0s>
