# Cozy Corner by Honey

A front-end shop for Honey’s handmade candles. People browse the collection here and reserve a jar on Instagram. The site does not take payment, and the contact form only prepares a note to copy.

Live site: https://candle-making-xi.vercel.app/

Instagram: https://www.instagram.com/cozy_corners_by_honey/

Direct message: https://ig.me/m/cozy_corners_by_honey

This folder: `C:\Users\jaima\Documents\candleMaking`

Current GitHub remote (`origin`): https://github.com/jaiman25400/candleMaking.git

## Purpose

The site is the front of the shop. It shows the real photos, the scent, the size, the burn time, the wax, and the price. Ordering happens in an Instagram conversation with Honey. Nothing on the site charges a card or sends an email.

## Brand rules

- The name in page text is **Cozy Corner** or **Cozy Corner by Honey**. Do not write “corners” in copy.
- The Instagram handle stays `cozy_corners_by_honey`. That is the real account. Do not rename the URL to match the shop name.
- Colors are brown, black, and cream. Fonts are Fraunces for headings and Outfit for body text.
- Do not invent a city, years in business, awards, reviews, or prices.
- Do not put the Jack Daniel’s name in titles, descriptions, or alt text. The Tennessee Whiskey photo keeps the label that is already printed on the glass. The page name is Tennessee Whiskey.
- Photos are Honey’s. They include the “cozycorner by honey” mark in the corner. Show the full photo so that mark is not cropped.

## What a visitor can do

| Page | Path | What it is |
| --- | --- | --- |
| Home | `/` | Hero, a short edit, the rest of the shelf, how to order |
| Collection | `/shop/` | Designs, then the jars already poured |
| Candle | `/shop/[slug]/` | Photo, facts, scent notes or a flavour picker, Instagram reserve |
| Custom | `/custom/` | Mix up to three flavours |
| Studio | `/about/` | A short note about the studio |
| Contact | `/contact/` | A note the visitor copies and sends on Instagram |

Unknown candle links 404. Every real candle slug is generated at build time.

## Catalog rules

There are two kinds of candle.

**Design** (`kind: "design"`) is **$22 CAD**. The look stays as photographed.

- If `lockedScent` is not set, the customer picks one flavour from the list. The page hides the scent notes and shows the flavour picker.
- If `lockedScent` is true, the scent is already in that pour. The page shows Top / Heart / Base and does not offer the flavour list.

**In stock** (`kind: "simple"`) is **$18 CAD**. The scent is already in the jar. There is no flavour picker.

A custom mix is **$22 CAD**, the same as a design. There is no decoration picker and no extra charge.

Prices live in `priceByKind` inside `src/data/candles.ts`. Cards, the facts row, the Instagram note, and the page’s structured data all read that number. Currency is CAD.

`confirmed: false` means size and burn are still placeholders. Do not invent those facts. Today that applies to Daisy Day, Lavender Sprig, Cherry Heart, and Apples & White Cedar.

### Designs

| Name | Slug | Scent on the page |
| --- | --- | --- |
| Iced Coffee | `iced-coffee` | Customer picks a flavour |
| Matcha Berry | `matcha-berry` | Customer picks a flavour |
| Orange Slice | `orange-slice` | Customer picks a flavour |
| Golden Mango & Cream | `golden-mango` | Locked |
| Crisp Draft Pint | `crisp-draft` | Locked |
| Tennessee Whiskey | `tennessee-whiskey` | Locked |
| Holiday Bubble Cubes | `holiday-bubbles` | Locked |
| Blush Heart | `blush-heart` | Customer picks a flavour |
| Daisy Day | `daisy-day` | Customer picks a flavour. Size and burn not confirmed |
| Lavender Sprig | `lavender-sprig` | Customer picks a flavour. Size and burn not confirmed |
| Cherry Heart | `cherry-heart` | Customer picks a flavour. Size and burn not confirmed |

### Already poured

| Name | Slug | Price |
| --- | --- | --- |
| Heirloom Knit | `heirloom-knit` | $18 CAD |
| Smoked Vanilla & Tuberose | `smoked-vanilla-tuberose` | $18 CAD |
| Apples & White Cedar | `apples-and-white-cedar` | $18 CAD. Size and burn not confirmed |

### Flavours

Used by the flavour picker and the custom mix:

Fresh Orange, Peach, Sandalwood Vanilla, Lemon Mint, Jasmine, Rosemary, By the Fireplace, Ocean Breeze, Nordic Berry Birch, Cinnamon Bourbon, Citrus, Fresh Lavender, Rose & Peach, Holiday Spice.

### Custom mix

`src/lib/mix.ts` keeps the shares valid.

- At most 3 flavours.
- One flavour is 100%.
- Two flavours start at 50 / 50.
- Three flavours start at 35 / 35 / 30.
- Each share is at least 10, moves in steps of 5, and the total is always 100.

The note the visitor copies looks like: `Hi Honey — I'd like a custom candle.` plus the flavours and `Price: $22 CAD`.

## Photos

Product photos are portrait, most of them 765×1024. Frames use a 3:4 ratio and `object-fit: contain` so the corner mark stays visible. Do not put a max-height on the product photo. That shrinks the picture on desktop. Do not use `object-fit: cover` on product, card, or studio photos. Cover crops the mark.

The homepage quote band is the wide photo `public/images/evening-light.jpg` (1024×324). The sentence is already in the picture. The HTML quote is for screen readers. The visible caption reads Cozy Corner by Honey.

The homepage hero is `public/images/fruit-pour.jpg`. It is one group photo, not four separate candles.

## How to add or change a candle

1. Put the photo in `public/images/`. Use a short file name such as `golden-mango.jpg`.
2. Add an object to the `candles` array in `src/data/candles.ts`.
3. Set `kind` to `"design"` or `"simple"`.
4. Set `lockedScent: true` only when that design is poured in one scent and should not show the flavour picker.
5. Set `confirmed: false` until Honey has given the real size and burn.
6. Write `scent`, `size`, `burn`, `wax`, `notes`, and `story` from what Honey sent. Do not fill gaps with guessed facts.
7. The shop, sitemap, and contact list pick the candle up from that array. No second list to edit.
8. Open the new page at `http://localhost:3000/shop/your-slug/` and check the photo, the facts, the price, and that the flavour picker is present only when it should be.

## Run it

From `C:\Users\jaima\Documents\candleMaking`:

```bat
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bat
npm run build
npm run lint
```

`npm run build` writes a static site into `out/`. `next.config.ts` sets `output: "export"`, trailing slashes, and unoptimized images so the export can ship the photos as files.

## Stack

- Next.js 15, App Router, React 19, TypeScript
- Static export. No server, no database, no checkout
- SEO: `metadataBase` is the Vercel address, plus `src/app/sitemap.ts`, `src/app/robots.ts`, and JSON-LD on the shop and candle pages
- Local and Vercel builds have no `basePath`
- The GitHub Actions workflow sets `NEXT_PUBLIC_BASE_PATH=/candleMaking` so GitHub Pages can serve the site under that path. The public address to share is the Vercel URL, not the GitHub Pages URL

## Where things live

| Path | Role |
| --- | --- |
| `src/data/candles.ts` | Names, prices, scents, photos, notes |
| `src/lib/site.ts` | Shop name, Instagram links, public URL |
| `src/lib/mix.ts` | Custom flavour shares |
| `src/app/page.tsx` | Home |
| `src/app/shop/page.tsx` | Collection |
| `src/app/shop/[slug]/page.tsx` | One candle |
| `src/app/custom/page.tsx` | Custom mix page |
| `src/components/CustomBuilder.tsx` | Mix controls and the note |
| `src/components/FlavourOrder.tsx` | One flavour for a design |
| `src/components/ProductCard.tsx` | Shelf card |
| `src/app/globals.css` | Layout and photo rules |
| `public/images/` | Photos |
| `.github/workflows/pages.yml` | GitHub Pages build |

## Git

This folder is already a repository on branch `main`. Its remote is:

```bat
origin  https://github.com/jaiman25400/candleMaking.git
```

Commands have to run inside the project folder. `C:\Users\jaima\Documents` is not a git repository, so `git remote add` fails there with `fatal: not a git repository`.

```bat
cd C:\Users\jaima\Documents\candleMaking
git status
git remote -v
```

### Adding https://github.com/jaiman25400/cozycornerbyhoney.git

`origin` is already used. A second remote needs a different name. This keeps the current GitHub repo and also gives a place to push the same project.

```bat
cd C:\Users\jaima\Documents\candleMaking
git remote add cozy https://github.com/jaiman25400/cozycornerbyhoney.git
git remote -v
git push -u cozy main
```

If that new GitHub repo already has its own first commit (the README GitHub created), the push will be rejected because the histories do not match. In that case, do not run `git init` again inside this folder. Either delete the README commit on GitHub and push, or ask before rewriting history.

Do not run the empty-repo steps (`git init`, a new README, `git remote add origin`) inside `candleMaking`. This folder is already initialized, and `origin` already points at `candleMaking.git`.

To keep cozycornerbyhoney as a separate empty project instead of this site:

```bat
cd C:\Users\jaima\Documents
mkdir cozycornerbyhoney
cd cozycornerbyhoney
git clone https://github.com/jaiman25400/cozycornerbyhoney.git .
```

## Deploy

The address in `src/lib/site.ts` (`pagesUrl`) is https://candle-making-xi.vercel.app. Sitemap, canonical links, and structured data use that value. Change it only after a new host exists.

Pushing `main` to `origin` runs `.github/workflows/pages.yml`. That publishes GitHub Pages. It does not update the Vercel site. Vercel updates when the Vercel project is deployed.

Renaming the Vercel project to something like `cozy-corner-by-honey` needs a logged-in Vercel account. Until that URL exists, leave `pagesUrl` on the current address.
