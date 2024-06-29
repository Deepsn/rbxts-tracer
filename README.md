# Tracer

Tracer is a Raycast Wrapper that makes Raycasting so much easier, inspired by [S&Box Trace API](https://docs.facepunch.com/s/sbox-dev/doc/tracing-FI4tuMSbSF)

## Features

- Create traces with ease `Tracer.ray(startPos, endPos).run()` !
- Most casts in one API! (BlockCast, SphereCast, Raycast)
- Multiple helper functions to modify or extend your Raycast
    - ignoreObject
    - withTag, withoutTag
    - useRaycastParams
- Easily creatable using Builder pattern

## Setup

```
npm install @rbxts/tracer
yarn install @rbxts/tracer
pnpm install @rbxts/tracer
bun install @rbxts/tracer
```

## Usage

### Basic Raycast

1. **Create a Raycast:** Start by creating a ray using the `Tracer.ray(startPos, endPos)` method. This method requires two parameters: the starting position and the ending position of the ray.

```typescript
// Direction
const ray = Tracer.ray(startPos, direction, length);

// Positions
const ray = Tracer.ray(startPos, endPos);
```

2. **Run the Raycast:** Once you have created the ray, you can run it using the `.run()` method. This will execute the raycast and return the results.

```typescript
const result = ray.run();
if (result.hit) {
    console.log(`Hit at position: ${result.position}`);
}
```

> [!NOTE]
> The `result` object will always be returned, even if the ray does not hit anything. You can check if the ray hit something by checking the `hit` property.

### Filters

- **Ignoring Objects:** To ignore certain objects during your raycast, use the `ignoreObject` method.

```typescript
ray.ignoreObject(someObject);
```

- **Filtering by Tag:** You can include or exclude objects based on their tags using `withTag` or `withoutTag`.

```typescript
ray.withTag("enemy").withoutTag("ally");
```

- **Custom Raycast Parameters:** You can use custom RaycastParams to modify the raycast behavior.

```typescript
const customParams = new RaycastParams();
customParams.FilterType = Enum.RaycastFilterType.Include;
ray.useRaycastParams(customParams);
```

- **Custom Filters:** For more control over the raycast, use `addFilter` to add filters that ignore or allow certain hits

```typescript
ray.addFilter((result) => result.hit === part);
```

### BlockCast and SphereCast

Tracer also supports other types of casts such as BlockCast and SphereCast. Here's how to use them:

```typescript
// BlockCast
Tracer.box(boxSize, startPos, endPos).run();

// SphereCast
Tracer.sphere(radius, startPos, endPos).run();
```

## Contributing

Contributions are welcome! If you have any ideas, bug reports, or feature requests, please open an issue.