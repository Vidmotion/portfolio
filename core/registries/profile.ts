import { identity } from './identity'
import type { Locale, NoteEntry } from '@/types'

/** Professional copy drafted from Carlo's supplied CV and cover letter. */
export const profile = {
  title: 'Communication & Creative Project Manager',
  portrait: '/images/profile/carlo-desantis.jpeg',
  location: { en: 'Milan, Italy', it: 'Milano, Italia' },
  summary: {
    en: 'I connect communication, creative production and digital development, managing projects from the first brief to delivery.',
    it: 'Collego comunicazione, produzione creativa e sviluppo digitale, seguendo i progetti dal primo brief alla consegna.',
  },
  bio: {
    en: [
      'I work across communication and creative projects, bringing together client relationships, project management and hands-on execution. Based in Milan, I coordinate clients, creative and technical teams from briefing and planning through production and delivery.',
      'Alongside my agency work, I develop concepts and produce photography, video and branded content for advertising, social campaigns and music. My development background also connects creative direction with UX/UI design and digital implementation.',
      'AI is part of my practical workflow: I use it for ideation, visual exploration, prototyping, coding and audiovisual production, refining the results through design, production and development skills.',
    ],
    it: [
      'Lavoro nella comunicazione e nei progetti creativi, unendo relazione con i clienti, gestione del progetto e realizzazione concreta. Da Milano coordino clienti, team creativi e tecnici dal brief e dalla pianificazione fino alla produzione e alla consegna.',
      'Accanto al lavoro in agenzia, sviluppo concept e produco fotografia, video e branded content per advertising, campagne social e musica. Il mio background nello sviluppo collega anche direzione creativa, UX/UI e realizzazione digitale.',
      'L’AI fa parte del mio workflow operativo: la utilizzo per ideazione, esplorazione visiva, prototipazione, codice e produzione audiovisiva, rifinendo i risultati con competenze di design, produzione e sviluppo.',
    ],
  },
  expertise: {
    en: [
      'Communication & clients',
      'Project management',
      'Creative & content',
      'Digital & development',
      'AI tools & workflows',
    ],
    it: [
      'Comunicazione e clienti',
      'Project management',
      'Creatività e contenuti',
      'Digitale e sviluppo',
      'Strumenti e workflow AI',
    ],
  },
} as const

export function getProfileNote(locale: Locale): NoteEntry {
  return {
    id: 'bio',
    slug: 'bio',
    title: locale === 'it' ? 'Chi sono' : 'About me',
    excerpt: profile.summary[locale],
    content: `# ${identity.name}\n\n${profile.title}\n\n${profile.location[locale]}\n\n${profile.bio[locale].join('\n\n')}\n\n---\n\n${profile.expertise[locale].join(' · ')}\n\n→ ${identity.email}`,
  }
}
