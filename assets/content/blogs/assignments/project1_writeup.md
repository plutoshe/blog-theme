## 3D Collision Detection Project

This system is aiming providing interfaces for collision detection.

### Effect

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/project1_updat2_01.gif" width="70%" height="70%" style="margin:auto"/>

### Implementation

There are two basic defining the collider of the gameobject, the first one defines how a collider looks like in this library.

```cpp
class Collider
{
    Collider();
    Collider(std::vector<Vector3>& i_v);
    Collider(const Collider& i_v);
    Collider(std::string i_path);

    eae6320::cResult InitData(std::string i_path);;
    void UpdateTransformation(eae6320::Math::cMatrix_transformation i_t);
    Vector3 Center();
    bool IsCollided(Collider& i_B);
}
```

In addition, according to that a gameobject can have more than one collider, the collider list is be defined as following

```cpp
class ColliderList
{
    ColliderList();
    ColliderList(const Collider& i_c);
    ColliderList(const ColliderList& i_c);

    void ClearAllCollider();
    void AddCollider(Collider i_c);
    size_t GetSize();
    Collider GetColliderByIndex(int i_index);
    bool IsCollided(ColliderList& i_queryColliderList);
    void UpdateTransformation(eae6320::Math::cMatrix_transformation i_t);
}
```

Also, I create a collider builder for integrating the collider you want, this is what a collider file would look like

```lua
return {
    vertices = {
        {position={-1,-1,0}},
        {position={-0.5,-1,0}},
        {position={-0.5,-0.5,0}},
    }
}
```

Something need to be declared, you need to ensure every collider is a polyhedron, because currently the algorithm for collision detection relies on the premise of that every collider is a polyhedron, otherwise, unexpected results maybe happened.

### Instruction using library

What you need to do is adding ColliderList or Collider structure to your gameobject or your collider

```cpp
class GameObject
{
    eae6320::Graphics::RenderObject m_renderObject;
    eae6320::Physics::sRigidBodyState m_rigidBodyStatue;
    PlutoShe::Physics::ColliderList m_colliders;
}
```

In addition, you need to update transformation every time before you using the collider detection. Or you could update the collider transformation at your update function avoiding the extra operations before using the collider. 

```cpp
ColliderListOfGameObject.UpdateTransformation(updatedTransformation);
```

About creating collider, there are two ways.

First one is what I metioned before, use the collider file to load it.

```cpp
PlutoShe::Physics::Collider colliderA("data/colliders/sphereOrigin.bin");
```

Another one is to introduce the vertices of collider directly

```cpp
std::vector<PlutoShe::Physics::Vector3> vertices;
// After adding neccessary vertices to this array
PlutoShe::Physics::Collider colliderA(vertices)
// or you can directly add to your colliderList
YouCollideList.AddCollider(PlutoShe::Physics::Collider(vertices));
```

### Future development

I still add collision response to this library, I will update it after finishing this part.

### Library Link
