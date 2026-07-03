# 💱 Money Convertor

A responsive, single-page currency conversion web app with live exchange rates, historical rate charting, and a scrolling ticker of INR conversion rates against world currencies. Built with vanilla JavaScript, Highcharts, and a neumorphic design system.

## ✨ Features

- **Live Currency Conversion** — Convert between 150+ world currencies using real-time exchange rate data, with automatic flag icons for each currency.
- **Bidirectional Sync** — Type an amount in either the "From" or "To" field and the other updates automatically. A swap button instantly flips both currencies and amounts.
- **Historical Rate Chart** — An interactive Highcharts line/area chart plots the USD → INR exchange rate over time, with a date picker to jump to a custom start date and pinch/drag zoom support.
- **Live Rate Ticker** — A sidebar marquee streams INR conversion rates against every supported currency, with up/down/neutral trend icons, pausing on hover.
- **Scroll-Reveal Animations** — Sections fade and slide into view as the user scrolls, using the Intersection Observer API.
- **Animated Navigation** — A sticky nav bar with a sliding "pill" highlight that tracks the hovered link.
- **Contact Form** — A styled contact section with name, email, and message fields (front-end only).
- **Fully Responsive** — Layout adapts for tablet/mobile with a dedicated breakpoint under 992px.

## 🗂️ Project Structure

```
├── index.html          # Main landing page (Overview, Converter, Charts, Contact)
├── css/
│   └── style.css        # Neumorphic design system, layout & animations
└── js/
    ├── load.js           # Scroll-reveal (IntersectionObserver) logic
    ├── slide.js           # Sliding nav pill hover effect
    ├── convertor.js       # Currency converter logic (ES module)
    ├── list.js            # Currency code ↔ country code map + currency display names (ES module)
    ├── graph.js           # Highcharts historical exchange rate chart
    └── chart.js           # Base API URL reference for chart data
```

> **Note:** `index.html` references scripts from `./css/style.css` and `./js/...`, so make sure your local folder layout matches (a `css/` folder and a `js/` folder alongside `index.html`), or update the paths to match your structure.

## 🔌 APIs Used

| Purpose | API |
|---|---|
| Live exchange rates | [open.er-api.com](https://www.exchangerate-api.com/) — `https://open.er-api.com/v6/latest/{currency}` |
| Historical exchange rates (chart) | [Frankfurter API](https://frankfurter.dev/) — `https://api.frankfurter.dev/v2/rates?base=USD&from={date}&quotes=INR` |
| Currency flag icons | [FlagsAPI](https://flagsapi.com/) — `https://flagsapi.com/{COUNTRY_CODE}/flat/64.png` |
| Charting | [Highcharts](https://www.highcharts.com/) (loaded via CDN) |
| Icons | [Font Awesome 7](https://fontawesome.com/) (loaded via CDN) |

No API keys are required for any of the above endpoints.

## 🚀 Getting Started

1. Clone or download this repository.
2. Make sure the folder structure matches the script/stylesheet paths in `index.html` (a `css/` folder for `style.css` and a `js/` folder for the JS files), or adjust the `<link>`/`<script>` paths.
3. Since `convertor.js` and `list.js` use ES module imports, you'll need to serve the project through a local web server rather than opening `index.html` directly via `file://` (module imports are blocked under the `file://` protocol by most browsers). For example:

   ```bash
   # Using Python
   python3 -m http.server 5500

   # Using Node (http-server package)
   npx http-server -p 5500
   ```

4. Open `http://localhost:5500` in your browser.

## 🖱️ Usage

- **Convert currencies:** Enter an amount in the "From" field, choose your source and target currencies from the dropdowns, and the converted amount appears instantly in the "To" field.
- **Swap currencies:** Click the rotate/swap icon between the two fields to flip currencies and amounts.
- **View historical rates:** Scroll to the "Analytical Charts" section, pick a start date, and the chart updates to show the USD → INR rate trend from that date. Click-and-drag (or pinch on touch devices) to zoom into a specific range.
- **Browse live rates:** Watch the scrolling sidebar for a full list of INR exchange rates against other currencies, with trend indicators.

## 🎨 Design System

The UI uses a custom **neumorphic** aesthetic defined via CSS variables in `style.css`:

- Soft-extruded panels (`.neumorphic-flat-panel`) and inset input fields (`.neumorphic-inset`)
- A rose/burgundy color palette (`--prm--clr`, `--oth-clr`) with warm accents (`--lght--clr`)
- Smooth cubic-bezier entrance and scroll-reveal animations throughout

## 🛠️ Built With

- HTML5 / CSS3 (custom properties, flexbox, media queries)
- Vanilla JavaScript (ES Modules, `fetch`, Intersection Observer)
- [Highcharts](https://www.highcharts.com/)
- [Font Awesome](https://fontawesome.com/)

## ⚠️ Known Notes / Limitations

- The contact form is front-end only and doesn't currently submit to a backend or email service.
- `chart.js` currently only holds a reference API URL and isn't wired into the app — the live chart logic lives entirely in `graph.js`.
- Exchange rate accuracy depends on the uptime/rate limits of the free third-party APIs listed above.

## 📄 License

This project doesn't currently specify a license. Add one (e.g., MIT) if you plan to share or open-source it.

## 📬 Contact

- Email: Kunalbrham@gmail.com
- LinkedIn: [linkedin.com/in/kunal-brham](https://linkedin.com/in/kunal-brham)
