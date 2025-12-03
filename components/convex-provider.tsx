"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ReactNode, createContext, useContext, useMemo } from "react"

const ConvexAvailableContext = createContext<boolean>(false)

export function useConvexAvailable() {
  return useContext(ConvexAvailableContext)
}

const PLACEHOLDER_URL = "https://placeholder.convex.cloud"

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  const isRealUrl = !!url && url !== PLACEHOLDER_URL
  
  const convex = useMemo(() => {
    const convexUrl = url || PLACEHOLDER_URL
    return new ConvexReactClient(convexUrl)
  }, [url])

  return (
    <ConvexAvailableContext.Provider value={isRealUrl}>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ConvexAvailableContext.Provider>
  )
}
