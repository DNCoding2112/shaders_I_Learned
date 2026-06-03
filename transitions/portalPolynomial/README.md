# Polygon SDF Portal Transition

A fullscreen page transition built using a procedural Polygon Signed Distance Field (SDF) rendered entirely on the GPU.

Instead of relying on traditional fades, slides, or pre-rendered animations, this transition generates a rotating geometric portal from mathematical functions. The portal expands from the center of the screen, displays the application's logo, covers the viewport, swaps routes, and then retracts to reveal the next page.

---

## Demo Flow

```text
Current Page
      ↓
Polygon Portal Appears
      ↓
Logo Fades In
      ↓
Portal Covers Screen
      ↓
Route Changes
      ↓
Portal Retracts
      ↓
Logo Fades Out
      ↓
Next Page
```

---

## Mathematical Foundation

The effect is based on a Polygon Signed Distance Field.

The core idea comes from procedural graphics techniques popularized by Martin Upitis, Inigo Quilez, and Patricio Gonzalez Vivo.

A regular polygon can be represented analytically using polar coordinates instead of manually drawing vertices.

```glsl
float polygonSDF(vec2 st, int N)
{
    st = st * 2.0 - 1.0;

    float a = atan(st.x, st.y) + PI;
    float r = TWO_PI / float(N);

    return cos(
        floor(0.5 + a/r) * r - a
    ) * length(st);
}
```

### How It Works

1. Convert the pixel position into polar coordinates.
2. Determine which polygon sector the pixel belongs to.
3. Snap to the nearest edge.
4. Compute distance to that edge.
5. Use the resulting distance field as a mask.

This allows any regular polygon to be generated entirely through mathematics.

| N | Shape |
|---|--------|
| 3 | Triangle |
| 4 | Square |
| 5 | Pentagon |
| 6 | Hexagon |
| 8 | Octagon |

---

## Signed Distance Fields (SDFs)

An SDF stores the distance between a pixel and a shape boundary.

```text
Distance < 0 → Inside Shape
Distance = 0 → On Boundary
Distance > 0 → Outside Shape
```

Instead of asking:

```text
"Is this pixel inside the shape?"
```

the shader asks:

```text
"How far is this pixel from the shape?"
```

This enables smooth animation, blending, masking, and shape composition with very little code.

---

## Shape Composition

Multiple distance fields can be combined using Constructive Solid Geometry (CSG).

### Union

```glsl
min(shapeA, shapeB)
```

Combines shapes together.

### Intersection

```glsl
max(shapeA, shapeB)
```

Keeps only overlapping regions.

### Subtraction

```glsl
max(shapeA, -shapeB)
```

Cuts holes into shapes.

In this transition:

```glsl
float d1 = polygonSDF(st, 6);
float d2 = polygonSDF(st, 2);

float d = max(d1, d2);
```

Two polygon fields are combined to create a more dynamic geometric mask.

---

## Animation Strategy

The effect is controlled through a single uniform:

```glsl
uniform float progress;
```

where:

```text
0.0 → Transition Starts
1.0 → Transition Completes
```

The polygon rotates during expansion:

```glsl
cos(
    floor(0.5 + a/r) * r - a
    + progress * PI
)
```

while the reveal mask grows:

```glsl
float reveal = mix(
    0.0,
    1.8,
    progress
);
```

The shape expands until it fully covers the viewport.

---

## Why This Looks Interesting

Most interfaces use:

- Fade
- Slide
- Scale
- Blur

These are effective but common.

This effect creates a custom visual identity by turning the transition itself into a branded experience.

Because the shape is generated mathematically, it can be:

- Rotated
- Morphed
- Layered
- Combined
- Customized

without introducing new assets.

---

## Performance

The transition is rendered entirely in a fragment shader.

### Advantages

- GPU accelerated
- No SVGs
- No image sequences
- No videos
- No geometry generation
- Resolution independent
- Infinitely scalable

Complexity is approximately:

```text
O(1) per pixel
```

making it suitable for modern desktop and mobile devices.

---

## Ideal Use Cases

This transition works especially well for:

- AI products
- SaaS dashboards
- Developer tools
- Creative portfolios
- Cyberpunk interfaces
- Fintech applications
- Gaming platforms
- Product launch experiences

It is most effective when paired with a centered logo that appears briefly during the portal expansion phase.

---

## Inspiration

- Martin Upitis
- Inigo Quilez
- Patricio Gonzalez Vivo
- The Book of Shaders
- Signed Distance Field Rendering
- Procedural Graphics
- Generative Design

---

## Credits

Created while experimenting with Polygon Signed Distance Fields during studies from *The Book of Shaders*.

A happy accident that turned into a surprisingly cool page transition.
