import React, { useState, useEffect } from 'react';
import "./Faq.css"
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const FAQ = () => {
const [faqs, setFaqs] = useState([]);

  

  useEffect(() => {
    const getFaqs = async () => {
      const ref = doc(db, "faqs", "v2uD6ABcDBZqM0cAteGk");
      const snapShot = await getDoc(ref);
      setFaqs(snapShot.data().faqs);
    };
  

    getFaqs();
  }, []);

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