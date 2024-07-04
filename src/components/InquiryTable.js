import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
const InquiryTable = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);
  const handleBack = () => {
    navigate('/admin-dashboard');
  };
  const fetchInquiries = async () => {
    try {
      const response = await axios.get('https://online-book-website-backend-2.onrender.com/api/inquiries');
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };
  const navigate = useNavigate();
 
  return (
    <div className="container mx-auto p-4">
        <div>
        <AdminNavbar />
        </div> 
        <div className="flex justify-end pr-8 mt-4">
        <button
          className="bg-green hover:bg-orangered text-white font-bold py-2 px-4 rounded"
          onClick={handleBack}
        >
          Back
        </button>
        </div>
        <br/>
      {inquiries.length > 0 ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-500">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id}>
                <td className="border p-2">{inquiry.name}</td>
                <td className="border p-2">{inquiry.email}</td>
                <td className="border p-2">{inquiry.address}</td>
                <td className="border p-2">{inquiry.phoneNo}</td>
                <td className="border p-2">{inquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inquiries found.</p>
      )}
    </div>
  );
};

export default InquiryTable;