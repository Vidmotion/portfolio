export type Identity = {
  name: string
  productName: string
  email: string
  social: Array<{ platform: string; url: string }>
}

export const identity: Identity = {
  name: 'Carlo Desantis',
  productName: 'Portfolio OS',
  email: 'carlo@carlodesantis.com',
  social: [{ platform: 'instagram', url: 'https://instagram.com' }],
}
