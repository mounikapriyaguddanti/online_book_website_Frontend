import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Testimonials = () => {
    const reviews = [
      {
        name: 'Priya Sharma',
        location: 'Mumbai',
        quote: 'This Book Hive offers great prices and customer service. We found that they were able to find the titles we needed and were timely in shipping our orders!',
        photo: 'https://i.pinimg.com/originals/1f/e6/51/1fe651e1726e805aff12298209e7cb6c.jpg',
        rating: 4,
      },
      {
        name: 'Rahul Verma',
        location: 'Delhi',
        quote: 'First time using Book Hive and it wont be the last! User friendly website; easy to navigate & speedy delivery.',
        photo: 'https://wallpapercave.com/wp/wp8295906.jpg',
        rating: 5,
      },
      {
        name: 'Anjali Desai',
        location: 'Ahmedabad',
        quote: 'If you love books like I love books... consider Book Hive to be magical wonderlands, and wish they made a perfume that smelled like a new book, Bookshop.org is for you',
        photo: 'https://www.pngall.com/wp-content/uploads/5/Cute-Anime-Girl-PNG-Free-Download.png',
        rating: 3,
      },
    ];
  
    return (
      <section className="bg-white text-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-8">What Our customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-blue-500 p-6 rounded-lg shadow-md">
                <img
                  src={review.photo}
                  alt={`${review.name}`}
                  className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                />
                <p className="text-lg mb-4">"{review.quote}"</p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-500" />
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                     <FontAwesomeIcon icon={faStar} key={`gray-${i}`} className="text-gray-500" />
                  ))}
                </div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-300">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default Testimonials;
  