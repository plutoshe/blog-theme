### FinalProject Update#1

#### Features

I intend to develop a snooker game for my current engine, according to my plan, I will implement following features for my project

 - Camera movement
 - Impact point selection
 - Collision response 
 - Generating reasonable sound effects
 - Add snooker rules for this game
 - point counts for 2 players.
 - Restart functionality
  
Based on the complexity of these features, I design four iterations for  my game

 1. Top-down view snooker, use four keys to add different impulses controlling the cue ball
 2. 3D camera movement development
 3. Impact point selection and correspoinding operations
 4. Add snooker rules for this game

I will mainly use my system to tackle the interaction between billiard balls and blockers.

#### What I have done

I finished the collision response investigations and figure out the backbone of the 3d collision. The related resources could be checked at References part. 

And I've integrated Srija Kambhampati's audio system. I tried to embed Fengkai Zhou's engine into my project, but I was confused about how to use it, because there is no example about using the whole system. At same time, I found there were noise when I tried to run some interfaces. Therefore, I changed to Srija's audio system. 

I got some ideas from Fengkai Zhou's code, for his structures, including "Channel", "Context", "Sound". The separation of his system is clear, however, I didn't how to initialize the context and the audio source for his system. I think I may 

I thought I learned how to make tutorials from Srija. It is very clear to know how to initialize it, and how to use her interfaces.

#### References

[Srija Kambhampati's Audio System](https://thedarkmiko.itch.io/audio-system-for-game-engine)

[Fengkai Zhou's Audio System](https://tezikazhou.com/ge2EngineSystemProposal)

<http://web.cse.ohio-state.edu/~parent.1/classes/888/math/impulseForces.pdf>

<https://www.physicsclassroom.com/calcpad/momentum>

<https://en.wikipedia.org/wiki/Collision_response>

<http://www.mft-spirit.nl/files/MTamis_ConstraintBasedPhysicsSolver.pdf>

<http://www.allenchou.net/2013/12/game-physics-resolution-contact-constraints/>


<https://www.youtube.com/watch?v=SHinxAhv1ZE&list=WL&index=58&t=662s>

<https://www.youtube.com/watch?v=7_nKOET6zwI&list=WL&index=57&t=0s>