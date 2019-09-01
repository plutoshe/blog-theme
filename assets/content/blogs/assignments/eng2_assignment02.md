### Assignment 2 Summarization
Get executable file [here](http://www.plutoshe.com/assets/download/Assignment2_MyGame_.zip)
#### Application screenshoot
Show the screenshoot of application

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_app.png" width="50%" height="50%" style="margin:auto"/>

#### Visual Studio Graphics Analyzer screenshoots

The first screenshot shows the render target when it is all black
<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_visualAnalyzer_01.png" width="50%" height="50%" style="margin:auto"/>

The next screenshot shows the render target with the 3D Object (the Draw() function should be highlighted)
<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_visualAnalyzer_02.png" width="50%" height="50%" style="margin:auto"/>


#### RenderDoc screenshoots

The first screenshot shows the render target when it is all black (the glClear() function should be highlighted, and the Texture View tab should be selected)

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_renderdoc_01.png" width="50%" height="50%" style="margin:auto"/>

The second screenshot shows the render target with the 3D Object (the glDrawArrays() function should be highlighted and the Texture View tab should be selected)

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_renderdoc_02.png" width="50%" height="50%" style="margin:auto"/>
The final screenshot shows the 3D Object's two triangles (the glDrawArrays() function should be highlighted but the Mesh Output tab should be selected, and either the VS Input or VS Output sub-tab should also be selected)

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment02_renderdoc_03.png" width="50%" height="50%" style="margin:auto"/>

#### Effect demonstration
For every effect, I declare a structure to respresent it.
```
class ShaderEffect
{
public:
	std::string m_shaderPath;
	ShaderTypes::eType m_shaderType;
}
```
And then declare a structure to embrace all shader effect the render target has.
```
class Effect
{
public:
	std::vector<ShaderEffect> m_shaders;
	void AddShader(ShaderEffect shader);
}
```
And use following interface to load all effects.
```
eae6320::cResult Load(eae6320::Assets::cManager<eae6320::Graphics::cShader> &manager, eae6320::Graphics::cShader::Handle &vertexShader, eae6320::Graphics::cShader::Handle &fragmentShader);
```
 Following code binds the effect and draws the 3D object in either Graphics.d3d.cpp or Graphics.gl.cpp 
```
	eae6320::Graphics::Effect effects;
	effects.AddShader(eae6320::Graphics::ShaderEffect("data/shaders/vertex/standard.shader", eae6320::Graphics::ShaderTypes::Vertex));
	effects.AddShader(eae6320::Graphics::ShaderEffect("data/shaders/fragment/change_color.shader", eae6320::Graphics::ShaderTypes::Fragment));
	if (!(result = effects.Load(eae6320::Graphics::cShader::s_manager, s_vertexShader, s_fragmentShader))) 
	{
		EAE6320_ASSERTF(false, "Can't initialize effects");
		return result;
	}
		
```

#### Remaining differences are between Graphics.d3d.cpp and Graphics.gl.cpp

There are a lot of difference things between Graphics.d3d.cpp and Graphics.gl.cpp, including:
- the static variable storage
- the view it creates
- how to load data into the buffer 
- how to render a frame
