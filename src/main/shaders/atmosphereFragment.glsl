uniform float atmosphereR;
uniform float atmosphereG;
uniform float atmosphereB;

varying vec3 vertexNormal;
void main() {
  float intensity = pow(0.75 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
  gl_FragColor = vec4(atmosphereR, atmosphereG, atmosphereB, 0.5) * intensity;
}