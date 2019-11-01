## Project1 Proposal 

#### What I want to achieve and the features
I will do 3d collision detection system.

The main features of this system are listing below:

1. Given two polythedrons, decide whehter or not they are intersected. For this feature, I will make an interface like <b>void IsCollisionExist(Polythedron A, Polythedron B)</b>
2. Given a list of polythedrons and corresponding velocity/acceleration, return the first collision during this period. For this feature, <b>void IsCollisionExist(List<Polythedron> i_listOfPolythedrons, float i_duration)</b>.

And I think it's good for other students to use this system to interact with the objects in their game.

I expect to implement GJK, EPA for polygon collision dectection, and make simple broadphase for collision detection in order to improve efficiency.

#### Optional Challenge
If I have enough time, I will finish the impact when two objects collided. 