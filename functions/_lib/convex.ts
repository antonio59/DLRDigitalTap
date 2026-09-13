interface ConvexQueryResponse<T> {
  status: string
  value?: T
  errorMessage?: string
}

export interface ConvexComment {
  name: string
  comment: string
  created_at: string
}

export async function convexQuery<T>(
  convexUrl: string,
  path: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(`${convexUrl}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args, format: "json" }),
  })

  if (!response.ok) {
    throw new Error(`Convex query ${path} failed: ${response.status}`)
  }

  const body = (await response.json()) as ConvexQueryResponse<T>
  if (body.status !== "success") {
    throw new Error(`Convex query ${path} failed: ${body.errorMessage ?? body.status}`)
  }
  return body.value as T
}
