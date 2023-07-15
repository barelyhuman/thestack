import { randomBytes, pbkdf2Sync } from 'crypto'

const iterations = 1000
const hashLength = 64
const algo = 'sha512'

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hashedPass = pbkdf2Sync(password, salt, iterations, hashLength, algo)
  return {
    pass: hashedPass.toString('hex'),
    salt,
  }
}

export function verifyPassword(password, hashedPass, salt) {
  const hashBuffer = pbkdf2Sync(password, salt, iterations, hashLength, algo)
  const reHashedPassword = hashBuffer.toString('hex')
  return reHashedPassword === hashedPass
}
