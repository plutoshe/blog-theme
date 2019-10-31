## Assignment9 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment9_MyGame_.zip)

#### A human-readable Effect file demonstration

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment09_01.png" width="50%" height="50%" style="margin:auto"/>

#### The binary version of the same Effect file 

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment09_02.png" width="50%" height="50%" style="margin:auto"/>

#### The path I choose to store in program

Because natrual string use '\0' as end signal, after I read the first string, I only need to pass this end char before read the next string.

I use the path which are relative to $(GameInstallDir), becuase I think it is not reasonable to leave this process to the engine user, as we need to make them think as less as possible.

#### How I extract the two paths at run-time
```
	auto currentOffset = reinterpret_cast<uintptr_t>(dataFromFile.data);

	m_vertexShaderPath = reinterpret_cast<const char*>(currentOffset);

	currentOffset += m_vertexShaderPath.size() + 1;

	m_fragmentShaderPath = reinterpret_cast<const char*>(currentOffset);
	
```