import { BitGo } from 'bitgo'

const env = (process.env.BITGO_ENV as 'test' | 'prod') ?? 'test'

const bitgo = new BitGo({
  env,
  accessToken: process.env.BITGO_ACCESS_TOKEN!,
})

export const coin = process.env.BITGO_COIN ?? 'hteth'
export const enterpriseId = process.env.BITGO_ENTERPRISE_ID!
export const walletPassphrase = process.env.WALLET_PASSPHRASE!
export const defaultWalletId = process.env.BITGO_WALLET_ID!

export default bitgo