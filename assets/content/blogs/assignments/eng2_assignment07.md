## Assignment7 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment7_MyGame_.zip)

#### Screenshoot for the application

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment07_01.png" width="50%" height="50%" style="margin:auto"/>


#### What references you had to add to the MayaGeometryExporter project
In my opinion, there is no reference needed to add to the MayaGeometryExporter project, because it is only a plugin for maya, and depends on nothing of our game.

#### What other projects depend on MayaGeometryExporter
No projects depends on MayaGeometryExporter, because this project only generates geometry files, has nothing to do with our engine and game logic.

#### Whether you exported the unused data to your human-readable file or not
I didn't add any extra data to my human-readable file, because I think it's too hard for human to calculate these data(normal, tangents, bitangents) for vertices and they could be calculated late automatically. In addition, users currently don't care about the result of these data.

#### Screenshoot for the application
<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment07_02.png" width="50%" height="50%" style="margin:auto"/>

#### What happens if you try to load a model with too many vertices

I tried loading a data with 1 million vertices, there is nothing special instead of taking several seconds to load vertices data. 
