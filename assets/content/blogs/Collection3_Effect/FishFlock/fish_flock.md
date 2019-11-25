## Fish Flock

### Result
[gif1]
### Introduction

This post mainly introduce how to generate a fish flock effect.

It mainly follows the logic what a post of unreal and a series of youtube videos referred.

### Fish Flock Logic

I saw a very intereting [video](https://www.youtube.com/watch?v=9pRC-lPuhuU&t=20s) about how a bird flies in a flock. I summerise the following three rules as the video metioned.

1. Stick to your 7 closet neighhoods.
2. Rotate when neighhoods turn.
3. Don't crowd each other

As fish flock generate similar effct as bird flock, we may have fish flock algorithm based on the three rules above.

We can classified into three characteritics matching the rules.
- alignment
- cohesion
- seperation

#### Alignment
The fish will follow neighhood's behaviors. Instead of 7 closet neighborhoods, we let the fish sense their neighbors by a certain sphere senstaion.

Fish search for their neighbors in this sphere, they will change their speed according to neighborhood's speed. Here, we get all neighborhoods' speed,then divide them by the numver of neighbors. The fish's speed would be largely effect by this speed.

We still could use the nearest fish algorithm to modify fish behaviors, it depends how we define the fish sensation.

#### Cohesion
Also, fish will follow the difference of facing angular with close fishes. But the sensitivities of fish tracking angular is different from speed. Therefore, I need to redefine the angular sensation scope for fishes.

The udpate is similar to cohesion, current fish get all direction of its neighbors, divided by the numbers of neighbors, then, contribute this direction to current fish's direction.

#### Seperation

In order to avoid the crowd, the fish need to check the distance of others, if it feels it will collide with another, it will move the reversal direction to some extent avoiding collision. It generate restitution effect somehow.

After implementing these three mechanims, we could get reasonable result. However, there are some movement randomness or independent behaviors of fish. Comparing to herds, the leaders of group might exist.

Therefore, at the first phase of updating fish spped and direction, we could add fluctuations towards certain fish or several random fishes' status. It is very interesting to tweak the results of the flock.
