export type Identity = {
  name: string
  productName: string
  email: string
  social: Array<{ platform: string; url: string }>
}

export const identity: Identity = {
  name: 'Carlo Desantis',
  productName: 'Portfolio OS',
  email: 'info@carlodesantis.com',
  social: [
    { platform: 'instagram', url: 'https://www.instagram.com/carloodesantis/' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/carlo-desantis-design/' },
  ],
}
