import { useEffect, useRef } from "react";

interface Props {
  progress: number;
}

export default function TransitionShader({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const vertexShaderSource = `
      attribute vec2 position;

      void main() {
        gl_Position = vec4(position,0.0,1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 u_resolution;
      uniform float u_progress;

      #define PI 3.14159265359
      #define TWO_PI 6.28318530718

      float polygonSDF(vec2 st, int N)
      {
          st = st * 2.0 - 1.0;

          float a = atan(st.x, st.y) + PI;
          float r = TWO_PI / float(N);

          return cos(
              floor(0.5 + a/r) * r - a + u_progress * PI
          ) * length(st);
      }

      void main()
      {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;

          float d1 = polygonSDF(st,6);
          float d2 = polygonSDF(st,2);

          float d = max(d1,d2);

          float reveal = mix(0.0,1.8,u_progress);

          float mask =
              1.0 -
              smoothstep(
                  reveal,
                  reveal + 0.02,
                  d
              );

          vec3 color = vec3(0.0);

          gl_FragColor = vec4(color,mask);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;

    gl.attachShader(
      program,
      compile(gl.VERTEX_SHADER, vertexShaderSource)
    );

    gl.attachShader(
      program,
      compile(gl.FRAGMENT_SHADER, fragmentShaderSource)
    );

    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    const resolutionLocation =
      gl.getUniformLocation(program,"u_resolution");

    const progressLocation =
      gl.getUniformLocation(program,"u_progress");

    gl.uniform2f(
      resolutionLocation,
      canvas.width,
      canvas.height
    );

    gl.uniform1f(progressLocation, progress);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

    return () => {
      window.removeEventListener("resize",resize);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
