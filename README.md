# WTWR (What to Wear?)

WTWR is a responsive React app that shows the current weather for a configured location and recommends clothing items based on the weather type. Users can preview items in a modal and open a form modal to add new garments.

## Features
- Fetches live weather data from OpenWeather
- Displays city name and current temperature
- Filters clothing items by weather type (hot / warm / cold)
- Item preview modal
- Add garment modal (form UI)
- Modals close on overlay click and Escape key
- Responsive layout (flex-wrap cards)

## Tech Stack
- React
- Vite
- JavaScript
- CSS (BEM methodology)
- OpenWeather API
- GitHub Pages (GitHub Actions)

## Getting Started

### Install dependencies
    npm install

### Run locally
    npm run dev

### Build for production
    npm run build

### Preview the production build
    npm run preview

## Environment / API Setup
This project uses the OpenWeather API. Set your API key and coordinates in the project where expected (for example in `src/utils/constants.js`).

Typical values used:
- `weatherApiKey`
- `latitude`
- `longitude`

## Deployment (GitHub Pages)
This repo is deployed to GitHub Pages using a GitHub Actions workflow.

- Repo: https://github.com/serjykalstryke/se_project_react
- Live site: https://serjykalstryke.github.io/se_project_react/
