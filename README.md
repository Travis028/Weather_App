# Weather App

A simple weather application built with Express.js that provides weather data for different cities.

## Deployment

This application is deployed on Render. To deploy your own instance:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following build and start commands:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Set the following environment variables:
   - PORT: 3000
   - NODE_ENV: production

## API Endpoints

- GET `/api/weather` - Get all weather data
- GET `/api/weather/:city` - Get weather data for a specific city
- POST `/api/weather` - Add new weather data
- PUT `/api/weather/:city` - Update weather data
- DELETE `/api/weather/:city` - Delete weather data

## Project Structure

- `server.js` - Main Express server file
- `db.json` - Weather data storage
- `package.json` - Project dependencies
- `render.yaml` - Render deployment configuration
- `.dockerignore` - Files to exclude from Docker build