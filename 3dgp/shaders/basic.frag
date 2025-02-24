// FRAGMENT SHADER

#version 330

// Matrices/View Matrix
uniform mat4 matrixProjection;
uniform mat4 matrixView;

uniform mat4 matrixModelView;
//Uniforms: Material Colours;
uniform vec3 materialDiffuse;
uniform vec3 materialSpecular;
uniform float materialShininess;


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
 uniform int lightAttOn = 0;
 uniform POINT lightPoint1, lightPoint2, lightPoint3, lightPoint4, lightPoint5;
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

	if (lightAttOn == 1)
	{

		outColor += compPointAtt(materialDiffuse, materialSpecular, materialShininess, lightPoint1);
		outColor += compPointAtt(materialDiffuse, materialSpecular, materialShininess, lightPoint2);
		outColor += compPointAtt(materialDiffuse, materialSpecular, materialShininess, lightPoint3);
		outColor += compPointAtt(materialDiffuse, materialSpecular, materialShininess, lightPoint4);
		outColor += compPointAtt(materialDiffuse, materialSpecular, materialShininess, lightPoint5);
	}
	else
	{

		outColor += compPoint(materialDiffuse, materialSpecular, materialShininess, lightPoint1);
		outColor += compPoint(materialDiffuse, materialSpecular, materialShininess, lightPoint2);
		outColor += compPoint(materialDiffuse, materialSpecular, materialShininess, lightPoint3);
		outColor += compPoint(materialDiffuse, materialSpecular, materialShininess, lightPoint4);
		outColor += compPoint(materialDiffuse, materialSpecular, materialShininess, lightPoint5);
	}
}
