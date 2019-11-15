##Terrain Generation Tool

### Introduction

This project is inspired by the mesh tool implementd by ABZU developer, it will automatically smooth the steep conversion after meshs combination. 
<iframe width="560" height="315" src="https://www.youtube.com/embed/-O3mAQVB_jI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Currently, the first version that I've done is reconstructing the faces after combining meshs, and implement several smooth algorithms.

The project aiming to generate desired terrain based on the combination of different mesh, leviate how people design complex terrain.

Keyword:
3D Math
Mesh difference and union
Mesh smooth

#### Mesh Combination
The idea behind this step is to deleting faces except surface after combining two meshs, it will enable future mesh combination and  help late smooth algorithm, getting rid of the influence of unnecessay faces the combined mesh have.

At first, to generate the combined faces, the intersected faces need to be divided.

According to research, it is hard to use traditional polythedron collision algorithm to solve this problem, because the mesh is maybe concave, the decomposition from cancave body to convex bodys is a NP-hard problem. Therefore, A brute-force algorithm is considered a good method dividing the faces.

In order to simplify the situation, we only tackle triangles intersection, because current respresentation of mesh is majorly by traingle collection. 

<!--  -->

The intersection situation for one mesh will something like following pic,

It will not have the internal point, because it is only surface existing, also, that is why we need to clear the internal faces in this step. 

So there are three conditions for the two traingle intersection. 
1. Two points are in the triangle
2. Only one point in the triangle, line 
3. Two points out of the tirangle

For two points inside situation, we treat as two single point.

For situation #2, we get point intersect the traingle, and do something like #1.

For situation #3, there are two situation, if the line not intersect the traingle, ignore it, otherwise, get the intersection points and treat it as the first version.

<!-- pic #3 -->

While we get the intersection point, the faces need to be seperate by these points. For single point, there are 3 situtaion, on point/on line/in the triangle. 

We ignore the situation #1, and divided the original traingle into two parts for the line situation, and divided the triangle into three ones as the third. 

The advantage of this method is that we only need to trackle the single point situation, instead, the complexity of this method is O(n^2), because the original face will be divided linear, and we need to check every triangle afterwards. However, considering the number of intersection points, it is tolerable. Another method is to tackle every polygon situation and the connection between polygons, but it's too difficult to talk about it here.

Since the faces got divided, the internel faces need to be deleted. There are two faces need to be deleting, first is the face between the new adding point, another one is the faces that connect some original point whichi is inside other mesh.

For the easist way to deleting these two kinds of faces is to judge the middle point of the face is whether or not in the other mesh. It will cost O(m^2*f). 

Another way to do it is to contribute every point in same connectivity, delete the faces between these points. And then check every old points, if it is in the other mesh, delete all faces connecting to this face. It will cost only O(n*f), but the complexity of programming is improved a lot.

Applying the method metioned before, you will get the union or the difference of mesh correctly. 

If you solve thd mesh the first method referre before, although the effect of union is correct right now, there is a hidden defect will cause future face operations like smooth. Note that as we divide the traingle into more precise one, we will add more points for one line, therefore, some faces will only exist on one side. 

In order to remove these faces, disjoint sets could be used to identify whether or not one point need to be combined or not. It will extract common points of two meshs from current point collection, then to classify remaining point wheter or not it connect to each other by the faces they constrcut. After that, ignore the faces whose points at least two belong to same set, and attribute current point to representation of its connection set.


#### Mesh connection smooth

There are a lot of way smoothing faces, currently we use the classic smooth algorithm, laplacian smooth, to polish the conversion between mesh.

The idea of the laplacian it to calculate neighborhood of current points, and then use these coordinate to make new position. There are several extensions of the lapacian smooth, like use curvature to revise the paramter, and the Taubin/HCLaplacian smooth to solve the shrink problem of laplacian.

In addition, the percision of the mesh will affect the smooth performance a lot, therefore, the precision division is required for our application. For every intersection point, we add more points to let the distance of its neighborhood will be less than ceratin number. 

I am still working on such stuff, and it will also generate good effect for the whole model. At present, what I got is something like following. In the future I will smooth it to genretae different effect I want.