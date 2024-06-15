import './App.css';
import {useState, useEffect} from  "react";
import { GoMoon } from "react-icons/go";
import { CiLight } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import Weather from './components/Weather/weather';
import {ColorRing} from 'react-loader-spinner'


const api_key = "3415bcaecba4d89ac7c210d2e1fb0f4e"


const status = {
  inprogress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
  notFound: "NOTFOUND"
}

const App = () => {
  const [isDark, setTheme] = useState(false);
  const [state, setState] = useState(status.inprogress);
  const [weatherData, setWeatherData] = useState([]);
  const [value, setValue] = useState("");
  const onChangeInput = (event) => {
    setValue(event.target.value)
  }

  const onThemeToggle = () => {
    setTheme((isDark) => !isDark)
  }
  

  const getData = async (cityName) => {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;
        const response = await fetch(url);
        
        if (response.ok){
          const data = await response.json()
          const formattedData = {
            humidity: data.main.humidity,
            temperature: Math.floor(data.main.temp),
            windSpeed: data.wind.speed,
            fellsLike: Math.floor(data.main.feels_like),
            location: data.name,
            imageUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

          }
          console.log(response);
          setWeatherData(formattedData);
          setState(status.success)
        }
        else{
          setState(status.notFound)
        }
    }
    catch(err){
        console.log(err)
        setState(status.fail)
    }
  }
  useEffect(() => {
    setState(status.inprogress)
    getData("Visakhapatnam")
    
  }, [])
  const onSubmitSearchQuery = () => {
    if (value){
      setState(status.inprogress)
      getData(value)
      setValue("")
    }
    
    
  }
  const toggleClassNames = isDark ? "drakTheme" : "lighTheme";
  const tooggleFontClass = isDark ? "darkFontColor" : null;
  const date = new Date()
  // console.log(date)
  const renderLoader =  () =>{
    return(
        <div className='loader-container'><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    )
  }
  const notFound = () => {
    return( 
      <div className='not-found-div'>
        <p className='error-mesg'>City Not FOund!</p>
        <img className='not-found-img' src='https://res.cloudinary.com/dnwwyvtjx/image/upload/v1718439368/zuulnec45xvr07xduifn.jpg' />
      </div>
    )
  }
  const FailedToFetch = () => {
    return( 
      <div className='not-found-div'>
        <p className='error-mesg'>Failed To Fetch !</p>
        <img className='not-found-img' src='https://res.cloudinary.com/dnwwyvtjx/image/upload/v1718444128/d42rypolaz9atgkact0o.jpg' />
        <button className='retry-btn' onClick={() => getData("Rajahmundry")}>Retry</button>
      </div>
    )
  }
  
  
  const renderDiffStates = () => {
    switch(state){
      case status.inprogress:
        return renderLoader()
      case status.success:
        return <Weather isDark={isDark} data={weatherData} />
      case status.fail:
        return FailedToFetch()
      case status.notFound:
        return notFound()
    }
  }



  return(
    <div className={`app-container ${toggleClassNames}`}>
      <nav className='nav-bar'>
        <span className={`logo-name ${tooggleFontClass}`}>Weather <img className='logo-img' src='https://res.cloudinary.com/dnwwyvtjx/image/upload/v1718435329/ydsqyv4vom8plelng2y2.png' /></span>
        <div className='search-div'>
          <input className='search-bar' type='text' value={value} placeholder='Search' onChange={onChangeInput} />
          <button className='search-btn' onClick={onSubmitSearchQuery}><IoIosSearch className='search-icon' /></button>
        </div>
        <div className='theme-container'>
          <p className='date'>{date.getDate()} {date.toLocaleString("en-US", { month: "long" })} {date.getFullYear()} {date.getHours()}:{date.getMinutes()}</p>
          <button className='toggle-button' onClick={onThemeToggle}>{isDark ? <CiLight className={`icon ${tooggleFontClass}`} /> : <GoMoon className='icon' /> }</button>
        </div>
      </nav>
      {renderDiffStates()}
    </div>
  )
};

export default App;
