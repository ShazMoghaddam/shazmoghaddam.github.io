(function() {
    const resources = {
        en: { translation: {
            /* Top bar */
            location: 'London',
            theme_light: 'Light', theme_dark: 'Dark',
            shop: 'Shop',
            /* Hero */
            tagline_ai: 'AI-Powered Python Developer',
            tagline_data: 'Data Scientist & Analyst',
            tagline_app: 'App & Automation Developer',
            hero_sub: 'Where data science, code, and product thinking meet — and turn into <span class="hl">things people actually use.</span>',
            hero_badge: 'Available for freelance, contract, and full-time opportunities — in London or internationally',
            hero_cta_work: 'View my work',
            hero_cta_contact: 'Get in touch',
            /* Stats */
            stat_apps: 'Apps',
            stat_digital: 'Digital Products',
            stat_projects: 'Projects',
            stat_certs: 'Certifications',
            stat_publications: 'Publications',
            /* Skills */
            label_expertise: 'Expertise',
            skills_heading: 'Skills & Tools',
            skills_col_lang: 'Languages & Data',
            skills_col_frameworks: 'Frameworks & Tools',
            skills_col_cloud: 'Cloud, Design & Product',
            /* About */
            label_about: 'About',
            about_heading: 'From raw data<br>to <em>something useful</em>',
            what_i_do_label: 'What I Do',
            what_title_data: 'Data Science & Python Development',
            what_preview_data: 'End-to-end Python solutions: exploratory analysis, machine learning, NLP, and data-driven insights built for clarity and real-world use.',
            what_desc_data: 'I take projects from raw data to deployed model: cleaning, feature engineering, classification, regression, NLP, and lately building AI assistants powered by the Claude API into the products themselves. I write it so both technical and non-technical people can follow what\'s happening and why.',
            what_title_digital: 'Digital Products, Apps & Freelance',
            what_preview_digital: 'I build and ship Android apps and digital products on my own, across the Google Play Store, Gumroad, Envato, and Lemon Squeezy, handling everything from the first idea to launch.',
            what_desc_digital: 'Open to freelance and contract work in data science, Python development, and digital products. I can scope a project, build it, and stick around to publish, price, and iterate based on what users actually say.',
            what_title_photo: 'Photography & Videography',
            what_preview_photo: 'Through photography and videography, I explore architecture and urban life across different countries and cultures.',
            what_desc_photo: 'I\'m drawn to how light, form, and environment reveal the character of a place: small, fleeting moments that end up feeling universal. Whether it\'s a still frame or something moving, I\'m chasing stories that feel intimate but still land with anyone looking at them.',
            what_title_design: 'Design',
            what_preview_design: 'I\'m pulled toward both historic and contemporary architecture, and toward minimalist, purposeful design where form supports function and nothing is there by accident.',
            what_desc_design: 'Whether classical or modern, I\'m drawn to structure, proportion, and the way thoughtful design shapes experience. I carry this approach into my work, aiming for clarity, simplicity, and considered execution.',
            /* About body */
            about_p1: 'I\'m a London-based Data Scientist and Python Developer, trained at Imperial College London (96% average). My day-to-day spans the whole data workflow: cleaning messy datasets, building and tuning models, and shipping the result as something people can actually use, not just a notebook that lives on my laptop.',
            about_p2: 'Outside client and product work, I build my own things: Android apps, trading tools, generative art systems, live wallpapers, screensavers, word-cloud typography. Forty-six projects so far, spread across the <strong>Google Play Store</strong>, <strong>Gumroad</strong>, <strong>Envato</strong>, and <strong>Lemon Squeezy</strong>. Running these myself taught me things a job rarely does: how to price something, when to ship versus keep polishing, and what users actually respond to once a product is out in the world.',
            about_p3: 'There\'s a quieter part of my life too. After major surgery and the birth of my eldest child, I started donating blood regularly, and in 2026 hit my <strong>50th donation</strong>, recognised by NHS Blood and Transplant. It\'s a small, repeatable way of putting something back.',
            about_p4: 'I also write, though not often and not because I\'d call myself a writer. Some thoughts just need somewhere to land. A few of those essays are published on <strong>Medium</strong>, and you can find them in the Writing section below.',
            /* Certifications */
            label_credentials: 'Credentials',
            certs_heading: 'Certifi<em>cations</em>',
            drag_to_explore: 'Drag to explore',
            /* Projects */
            label_work: 'Work',
            projects_heading: 'Projects',
            /* Apps */
            label_products_apps: 'Products & Apps',
            built_heading: 'What I\'ve <em>Built</em>',
            /* Digital Products */
            label_digital_products: 'Digital Products',
            shipped_heading: 'What I\'ve <em>Shipped</em>',
            /* Writing */
            label_writing: 'Writing',
            written_heading: 'What I\'ve <em>Written</em>',
            writing_intro: 'Reflections on becoming, connection, and the things that stay with you.',
            hub_medium: 'Published<br>on Medium',
            node1_title: 'The Art of Becoming',
            node1_desc: 'Growth, identity, and the person you\'re still becoming',
            node2_title: 'The Art of Unlearning',
            node2_desc: 'Letting go of what no longer fits',
            node3_title: 'Building Resilience in the Face of Change',
            node3_desc: 'Continuing forward when life doesn\'t go to plan',
            node4_title: 'The Road Is Always Calling',
            node4_desc: 'On riding, growing up, and the things we pass on without even realising it',
            node5_title: 'One Ear, Two Kids, and Fifty Pints of Gratitude',
            node5_desc: 'On hearing loss, fatherhood, and counting what counts',
            node6_title: 'Co-Evolving',
            node6_desc: 'On AI, socialising, and the quiet search for connection',
            node7_title: 'The Weight of Enough',
            node7_desc: 'On consumption, pace, and what it means to have enough',
            /* Contact */
            label_contact: 'Contact',
            contact_heading: 'Get in Touch',
            contact_sub: 'Open to freelance, contract, and full-time opportunities — in London or internationally, wherever the work is interesting. If you\'re building something that matters, bring the problem. I\'ll bring the code, the models, and the thinking.',
            download_cv: 'Download CV',
            /* Footer */
            footer_copy: '© 2026 Shaz Moghaddam — London',
            made_with_intention: 'Made with intention',
        }},

        fr: { translation: {
            location: 'Londres',
            theme_light: 'Clair', theme_dark: 'Sombre',
            shop: 'Boutique',
            tagline_ai: 'Développeur Python propulsé par IA',
            tagline_data: 'Data Scientist & Analyste',
            tagline_app: 'Développeur App & Automatisation',
            hero_sub: 'Là où la data science, le code et la réflexion produit se rencontrent — et deviennent <span class="hl">des choses que les gens utilisent vraiment.</span>',
            hero_badge: 'Disponible pour des missions freelance, contrat ou temps plein — à Londres ou à l\'international',
            hero_cta_work: 'Voir mes réalisations',
            hero_cta_contact: 'Me contacter',
            stat_apps: 'Applications',
            stat_digital: 'Produits Numériques',
            stat_projects: 'Projets',
            stat_certs: 'Certifications',
            stat_publications: 'Publications',
            label_expertise: 'Expertise',
            skills_heading: 'Compétences & Outils',
            skills_col_lang: 'Langages & Données',
            skills_col_frameworks: 'Frameworks & Outils',
            skills_col_cloud: 'Cloud, Design & Produit',
            label_about: 'À propos',
            about_heading: 'Des données brutes<br>à <em>quelque chose d\'utile</em>',
            what_i_do_label: 'Ce que je fais',
            what_title_data: 'Data Science & Développement Python',
            what_preview_data: 'Solutions Python de bout en bout : analyse exploratoire, machine learning, NLP et insights orientés données.',
            what_desc_data: 'Je mène les projets des données brutes jusqu\'au modèle déployé : nettoyage, ingénierie des features, classification, régression, NLP, et plus récemment des assistants IA intégrés aux produits via l\'API Claude. J\'écris le code pour qu\'il reste lisible, que vous soyez technique ou non.',
            what_title_digital: 'Produits Numériques, Apps & Freelance',
            what_preview_digital: 'Je conçois et publie seul des apps Android et des produits numériques sur le Google Play Store, Gumroad, Envato et Lemon Squeezy, de l\'idée jusqu\'au lancement.',
            what_desc_digital: 'Disponible pour des missions freelance et contrat en data science, développement Python et produits numériques. Je peux cadrer un projet, le construire, puis rester pour le publier, le tarifer et l\'améliorer selon les retours réels des utilisateurs.',
            what_title_photo: 'Photographie & Vidéographie',
            what_preview_photo: 'Par la photographie et la vidéo, j\'explore l\'architecture et la vie urbaine à travers différents pays et cultures.',
            what_desc_photo: 'Ce qui m\'attire, c\'est la façon dont la lumière, la forme et l\'environnement révèlent le caractère d\'un lieu : de petits instants fugaces qui finissent par sembler universels. Que ce soit une image fixe ou en mouvement, je cherche des histoires intimes qui parlent à tout le monde.',
            what_title_design: 'Design',
            what_preview_design: 'Je suis attiré autant par l\'architecture historique que contemporaine, et par un design minimaliste et intentionnel, où la forme sert la fonction et où rien n\'est laissé au hasard.',
            what_desc_design: 'Classique ou moderne, je suis attiré par la structure, les proportions et la façon dont un design réfléchi façonne l\'expérience.',
            /* About body */
            about_p1: 'Je suis Data Scientist et développeur Python basé à Londres, formé à l\'Imperial College London (96 % de moyenne). Mon quotidien couvre tout le flux de données : nettoyer des jeux de données imparfaits, construire et ajuster des modèles, puis livrer le résultat sous une forme que les gens utilisent vraiment, pas seulement un notebook qui reste sur mon ordinateur.',
            about_p2: 'En dehors du travail client et produit, je construis mes propres projets : applications Android, outils pour traders, systèmes d\'art génératif, fonds d\'écran animés, économiseurs d\'écran, typographies en nuages de mots. Quarante-six projets à ce jour, répartis entre <strong>Google Play Store</strong>, <strong>Gumroad</strong>, <strong>Envato</strong> et <strong>Lemon Squeezy</strong>. Les gérer moi-même m\'a appris des choses qu\'un emploi enseigne rarement : comment fixer un prix, quand livrer plutôt que continuer à peaufiner, et ce à quoi les utilisateurs réagissent vraiment une fois le produit lancé.',
            about_p3: 'Il y a aussi une part plus discrète de ma vie. Après une opération majeure et la naissance de mon aîné, j\'ai commencé à donner mon sang régulièrement, et en 2026 j\'ai atteint mon <strong>50e don</strong>, reconnu par NHS Blood and Transplant. C\'est une façon simple et répétable de redonner quelque chose.',
            about_p4: 'J\'écris aussi, pas souvent, et pas parce que je me considérerais comme un écrivain. Certaines pensées ont juste besoin d\'un endroit où se poser. Quelques-uns de ces essais sont publiés sur <strong>Medium</strong>, dans la section Écriture ci-dessous.',
            label_credentials: 'Références',
            certs_heading: 'Certifi<em>cations</em>',
            drag_to_explore: 'Glisser pour explorer',
            label_work: 'Travaux',
            projects_heading: 'Projets',
            label_products_apps: 'Produits & Apps',
            built_heading: 'Ce que j\'ai <em>Construit</em>',
            label_digital_products: 'Produits Numériques',
            shipped_heading: 'Ce que j\'ai <em>Livré</em>',
            label_writing: 'Écrits',
            written_heading: 'Ce que j\'ai <em>Écrit</em>',
            writing_intro: 'Sur la croissance, le changement, et ce qui reste.',
            hub_medium: 'Publié<br>sur Medium',
            node1_title: 'L\'Art de Devenir',
            node1_desc: 'Croissance, identité, et la personne que vous êtes encore en train de devenir',
            node2_title: 'L\'Art de Désapprendre',
            node2_desc: 'Lâcher prise sur ce qui ne correspond plus',
            node3_title: 'Construire la Résilience Face au Changement',
            node3_desc: 'Continuer d\'avancer quand la vie ne va pas comme prévu',
            node4_title: 'La Route Appelle Toujours',
            node4_desc: 'Sur la conduite, la croissance, et ce qu\'on transmet sans s\'en rendre compte',
            node5_title: 'Une Oreille, Deux Enfants et Cinquante Dons de Gratitude',
            node5_desc: 'Sur la perte auditive, la paternité, et ce qui compte vraiment',
            node6_title: 'Co-Évoluer',
            node6_desc: 'Sur l\'IA, les interactions sociales, et la quête silencieuse de connexion',
            node7_title: 'Le Poids du Suffisant',
            node7_desc: 'Sur la consommation, le rythme, et ce que signifie en avoir assez',
            label_contact: 'Contact',
            contact_heading: 'Prendre Contact',
            contact_sub: 'Disponible pour des missions freelance, contrat ou temps plein — à Londres ou à l\'international, là où le travail est intéressant. Si vous construisez quelque chose qui compte, apportez le problème. J\'apporterai le code, les modèles et la réflexion.',
            download_cv: 'Télécharger le CV',
            footer_copy: '© 2026 Shaz Moghaddam — Londres',
            made_with_intention: 'Fait avec intention',
        }},

        de: { translation: {
            location: 'London',
            theme_light: 'Hell', theme_dark: 'Dunkel',
            shop: 'Shop',
            tagline_ai: 'KI-gestützter Python-Entwickler',
            tagline_data: 'Data Scientist & Analyst',
            tagline_app: 'App- & Automatisierungsentwickler',
            hero_sub: 'Wo Data Science, Code und Produktdenken aufeinandertreffen — und zu Dingen werden, <span class="hl">die Menschen wirklich nutzen.</span>',
            hero_badge: 'Offen für Freelance-, Vertrags- und Festanstellungen — in London oder international',
            hero_cta_work: 'Meine Arbeit ansehen',
            hero_cta_contact: 'Kontakt aufnehmen',
            stat_apps: 'Apps',
            stat_digital: 'Digitale Produkte',
            stat_projects: 'Projekte',
            stat_certs: 'Zertifikate',
            stat_publications: 'Publikationen',
            label_expertise: 'Fachgebiet',
            skills_heading: 'Fähigkeiten & Werkzeuge',
            skills_col_lang: 'Sprachen & Daten',
            skills_col_frameworks: 'Frameworks & Tools',
            skills_col_cloud: 'Cloud, Design & Produkt',
            label_about: 'Über mich',
            about_heading: 'Aus Rohdaten<br>wird <em>etwas Nützliches</em>',
            what_i_do_label: 'Was ich tue',
            what_title_data: 'Data Science & Python-Entwicklung',
            what_preview_data: 'End-to-End-Python-Lösungen: explorative Analyse, Machine Learning, NLP und datengetriebene Erkenntnisse.',
            what_desc_data: 'Ich führe Projekte von Rohdaten bis zum eingesetzten Modell: Bereinigung, Feature-Engineering, Klassifikation, Regression, NLP, und neuerdings auch KI-Assistenten, die über die Claude API direkt in die Produkte eingebaut werden. Ich schreibe den Code so, dass er sowohl für technische als auch für nicht-technische Leute nachvollziehbar bleibt.',
            what_title_digital: 'Digitale Produkte, Apps & Freelance',
            what_preview_digital: 'Ich entwickle und veröffentliche Android-Apps und digitale Produkte ganz allein, über den Google Play Store, Gumroad, Envato und Lemon Squeezy, von der ersten Idee bis zum Launch.',
            what_desc_digital: 'Offen für Freelance- und Vertragsarbeit in Data Science, Python-Entwicklung und digitalen Produkten. Ich kann ein Projekt skizzieren, bauen und auch danach noch dabeibleiben, um es zu veröffentlichen, zu bepreisen und basierend auf echtem Nutzerfeedback weiterzuentwickeln.',
            what_title_photo: 'Fotografie & Videografie',
            what_preview_photo: 'Durch Fotografie und Videografie erkunde ich Architektur und Stadtleben in verschiedenen Ländern und Kulturen.',
            what_desc_photo: 'Mich zieht es zu der Art, wie Licht, Form und Umgebung den Charakter eines Ortes offenbaren: kleine, flüchtige Momente, die am Ende universell wirken. Ob Standbild oder bewegte Szene, ich suche Geschichten, die intim sind und trotzdem jeden ansprechen.',
            what_title_design: 'Design',
            what_preview_design: 'Mich zieht es sowohl zu historischer als auch zeitgenössischer Architektur, und zu minimalistischem, zweckgerichtetem Design, bei dem Form der Funktion dient und nichts dem Zufall überlassen ist.',
            what_desc_design: 'Ob klassisch oder modern — mich fesseln Struktur, Proportion und die Art, wie durchdachtes Design die Erfahrung prägt.',
            /* About body */
            about_p1: 'Ich bin ein in London ansässiger Data Scientist und Python-Entwickler, ausgebildet am Imperial College London (96 % Durchschnitt). Mein Alltag deckt den gesamten Daten-Workflow ab: unübersichtliche Datensätze bereinigen, Modelle bauen und feinjustieren, und das Ergebnis so ausliefern, dass Menschen es tatsächlich nutzen können, nicht nur ein Notebook, das auf meinem Laptop liegt.',
            about_p2: 'Neben Kunden- und Produktarbeit baue ich eigene Projekte: Android-Apps, Trading-Tools, generative Kunstsysteme, Live-Wallpapers, Bildschirmschoner, Wortwolken-Typografie. Bisher sechsundvierzig Projekte, verteilt über <strong>Google Play Store</strong>, <strong>Gumroad</strong>, <strong>Envato</strong> und <strong>Lemon Squeezy</strong>. Diese selbst zu betreiben hat mir Dinge beigebracht, die ein Job selten lehrt: wie man etwas bepreist, wann man liefert statt weiter zu feilen, und worauf Nutzer wirklich reagieren, sobald ein Produkt draußen ist.',
            about_p3: 'Es gibt auch einen ruhigeren Teil meines Lebens. Nach einer großen Operation und der Geburt meines ältesten Kindes begann ich, regelmäßig Blut zu spenden, und 2026 erreichte ich meine <strong>50. Spende</strong>, anerkannt von NHS Blood and Transplant. Es ist eine kleine, wiederholbare Art, etwas zurückzugeben.',
            about_p4: 'Ich schreibe auch, nicht oft, und nicht weil ich mich als Schriftsteller bezeichnen würde. Manche Gedanken brauchen einfach einen Ort, an dem sie landen können. Ein paar dieser Essays sind auf <strong>Medium</strong> veröffentlicht, im Abschnitt Schreiben weiter unten.',
            label_credentials: 'Nachweise',
            certs_heading: 'Zertifi<em>kate</em>',
            drag_to_explore: 'Zum Erkunden ziehen',
            label_work: 'Arbeit',
            projects_heading: 'Projekte',
            label_products_apps: 'Produkte & Apps',
            built_heading: 'Was ich <em>Gebaut</em> habe',
            label_digital_products: 'Digitale Produkte',
            shipped_heading: 'Was ich <em>Veröffentlicht</em> habe',
            label_writing: 'Schreiben',
            written_heading: 'Was ich <em>Geschrieben</em> habe',
            writing_intro: 'Über Wachstum, Veränderung und das, was bleibt.',
            hub_medium: 'Veröffentlicht<br>auf Medium',
            node1_title: 'Die Kunst des Werdens',
            node1_desc: 'Wachstum, Identität und die Person, die man noch wird',
            node2_title: 'Die Kunst des Verlernens',
            node2_desc: 'Loslassen, was nicht mehr passt',
            node3_title: 'Resilienz im Wandel aufbauen',
            node3_desc: 'Weitermachen, wenn das Leben anders verläuft als geplant',
            node4_title: 'Die Straße ruft immer',
            node4_desc: 'Über Fahren, Erwachsenwerden und was wir unbewusst weitergeben',
            node5_title: 'Ein Ohr, zwei Kinder und fünfzig Pints Dankbarkeit',
            node5_desc: 'Über Hörverlust, Vaterschaft und das Zählen, was zählt',
            node6_title: 'Ko-Evolution',
            node6_desc: 'Über KI, Geselligkeit und die stille Suche nach Verbindung',
            node7_title: 'Das Gewicht des Genug',
            node7_desc: 'Über Konsum, Tempo, und was es bedeutet, genug zu haben',
            label_contact: 'Kontakt',
            contact_heading: 'Kontakt aufnehmen',
            contact_sub: 'Offen für Freelance-, Vertrags- und Festanstellungen — in London oder international, wo immer die Arbeit interessant ist. Wenn Sie etwas Bedeutungsvolles aufbauen, bringen Sie das Problem. Ich bringe den Code, die Modelle und das Denken.',
            download_cv: 'CV herunterladen',
            footer_copy: '© 2026 Shaz Moghaddam — London',
            made_with_intention: 'Mit Intention gemacht',
        }},

        es: { translation: {
            location: 'Londres',
            theme_light: 'Claro', theme_dark: 'Oscuro',
            shop: 'Tienda',
            tagline_ai: 'Desarrollador Python con IA',
            tagline_data: 'Científico de Datos & Analista',
            tagline_app: 'Desarrollador de Apps & Automatización',
            hero_sub: 'Donde la ciencia de datos, el código y el pensamiento de producto se encuentran — y se convierten en <span class="hl">cosas que la gente realmente usa.</span>',
            hero_badge: 'Disponible para oportunidades freelance, contrato y tiempo completo — en Londres o internacionalmente',
            hero_cta_work: 'Ver mi trabajo',
            hero_cta_contact: 'Contáctame',
            stat_apps: 'Aplicaciones',
            stat_digital: 'Productos Digitales',
            stat_projects: 'Proyectos',
            stat_certs: 'Certificaciones',
            stat_publications: 'Publicaciones',
            label_expertise: 'Experiencia',
            skills_heading: 'Habilidades & Herramientas',
            skills_col_lang: 'Lenguajes & Datos',
            skills_col_frameworks: 'Frameworks & Herramientas',
            skills_col_cloud: 'Cloud, Diseño & Producto',
            label_about: 'Acerca de',
            about_heading: 'De los datos brutos<br>a <em>algo útil</em>',
            what_i_do_label: 'Lo que hago',
            what_title_data: 'Ciencia de Datos & Desarrollo Python',
            what_preview_data: 'Soluciones Python de extremo a extremo: análisis exploratorio, machine learning, NLP e insights basados en datos.',
            what_desc_data: 'Llevo los proyectos desde datos brutos hasta el modelo desplegado: limpieza, ingeniería de características, clasificación, regresión, NLP y, últimamente, asistentes de IA integrados en los propios productos mediante la API de Claude. Escribo el código para que tanto perfiles técnicos como no técnicos puedan seguir lo que ocurre y por qué.',
            what_title_digital: 'Productos Digitales, Apps & Freelance',
            what_preview_digital: 'Desarrollo y publico por mi cuenta apps Android y productos digitales en Google Play Store, Gumroad, Envato y Lemon Squeezy, desde la primera idea hasta el lanzamiento.',
            what_desc_digital: 'Disponible para trabajo freelance y contratos en ciencia de datos, desarrollo Python y productos digitales. Puedo definir el alcance de un proyecto, construirlo y seguir presente para publicarlo, ponerle precio e iterarlo según lo que digan realmente los usuarios.',
            what_title_photo: 'Fotografía & Videografía',
            what_preview_photo: 'A través de la fotografía y la videografía, exploro la arquitectura y la vida urbana en distintos países y culturas.',
            what_desc_photo: 'Me atrae cómo la luz, la forma y el entorno revelan el carácter de un lugar: pequeños momentos fugaces que terminan sintiéndose universales. Ya sea una imagen fija o algo en movimiento, busco historias íntimas que aun así conecten con cualquiera.',
            what_title_design: 'Diseño',
            what_preview_design: 'Me atrae tanto la arquitectura histórica como la contemporánea, y el diseño minimalista y con propósito, donde la forma sirve a la función y nada está ahí por casualidad.',
            what_desc_design: 'Clásico o moderno, me atrae la estructura, la proporción y la manera en que un diseño reflexivo moldea la experiencia.',
            /* About body */
            about_p1: 'Soy científico de datos y desarrollador Python con base en Londres, formado en el Imperial College London (96 % de media). Mi día a día abarca todo el flujo de datos: limpiar conjuntos de datos imperfectos, construir y ajustar modelos, y entregar el resultado como algo que la gente realmente usa, no solo un notebook que se queda en mi portátil.',
            about_p2: 'Fuera del trabajo con clientes y de producto, construyo mis propios proyectos: apps Android, herramientas para traders, sistemas de arte generativo, fondos de pantalla animados, salvapantallas, tipografías de nubes de palabras. Cuarenta y seis proyectos hasta ahora, repartidos entre <strong>Google Play Store</strong>, <strong>Gumroad</strong>, <strong>Envato</strong> y <strong>Lemon Squeezy</strong>. Llevarlos yo mismo me ha enseñado cosas que un trabajo rara vez enseña: cómo poner precio a algo, cuándo lanzar en vez de seguir puliendo, y qué responde realmente la gente una vez que un producto está ahí fuera.',
            about_p3: 'También hay una parte más tranquila de mi vida. Tras una operación importante y el nacimiento de mi hijo mayor, empecé a donar sangre con regularidad, y en 2026 alcancé mi <strong>donación número 50</strong>, reconocida por NHS Blood and Transplant. Es una manera pequeña y repetible de devolver algo.',
            about_p4: 'También escribo, no muy a menudo, y no porque me considere escritor. Algunas ideas simplemente necesitan un lugar donde posarse. Algunos de esos ensayos están publicados en <strong>Medium</strong>, en la sección de Escritura más abajo.',
            label_credentials: 'Credenciales',
            certs_heading: 'Certifi<em>caciones</em>',
            drag_to_explore: 'Arrastra para explorar',
            label_work: 'Trabajo',
            projects_heading: 'Proyectos',
            label_products_apps: 'Productos & Apps',
            built_heading: 'Lo que he <em>Construido</em>',
            label_digital_products: 'Productos Digitales',
            shipped_heading: 'Lo que he <em>Lanzado</em>',
            label_writing: 'Escritura',
            written_heading: 'Lo que he <em>Escrito</em>',
            writing_intro: 'Sobre el crecimiento, el cambio y lo que permanece.',
            hub_medium: 'Publicado<br>en Medium',
            node1_title: 'El Arte de Convertirse',
            node1_desc: 'Crecimiento, identidad y la persona en la que aún te estás convirtiendo',
            node2_title: 'El Arte de Desaprender',
            node2_desc: 'Soltar lo que ya no encaja',
            node3_title: 'Construir Resiliencia ante el Cambio',
            node3_desc: 'Seguir adelante cuando la vida no va como se planea',
            node4_title: 'La Carretera Siempre Llama',
            node4_desc: 'Sobre conducir, crecer y lo que transmitimos sin darnos cuenta',
            node5_title: 'Un Oído, Dos Hijos y Cincuenta Pintas de Gratitud',
            node5_desc: 'Sobre la pérdida auditiva, la paternidad y contar lo que importa',
            node6_title: 'Co-Evolucionando',
            node6_desc: 'Sobre la IA, la socialización y la silenciosa búsqueda de conexión',
            node7_title: 'El Peso de lo Suficiente',
            node7_desc: 'Sobre el consumo, el ritmo, y qué significa tener suficiente',
            label_contact: 'Contacto',
            contact_heading: 'Ponerse en Contacto',
            contact_sub: 'Disponible para oportunidades freelance, contrato y tiempo completo — en Londres o internacionalmente, donde el trabajo sea interesante. Si estás construyendo algo que importa, trae el problema. Yo traeré el código, los modelos y el pensamiento.',
            download_cv: 'Descargar CV',
            footer_copy: '© 2026 Shaz Moghaddam — Londres',
            made_with_intention: 'Hecho con intención',
        }},

        nl: { translation: {
            location: 'Londen',
            theme_light: 'Licht', theme_dark: 'Donker',
            shop: 'Winkel',
            tagline_ai: 'AI-gedreven Python Ontwikkelaar',
            tagline_data: 'Data Scientist & Analist',
            tagline_app: 'App- & Automatiseringsontwikkelaar',
            hero_sub: 'Waar data science, code en productdenken samenkomen — en veranderen in <span class="hl">dingen die mensen echt gebruiken.</span>',
            hero_badge: 'Beschikbaar voor freelance-, contract- en fulltime mogelijkheden — in Londen of internationaal',
            hero_cta_work: 'Bekijk mijn werk',
            hero_cta_contact: 'Neem contact op',
            stat_apps: 'Apps',
            stat_digital: 'Digitale Producten',
            stat_projects: 'Projecten',
            stat_certs: 'Certificaten',
            stat_publications: 'Publicaties',
            label_expertise: 'Expertise',
            skills_heading: 'Vaardigheden & Tools',
            skills_col_lang: 'Talen & Data',
            skills_col_frameworks: 'Frameworks & Tools',
            skills_col_cloud: 'Cloud, Design & Product',
            label_about: 'Over mij',
            about_heading: 'Van ruwe data<br>naar <em>iets bruikbaars</em>',
            what_i_do_label: 'Wat ik doe',
            what_title_data: 'Data Science & Python Ontwikkeling',
            what_preview_data: 'End-to-end Python-oplossingen: verkennende analyse, machine learning, NLP en data-gedreven inzichten.',
            what_desc_data: 'Ik begeleid projecten van ruwe data tot een geïmplementeerd model: opschonen, feature engineering, classificatie, regressie, NLP, en de laatste tijd ook AI-assistenten die via de Claude API direct in het product worden ingebouwd. Ik schrijf de code zo dat zowel technische als niet-technische mensen kunnen volgen wat er gebeurt en waarom.',
            what_title_digital: 'Digitale Producten, Apps & Freelance',
            what_preview_digital: 'Ik bouw en publiceer zelf Android-apps en digitale producten via de Google Play Store, Gumroad, Envato en Lemon Squeezy, van het eerste idee tot de lancering.',
            what_desc_digital: 'Beschikbaar voor freelance- en contractwerk in data science, Python-ontwikkeling en digitale producten. Ik kan een project scopen, bouwen, en daarna betrokken blijven om het te publiceren, te prijzen en bij te schaven op basis van wat gebruikers echt zeggen.',
            what_title_photo: 'Fotografie & Videografie',
            what_preview_photo: 'Via fotografie en videografie verken ik architectuur en stedelijk leven in verschillende landen en culturen.',
            what_desc_photo: 'Ik word aangetrokken door hoe licht, vorm en omgeving het karakter van een plek onthullen: kleine, vluchtige momenten die uiteindelijk universeel aanvoelen. Of het nu een stilstaand beeld is of iets bewegends, ik zoek verhalen die intiem zijn maar toch iedereen raken.',
            what_title_design: 'Design',
            what_preview_design: 'Ik voel me aangetrokken tot zowel historische als hedendaagse architectuur, en tot minimalistisch, doelgericht ontwerp waarbij vorm de functie dient en niets toevallig is.',
            what_desc_design: 'Klassiek of modern — ik word aangetrokken door structuur, proporties en de manier waarop doordacht ontwerp de ervaring vormgeeft.',
            /* About body */
            about_p1: 'Ik ben een in Londen gevestigde Data Scientist en Python-ontwikkelaar, opgeleid aan het Imperial College London (gemiddelde van 96%). Mijn dagelijkse werk omvat de hele dataworkflow: rommelige datasets opschonen, modellen bouwen en finetunen, en het resultaat opleveren als iets dat mensen daadwerkelijk gebruiken, niet alleen een notebook dat op mijn laptop blijft staan.',
            about_p2: 'Naast klant- en productwerk bouw ik mijn eigen dingen: Android-apps, handelstools, generatieve kunstsystemen, live wallpapers, screensavers, woordwolk-typografie. Inmiddels zesenveertig projecten, verspreid over <strong>Google Play Store</strong>, <strong>Gumroad</strong>, <strong>Envato</strong> en <strong>Lemon Squeezy</strong>. Die zelf runnen heeft me dingen geleerd die een baan zelden leert: hoe je iets prijst, wanneer je shipt in plaats van blijft polijsten, en waar gebruikers echt op reageren zodra een product live staat.',
            about_p3: 'Er is ook een rustiger deel van mijn leven. Na een grote operatie en de geboorte van mijn oudste kind begon ik regelmatig bloed te doneren, en in 2026 bereikte ik mijn <strong>50e donatie</strong>, erkend door NHS Blood and Transplant. Het is een kleine, herhaalbare manier om iets terug te geven.',
            about_p4: 'Ik schrijf ook, niet vaak, en niet omdat ik mezelf schrijver zou noemen. Sommige gedachten hebben gewoon een plek nodig om te landen. Een aantal van die essays staat op <strong>Medium</strong>, te vinden in de sectie Schrijven hieronder.',
            label_credentials: 'Referenties',
            certs_heading: 'Certifi<em>caten</em>',
            drag_to_explore: 'Sleep om te verkennen',
            label_work: 'Werk',
            projects_heading: 'Projecten',
            label_products_apps: 'Producten & Apps',
            built_heading: 'Wat ik heb <em>Gebouwd</em>',
            label_digital_products: 'Digitale Producten',
            shipped_heading: 'Wat ik heb <em>Gelanceerd</em>',
            label_writing: 'Schrijven',
            written_heading: 'Wat ik heb <em>Geschreven</em>',
            writing_intro: 'Over groei, verandering en wat blijft.',
            hub_medium: 'Gepubliceerd<br>op Medium',
            node1_title: 'De Kunst van het Worden',
            node1_desc: 'Groei, identiteit en de persoon die je nog steeds aan het worden bent',
            node2_title: 'De Kunst van het Afleren',
            node2_desc: 'Loslaten wat niet meer past',
            node3_title: 'Veerkracht Opbouwen bij Verandering',
            node3_desc: 'Doorgaan wanneer het leven anders loopt dan gepland',
            node4_title: 'De Weg Roept Altijd',
            node4_desc: 'Over rijden, opgroeien en wat we doorgeven zonder het te beseffen',
            node5_title: 'Één Oor, Twee Kinderen en Vijftig Pints Dankbaarheid',
            node5_desc: 'Over gehoorverlies, vaderschap en tellen wat telt',
            node6_title: 'Co-Evolueren',
            node6_desc: 'Over AI, sociale omgang en de stille zoektocht naar verbinding',
            node7_title: 'Het Gewicht van Genoeg',
            node7_desc: 'Over consumptie, tempo, en wat het betekent om genoeg te hebben',
            label_contact: 'Contact',
            contact_heading: 'Contact Opnemen',
            contact_sub: 'Beschikbaar voor freelance-, contract- en fulltime mogelijkheden — in Londen of internationaal, waar het werk interessant is. Als u iets bouwt dat ertoe doet, breng het probleem. Ik breng de code, de modellen en het denkvermogen.',
            download_cv: 'CV Downloaden',
            footer_copy: '© 2026 Shaz Moghaddam — Londen',
            made_with_intention: 'Gemaakt met intentie',
        }}
    };

    /* ── HTML keys that need innerHTML (contain <em> or <br>) ── */
    const htmlKeys = new Set([
        'about_heading', 'built_heading', 'shipped_heading',
        'written_heading', 'hub_medium', 'skills_heading',
        'certs_heading',
        'about_p1', 'about_p2', 'about_p3', 'about_p4',
        'hero_sub'
    ]);

    const savedLang = localStorage.getItem('lang') || 'en';

    i18next.init({
        lng: savedLang,
        fallbackLng: 'en',
        resources,
        interpolation: { escapeValue: false }
    }, function() {
        applyTranslations(false);
        setLangActive(savedLang);
    });

    function applyTranslations(animate) {
        const els = document.querySelectorAll('[data-i18n]');

        function doSwap() {
            els.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const val = i18next.t(key);
                if (!val || val === key) return;

                if (el.hasAttribute('data-scramble')) {
                    const currentLang = el.getAttribute('data-translated-lang') || 'en';
                    if (currentLang === i18next.language) return;
                    el.innerHTML = val;
                    el.setAttribute('data-translated-lang', i18next.language);
                    delete el.dataset.scrambleReady;
                    if (window._scramblePrepare) {
                        window._scramblePrepare(el);
                        if (window._scrambleObserver) window._scrambleObserver.observe(el);
                    }
                } else if (htmlKeys.has(key)) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            });
            document.documentElement.lang = i18next.language;
        }

        if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Fade out non-scramble elements, swap, fade back in
            const targets = [...els].filter(el => !el.hasAttribute('data-scramble'));
            targets.forEach(el => { el.style.opacity = '0'; });
            setTimeout(() => {
                doSwap();
                targets.forEach(el => { el.style.opacity = ''; });
            }, 180);
        } else {
            doSwap();
        }
    }

    function setLangActive(lang) {
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.toggle('current', btn.dataset.lang === lang);
        });
    }

    /* ── Globe toggle ── */
    const globeBtn = document.getElementById('langGlobeBtn');
    const dropdown = document.getElementById('langDropdown');
    let _closeTimer = null;

    function closeDropdown() {
        dropdown.classList.remove('open');
        globeBtn.classList.remove('active');
        globeBtn.setAttribute('aria-expanded', 'false');
    }

    function scheduleClose(delay) {
        clearTimeout(_closeTimer);
        _closeTimer = setTimeout(closeDropdown, delay);
    }

    function cancelClose() {
        clearTimeout(_closeTimer);
    }

    globeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cancelClose();
        const open = dropdown.classList.toggle('open');
        globeBtn.classList.toggle('active', open);
        globeBtn.setAttribute('aria-expanded', String(open));
        // Auto-dismiss after 4s if user doesn't interact
        if (open) scheduleClose(4000);
    });

    // Hovering the button or dropdown keeps it alive
    [globeBtn, dropdown].forEach(el => {
        el.addEventListener('mouseenter', cancelClose);
        el.addEventListener('mouseleave', function() {
            if (dropdown.classList.contains('open')) scheduleClose(800);
        });
    });

    // Outside click — close immediately
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && e.target !== globeBtn) {
            cancelClose();
            closeDropdown();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { cancelClose(); closeDropdown(); }
    });

    /* ── Language option selection ── */
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            i18next.changeLanguage(lang, function() {
                applyTranslations(true);
                setLangActive(lang);
                localStorage.setItem('lang', lang);
                /* Re-apply theme button text based on current theme */
                const themeEl = document.getElementById('theme-text');
                if (themeEl) {
                    const isLight = document.body.getAttribute('data-theme') === 'light';
                    themeEl.textContent = i18next.t(isLight ? 'theme_dark' : 'theme_light');
                }
            });
            cancelClose();
            closeDropdown();
        });
    });

    /* ── Skills column dropdowns ── */
    document.querySelectorAll('.skills-col-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const col = this.closest('.skills-col');
            const isOpen = col.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
        });
    });

    /* ── Patch toggleTheme so button label stays translated ── */
    const _origToggleTheme = window.toggleTheme;
    window.toggleTheme = function() {
        if (_origToggleTheme) _origToggleTheme();
        setTimeout(function() {
            const themeEl = document.getElementById('theme-text');
            if (themeEl) {
                const isLight = document.body.getAttribute('data-theme') === 'light';
                themeEl.textContent = i18next.t(isLight ? 'theme_dark' : 'theme_light');
            }
        }, 50);
    };
})();
