#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// -----------------------------
// Circle SDF
// -----------------------------
float circle(vec2 p, float r) {
    return length(p) - r;
}

// -----------------------------
// Main
// -----------------------------
void main() {

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 p = st * 2.0 - 1.0;
    p *= 1.2;

    // float r = 0.28;
    float r = 0.34 + 0.005 * sin(u_time * 2.0);
    float thickness = 0.03;

    vec3 color = vec3(1.0); // white background

    // -----------------------------
    // Ring positions
    // -----------------------------
    vec2 c1 = vec2(-0.70,  0.20); // blue
    vec2 c2 = vec2( 0.00,  0.20); // black
    vec2 c3 = vec2( 0.70,  0.20); // red
    vec2 c4 = vec2(-0.35, -0.25); // yellow
    vec2 c5 = vec2( 0.35, -0.25); // green
	// vec2 c1 = vec2(-0.70,  0.20 + 0.02 * sin(u_time));
	// vec2 c2 = vec2( 0.00,  0.20 + 0.02 * sin(u_time + 1.0));
	// vec2 c3 = vec2( 0.70,  0.20 + 0.02 * sin(u_time + 2.0));
	// vec2 c4 = vec2(-0.35, -0.25 + 0.02 * sin(u_time + 3.0));
	// vec2 c5 = vec2( 0.35, -0.25 + 0.02 * sin(u_time + 4.0));
	// -----------------------------
    // Helper: ring mask
    // -----------------------------
    float a1 = 1.0 - smoothstep(0.0, thickness, abs(circle(p - c1, r)));
    float a2 = 1.0 - smoothstep(0.0, thickness, abs(circle(p - c2, r)));
    float a3 = 1.0 - smoothstep(0.0, thickness, abs(circle(p - c3, r)));
    float a4 = 1.0 - smoothstep(0.0, thickness, abs(circle(p - c4, r)));
    float a5 = 1.0 - smoothstep(0.0, thickness, abs(circle(p - c5, r)));

    // -----------------------------
    // Color each ring properly
    // -----------------------------
    color = mix(color, vec3(0.0, 0.45, 0.8), a1); // blue
    color = mix(color, vec3(0.0, 0.0, 0.0),   a2); // black
    color = mix(color, vec3(0.9, 0.1, 0.1),   a3); // red
    color = mix(color, vec3(1.0, 0.85, 0.0),  a4); // yellow
    color = mix(color, vec3(0.0, 0.6, 0.2),   a5); // green

    gl_FragColor = vec4(color, 1.0);
}
