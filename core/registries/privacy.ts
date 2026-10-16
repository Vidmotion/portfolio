import type { Locale } from '@/types'

/** Actual processing: Contabo (Germany), Aruba SMTP, local preferences and opt-in Spotify. */
export const privacyUpdated = '2026-10-16'
export const privacyCopy: Record<
  Locale,
  { title: string; intro: string; sections: { title: string; paragraphs: string[] }[] }
> = {
  en: {
    title: 'Privacy & cookies',
    intro:
      'This notice explains how personal data is processed when you visit portfolio.carlodesantis.com or contact Carlo Desantis. It covers the interactive portfolio and its project pages under Regulation (EU) 2016/679 (GDPR).',
    sections: [
      {
        title: '1. Data controller and contact',
        paragraphs: [
          'The controller is Carlo Desantis, Italy. For questions about this notice or to exercise your rights, write to info@carlodesantis.com.',
        ],
      },
      {
        title: '2. Browsing and technical data',
        paragraphs: [
          'Delivering and securing the website involves technical information such as IP address, requested URL, date and time, browser information and response status. Hosting is provided through a Contabo server located in Germany. This processing is based on the controller’s legitimate interest in operating a reliable and secure website (Article 6(1)(f) GDPR). Infrastructure logs are managed with the hosting service for operational and security purposes; access is restricted to authorised personnel and service providers.',
          'The contact endpoint uses a SHA-256 identifier derived from the requesting IP address to limit abuse. This is pseudonymous, not anonymous. It is held in application memory for a 15-minute window; expired entries are cleared on subsequent requests or when the process restarts. The application does not log the contents of messages or SMTP credentials.',
        ],
      },
      {
        title: '3. Contact forms and email',
        paragraphs: [
          'When you submit a proposal, the website processes your name, email address, message, selected opportunity and any organisation, profession, portfolio link, timing or budget information you provide. Required fields are marked in the form. Without them, the form cannot deliver the request; optional details can be omitted.',
          'The purpose is to answer your request and discuss employment, professional services or collaboration. Where the request concerns a potential contract with you, the legal basis is taking steps at your request before entering into a contract (Article 6(1)(b)). Other professional correspondence is handled on the basis of the legitimate interest in responding to enquiries (Article 6(1)(f)). There is no newsletter signup or marketing subscription.',
          'Messages are sent to info@carlodesantis.com through Aruba S.p.A.’s email service. The site does not maintain a separate contact database. Correspondence that does not lead to an engagement is retained for up to 12 months after the conversation closes. If an engagement follows, relevant information may be retained for contract administration, legal obligations or the establishment, exercise or defence of legal claims, for the applicable periods. Avoid including sensitive information that is unnecessary for your proposal.',
        ],
      },
      {
        title: '4. Cookies and storage on your device',
        paragraphs: [
          'The portfolio does not install advertising or audience analytics trackers. It uses localStorage for the functional preferences you choose: appearance, wallpaper selection, dock, window layout and accessibility options (portfolio-os-desktop, portfolio-os-dock, portfolio-os-windows and portfolio-os-settings). These remain in your browser until reset or deleted. Language and navigation state may also be held in memory during the visit.',
          'If you select a personal wallpaper, it is resized and compressed on your device and saved in IndexedDB (portfolio-os-personalization). The wallpaper feature does not upload the image to Carlo or to a server. You can remove it in Appearance settings or clear the site’s browser data. These storage functions provide the customisation you request; they are not used to identify you across websites.',
        ],
      },
      {
        title: '5. Optional Spotify content',
        paragraphs: [
          'Spotify is an optional external service. Its player is blocked until you select “Enable Spotify”. Enabling it allows a connection to Spotify, which receives technical data such as your IP address and browser information and may use cookies or other identifiers under its own policy. The legal basis for activating this optional content is your consent (Article 6(1)(a) GDPR and applicable rules on device storage).',
          'Your choice applies to this visit only and is not saved across reloads. You can withdraw it using “Disable Spotify” in the widget or the privacy controls in Settings; this removes the players and prevents further embedded connections. It does not delete data or cookies already held by Spotify; use your browser settings or Spotify’s controls for those. Refusing the player does not prevent use of the portfolio, and you can instead open Spotify directly through the external link.',
          'Spotify acts under its own privacy policy and may process data outside the EEA using the safeguards described there. Review https://www.spotify.com/legal/privacy-policy/ and https://www.spotify.com/legal/cookies-policy/ before enabling the player.',
        ],
      },
      {
        title: '6. Recipients and external links',
        paragraphs: [
          'Data is accessible to Carlo and, as necessary for their services, authorised hosting and email providers and technical support personnel. Data may also be disclosed to competent authorities where required by law. The website is hosted in Germany; email is handled through Aruba. Carlo does not sell visitor data or send contact messages to generative AI services.',
          'Links to clients, social networks, music platforms and other websites take you to independent services governed by their own notices. A normal external link does not embed their content in the portfolio. The site does not use automated decision-making or profiling to make decisions about visitors.',
        ],
      },
      {
        title: '7. Your rights',
        paragraphs: [
          'Subject to the conditions in the GDPR, you may request access, correction, erasure, restriction of processing and data portability, and object to processing based on legitimate interests. You may withdraw consent at any time without affecting processing before withdrawal. Write to info@carlodesantis.com; reasonable verification of your identity may be needed.',
          'You may lodge a complaint with the Garante per la protezione dei dati personali (https://www.garanteprivacy.it/) or the competent supervisory authority in your country of habitual residence, place of work or place of the alleged infringement.',
        ],
      },
      {
        title: '8. Updates',
        paragraphs: [
          'This notice will be updated if the website’s services or processing change. The revision date is shown below.',
        ],
      },
    ],
  },
  it: {
    title: 'Privacy e cookie',
    intro:
      'Questa informativa descrive il trattamento dei dati personali di chi visita portfolio.carlodesantis.com o contatta Carlo Desantis. Si applica al portfolio interattivo e alle pagine dei progetti ai sensi del Regolamento (UE) 2016/679 (GDPR).',
    sections: [
      {
        title: '1. Titolare e contatti',
        paragraphs: [
          'Il titolare del trattamento è Carlo Desantis, Italia. Per informazioni o per esercitare i tuoi diritti scrivi a info@carlodesantis.com.',
        ],
      },
      {
        title: '2. Dati di navigazione e dati tecnici',
        paragraphs: [
          'Il funzionamento e la sicurezza del sito comportano il trattamento di informazioni tecniche come indirizzo IP, URL richiesto, data e ora, informazioni sul browser ed esito della risposta. Il sito è ospitato su un server Contabo situato in Germania. La base giuridica è il legittimo interesse del titolare a garantire il funzionamento e la sicurezza del sito (art. 6, par. 1, lett. f GDPR). I log infrastrutturali sono gestiti nell’ambito del servizio di hosting per esigenze operative e di sicurezza; l’accesso è limitato a personale e fornitori autorizzati.',
          'Il servizio di contatto usa un identificatore SHA-256 derivato dall’indirizzo IP per limitare gli abusi. È un dato pseudonimizzato, non anonimo. Rimane nella memoria dell’applicazione per una finestra di 15 minuti; le voci scadute vengono eliminate alle richieste successive o al riavvio del processo. L’applicazione non registra nei log il contenuto dei messaggi o le credenziali SMTP.',
        ],
      },
      {
        title: '3. Moduli di contatto ed email',
        paragraphs: [
          'Inviando una proposta, il sito tratta nome, email, messaggio, opportunità selezionata ed eventuali dati su azienda, professione, portfolio, tempistiche o budget che decidi di fornire. I campi obbligatori sono indicati nel modulo: senza questi non è possibile inviare la richiesta. I dati facoltativi possono essere omessi.',
          'La finalità è rispondere alla richiesta e valutare opportunità lavorative, servizi professionali o collaborazioni. Se la richiesta riguarda un possibile contratto con te, la base giuridica è l’esecuzione di misure precontrattuali adottate su tua richiesta (art. 6, par. 1, lett. b). La restante corrispondenza professionale si basa sul legittimo interesse a rispondere ai contatti ricevuti (art. 6, par. 1, lett. f). Non viene attivata alcuna newsletter o iscrizione a comunicazioni promozionali.',
          'I messaggi vengono recapitati a info@carlodesantis.com tramite il servizio email di Aruba S.p.A. Il sito non mantiene una banca dati separata dei contatti. Le conversazioni che non portano a un incarico vengono conservate fino a 12 mesi dalla loro chiusura. Se segue un rapporto professionale, i dati pertinenti possono essere conservati per gestire il contratto, adempiere obblighi di legge o accertare, esercitare o difendere un diritto, per i periodi applicabili. Non inserire informazioni sensibili non necessarie alla proposta.',
        ],
      },
      {
        title: '4. Cookie e memoria del dispositivo',
        paragraphs: [
          'Il portfolio non installa strumenti pubblicitari o di analisi del pubblico. Usa localStorage per le preferenze funzionali scelte: aspetto, sfondo, dock, disposizione delle finestre e accessibilità (portfolio-os-desktop, portfolio-os-dock, portfolio-os-windows e portfolio-os-settings). Restano nel browser fino al ripristino o alla cancellazione. Lingua e navigazione possono inoltre essere mantenute in memoria durante la visita.',
          'Se scegli uno sfondo personale, l’immagine viene ridimensionata e compressa sul tuo dispositivo e salvata in IndexedDB (portfolio-os-personalization). Questa funzione non invia l’immagine a Carlo o a un server. Puoi rimuoverla dalle impostazioni Aspetto o cancellare i dati del sito nel browser. Queste memorie consentono la personalizzazione che richiedi e non servono a riconoscerti su siti diversi.',
        ],
      },
      {
        title: '5. Contenuti Spotify facoltativi',
        paragraphs: [
          'Spotify è un servizio esterno facoltativo. Il player è bloccato finché non scegli “Abilita Spotify”. Attivandolo consenti una connessione a Spotify, che riceve dati tecnici come IP e informazioni sul browser e può usare cookie o altri identificatori secondo le proprie regole. La base giuridica dell’attivazione è il consenso (art. 6, par. 1, lett. a GDPR e normativa applicabile sulle memorie del dispositivo).',
          'La scelta vale solo durante questa visita e non viene mantenuta dopo il ricaricamento della pagina. Puoi ritirarla con “Disabilita Spotify” nel widget o dai controlli privacy nelle Impostazioni: i player vengono rimossi e cessano ulteriori connessioni incorporate. Questo non cancella dati o cookie già detenuti da Spotify; per questi usa le impostazioni del browser o i controlli Spotify. Il rifiuto non impedisce l’uso del portfolio; puoi anche aprire direttamente Spotify tramite il collegamento esterno.',
          'Spotify opera secondo la propria informativa e può trattare dati fuori dallo SEE con le garanzie descritte al suo interno. Prima di attivare il player consulta https://www.spotify.com/legal/privacy-policy/ e https://www.spotify.com/legal/cookies-policy/.',
        ],
      },
      {
        title: '6. Destinatari e collegamenti esterni',
        paragraphs: [
          'I dati sono accessibili a Carlo e, nella misura necessaria ai servizi, a fornitori autorizzati di hosting, email e assistenza tecnica. Possono inoltre essere comunicati alle autorità competenti nei casi previsti dalla legge. Il sito è ospitato in Germania e la posta è gestita tramite Aruba. Carlo non vende i dati dei visitatori e non invia i messaggi di contatto a servizi di AI generativa.',
          'I collegamenti a clienti, social network, piattaforme musicali e altri siti portano a servizi autonomi, disciplinati dalle rispettive informative. Un normale collegamento esterno non incorpora tali contenuti nel portfolio. Il sito non adotta decisioni automatizzate o profilazione per prendere decisioni sui visitatori.',
        ],
      },
      {
        title: '7. I tuoi diritti',
        paragraphs: [
          'Alle condizioni previste dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione e portabilità dei dati e opporti ai trattamenti basati sul legittimo interesse. Puoi revocare il consenso in qualsiasi momento, senza pregiudicare i trattamenti precedenti. Scrivi a info@carlodesantis.com; può essere necessaria una verifica ragionevole della tua identità.',
          'Puoi proporre reclamo al Garante per la protezione dei dati personali (https://www.garanteprivacy.it/) o all’autorità competente nel Paese di residenza abituale, del luogo di lavoro o della presunta violazione.',
        ],
      },
      {
        title: '8. Aggiornamenti',
        paragraphs: [
          'Questa informativa verrà aggiornata in caso di cambiamenti nei servizi o nei trattamenti. La data di revisione è riportata sotto.',
        ],
      },
    ],
  },
}
