// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f;
    // f = abs(cos(a*3. + u_time*4.)*2.);
    // f = abs(cos(a*2.5))*.5+.3;
    f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;
    f -= 1.-smoothstep(0.2, 0.22, r*0.42);
//     f = abs(cos(a*6.0))*(
//     0.4+0.1*sin(u_time)
// );
    
//     float outer =
// 1.-smoothstep(f,f+0.01,r);

// float inner =
// 1.-smoothstep(f-0.02,f-0.01,r);

// color = vec3(outer-inner);

    color = vec3( 1.-smoothstep(f,f+0.02,r) );

    gl_FragColor = vec4(color, 1.0);
}
