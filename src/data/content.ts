// Update these values without touching any component code

export const artistStats = [
  { value: '1B+', label: 'Organic UGC Views' },
  { value: '543K', label: 'Monthly Listeners' },
  { value: '6M+', label: 'Spotify Streams in 2025' },
  { value: '20M+', label: 'Views Across Platforms' },
  { value: '195K', label: 'Playlist Adds' },
]

// Songs shown on the homepage Arsenal section (with ASCII art)
export const homepageFeaturedSongs = [
  {
    title: 'BLASTOISE!',
    tag: 'BREAKOUT · Water Type',
    cover: '/images/covers/blastoise.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/blastoise',
    lore: 'The song that started it all. Big Man Blastoise summoned. 20M+ views, 1B+ UGC intercepts. The flagship operative.',
  },
  {
    title: 'CHARIZARD!',
    tag: 'FIRE TYPE · Fan Favorite',
    cover: '/images/covers/charizard.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/charizard',
    lore: "The most beloved Pokémon gets the PokéRage treatment. Charizard doesn't lose. Neither does this one.",
  },
  {
    title: 'VENUSAUR!',
    tag: 'GRASS TYPE · Underrated',
    cover: '/images/covers/venusaur.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/venusaur',
    lore: "The starter nobody picks. The song everyone sleeps on. Venusaur always had it. They just weren't ready.",
  },
  {
    title: 'PSYDUCK!',
    tag: 'PSYCHIC TYPE · Momentum',
    cover: '/images/covers/psyduck.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/psyduck',
    lore: "100K+ streams in under a month. Perpetually confused, permanently dangerous. PokéRage doesn't wait for anyone.",
  },
  {
    title: 'GENGAR!',
    tag: 'GHOST TYPE · Shadow Operative',
    cover: '/images/covers/gengar.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/gengar',
    lore: "Before the regime had a name, Gengar was already in the field. Song one. The operative that started it all.",
  },
  {
    title: 'GYARADOS!',
    tag: 'WATER TYPE · Sea Serpent',
    cover: '/images/covers/gyarados.jpg',
    hypeddit: 'https://hypeddit.com/genwunner/gyarados',
    lore: "They said Magikarp couldn't do it. Then Gyarados appeared. The newest operative. The most dangerous evolution.",
    isNewest: true,
  },
]

// Full discography for THE ARSENAL page — ordered by Spotify popularity
// ⚠ Hitmonchan, Gastly, Grimer: no confirmed Hypeddit link yet (placeholder URLs used)
export const songs = [
  { title: 'BLASTOISE!',         cover: '/images/covers/blastoise.jpg',  hypeddit: 'https://hypeddit.com/genwunner/blastoise'  },
  { title: 'CHARIZARD!',         cover: '/images/covers/charizard.jpg',  hypeddit: 'https://hypeddit.com/genwunner/charizard'  },
  { title: 'VENUSAUR!',          cover: '/images/covers/venusaur.jpg',   hypeddit: 'https://hypeddit.com/genwunner/venusaur'   },
  { title: 'PSYDUCK!',           cover: '/images/covers/psyduck.jpg',    hypeddit: 'https://hypeddit.com/genwunner/psyduck'    },
  { title: 'HITMONCHAN!',        cover: '/images/covers/hitmonchan.jpg', hypeddit: 'https://hypeddit.com/genwunner/hitmonchan' }, // ⚠ no Hypeddit link
  { title: 'GASTLY!',            cover: '/images/covers/gastly.jpg',     hypeddit: 'https://hypeddit.com/genwunner/gastly'     }, // ⚠ no Hypeddit link
  { title: 'GENGAR!',            cover: '/images/covers/gengar.jpg',     hypeddit: 'https://hypeddit.com/genwunner/gengar'     },
  { title: 'TAUROS!',            cover: '/images/covers/tauros.jpg',     hypeddit: 'https://hypeddit.com/genwunner/tauros'     },
  { title: 'GRIMER!',            cover: '/images/covers/grimer.jpg',     hypeddit: 'https://hypeddit.com/genwunner/grimer'     }, // ⚠ no Hypeddit link
  { title: 'GENGAR II',          cover: '/images/covers/gengarii.jpg',   hypeddit: 'https://hypeddit.com/genwunner/gengarii'   },
  { title: 'NINETAILS!',         cover: '/images/covers/ninetails.jpg',  hypeddit: 'https://hypeddit.com/genwunner/ninetails'  },
  { title: 'POKEFLUTE! ft. Shofu', cover: '/images/covers/pokeflute.jpg', hypeddit: 'https://hypeddit.com/genwunner/pokeflute' },
]

export const pressQuotes = [
  {
    quote: 'Blastoise is finally winning a popularity contest over Charizard, and it rules.',
    source: 'KOTAKU',
  },
]

// Replace with actual YouTube video ID (e.g. 'dQw4w9WgXcQ')
export const FEATURED_VIDEO_ID = 'eY_DBWkwSC4'

// Latest single to feature prominently
export const latestRelease = {
  title: 'POKEFLUTE! ft. Shofu',
  label: 'OUT NOW',
  spotify: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO',
  apple: 'https://music.apple.com/us/artist/genwunner/1630027337',
  youtube: 'https://youtube.com/@genwunner',
}

export const socialLinks = {
  spotify: 'https://open.spotify.com/artist/653dGzLhl75ftFI0GsqQLO',
  apple: 'https://music.apple.com/us/artist/genwunner/1630027337',
  instagram: 'https://instagram.com/genwunnr',
  tiktok: 'https://tiktok.com/@genwunnr',
  youtube: 'https://youtube.com/@genwunnr',
  twitter: 'https://x.com/genwunnrr',
  discord: 'https://discord.gg/6c28f8JXKV',
}

export const upcomingShows = [
  {
    id: 'eu-0',
    event_date: '2026-10-01',
    title: 'EU TOUR: DUBLIN',
    city: 'Dublin, Ireland',
    venue: 'The Sugar Club',
    event_type: 'Tour',
    ticket_url: 'https://tickets.thesugarclub.com/events/thesugarclub/2180345?trackingConsent=1',
    is_upcoming: true,
  },
  {
    id: 'eu-1',
    event_date: '2026-10-02',
    title: 'EU TOUR: BIRMINGHAM',
    city: 'Birmingham, UK',
    venue: 'O2 Institute2',
    event_type: 'Tour',
    ticket_url: 'https://www.bandsintown.com/t/1038851004',
    is_upcoming: true,
  },
  {
    id: 'eu-2',
    event_date: '2026-10-04',
    title: 'EU TOUR: MANCHESTER',
    city: 'Manchester, UK',
    venue: 'Manchester Academy 3',
    event_type: 'Tour',
    ticket_url: 'https://www.bandsintown.com/t/1038842212',
    is_upcoming: true,
  },
  {
    id: 'eu-3',
    event_date: '2026-10-05',
    title: 'EU TOUR: GLASGOW',
    city: 'Glasgow, UK',
    venue: 'Glasgow Garage',
    event_type: 'Tour',
    ticket_url: 'https://www.bandsintown.com/t/1038842452',
    is_upcoming: true,
  },
  {
    id: 'eu-4',
    event_date: '2026-10-07',
    title: 'EU TOUR: LONDON',
    city: 'London, UK',
    venue: 'O2 Academy Islington',
    event_type: 'Tour',
    ticket_url: 'https://www.bandsintown.com/t/1038851746',
    is_upcoming: true,
  },
  {
    id: 'eu-5',
    event_date: '2026-10-12',
    title: 'EU TOUR: COLOGNE',
    city: 'Cologne, Germany',
    venue: 'Die Kantine',
    event_type: 'Tour',
    ticket_url: 'https://www.eventim.de/event/natewantstobattle-phantom-burial-tour-die-kantine-21594957/',
    is_upcoming: true,
  },
  {
    id: 'eu-6',
    event_date: '2026-10-14',
    title: 'EU TOUR: TILBURG',
    city: 'Tilburg, Netherlands',
    venue: '013',
    event_type: 'Tour',
    ticket_url: 'https://tickets.013.nl/b3eac5e12bb64b9696883039231ab55d/',
    is_upcoming: true,
  },
  {
    id: 'eu-7',
    event_date: '2026-10-18',
    title: 'EU TOUR: PARIS',
    city: 'Paris, France',
    venue: 'La Machine Du Moulin Rouge',
    event_type: 'Tour',
    ticket_url: 'https://www.ticketmaster.fr/fr/manifestation/natewantstobattle-billet/idmanif/658059/idtier/18864121',
    is_upcoming: true,
  },
  {
    id: 'eu-8',
    event_date: '2026-10-21',
    title: 'EU TOUR: BARCELONA',
    city: 'Barcelona, Spain',
    venue: 'Razzmatazz',
    event_type: 'Tour',
    ticket_url: 'https://www.entradas.com/artist/natewantstobattle/?affiliate=B4K',
    is_upcoming: true,
  },
]

export const products = [
  // ── TEES ────────────────────────────────────────────────────────
  {
    handle: 'big-man-vintage-stoise-tee',
    stripePrice: 'price_1TbXPXRyk6nmaoL3Yaipr6Nw',
    title: 'BIG MAN VINTAGE-STOISE',
    tag: 'APPAREL · Tee',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/Big-man-vintage-Front.png',
    hasSize: true,
    category: 'apparel',
    desc: "The song that started it all. Now it's a shirt. Big Man Blastoise rendered in full manga glory — panel layout, Japanese text, the crew front and center. Genwunner's flagship operative on a heavyweight white tee. This is where PokéRage began.",
  },
  {
    handle: 'wunnwill-tee',
    stripePrice: 'price_1TbXWuRyk6nmaoL3CBkNxsiS',
    title: 'WUNNWILL',
    tag: 'APPAREL · Tee',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/wunnwill-Front.png',
    hasSize: true,
    category: 'apparel',
    desc: 'Goodwill never had this much drip. The WunnWill tee takes the most recognizable thrift store logo in America and gives it the PokéRage treatment. Simplified Pikachu face where the Goodwill guy used to be. Genwunner across the bottom where it always should have been. A collab nobody asked for. Everyone needed.',
  },
  {
    handle: 'box-logo-dupe-tee',
    stripePrice: 'price_1TbXZVRyk6nmaoL3Tic5jLJY',
    title: 'BOX LOGO DUPE',
    tag: 'APPAREL · Tee',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/wunner-boxlogo-1.jpg',
    hasSize: true,
    category: 'apparel',
    desc: 'Supreme had the right idea. Wrong person. Box logo tee featuring Genwunner. Black heavyweight cotton, oversized fit, red box across the face. The operative himself looking up at everything he is about to take over. The regime does not follow trends. It takes them.',
  },
  {
    handle: 'kanto-fire-dept-tee',
    stripePrice: 'price_1TbXb9Ryk6nmaoL3TKlZSd1Z',
    title: 'KANTO FIRE DEPT',
    tag: 'APPAREL · Tee',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/KFD_Front.png',
    hasSize: true,
    category: 'apparel',
    desc: 'Blastoise does not just spray water cannons for fun. In Kanto, that is a public service. The Kantonian Fire Department tee features the official KFD badge on the front chest and a full back graphic. Blastoise in full firefighter mode, Pokeball and hydrant flanking the seal. As seen in the Big Man Blastoise music video. Navy heavyweight tee. Front and back print.',
    images: [
      'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/KFD_Front.png',
      'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/KFD_Back.png',
    ],
  },
  {
    handle: 'rrr-rolls-tee',
    stripePrice: 'price_1TbXuFRyk6nmaoL30faPcn5v',
    title: 'REGIME ROYCE',
    tag: 'APPAREL · Tee',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/TRIPLE-R-ROLLS-MOCKUP-TEE.jpg',
    hasSize: true,
    category: 'apparel',
    desc: "Team Rocket always had expensive taste. The Regime Royce tee takes the world's most recognizable luxury badge and reissues it under new management. Rocket. Recruitment. Regime. Red monogram center, mirrored RECRUITMENT text top and bottom, full front print on heavyweight black cotton. Giovanni approved this message.",
  },

  // ── HATS ────────────────────────────────────────────────────────
  {
    handle: 'league-hat',
    stripePrice: 'price_1TbY6PRyk6nmaoL3meKCmmXM',
    title: 'LEAGUE HAT',
    tag: 'APPAREL · Hat',
    price: '$70.00',
    priceNum: 7000,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/DSC03227.jpg?v=1754254529',
    hasSize: false,
    category: 'apparel',
    desc: "Ash Ketchum never made it to the Pokemon League. Genwunner did something worse. The Grunt Hat takes Ash's most iconic piece of headwear and puts spikes on it. Red and white trucker build, green G emblem on the front, chrome spikes along the brim. Same hat. Different energy. Pallet Town's most wanted does not travel light.",
  },

  // ── FLAGS ────────────────────────────────────────────────────────
  {
    handle: 'big-man-flagstoise',
    stripePrice: 'price_1TbXw9Ryk6nmaoL3blBHYOuf',
    title: 'BIG MAN FLAG-STOISE',
    tag: 'FLAG · Limited',
    price: '$35.00',
    priceNum: 3500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/Flagstoise.jpg',
    hasSize: false,
    category: 'flag',
    desc: 'Life. Liberty. Blastoise. The Flagstoise flag puts the most powerful Water-type in Kanto front and center on the Stars and Stripes. Pixel art Blastoise. Full American flag background. The most patriotic thing to come out of Pallet Town. Hang it at the raid. Wave it at the show. Big Man Blastoise is an American institution.',
  },

  // ── STICKERS ─────────────────────────────────────────────────────
  {
    handle: 'kanto-propaganda-pack',
    stripePrice: 'price_1TbYamRyk6nmaoL3bYNAXbtn',
    title: 'KANTO PROPAGANDA PACK #001',
    tag: 'STICKERS · 6 Pack',
    price: '$15.00',
    priceNum: 1500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/Gen-pokespread-sticker.PNG',
    hasSize: false,
    category: 'stickers',
    desc: 'Giovanni ordered these printed. Now they are yours. The Kanto Propaganda Pack includes six stickers pulled straight from the Genwunner universe. Big Man Blastoise full crew illustration, the Pokemon-style Genwunner logo, the Big Man design, Blue Version box art, Red Version box art, and Gen holding a hand full of cards like the operative he is. Stick them everywhere. Spread the regime.',
  },

  // ── POSTERS ──────────────────────────────────────────────────────
  {
    handle: 'big-man-vintage-stoise-poster',
    stripePrice: 'price_1TbYfFRyk6nmaoL3EfyYOsnH',
    title: 'BIG MAN VINTAGE-STOISE POSTER',
    tag: 'POSTER · Art Print',
    price: '$25.00',
    priceNum: 2500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/BMB_MV_POSTER_51926_v2.png',
    hasSize: false,
    category: 'poster',
    desc: 'The original. The one that started it all. Full manga-style Big Man Blastoise poster — Japanese text, Kantonian Fire Department badge, the full crew illustration with Blastoise towering over Genwunner and the squad. This is the artwork that defined PokéRage. Print it. Frame it. Put it on your wall. High quality art print.',
  },
  {
    handle: 'big-man-surf-poster',
    stripePrice: 'price_1TbYiBRyk6nmaoL3O5UdawON',
    title: 'OPEN WATER',
    tag: 'POSTER · Art Print',
    price: '$25.00',
    priceNum: 2500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/BMB_Poster_Edit_2.jpg',
    hasSize: false,
    category: 'poster',
    desc: 'Genwunner and Big Man Blastoise. Open water. Nothing beneath them but sunken ships. Full color illustrated poster — Genwunner riding Blastoise through the ocean, water cannons loaded, coral reef below, blue skies above. The most cinematic piece of PokéRage artwork in existence. High quality art print.',
  },
  {
    handle: 'big-man-la-premier-poster',
    stripePrice: 'price_1TbYmFRyk6nmaoL363uiAKSJ',
    title: 'THE NIGHT IT DROPPED',
    tag: 'POSTER · Event Print',
    price: '$25.00',
    priceNum: 2500,
    image: 'https://cdn.shopify.com/s/files/1/0738/1506/4880/files/CRAZY_BMB_FLIER_MAY21_631pm-1.jpg',
    hasSize: false,
    category: 'poster',
    desc: 'This is history. The official event poster from the Big Man Blastoise music video early screening in Los Angeles, May 21st. Blue and black risograph print aesthetic, Kantonian Fire Department badge, the full crew on stage. A document from the night the music video dropped for the first time. Limited availability. High quality art print.',
  },
]

export const performanceVenues = [
  'Anime NYC', 'Anime Expo', 'MomoCon', 'Otakufest Miami',
  'GalaxyCon Raleigh', 'Anime Impulse OC', 'Collect-A-Con Charlotte',
  'Long Island TCG Show', 'Nerdz & Hip-Hop Mini-Con',
]

export const targetCities = ['Los Angeles', 'Atlanta', 'Chicago', 'New York', 'Houston', 'Dallas']
