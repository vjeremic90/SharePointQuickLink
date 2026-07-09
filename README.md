# SharePoint Quick Links for Blog

An SPFx web part for displaying customizable quick-link cards that point to important pages and sections.

Created for site/blog:
http://vujeremic.blog/

## What This Project Does

- Displays 3 to 6 quick-link cards.
- Each card supports title, URL, tooltip, icon, and optional colors.
- Supports opening links in a new browser tab.
- Includes `sectionTitle` and `brandColor` for visual branding.

## Tech Stack

- SharePoint Framework `1.20.0`
- React `17`
- TypeScript `4.7`
- Gulp build pipeline

## Prerequisites

- Node.js `18.17.x` (recommended: `18.17.1`)
- npm `9+`
- SharePoint Online tenant with App Catalog enabled

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development build:

```bash
gulp serve
```

3. Create production bundle:

```bash
gulp bundle --ship
```

4. Create deployment package:

```bash
gulp package-solution --ship
```

The package is generated in:
`sharepoint/solution/*.sppkg`

## Deploy to SharePoint

1. Upload the `.sppkg` file to your tenant App Catalog.
2. Confirm tenant-wide deployment if needed.
3. Add the web part to a modern SharePoint page.
4. Configure cards, colors, and URLs in the property pane.

## Card Configuration

Each card supports:

- `title`
- `url`
- `tooltip` (optional)
- `iconName`
- `bgColor` (HEX, optional)
- `iconColor` (HEX, optional)
- `titleColor` (HEX, optional)
- `openInNewTab` (true/false)

Example valid HEX value: `#2b5ce6`

## Useful npm Scripts

- `npm run build` -> `gulp bundle`
- `npm run clean` -> `gulp clean`
- `npm run test` -> `gulp test`

## Note

If you change property pane structure or interfaces, run a clean build:

```bash
gulp clean
gulp bundle
```

## Author

- Vukasin Jeremic
- Blog: http://vujeremic.blog/
