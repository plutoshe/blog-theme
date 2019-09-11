## Assignment3 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment3_MyGame_.zip)

#### Apllication Screenshoot

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment03_mainwindow.png" width="50%" height="50%" style="margin:auto"/>

#### graphics.cpp platform-independent

I mainly embed the geometry initialization and effect initialization into this cpp file to make it platform-independent, and declare the interfaces in <b>graphics.h</b>. And for update background color, I add following two interfaces to support it.
```
	void ChangeBackgroundColor(std::vector<float> updateColor);
	void ClearBackgroundColor();
```

And I use same interface to update my background interface in implementation
```
    {
        eae6320::Graphics::ClearBackgroundColor();
    }
```

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment03_updateBackground.png" width="50%" height="50%" style="margin:auto"/>

#### Initialization of effect

I mainly use 2 maps(vertex&fragment) to store the shader data, and the effects only store the shader path they use. Therefore, I need to initialize the shader path to pointed map, and then update corresponding shader to effect.

```
    eae6320::Graphics::Effect effectA, effectB;
    effectA.SetVertexShaderPath("data/shaders/vertex/standard.shader");
    effectA.SetFragmentShaderPath("data/shaders/fragment/change_color.shader");
    effectB.SetVertexShaderPath("data/shaders/vertex/standard.shader");
    effectB.SetFragmentShaderPath("data/shaders/fragment/standard.shader");

    eae6320::Graphics::Env::s_effects.push_back(effectA);
    eae6320::Graphics::Env::s_effects.push_back(effectB);

    for (size_t i = 0; i < eae6320::Graphics::Env::s_effects.size(); i++)
    {
        if (!(result = LoadShaderData(
            eae6320::Graphics::Env::s_effects[i].m_vertexShaderPath,
            eae6320::Graphics::Env::s_vertexShaders,
            eae6320::Graphics::ShaderTypes::Vertex)) ||
            !(result = LoadShaderData(
                eae6320::Graphics::Env::s_effects[i].m_fragmentShaderPath,
                eae6320::Graphics::Env::s_fragmentShaders,
                eae6320::Graphics::ShaderTypes::Fragment)))
        {
            EAE6320_ASSERTF(false, "Can't initialize shader for effect");
            return result;
        }
        if (!(result = eae6320::Graphics::Env::s_effects[i].Load(
            eae6320::Graphics::cShader::s_manager,
            eae6320::Graphics::Env::s_vertexShaders[eae6320::Graphics::Env::s_effects[i].m_vertexShaderPath],
            eae6320::Graphics::Env::s_fragmentShaders[eae6320::Graphics::Env::s_effects[i].m_fragmentShaderPath])))
        {
            EAE6320_ASSERTF(false, "Can't initialize effects");
            return result;
        }

    }
```

And single effect only need to store the path of 2 shader, but consider the handle stored in environment variable, it need cost 60 bytes from sizeof(An effect) and 64 bytes from two pairs<string, eae6320::Graphics::cShader::Handle>.

Currently I think it's the best way for me for the memory of efect.


#### Initialization of geometry
I use following code to intialize the geometry, it needs to define the vertices and the index which a geometry need.

```
    std::vector<eae6320::Graphics::Geometry::cGeometryVertex> verticesA{
        eae6320::Graphics::Geometry::cGeometryVertex(0.0f, 0.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(1.0f, 0.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(0.0f, 1.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(1.0f, 1.0f, 0.0f),
    };
    std::vector<unsigned int> indicesA{ 0, 1, 2, 1, 3, 2 };

    std::vector<eae6320::Graphics::Geometry::cGeometryVertex> verticesB{
        eae6320::Graphics::Geometry::cGeometryVertex(-1.0f, -1.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(0.0f, -1.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(-1.0f, 0.0f, 0.0f),
        eae6320::Graphics::Geometry::cGeometryVertex(-0.3f, -0.3f, 0.0f),
    };

    eae6320::Graphics::Geometry::cGeometryRenderTarget geometryA, geometryB;
    geometryA.InitData(verticesA, indicesA);
    geometryB.InitData(verticesB, indicesA);

    eae6320::Graphics::Env::s_geometries.push_back(
        geometryA
    );
    eae6320::Graphics::Env::s_geometries.push_back(
        geometryB
    );
    for (size_t i = 0; i < eae6320::Graphics::Env::s_geometries.size(); i++)
    {
        auto result_initGeometry = eae6320::Graphics::Env::s_geometries[i].InitDevicePipeline();
        if (!result_initGeometry)
        {
            EAE6320_ASSERT(false);
            if (result)
            {
                result = result_initGeometry;
            }
        }

    }
```

It costs 44 bytes for my geometry object in openGL and 88 bytes in direct3D. I need store 2 vector for vertices and index, and 3 Gluint for opengl env setting, 2 ID3D11Buffer, 1 cVertexFormat::Handle for direct3d env setting. 

I could make it smaller to extract direct3d out of struct and load array into buffer every time it needs to draw. However, for the efficiency, I decide to embed them into struct.
