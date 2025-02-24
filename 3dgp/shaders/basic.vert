// VERTEX SHADER

#version 330

// Uniforms: Transformation Matrices
uniform mat4 matrixProjection;
uniform mat4 matrixView;
uniform mat4 matrixModelView;

// Uniforms: Material Colours
uniform vec3 materialAmbient;
//uniform vec3 materialDiffuse;

in vec3 aVertex;
in vec3 aNormal;
in vec2 aTexCoord;


out vec4 color;
out vec4 position;
out vec3 normal;
out vec2 texCoord0;



// Light declarations
// AMBIENT
struct AMBIENT
 {
	//int on;
	vec3 color;
 };
 uniform AMBIENT lightAmbient, lightEmissive;

 vec4 AmbientLight(AMBIENT light)
 {
  // calculate Ambient Light
  return vec4(materialAmbient * light.color, 1);
 }



void main(void) 
{
	// calculate position
	position = matrixModelView * vec4(aVertex, 1.0);
	gl_Position = matrixProjection * position;

	// calculate normal
	normal = normalize(mat3(matrixModelView) * aNormal);

	// calculate light - start with pitch black
	color = vec4(0, 0, 0, 1);
	color += AmbientLight(lightAmbient);

	// calculate texture coordinate
	texCoord0 = aTexCoord;
}
