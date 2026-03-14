import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const SECRET = process.env.BITGO_ACCESS_TOKEN!.slice(0, 32) // 32-byte key from token

export function encryptVote(signerAddress: string, decision: 'approve' | 'reject'): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET), iv)

  const payload = JSON.stringify({
    signer: signerAddress,
    decision,
    timestamp: Date.now(),
  })

  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return Buffer.concat([iv, authTag, encrypted]).toString('base64')
}

export function decryptVote(encryptedData: string): {
  signer: string
  decision: 'approve' | 'reject'
  timestamp: number
} {
  const buffer = Buffer.from(encryptedData, 'base64')
  const iv = buffer.subarray(0, 12)
  const authTag = buffer.subarray(12, 28)
  const encrypted = buffer.subarray(28)

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET), iv)
  decipher.setAuthTag(authTag)

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return JSON.parse(decrypted.toString('utf8'))
}