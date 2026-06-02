// Author Siddh Jain The Goat
// ronaldo goat

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

//     // bottom-left
//     vec2 bl = step(vec2(0.2),st);
//     float pct = bl.x * bl.y;
    


//     // top-right
//     vec2 tr = step(vec2(0.2),1.0-st);
//     pct *= tr.x * tr.y;
    
    //mondrian painting
    
    color = vec3(0.9, 0.9, 0.9);
    
    if(st.x<0.2 && st.y>0.6) color = vec3(0.7, 0.0, 0.0);
	
    if(st.x>0.93 && st.y>0.6) color = vec3(0.8, 0.7, 0.0);
    
    if(st.x>0.78 && st.y<0.12) color = vec3(0.0, 0.4, 0.6);
    
	if((st.x > 0.2 && st.x < 0.23) || (st.x > 0.75 && st.x < 0.78) || (st.x > 0.93 && st.x < 0.96) || (st.x>0.06 && st.x<0.09 && st.y>0.6))
    	color = vec3(0.0);   
    
    if((st.y > 0.79 && st.y < 0.82) || (st.y > 0.59 && st.y < 0.62) || (st.y>0.09 && st.y<0.12 && st.x>0.23))
    	color = vec3(0.0); 
    

    // color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}
