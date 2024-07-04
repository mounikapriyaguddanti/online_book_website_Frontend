import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; 
import Navbar from './Navbar';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://online-book-website-backend-2.onrender.com/feedback', formData);
      setResponseMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setResponseMessage('Error submitting feedback');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center p-6 bg-gray-100 min-h-screen">
        <div className="w-1/3 flex justify-center">
          <img src="https://mpowerhr.in/wp-content/uploads/2021/03/feedback-main.jpg" alt="Feedback" className="w-2/3 h-auto rounded" />
        </div>
        <div className="w-1/5 p-4">
          <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Feedback"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Submit
            </button>
          </form>
          {responseMessage && <p className="mt-4">{responseMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
