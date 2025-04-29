import React, { Component } from 'react'
import {Box, Typography,TextField,InputAdornment} from '@mui/material';
import './App.css';
import logo from './logo.png'
import logo2 from './logo2.png'
import day1 from './2day.png'
import thermometer from './thermometer.png'
import windy from './windy.png'
import pressure from './pressure.png'
import humidity from './humidity.svg'
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  names:{
    fontFamily:"Inter",
    color:"#ffffff",
    fontWeight:700,
    fontSize:"23px"
  },
  values:{    
    color:"#dec2c2",
    fontWeight:500,
    fontSize:"15px"
  },
  secondVal:{
    fontWeight:700,
    color:"#ffffff",
    fontSize:"18px"
  },
  Box1:{
    height:{xs:"100%",sm:"100%",md:"100vh",lg:"100vh"},
    backgroundImage: "linear-gradient(to right,rgb(2, 2, 79),rgb(67, 96, 182))",
    padding: {xs:"25px 5px",sm:"25px 45px",md:"25px 45px",lg:"25px 45px"}
  },
  blocks:{
    border:"1px solid #fff",
    height:"100%",width:"100%",borderRadius:"10px",
    padding:"20px",display:"flex",flexDirection:"column",
    boxShadow: "0px 0px 15px 4px rgba(245, 231, 231, 0.4)"
  },
  navbar:{
    display:"flex",
    flexDirection:"column",
    gap:"10px"
  },
  nav1:{
    display:"flex",
    flexDirection:{xs:"column",sm:"row",md:"row",lg:"row"},
    justifyContent:"space-between",
    alignItems:"center",
    gap:"10px"
  },

  nav2:{
    width: "100%",
    height: "40px",
    border: "none",
    backgroundColor: "#ffffff",
    justifyContent:"center",
    borderRadius:"4px",
  },

  nav3:{

  },
  navimg:{
    height:"40px",
    width:"150px"
  },

  blocks2:{
    height:"100%",
    marginTop:"10px",
    display:"flex",
    flexDirection:{xs:"column",sm:"column",md:"row",lg:"row",}
  },
  weather:{
    height:"100%",
    width:{xs:"100%",sm:"100%",md:"50%",lg:"50%"},
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    gap:{xs:"20px",sm:"20px",md:"0px",lg:"0px"}
  },
  weather1:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    gap:"1px"
  },
  weatherText:{
    fontFamily:"Inter",
    fontWeight:900, 
    color:"#dec2c2",
    fontSize:"22px"
  },
  firstrow:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    width:"100%"
  },
  date:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"15px"
  },
  weather2:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    gap:"5px"
  },
  weather3:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    flexDirection:"column"
  },
  airText:{
    fontFamily:"Inter",
    fontWeight:900, 
    color:"#dec2c2",
    fontSize:"22px"
  },
  airRow:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    width:"100%"
  },
  text1:{
    color:"#61dafb",
    fontSize:"15px",
    marginBottom:"4px",
    fontWeight:600
  },
  weatherdata:{
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%", 
    gap: "10px" 
  },
  weatherblocks:{
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "5px", 
    padding: "5px", 
    backgroundColor: "rgba(213, 227, 238, 0.3)", 
    width: "80px", 
    height: "100px", 
    justifyContent: "center", 
    borderRadius: "10px" 
  },
  forecast:{
    height:"100%",
    width:{xs:"100%",sm:"100%",md:"50%",lg:"50%"},
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  forecastItems:{
    display:"flex",
    flexDirection:"column",
    height:"100%",
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center"
  },
  forecastText:{
    fontFamily:"Inter",
    fontWeight:900, 
    color:"#dec2c2",
    fontSize:"22px",
    margin:{xs:"25px 0px 5px 0px",sm:"25px 0px 5px 0px",md:"0px 0px 0px 0px",lg:"0px 0px 0px 0px"}
  },
  forecastRows:{
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "65px",
    backgroundColor: "rgba(213, 227, 238, 0.3)",
    borderRadius: "8px",
    padding: "4px",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  forecastcolumns:{
    display: 'flex', 
    flexDirection: "column", 
    alignItems: "center" 
  },
  rows:{
    display: "flex", alignItems: "center", gap: "5px"
  },
  iconstyle:{
    height: "20px", 
    width: "20px" 
  }

}

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      forecastData:[],
      city: "Mumbai",
      key: "fe4feefa8543e06d4f3c66d92c61b69c",
    };
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.key}&units=metric`)
      const data = response.data;
      console.log("weather data", data)
      this.setState({ weatherData: data })     
      
      if (data.coord) {
        this.fetchForecast();
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      if (error.response && error.response.status === 404) {
        alert("City not found. Please enter a valid city name.")
      } else {
        alert("City not found. Please enter a valid city name.")
      }
    }
  };

  fetchForecast = async () => {
    const { key, city } = this.state;
    try {     
      const Response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`)
      const data = Response.data
      const dailyData = {}
      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0]        
        if (!dailyData[date]) {
          dailyData[date] = []
        }        
        dailyData[date].push(item)
      })
     
      const updatedData = Object.keys(dailyData).slice(0, 5).map(date => {
        const dayData = dailyData[date][0]
        return {
          date,
          temperature: dayData.main.temp,
          weather: dayData.weather[0].description,
          wind: dayData.wind.speed,
          humidity: dayData.main.humidity,
          pressure: dayData.main.pressure,
          icon: dayData.weather[0].icon,
        }
      })
      console.log("Forecast Data", updatedData)      
      this.setState({forecastData: updatedData})
    } 
    catch (error) {
      console.error("Error fetching forecast data", error)
    }
  };


  render() {
    const { weatherData } = this.state;
    return (      
    <Box sx={style.Box1}>
      <Box sx={style.blocks}>
        {/* NavBar */}
        <Box sx={style.navbar}>
          <Box sx={style.nav1}>
            <Box component="img" src={logo} alt='logo' sx={style.navimg}/>
            <Box>
              {weatherData && weatherData.dt ? (
              <Typography sx={{color:"#ffffff"}}>{new Date(weatherData.dt * 1000).toUTCString()}</Typography>) : (<Typography sx={{color:"#ffffff"}}>Loading...</Typography>)}
            </Box> 
            <Box sx={{display:{xs:"none",sm:"flex"}}} component="img" src={logo2} alt='logo'/>      
          </Box>
          <TextField 
            sx={style.nav2}
            value={this.state.city}
            onChange={(e)=>this.setState({city:e.target.value})}
            onKeyDown={(e) => { if (e.key === 'Enter') this.fetchWeather() }}
            variant="standard"
            placeholder="Enter your city"
            InputProps={{
              disableUnderline: true,
              style: { paddingLeft: "15px" },
              endAdornment: (
                <InputAdornment position="end" onClick={this.fetchWeather} style={{ cursor: "pointer",marginRight:"11px" }}>
                  <SearchIcon style={{color: "#7a7a7a" }} />
                  <span style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Inter" }}>Search</span>
                </InputAdornment>),}}
          />          
        </Box>
        <Box sx={style.blocks2}>
          {/* First Box */}
          <Box sx={style.weather}>
            <Box sx={style.weather1}>
              <Typography sx={style.weatherText}>CURRENT WEATHER</Typography>
              <Box sx={style.firstrow}>
                <Box sx={style.date}>
                  <Box sx={style.names}>{weatherData.name}</Box>
                  <Box sx={style.values}>{`Today ${new Date(weatherData.dt * 1000).toLocaleDateString("en-US", { day: '2-digit', month: 'short' })}`}</Box>
                </Box>                
                <Box sx={style.date}>
                  {weatherData && weatherData.main && weatherData.weather ? (
                    <>
                      <Box sx={style.names}>{Math.round(weatherData.main.temp)}&deg;C</Box>
                      <Box sx={style.values}>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</Box>
                    </>
                  ) : (
                    <Typography sx={{ color: "#ffffff" }}>Loading...</Typography>
                  )}                
                </Box>
                <Box component="img" src={day1} alt='day1' sx={{height:"70px"}}/>
              </Box>
            </Box>

            <Box sx={style.weather2}>
              <Typography sx={style.airText}>AIR CONDITIONS</Typography>
              <Box sx={style.airRow}>
                <Box sx={style.date}>
                  <Box sx={style.values}>Real Feel</Box>
                  {weatherData && weatherData.main && (
                    <Box sx={style.names}>{Math.round(weatherData.main.feels_like)} &deg;C</Box>
                  )}
                </Box>
                <Box sx={style.date}>
                  <Box sx={style.values}>Wind</Box>
                  {weatherData && weatherData.wind && (
                  <Box sx={style.names}>{weatherData.wind.speed} m/s</Box>
                )}
                </Box>
                <Box sx={style.date}>
                  <Box sx={style.values}>Clouds</Box>
                  {weatherData && weatherData.clouds && (
                    <Box sx={style.names}>{weatherData.clouds.all}%</Box>
                  )}
                </Box>
                <Box sx={style.date}>
                  <Box sx={style.values}>Humidity</Box>
                  {weatherData && weatherData.main && (
                    <Box sx={style.names}>{weatherData.main.humidity}%</Box>
                  )}
                </Box>              
              </Box>
            </Box>
            
            <Box sx={style.weather3}>
              <Typography sx={style.airText}>TODAY'S FORECAST</Typography>
              <Typography sx={style.text1}>3 available forecast</Typography>
              {weatherData && (
                <Box sx={style.weatherdata}>
                  {/* Location*/}
                  <Box sx={style.weatherblocks}>
                    <Box sx={{color:"#dec2c2",}}>Location</Box>
                    <Box component="img" src={day1} alt='day1' sx={{ height: "30px" }} />
                    <Box sx={{color:"#ffffff",fontWeight:500}}>{weatherData.name || "N/A"}</Box>
                  </Box>
                  
                  {/* Visibility */}
                  <Box sx={style.weatherblocks}>
                    <Box sx={{color:"#dec2c2",}}>Visibility</Box>
                    <Box component="img" src={day1} alt='day1' sx={{ height: "30px" }} />
                    <Box sx={{color:"#ffffff",fontWeight:500}}>{weatherData.visibility ? `${weatherData.visibility / 1000} km` : "N/A"}</Box>
                  </Box>
                  
                  {/* Sunrise*/}
                  <Box sx={style.weatherblocks}>
                    <Box sx={{color:"#dec2c2",}}>Sunrise</Box>
                    <Box component="img" src={day1} alt='day1' sx={{ height: "30px" }} />
                    <Box sx={{color:"#ffffff",fontWeight:500}}>
                      {weatherData.sys && weatherData.sys.sunrise 
                        ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : "N/A"}
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Second Box */}
          <Box sx={style.forecast}>
            <Box sx={style.forecastItems}>
              <Typography sx={style.forecastText}>WEEKLY FORECAST</Typography>  
              {this.state.forecastData && this.state.forecastData.map((day, index) => (
                <Box key={index} sx={style.forecastRows}>                  
                  <Box sx={style.forecastcolumns}>
                    <Typography sx={style.secondVal}>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</Typography>
                    <Box sx={style.rows}>
                      <Box component="img" src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt='Weather Icon' sx={style.iconstyle} />
                      <Typography sx={{ color: "#dec2c2" }}>{day.weather}</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={style.forecastcolumns}>
                    <Box sx={style.rows}>
                      <Box component="img" src={thermometer} alt='Temperature Icon' sx={style.iconstyle} />
                      <Typography sx={style.secondVal}>{day.temperature} &deg;C</Typography>
                    </Box>
                    <Box sx={style.rows}>
                      <Box component="img" src={windy} alt='Windy Icon' sx={style.iconstyle} />
                      <Typography sx={style.secondVal}>{day.wind} m/s</Typography>
                    </Box>
                  </Box>

                  <Box sx={style.forecastcolumns}>
                    <Box sx={style.rows}>
                      <Box component="img" src={pressure} alt='Pressure Icon' sx={style.iconstyle} />
                      <Typography sx={style.secondVal}>{day.pressure} hPa</Typography>
                    </Box>
                    <Box sx={style.rows}>
                      <Box component="img" src={humidity} alt='Humidity Icon' sx={style.iconstyle} />
                      <Typography sx={style.secondVal}>{day.humidity}%</Typography>
                    </Box>
                  </Box>

                </Box>
              ))}

            </Box>           
          </Box>
        </Box>
      </Box>
    </Box>
      )
    }
}

export default App


