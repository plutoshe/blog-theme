## Assignment4 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment4_MyGame_.zip)

#### Apllication Screenshoot

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment04_effect1.png" width="50%" height="50%" style="margin:auto"/>

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment04_effect2.png" width="50%" height="50%" style="margin:auto"/>

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment04_effect3.png" width="50%" height="50%" style="margin:auto"/>

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment04_effect4.png" width="50%" height="50%" style="margin:auto"/>

#### The UserInteface for Game project

The interface define in the following code

```
    void SetBackgroundColor(std::vector<float> backgroundColor);
```

This game bind key I with the background color change.

```
	if (UserInput::IsKeyPressed(UserInput::KeyCodes::I))
	{
		SetBackgroundColor(std::vector<float>{1.0f, 0.f, 0.f, 1.f});
	}
	else
	{
		SetBackgroundColor(std::vector<float>{1.0f, 1.f, 0.f, 1.f});
	}
```

#### The UserInface for controlling the objects in the game
I defined following 3 interfaces allowing players to change the objects they want to draw

```
    void SetRenderObjects(std::vector<eae6320::Graphics::RenderObject> i_renderObjects);
    void DeleteRenderObjectById(int id);
    void AddRenderObject(eae6320::Graphics::RenderObject i_renderObject);
```

And if users want to submit a new object to graphics, they could define a new effect and a geometry, then bind them into a new RenderObject, ultimately submit it by the inferface <b> AddRenderObject</b>

```
	std::vector<eae6320::Graphics::Geometry::cGeometryVertex> verticesB{
			eae6320::Graphics::Geometry::cGeometryVertex(-1.0f, -1.0f, 0.0f),
			eae6320::Graphics::Geometry::cGeometryVertex(-0.4f, -1.0f, 0.0f),
			eae6320::Graphics::Geometry::cGeometryVertex(-1.0f, -0.4f, 0.0f),
			eae6320::Graphics::Geometry::cGeometryVertex(-0.3f, -0.3f, 0.0f),
		};
    std::vector<unsigned int> indicesB{ 0, 1, 2, 1, 3, 2 };
    eae6320::Graphics::Geometry::cGeometryRenderTarget* geometryB;
    eae6320::Graphics::Geometry::cGeometryRenderTarget::Factory(geometryB);
    geometryB->InitData(verticesB, indicesB);
    eae6320::Graphics::Effect* effectB;
    eae6320::Graphics::Effect::Factory(effectB);
    effectB->SetVertexShaderPath("data/shaders/vertex/standard.shader");
    effectB->SetFragmentShaderPath("data/shaders/fragment/standard.shader");
    
    AddRenderObject(Graphics::RenderObject(geometryB, effectB));
```

#### Explain to us why we have to submit things to be drawn the way that we do

First of all, when the graphics is running, if we render this thing immediately, it probably creates unwanted effect and make effects disordered. For example, when the graphics thread renders A/B/C, and is rendering B currently, if we add a new object D, the screen will shouw A/B/D instead of A/B/C.

Second, it will conflict with current running graphics thread for operating the graphics device, ex. when the graphics are rendering for a vertex array buffer, if we want to initialize a new object, it's impossible to unbind current vertex array buffer.  

#### Tell us the sizeof(YOUR OBJECT/YOU EFFECT) in both platforms after you have made it reference counted
For RenderObject, it cost 16 bytes on x64, and 8 bytes on x86, because it only stores two pointer of a geometry and an effect.

On x64, It costs 96 bytes for geometry, 88 bytes for effect.

On x86, It costs 52 bytes for geometry, 64 bytes for effect.

Comparing to the results of last assignment, it only add a short variable to store the reference, and a boolean to identify whether or not it is initialized. In my opinion, it is the best way to define these structures currently.

#### Tell us the total memory that you have budgeted to your Graphics project for data to render frames

On x86, It will cost 144 bytes for constantData_frame, 16 bytes for m_backgroundColor, 16 bytes for m_renderObjects per frame structure, therefore, it totally cost 166 * 2 = 332 bytes for total budgets memory.

On x64, It will cost 144 bytes for constantData_frame, 32 bytes for m_backgroundColor, 32 bytes for m_renderObjects per frame structure, therefore, it totally cost 208 * 2 = 416 bytes for total budgets memory.
