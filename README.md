# Rohit Tadikamalla: Work Portfolio

An interactive portfolio that tells a career story through the machines I've worked on.

**Live site:** https://rohittad.github.io/workportfolio/

The six machines from my career stand in a row as live 3D models, each in a three-quarter front view. Hover one and it grows a little; click it and a panel opens with the role, the numbers, the achievements and, for three of them, a case study.

| Stop | Years | Company | Vehicle shown |
|---|---|---|---|
| 1 | 2018 | BMW | BMW X5 M (3D model) |
| 2 | 2020 | Daimler Trucks | Freightliner Cascadia (3D model) |
| 3 | 2021 | Rivian | R1T (original model built in code) |
| 4 | 2023 | Tesla | Cybertruck (3D model) |
| 5 | 2024 | Zoox | Robotaxi (original model built in code) |
| 6 | 2026 | Nomadic AI | The Nomadic AI mark, extruded in 3D |

## What's on the page

1. **Hero and career arc.** My name, the path from engineering to program leadership to product, and a timeline. Clicking a year on the timeline opens that stop.
2. **The lineup.** Six vehicles in a row. Clicking one opens its panel; Prev / Next move between stops and Esc closes it. Each stop has its own link, for example `#tesla`.
3. **Case studies,** inside the Tesla (half-shaft), Rivian (suspension hydraulics) and Zoox (test-asset committee) panels, each written as Context, Problem, Investigation, Decision, Execution, Result.
4. **Toolkit and contact.**

## Run it on your computer

There is nothing to install and no build step. It is plain HTML, CSS and JavaScript.

```bash
git clone https://github.com/rohittad/workportfolio.git
cd workportfolio
python3 -m http.server 8765
```

Then open http://localhost:8765 in your browser.

You need to run it through a small local server like this (rather than double-clicking `index.html`) because the page loads the 3D model files, and browsers block that from a plain file.

## What's in this repo

```
index.html            The whole site: the page, the styles, and the 3D scene code
car.js                A small built-in fallback car, used only if a model file is missing
*.glb                 The 3D vehicle models (compressed)
video/                The Nomadic platform demo clip and its poster image
archive/              Earlier versions of the site, kept for reference
```

The 3D scene uses [Three.js](https://threejs.org), loaded from a CDN. Fonts come from Google Fonts.

## How to change things

Everything lives in `index.html`. You can search for these names:

- **Text and numbers for each stop:** look for `<template id="role-` (`role-bmw`, `role-daimler`, ... `role-nomadic`). The case studies sit inside the Tesla, Rivian and Zoox templates.
- **The captions under each vehicle:** look for `class="slot"`.
- **Which model each slot shows:** look for `const CONFIG = {`. The Rivian, Zoox and Nomadic models are built in code (`buildR1T`, `buildZoox`, `buildNomadic`).
- **Colors and fonts:** look for `:root{` at the top of the file.

Test changes by refreshing `http://localhost:8765` (hold Shift to skip the cache).

### Adding or swapping a 3D model

1. Put a `.glb` file in the repo. Keep it small (a few MB at most). The gltf-transform tool can compress models: `npx @gltf-transform/cli@4 draco in.glb out.glb`.
2. Point that stop's entry in `CONFIG` at the file with `url: "your-file.glb"`.
3. Update the credit line in the footer and the note at the bottom of that stop's template.

If a model faces the wrong way, add `?rot_<key>=180` to the address while testing (for example `?rot_bmw=180`).

## Useful testing options

Add these to the address while testing locally:

| Option | What it does |
|---|---|
| `?rot_bmw=180` | Turns a model around (use the model's key, and 90, 180 or 270) |

## Publishing

The site is published with GitHub Pages straight from the `main` branch (root folder). Changes go live a minute or two after they are merged to `main`.

Please do not commit very large files. GitHub rejects any single file over 100 MB, and the source GIF for the Nomadic clip is ignored for that reason (`gifs/` is in `.gitignore`); the site uses the compressed video in `video/` instead.

## Credits and licenses

3D models are public models used under their licenses. The credit links stay visible in the site footer.

| Model | Author | License |
|---|---|---|
| [2020 BMW X5 M Competition](https://sketchfab.com/3d-models/2020-bmw-x5-m-competition-9b211d525797457e988c903f67d0b753) | David_Holiday | CC BY 4.0 |
| [Freightliner Cascadia 2020](https://sketchfab.com/3d-models/freightliner-cascadia-2020-2dd8eb87823c4eacabfb9d145eff5450) | liebherr996litronic | CC BY 4.0 |
| [Tesla Cybertruck](https://sketchfab.com/3d-models/tesla-cybertruck-f12e67159f75486bb21213e573520612) | Lexyc16 | CC BY 4.0 |

Models were compressed for the web; they were otherwise left as published.

**Everything else is conceptual or original:**

- The **Rivian R1T** and **Zoox robotaxi** are my own models, built in code from public photos and video. They are not Rivian or Zoox CAD and not to scale.
- The **Nomadic AI mark** comes from the logo on nomadicai.com.
- The diagrams in the case studies are conceptual illustrations, not proprietary CAD or drawings.
- The **Nomadic** clip is a screen recording of the platform I work on.

Brand names (BMW, Daimler, Freightliner, Rivian, Tesla, Zoox, Nomadic) belong to their owners. This site is not affiliated with or endorsed by any of them. Details about my work are shared at a level that avoids confidential company information.

## About

Built by Rohit Tadikamalla. I started by designing brackets and suspension components, and ended up building systems for the people building autonomous vehicles.

[LinkedIn](https://www.linkedin.com/in/rohittadikamalla)
