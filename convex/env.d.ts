// Convex functions can read deployment environment variables via process.env,
// but the Convex runtime does not ship Node's type declarations.
declare const process: {
  env: Record<string, string | undefined>
}
