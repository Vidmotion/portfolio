import type { Locale, ProjectImage } from '@/types'

type MockupImage = Omit<ProjectImage, 'alt' | 'caption'> & {
  caption: Record<Locale, string>
  locale?: Locale
}

/** Shared presentation boards rendered from the real project screens and supplied media. */
export const projectMockups: Partial<Record<string, MockupImage[]>> = {
  'ecr-group': [
    {
      src: '/images/projects/ecr-group/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Institutional homepage and member directory on mobile',
        it: 'Homepage istituzionale e directory dei membri su mobile',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-02-vision.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Vision and editorial highlights',
        it: 'Visione e contenuti editoriali',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-03-news.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'News and story pages',
        it: 'Notizie e pagine di approfondimento',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-04-members.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Member directory and individual profile',
        it: 'Directory dei membri e profilo individuale',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-05-organisation.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Institutional structure and working groups',
        it: 'Struttura istituzionale e gruppi di lavoro',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-06-map-publications.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Interactive map and publications',
        it: 'Mappa interattiva e pubblicazioni',
      },
    },
    {
      src: '/images/projects/ecr-group/2026-10-19-07-events-mobile.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Events and member profile on mobile',
        it: 'Eventi e profilo del membro su mobile',
      },
    },
  ],
  pop: [
    {
      src: '/images/projects/pop/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/pop/2026-10-19-02-mobile.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Mobile website',
        it: 'Sito mobile',
      },
    },
  ],
  takecare: [
    {
      src: '/images/projects/takecare/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/takecare/2026-10-19-02-mobile.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Mobile website',
        it: 'Sito mobile',
      },
    },
  ],
  temakinho: [
    {
      src: '/images/projects/temakinho/2026-10-19-01-homepage.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Homepage design',
        it: 'Design della homepage',
      },
    },
    {
      src: '/images/projects/temakinho/2026-10-19-02-rimini.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Rimini restaurant page design',
        it: 'Design della pagina del ristorante di Rimini',
      },
    },
    {
      src: '/images/projects/temakinho/2026-10-19-03-homepage-sequence.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Homepage layout, from opening to restaurant directory',
        it: 'Layout della homepage, dall’apertura alla directory dei ristoranti',
      },
    },
  ],
  zendra: [
    {
      src: '/images/projects/zendra/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/zendra/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  'hollywood-milano': [
    {
      src: '/images/projects/hollywood-milano/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/hollywood-milano/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  loolapaloosa: [
    {
      src: '/images/projects/loolapaloosa/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/loolapaloosa/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  penny: [
    {
      src: '/images/projects/penny/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/penny/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  nomad: [
    {
      src: '/images/projects/nomad/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/nomad/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  smallfly: [
    {
      src: '/images/projects/smallfly/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website on desktop and mobile',
        it: 'Sito su desktop e mobile',
      },
    },
    {
      src: '/images/projects/smallfly/2026-10-19-02-details.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Website details and mobile layout',
        it: 'Dettagli del sito e layout mobile',
      },
    },
  ],
  admiral: [
    {
      src: '/images/projects/admiral/2026-10-19-en-bonus.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Bonus landing page · English desktop and mobile',
        it: 'Landing Bonus · desktop e mobile in inglese',
      },
      locale: 'en',
    },
    {
      src: '/images/projects/admiral/2026-10-19-en-welcomeoffer.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Welcome Offer landing page · English desktop and mobile',
        it: 'Landing Welcome Offer · desktop e mobile in inglese',
      },
      locale: 'en',
    },
    {
      src: '/images/projects/admiral/2026-10-19-it-bonus.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Bonus landing page · Italian desktop and mobile',
        it: 'Landing Bonus · desktop e mobile in italiano',
      },
      locale: 'it',
    },
    {
      src: '/images/projects/admiral/2026-10-19-it-welcomeoffer.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Welcome Offer landing page · Italian desktop and mobile',
        it: 'Landing Welcome Offer · desktop e mobile in italiano',
      },
      locale: 'it',
    },
  ],
  'le-scuderie-milano': [
    {
      src: '/images/projects/le-scuderie-milano/2026-10-19-01-homepage.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Homepage design',
        it: 'Design della homepage',
      },
    },
    {
      src: '/images/projects/le-scuderie-milano/2026-10-19-02-page-sequence.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Page layout, from introduction to spaces and contacts',
        it: 'Layout della pagina, dalla presentazione agli spazi e ai contatti',
      },
    },
  ],
  riri2k: [
    {
      src: '/images/projects/riri2k/2026-10-19-01-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'BLING BLING · artist photography',
        it: 'BLING BLING · fotografia dell’artista',
      },
    },
    {
      src: '/images/projects/riri2k/2026-10-19-02-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'BLING BLING · styling and close-up',
        it: 'BLING BLING · styling e dettaglio',
      },
    },
    {
      src: '/images/projects/riri2k/2026-10-19-03-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'BLING BLING · promotional portrait',
        it: 'BLING BLING · ritratto promozionale',
      },
    },
    {
      src: '/images/projects/riri2k/2026-10-19-04-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'BLING BLING · photographic series',
        it: 'BLING BLING · serie fotografica',
      },
    },
    {
      src: '/images/projects/riri2k/2026-10-19-05-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'BLING BLING · visual identity',
        it: 'BLING BLING · identità visiva',
      },
    },
  ],
  'carla-hero': [
    {
      src: '/images/projects/carla-hero/2026-10-19-01-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Carla Hero · cover artwork',
        it: 'Carla Hero · artwork di copertina',
      },
    },
    {
      src: '/images/projects/carla-hero/2026-10-19-02-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Amorosa · cover artwork',
        it: 'Amorosa · artwork di copertina',
      },
    },
  ],
  'chef-p': [
    {
      src: '/images/projects/chef-p/2026-10-19-01-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'CHEF P & DJ Dero · 24/7 shoot',
        it: 'CHEF P & DJ Dero · shooting 24/7',
      },
    },
    {
      src: '/images/projects/chef-p/2026-10-19-02-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'CHEF P & DJ Dero · promotional photography',
        it: 'CHEF P & DJ Dero · fotografia promozionale',
      },
    },
  ],
  sandro: [
    {
      src: '/images/projects/sandro/2026-10-19-01-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Video still · ensemble scene',
        it: 'Frame video · scena corale',
      },
    },
    {
      src: '/images/projects/sandro/2026-10-19-02-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Video still · portrait',
        it: 'Frame video · ritratto',
      },
    },
    {
      src: '/images/projects/sandro/2026-10-19-03-photography.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Video still · close-up',
        it: 'Frame video · dettaglio del ritratto',
      },
    },
  ],
  ristora: [
    {
      src: '/images/projects/ristora/2026-10-19-01-iva-zanicchi.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Ristora TV commercial with Iva Zanicchi · film still',
        it: 'Spot TV Ristora con Iva Zanicchi · fotogramma',
      },
    },
    {
      src: '/images/projects/ristora/2026-10-19-02-supermarket.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Iva Zanicchi in the supermarket sequence',
        it: 'Iva Zanicchi nella sequenza al supermercato',
      },
    },
    {
      src: '/images/projects/ristora/2026-10-19-03-products.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Ristora products · film still',
        it: 'Prodotti Ristora · fotogramma dello spot',
      },
    },
    {
      src: '/images/projects/ristora/2026-10-19-04-sequence.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Selected frames from the commercial',
        it: 'Fotogrammi selezionati dello spot',
      },
    },
  ],
  'portfolio-os': [
    {
      src: '/images/projects/portfolio-os/2026-10-19-01-overview.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Portfolio OS on desktop and mobile',
        it: 'Portfolio OS su desktop e mobile',
      },
    },
    {
      src: '/images/projects/portfolio-os/2026-10-19-02-tablet.webp',
      width: 3200,
      height: 1800,
      caption: {
        en: 'Portfolio OS on tablet',
        it: 'Portfolio OS su tablet',
      },
    },
  ],
}
