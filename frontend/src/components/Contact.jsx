import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const contactMessage = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    console.log("Contact message:", contactMessage);
    setSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <div className="contact-form-card">
        <h1>Send Us a Message</h1>

        {sent && (
          <p className="contact-success">
            Thank you! We will get back to you soon.
          </p>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          ></textarea>

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact-info">
        <div className="contact-info-card">
          <h3>Address</h3>
          <p>Leiritie 1, 01600 Vantaa</p>
        </div>
        <div className="contact-info-card">
          <h3>Phone</h3>
          <p>+358 XX XXXXXXX</p>
        </div>
        <div className="contact-info-card">
          <h3>Email</h3>
          <p>contact@example.com</p>
        </div>
        <div className="contact-info-card">
          <h3>Hours</h3>
          <p>Mon-Fri: 7:00 - 21:00</p>
          <p>Sat-Sun: 8:00 - 22:00</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
