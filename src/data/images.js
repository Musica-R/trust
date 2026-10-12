// Unsplash images: swap any ID here to change a picture site-wide
const u = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// Local trust photos for the gallery: /public/assets/trust1.jpeg to trust25.jpeg
const GALLERY_COUNT = 24;
const trust = (n) => `/assets/trust${n}.jpeg`;

export const img = {
  hero: u("1488521787991-ed7bbaae773c", 1800),
  about: u("1559027615-cd4628902d4a"),
  activities: u("1469571486292-0ba58a3f068b"),
  dialysis: u("1579684385127-1ef15d508118"),
  oldAge: u("1447069387593-a5de0862481e"),
  gallery: u("1532629345422-7515f3d16bb6"),
  contact: u("1516307365426-bea591f05011"),
  support: u("1576765608535-5f04d1e3f289", 900),
};

const HELP_EXT = "jpeg";

const helpNames = [
  "food",
  "trust15",
  "cl",
  "bedred.jpg",
  "kid.jpg", // card 5: dialysis / kidney care
  "trust18",
];

export const helpImgs = helpNames.map((name) =>
  name.includes(".") ? `/assets/${name}` : `/assets/${name}.${HELP_EXT}`
);

export const gallery = Array.from(
  { length: GALLERY_COUNT },
  (_, i) => trust(i + 1)
);


const HOME_GALLERY_NUMBERS = [21, 6, 10, 14, 19];

export const homeGallery = HOME_GALLERY_NUMBERS.map(trust);