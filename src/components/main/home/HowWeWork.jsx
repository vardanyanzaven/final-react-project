import React from 'react';
import "./HowWeWork.css"

  

   function HowWeWork() {
    return (
      <>
      
      <div className="howwework-container">
        <div className="howwework-item">
           <h2 className="title"><b>Vehicle Selection</b></h2>
           <p className="text">Browse through our online inventory or speak with our knowledgeable staff to find the perfect vehicle to suit your needs, preferences, and budget.</p>
           </div>

           <div className="howwework-item">
           <h2 className="title"><b>Reservation </b></h2>
           <p className="text">Once you have selected your ideal rental vehicle, make a reservation through our user-friendly online platform or contact our friendly customer service team. </p>
           </div>

           <div className="howwework-item">
           <h2 className="title"><b>Confirmation</b></h2>
           <p className="text">After receiving your reservation request, our team will quickly process it and send you a confirmation with all the details of your rental, including the pickup instructions, terms and conditions, and the total cost. </p>
           </div>
           

            <div className="howwework-item">
            <h2 className="title"><b>Pickup</b></h2>
            <p className="text">On the scheduled day and time, arrive at the designated pickup location. Our staff will greet you warmly and guide you through the necessary paperwork, including verifying your driver's license and signing the rental agreement. </p>
           </div> 
           </div>
           
     
      </>
    );
  }

  export default HowWeWork;