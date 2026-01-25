# GitHub Copilot Instructions for WTWR Project

## Overview
This project is a responsive React application that provides weather-based clothing recommendations. It fetches live weather data and allows users to add and preview clothing items based on the current weather conditions.

## Architecture
- **Main Components**: The application is structured around several key components:
  - `App`: The main component that manages state and renders the header, main content, and footer.
  - `Header`: Displays the logo, current date, and a button to add new clothing items.
  - `Main`: Shows the weather information and clothing items filtered by weather type.
  - `Footer`: Contains copyright information.
  - `ItemCard` and `ItemModal`: Used for displaying individual clothing items and their details.
  - `AddGarmentModal`: A modal for adding new clothing items.

## Developer Workflows
- **Running the Application**: Use the command `npm run dev` to start the development server.
- **Building for Production**: Use `npm run build` to create a production build.
- **Linting**: Run `npm run lint` to check for code quality issues.

## Project Conventions
- **CSS Methodology**: The project uses BEM (Block Element Modifier) for CSS class naming to maintain clarity and avoid conflicts.
- **State Management**: React's built-in state management is used, with hooks like `useState` and `useEffect` for managing component state and side effects.

## Integration Points
- **Weather API**: The application integrates with the OpenWeather API to fetch weather data. Ensure to set your API key and coordinates in `src/utils/constants.js`.
- **Component Communication**: Components communicate through props, with event handlers passed down to child components for actions like opening modals or handling clicks.

## External Dependencies
- **React**: The core library for building the user interface.
- **Vite**: A build tool that provides a fast development environment.
- **Normalize.css**: Used for consistent styling across browsers.

## Example Patterns
- **Modal Handling**: Modals are controlled via state in the `App` component, with conditional rendering based on the active modal state.
- **Filtering Items**: Clothing items are filtered based on the weather type using the `filter` method in the `Main` component.

## Conclusion
These instructions should help AI agents understand the structure and workflows of the WTWR project, enabling them to assist effectively in development tasks.