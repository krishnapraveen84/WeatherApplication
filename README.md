# Weather Application

This is a weather application built using React. It fetches weather data from the OpenWeather API and displays current weather information based on user input (city name).

## Features
- Display current location, temperature, date, and time
- Search functionality to fetch weather data for different locations
- Dark mode and light mode toggle
- Responsive design

## Bonus Features
- Display additional weather details such as humidity, wind speed, and weather description

## Getting Started

To run the application locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/krishnapraveen84/WeatherApplication
    cd weather-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Get your API key from [OpenWeather](https://openweathermap.org/api) and replace `YOUR_API_KEY` in `App.js`.

4. Start the application:
    ```bash
    npm start
    ```

## Known Issues
- Ensure valid city names are entered to fetch the correct weather data.
- Network failures

## Handled Issues
- Handled the Invalid city name input by rendering the NotFound image and text to user
- Handled the Network failures by showing user the message and Retry button to again fatech the data


## Tech Stack Used
> React JS
> JavaScript
> HTMl5
> CSS
> Flex Box
> Media Quires (for responsive websites)

# Thrid-party-packages
> react-loader-spinner

# components
> Weather component

# Scoe OF Improvements
- Adding Multiple cities names and when user clcks on specific city it will show respective details
- Hourly forecast
- Adding maps 

## Deployed the project using Render
- link : https://weatherapplication-u95g.onrender.com/

# Useful websites
- cloudinary (for images)
- colorhunt (for colors)

