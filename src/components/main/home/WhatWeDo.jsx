import React from 'react';
import "./WhatWeDo.css";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

function WhatWeDo() {
    return (
        <div className="whatwedo-container">
            <div className = "whatwedo_item">
           <EventRepeatIcon fontSize = "large"/>
           <div className="whatwedo_item_text">
           <h2 className="title"><b>Flexible Rentals</b></h2> 
           <p className="text">Cancel or change most bookings for free up to 48 hours before pick-up</p>
           </div>
           </div>

           <div className = "whatwedo_item">
           <AssuredWorkloadIcon fontSize = "large"/> 
           <div className="whatwedo_item_text">
           <h2 className="title"><b>No hidden fees</b></h2>
           <p className="text"> Know exactly what you’re paying</p>
           </div>
           </div>

           <div className = "whatwedo_item">
           <NoCrashIcon fontSize = "large"/>
           <div className="whatwedo_item_text">
           <h2 className="title"><b>Clean cars and Flexible bookings</b></h2>
           <p className="text">We’re working with our partners to keep you safe and in the driving seat.</p>
           </div>
        </div>
        </div>

    )
}

export default WhatWeDo ; 