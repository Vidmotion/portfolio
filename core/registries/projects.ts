import type { Locale, Project, ProjectImage, ProjectVideo } from '@/types'

type ProjectCopy = Pick<
  Project,
  'summary' | 'subtitle' | 'description' | 'role' | 'sections' | 'deliverables' | 'links'
>
type ProjectDefinition = Omit<Project, keyof ProjectCopy | 'gallery' | 'videos' | 'credits'> & {
  copy: Record<Locale, ProjectCopy>
  images: (Omit<ProjectImage, 'alt' | 'caption'> & {
    caption: Record<Locale, string>
    locale?: Locale
  })[]
  videos?: (Omit<ProjectVideo, 'caption'> & { caption: Record<Locale, string> })[]
}

/** Canonical portfolio content. Edit a case here to update all device experiences. */
const definitions: ProjectDefinition[] = [
  {
    id: 'ecr-group',
    title: 'ECR Group',
    category: 'digital',
    client: 'ECR Group',
    featured: true,
    slug: 'ecr-group',
    status: 'in-progress',
    cover: '/images/projects/logos/ecr-group.png',
    preview: { background: '#1866a5', logoWidth: 47, logoHeight: 30 },
    images: [
      {
        src: '/images/projects/ecr-group/ecr-desktop-home.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Homepage and navigation',
          it: 'Homepage e navigazione',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-home-vision.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Homepage content structure',
          it: 'Struttura dei contenuti della homepage',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-home-headlines.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Featured editorial content',
          it: 'Selezione dei contenuti editoriali',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-news.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'News archive',
          it: 'Archivio delle news',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-ceuta.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'News detail',
          it: 'Dettaglio di una news',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-meps-list.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Member directory',
          it: 'Directory dei membri',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-member-profile.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Member profile',
          it: 'Profilo di un membro',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-structure.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Organisational structure',
          it: 'Struttura organizzativa',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-map.webp',
        width: 1600,
        height: 2102,
        caption: {
          en: 'Member map',
          it: 'Mappa dei membri',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-publications.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Publication library',
          it: 'Raccolta delle pubblicazioni',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-events.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Events interface',
          it: 'Interfaccia degli eventi',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-desktop-working-groups.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Working groups',
          it: 'Gruppi di lavoro',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-mobile-meps-list.webp',
        width: 780,
        height: 1688,
        caption: {
          en: 'Member directory — mobile',
          it: 'Directory dei membri — mobile',
        },
      },
      {
        src: '/images/projects/ecr-group/ecr-mobile-member-profile.webp',
        width: 780,
        height: 1688,
        caption: {
          en: 'Member profile — mobile',
          it: 'Profilo di un membro — mobile',
        },
      },
    ],
    tags: ['Information architecture', 'UX/UI', 'Front-end', 'Back-end', 'CMS'],
    copy: {
      en: {
        description:
          'The new ECR Group website brings institutional information, editorial content and member profiles into one connected platform. I am responsible for its information architecture, UX/UI design and front-end and back-end development. The challenge is to make a large content system understandable: visitors need to move between news, events, publications, people and organisational information without losing context. I have developed page structures and interfaces for these different content types, supported by WordPress, PHP and MySQL. This is the most extensive digital project in this selection and is currently being completed ahead of launch. The material shown documents the working preview.',
        subtitle: 'Designing a connected institutional platform.',
        role: 'Sole UX/UI designer and website developer — information architecture, front-end and back-end.',
        deliverables: [
          'Information architecture and UX/UI',
          'WordPress website development with PHP and MySQL',
          'Institutional, editorial and member page interfaces',
        ],
        summary:
          'Information architecture, UX/UI and full-stack development for ECR Group’s new website. Currently in its final development phase.',
        sections: [
          {
            title: 'Structure before screens',
            body: 'The platform’s scale comes from the relationships between its content: a member belongs to a country and a party, while news, events and publications each need their own browsing and detail views. My work brings these needs into a coherent website structure.',
          },
          {
            title: 'Design and implementation together',
            body: 'I carry the design into the website implementation, so information hierarchy, page layouts and the underlying content system are developed together. The portfolio shows the homepage, editorial pages, member directory and profile, organisational structure, map and publication library.',
          },
        ],
        links: [],
      },
      it: {
        description:
          'Il nuovo sito di ECR Group riunisce informazioni istituzionali, contenuti editoriali e profili dei membri in una piattaforma connessa. Seguo l’architettura dell’informazione, il design UX/UI e lo sviluppo front-end e back-end. La sfida è rendere comprensibile un sistema di contenuti ampio: chi visita il sito deve poter passare tra news, eventi, pubblicazioni, persone e informazioni organizzative mantenendo il contesto. Ho sviluppato strutture di pagina e interfacce per questi diversi tipi di contenuto, con WordPress, PHP e MySQL. È il progetto digitale più esteso di questa selezione, attualmente in completamento prima del lancio. I materiali mostrano l’anteprima funzionante.',
        subtitle: 'Progettare una piattaforma istituzionale connessa.',
        role: 'Unico designer UX/UI e sviluppatore del sito — architettura dell’informazione, front-end e back-end.',
        deliverables: [
          'Architettura dell’informazione e UX/UI',
          'Sviluppo del sito WordPress con PHP e MySQL',
          'Interfacce per pagine istituzionali, editoriali e dei membri',
        ],
        summary:
          'Architettura dell’informazione, UX/UI e sviluppo completo del nuovo sito ECR Group. Attualmente nella fase finale di sviluppo.',
        sections: [
          {
            title: 'La struttura prima delle schermate',
            body: 'La dimensione della piattaforma nasce dalle relazioni tra i contenuti: un membro appartiene a un Paese e a un partito, mentre news, eventi e pubblicazioni richiedono percorsi di consultazione e pagine di dettaglio propri. Il mio lavoro collega queste esigenze in una struttura coerente.',
          },
          {
            title: 'Design e implementazione insieme',
            body: 'Porto il design nell’implementazione del sito, sviluppando insieme gerarchia delle informazioni, layout e sistema dei contenuti. Il portfolio mostra homepage, pagine editoriali, directory e profilo dei membri, struttura organizzativa, mappa e raccolta delle pubblicazioni.',
          },
        ],
        links: [],
      },
    },
  },
  {
    id: 'studio-macaluso',
    title: 'Studio Macaluso',
    category: 'digital',
    client: 'Studio di Odontoiatria Macaluso',
    agency: 'Vidmotion',
    featured: true,
    slug: 'studio-macaluso',
    year: 2026,
    status: 'in-progress',
    cover: '/images/projects/logos/studio-macaluso.png',
    preview: { background: '#ffffff', logoWidth: 66, logoHeight: 26 },
    tags: ['Next.js', 'Three.js', 'UX/UI', 'Responsive design', 'Scroll animation'],
    images: [
      { src: '/images/projects/studio-macaluso/2026-10-19-01-overview.webp', width: 3200, height: 1800, caption: { en: 'The updated website — desktop and mobile', it: 'Il sito aggiornato — desktop e mobile' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-02-studio.webp', width: 3200, height: 1800, caption: { en: 'The practice — page design and visual identity', it: 'Lo studio — design della pagina e identità visiva' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-03-odontoiatria.webp', width: 3200, height: 1800, caption: { en: 'Dentistry — service overview and care areas', it: 'Odontoiatria — panoramica dei servizi e aree di cura' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-04-allineatori-3d.webp', width: 3200, height: 1800, caption: { en: 'Illustrative 3D aligners and scroll interaction', it: 'Allineatori 3D illustrativi e interazione con lo scroll' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-05-confronto-illustrativo.webp', width: 3200, height: 1800, caption: { en: 'Interactive illustrative comparison — not a clinical case or an outcome guarantee', it: 'Confronto illustrativo interattivo — non è un caso clinico né una promessa di risultato' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-06-mobile.webp', width: 3200, height: 1800, caption: { en: 'The mobile experience — homepage, aligners and booking', it: 'L’esperienza mobile — homepage, allineatori e prenotazione' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-07-prenotazione.webp', width: 3200, height: 1800, caption: { en: 'Guided booking demo — desktop and mobile', it: 'Demo di prenotazione guidata — desktop e mobile' } },
      { src: '/images/projects/studio-macaluso/2026-10-19-08-medicina-estetica.webp', width: 3200, height: 1800, caption: { en: 'Aesthetic medicine — desktop and tablet', it: 'Medicina estetica — desktop e tablet' } },
    ],
    copy: {
      en: {
        subtitle: 'A narrative digital experience for a multidisciplinary dental practice.',
        summary: 'A website prototype combining a cinematic opening, a shared service layout, illustrative 3D aligners and a guided booking demo.',
        description: 'The project presentation introduces a website for Studio di Odontoiatria Macaluso in Milan. A city-to-practice opening leads into the team and services, while an illustrative 3D aligner model gives the treatment section a tangible, scroll-driven language. Desktop and mobile share the same visual identity and a guided path towards contact. The project is in development: the booking flow is a demonstration, with calendar integration and content confirmation still to complete.',
        role: 'UX/UI design and website development, including scroll animation and the 3D experience.',
        deliverables: ['Responsive interface', 'Cinematic opening and parallax', 'Illustrative 3D aligner experience', 'Four-step booking demo'],
        sections: [
          { title: 'From place to people', body: 'The opening connects Milan to the physical practice before introducing the team and care pathways. A consistent grid and tone link the practice presentation to the different services.' },
          { title: 'A clear prototype scope', body: 'The 3D model and comparison are illustrative, rather than a patient simulation or a clinical result. The booking demonstration does not send data or confirm appointments; the connection to the practice calendar is a later integration.' },
        ],
        links: [],
      },
      it: {
        subtitle: 'Un’esperienza digitale narrativa per uno studio odontoiatrico multidisciplinare.',
        summary: 'Una bozza di sito che unisce apertura cinematografica, una griglia comune per i servizi, allineatori 3D illustrativi e una demo di prenotazione guidata.',
        description: 'La presentazione introduce un sito per lo Studio di Odontoiatria Macaluso di Milano. Un’apertura dalla città alla sede accompagna la scoperta del team e dei servizi, mentre un modello 3D illustrativo degli allineatori rende la sezione dedicata al trattamento più concreta e interattiva attraverso lo scroll. Desktop e mobile condividono identità visiva e percorso verso il contatto. Il progetto è in sviluppo: la prenotazione è dimostrativa, con integrazione dell’agenda e conferma dei contenuti ancora da completare.',
        role: 'Design UX/UI e sviluppo del sito, incluse animazioni legate allo scroll ed esperienza 3D.',
        deliverables: ['Interfaccia responsive', 'Apertura cinematografica e parallax', 'Esperienza illustrativa degli allineatori 3D', 'Demo di prenotazione in quattro passaggi'],
        sections: [
          { title: 'Dal luogo alle persone', body: 'L’apertura collega Milano alla sede reale, prima di presentare il team e i percorsi di cura. Una griglia e una voce comuni uniscono la presentazione dello studio alle diverse specialità.' },
          { title: 'Il perimetro della bozza', body: 'Modello 3D e confronto sono illustrativi: non rappresentano una simulazione personalizzata o un risultato clinico. La demo di prenotazione non invia dati e non conferma appuntamenti; il collegamento all’agenda dello studio è un’integrazione successiva.' },
        ],
        links: [],
      },
    },
  },
  {
    id: 'pop',
    title: 'POP — People of Pizza',
    category: 'creative-direction',
    client: 'POP — People of Pizza by Gino Sorbillo',
    featured: true,
    slug: 'pop',
    agency: 'Vidmotion',
    cover: '/images/projects/logos/pop.png',
    preview: { background: '#DA0613', logoWidth: 42, logoHeight: 32 },
    images: [
      {
        src: '/images/projects/pop/pop-desktop-home.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Website — desktop',
          it: 'Sito — desktop',
        },
      },
      {
        src: '/images/projects/pop/pop-mobile-home.webp',
        width: 780,
        height: 1688,
        caption: {
          en: 'Website — mobile',
          it: 'Sito — mobile',
        },
      },
    ],
    tags: ['UX/UI', 'Front-end', 'Back-end', 'Branding contribution', 'Photo & video content'],
    copy: {
      en: {
        description:
          'POP — People of Pizza by Gino Sorbillo brings pizza into an accessible, everyday format. Working within Vidmotion’s wider brand project, I designed the website’s UX/UI and developed its front-end and back-end. I also contributed to the creative direction of the branding and developed photo and video content for marketing. The project brings together three parts of my practice: interpreting a brand’s character, turning it into a usable digital experience and creating the content that supports its communication. My contribution connects the website and visual production within the broader identity developed by the agency team.',
        subtitle: 'A brand brought into digital and visual content.',
        role: 'UX/UI design, front-end and back-end development; contribution to branding creative direction; marketing photo and video content.',
        deliverables: [
          'Website design and development',
          'Branding direction contribution',
          'Photo and video marketing content',
        ],
        summary:
          'Website UX/UI and development, branding direction contributions, and photo and video marketing content for POP by Gino Sorbillo.',
        sections: [],
        links: [
          {
            label: 'Visit website',
            href: 'https://peopleofpizza.it/',
          },
        ],
      },
      it: {
        description:
          'POP — People of Pizza by Gino Sorbillo porta la pizza in un format accessibile e quotidiano. All’interno del progetto di brand di Vidmotion ho progettato la UX/UI del sito e sviluppato front-end e back-end. Ho inoltre contribuito alla direzione creativa del branding e sviluppato contenuti foto e video per il marketing. Il lavoro collega tre aspetti della mia pratica: interpretare il carattere di un brand, tradurlo in un’esperienza digitale utilizzabile e creare i contenuti che ne sostengono la comunicazione. Il mio contributo mette in relazione sito e produzione visiva all’interno dell’identità sviluppata dal team di agenzia.',
        subtitle: 'Un brand portato nel digitale e nei contenuti visivi.',
        role: 'Design UX/UI, sviluppo front-end e back-end; contributo alla direzione creativa del branding; contenuti foto e video per il marketing.',
        deliverables: [
          'Design e sviluppo del sito',
          'Contributo alla direzione del branding',
          'Contenuti marketing foto e video',
        ],
        summary:
          'UX/UI e sviluppo del sito, contributo alla direzione del branding e contenuti foto e video per POP by Gino Sorbillo.',
        sections: [],
        links: [
          {
            label: 'Visita il sito',
            href: 'https://peopleofpizza.it/',
          },
        ],
      },
    },
  },
  {
    id: 'temakinho',
    title: 'Temakinho',
    category: 'creative-direction',
    client: 'Temakinho',
    featured: true,
    slug: 'temakinho',
    agency: 'Vidmotion',
    cover: '/images/projects/logos/temakinho.png',
    preview: { background: '#9E3910', logoWidth: 42, logoHeight: 32 },
    images: [
      {
        src: '/images/projects/temakinho/homepage-design.webp',
        width: 1600,
        height: 3783,
        caption: {
          en: 'Homepage · design export',
          it: 'Homepage · tavola di design',
        },
      },
      {
        src: '/images/projects/temakinho/rimini-design.webp',
        width: 1600,
        height: 1050,
        caption: {
          en: 'Rimini · restaurant page design',
          it: 'Rimini · design della pagina ristorante',
        },
      },
    ],
    tags: ['UX/UI', 'Front-end', 'Back-end', 'Rebranding contribution'],
    copy: {
      en: {
        description:
          'For Temakinho, I designed and developed the website as part of the brand’s wider renewal with Vidmotion. My role covered UX/UI, front-end and back-end development, alongside a contribution to the creative direction of the rebranding. The work connects the brand’s visual character with the way people encounter it online, carrying creative decisions through to a functioning website. It is a project where I worked across design, code and collaboration with the agency’s creative team. The wider rebranding campaign received the 2025 Retail Award for Best Marketing Campaign; my contribution was to its digital experience and creative development.',
        subtitle: 'A renewed brand, translated into its website.',
        role: 'UX/UI design, front-end and back-end development; contribution to rebranding creative direction.',
        deliverables: [
          'Website UX/UI and development',
          'Creative collaboration on the rebranding',
          'Digital translation of the renewed identity',
        ],
        summary:
          'Website UX/UI and full-stack development, with a contribution to the creative direction of Temakinho’s rebranding.',
        sections: [],
        links: [
          {
            label: 'Visit website',
            href: 'https://www.temakinho.com/',
          },
        ],
      },
      it: {
        description:
          'Per Temakinho ho progettato e sviluppato il sito all’interno del percorso di rinnovamento del brand con Vidmotion. Il mio ruolo comprende UX/UI, sviluppo front-end e back-end e un contributo alla direzione creativa del rebranding. Il lavoro collega il carattere visivo del brand al modo in cui le persone lo incontrano online, portando le scelte creative fino alla realizzazione del sito. È un progetto in cui ho lavorato tra design, codice e collaborazione con il team creativo dell’agenzia. La campagna complessiva di rebranding ha ricevuto il Retail Award 2025 come Best Marketing Campaign; il mio contributo riguarda l’esperienza digitale e lo sviluppo creativo.',
        subtitle: 'Un brand rinnovato, tradotto nel suo sito.',
        role: 'Design UX/UI, sviluppo front-end e back-end; contributo alla direzione creativa del rebranding.',
        deliverables: [
          'UX/UI e sviluppo del sito',
          'Collaborazione creativa al rebranding',
          'Traduzione digitale dell’identità rinnovata',
        ],
        summary:
          'UX/UI e sviluppo completo del sito, con un contributo alla direzione creativa del rebranding di Temakinho.',
        sections: [],
        links: [
          {
            label: 'Visita il sito',
            href: 'https://www.temakinho.com/',
          },
        ],
      },
    },
  },
  {
    id: 'takecare',
    title: 'TakeCare',
    category: 'digital',
    client: 'TakeCare',
    featured: true,
    slug: 'takecare',
    cover: '/images/projects/logos/takecare.png',
    preview: { background: '#6E8431', tone: 'white', logoWidth: 30, logoHeight: 34 },
    images: [
      {
        src: '/images/projects/takecare/takecare-desktop-home.webp',
        width: 1600,
        height: 1067,
        caption: {
          en: 'Marketing website — desktop',
          it: 'Sito marketing — desktop',
        },
      },
      {
        src: '/images/projects/takecare/takecare-mobile-home.webp',
        width: 780,
        height: 1688,
        caption: {
          en: 'Marketing website — mobile',
          it: 'Sito marketing — mobile',
        },
      },
    ],
    tags: ['Product design', 'UX/UI', 'Design system', 'Website development'],
    copy: {
      en: {
        description:
          'TakeCare connects beauty clients, salons and professionals through a booking and service platform. I led the UX/UI design, developing user flows, wireframes, high-fidelity interfaces and a component library in Figma. I collaborated with the development team on the app’s implementation, and designed and built the marketing website and launch presentation. The project spans both the experience of using the service and the way it is introduced to its audience. My role brings product structure, interface consistency and communication together, with the design system providing a shared reference for the team developing the app.',
        subtitle: 'From a beauty service to a product experience.',
        role: 'UX/UI lead, user flows, wireframes and Figma design system; app implementation collaboration; marketing website design and development; launch presentation.',
        deliverables: [
          'User flows, wireframes and high-fidelity UI',
          'Figma component library and design system',
          'Marketing website and launch presentation',
        ],
        summary:
          'UX/UI leadership, user flows and a Figma design system for a beauty platform, alongside its marketing website and launch presentation.',
        sections: [
          {
            title: 'One service, several journeys',
            body: 'The service brings different needs into the same product: discovering a professional, booking an appointment and managing a salon’s activity. My design work focuses on the flows and interfaces that organise this experience.',
          },
          {
            title: 'A shared design language',
            body: 'The Figma component library connects the high-fidelity screens to a reusable design system. Alongside the product work, the marketing website and presentation explain the service to its audience and support its launch.',
          },
        ],
        links: [
          {
            label: 'Visit website',
            href: 'https://takecareproject.it/',
          },
        ],
      },
      it: {
        description:
          'TakeCare collega clienti, saloni e professionisti del beauty attraverso una piattaforma di prenotazione e servizi. Ho guidato il design UX/UI, sviluppando flussi utente, wireframe, interfacce ad alta fedeltà e una libreria di componenti in Figma. Ho collaborato con il team di sviluppo all’implementazione dell’app e progettato e realizzato il sito marketing e la presentazione di lancio. Il lavoro comprende sia l’esperienza d’uso del servizio sia il modo in cui viene presentato al pubblico. Il mio ruolo mette in relazione struttura di prodotto, coerenza dell’interfaccia e comunicazione, con il design system come riferimento condiviso per il team che sviluppa l’app.',
        subtitle: 'Da un servizio beauty a un’esperienza di prodotto.',
        role: 'Responsabile UX/UI, flussi utente, wireframe e design system Figma; collaborazione all’implementazione dell’app; design e sviluppo del sito marketing; presentazione di lancio.',
        deliverables: [
          'Flussi utente, wireframe e UI ad alta fedeltà',
          'Libreria di componenti e design system Figma',
          'Sito marketing e presentazione di lancio',
        ],
        summary:
          'UX/UI, flussi utente e design system Figma per una piattaforma beauty, insieme al sito marketing e alla presentazione di lancio.',
        sections: [
          {
            title: 'Un servizio, diversi percorsi',
            body: 'Il servizio riunisce esigenze diverse nello stesso prodotto: trovare un professionista, prenotare un appuntamento e gestire l’attività di un salone. Il mio lavoro di design riguarda i flussi e le interfacce che organizzano questa esperienza.',
          },
          {
            title: 'Un linguaggio di design condiviso',
            body: 'La libreria di componenti Figma collega le schermate ad alta fedeltà a un design system riutilizzabile. Accanto al lavoro di prodotto, sito marketing e presentazione raccontano il servizio al pubblico e ne accompagnano il lancio.',
          },
        ],
        links: [
          {
            label: 'Visita il sito',
            href: 'https://takecareproject.it/',
          },
        ],
      },
    },
  },
  {
    id: 'zendra',
    title: 'Zendra Systems',
    category: 'digital',
    client: 'Zendra Systems',
    featured: true,
    slug: 'zendra',
    agency: 'Vidmotion',
    cover: '/images/projects/logos/zendra.png',
    preview: { background: '#111111', logoWidth: 42, logoHeight: 30 },
    images: [],
    tags: ['UX/UI', 'Front-end', 'Back-end', 'Corporate website'],
    copy: {
      en: {
        description:
          'Zendra Systems is an automotive braking systems company whose new brand identity was developed by Vidmotion. I designed the website’s UX/UI and developed its front-end and back-end, translating the agency’s identity into a digital experience for an industrial audience. The project combines corporate presentation with product and engineering information, requiring a clear relationship between visual character and content hierarchy. My responsibility was the website: its interface and implementation. It shows how I bring a brand system into digital work while responding to the communication needs of a technical business.',
        subtitle: 'An industrial identity, built for the web.',
        role: 'UX/UI design and front-end and back-end website development.',
        deliverables: [
          'Corporate website UX/UI',
          'Front-end and back-end implementation',
          'Digital application of the agency’s brand identity',
        ],
        summary:
          'Website UX/UI and front-end and back-end development for an automotive braking systems company.',
        sections: [],
        links: [
          {
            label: 'Visit website',
            href: 'https://zendrasystems.com/',
          },
        ],
      },
      it: {
        description:
          'Zendra Systems è un’azienda di sistemi frenanti automotive la cui nuova identità di brand è stata sviluppata da Vidmotion. Ho progettato la UX/UI del sito e sviluppato front-end e back-end, traducendo l’identità dell’agenzia in un’esperienza digitale per un pubblico industriale. Il progetto combina presentazione corporate e informazioni su prodotti e competenze ingegneristiche, richiedendo un rapporto chiaro tra carattere visivo e gerarchia dei contenuti. La mia responsabilità riguarda il sito: interfaccia e implementazione. Il lavoro mostra come porto un sistema di brand nel digitale, rispondendo alle esigenze comunicative di un’azienda tecnica.',
        subtitle: 'Un’identità industriale, costruita per il web.',
        role: 'Design UX/UI e sviluppo front-end e back-end del sito.',
        deliverables: [
          'UX/UI del sito corporate',
          'Implementazione front-end e back-end',
          'Applicazione digitale dell’identità di agenzia',
        ],
        summary:
          'UX/UI e sviluppo front-end e back-end del sito di un’azienda di sistemi frenanti automotive.',
        sections: [],
        links: [
          {
            label: 'Visita il sito',
            href: 'https://zendrasystems.com/',
          },
        ],
      },
    },
  },
  {
    id: 'riri2k',
    title: 'Riri2k',
    category: 'creative-direction',
    client: 'Riri2k',
    featured: true,
    slug: 'riri2k',
    cover: '/images/projects/riri2k/bling-bling.webp',
    mediaLayout: 'editorial',
    images: [
      {
        src: '/images/projects/riri2k/bling-6.webp',
        width: 2400,
        height: 1600,
        caption: {
          en: 'BLING BLING · artist photography',
          it: 'BLING BLING · fotografia dell’artista',
        },
      },
      {
        src: '/images/projects/riri2k/bling-1.webp',
        width: 2400,
        height: 3600,
        caption: {
          en: 'BLING BLING · styling and close-up',
          it: 'BLING BLING · styling e dettaglio',
        },
      },
      {
        src: '/images/projects/riri2k/bling-2.webp',
        width: 2400,
        height: 3600,
        caption: {
          en: 'BLING BLING · promotional portrait',
          it: 'BLING BLING · ritratto promozionale',
        },
      },
      {
        src: '/images/projects/riri2k/bling-4.webp',
        width: 2400,
        height: 3600,
        caption: {
          en: 'BLING BLING · photographic series',
          it: 'BLING BLING · serie fotografica',
        },
      },
      {
        src: '/images/projects/riri2k/bling-5.webp',
        width: 2400,
        height: 1601,
        caption: {
          en: 'BLING BLING · visual identity',
          it: 'BLING BLING · identità visiva',
        },
      },
    ],
    tags: ['Artist communication', 'Photo & video content', 'Music marketing'],
    copy: {
      en: {
        description:
          'For Riri2k, I work on creative development and photo and video content that supports the artist’s public identity and music communication. The aim is to connect the visual world of the artist with the people discovering the music, using content to support social visibility and listener growth on Spotify. My contribution combines creative ideas with visual production for the artist’s marketing.',
        subtitle: 'Visual content around an artist’s identity.',
        role: 'Creative development and photo and video marketing content.',
        deliverables: [
          'Creative development for artist communication',
          'Photo and video marketing content',
          'Content aimed at social visibility and music discovery',
        ],
        summary:
          'Creative development and photo and video marketing content, with the goal of growing the artist’s social audience and Spotify listeners.',
        sections: [],
        links: [
          {
            label: 'Artist profile',
            href: 'https://www.instagram.com/riri2k_/',
          },
        ],
      },
      it: {
        description:
          'Per Riri2k lavoro allo sviluppo creativo e ai contenuti foto e video che sostengono l’identità pubblica dell’artista e la comunicazione musicale. L’obiettivo è collegare il suo universo visivo alle persone che scoprono la musica, usando i contenuti per supportare la visibilità social e la crescita degli ascoltatori su Spotify. Il mio contributo unisce idee creative e produzione visiva per il marketing dell’artista.',
        subtitle: 'Contenuti visivi intorno all’identità di un artista.',
        role: 'Sviluppo creativo e contenuti marketing foto e video.',
        deliverables: [
          'Sviluppo creativo per la comunicazione dell’artista',
          'Contenuti marketing foto e video',
          'Contenuti orientati alla visibilità social e alla scoperta musicale',
        ],
        summary:
          'Sviluppo creativo e contenuti marketing foto e video, con l’obiettivo di ampliare il pubblico social e gli ascoltatori Spotify dell’artista.',
        sections: [],
        links: [
          {
            label: 'Profilo dell’artista',
            href: 'https://www.instagram.com/riri2k_/',
          },
        ],
      },
    },
  },
  {
    id: 'admiral',
    title: 'Admiral',
    category: 'film-making',
    client: 'Admiral',
    featured: false,
    slug: 'admiral',
    agency: 'Vidmotion',
    cover: '/images/projects/logos/admiral.png',
    preview: { background: '#DB0032', logoWidth: 48, logoHeight: 30 },
    images: [
      {
        src: '/images/projects/admiral/bonus-en-desktop.webp',
        width: 1440,
        height: 960,
        locale: 'en',
        caption: {
          en: 'Bonus landing page · desktop · English',
          it: 'Landing Bonus · desktop · italiano',
        },
      },
      {
        src: '/images/projects/admiral/bonus-en-mobile.webp',
        width: 780,
        height: 1688,
        locale: 'en',
        caption: {
          en: 'Bonus landing page · mobile · English',
          it: 'Landing Bonus · mobile · italiano',
        },
      },
      {
        src: '/images/projects/admiral/welcomeoffer-en-desktop.webp',
        width: 1440,
        height: 960,
        locale: 'en',
        caption: {
          en: 'Welcome Offer landing page · desktop · English',
          it: 'Landing Welcome Offer · desktop · italiano',
        },
      },
      {
        src: '/images/projects/admiral/welcomeoffer-en-mobile.webp',
        width: 780,
        height: 1688,
        locale: 'en',
        caption: {
          en: 'Welcome Offer landing page · mobile · English',
          it: 'Landing Welcome Offer · mobile · italiano',
        },
      },
      {
        src: '/images/projects/admiral/bonus-it-desktop.webp',
        width: 1440,
        height: 960,
        locale: 'it',
        caption: {
          en: 'Bonus landing page · desktop · English',
          it: 'Landing Bonus · desktop · italiano',
        },
      },
      {
        src: '/images/projects/admiral/bonus-it-mobile.webp',
        width: 780,
        height: 1688,
        locale: 'it',
        caption: {
          en: 'Bonus landing page · mobile · English',
          it: 'Landing Bonus · mobile · italiano',
        },
      },
      {
        src: '/images/projects/admiral/welcomeoffer-it-desktop.webp',
        width: 1440,
        height: 960,
        locale: 'it',
        caption: {
          en: 'Welcome Offer landing page · desktop · English',
          it: 'Landing Welcome Offer · desktop · italiano',
        },
      },
      {
        src: '/images/projects/admiral/welcomeoffer-it-mobile.webp',
        width: 780,
        height: 1688,
        locale: 'it',
        caption: {
          en: 'Welcome Offer landing page · mobile · English',
          it: 'Landing Welcome Offer · mobile · italiano',
        },
      },
    ],
    tags: [
      'Landing page design',
      'Web development',
      'Creative support',
      'Direction assistance',
      'Set support',
    ],
    copy: {
      en: {
        description:
          'My work for Admiral connects the digital side of advertising with television production. I designed and developed landing pages, and contributed creative support, direction assistance and on-set support for a commercial. Within the wider production team, my contribution spans the interfaces people encounter online and the practical work involved in bringing a campaign to screen.',
        subtitle: 'From campaign landing pages to the production set.',
        role: 'Landing page design and development; creative support, direction assistance and on-set support.',
        deliverables: [
          'Campaign landing pages',
          'Creative production support',
          'Direction assistance and set support',
        ],
        summary:
          'Landing page design and development, plus creative support, direction assistance and on-set support for a television commercial.',
        sections: [],
        links: [
          { label: 'Bonus landing page', href: 'https://bonus.admiral.ch/en/' },
          { label: 'Welcome Offer landing page', href: 'https://welcomeoffer.admiral.ch/en/' },
        ],
      },
      it: {
        description:
          'Il mio lavoro per Admiral collega il lato digitale dell’advertising alla produzione televisiva. Ho progettato e sviluppato landing page e contribuito con supporto creativo, aiuto regia e supporto sul set per uno spot. All’interno del team di produzione, il mio contributo comprende sia le interfacce che le persone incontrano online sia il lavoro operativo necessario per portare una campagna sullo schermo.',
        subtitle: 'Dalle landing di campagna al set di produzione.',
        role: 'Design e sviluppo di landing page; supporto creativo, aiuto regia e supporto sul set.',
        deliverables: [
          'Landing page di campagna',
          'Supporto creativo alla produzione',
          'Aiuto regia e supporto sul set',
        ],
        summary:
          'Design e sviluppo di landing page, insieme a supporto creativo, aiuto regia e supporto sul set per uno spot televisivo.',
        sections: [],
        links: [
          { label: 'Landing Bonus', href: 'https://bonus.admiral.ch/it/' },
          { label: 'Landing Welcome Offer', href: 'https://welcomeoffer.admiral.ch/it/' },
        ],
      },
    },
  },
  {
    id: 'penny',
    title: 'Penny',
    category: 'film-making',
    client: 'Penny',
    featured: false,
    slug: 'penny',
    agency: 'Vidmotion',
    cover: '/images/projects/logos/penny.png',
    preview: { background: '#CD1316', logoWidth: 40, logoHeight: 30 },
    images: [],
    tags: [
      'Landing page design',
      'Web development',
      'Creative support',
      'Direction assistance',
      'Set support',
    ],
    copy: {
      en: {
        description:
          'For Penny, I combined landing page design and development with creative and practical support for a television commercial. My involvement included creative support, direction assistance and work on set. The project shows how my digital background sits alongside production work: designing a campaign’s web experience and contributing to the team making its audiovisual communication.',
        subtitle: 'Digital design and support for a television production.',
        role: 'Landing page design and development; creative support, direction assistance and on-set support.',
        deliverables: [
          'Landing page design and development',
          'Creative support for the commercial',
          'Direction assistance and set support',
        ],
        summary:
          'Landing page design and development, with creative support, direction assistance and on-set support for Penny’s commercial.',
        sections: [],
        links: [],
      },
      it: {
        description:
          'Per Penny ho affiancato design e sviluppo di landing page al supporto creativo e operativo per uno spot televisivo. Il mio coinvolgimento comprende supporto creativo, aiuto regia e lavoro sul set. Il progetto mostra come il mio background digitale si affianchi alla produzione: progettare l’esperienza web di una campagna e contribuire al team che ne realizza la comunicazione audiovisiva.',
        subtitle: 'Design digitale e supporto a una produzione televisiva.',
        role: 'Design e sviluppo di landing page; supporto creativo, aiuto regia e supporto sul set.',
        deliverables: [
          'Design e sviluppo di landing page',
          'Supporto creativo allo spot',
          'Aiuto regia e supporto sul set',
        ],
        summary:
          'Design e sviluppo di landing page, con supporto creativo, aiuto regia e supporto sul set per lo spot Penny.',
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'carla-hero',
    mediaLayout: 'editorial',
    title: 'Carla Hero',
    category: 'creative-direction',
    client: 'Carla Hero',
    featured: false,
    slug: 'carla-hero',
    cover: '/images/projects/carla-hero/cover.webp',
    videos: [
      {
        src: '/images/projects/carla-hero/video-preview.mp4',
        poster: '/images/projects/carla-hero/video-poster.webp',
        width: 1920,
        height: 1080,
        caption: {
          en: 'Carla Hero · animated title study',
          it: 'Carla Hero · studio del titolo animato',
        },
      },
    ],
    images: [
      {
        src: '/images/projects/carla-hero/cover.webp',
        width: 1080,
        height: 1080,
        caption: {
          en: 'Carla Hero · cover artwork',
          it: 'Carla Hero · artwork di copertina',
        },
      },
      {
        src: '/images/projects/carla-hero/amorosa.webp',
        width: 2000,
        height: 2000,
        caption: {
          en: 'Amorosa · cover artwork',
          it: 'Amorosa · artwork di copertina',
        },
      },
    ],
    tags: ['Artist communication', 'Photo & video content', 'Music marketing'],
    copy: {
      en: {
        description:
          'For Carla Hero, I develop creative ideas and photo and video marketing content around the artist’s public identity. The work supports the way the music is presented and discovered, with the goal of expanding the social audience and increasing Spotify listeners. My contribution brings visual production into the artist’s communication, connecting personality, performance and musical context.',
        subtitle: 'An artist’s voice, extended through visual content.',
        role: 'Creative development and photo and video marketing content.',
        deliverables: [
          'Creative development for artist communication',
          'Photo and video marketing content',
          'Visual material supporting music discovery',
        ],
        summary:
          'Creative development and photo and video marketing content supporting the artist’s identity, social visibility and music discovery.',
        sections: [],
        links: [
          {
            label: 'Artist profile',
            href: 'https://www.instagram.com/carlahero__/',
          },
        ],
      },
      it: {
        description:
          'Per Carla Hero sviluppo idee creative e contenuti marketing foto e video intorno all’identità pubblica dell’artista. Il lavoro sostiene il modo in cui la musica viene presentata e scoperta, con l’obiettivo di ampliare il pubblico social e aumentare gli ascoltatori su Spotify. Il mio contributo porta la produzione visiva nella comunicazione dell’artista, collegando personalità, performance e contesto musicale.',
        subtitle: 'La voce di un’artista, estesa attraverso i contenuti visivi.',
        role: 'Sviluppo creativo e contenuti marketing foto e video.',
        deliverables: [
          'Sviluppo creativo per la comunicazione dell’artista',
          'Contenuti marketing foto e video',
          'Materiali visivi per la scoperta musicale',
        ],
        summary:
          'Sviluppo creativo e contenuti marketing foto e video per l’identità dell’artista, la visibilità social e la scoperta della musica.',
        sections: [],
        links: [
          {
            label: 'Profilo dell’artista',
            href: 'https://www.instagram.com/carlahero__/',
          },
        ],
      },
    },
  },
  {
    id: 'ristora',
    title: 'Ristora',
    category: 'film-making',
    client: 'Ristora',
    featured: false,
    slug: 'ristora',
    cover: '/images/projects/logos/ristora.png',
    preview: { background: '#E30613', tone: 'white', logoWidth: 40, logoHeight: 30 },
    images: [],
    tags: ['Set support', 'TV production'],
    copy: {
      en: {
        description:
          'I supported the team on set during the production of a television commercial for Ristora. This credit documents my involvement in the practical work of an advertising production, alongside the creative and technical professionals responsible for the film.',
        subtitle: 'On-set support for a television commercial.',
        role: 'On-set support.',
        deliverables: ['On-set production support'],
        summary:
          'On-set support as part of the team producing a television commercial for Ristora.',
        sections: [],
        links: [],
      },
      it: {
        description:
          'Ho supportato il team sul set durante la produzione di uno spot televisivo Ristora. Questo credito documenta il mio coinvolgimento nel lavoro operativo di una produzione pubblicitaria, accanto ai professionisti creativi e tecnici responsabili del film.',
        subtitle: 'Supporto sul set per uno spot televisivo.',
        role: 'Supporto sul set.',
        deliverables: ['Supporto operativo sul set'],
        summary:
          'Supporto sul set all’interno del team di produzione di uno spot televisivo Ristora.',
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'hollywood-milano',
    title: 'Hollywood Milano',
    category: 'digital',
    client: 'Hollywood Milano',
    agency: 'Vidmotion',
    featured: false,
    slug: 'hollywood-milano',
    cover: '/images/projects/logos/hollywood-milano.png',
    preview: { background: '#ff5ecc', tone: 'black', logoWidth: 44, logoHeight: 30 },
    images: [],
    tags: ['UX/UI', 'Web development', 'Marketing content', 'Video content', 'Hospitality'],
    copy: {
      en: {
        description:
          'For Hollywood Milano, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        subtitle: 'Hospitality, music and nightlife.',
        summary:
          'For Hollywood Milano, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        role: 'UX/UI, web development, marketing and video content.',
        deliverables: ['Website UX/UI and development', 'Marketing content', 'Video content'],
        sections: [],
        links: [{ label: 'Visit website', href: 'https://hollywoodmilano.com/' }],
      },
      it: {
        description:
          'Per Hollywood Milano ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        subtitle: 'Hospitality, musica e nightlife.',
        summary:
          'Per Hollywood Milano ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        role: 'UX/UI, sviluppo web, contenuti marketing e video.',
        deliverables: ['UX/UI e sviluppo del sito', 'Contenuti marketing', 'Contenuti video'],
        sections: [],
        links: [{ label: 'Visita il sito', href: 'https://hollywoodmilano.com/' }],
      },
    },
  },
  {
    id: 'loolapaloosa',
    title: 'Loolapaloosa',
    category: 'digital',
    client: 'Loolapaloosa',
    agency: 'Vidmotion',
    featured: false,
    slug: 'loolapaloosa',
    cover: '/images/projects/logos/loolapaloosa.png',
    preview: { background: '#ffff00', tone: 'black', logoWidth: 44, logoHeight: 30 },
    images: [],
    tags: ['UX/UI', 'Web development', 'Marketing content', 'Video content', 'Hospitality'],
    copy: {
      en: {
        description:
          'For Loolapaloosa, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        subtitle: 'Hospitality, music and nightlife.',
        summary:
          'For Loolapaloosa, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        role: 'UX/UI, web development, marketing and video content.',
        deliverables: ['Website UX/UI and development', 'Marketing content', 'Video content'],
        sections: [],
        links: [{ label: 'Visit website', href: 'https://loolapaloosamilano.com/' }],
      },
      it: {
        description:
          'Per Loolapaloosa ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        subtitle: 'Hospitality, musica e nightlife.',
        summary:
          'Per Loolapaloosa ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        role: 'UX/UI, sviluppo web, contenuti marketing e video.',
        deliverables: ['UX/UI e sviluppo del sito', 'Contenuti marketing', 'Contenuti video'],
        sections: [],
        links: [{ label: 'Visita il sito', href: 'https://loolapaloosamilano.com/' }],
      },
    },
  },
  {
    id: 'nomad',
    title: 'Nomad Milano',
    category: 'digital',
    client: 'Nomad Milano',
    agency: 'Vidmotion',
    featured: false,
    slug: 'nomad',
    cover: '/images/projects/logos/nomad.png',
    preview: { background: '#3e2e15', tone: 'original', logoWidth: 44, logoHeight: 30 },
    images: [],
    tags: ['UX/UI', 'Web development', 'Marketing content', 'Video content', 'Hospitality'],
    copy: {
      en: {
        description:
          'For Nomad Milano, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        subtitle: 'Hospitality, music and nightlife.',
        summary:
          'For Nomad Milano, I worked on UX/UI and website development, alongside marketing and video content. My contribution connects the digital experience with the material used to communicate the venue’s identity, atmosphere and events.',
        role: 'UX/UI, web development, marketing and video content.',
        deliverables: ['Website UX/UI and development', 'Marketing content', 'Video content'],
        sections: [],
        links: [],
      },
      it: {
        description:
          'Per Nomad Milano ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        subtitle: 'Hospitality, musica e nightlife.',
        summary:
          'Per Nomad Milano ho lavorato su UX/UI e sviluppo del sito, insieme a contenuti marketing e video. Il mio contributo collega l’esperienza digitale ai materiali utilizzati per comunicare identità, atmosfera ed eventi del locale.',
        role: 'UX/UI, sviluppo web, contenuti marketing e video.',
        deliverables: ['UX/UI e sviluppo del sito', 'Contenuti marketing', 'Contenuti video'],
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'le-scuderie-milano',
    title: 'Le Scuderie Milano',
    category: 'digital',
    client: 'Le Scuderie Milano',
    featured: false,
    slug: 'le-scuderie-milano',
    cover: '/images/projects/logos/le-scuderie-milano.png',
    images: [
      {
        src: '/images/projects/le-scuderie-milano/website-mockup.webp',
        width: 2400,
        height: 1800,
        caption: {
          en: 'Website · device mockup',
          it: 'Sito · mockup di dispositivo',
        },
      },
      {
        src: '/images/projects/le-scuderie-milano/homepage-design.webp',
        width: 2000,
        height: 1328,
        caption: {
          en: 'Homepage · design study',
          it: 'Homepage · studio di design',
        },
      },
    ],
    tags: ['UX/UI design', 'Web development'],
    preview: {
      background: '#f87521',
      logoWidth: 44,
      logoHeight: 30,
    },
    copy: {
      en: {
        description:
          'I worked on UX/UI and website development for Le Scuderie Milano. The design presents an urban destination through its spaces, events and everyday experiences, bringing a place-based identity into a clear digital structure. The selected material shows the homepage design and its presentation in a device mockup.',
        summary:
          'I worked on UX/UI and website development for Le Scuderie Milano. The design presents an urban destination through its spaces, events and everyday experiences, bringing a place-based identity into a clear digital structure. The selected material shows the homepage design and its presentation in a device mockup.',
        subtitle: 'A new urban destination, translated into a digital experience.',
        role: 'UX/UI and web development.',
        deliverables: ['UX/UI design', 'Web development'],
        sections: [],
        links: [],
      },
      it: {
        description:
          'Ho lavorato su UX/UI e sviluppo del sito per Le Scuderie Milano. Il design presenta una destinazione urbana attraverso spazi, eventi ed esperienze quotidiane, portando l’identità di un luogo in una struttura digitale chiara. I materiali selezionati mostrano il design della homepage e la sua presentazione in un mockup di dispositivo.',
        summary:
          'Ho lavorato su UX/UI e sviluppo del sito per Le Scuderie Milano. Il design presenta una destinazione urbana attraverso spazi, eventi ed esperienze quotidiane, portando l’identità di un luogo in una struttura digitale chiara. I materiali selezionati mostrano il design della homepage e la sua presentazione in un mockup di dispositivo.',
        subtitle: 'Una nuova destinazione urbana, tradotta in un’esperienza digitale.',
        role: 'UX/UI e sviluppo web.',
        deliverables: ['Design UX/UI', 'Sviluppo web'],
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'smallfly',
    title: 'SmallFly',
    category: 'digital',
    client: 'SmallFly',
    featured: false,
    slug: 'smallfly',
    cover: '/images/projects/logos/smallfly.png',
    images: [],
    tags: ['Landing page design', 'Web development'],
    preview: {
      background: '#00203b',
      logoWidth: 44,
      logoHeight: 30,
    },
    copy: {
      en: {
        description:
          'I designed and developed a landing page for SmallFly. The work translates the aviation brand’s identity into a focused digital introduction, with attention to content hierarchy, interface clarity and the relationship between visual presentation and navigation.',
        summary:
          'I designed and developed a landing page for SmallFly. The work translates the aviation brand’s identity into a focused digital introduction, with attention to content hierarchy, interface clarity and the relationship between visual presentation and navigation.',
        subtitle: 'A focused digital introduction to an aviation brand.',
        role: 'Landing page design and development.',
        deliverables: ['Landing page design', 'Web development'],
        sections: [],
        links: [],
      },
      it: {
        description:
          'Ho progettato e sviluppato una landing page per SmallFly. Il lavoro traduce l’identità del brand dell’aviazione in una presentazione digitale mirata, con attenzione alla gerarchia dei contenuti, alla chiarezza dell’interfaccia e al rapporto tra presentazione visiva e navigazione.',
        summary:
          'Ho progettato e sviluppato una landing page per SmallFly. Il lavoro traduce l’identità del brand dell’aviazione in una presentazione digitale mirata, con attenzione alla gerarchia dei contenuti, alla chiarezza dell’interfaccia e al rapporto tra presentazione visiva e navigazione.',
        subtitle: 'Una presentazione digitale mirata per un brand dell’aviazione.',
        role: 'Design e sviluppo della landing page.',
        deliverables: ['Design della landing page', 'Sviluppo web'],
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'chef-p',
    title: 'CHEF P',
    category: 'creative-direction',
    client: 'CHEF P',
    featured: false,
    slug: 'chef-p',
    cover: '/images/projects/chef-p/shooting-1.webp',
    images: [
      {
        src: '/images/projects/chef-p/shooting-1.webp',
        width: 2400,
        height: 3598,
        caption: {
          en: 'CHEF P & DJ Dero · 24/7 shoot',
          it: 'CHEF P & DJ Dero · shooting 24/7',
        },
      },
      {
        src: '/images/projects/chef-p/shooting-3.webp',
        width: 2400,
        height: 3598,
        caption: {
          en: 'CHEF P & DJ Dero · promotional photography',
          it: 'CHEF P & DJ Dero · fotografia promozionale',
        },
      },
    ],
    tags: ['Artist photography', 'Promotional shoots'],
    coverPosition: 'center 12%',
    mediaLayout: 'editorial',
    copy: {
      en: {
        description:
          'I have worked with CHEF P on several photographic shoots. This selection includes a shoot with DJ Dero around 24/7, bringing the artists, the release and their visual presence into the same frame. The work focuses on producing strong photographic material for music communication.',
        summary:
          'I have worked with CHEF P on several photographic shoots. This selection includes a shoot with DJ Dero around 24/7, bringing the artists, the release and their visual presence into the same frame. The work focuses on producing strong photographic material for music communication.',
        subtitle: 'Artist photography for music communication.',
        role: 'Artist photography and photographic shoots.',
        deliverables: ['Artist photography', 'Promotional shoots'],
        sections: [],
        links: [],
      },
      it: {
        description:
          'Ho lavorato con CHEF P su diversi shooting fotografici. Questa selezione include il servizio con DJ Dero intorno a 24/7, portando gli artisti, il progetto musicale e la loro presenza visiva nella stessa immagine. Il lavoro si concentra sulla produzione di materiale fotografico forte per la comunicazione musicale.',
        summary:
          'Ho lavorato con CHEF P su diversi shooting fotografici. Questa selezione include il servizio con DJ Dero intorno a 24/7, portando gli artisti, il progetto musicale e la loro presenza visiva nella stessa immagine. Il lavoro si concentra sulla produzione di materiale fotografico forte per la comunicazione musicale.',
        subtitle: 'Fotografia dell’artista per la comunicazione musicale.',
        role: 'Fotografia dell’artista e shooting fotografici.',
        deliverables: ['Fotografia dell’artista', 'Shooting promozionali'],
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'sandro',
    title: 'SANDRO',
    category: 'film-making',
    client: 'SANDRO',
    featured: false,
    slug: 'sandro',
    cover: '/images/projects/sandro/ensemble.webp',
    images: [
      {
        src: '/images/projects/sandro/ensemble.webp',
        width: 2400,
        height: 1800,
        caption: {
          en: 'Video still · ensemble scene',
          it: 'Frame video · scena corale',
        },
      },
      {
        src: '/images/projects/sandro/portrait.webp',
        width: 2400,
        height: 1800,
        caption: {
          en: 'Video still · portrait',
          it: 'Frame video · ritratto',
        },
      },
      {
        src: '/images/projects/sandro/portrait-detail.webp',
        width: 2400,
        height: 1800,
        caption: {
          en: 'Video still · close-up',
          it: 'Frame video · dettaglio del ritratto',
        },
      },
    ],
    tags: ['Creative management', 'Marketing', 'Video direction'],
    status: 'in-progress',
    mediaLayout: 'editorial',
    videos: [
      {
        src: '/images/projects/sandro/video-preview.mp4',
        poster: '/images/projects/sandro/video-poster.webp',
        width: 1440,
        height: 1080,
        caption: {
          en: 'SANDRO · work-in-progress video preview',
          it: 'SANDRO · anteprima video del progetto in sviluppo',
        },
      },
    ],
    copy: {
      en: {
        description:
          'SANDRO is an artist project currently in development. I work across creative management, marketing and video direction, shaping the visual language that accompanies the music. The selection brings together a video preview and stills from the work in progress, showing the direction of the project without presenting it as a finished release.',
        summary:
          'SANDRO is an artist project currently in development. I work across creative management, marketing and video direction, shaping the visual language that accompanies the music. The selection brings together a video preview and stills from the work in progress, showing the direction of the project without presenting it as a finished release.',
        subtitle: 'Creative management and video direction for an artist in development.',
        role: 'Creative management, marketing and video direction.',
        deliverables: ['Creative management', 'Marketing', 'Video direction'],
        sections: [],
        links: [],
      },
      it: {
        description:
          'SANDRO è un progetto artistico attualmente in sviluppo. Mi occupo di gestione creativa, marketing e regia video, costruendo il linguaggio visivo che accompagna la musica. La selezione riunisce un’anteprima video e frame del lavoro in corso, mostrando la direzione del progetto senza presentarlo come una release definitiva.',
        summary:
          'SANDRO è un progetto artistico attualmente in sviluppo. Mi occupo di gestione creativa, marketing e regia video, costruendo il linguaggio visivo che accompagna la musica. La selezione riunisce un’anteprima video e frame del lavoro in corso, mostrando la direzione del progetto senza presentarlo come una release definitiva.',
        subtitle: 'Gestione creativa e regia video per un artista in sviluppo.',
        role: 'Gestione creativa, marketing e regia video.',
        deliverables: ['Gestione creativa', 'Marketing', 'Regia video'],
        sections: [],
        links: [],
      },
    },
  },
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    category: 'digital',
    client: 'Personal project',
    featured: false,
    slug: 'portfolio-os',
    year: 2026,
    cover: '/images/projects/logos/portfolio-os.png',
    preview: { background: '#252529', logoWidth: 44, logoHeight: 30 },
    images: [],
    tags: ['Experience design', 'Interaction design', 'Custom icons', 'AI-assisted development'],
    copy: {
      en: {
        description:
          'Portfolio OS presents my work through three connected experiences inspired by a MacBook, an iPad and an iPhone. I defined the concept and visual direction and created the custom icon artwork. The interface adapts its navigation and interactions to each device while drawing on shared portfolio content. The website was developed iteratively with AI coding tools, combining my design decisions with implementation and testing support. It is a personal exploration of how a familiar digital environment can become a way to discover a creative practice.',
        subtitle: 'One portfolio, three device experiences.',
        role: 'Concept, visual direction, custom icons and design iteration, with AI-assisted development.',
        deliverables: [
          'MacBook, iPad and iPhone-inspired experiences',
          'Custom icon artwork',
          'Shared portfolio content and device-specific interactions',
        ],
        summary:
          'A personal portfolio conceived around MacBook, iPad and iPhone interactions, with shared content and custom-authored icons.',
        sections: [],
        links: [
          {
            label: 'Visit website',
            href: 'https://portfolio.carlodesantis.com/',
          },
        ],
      },
      it: {
        description:
          'Portfolio OS presenta il mio lavoro attraverso tre esperienze connesse ispirate a MacBook, iPad e iPhone. Ho definito concept e direzione visiva e creato le icone autoriali. L’interfaccia adatta navigazione e interazioni a ogni dispositivo, mantenendo contenuti condivisi. Il sito è stato sviluppato in modo iterativo con strumenti di AI coding, unendo le mie decisioni di design al supporto di implementazione e verifica. È un’esplorazione personale di come un ambiente digitale familiare possa diventare un modo per scoprire una pratica creativa.',
        subtitle: 'Un portfolio, tre esperienze di dispositivo.',
        role: 'Concept, direzione visiva, icone autoriali e iterazione del design, con sviluppo assistito dall’AI.',
        deliverables: [
          'Esperienze ispirate a MacBook, iPad e iPhone',
          'Icone autoriali',
          'Contenuti condivisi e interazioni specifiche per dispositivo',
        ],
        summary:
          'Un portfolio personale ispirato alle interazioni di MacBook, iPad e iPhone, con contenuti condivisi e icone autoriali.',
        sections: [],
        links: [
          {
            label: 'Visita il sito',
            href: 'https://portfolio.carlodesantis.com/',
          },
        ],
      },
    },
  },
]
function localize(locale: Locale): Project[] {
  return definitions.map(({ copy, images, videos = [], ...project }) => ({
    ...project,
    ...copy[locale],
    videos: videos.map(({ caption, ...video }) => ({ ...video, caption: caption[locale] })),
    gallery: images
      .filter((image) => !image.locale || image.locale === locale)
      .map(({ caption, src, width, height }) => ({
        src,
        width,
        height,
        caption: caption[locale],
        alt: `${project.title} — ${caption[locale]}`,
      })),
    credits: [
      ...(copy[locale].role ? [{ role: copy[locale].role, name: 'Carlo Desantis' }] : []),
      ...(project.agency
        ? [{ role: locale === 'it' ? 'Agenzia' : 'Agency', name: project.agency }]
        : []),
    ],
  }))
}

const localized: Record<Locale, Project[]> = { en: localize('en'), it: localize('it') }

export function getProjects(locale: Locale = 'en'): Project[] {
  return localized[locale]
}
