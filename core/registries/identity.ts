export type Identity = {
  name: string
  productName: string
  email: string
  social: Array<{ platform: string; url: string; label?: string }>
}

export const identity: Identity = {
  name: 'Carlo Desantis',
  productName: 'Portfolio OS',
  email: 'info@carlodesantis.com',
  social: [
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/carloodesantis/' },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/carlo-desantis-design/',
    },
  ],
}
