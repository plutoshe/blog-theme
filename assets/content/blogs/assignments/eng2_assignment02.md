## Assignment 2 Summarization
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
For every effect, I declare a structure to embrace shaders the render target has, and add interfaces for loading shaders, and binding shaders.
```
class Effect
{
public:
	std::string m_vertexShaderPath;
    std::string m_fragmentShaderPath;
    void SetVertexShaderPath(std::string vertexShaderPath) { m_vertexShaderPath = vertexShaderPath; }
    void SetFragmentShaderPath(std::string fragmentShaderPath) { m_fragmentShaderPath = fragmentShaderPath; }
    eae6320::cResult Load(eae6320::Assets::cManager<eae6320::Graphics::cShader>& manager, eae6320::Graphics::cShader::Handle& vertexShader, eae6320::Graphics::cShader::Handle& fragmentShader);
    void Bind(eae6320::Assets::cManager<eae6320::Graphics::cShader>& s_manager, eae6320::Graphics::cShader::Handle& s_vertexShader, eae6320::Graphics::cShader::Handle& s_fragmentShader);
}
```
And use following code to load all effects.
```
eae6320::cResult Load(eae6320::Assets::cManager<eae6320::Graphics::cShader> &manager, eae6320::Graphics::cShader::Handle &vertexShader, eae6320::Graphics::cShader::Handle &fragmentShader);
```
 Following code binds the effect and draws the 3D object in either Graphics.d3d.cpp or Graphics.gl.cpp 
```
auto result = eae6320::Results::Success;
eae6320::Graphics::Env::s_effect.SetVertexShaderPath("data/shaders/vertex/standard.shader");
eae6320::Graphics::Env::s_effect.SetFragmentShaderPath("data/shaders/fragment/change_color.shader");
if (!(result = eae6320::Graphics::Env::s_effect.Load(eae6320::Graphics::cShader::s_manager, eae6320::Graphics::Env::s_vertexShader, eae6320::Graphics::Env::s_fragmentShader)))
{
    EAE6320_ASSERTF(false, "Can't initialize effects");
    return result;
}
{
    constexpr uint8_t defaultRenderState = 0;
    if (!(result = eae6320::Graphics::cRenderState::s_manager.Load(defaultRenderState, eae6320::Graphics::Env::s_renderState)))
    {
        EAE6320_ASSERTF(false, "Can't initialize shading data without render state");
        return result;
    }
}
		
```

And following code to bind effect, draw geometry

```

	// Bind the shading data
	{
		eae6320::Graphics::Env::s_effect.Bind(cShader::s_manager, eae6320::Graphics::Env::s_vertexShader, eae6320::Graphics::Env::s_fragmentShader);

	}
	// Draw the geometry
	{
		eae6320::Graphics::Env::s_geometry.Draw();
	}
```
Detailed implementation could see cEffect.cpp/cGeometry.cpp.

#### Remaining differences are between Graphics.d3d.cpp and Graphics.gl.cpp

There are a lot of difference things between Graphics.d3d.cpp and Graphics.gl.cpp, including:
- the static variable storage
- the view it creates
- how to load data into the buffer 
- how to render a frame
