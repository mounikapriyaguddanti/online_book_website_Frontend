
// HomePage.js
import React from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import About from './About';
import FeaturedAuthors from './FeaturedAuthors';
import Testimonials from './Testimonials';
import ContactForm from './InquiryForm';
import NewArrivals from './NewArrivals';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <About />
      <NewArrivals />
      <FeaturedAuthors />
      <Testimonials />
      <ContactForm />
    </div>
  );
};

export default HomePage;