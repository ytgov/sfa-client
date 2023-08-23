interface UserRecord {
  id: number
  email: string
  emailPublic: string
  isActive: boolean
  firstName: string
  lastName: string
  position?: string
  phone?: string
  phoneTollfree?: string
  fax?: string
  createDate: Date
  sub?: string
  ynetId?: string
  roles?: string
}

// not in database
interface AuthUserBlob {
  displayName: string
  lastName: string
  firstName: string
  username: string
  email: string
  emailVerified: boolean
  sub: string
  isActive?: boolean
}

interface User extends UserRecord, AuthUserBlob {
  // Override parents, set field as required if either parent has field set to required
  sub: string
  isActive: boolean
}

class User {
  #sub: string;

  constructor(params: UserRecord & AuthUserBlob) {
    this.id = params.id
    this.email = params.email
    this.emailPublic = params.emailPublic
    this.isActive = params.isActive
    this.firstName = params.firstName
    this.lastName = params.lastName
    this.position = params.position
    this.phone = params.phone
    this.phoneTollfree = params.phoneTollfree
    this.fax = params.fax
    this.createDate = params.createDate
    this.#sub = params.sub
    this.ynetId = params.ynetId
    this.roles = params.roles

    // Non-database fields from AuthUserBlob
    this.displayName = params.displayName
    this.username = params.username
    this.emailVerified = params.emailVerified
  }

  // Enforce access of sub via oAuthSubject because readability counts
  get oAuthSubject(): string | undefined {
    return this.#sub
  }
}

export default User
