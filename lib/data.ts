export type CaseImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  tagline: string;
  industry: string;
  product: string;
  packagingType: string;
  scope: string[];
  accent: string;
  heroImage: CaseImage;
  gallery: CaseImage[];
  dielineImage: CaseImage;
  challenge: string[];
  direction: string[];
  visualStrategy: { title: string; body: string }[];
  system: string;
  production: string[];
  presence: { title: string; body: string }[];
  takeaway: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mitrocore",
    client: "MitroCore",
    title: "MitroCore NAD+ Advanced",
    tagline:
      "Engineering a modern clinical identity for a liposomal cellular-health supplement.",
    industry: "Nutraceuticals",
    product: "MitroCore NAD+ Advanced — liposomal energy & healthy-aging formula",
    packagingType: "Full-wrap label on a low-profile wide-mouth jar",
    scope: [
      "Brand integration",
      "Print-ready artwork",
      "Mechanical dieline",
      "3D render presentation",
      "Lifestyle visuals",
    ],
    accent: "#39B8FD",
    heroImage: {
      src: "/images/work/mitrocore/hero.jpg",
      alt: "Two MitroCore NAD+ Advanced jars side by side, showing the front claims panel and the nurturing-benefits side panel",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/mitrocore/shot-1.jpg",
        alt: "MitroCore jars on a kitchen counter next to a tablet displaying a bioavailability data dashboard",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/mitrocore/shot-2.jpg",
        alt: "A hand lifting the lid off a MitroCore jar on a countertop styled with vanilla pods and citrus",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/mitrocore/shot-3.jpg",
        alt: "MitroCore jars staged in a bright kitchen beside a water pitcher and a bowl of walnuts",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/mitrocore/dieline.jpg",
      alt: "MitroCore label mechanical dieline showing die-cut, bleed, and safe-margin guides across the front and two side panels",
      width: 2200,
      height: 1200,
    },
    challenge: [
      "The supplement category is crowded with dense medical claims and regulatory tables that leave little room for a clean front panel. MitroCore needed to convey bio-scientific rigor — liposomal absorption, NAD+ support — while staying legible on a small e-commerce thumbnail.",
      "The brief called for a systematic panel hierarchy so core benefits wouldn't compete with mandated nutrition and safety copy, and for dieline precision tight enough to survive production without error.",
    ],
    direction: [
      "The direction centers on “Accessible Science”: a desaturated teal/cyan substrate paired with deep slate-blue text, instead of a cold pharmaceutical palette. It reads as pure, hydrating, and biotechnological without losing warmth.",
      "Decorative flourishes were stripped back in favor of generous spacing and purposeful type, positioning MitroCore as a trustworthy daily-health essential.",
    ],
    visualStrategy: [
      {
        title: "Typography & hierarchy",
        body: "A bold geometric wordmark anchors the base of the front panel; “NAD+ ADVANCED” sits in widely spaced uppercase for instant category recognition at a glance.",
      },
      {
        title: "Color architecture",
        body: "Soft desaturated teal against deep slate-blue text keeps contrast high for legibility under variable lighting and meets digital accessibility standards.",
      },
      {
        title: "Front-of-pack structure",
        body: "The 90mm front panel is organized into three tiers — benefit statement, supporting claims, and pill-shaped dosage badges (500mg Liposomal, 60 Capsules).",
      },
      {
        title: "Graphic system",
        body: "Custom line-art icons carry bioavailability, lab-testing, and digestion claims on the side panels, cutting visual noise while speeding up label scanning.",
      },
    ],
    system:
      "The label wraps as a continuous three-panel system engineered for cylindrical jar geometry: a 90mm front panel carries the brand mark and hero claim; a 65mm left panel holds brand story, usage directions, and safety copy; a 65mm right panel carries the nurturing narrative and the standardized Supplement Facts table.",
    production: [
      "Total trim size: 230mm × 45mm",
      "Total bleed size: 236mm × 51mm (3mm perimeter extension)",
      "Safe margin: 3mm inward buffer protecting text from die-cut variance",
      "Dieline stroke: 0.25pt overprint on a dedicated non-printing layer",
      "Layer separation: dieline, background art, visual elements, live text",
    ],
    presence: [
      {
        title: "E-commerce & digital",
        body: "High-contrast type and clear badge structure keep the product name, dosage, and core claim legible even scaled down to a 100px thumbnail.",
      },
      {
        title: "Countertop presence",
        body: "The muted palette lets the jar sit naturally on a kitchen counter, supporting daily-habit visibility rather than fighting for attention.",
      },
    ],
    takeaway:
      "Structured panel hierarchy and accurate dieline engineering let MitroCore satisfy every regulatory requirement while still reading as a premium, trustworthy daily supplement — on screen and on the shelf.",
  },
  {
    slug: "natur-paws",
    client: "Natur Paws",
    title: "Natur Paws Grain-Free Dog Food",
    tagline:
      "A playful, character-led packaging system for a premium grain-free dog food line.",
    industry: "Pet Care",
    product: "Complete grain-free dog food — Free Run Chicken",
    packagingType: "Resealable flat-bottom gusset pouch, 2kg",
    scope: [
      "Character illustration system",
      "Flat dieline artwork",
      "3D product mockups",
      "E-commerce & lifestyle presentation",
    ],
    accent: "#8B5CF6",
    heroImage: {
      src: "/images/work/natur-paws/hero.jpg",
      alt: "A golden retriever resting its chin above a Natur Paws pouch propped in a lavender-toned dog bowl surrounded by toys",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/natur-paws/shot-1.jpg",
        alt: "Natur Paws pouch front, back, and side gusset panels shown together to demonstrate panel continuity",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/natur-paws/shot-2.jpg",
        alt: "Natur Paws pouch styled flat-lay style beside raw chicken, lavender, and a rope toy",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/natur-paws/dieline.jpg",
      alt: "Natur Paws flat dieline artwork showing the front, gussets, back panel, and zipper mechanics at 135mm x 265mm",
      width: 2200,
      height: 1200,
    },
    challenge: [
      "Premium pet care packaging tends to swing between clinical veterinary imagery and generic natural cues that all blend together. Natur Paws needed to read as high quality and grain-free without losing the playful bond between owner and dog.",
      "The pack also had to communicate three layers at a glance — brand, protein variant, and health benefits — while wrapping cleanly around a multi-panel gusset pouch that gets handled and stacked from every angle.",
    ],
    direction: [
      "A cheerful, modern aesthetic built around custom dog illustrations balances soft lavender with warm yellow and royal purple accents, landing on friendly-yet-premium.",
      "Soft organic wave shapes split the background sections, keeping the layout relaxed while still separating visual assets from technical body copy.",
    ],
    visualStrategy: [
      {
        title: "Typography",
        body: "A chunky, rounded custom wordmark carries friendly high visibility; a clean geometric sans handles secondary information for legibility at any distance.",
      },
      {
        title: "Color",
        body: "A tri-color identity — lilac canvas, warm yellow and purple accents, deep purple wordmark — drives shelf recognition and contrast.",
      },
      {
        title: "Layout & hierarchy",
        body: "“FREE RUN CHICKEN” anchors the top fold, the oversized “NATUR PAWS” wordmark commands the middle, and a speech-bubble badge closes with functional benefits: joint & bone, skin & coat, immune support.",
      },
    ],
    system:
      "Playful dog characters extend across panel edges so the brand stays intact even when bags are packed tightly side by side. Side gussets carry oversized vertical typography and paw/bone iconography for shelf-stack visibility.",
    production: [
      "Structural dieline: 135mm × 265mm per main panel with integrated zipper seal",
      "Zipper & tear-notch geometry accounted for in the top 35mm",
      "Bleed and safety margins extended beyond cut lines for clean edge continuity",
      "Back panel configured for guaranteed-analysis tables, ingredient decks, and barcode placement",
    ],
    presence: [
      {
        title: "Retail shelf",
        body: "High-contrast color balance and character-driven art stand out against more muted competitor packaging.",
      },
      {
        title: "E-commerce",
        body: "The bold typographic hero area keeps the brand mark and “Grain-Free” claim readable even at small thumbnail scale.",
      },
    ],
    takeaway:
      "Balancing emotional, character-driven illustration with strict panel continuity let Natur Paws work as an active brand ambassador — on shelf, on screen, and in the home.",
  },
  {
    slug: "instant-love",
    client: "Tony & Linda",
    title: "Maruchan Instant Love",
    tagline:
      "Reworking an iconic mass-market cup-noodle wrap into a bespoke wedding-favor keepsake.",
    industry: "Custom & Event Packaging",
    product: "Personalized noodle-cup sleeve — “Tony & Linda Flavor”",
    packagingType: "Printed cardstock outer sleeve for a cup container",
    scope: [
      "Packaging redesign & parody brand strategy",
      "Production artwork & dieline layout",
      "3D rendering & mockups",
      "Contextual lifestyle mockups",
    ],
    accent: "#FF0A45",
    heroImage: {
      src: "/images/work/instant-love/hero.jpg",
      alt: "Front and back of the custom Maruchan Instant Love cup sleeve, showing the couple's photo and the personalized nutrition facts panel",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/instant-love/shot-1.jpg",
        alt: "The Instant Love cup styled on a kitchen table beside a steaming bowl of noodles",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/instant-love/shot-2.jpg",
        alt: "A hand holding the Instant Love cup with a wedding ring visible on the finger",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/instant-love/shot-3.jpg",
        alt: "The Instant Love cup on a marble counter beside a velvet ring box and dried lavender",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/instant-love/shot-4.jpg",
        alt: "Front and back of the Instant Love cup staged on a wooden table with scattered rice and a gold fork",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/instant-love/shot-1.jpg",
      alt: "Instant Love cup sleeve in context on a warm kitchen table",
      width: 2000,
      height: 1500,
    },
    challenge: [
      "Translating a universally recognized mass-market wrap into a personal keepsake demands extreme fidelity to the source system's hierarchy, weight, and spatial balance while completely replacing the messaging with new photography and copy.",
      "The flat sleeve also had to wrap cleanly around a tapered cup: once folded and taped, every panel boundary needed to stay square and continuous.",
    ],
    direction: [
      "The direction balances nostalgic familiarity with personal storytelling — keeping the iconic yellow field, red swoosh, and blocky type so the format is instantly recognizable, then rewriting every line for the couple.",
      "“Instant Lunch” becomes “Instant Love™” with an interlocking-ring motif; the cook-time callout becomes “Ready in 13 Years”; the flavor line becomes a heritage callout celebrating the couple's shared background.",
    ],
    visualStrategy: [
      {
        title: "Typography",
        body: "High-contrast bold sans with white strokes and drop shadows matches classic food-packaging convention, keeping the parody legible and authentic.",
      },
      {
        title: "Color",
        body: "The saturated yellow and orange-red gradient leans on decades of comfort-food familiarity, so the format reads as authentic rather than a generic template.",
      },
      {
        title: "Layout & hierarchy",
        body: "The wordmark and ring icon anchor the top; the flavor callout curves across a central red banner; couple photography sits level with product imagery so emotion and product context carry equal weight.",
      },
    ],
    system:
      "The design runs as a continuous four-panel wrap (front, top, back, adhesive flap) calculated for a tapered cup. The back panel replaces regulatory copy with a wedding-photo filmstrip, a personalized “Nutrition Facts” table (Love 100%, Laughter 150%), and an event date stamp.",
    production: [
      "Dieline continuity marked with fold and bleed/crop guides",
      "A dedicated “Kleen Stick” adhesive zone for clean hand or mechanical assembly",
      "Panel geometry oriented for the cup's curve and taper to avoid distortion once glued",
      "Structural margins protect the closing line (“Warning: highly addictive when enjoyed together”) from trim or seam loss",
    ],
    presence: [
      {
        title: "In hand",
        body: "Paper weight and clean panel transitions give the sleeve a tactile, retail-grade feel despite being a one-off run.",
      },
      {
        title: "On screen",
        body: "High color contrast and bold black-and-white type keep the design legible in portfolio galleries and social presentation decks.",
      },
    ],
    takeaway:
      "Packaging is a complete physical and visual system, not just a graphic — whether it's a retail CPG line or a one-off keepsake, the discipline is the same: structural accuracy, brand hierarchy, and production boundaries.",
  },
  {
    slug: "dumbbell-nuts",
    client: "Dumbbell Nuts",
    title: "Dumbbell Nuts Flavored Cashews",
    tagline:
      "A scalable, color-coded packaging system across a multi-SKU gourmet cashew line.",
    industry: "Gourmet Snacks",
    product: "Flavored roasted cashews & nut specialties",
    packagingType: "Stand-up pouch, 250g",
    scope: [
      "Brand identity",
      "Multi-SKU dieline system",
      "3D rendering",
      "Retail & lifestyle presentation",
    ],
    accent: "#E8A33D",
    heroImage: {
      src: "/images/work/dumbbell-nuts/hero.jpg",
      alt: "Five Dumbbell Nuts cashew pouches in a row on a wooden café counter, each in a different flavor colorway",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/dumbbell-nuts/shot-1.jpg",
        alt: "The full Dumbbell Nuts flavor lineup — black pepper, pudina, chilli-flakes, chocolate, and white plain — on a pink backdrop",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/dumbbell-nuts/shot-2.jpg",
        alt: "A hand holding the chilli-flakes cashew pouch to show in-hand pack scale",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/dumbbell-nuts/shot-3.jpg",
        alt: "A shopper's hand reaching for a Dumbbell Nuts pouch on a supermarket spice-aisle shelf",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/dumbbell-nuts/dieline.jpg",
      alt: "Dumbbell Nuts black pepper cashew stand-up pouch technical dieline with gusset and zipper measurements",
      width: 2200,
      height: 1200,
    },
    challenge: [
      "Gourmet snacks compete against mass-market brands leaning on food photography and niche artisanal brands that often lack shelf structure. Dumbbell Nuts needed both: an artisanal, home-made origin story and a structured, trustworthy health-snack identity.",
      "The system also had to flex across five distinct flavor profiles — from savory pudina and black pepper to sweet chocolate and cashew laddoo — without losing brand cohesion, and to hold up at both retail-shelf distance and e-commerce thumbnail scale.",
    ],
    direction: [
      "The pack splits horizontally into two zones: an illustrative base telling an origin story, and a functional upper zone for branding, flavor ID, and ingredient callouts.",
      "Hand-drawn illustrations of cashew harvesters against an idyllic landscape establish hand-crafted quality; bold typography and clean color-blocking up top anchor the brand in a modern wellness context.",
    ],
    visualStrategy: [
      {
        title: "Typography",
        body: "An arched-ribbon logotype, uppercase sans flavor designations, and an expressive brush script for “CASHEW” give the range a market-stall energy without losing structure.",
      },
      {
        title: "Color architecture",
        body: "Each flavor gets its own coding — leaf green for pudina, soft pink for chilli-flakes, muted taupe for chocolate, slate grey for black pepper, crisp teal for white plain crunchy.",
      },
      {
        title: "Imagery",
        body: "A continuous harvester landscape unifies the range across every SKU, while floating ingredient overlays at the top seal instantly signal flavor.",
      },
      {
        title: "Regulatory layout",
        body: "A structured back-panel grid holds an ingredient benefit diagram, standardized Nutrition Facts, FSSAI licensing, and barcode placement.",
      },
    ],
    system:
      "The lineup runs on a modular visual matrix — top seal flavor graphic, branding zone, color-coded flavor banner, brush-script product name, and illustrative base — so every new SKU can slot in while keeping full brand recognition.",
    production: [
      "Pouch dimensions: 160mm total width (145mm printable body) × 230mm total height",
      "45mm bottom gusset for shelf stability",
      "13mm resealable zipper closure, 25mm below the top edge",
      "7.5mm side seals, 19mm top cut area",
      "Barcodes and batch codes locked to flat, non-flexing zones above the gusset",
    ],
    presence: [
      {
        title: "Retail shelf",
        body: "Contrasting flavor banners create horizontal bands across multi-pack displays, pulling the eye across the whole range at once.",
      },
      {
        title: "E-commerce",
        body: "The clean vertical hierarchy and oversized brush typography keep “CASHEW” readable even at mobile thumbnail size.",
      },
    ],
    takeaway:
      "A repeatable visual system — not just an attractive layout — let Dumbbell Nuts bridge home-made authenticity with commercial shelf performance, and gives the brand a flexible base for future SKUs.",
  },
  {
    slug: "hyggeoxy",
    client: "Hyggeoxy",
    title: "Hyggeoxy Ceramic Bakeware",
    tagline:
      "A warm, trustworthy packaging architecture for non-toxic ceramic baking sheets.",
    industry: "Kitchenware",
    product: "Ceramic non-stick baking sheet, 15\" × 10\"",
    packagingType: "Rigid folding carton",
    scope: [
      "Packaging architecture",
      "Dieline engineering",
      "3D rendering",
      "Lifestyle presentation",
    ],
    accent: "#A35D43",
    heroImage: {
      src: "/images/work/hyggeoxy/hero.jpg",
      alt: "Hyggeoxy baking sheet carton front and back mockups showing roasted meat and blueberry cookie photography",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/hyggeoxy/shot-1.jpg",
        alt: "Hyggeoxy carton standing on a wooden kitchen counter beside a potted herb and fresh tomatoes",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/hyggeoxy/shot-2.jpg",
        alt: "A mother and daughter baking cookies in a home kitchen with the Hyggeoxy carton placed in the foreground",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/hyggeoxy/dieline.jpg",
      alt: "Hyggeoxy rigid carton flat dieline file showing fold lines, glue flaps, and panel layout",
      width: 2200,
      height: 1200,
    },
    challenge: [
      "Bakeware packaging tends to land at one of two extremes: over-technical, industrial aesthetics with no home warmth, or purely decorative designs that fail to communicate material safety and performance.",
      "The carton needed to carry several differentiators at once — ceramic non-stick properties, non-toxic manufacturing, commercial-grade durability — without turning into a cluttered wall of claims.",
    ],
    direction: [
      "Warm, organic visual texture pairs with a crisp, structured information layout. A subtle parchment background reinforces the home-baking experience rather than a lab-coat one.",
      "Rather than lead with utility messaging alone, the system leans into the emotional comfort of wholesome cooking, anchoring the brand around safety, wellness, and culinary reliability.",
    ],
    visualStrategy: [
      {
        title: "Typography",
        body: "A high-contrast serif display pairs with clean sans-serifs for structured hierarchy and fast legibility.",
      },
      {
        title: "Color palette",
        body: "Textured cream parchment is anchored by deep terracotta and warm mahogany brown.",
      },
      {
        title: "Imagery",
        body: "A dual-photography strategy shows savory roasted meats on the front and sweet baked goods on the back, covering both use cases at a glance.",
      },
      {
        title: "Iconography",
        body: "Custom circular badges call out Non-Toxic, Uniform Temp, Easy to Clean, and Non-Stick.",
      },
    ],
    system:
      "A precision tuck-end outer carton accounts for fold allowances, glue flaps, and panel orientation, with an inverted top-flap logo for a premium unboxing moment and vertical side-panel type for warehouse stacking clarity.",
    production: [
      "Carton dimensions: 38.7 × 25.8 × 3 cm",
      "Tuck-end structure with fold-allowance and glue-flap mapping",
      "Inverted top-flap logo print for unboxing presentation",
      "Vertical side-panel typography for warehouse stacking clarity",
    ],
    presence: [
      {
        title: "Retail & e-commerce",
        body: "High-contrast titles and clear iconography stay readable across physical displays and thumbnail-scale screens alike.",
      },
      {
        title: "In the home",
        body: "Contextual lifestyle imagery reinforces the emotional connection to home baking rather than positioning the product as a lab-tested commodity.",
      },
    ],
    takeaway:
      "When visual hierarchy, technical transparency, and lifestyle positioning work together, a box becomes an active sales interface — a clear signal of product quality across every touchpoint.",
  },
  {
    slug: "carolina-rice",
    client: "Carolina",
    title: "Carolina Jasmine Rice",
    tagline:
      "Elevating a commodity grain staple into a premium retail brand experience.",
    industry: "Food & Beverage Staples",
    product: "Enriched Thai Fragrant Long Grain Jasmine Rice (Thai Hom Mali)",
    packagingType: "Flexographic printed pouch with bottom gusset",
    scope: [
      "Packaging system",
      "Pre-press & dieline",
      "3D mockups",
      "Renders",
    ],
    accent: "#4C2882",
    heroImage: {
      src: "/images/work/carolina-rice/hero.jpg",
      alt: "Carolina Jasmine Rice pouch standing against a dark purple backdrop with a spoon and scattered grains",
      width: 2000,
      height: 1500,
    },
    gallery: [
      {
        src: "/images/work/carolina-rice/shot-1.jpg",
        alt: "Carolina Jasmine Rice pouch on a kitchen counter beside a bowl of steamed rice, curry pot, and fresh herbs",
        width: 2000,
        height: 1500,
      },
      {
        src: "/images/work/carolina-rice/shot-2.jpg",
        alt: "Carolina Jasmine Rice pouch on a wooden board with dried rice stalks and scattered grains",
        width: 2000,
        height: 1500,
      },
    ],
    dielineImage: {
      src: "/images/work/carolina-rice/dieline.jpg",
      alt: "Carolina Jasmine Rice pouch dieline diagram showing bleed, trim, and crease guides across front, side, and back panels",
      width: 2200,
      height: 1200,
    },
    challenge: [
      "Commodity rice packaging often suffers from visual clutter, weak brand distinction, and poor functional communication, forcing shoppers to choose between generic budget brands and hard-to-read imports.",
      "The redesign needed to establish category authority at retail distance, showcase grain quality directly, and present clear preparation and nutrition data on the secondary panels — without alienating an everyday household audience.",
    ],
    direction: [
      "The direction centers on “Serene Authenticity”: an illustrated landscape silhouette of rice fields, a farmer, and a rising sun conveys origin and the aromatic character of Thai Hom Mali rice.",
      "Deep violet and lavender hues replace the standard red-and-green grain-packaging convention, creating instant shelf differentiation.",
    ],
    visualStrategy: [
      {
        title: "Typography & hierarchy",
        body: "A custom high-contrast serif carries the “CAROLINA” brand mark with historical authority; “JASMINE” sits in a prominent tracked serif; sub-descriptors run in a crisp sans for a clean vertical stack.",
      },
      {
        title: "Color & category distinction",
        body: "A regal violet-to-lavender palette signals rich quality and exotic origin; a golden sun emblem draws the eye to the pack's center.",
      },
      {
        title: "Integrated window",
        body: "Rather than a plain die-cut window, the grain window is framed by an arched mountain-and-field contour, so the rice itself becomes part of the landscape illustration while still proving grain quality.",
      },
    ],
    system:
      "The purple rice-field silhouette flows continuously across the front, both side gussets, and the back panel. The back panel carries an eight-step cooking guide, full Nutrition Facts, barcode, and distributor details; an oval gusset base lets the bag stand upright with balanced weight.",
    production: [
      "Custom flexographic dieline: 17.1083 in × 8.9123 in with a 6.0392 in bottom gusset",
      "Full 0.125 in bleed safety margin to prevent white margins during die-cutting and bag forming",
      "Continuous wrap-around visuals across front, gussets, and back",
      "Structured back-panel grid for the cooking guide, nutrition table, and barcode",
    ],
    presence: [
      {
        title: "Retail shelf",
        body: "Bold color blocking and the violet silhouette create a strong footprint even under variable store lighting.",
      },
      {
        title: "Digital thumbnail",
        body: "High contrast between the violet lower panel and light lavender header keeps the pack identifiable at 100px thumbnail sizes on grocery and delivery platforms.",
      },
    ],
    takeaway:
      "Strategic differentiation, physical functionality, and production precision turned an everyday grain staple into a high-value product system built to win on shelf and perform from factory floor to kitchen counter.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const industries = Array.from(
  new Set(caseStudies.map((c) => c.industry)),
);

export const siteConfig = {
  name: "Chopra Creative",
  shortName: "Chopra",
  tagline: "Packaging design studio",
  description:
    "Chopra Creative is a packaging design studio: brand identity, structural dielines, 3D visualization, and retail-ready artwork for food, supplement, and consumer goods brands.",
  email: "contact@chopracreatives.com",
  url: "https://chopracreative.example.com",
};

export const processSteps = [
  {
    number: "01",
    title: "Identity & Creative Direction",
    body: "We start from the product's category and audience, then build the visual language — palette, type, illustration or photography style — that will carry across every panel and SKU.",
  },
  {
    number: "02",
    title: "Structural Dieline & Pre-Press",
    body: "Every pack is engineered to exact trim, bleed, and safe-margin specs for its structure — pouch, jar label, or rigid carton — with layers separated for clean production handoff.",
  },
  {
    number: "03",
    title: "3D Visualization",
    body: "Flat vector artwork is built into photorealistic 3D renders so material finish, seam alignment, and panel wrapping can be validated before a single unit is printed.",
  },
  {
    number: "04",
    title: "Retail & Digital Presence",
    body: "Every system is checked at two extremes: full-size on a physical shelf, and scaled down to a 100px e-commerce thumbnail — so the brand holds up everywhere it will actually be seen.",
  },
];

export const capabilities = [
  {
    title: "Brand & Label Design",
    body: "Wordmarks, color architecture, and front-of-pack hierarchy built to differentiate on a crowded shelf.",
  },
  {
    title: "Structural Dieline Engineering",
    body: "Print-ready mechanical files for pouches, jar labels, and rigid cartons — trim, bleed, gussets, and zippers specified to the millimeter.",
  },
  {
    title: "3D Product Rendering",
    body: "Photorealistic mockups that validate material, lighting, and panel wrap before a production run is committed.",
  },
  {
    title: "Retail & Lifestyle Presentation",
    body: "Contextual imagery and thumbnail-scale checks so packaging performs in-store and in a scrolling feed.",
  },
];

export const readinessChecklist = [
  "Does your front panel survive being scaled down to a thumbnail, or does it rely on reading at arm's length?",
  "Is your packaging system consistent across every SKU in the line, or did each flavor get designed in isolation?",
  "Do you have a production-ready dieline — trim, bleed, and safe margins — or only a flat visual comp?",
  "Have you seen the pack in 3D before committing to a print run?",
];
