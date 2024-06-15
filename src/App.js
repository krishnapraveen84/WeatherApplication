import './App.css';
import {useState, useRef, useEffect} from  "react";
import { GoMoon } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import Weather from './components/Weather/weather';

// require('dotenv').config();
// const api_key = process.env.API_KEY;
const api_key = "3415bcaecba4d89ac7c210d2e1fb0f4e"

const App = () => {
  const inputRef = useRef();
  const [isDark, setTheme] = useState(false);
  const [isLoading, setState] = useState(true);
  const [weatherData, setWeatherData] = useState([]);

  const onThemeToggle = () => {
    setTheme((isDark) => !isDark)
  }
  

  const getData = async (cityName) => {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json()
        const formattedData = {
          humidity: data.main.humidity,
          temperature: Math.floor(data.main.temp),
          windSpeed: data.wind.speed,
          fellsLike: Math.floor(data.main.feels_like),
          location: data.name,
          imageUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        }
        console.log(formattedData);
        setWeatherData(formattedData);
        setState(false)
    }
    catch(err){
        console.log(err)
    }
  }
  useEffect(() => {
    getData("Visakhapatnam")
    setState(true)
  }, [])
  const toggleClassNames = isDark ? "drakTheme" : "lighTheme";
  const tooggleFontClass = isDark ? "darkFontColor" : null;
  return(
    <div className={`app-container ${toggleClassNames}`}>
      <nav className='nav-bar'>
        <span className={`logo-name ${tooggleFontClass}`}>Weather <img className='logo-img' src='https://res.cloudinary.com/dnwwyvtjx/image/upload/v1718435329/ydsqyv4vom8plelng2y2.png' /></span>
        <div className='search-div'>
          <input ref={inputRef} className='search-bar' type='search' placeholder='Search' />
          <button className='search-btn' onClick={() => getData(inputRef.current.value)}><IoIosSearch className='search-icon' /></button>
        </div>
        <div className='theme-container'>
          <button className='toggle-button' onClick={onThemeToggle}>{isDark ? <CiLight className={`icon ${tooggleFontClass}`} /> : <GoMoon className='icon' /> }</button>
        </div>
      </nav>
      {isLoading ? "Loading........" : <Weather isDark={isDark} data={weatherData}  />}
    </div>
  )
};

export default App;
