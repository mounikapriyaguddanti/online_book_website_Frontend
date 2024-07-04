
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NewArrivals = () => {
  const books = [
    {
      id: 1,
      img: 'http://s.s-bol.com/imgbase0/imagebase/large/FC/3/2/3/8/1001004006288323.jpg',
      name: 'The White Tiger',
      author: 'Aravind Adiga',
      publisher: ' HarperCollins',
      description: 'The White Tiger by Aravind Adiga is a compelling narrative about the dark side of Indias economic boom.'
    },
    {
      id: 2,
      img: 'https://cdn2.penguin.com.au/covers/original/9780141330167.jpg',
      name: 'Pride and Prejudice',
      author: 'Jane Austen',
      publisher: ' Penguin Random House',
      description: 'Jane Austens Pride and Prejudice is a beloved classic that deftly combines romance, social commentary.'
    },
    {
      id: 3,
      img: 'https://pictures.abebooks.com/inventory/md/md30777484560.jpg',
      name: 'The Wonder That Was India',
      author: 'A.L.Basham',
      publisher: 'Rupa Publications',
      description: 'A.L. Basham The Wonder That Was India is a seminal work on the history and culture of ancient India.'
    },
    {
      id: 4,
      img: 'https://cdn2.penguin.com.au/covers/original/9781784870799.jpg',
      name: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'Penguin Random House',
      description: 'Harper Lee To Kill a Mockingbird is a timeless classic that explores the depths of human morality, the pervasive nature of racial prejudice.'
    },
    {
      id: 5,
      img: 'https://www.elocalshops.com/cdn/shop/products/images_-_2020-08-03T140036.173_1200x1921.jpg?v=1610414949',
      name: 'The Palace of Illusions',
      author: 'Chitra Banerjee Divakaruni',
      publisher: 'HarperCollins',
      description: 'The Palace of Illusions is a reimagining of the world-famous Indian epic, the Mahabharat.'
    }
  ];

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleActionClick = () => {
    setMessage('You need to login for that');
    setTimeout(() => {
      navigate('/login');
      window.scrollTo(0, 0); // Ensure the page scrolls to the top when navigating
    }, 5000);
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        <div className="flex justify-between gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-72">
              <div className="h-96 overflow-hidden">
                <img src={book.img} alt={book.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                <h3 className="text-xl font-semibold mb-2">{book.name}</h3>
                <p className="text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-gray-500 text-sm mb-2">Publisher: {book.publisher}</p>
                <p className="text-gray-700 text-sm">Description: {book.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-orangered text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={handleActionClick}
                  >
                    Buy
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={handleActionClick}
                  >
                    <i className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {message && (
          <div className="fixed bottom-0 left-0 right-0 bg-yellow-300 text-black text-center py-2">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;


