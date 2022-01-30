import React, {useEffect , useState} from "react"
export default function SearchWeather() {
    const[search,setSearch] =useState("lucknow");
    const [weather , setWeather] = useState();
    const [input , setInput] = useState("");

    useEffect(()=>{
      async function weatherCon(){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=016692285b764d6403b8ccc99c7ce37f`)
        const data = await res.json()
        setWeather(data)
      }
    weatherCon()
    },[search]) 
    const temp1 = (weather?.main?.temp -273.15).toFixed(2)
    let temp3,temp2
    if(weather?.main?.temp_min ===weather?.main?.temp_max)
    {
      temp3 = (weather?.main?.temp_min -273.15 -6).toFixed(0)
      temp2 = (weather?.main?.temp_max -273.15 +4).toFixed(0)
    }
    else{
      temp3 = (weather?.main?.temp_min -273.15 ).toFixed(0)
      temp2= (weather?.main?.temp_max -273.15 ).toFixed(0)
    }
    let emoji = null
    if(weather?.main !== undefined)
    {
      if(weather?.weather[0]?.main === "Clouds")
      {
        emoji = "fa-cloud"
      }
      else if(weather?.weather[0]?.main === "Thunderstorm")
      {
        emoji = "fa-bolt"
      }
      else if(weather?.weather[0]?.main === "Drizzle")
      {
        emoji = "fa-cloud-rain"
      }
      else if(weather?.weather[0]?.main === "Rain")
      {
        emoji = "fa-cloud-shower-heavy"
      }
      else if(weather?.weather[0]?.main === "Snow")
      {
        emoji = "fa-snow-flake"
      }
      else if(weather?.weather[0]?.main === "Clear")
      {
        emoji = "fa-sun"
      }
      else{
        emoji = "fa-smog"
      }
    }

    let d = new Date()
    let date = d.getDate()
    let year = d.getFullYear()
    let month = d.toLocaleString("default" , {month: 'long'})
    let day = d.toLocaleString("default" , {weekday: 'long'})

    let time = d.toLocaleString([],{
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'
    })

    const handleSubmit = (event) => {
      event.preventDefault()
      setSearch(input)
    }


  return (
    <div className="main-inside">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-dark text-white">
              <img
                src= {`https://source.unsplash.com/600x1000/?${weather?.weather[0]?.main}`}
                className="card-img"
                alt="weather"
              />
              <div className="card-img-overlay">
                  <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4">
                  <input type="search"
                  className="form-control"
                  placeholder="Search City"
                  aria-label="Search City"
                  aria-describedby="basic-addon2"
                  name="search"
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  required
                  />
                  <button type="submit" className="input-group-text" id="basic-addon2">
                      <i className="fas fa-search"></i>
                  </button>
                   </div>
                  </form>
                  <div className="inner--data py-3">
                <h2 className="card-title">{weather?.name}</h2>
                <p className="card-text ">
                  {day}, {month} {date}th, {year}
                  <br/>
                  {time}
                </p>
                <hr/>
                <i className={`fas ${emoji} fa-5x`}></i>
                <h1 className="temperature">{temp1} &deg;C</h1>
                <p className="weather--type">{weather?.weather[0]?.main}</p>
                <p className="min_max--temp">{temp3} &deg;C  |  {temp2} &deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
