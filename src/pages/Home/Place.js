import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Place({ setDescription, description, lat, lon, setPhotoUrl }) {

    const [city, setCity] = useState('');
    const [rest, setRest] = useState('');


    useEffect(()=> {

        const getAdressInfo = async () => {
            await axios.get(`https://sing-me-the-weather-server-production.up.railway.app/place/?lat=${lat}&lon=${lon}`)
                .then(res => {
                    setDescription(res.data.description);
                    setPhotoUrl(res.data.photo_url);
                    //setPhotoUrl("http://localhost:8000/image.jpg");
                })
                .catch(err => console.log(err));  
        }
        
        if (!description) {
            getAdressInfo()
        }
        
        
    },[lat, lon, setPhotoUrl, description, setDescription])

    useEffect(() => {
        let descriptionArray = description.split(",")
        setCity(descriptionArray[0]);
        setRest(description.substring(descriptionArray[0].length + 2));

    }, [description])
    
    
    return (
        <>
            <h2 className="city">{city},</h2>
            <h1 className="country-or-state">{rest}</h1>
            <aside className="location-pin"><i className='fa' style={{color: '#B22222'}}>&#xf276;</i> Picture from {city}</aside>
        </>
    )
}

export default Place;
