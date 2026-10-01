export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type Insight = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  topic: string;
  readingMinutes: number;
  keywords: string[];
  relatedService: { label: string; href: string };
  relatedWork: string[];
  blocks: InsightBlock[];
};

export const insights: Insight[] = [
  /* ---------------------------------------------------------------------
   * 1. Packaging hierarchy
   * ------------------------------------------------------------------- */
  {
    slug: "packaging-hierarchy-design",
    title:
      "Packaging Hierarchy: What a Shopper Must Understand First, Second, and Third",
    description:
      "How to plan packaging hierarchy so shoppers grasp what the product is, why it is different, and what to check next, on shelf and in a thumbnail.",
    excerpt:
      "Every front panel answers questions in a fixed order. Hierarchy is the decision about which question gets answered first, and which can wait.",
    topic: "Hierarchy",
    readingMinutes: 3,
    keywords: [
      "product packaging design",
      "packaging hierarchy",
      "supplement packaging design",
    ],
    relatedService: { label: "Product Launch", href: "/services#product-launch" },
    relatedWork: ["mitrocore", "natur-paws"],
    blocks: [
      {
        type: "p",
        text: "Most packaging problems I get asked to fix are not color problems or font problems. They are order problems. The front panel is trying to say six things at the same volume, so the shopper hears none of them. Good product packaging design starts by deciding what someone must understand first, second, and third, and then designing so that order is impossible to misread.",
      },
      { type: "h2", text: "First: what is this?" },
      {
        type: "p",
        text: "The first read is category and product. Before a shopper cares about your brand story, they need to know they are looking at the right kind of thing. A dog food that reads like a treat, or a supplement that reads like a skincare jar, loses the shopper before the brand gets a chance.",
      },
      {
        type: "p",
        text: "On the MitroCore label, the line \"NAD+ ADVANCED\" sits in widely spaced uppercase for exactly this reason: category recognition comes before anything else. On Natur Paws, the protein variant, \"FREE RUN CHICKEN\", anchors the top of the pouch so the shopper knows which recipe they are holding at a glance.",
      },
      { type: "h2", text: "Second: why this one?" },
      {
        type: "p",
        text: "The second read is the reason to choose it over the product next to it. This is usually the brand mark plus one hero claim. It is not a list of benefits. One claim, stated plainly, at a size that holds up at arm's length.",
      },
      {
        type: "p",
        text: "Natur Paws puts an oversized wordmark in the middle of the pack. MitroCore organizes its 90mm front panel into three tiers: a benefit statement, supporting claims, then pill-shaped dosage badges. Each tier is visibly smaller and quieter than the one above it, so the eye moves down rather than around.",
      },
      { type: "h2", text: "Third: can I trust it, and does it fit me?" },
      {
        type: "p",
        text: "The third read is proof and fit: dose, count, weight, flavor, key certifications, functional benefits. This information matters, but it only gets read once the first two questions are answered. It belongs in a structured, consistent zone, often badges or a short benefit row, not scattered across the panel.",
      },
      {
        type: "list",
        items: [
          "Tier 1: category and product name, readable at shelf distance and at thumbnail size.",
          "Tier 2: brand mark and a single differentiating claim.",
          "Tier 3: dose, count, variant details and benefit badges, grouped together.",
          "Everything else: side and back panels, where regulatory and story copy can breathe.",
        ],
      },
      {
        type: "callout",
        text: "If everything on the front panel is important, nothing is. Rank every element before you design any of them, and let the size, weight and position of each piece reflect its rank.",
      },
      { type: "h2", text: "Moving the rest off the front" },
      {
        type: "p",
        text: "The hardest part of hierarchy is deciding what leaves the front panel. Supplement packaging design is a good test because the category carries dense claims and mandated tables. On MitroCore, brand story, directions and safety copy moved to a 65mm left panel, and the nurturing narrative and Supplement Facts table moved to a 65mm right panel. The front panel stayed clean because the side panels were planned to do real work.",
      },
      {
        type: "p",
        text: "A simple test helps here: shrink the front panel to the size of a phone thumbnail and look at it for two seconds. If you can name the product and the reason to buy it, the hierarchy is working. If you can only see a logo and a texture, it is not.",
      },
      {
        type: "p",
        text: "Hierarchy is usually the first thing I settle when a new product is heading to market, before palette or illustration. If you are preparing a launch and want the front panel planned in that order from day one, that is the core of the Product Launch engagement.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 2. Production-ready artwork
   * ------------------------------------------------------------------- */
  {
    slug: "production-ready-packaging-artwork",
    title:
      "Production-Ready Packaging Artwork: What Print-Ready Actually Requires",
    description:
      "What production-ready packaging artwork actually includes: exact trim, bleed, safe margins, separated layers and live text a printer can work with.",
    excerpt:
      "A good-looking comp is not a print file. Here is what separates artwork that looks finished from artwork a printer can actually run.",
    topic: "Production",
    readingMinutes: 3,
    keywords: [
      "production ready packaging design",
      "packaging artwork",
      "print-ready packaging",
    ],
    relatedService: {
      label: "Production-Ready Packaging Design",
      href: "/production-ready-packaging-design",
    },
    relatedWork: ["mitrocore", "carolina-rice"],
    blocks: [
      {
        type: "p",
        text: "\"Print-ready\" gets used loosely. A lot of files described that way are really presentation comps: the design is resolved, but nothing about it has been set up for a press, a die-cutter, or a bag-forming line. Production ready packaging design means the file can go to a printer and come back as the thing you approved, without someone re-engineering it along the way.",
      },
      { type: "h2", text: "The dimensions are exact, not approximate" },
      {
        type: "p",
        text: "Packaging artwork is built to the structure, not to a page size. Trim size is the finished, cut size of the piece. Bleed is artwork extended past that trim so a small shift in cutting never leaves a white edge. Safe margin is the inward buffer that keeps text and key graphics away from the cut.",
      },
      {
        type: "p",
        text: "On the MitroCore jar label, the trim is 230mm x 45mm, the bleed size is 236mm x 51mm (a 3mm extension on every side), and a 3mm safe margin protects text from die-cut variance. On the Carolina rice pouch, a flexographic job, the full artwork carries a 0.125in bleed to prevent white margins during die-cutting and bag forming. The numbers differ because the structures and print processes differ. What matters is that they are specified, not guessed.",
      },
      { type: "h2", text: "Layers are separated by job" },
      {
        type: "p",
        text: "A printer needs to switch things on and off. The dieline should never print. Text may need last-minute edits. Background art may need to be adjusted for a different substrate. If everything sits on one flattened layer, none of that is possible without rebuilding the file.",
      },
      {
        type: "list",
        items: [
          "Dieline: on its own non-printing layer. MitroCore uses a 0.25pt overprint stroke on a dedicated layer.",
          "Background art: full-bleed color fields, textures and illustration.",
          "Visual elements: product imagery, icons, badges, logos.",
          "Live text: kept editable and separate so copy changes do not touch the artwork.",
        ],
      },
      { type: "h2", text: "Structure-specific zones are respected" },
      {
        type: "p",
        text: "Every structure has areas where artwork behaves differently. Seals, zippers, gussets, glue flaps and folds all affect what can safely sit where. A barcode that wraps over a flexing gusset may not scan. A claim that sits on a glue flap disappears once the carton is assembled. Print-ready artwork accounts for these zones before the design is approved, not after the proof comes back wrong.",
      },
      {
        type: "callout",
        text: "A file is print-ready when a printer can run it without asking you a question about trim, bleed, layers or what sits on a seal. If they have to ask, the file was a comp.",
      },
      { type: "h2", text: "What I check before handoff" },
      {
        type: "list",
        items: [
          "Trim and bleed match the printer's or converter's dieline exactly.",
          "No text or key graphic sits inside the safe margin.",
          "The dieline is on a non-printing layer and clearly labeled.",
          "Barcodes and mandatory copy sit on flat, stable areas of the structure.",
          "Text is live or clearly outlined per the printer's instructions.",
        ],
      },
      {
        type: "p",
        text: "Each of these is small on its own. Together they are the difference between a smooth first run and a reprint. Your printer will always have the final word on their own specs, so confirm them early and build to them.",
      },
      {
        type: "p",
        text: "If you have a design you like but are not sure it would survive a press, that gap is exactly what the Production-Ready Packaging Design service is built to close.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 3. Dielines
   * ------------------------------------------------------------------- */
  {
    slug: "packaging-dieline-design",
    title: "Packaging Dieline Design: What a Dieline Is and What Belongs on It",
    description:
      "A practical guide to packaging dieline design: cut and fold lines, gussets, seals, zippers, glue flaps, and why the dieline lives on its own layer.",
    excerpt:
      "The dieline is the technical drawing your artwork has to obey. Understanding what it shows changes how you design every panel.",
    topic: "Dielines",
    readingMinutes: 3,
    keywords: [
      "packaging dieline design",
      "packaging dieline",
      "production ready packaging design",
    ],
    relatedService: {
      label: "Production-Ready Packaging Design",
      href: "/production-ready-packaging-design",
    },
    relatedWork: ["dumbbell-nuts", "hyggeoxy"],
    blocks: [
      {
        type: "p",
        text: "A dieline is the flat technical drawing of your package: every cut, fold, seal and panel, laid out at actual size. It is what the die-cutter, the folder-gluer or the pouch converter works from. Your artwork sits on top of it, and it has to obey it. Packaging dieline design is the work of making those two things agree.",
      },
      { type: "h2", text: "What a dieline shows" },
      {
        type: "p",
        text: "At minimum, a dieline marks where the piece is cut and where it folds. Depending on the structure, it also shows the parts of the pack that will never be seen flat, or that behave differently once filled and sealed.",
      },
      {
        type: "list",
        items: [
          "Cut lines: the outer trim of the piece.",
          "Fold or crease lines: where panels bend.",
          "Bleed and safe margin guides.",
          "Seals and seal widths on pouches.",
          "Gussets: the folded sides or base that give a pouch or bag its depth.",
          "Zipper and tear-notch positions on resealable packs.",
          "Glue flaps and tuck flaps on cartons.",
        ],
      },
      { type: "h2", text: "A pouch example" },
      {
        type: "p",
        text: "The Dumbbell Nuts stand-up pouch shows how much a dieline decides. The pouch is 160mm wide in total, but only 145mm of that is printable body. There is a 45mm bottom gusset for shelf stability, a 13mm resealable zipper set 25mm below the top edge, 7.5mm side seals and a 19mm top cut area.",
      },
      {
        type: "p",
        text: "Each of those numbers removes space from the design or changes what can live there. Barcodes and batch codes on that line are locked to flat, non-flexing zones above the gusset, because a code that bends with the base is a code that may not scan.",
      },
      { type: "h2", text: "A carton example" },
      {
        type: "p",
        text: "Cartons bring a different set of constraints. The Hyggeoxy bakeware carton is a tuck-end structure at 38.7 x 25.8 x 3 cm, with fold allowances and glue flaps mapped on the dieline. Panel orientation matters too: the top-flap logo is printed inverted on the flat so it reads correctly when the box is opened, and side-panel type runs vertically for warehouse stacking. None of that is obvious from a front-panel mockup. All of it is visible on the dieline.",
      },
      {
        type: "callout",
        text: "Design on the dieline from the start, not on a rectangle that gets fitted to a dieline later. Most panel-continuity and placement problems come from that one shortcut.",
      },
      { type: "h2", text: "Why the dieline sits on its own layer" },
      {
        type: "p",
        text: "The dieline is reference, not artwork. It should be drawn as a thin stroke on a dedicated, non-printing layer, clearly named, so it can be switched off for plates and switched on for checking. When a dieline is merged into the artwork, it can end up printed on the pack, or deleted by accident along with something else.",
      },
      {
        type: "p",
        text: "Where possible, start from the converter's or printer's own dieline rather than drawing one from scratch. They know their machine tolerances. Your job is to build artwork that respects them.",
      },
      {
        type: "p",
        text: "If you have a structure chosen but no clean, layered dieline yet, the Production-Ready Packaging Design service covers dieline implementation alongside the artwork itself.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 4. Common mistakes
   * ------------------------------------------------------------------- */
  {
    slug: "packaging-design-mistakes",
    title: "Common Packaging Design Mistakes That Fail on Shelf or on Press",
    description:
      "The packaging design mistakes I see most often, from crowded front panels to text in the bleed, and how to catch them before a print run or launch.",
    excerpt:
      "Most packaging failures are predictable. They fall into two groups: the pack does not communicate, or the file does not survive production.",
    topic: "Production",
    readingMinutes: 3,
    keywords: [
      "packaging design mistakes",
      "product packaging design",
      "food packaging design",
    ],
    relatedService: {
      label: "Product Launch Audit",
      href: "/services#product-launch-audit",
    },
    relatedWork: ["carolina-rice", "hyggeoxy"],
    blocks: [
      {
        type: "p",
        text: "Packaging fails in two places. It fails on shelf when a shopper cannot tell what it is or why to pick it. It fails on press when the file was never built for the structure it is printed on. The mistakes behind both are predictable, which means most of them can be caught before money is spent on a print run.",
      },
      { type: "h2", text: "Mistakes that fail on shelf" },
      {
        type: "list",
        items: [
          "Every claim at the same size, so nothing leads.",
          "A brand mark that dominates while the product type is hard to find.",
          "Following category color conventions so closely that the pack disappears among competitors.",
          "Low contrast that looks refined on a monitor and muddy under store lighting.",
          "Variant information (flavor, size, dose) that is too small to tell SKUs apart.",
        ],
      },
      {
        type: "p",
        text: "The color point deserves a note. Following conventions helps shoppers recognize a category, but copying them exactly makes you invisible inside it. The Carolina jasmine rice pouch moved to deep violet and lavender instead of the familiar red-and-green grain-packaging palette. It still reads as rice because the illustration and the grain window do that job, so the color is free to differentiate.",
      },
      { type: "h2", text: "Mistakes that fail on press" },
      {
        type: "list",
        items: [
          "Artwork that stops at the trim line, with no bleed.",
          "Text or logos placed inside the safe margin, where die-cut variance can clip them.",
          "Barcodes on seals, gussets or curved areas that flex or distort.",
          "The dieline merged into the artwork instead of sitting on a non-printing layer.",
          "Panels designed flat without checking how they read once folded or filled.",
        ],
      },
      {
        type: "p",
        text: "These are rarely design-skill problems. They come from designing the front panel in isolation, then fitting it to a structure at the end. By then, the claim that needed to sit on the front is half on a glue flap.",
      },
      { type: "h2", text: "Too much on the front, not enough on the back" },
      {
        type: "p",
        text: "A common mixed failure: every differentiator gets pushed onto the front panel, and the back panel becomes an afterthought. Hyggeoxy had several things to say at once: ceramic non-stick, non-toxic manufacturing, commercial-grade durability. Instead of a wall of claims, the carton uses four circular badges (Non-Toxic, Uniform Temp, Easy to Clean, Non-Stick) and a dual-photography approach, with savory dishes on the front and baked goods on the back. The message is split across panels by role, not crammed onto one.",
      },
      {
        type: "callout",
        text: "Check every pack twice before approval: once scaled down to a thumbnail to test communication, and once on the flat dieline to test production. Most failures show up in one of those two views.",
      },
      { type: "h2", text: "Catching them early" },
      {
        type: "p",
        text: "In food packaging design and most other categories, a 3D render of the actual structure is one of the cheapest checks available. It shows whether panels line up across folds, whether wrap-around art stays continuous, and whether key copy survives the curve or the gusset. It does not replace a printer's proof, but it catches a lot before you get there.",
      },
      {
        type: "p",
        text: "If you already have packaging and want a clear read on what is working and what is not before you reprint or launch, the Product Launch Audit is a focused review of exactly these points.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 5. Amazon packaging design
   * ------------------------------------------------------------------- */
  {
    slug: "amazon-packaging-design",
    title:
      "Amazon Packaging Design: Making a Pack Work as a Main Image and Thumbnail",
    description:
      "How to design packaging that still reads as an Amazon main image and a small search thumbnail, from front-panel hierarchy to contrast and shape.",
    excerpt:
      "On Amazon, your package is often the main image. That means the front panel has to work at a size far smaller than anyone designs at.",
    topic: "Amazon",
    readingMinutes: 3,
    keywords: [
      "Amazon packaging design",
      "ecommerce product design",
      "product packaging design",
    ],
    relatedService: {
      label: "Product Launch Audit",
      href: "/services#product-launch-audit",
    },
    relatedWork: ["mitrocore", "carolina-rice"],
    blocks: [
      {
        type: "p",
        text: "For many products sold on Amazon, the main image is simply the package, photographed or rendered on a white background. That makes Amazon packaging design less about a separate marketplace style and more about whether the pack itself can do its job at a few hundred pixels, or less, in a crowded search grid.",
      },
      { type: "h2", text: "The main image is your package, small" },
      {
        type: "p",
        text: "Amazon's main image rules are stricter than the rest of the listing. The widely documented basics are a pure white background and the product filling most of the frame, with limits on added text and graphics. The details change over time, so check Amazon's current image requirements for your category before you shoot or render anything.",
      },
      {
        type: "p",
        text: "The practical consequence is that you cannot rely on overlays to explain the product in the main image. The front panel has to explain it on its own. If the pack only makes sense at arm's length, it will not make sense in search results.",
      },
      { type: "h2", text: "Design for the thumbnail, then check the shelf" },
      {
        type: "p",
        text: "I check every front panel scaled down to roughly a 100px thumbnail. It is a blunt test, and it is useful. On MitroCore, high-contrast type and a clear badge structure were chosen so the product name, dosage and core claim stay legible at that size. On Carolina, the contrast between the violet lower panel and the light lavender header keeps the pack identifiable at thumbnail scale on grocery and delivery platforms.",
      },
      {
        type: "list",
        items: [
          "Can you read the product name without zooming?",
          "Is the product type obvious from shape, color and one or two words?",
          "Does one clear block of contrast hold the eye, or does the pack turn to texture?",
          "Can a shopper tell your variants apart side by side?",
        ],
      },
      { type: "h2", text: "What survives at small sizes" },
      {
        type: "p",
        text: "Fine detail, thin type, low-contrast palettes and long claims are the first things to go. What survives is large type, strong value contrast between zones, a recognizable silhouette and a simple, repeatable layout. None of that requires a loud design. MitroCore uses a muted, desaturated palette and still reads, because contrast and spacing do the work rather than saturation.",
      },
      {
        type: "callout",
        text: "On Amazon, the front panel is the ad, the label and the main image at once. If it does not read at thumbnail size, no amount of secondary imagery will fully make up for it.",
      },
      { type: "h2", text: "Render-ready from the start" },
      {
        type: "p",
        text: "Because the main image is so often a render or a studio shot of the pack, the artwork should be built so it can be rendered cleanly: accurate dieline, correct proportions, panel wrap that holds on a curved or gusseted form. A pouch that looks flat and lifeless in a render will look the same in search.",
      },
      {
        type: "p",
        text: "Shape matters here too. A jar, pouch or carton photographed straight on gives different amounts of usable front panel. Design the main face knowing which angle the main image will use.",
      },
      {
        type: "p",
        text: "If your product is already on Amazon and you suspect the pack is not reading at search size, the Product Launch Audit reviews packaging and Amazon presentation together and gives you a prioritized list of what to change.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 6. Amazon product images
   * ------------------------------------------------------------------- */
  {
    slug: "amazon-product-images",
    title:
      "Amazon Product Images: The Job of the Main Image and Each Secondary Image",
    description:
      "How to plan Amazon product images: the main image for the click, then secondary images that each answer one buyer question with clear infographic logic.",
    excerpt:
      "A strong image stack is not seven nice pictures. It is a sequence where each image answers one question a buyer has before they purchase.",
    topic: "Amazon",
    readingMinutes: 3,
    keywords: [
      "Amazon product images",
      "Amazon packaging design",
      "ecommerce product design",
    ],
    relatedService: {
      label: "Brand Growth System",
      href: "/services#brand-growth-system",
    },
    relatedWork: ["hyggeoxy", "mitrocore"],
    blocks: [
      {
        type: "p",
        text: "An Amazon listing gives you a main image and a set of secondary images. Treating them as a gallery of attractive shots wastes most of that space. The better approach is to treat the stack as a sequence: the main image earns the click, and each secondary image answers one question a buyer has before they commit.",
      },
      { type: "h2", text: "The main image earns the click" },
      {
        type: "p",
        text: "The main image has one job: make the product recognizable and appealing in search results. Its rules are the strictest on the listing, typically a pure white background with the product filling most of the frame. Check Amazon's current image requirements before producing it. For packaged goods, this is usually the pack itself, which is why the front panel's hierarchy matters so much.",
      },
      { type: "h2", text: "Secondary images answer questions" },
      {
        type: "p",
        text: "Once a shopper is on the listing, they are trying to resolve doubts. Each secondary image should take one doubt and resolve it. A useful way to plan them is to write the buyer's questions first, then assign one image per question.",
      },
      {
        type: "list",
        items: [
          "What exactly do I get? Contents, count, size, what is in the box.",
          "Why this one? The two or three key benefits, stated plainly.",
          "How does it work or how do I use it? Steps, directions, preparation.",
          "Will it fit my life? Scale, in-use or lifestyle context.",
          "Can I trust it? Ingredients, materials, certifications you can actually substantiate.",
          "Which option is right for me? Variants, sizes or flavors compared.",
        ],
      },
      { type: "h2", text: "Infographic logic" },
      {
        type: "p",
        text: "Infographic images fail when they try to say everything. A good one has a single headline, a small number of supporting points, and a visual that proves the point rather than decorating it. Icons help when they are consistent and labeled. They hurt when they are generic and unexplained.",
      },
      {
        type: "p",
        text: "The packaging often already contains this logic. Hyggeoxy's carton uses four circular badges (Non-Toxic, Uniform Temp, Easy to Clean, Non-Stick) to carry its differentiators without a wall of copy. MitroCore's side panels use custom line-art icons for bioavailability, lab-testing and digestion claims. Those systems translate directly into benefit images: same icons, same language, more room to explain.",
      },
      {
        type: "callout",
        text: "Plan the image stack as a list of buyer questions before you design a single frame. If an image does not answer one of them, it is taking a slot from one that would.",
      },
      { type: "h2", text: "Keep the visual language consistent" },
      {
        type: "p",
        text: "Secondary images should look like they came from the same brand as the package. Same type, same palette, same icon style, same tone. When the infographics are built in a different visual language from the pack, the listing feels assembled rather than designed, and the shopper has to re-learn the brand on every image.",
      },
      {
        type: "p",
        text: "Remember that many shoppers browse on a phone. Headlines need to be large, points few, and text kept well clear of the edges.",
      },
      {
        type: "p",
        text: "Building packaging and Amazon imagery from one shared system is the center of the Brand Growth System. The image stack is planned from the same hierarchy and assets as the pack, so they reinforce each other.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 7. Amazon A+ Content
   * ------------------------------------------------------------------- */
  {
    slug: "amazon-a-plus-content-design",
    title:
      "Amazon A+ Content Design: Extending Your Packaging System into Modules",
    description:
      "How to approach Amazon A+ Content design as an extension of your packaging system: shared hierarchy, palette, icons and panel logic, module by module.",
    excerpt:
      "A+ Content works best when it feels like the package unfolded onto the page. Your packaging system already contains most of what you need.",
    topic: "Amazon",
    readingMinutes: 3,
    keywords: [
      "Amazon A+ content design",
      "Amazon packaging design",
      "ecommerce product design",
    ],
    relatedService: {
      label: "Brand Growth System",
      href: "/services#brand-growth-system",
    },
    relatedWork: ["natur-paws", "hyggeoxy"],
    blocks: [
      {
        type: "p",
        text: "A+ Content gives brand owners extra space below the main listing to explain the product with images and structured modules. It is easy to treat that space as a separate design project with its own look. I think that is a mistake. Good Amazon A+ content design reads like the package unfolded onto the page.",
      },
      { type: "h2", text: "Start from the packaging system, not a template" },
      {
        type: "p",
        text: "A well-built pack already has the parts A+ needs: a type system, a palette, an icon set, a hierarchy of claims, and supporting copy organized by panel. Rather than inventing new assets for each module, map what the package already has onto the modules available to you.",
      },
      {
        type: "list",
        items: [
          "Brand header: the wordmark and the front-panel hero claim.",
          "Benefit modules: the pack's badges or icon set, given more room to explain.",
          "How-to or usage modules: the directions or preparation steps from the back panel.",
          "Comparison modules: the variant or SKU system, side by side.",
          "Story modules: the brand narrative that usually lives on a side panel.",
        ],
      },
      {
        type: "p",
        text: "Module types, dimensions and text rules are set by Amazon and change over time, so confirm the current options in Seller Central before you design. The mapping above holds regardless of the exact module set.",
      },
      { type: "h2", text: "Translate panel logic into scroll logic" },
      {
        type: "p",
        text: "A package is read in a rough order: front, then side, then back. A+ is read top to bottom. The translation is fairly direct. The front panel's first and second reads become the top modules. Supporting proof follows. Detailed or regulatory-style information sits lower, where interested buyers will find it.",
      },
      {
        type: "p",
        text: "Natur Paws is a useful illustration of the source material. The pouch already separates three layers at a glance: brand, protein variant and functional benefits (joint and bone, skin and coat, immune support). Its playful dog characters extend across panel edges so the brand holds together from any angle. That same continuity, characters and wave shapes carried across module boundaries, is what keeps a long A+ scroll feeling like one piece.",
      },
      { type: "h2", text: "Imagery with a clear role" },
      {
        type: "p",
        text: "Every image in A+ should earn its slot. Hyggeoxy's carton shows one way to assign roles: savory roasted dishes on the front, sweet baked goods on the back, so both use cases are covered without crowding either panel. In A+, that becomes two clearly separated use-case modules rather than one busy collage.",
      },
      {
        type: "callout",
        text: "If someone could swap your A+ modules onto a competitor's listing without anything looking out of place, the content is not connected to your packaging system closely enough.",
      },
      { type: "h2", text: "Design for mobile first" },
      {
        type: "p",
        text: "A+ modules are often viewed on a phone, where text inside images can become very small. Keep embedded text short and large, keep key messages in live text fields where the module allows it, and check every module at phone width before publishing.",
      },
      {
        type: "p",
        text: "When packaging and A+ are designed together from the same system, each one strengthens the other. That joined-up approach is what the Brand Growth System is built around.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 8. Multi-SKU systems
   * ------------------------------------------------------------------- */
  {
    slug: "multi-sku-packaging-system",
    title:
      "Packaging Systems for Multiple SKUs: Building a Modular Matrix That Scales",
    description:
      "How to build a multi-SKU packaging system: fixed and variable zones, color coding by variant, and a modular matrix that lets new products slot in.",
    excerpt:
      "A product line needs a system, not five separate designs. The trick is deciding what stays fixed and what is allowed to change.",
    topic: "SKU systems",
    readingMinutes: 3,
    keywords: [
      "multi-SKU packaging system",
      "food packaging design",
      "product packaging design",
    ],
    relatedService: {
      label: "Brand Growth System",
      href: "/services#brand-growth-system",
    },
    relatedWork: ["dumbbell-nuts"],
    blocks: [
      {
        type: "p",
        text: "When a brand has one product, packaging is a design problem. When it has five, it becomes a systems problem. Each new flavor, size or formula has to look like part of the same family while being easy to tell apart. Designing each SKU on its own almost always breaks one of those two goals.",
      },
      { type: "h2", text: "Separate fixed zones from variable zones" },
      {
        type: "p",
        text: "The first step is deciding which parts of the pack never change and which parts carry the variant. Fixed zones build brand recognition across the range. Variable zones do the work of telling SKUs apart. If too much is variable, the range stops looking like a family. If too little is, shoppers grab the wrong one.",
      },
      {
        type: "p",
        text: "The Dumbbell Nuts cashew range runs on a modular visual matrix with five parts: a top-seal flavor graphic, a branding zone, a color-coded flavor banner, a brush-script product name, and an illustrative base. The branding zone, the brush script and the harvester landscape at the base stay consistent. The flavor graphic and the banner color change per SKU.",
      },
      { type: "h2", text: "Color coding that does real work" },
      {
        type: "p",
        text: "Color is the fastest way to separate variants, but only if each color is assigned deliberately and kept distinct. On Dumbbell Nuts, each flavor has its own coding:",
      },
      {
        type: "list",
        items: [
          "Pudina: leaf green.",
          "Chilli-flakes: soft pink.",
          "Chocolate: muted taupe.",
          "Black pepper: slate grey.",
          "White plain crunchy: crisp teal.",
        ],
      },
      {
        type: "p",
        text: "Because the banners sit in the same position on every pouch, a row of mixed flavors forms horizontal bands across the shelf. The eye can take in the whole range at once and then find the one it wants. That only works because the position is fixed and only the color moves.",
      },
      {
        type: "callout",
        text: "Hold the layout still and let one or two elements change per SKU. A system is recognizable because most of it does not move.",
      },
      { type: "h2", text: "Build for the SKU you have not launched yet" },
      {
        type: "p",
        text: "A system is only as good as its next addition. Before finalizing, test it: invent a sixth variant and see if it slots in cleanly. Is there a color left that is distinct from the others? Does the product name fit the same zone if it is longer? Does the ingredient overlay at the top seal still work for a less photogenic flavor?",
      },
      {
        type: "p",
        text: "Production matters here too. Keeping one dieline and one back-panel grid across the range (Dumbbell Nuts uses a structured back panel for the ingredient diagram, Nutrition Facts, FSSAI licensing and barcode) means each new SKU is mostly an artwork swap, not a new engineering job.",
      },
      { type: "h2", text: "Check the system in both places it lives" },
      {
        type: "p",
        text: "In food packaging design especially, a range is judged on a shelf and in a scrolling list of thumbnails. The Dumbbell Nuts layout keeps a clean vertical hierarchy and oversized brush typography so \"CASHEW\" stays readable at mobile thumbnail size, while the banners handle variant recognition up close.",
      },
      {
        type: "p",
        text: "If you are planning a line rather than a single product, or adding SKUs to a range that was never designed as a system, the Brand Growth System includes a SKU system built to scale with you.",
      },
    ],
  },

  /* ---------------------------------------------------------------------
   * 9. Packaging to ecommerce
   * ------------------------------------------------------------------- */
  {
    slug: "packaging-to-ecommerce-visual-system",
    title:
      "From Packaging to Ecommerce: One Visual System from Pack to Product Page",
    description:
      "How to carry one visual system from packaging into Amazon, Shopify and other product pages, so every touchpoint uses the same hierarchy and assets.",
    excerpt:
      "Packaging, marketplace images and your own store are usually designed separately. They work better when they are built from one system.",
    topic: "Ecommerce",
    readingMinutes: 3,
    keywords: [
      "ecommerce product design",
      "Shopify product design",
      "Amazon packaging design",
    ],
    relatedService: {
      label: "Brand Growth System",
      href: "/services#brand-growth-system",
    },
    relatedWork: ["carolina-rice", "dumbbell-nuts"],
    blocks: [
      {
        type: "p",
        text: "Most brands get their visual identity in pieces. Packaging is designed by one person, Amazon images by another, the Shopify store by a third. Each piece can be good on its own and the whole still feels disconnected. The fix is not more design. It is designing everything from one system that starts with the package.",
      },
      { type: "h2", text: "Why the package is the source" },
      {
        type: "p",
        text: "Packaging is the most constrained piece. It has fixed dimensions, regulatory copy, a print process and a physical structure. When the system holds up under those constraints, it will hold up almost anywhere. Starting from a website and trying to squeeze it onto a pouch tends to go badly. Starting from the pouch and expanding outward tends to go well.",
      },
      {
        type: "p",
        text: "A well-built pack also hands you the parts ecommerce needs: a type hierarchy, a palette with known contrast, an icon set, a set of claims already ranked by importance, and imagery or illustration that defines the brand's world.",
      },
      { type: "h2", text: "What carries over" },
      {
        type: "list",
        items: [
          "Hierarchy: the front panel's first, second and third reads become the order of your product page.",
          "Color architecture: brand colors, plus variant colors for multi-SKU lines.",
          "Typography: the same faces and weights, adjusted for screen sizes.",
          "Icons and badges: the same set, used on pack, in listing images and on the product page.",
          "Illustration or photography style: one world, not three.",
        ],
      },
      {
        type: "p",
        text: "Carolina is a good example of an asset that travels. Its purple rice-field silhouette flows continuously across the front, both gussets and the back panel. A landscape built to wrap around a pouch is also a ready-made banner, background or section divider for a product page. Dumbbell Nuts' flavor colors work the same way: the codes that separate pouches on a shelf can separate variants in a product selector.",
      },
      { type: "h2", text: "What has to adapt" },
      {
        type: "p",
        text: "Some things do not translate directly. Back-panel text is set for reading in hand, not on a phone. Dense regulatory layouts need to become clean, scannable sections. Ecommerce product design also needs assets the pack never had: lifestyle scenes, scale shots, in-use steps and comparison graphics. These should still be built from the system, not invented from scratch for each channel.",
      },
      {
        type: "callout",
        text: "A shopper who sees your product on a shelf, in a search result and on your own store should feel they are looking at the same brand each time, without having to think about it.",
      },
      { type: "h2", text: "Shopify and Amazon are different jobs" },
      {
        type: "p",
        text: "On Amazon, you work inside a fixed listing format and compete next to other products. On your own store, you control the whole page and the shopper is already there for you. Shopify product design can go deeper into story, the range and use cases. Both should draw from the same system, but the content emphasis is different.",
      },
      {
        type: "p",
        text: "Building packaging, Amazon creative and Shopify product creative as one connected system is what the Brand Growth System is for. It starts with the pack and carries it through to every page where the product is sold.",
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}
