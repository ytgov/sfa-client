enum Statues {
  CHECK = "Check",
  PENDING = "Pending",
  WAIT = "Wait",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
  QUALIFIED = "Qualified",
  AWARDED = "Awarded",
  APPEAL = "Appeal",
  ADJUSTED = "Adjusted",
  ONLINE_IN_PROGRESS = "Online - in progress",
  ONLINE = "Online",
  RECOMMENDED = "Recommended",
  EXPIRED_ONLINE = "Expired - online",
  READY = "Ready",
  PROCESSING = "Processing",
  CGS_ONLY = "CGS Only",
}

interface StatusRecord {
  id: number
  description: string
  onlineDescription?: string
  sortOrder: number
  isActive: boolean
}

interface Status extends StatusRecord {}

class Status {
  constructor(params: StatusRecord) {
    this.id = params.id
    this.description = params.description
    this.onlineDescription = params.onlineDescription
    this.sortOrder = params.sortOrder
    this.isActive = params.isActive
  }

  // not in database
  static readonly Types = Statues
}

export default Status
