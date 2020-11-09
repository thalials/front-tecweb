import React, { useRef, useState, useEffect } from 'react';

import { listUserPlaces } from '../../../API/Requests';
import LoadingIndicator from '../../../Components/LoadingIndicator';

function Travels() {
    const [places, setPlaces] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listUserPlaces().then((placesArray) => {
            setPlaces(placesArray);
            setLoading(false);
            // console.log(places.length);
        });
    }, []);

    return (
        <>{loading ? <LoadingIndicator width={30} /> : places.map((city) => <DisplayPlace city={city} />)}</>
    );
}

function DisplayPlace({ city }) {
    return <p>{JSON.stringify(city)}</p>;
}

export default Travels;
