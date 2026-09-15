import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()

crons.interval(
  "sweep orphaned pending uploads",
  { hours: 24 },
  internal.lifecycle.cleanupPendingUploads,
)

export default crons
