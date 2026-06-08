#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 p){
    return fract(
        sin(
            vec2(
                dot(p,vec2(127.1,311.7)),
                dot(p,vec2(269.5,183.3))
            )
        )*43758.5453
    );
}

void main(){

    vec2 st =
        gl_FragCoord.xy /
        u_resolution.xy;

    st.x *=
        u_resolution.x /
        u_resolution.y;

    vec3 color = vec3(0.0);

    //---------------------------------
    // Voronoi scale
    //---------------------------------

    st *= 5.0;

    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 999.0;
    vec2 m_point;

    //---------------------------------
    // Normal Voronoi points
    //---------------------------------

    for(int j=-1;j<=1;j++){
        for(int i=-1;i<=1;i++){

            vec2 neighbor =
                vec2(float(i),float(j));

            vec2 point =
                random2(i_st + neighbor);

            point =
                0.5 +
                0.5*sin(
                    u_time +
                    6.2831*point
                );

            vec2 diff =
                neighbor +
                point -
                f_st;

            float dist =
                length(diff);

            if(dist < m_dist){
                m_dist = dist;
                m_point = point;
            }
        }
    }

    //---------------------------------
    // Extra mouse seed
    //---------------------------------

//     vec2 mouse =
//         u_mouse /
//         u_resolution;

//     mouse.x *=
//         u_resolution.x /
//         u_resolution.y;

//     mouse *= 5.0;

//     float mouseDist =
//         distance(
//             st,
//             mouse
//         );

//     if(mouseDist < m_dist){
//         m_dist = mouseDist;
//     }

    vec2 mouse =
    u_mouse /
    u_resolution;

mouse.x *=
    u_resolution.x /
    u_resolution.y;

mouse *= 5.0;

// Mouse position in the current cell's coordinate frame
vec2 mousePoint = mouse - i_st;

float mouseDist =
    length(
        mouse -
        st
    );

if(mouseDist < m_dist){
    m_dist = mouseDist;
    m_point = mousePoint;
}
    //---------------------------------
    // Coloring
    //---------------------------------

    color +=
        dot(
            m_point,
            vec2(.3,.6)
        );

    color -=
        abs(
            sin(40.0*m_dist)
        ) * 0.07;

    color +=
        1.0 -
        step(
            0.05,
            m_dist
        );

    // mouse center

    color += vec3(
        1.0 -
        step(
            0.04,
            mouseDist
        )
    );

    gl_FragColor =
        vec4(color,1.0);
}
