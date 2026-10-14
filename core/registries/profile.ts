import { identity } from './identity'
import type { Locale, NoteEntry } from '@/types'

/** Professional copy drafted from Carlo's supplied CV and cover letter. */
export const profile = {
  title: 'Creative & Digital Designer',
  location: {
    en: 'Milan, Italy',
    it: 'Milano, Italia',
  },
  summary: {
    en: 'I connect brand communication, UX/UI and web development with photo and video production, taking projects from the brief to the work people see and use.',
    it: 'Collego comunicazione di brand, UX/UI e sviluppo web alla produzione foto e video, portando i progetti dal brief a ciò che le persone vedono e utilizzano.',
  },
  bio: {
    en: [
      'I’m Carlo Desantis, a creative and digital designer based in Milan. I work across brand communication, interface design, web development and visual content, combining creative thinking with hands-on production.',
      'My work ranges from the new ECR Group website and TakeCare’s product experience to digital projects for Temakinho, POP and Zendra Systems. I also contribute to advertising productions and develop photo and video content for music artists.',
      'In agency and independent projects, I bring together clients, creative teams and developers around a clear brief, workable priorities and delivery. I can take responsibility for a website’s design and implementation, contribute to a brand’s creative direction, or support a production on set.',
      'I use AI for research, exploration, prototyping and production, alongside design and development tools. The value I bring is connecting the idea, the people involved and the work needed to make it happen.',
    ],
    it: [
      'Sono Carlo Desantis, creative e digital designer con base a Milano. Lavoro tra comunicazione di brand, progettazione di interfacce, sviluppo web e contenuti visivi, unendo pensiero creativo e realizzazione concreta.',
      'I miei progetti spaziano dal nuovo sito di ECR Group all’esperienza di prodotto di TakeCare, fino ai lavori digitali per Temakinho, POP e Zendra Systems. Contribuisco inoltre a produzioni pubblicitarie e sviluppo contenuti foto e video per artisti musicali.',
      'Nei progetti di agenzia e indipendenti metto in relazione clienti, team creativi e sviluppatori attraverso un brief chiaro, priorità concrete e attenzione alla consegna. Posso seguire design e implementazione di un sito, contribuire alla direzione creativa di un brand o supportare una produzione sul set.',
      'Utilizzo l’AI per ricerca, esplorazione, prototipazione e produzione, insieme agli strumenti di design e sviluppo. Il mio contributo è collegare l’idea, le persone coinvolte e il lavoro necessario per realizzarla.',
    ],
  },
  portrait: '/images/profile/carlo-desantis.jpeg',
  expertise: {
    en: [
      'Brand & communication',
      'Digital design & development',
      'Photo, video & production',
      'Project & client coordination',
      'AI tools & workflows',
    ],
    it: [
      'Brand e comunicazione',
      'Design e sviluppo digitale',
      'Foto, video e produzione',
      'Coordinamento di progetti e clienti',
      'Strumenti e workflow AI',
    ],
  },
  seo: {
    title: 'Carlo Desantis — Creative & Digital Designer',
    description: {
      en: 'Brand communication, UX/UI, web development and visual content. Selected work by Carlo Desantis, a creative and digital designer based in Milan.',
      it: 'Comunicazione di brand, UX/UI, sviluppo web e contenuti visivi. Progetti selezionati di Carlo Desantis, creative e digital designer a Milano.',
    },
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
