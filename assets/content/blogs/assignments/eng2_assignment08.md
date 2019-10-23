## Assignment8 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment8_MyGame_.zip)

#### Screenshoot for the application

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment08_01.png" width="50%" height="50%" style="margin:auto"/>

#### Show an example of a binary geometry file built by your GeometryBuilder

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment08_02.png" width="50%" height="50%" style="margin:auto"/>

My order is the number of indices, the number of vertices, an array of index data, and an array of vertex data, because in this order, I can know the number of index array and vertex array size at first, it helps me to initialize these arrays and load them by the size.

#### Advantanges using binary file loading

First, it is more efficient to load geometry by binary format which is friendly for the computer.
Second, the size of binary file is smaller than the human-readable one.

#### Difference between D3D and OpenGL for the binary file
Binary geometry files should be different for the different platforms, because the order of indices is different for the different platform. The data in binary file should clarify which order it use.

#### The code extracting from binary file

```
auto currentOffset = reinterpret_cast<uintptr_t>(dataFromFile.data);
uint16_t vertexCount, indexCount;
size_t sizeS = 0;
if (sizeS + sizeof(uint16_t) > dataFromFile.size)
{
    EAE6320_ASSERTF(false, "Wrong file size at path %s", i_path.c_str());
    Logging::OutputError("Wrong file size at path %s", i_path.c_str());
    return result;
}

memcpy(&vertexCount, reinterpret_cast<void*>(currentOffset), sizeof(uint16_t));
currentOffset += sizeof(uint16_t);
sizeS += sizeof(uint16_t);

if (sizeS + sizeof(uint16_t) > dataFromFile.size)
{
    EAE6320_ASSERTF(false, "Wrong file size at path %s", i_path.c_str());
    Logging::OutputError("Wrong file size at path %s", i_path.c_str());
    return result;
}

memcpy(&indexCount, reinterpret_cast<void*>(currentOffset), sizeof(uint16_t));
currentOffset += sizeof(uint16_t);
sizeS += sizeof(uint16_t);

if (sizeS + indexCount * sizeof(unsigned int) > dataFromFile.size)
{
    EAE6320_ASSERTF(false, "Wrong file size at path %s", i_path.c_str());
    Logging::OutputError("Wrong file size at path %s", i_path.c_str());
    return result;
}

m_indices.resize(indexCount);
memcpy(&m_indices[0], reinterpret_cast<void*>(currentOffset), indexCount * sizeof(uint16_t));
currentOffset += indexCount * sizeof(uint16_t);
sizeS += indexCount * sizeof(uint16_t);

if (sizeS + vertexCount * sizeof(cGeometryVertex) > dataFromFile.size)
{
    EAE6320_ASSERTF(false, "Wrong file size at path %s", i_path.c_str());
    Logging::OutputError("Wrong file size at path %s", i_path.c_str());
    return result;
}
```

#### The comparison between human-readable file load and binary load

I make a helix with 32418 vertices, 48642 indices. It is 2623 KB for the human-readable file, and 602 KB for the binary file.

This is the log when loading binary time.
```
Opened log file "eae6320.log"
Initialized time
Registered main window class "Plutoshe's Main Window Class"
The user settings file "settings.ini" doesn't exist. Using default settings instead.
Created main window "Plutoshe's Game -- Direct3D"
Set main window resolution to 512 x 512
 cost time: 0.443700 ms
 cost time: 0.059300 ms
 cost time: 0.041000 ms
The application was successfully initialized
Unregistered main window class
Closing log file

```
This is the log when loading human-readble file.

```
Opened log file "eae6320.log"
Initialized time
Registered main window class "Plutoshe's Main Window Class"
The user settings file "settings.ini" doesn't exist. Using default settings instead.
Created main window "Plutoshe's Game -- Direct3D"
Set main window resolution to 512 x 512
 cost time: 84.439500 ms
 cost time: 4.040300 ms
 cost time: 2.377800 ms
The application was successfully initialized
Unregistered main window class
Closing log file
```

It is faster when loading the binary file.