// FRAGMENT SHADER

#version 330

// Matrices/View Matrix
uniform mat4 matrixProjection;
uniform mat4 matrixView;

uniform mat4 matrixModelView;
//Uniforms: Material Colours;
uniform vec3 materialDiffuse;

in vec4 color;
out vec4 outColor;

in vec2 texCoord0;
in vec4 position;
in vec3 normal;

// Texture
uniform sampler2D texture0;

 // DIRECTIONAL
 struct DIRECTIONAL
 {
	//int on;
	vec3 direction;
	vec3 diffuse;
 };
 uniform DIRECTIONAL lightDir;

 vec4 DirectionalLight(DIRECTIONAL light)
 {
	// calcuate directional light
	vec4 outColor = vec4(0, 0, 0, 0);
	vec3 L = normalize(mat3(matrixView) * light.direction);
	float NdotL = dot(normal, L);
	outColor += vec4(materialDiffuse * light.diffuse, 1) * max(NdotL, 0);
	return outColor;
 }
void main(void) 
{
	// calculate light
	outColor = color;
	outColor += DirectionalLight(lightDir);
	outColor *= texture(texture0, texCoord0);

}
