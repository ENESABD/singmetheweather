import React, { useState } from 'react';
import axios from 'axios';

function Welcome({ setBadQuery, badQuery, setWelcomed, setPreferredLocation }) {

    const [query, setQuery] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [noWarning, setNoWarning] = useState(false);

    const onClickWelcome = () => {
        setPreferredLocation(query);
        setBadQuery(false);
        setWelcomed(true);
    }

    const onClickPrediction = (event) => {
        setQuery(event.target.value);
        setPredictions([]);
    }

    const handleChange = (event) => {
        setQuery(event.target.value);
        setNoWarning(true);
        
        const getPredictions = async (search_word) => {
            if (search_word !== ""){
                await axios.get(`https://singmetheweather.herokuapp.com/autocomplete/?search_word=${search_word}`)
                    .then(res => {
                        setPredictions(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });  
            }
        }
        
        getPredictions(event.target.value)
    }

    return (
        <main className="welcome">
            <div className="welcome-contents">
                <p className="greeting-text">Hello! Thank you for using this weather forecast application!</p>

                <label htmlFor='search-bar' className="search-bar-label">
                    Please type the name of the city you want to get a weather forecast for in the space below, 
                    or leave it blank to get the forecast for your location. <br/>
                    Once you've made a choice, click on the button below to get your forecast and a fitting song!
                </label>
                
                <div className='search'>

                    

                    <input type="text" className={predictions.length === 0 ? 'search-bar' : 'search-bar with-dropdown'} 
                        id='search-bar' value={query} onChange={handleChange} autoFocus />


                    <ul className='autocomplete'>
                        {predictions.map((prediction) => 
                            <li key={prediction.place_id}>
                                <button onClick={onClickPrediction} value={prediction.description} 
                                    className={predictions.indexOf(prediction) % 2 === 1 ? 
                                        'autocomplete-suggestion odd' : 'autocomplete-suggestion'} >
                                    {prediction.description}
                                </button>
                            </li>)}
                    </ul>

                    {badQuery && !noWarning ? <p className='warning'>The query you entered was not a valid location. Please try again!</p> : null}

                </div>
                
                

                <button className="start-button" onClick={onClickWelcome}>Sing me the weather!</button> 
            </div>
           
        </main>
    )
}

export default Welcome;
