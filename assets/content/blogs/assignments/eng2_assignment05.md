## Assignment5 Summarization

Get project file [here](http://www.plutoshe.com/assets/download/Assignment5_MyGame_.zip)

#### Apllication Screenshoot

<img src="http://www.plutoshe.com/assets/content/blogs/assignments/eng2_assignment05_screenshoot.gif" width="50%" height="50%" style="margin:auto"/>

#### The Inteface for game object/thing/entity 
My gameobject defines as following

```
class GameObject
{
public:
	eae6320::Graphics::RenderObject m_renderObject;
	eae6320::Physics::sRigidBodyState m_rigidBodyStatue;
	bool m_isVisiable;
};
```
In addition, I add a transform into renderObject for rendering vertices in world axis.
```
struct RenderObject
{
	Graphics::Geometry::cGeometryRenderTarget *m_geometry;
	Graphics::Effect *m_effect;
	eae6320::Math::cMatrix_transformation m_Transformation;
}
```
My camera defines as following
```
class Camera
{

	eae6320::Physics::sRigidBodyState m_rigidBodyStatue;
	float m_ZNearPlane;
	float m_ZFarPlane;
	float m_AspectRatio;
	float m_FOV;
}
```
#### Interface being used for submitting your game objects to be rendered

I only add one more matrix to every object in order to update uniform converting object vertices from its own axis to world axis.
Also I need to update worldToCamera conversion transformation and camera project transformation.
```
void eae6320::Application::cbApplication::SubmitDataToBeRendered(const float i_elapsedSecondCount_systemTime, const float i_elapsedSecondCount_sinceLastSimulationUpdate)
{
	eae6320::Graphics::Env::s_dataBeingSubmittedByApplicationThread->constantData_frame.g_transform_worldToCamera = m_camera.GetWorldToCameraForPrediction(i_elapsedSecondCount_sinceLastSimulationUpdate);
	eae6320::Graphics::Env::s_dataBeingSubmittedByApplicationThread->constantData_frame.g_transform_cameraToProjected = m_camera.GetProjectionMatrix();
	eae6320::Graphics::Env::s_dataBeingSubmittedByApplicationThread->m_backgroundColor = m_backgroundColor;
	eae6320::Graphics::Env::s_dataBeingSubmittedByApplicationThread->m_renderObjects.clear();
	for (size_t i = 0; i < m_gameObjects.size(); i++)
	{
		if (m_gameObjects[i].m_isVisiable)
		{
			m_gameObjects[i].m_renderObject.m_Transformation =
				m_gameObjects[i].m_rigidBodyStatue.PredictFutureTransform(i_elapsedSecondCount_sinceLastSimulationUpdate);
			eae6320::Graphics::Env::s_dataBeingSubmittedByApplicationThread->m_renderObjects.push_back(m_gameObjects[i].m_renderObject);
		}
	}
}
```

#### How the size (in bytes) of the data that you need to store now for each draw call 

I add a constant buffer to converting axis for object to world for each draw call.

For x86, it's 64 bytes.

For x64, it's also 64 bytes.

#### Why extrapolation/prediction is necessary when rendering with our engine?

Because there is a time gap between rendering all render objects and updating the physcial states of objects. After updating current objects state, the gameobjects still updates theirs status, besides users may update the physcial status of objects. In order to simulate exact effect on the rendering time, our program needs to implement a prediction for current gameobjects' status for the elapsed time from last time updateing physcial status.

I nearly cost 7 hours to finish this assignment.