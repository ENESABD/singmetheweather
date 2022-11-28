import React, { Fragment, useState } from 'react';
import Welcome from './Welcome';
import Weather from './Weather';
import Song from './Song';
import Menu from './Menu';

function Home({ hasWelcomed, setWelcomed, setPhotoUrl }) {

    const [badQuery, setBadQuery] = useState(false);

    
    const [preferredLocation, setPreferredLocation] = useState("");

    const [forCategory, setForCategory] = useState({});
    const [unit, setUnit] = useState('imperial');
    const [day, setDay] = useState('0');
    const [itIsUnit, setItIsUnit] = useState(null);


    



    return (
        <Fragment>
            {!(hasWelcomed) || badQuery ? <Welcome setWelcomed={setWelcomed} badQuery={badQuery} setBadQuery={setBadQuery}
                                setPreferredLocation={setPreferredLocation} /> :
        
            <main className="home">
                <Weather setBadQuery={setBadQuery} preferredLocation={preferredLocation} setWelcomed={setWelcomed}
                    setForCategory={setForCategory} unit={unit} day={day} itIsUnit={itIsUnit} setPhotoUrl={setPhotoUrl} />

                <div className='right-side'>
                    <Song forCategory={forCategory} />
                    <Menu setUnit={setUnit} setDay={setDay} setItIsUnit={setItIsUnit} />
                </div>
            </main>
            }
        </Fragment>
    )
}

export default Home;
