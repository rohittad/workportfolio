# Rohit Tadikamalla: Work Portfolio

An interactive portfolio that tells a career story through the machines I've worked on.

**Live site:** https://rohittad.github.io/workportfolio/

As you scroll, a 3D vehicle on the right changes to match each stop in my career, while the text on the left explains what I worked on there.

| Stop | Years | Company | Vehicle shown |
|---|---|---|---|
| 1 | 2018 | BMW | BMW X5 M (3D model) |
| 2 | 2020 | Daimler Trucks | Freightliner Cascadia (3D model) |
| 3 | 2021 | Rivian | R1 suspension schematic (built in code) |
| 4 | 2023 | Tesla | Cybertruck (3D model) |
| 5 | 2024 | Zoox | Robotaxi renders (image gallery) |
| 6 | 2026 | Nomadic AI | Platform demo video and overview figure |

Each vehicle highlights the part of the machine that the story is about, for example the body and paint at BMW, or the hydraulic and brake lines at Rivian.

## What's on the page

1. **Hero and career arc.** A one-line thesis and a timeline showing the shift from engineering to program leadership to product.
2. **Career stops.** Each stop has a headline, three key numbers, and an "Explore the work" button that opens the detailed achievements.
3. **How I solve problems.** Three case studies (Cybertruck half-shaft, Rivian suspension hydraulics, Zoox test-asset committee), each written as Context, Problem, Investigation, Decision, Execution, Result.
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
img/zoox/             Zoox robotaxi renders for the Zoox stop
video/                The Nomadic platform demo clip and its poster image
archive/v1/           An earlier version of the site, kept for reference
```

The 3D scene uses [Three.js](https://threejs.org), loaded from a CDN. Fonts come from Google Fonts.

## How to change things

Everything lives in `index.html`. You can search for these names:

- **Text and numbers for each stop:** look for `class="chapter"` (the stops are `data-ch="1"` to `data-ch="6"`).
- **Which vehicle each stop shows, and what it highlights:** look for `const CH = [` (one entry per stop).
- **The vehicle models, credits and captions:** look for `const MODELS = {`.
- **The case studies:** look for `id="selected"`.
- **Colors and fonts:** look for `:root{` at the top of the file.

Test changes by refreshing `http://localhost:8765` (hold Shift to skip the cache).

### Adding or swapping a 3D model

1. Put a `.glb` file in the repo. Keep it small (a few MB at most). The gltf-transform tool can compress models: `npx @gltf-transform/cli@4 draco in.glb out.glb`.
2. Add an entry to `MODELS` with the file name, a caption, and the credit line.
3. Point a stop in `CH` at it with `model: "your-key"`.

If a model faces the wrong way, add `?rot_<key>=180` to the address while testing (for example `?rot_bmw=180`).

## Useful testing options

Add these to the address while testing locally:

| Option | What it does |
|---|---|
| `?delay=150` | Slows model downloads so you can see the loading indicator |
| `?rot_bmw=180` | Turns a model around (use the model's key, and 90, 180 or 270) |
| `?url_bmw=other.glb` | Tries a different file for a model |

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

- The **Rivian suspension** is my own schematic of the system's layout, based on Rivian's public service guideline (RCI-18-23-002-1). It is not Rivian CAD and not to scale.
- The diagrams in the case studies are conceptual illustrations, not proprietary CAD or drawings.
- The **Zoox renders** show a robotaxi 3D model; they are captioned "Zoox robotaxi concept".
- The **Nomadic** clip is a screen recording of the platform I work on.

Brand names (BMW, Daimler, Freightliner, Rivian, Tesla, Zoox, Nomadic) belong to their owners. This site is not affiliated with or endorsed by any of them. Details about my work are shared at a level that avoids confidential company information.

## About

Built by Rohit Tadikamalla. I started by designing brackets and suspension components, and ended up building systems for the people building autonomous vehicles.

[LinkedIn](https://www.linkedin.com/in/rohittadikamalla)
