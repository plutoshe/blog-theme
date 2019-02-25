##Pattern Tool For Code Space Shark
###Project Overview
Code Space shark is an ongoing music rhythm game based on alternative controller, currently we use the Dj hero as our controller now.

###Requirement for Tool
Designers need to devise when and how players rotate, push based on the flow of game and the music rhythm, so a tool is necessay to help them quickly design and test the effect.

Detailed Requirements
- A system store and load the flow they design
- An interactive design system based on time and position
- Realtiem test what are really showing in game

###Architecture
```mermaid
graph LR;
    
    Tool[Pattern Tool]-->FileSystem;
    Tool-->Timeline;
    Timeline-->TimeControl[Time control];
    Timeline-->PatternGenerator[Pattern Generator]
    PatternGenerator-->RealTimeEffect[Realtime Effect]
    PatternGenerator-->PatternOperations[Pattern Operations]
    Tool-->Simulation[Simulate the real effect based on the pattern map]
```

###Demonstration
####FileSystem
<img src="/assets/content/blogs/pattern_tool/file.gif"  style="margin:auto"/>

Designers have several options to operate their maps, including save, load, and new a map.

####Timeline
#####Time Control
<img src="/assets/content/blogs/pattern_tool/2.gif"  style="margin:auto"/>

According to the requirement, the main focus of the tool is about rythmn, so the timeline system use the variable of beats per minute to control the stride of timeine. Designers could move in the timeline by the length of stride.

#####Realtime Effect
This tool provide a visual interface to help designers identifying what they have done. According to time, the tool respones relating patterns based on different features of patterns.
#####Pattern Generator
<img src="/assets/content/blogs/pattern_tool/edit.gif"  style="margin:auto"/>

Designers could add/delete/modify the pattern they want. 

####Simulation
This tool links the designing map and the real game, it will generate corresponding scenario.

###Review
This tool mainly aims to relieving designers generating the pattern they are hard to control by numbers, alternatively polish the level through friendly control by the visual interface the tool provides.