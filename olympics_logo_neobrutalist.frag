#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circle(vec2 p, float r) {
    return length(p) - r;
}

// HARD stroke band (neo-brutal style)
float stroke(float d, float r, float t) {
    return step(abs(d), r) - step(abs(d), r - t);
}

void main() {

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 p = st * 2.0 - 1.0;
    p *= 1.15;

    float r = 0.18;        // BIG shape
    float t = 0.04;        // THICK stroke (brutal)

    vec3 bg = vec3(1.0);

    // slight intentional misalignment (PRINT SHIFT)
    vec2 o = vec2(0.04, -0.04);

    vec2 c1 = vec2(-0.70,  0.20);
    vec2 c2 = vec2( 0.00,  0.20);
    vec2 c3 = vec2( 0.70,  0.20);
    vec2 c4 = vec2(-0.35, -0.25);
    vec2 c5 = vec2( 0.35, -0.25);

    // SHADOW LAYER (HARD, OFFSET)
    float s =
        stroke(circle(p - (c1 + o), r), r, t) +
        stroke(circle(p - (c2 + o), r), r, t) +
        stroke(circle(p - (c3 + o), r), r, t) +
        stroke(circle(p - (c4 + o), r), r, t) +
        stroke(circle(p - (c5 + o), r), r, t);

    // MAIN LAYER (NO SMOOTHING)
    float r1 = stroke(circle(p - c1, r), r, t);
    float r2 = stroke(circle(p - c2, r), r, t);
    float r3 = stroke(circle(p - c3, r), r, t);
    float r4 = stroke(circle(p - c4, r), r, t);
    float r5 = stroke(circle(p - c5, r), r, t);

    vec3 color = bg;

    // shadow first (HARSH PRINT LAYER)
    color -= s * .6;

    // brutal colors (NO soft mixing feel)
    if (r1 > 0.0) color = vec3(0.0, 0.4, 0.9);
    if (r2 > 0.0) color = vec3(0.05);
    if (r3 > 0.0) color = vec3(0.9, 0.1, 0.1);
    if (r4 > 0.0) color = vec3(1.0, 0.85, 0.0);
    if (r5 > 0.0) color = vec3(0.1, 0.7, 0.3);

    gl_FragColor = vec4(color, 1.0);
}
