import { getProfileNote } from '@/core/registries/profile'
import type { Locale } from '@/types'
import type { Project, NoteEntry, PhotoAlbum } from '@/types'

// ─── Projects ─────────────────────────────────────────────────────────────────
// Placeholder content — replace with real projects.
// Adding a project never requires modifying a component.

export const projects: Project[] = [
  {
    id: 'nocturne',
    slug: 'nocturne',
    title: 'Nocturne',
    category: 'film-making',
    year: 2024,
    client: 'Self-commissioned',
    description:
      'A short film exploring the boundary between silence and sound. Shot entirely at night over three weeks in rural Lombardy.',
    cover: '/images/projects/nocturne-cover.jpg',
    gallery: [
      '/images/projects/nocturne-01.jpg',
      '/images/projects/nocturne-02.jpg',
      '/images/projects/nocturne-03.jpg',
      '/images/projects/nocturne-04.jpg',
    ],
    credits: [
      { role: 'Director', name: 'Carlo Desantis' },
      { role: 'Director of Photography', name: 'Carlo Desantis' },
      { role: 'Sound Design', name: 'Marco Ferri' },
      { role: 'Color Grade', name: 'Carlo Desantis' },
    ],
    tags: ['16mm', 'Night', 'Experimental'],
    featured: true,
  },
  {
    id: 'static-bloom',
    slug: 'static-bloom',
    title: 'Static Bloom',
    category: 'creative-direction',
    year: 2024,
    description:
      'A photographic study of industrial landscapes transforming through seasonal light. 42 images across four months.',
    cover: '/images/projects/static-bloom-cover.jpg',
    gallery: [
      '/images/projects/static-bloom-01.jpg',
      '/images/projects/static-bloom-02.jpg',
      '/images/projects/static-bloom-03.jpg',
      '/images/projects/static-bloom-04.jpg',
    ],
    credits: [
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Retouching', name: 'Carlo Desantis' },
    ],
    tags: ['Industrial', 'Landscape', 'Series'],
    featured: true,
  },
  {
    id: 'salt-and-iron',
    slug: 'salt-and-iron',
    title: 'Salt & Iron',
    category: 'creative-direction',
    year: 2023,
    client: 'Private Collection',
    description:
      'Portrait series documented along the Ligurian coast. Fishermen, boats, early mornings.',
    cover: '/images/projects/salt-iron-cover.jpg',
    gallery: [
      '/images/projects/salt-iron-01.jpg',
      '/images/projects/salt-iron-02.jpg',
      '/images/projects/salt-iron-03.jpg',
      '/images/projects/salt-iron-04.jpg',
    ],
    credits: [
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Post-Production', name: 'Carlo Desantis' },
    ],
    tags: ['Portrait', 'Coast', 'Documentary'],
    featured: false,
  },
  {
    id: 'after-hours',
    slug: 'after-hours',
    title: 'After Hours',
    category: 'film-making',
    year: 2024,
    client: 'Interlude Records',
    description:
      'Music video for the title track of the debut EP. Directed and shot in a single continuous take.',
    cover: '/images/projects/after-hours-cover.jpg',
    gallery: [
      '/images/projects/after-hours-01.jpg',
      '/images/projects/after-hours-02.jpg',
      '/images/projects/after-hours-03.jpg',
      '/images/projects/after-hours-04.jpg',
    ],
    credits: [
      { role: 'Director', name: 'Carlo Desantis' },
      { role: 'DP', name: 'Carlo Desantis' },
      { role: 'Artist', name: 'Luca M.' },
      { role: 'Label', name: 'Interlude Records' },
    ],
    tags: ['Music Video', 'Single Take', 'Indie'],
    featured: true,
  },
  {
    id: 'aperture-house',
    slug: 'aperture-house',
    title: 'Aperture House',
    category: 'creative-direction',
    year: 2023,
    client: 'Studio Aperture',
    description:
      'Brand identity and visual system for an architecture studio in Milan. Photography, editorial design, motion graphics.',
    cover: '/images/projects/aperture-house-cover.jpg',
    gallery: [
      '/images/projects/aperture-house-01.jpg',
      '/images/projects/aperture-house-02.jpg',
      '/images/projects/aperture-house-03.jpg',
      '/images/projects/aperture-house-04.jpg',
    ],
    credits: [
      { role: 'Creative Direction', name: 'Carlo Desantis' },
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Design', name: 'Studio Aperture' },
    ],
    tags: ['Branding', 'Architecture', 'Editorial'],
    featured: false,
  },
  {
    id: 'low-frequencies',
    slug: 'low-frequencies',
    title: 'Low Frequencies',
    category: 'film-making',
    year: 2023,
    client: 'Self-commissioned',
    description:
      'Documentary about the underground electronic music scene in Northern Italy. Three cities, twelve artists, one year.',
    cover: '/images/projects/low-frequencies-cover.jpg',
    gallery: [
      '/images/projects/low-frequencies-01.jpg',
      '/images/projects/low-frequencies-02.jpg',
      '/images/projects/low-frequencies-03.jpg',
      '/images/projects/low-frequencies-04.jpg',
    ],
    credits: [
      { role: 'Director', name: 'Carlo Desantis' },
      { role: 'Camera', name: 'Carlo Desantis' },
      { role: 'Editor', name: 'Carlo Desantis' },
    ],
    tags: ['Documentary', 'Music', 'Electronic'],
    featured: false,
  },
  {
    id: 'tailored-silence',
    slug: 'tailored-silence',
    title: 'Tailored Silence',
    category: 'creative-direction',
    year: 2024,
    client: 'Atelier Moretti',
    description:
      'Campaign imagery for a bespoke tailoring atelier. Minimalist environments, precise light.',
    cover: '/images/projects/tailored-silence-cover.jpg',
    gallery: [
      '/images/projects/tailored-silence-01.jpg',
      '/images/projects/tailored-silence-02.jpg',
      '/images/projects/tailored-silence-03.jpg',
      '/images/projects/tailored-silence-04.jpg',
    ],
    credits: [
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Creative Direction', name: 'Carlo Desantis' },
      { role: 'Styling', name: 'Giulia Rossi' },
      { role: 'Client', name: 'Atelier Moretti' },
    ],
    tags: ['Fashion', 'Editorial', 'Minimal'],
    featured: true,
  },
  {
    id: 'the-long-drive',
    slug: 'the-long-drive',
    title: 'The Long Drive',
    category: 'film-making',
    year: 2023,
    description: 'A road film. Four days, two people, no destination. Shot on Super 8 and 16mm.',
    cover: '/images/projects/the-long-drive-cover.jpg',
    gallery: [
      '/images/projects/the-long-drive-01.jpg',
      '/images/projects/the-long-drive-02.jpg',
      '/images/projects/the-long-drive-03.jpg',
      '/images/projects/the-long-drive-04.jpg',
    ],
    credits: [
      { role: 'Director', name: 'Carlo Desantis' },
      { role: 'Camera', name: 'Carlo Desantis' },
      { role: 'Sound', name: 'Filippo Bianchi' },
    ],
    tags: ['Road Film', 'Super 8', '16mm'],
    featured: false,
  },
  {
    id: 'coastlines',
    slug: 'coastlines',
    title: 'Coastlines',
    category: 'creative-direction',
    year: 2024,
    client: 'Blu Mediterraneo',
    description:
      'Summer campaign for a Mediterranean travel brand. Shot across Sicily, Sardinia, and the Cinque Terre.',
    cover: '/images/projects/coastlines-cover.jpg',
    gallery: [
      '/images/projects/coastlines-01.jpg',
      '/images/projects/coastlines-02.jpg',
      '/images/projects/coastlines-03.jpg',
      '/images/projects/coastlines-04.jpg',
    ],
    credits: [
      { role: 'Director', name: 'Carlo Desantis' },
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Agency', name: 'Studio Forma' },
      { role: 'Client', name: 'Blu Mediterraneo' },
    ],
    tags: ['Campaign', 'Travel', 'Mediterranean'],
    featured: true,
  },
  {
    id: 'form-and-field',
    slug: 'form-and-field',
    title: 'Form & Field',
    category: 'creative-direction',
    year: 2023,
    client: 'Terreno Wines',
    description: 'Product and lifestyle campaign for a natural wine producer in Piedmont.',
    cover: '/images/projects/form-field-cover.jpg',
    gallery: [
      '/images/projects/form-field-01.jpg',
      '/images/projects/form-field-02.jpg',
      '/images/projects/form-field-03.jpg',
      '/images/projects/form-field-04.jpg',
    ],
    credits: [
      { role: 'Photography', name: 'Carlo Desantis' },
      { role: 'Creative Direction', name: 'Carlo Desantis' },
      { role: 'Client', name: 'Terreno Wines' },
    ],
    tags: ['Wine', 'Lifestyle', 'Campaign'],
    featured: false,
  },
  {
    id: 'origin',
    slug: 'origin',
    title: 'Origin',
    category: 'creative-direction',
    year: 2022,
    description:
      'Personal project examining the visual language of the places that shaped a creative practice.',
    cover: '/images/projects/origin-cover.jpg',
    gallery: [
      '/images/projects/origin-01.jpg',
      '/images/projects/origin-02.jpg',
      '/images/projects/origin-03.jpg',
      '/images/projects/origin-04.jpg',
    ],
    credits: [{ role: 'All work', name: 'Carlo Desantis' }],
    tags: ['Personal', 'Documentary', 'Mixed Media'],
    featured: false,
  },
  {
    id: 'greyscale',
    slug: 'greyscale',
    title: 'Greyscale',
    category: 'creative-direction',
    year: 2022,
    description:
      'An ongoing series shot exclusively in black and white. Architecture, texture, light.',
    cover: '/images/projects/greyscale-cover.jpg',
    gallery: [
      '/images/projects/greyscale-01.jpg',
      '/images/projects/greyscale-02.jpg',
      '/images/projects/greyscale-03.jpg',
      '/images/projects/greyscale-04.jpg',
    ],
    credits: [{ role: 'Photography', name: 'Carlo Desantis' }],
    tags: ['Black & White', 'Architecture', 'Ongoing'],
    featured: false,
  },
]

// ─── Notes ────────────────────────────────────────────────────────────────────
// Notes is read-only in v1. No editor. Users read content only.

export const notes: NoteEntry[] = [
  getProfileNote('en'),
  {
    id: 'light-first',
    title: 'Light First',
    slug: 'light-first',
    excerpt: 'On why light is always the first decision.',
    content: `# Light First

Every image begins with a question about light.

Not composition. Not subject. Not message. Light first — because light is the material. Everything else is arrangement.

I became a filmmaker because of the way light behaves on film stock at magic hour. There is a quality to that light that no digital sensor fully captures. It is not nostalgia. It is physics. The grain structure of silver halide crystals responds to photons in a way that is fundamentally different from a CMOS sensor. Neither is better. They are different instruments.

Understanding your instrument is the beginning of a practice.

---

**On the practical:**

Before scouting a location, I look at sun position data for the dates we plan to shoot. The best scene at the wrong time of day is a missed opportunity. Light is not infinitely correctable in post. The decision happens on the day, in the hour.

**On the philosophical:**

Light is the one element in photography that cannot be faked. Presence in the right place at the right time — that is what makes a photograph. Everything else is craft. Light is luck, patience, and understanding combined.

---

*What this means for commissions:* I will always ask about timing before I ask about location. A golden hour portrait in the right place is worth ten images taken in harsh midday light. Budget your time accordingly.`,
  },
  {
    id: 'on-restraint',
    title: 'On Restraint',
    slug: 'on-restraint',
    excerpt: 'Less is not laziness.',
    content: `# On Restraint

The hardest thing to learn in a visual practice is when to stop.

Not because more is always wrong — sometimes accumulation is exactly right, and density becomes the point. But because the reflex is always to add. Another element. Another layer. Another idea. The assumption that complexity signals effort.

It doesn't.

---

The images I return to most often are sparse. A face. A landscape. A single object in the corner of the frame. Something about them is complete without being full. They leave room for the viewer to bring something.

I think of this as *structural generosity* — making images that are open rather than closed.

---

**What I try to resist:**

The urge to explain. An image that explains itself is an image that doesn't trust its viewer.

The urge to prove effort. The client doesn't need to see the difficulty. They need to see the result.

The urge to include every idea. A project that tries to say five things usually says none of them clearly.

---

Restraint is not minimalism as aesthetic. It is minimalism as discipline — the daily practice of choosing what to leave out.

The work gets better every time I make this choice correctly.`,
  },
]

// ─── Photo Albums ─────────────────────────────────────────────────────────────

export const albums: PhotoAlbum[] = [
  {
    id: 'salt-and-iron',
    title: 'Salt & Iron',
    coverPhoto: '/images/photos/salt-iron-cover.jpg',
    photos: [
      '/images/photos/salt-iron-01.jpg',
      '/images/photos/salt-iron-02.jpg',
      '/images/photos/salt-iron-03.jpg',
      '/images/photos/salt-iron-04.jpg',
      '/images/photos/salt-iron-05.jpg',
      '/images/photos/salt-iron-06.jpg',
    ],
    count: 6,
  },
  {
    id: 'coastlines',
    title: 'Coastlines',
    coverPhoto: '/images/photos/coastlines-cover.jpg',
    photos: [
      '/images/photos/coastlines-01.jpg',
      '/images/photos/coastlines-02.jpg',
      '/images/photos/coastlines-03.jpg',
      '/images/photos/coastlines-04.jpg',
    ],
    count: 4,
  },
  {
    id: 'greyscale',
    title: 'Greyscale',
    coverPhoto: '/images/photos/greyscale-cover.jpg',
    photos: [
      '/images/photos/greyscale-01.jpg',
      '/images/photos/greyscale-02.jpg',
      '/images/photos/greyscale-03.jpg',
      '/images/photos/greyscale-04.jpg',
      '/images/photos/greyscale-05.jpg',
    ],
    count: 5,
  },
]

// ─── Selectors ────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getNoteBySlug(slug: string): NoteEntry | undefined {
  return notes.find((n) => n.slug === slug)
}

export function getNotes(locale: Locale): NoteEntry[] {
  return notes.map((note) => (note.id === 'bio' ? getProfileNote(locale) : note))
}
