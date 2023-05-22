import React, { useState } from "react";
import "./ContactUs.css";

const ContactUsInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contactus">
      <h1 className="contactus-title">Contact Us</h1>
      <h4 className="contactus-text">We'd love to hear from you!</h4>
      <form className="contactus-form" onSubmit={handleSubmit}>
        <div className="styled-input">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="styled-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="styled-input">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required></textarea>
        </div>
        <button type="submit" className="contactus-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUsInput;
