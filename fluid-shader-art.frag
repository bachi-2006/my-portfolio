#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    // Map mouse coordinates to WebGL coordinates
    vec2 mouse = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution.xy;
    float dist = distance(uv, mouse);
    
    vec3 color = vec3(0.06, 0.06, 0.09);
    
    // Ambient color grid flow
    color.r += sin(uv.x * 6.0 + u_time * 0.5) * 0.03;
    color.g += cos(uv.y * 6.0 - u_time * 0.5) * 0.03;
    color.b += sin(dist * 8.0 - u_time * 0.8) * 0.04;
    
    // Dynamic fluid ripple response to mouse
    float ripple = sin(dist * 35.0 - u_time * 5.0) * 0.5 + 0.5;
    float glow = 1.0 - smoothstep(0.0, 0.35, dist);
    
    color += vec3(0.1, 0.45, 0.95) * ripple * glow * 1.7;
    
    // Core high-intensity light
    float coreGlow = 1.0 - smoothstep(0.0, 0.07, dist);
    color += vec3(0.35, 0.85, 1.0) * coreGlow * 1.3;
    
    gl_FragColor = vec4(color, 1.0);
}
