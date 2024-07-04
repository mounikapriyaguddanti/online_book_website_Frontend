import React, { useState } from 'react';
import axios from 'axios';

const InquiryForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNo: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://online-book-website-backend-2.onrender.com/api/inquiries', formData);
      setFormData({ name: '', email: '', address: '', phoneNo: '', message: '' });
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  return (
    <div className="bg-pink container mx-auto px-8 py-4 max-w-5xl"> {/* Added padding and max width */}
      <h1 className="text-3xl font-bold mb-6 text-center">Inquiry Form</h1>
      <div className="flex flex-col md:flex-row gap-8 items-center"> {/* Added items-center for vertical alignment */}
        <div className="md:w-2/5"> {/* Reduced width */}
          <img 
            src="https://s3-eu-central-1.amazonaws.com/lycamobilespain-website/lycamobile-es-cms/wp-content/uploads/2017/05/16142305/contact-us.png" 
            alt="Contact Us" 
            className="w-full h-auto rounded-lg shadow-lg max-w-xs mx-auto" 
          />
        </div>
        <form onSubmit={handleSubmit} className="mb-8 md:w-3/5 w-full"> {/* Increased form width */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;