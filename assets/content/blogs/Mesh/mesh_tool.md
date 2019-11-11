##Terrain Generation Tool

Inspired by the mesh tool implementd by ABZU developer, 
<iframe width="560" height="315" src="https://www.youtube.com/embed/-O3mAQVB_jI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


<!-- <iframe width="1903" height="768" src="https://www.youtube.com/embed/l9NX06mvp2E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
### Effect

Keyword:
3D Math
Mesh difference and union
Mesh smooth


### Implememtation
At first, I majorly divide it into two parts, the first one is about combination of mesh, another is smooth algorithm development. 

#### Mesh Combination
What we need to do is to keep the surface after combining all meshs. 

According to research, I found it is hard to use traditional polythedron collision algorithm to solve this problem, because the mesh is maybe concave, the decomposition from cancave body to convex bodys is a NP-hard problem. Therefore, I use brute-force algorithm to consider the situation for every face when combining two meshes. 

##### face situation
For every face, we should consider whehter or not it get intersected by other faces or that. In order to  simplify the situation, we only tackletriangles intersection, because current respresentation of mesh is majorly by traingle collection. 

So there are three conditions for the traingle intersection. 
1. Two points in the triangle
2. Only one point in the riangle
3. 


#### Mesh connection smooth
There is a problem remaining of last part, the smooth position