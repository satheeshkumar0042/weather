import { useState } from 'react';
import './App.css'; 
import searchIcon from"./asset/search.jpg"
import clearIcon from"./asset/sun.jpg"
import snowIcon from"./asset/snowicon.jpg"
import drizzleIcon from"./asset/drizzleicon.jpg"
import rainIcon from"./asset/rainicon.jpg"
import windIcon from"./asset/windicon.jpg"
import humidityIcon from"./asset/humidity.jpg"

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{


  return(
    <>
    <div className='image'>
      <img src={icon} alt='image'></img>
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
   <div className='cord'>
    <div>
      <sanp className="lat">latitude</sanp>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>logitude</span>
      <span>{log}</span>
    </div>
   </div>
   <div className='data-container'>
    <div className='element'>
      <img src={humidityIcon} alt='humidit' className='icon'></img>
      <div className='data'>
        <div className='humidity-precent'>{humidity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windIcon} alt='wind' className='icon'></img>
      <div className='data'>
        <div className='wind-precent'>{wind} km/h</div>
        <div className='text'>wind speed</div>
      </div>
    </div>

   </div>
   
    </>
  )
}


function App() {
    
  const[text,setText]=useState("")
  const[icon,setIcon]=useState(snowIcon)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState('')
  const[country,setCountry]=useState('IND')
  const[lat,setLat]=useState(0)
  const[log,setLog]=useState(0)
  const[humidity,setHumidity]=useState(0)
  const[wind,setWind]=useState(0)
  const[citynotfound,setCitynotfound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error ,setError]=useState(null)

  const weatherIconmap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":snowIcon,
    "02n":snowIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "010d":rainIcon,
    "010n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon

  }
  
  const search = async()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=15b86d286ee380dbe350b6e042838779&units=metric`
    console.log(url)
    try{
      let res=await fetch(url)
      let data =await res.json()
      if(data.cod=='404'){
        console.error('city not found')
        setCitynotfound(true)
        setLoading(false)
        return;
      }
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp (Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      const weatherIcon=data.weather[0].icon
      setIcon(weatherIconmap[weatherIcon] || clearIcon)
      setCitynotfound(false)
    }
    catch(error){
      console.error("An error occurred",error.message)
      setError("An error occurren while fetching data")
    }
    finally{
      setLoading(false)
    }
  }

  const handelcity=(e)=>{
    setText(e.target.value)
  };

  const handelkeydown=(e)=>{
    if(e.key=== 'Enter'){
      search()
  }
}
  return (
   <>
   
     <div className='container'>
      <div className='input-container'>
        <input type='text' className='cityinput'
        onChange={handelcity} 
        value={text} onKeyDown={handelkeydown}
        placeholder='Enter City'></input>
        <div className='search-icon'>
          <img src={searchIcon} alt='search' onClick={()=>search()} ></img>
        </div>
      </div>
      
      {!loading && !citynotfound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} 
      humidity={humidity} wind={wind}/> }

     {loading && <div className='loadingmessage'>Loading...</div>}
     {error && <div className='errormessage'>{error}</div>}
     {citynotfound && <div className='citynotfound'>City Not Found</div>}
    </div> 
   </>
  );
}

export default App;