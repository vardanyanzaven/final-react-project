import React, { useState, useEffect } from 'react';
import "./Faq.css"
// import firebase from 'firebase/app';
// import 'firebase/firestore';



const FAQ = () => {
//   const [faqs, setFaqs] = useState([]);

  const faqs = [
    {
        question: "What types of cars do you offer?",
        answer: "We offer a wide range of vehicles from economy to luxury depending on your needs. Our fleet includes compact cars, sedans, SUVs, vans, and more.",
    },
    {
        question: "What documents do I need to rent a car?",
        answer: "You will need a valid driver's license, a credit card in your name, and proof of insurance. If you're renting internationally, you may also need an international driving permit and a passport.",
    },
    {
        question: "Can I add extra drivers to my rental?",
        answer: "Yes, you can add additional drivers to your rental for an extra fee. They must meet the same requirements as the primary driver and be included in the rental agreement.",
    },
    {
        question: "What happens if I return the car late?",
        answer: "Late returns may result in additional fees. Please contact us as soon as possible if you anticipate being late to avoid penalties.",
    }
  ]

//   useEffect(() => {
//     const getFaqs = async () => {
//       const db = firebase.firestore();
//       const faqCollection = db.collection('faqs');
//       const faqSnapshot = await faqCollection.get();
//       const faqData = faqSnapshot.docs.map((doc) => doc.data());
//       setFaqs(faqData);
//     };

//     getFaqs();
//   }, []);

  return (
    <div className = "faq_container">
    <h1>Frequently Asked Questions</h1>
      {faqs.map(({ question, answer }) => (
        <div key={question}>
          <h3><b>{question}</b></h3>
          <p>{answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;