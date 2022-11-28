import React, { useEffect, useState} from 'react';
import axios from 'axios';
import MainWeather from './MainWeather';
import Place from './Place';
import ParsedDate from './ParsedDate';
import NextHours from './NextHours';
import OtherWeatherInfo from './OtherWeatherInfo';

function Weather({ setWelcomed, setBadQuery, preferredLocation, setForCategory, unit, day, itIsUnit, setPhotoUrl }) {


    const [weatherInfoForTheDay, setWeatherInfoForTheDay] = useState({});

    
    const [allWeatherInfo, setAllWeatherInfo] = useState(null);
    

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);

    const [hoursWeather, setHoursWeather] = useState({});

    const [unitSign, setUnitSign] = useState('');

    const [description, setDescription] = useState('');

    



    useEffect(() => {
        const getAllWeatherInfo = async () => {

            if(preferredLocation === "" || preferredLocation.trim().length === 0) {
                setBadQuery(false);
                await navigator.geolocation.getCurrentPosition(async (position) => {
                    let lat1 = position.coords.latitude;
                    let lon1 = position.coords.longitude;
    
                    setLat(lat1);
                    setLon(lon1);
    
                    //instead of using the api's unit parameter, conversion functions can be used to save api calls
                    await axios.get(`https://tame-cautious-minotaurasaurus.glitch.me/weather/?lat=${lat1}&lon=${lon1}&units=${unit}`)
                        .then(res => {
                            setAllWeatherInfo(res.data);
                            setHoursWeather(res.data.hourly);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }) 
            }
            
            else {
                let place_id;
                let lat;
                let lon;
                let bad_query = false;
                await axios.get(`https://tame-cautious-minotaurasaurus.glitch.me/autocomplete/?search_word=${preferredLocation}`)
                    .then(res => {
                        if (res.data[0]) {
                            place_id = res.data[0].place_id;
                            setDescription(res.data[0].description);
                            setBadQuery(false);
                            bad_query = false;
                        }
                        else {
                            setBadQuery(true);
                            bad_query = true;
                        }                        
                    })
                    .catch(err => console.log(err));
                if (!bad_query) {
                    await axios.get(`https://tame-cautious-minotaurasaurus.glitch.me/place/?place_id=${place_id}`)
                        .then(res => {
                            lat = res.data.lat;
                            lon = res.data.lon;
                            setPhotoUrl(res.data.photo_url);
                        })
                        .catch(err => console.log(err));

                    await axios.get(`https://tame-cautious-minotaurasaurus.glitch.me/weather/?lat=${lat}&lon=${lon}&units=${unit}`)
                        .then(res => {
                            setAllWeatherInfo(res.data);
                            setHoursWeather(res.data.hourly);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                else {
                    bad_query = false;
                }
            }
        }
        getAllWeatherInfo();
        
        if (unit === "standard") {
            setUnitSign(' K');
        } else if (unit === "metric") {
            setUnitSign('°C');
        } else if (unit === "imperial") {
            setUnitSign('°F');
        }

    },[unit, setPhotoUrl, preferredLocation, setBadQuery])

    
    const handleGoBack = () => {
        setWelcomed(false);
        setBadQuery(false);
    }
    
    

    return (
        <section className="weather-section">
            <MainWeather allWeatherInfo={allWeatherInfo} day={day} setForCategory={setForCategory} itIsUnit={itIsUnit} 
                weatherInfoForTheDay={weatherInfoForTheDay} setWeatherInfoForTheDay={setWeatherInfoForTheDay} 
                unitSign={unitSign} />
            {day === '0' ? 
            <NextHours hoursWeather={hoursWeather} unitSign={unitSign} /> :
            <OtherWeatherInfo weatherInfoForTheDay={weatherInfoForTheDay} unitSign={unitSign} />}

            <header className="user-location-and-chosen-date">
                <ParsedDate weatherInfoForTheDay={weatherInfoForTheDay} />
                <Place lat={lat} lon={lon} setPhotoUrl={setPhotoUrl} description={description} setDescription={setDescription}/>
            </header>  

            <button onClick={handleGoBack} className="previous"> &#8249; </button>
        </section>
        
    )
}

export default Weather;
