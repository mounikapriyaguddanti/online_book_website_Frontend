

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddBookForm from './components/AddBookForm';
import BookDetails from './components/BookDetails';
import InquiryTable from './components/InquiryTable'; 
import NewArrivals from './components/NewArrivals';
import AdminNavbar from './components/AdminNavbar';
import UserDetails from './components/UserDetails';

import Feedback from './components/FeedBack';
function App() {
  return (
    <Router>
      <div className="App">
        {/*<Navbar />*/}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/addbookform" element={<AddBookForm />}  />
          <Route path="/bookdetails" element={<BookDetails />} />
          <Route path="/inquirytable" element={<InquiryTable />} /> 
          <Route path="/newarrivals" element={ <NewArrivals />} />
          <Route path="/adminnavbar" element={<AdminNavbar />} />
          <Route path="/userdetails" element={<UserDetails />} />

          <Route path="/feedback" element={<Feedback />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
