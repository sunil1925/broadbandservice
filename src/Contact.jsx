import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "../src/css/Contact.css"

const Contact = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, contactNumber, email, message } = formData;

    // Validation
    if (!fullName || !contactNumber || !email || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter a valid Indian phone number!',
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter a valid email address!',
      });
      return;
    }

    // Form submission
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ ...formData, access_key: "b7c778a9-9f09-4f87-b1f7-721737fc3803" })
      }).then((res) => res.json());

      if (res.success) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
        });
        // Reset form data
        setFormData({
          fullName: '',
          contactNumber: '',
          email: '',
          message: ''
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to send message!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <section className="contact">
      <form onSubmit={handleSubmit}>
          <h2>Contact Form</h2>
          <div className="input-box">
            <label htmlFor="fullName">Enter Full Name</label>
            <input
              type="text"
              className="field"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="input-box">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              className="field"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="field"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </div> 
          <div className="input-box">
            <label htmlFor="message">Type your Message Here</label>
            <textarea
              className="field mess"
              id="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              maxLength="300"
            ></textarea>
            <small className="form-text text-muted">Max 300 characters.</small>
          </div> 
          <div className="col-12 pt-3">
            <button
              type="submit"
            >
              Submit form
            </button>
          </div>
        </form>
      </section>
    </div>        

  );
};

export default Contact;
