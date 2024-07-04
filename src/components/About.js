import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-100 p-6 px-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src="https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?cs=srgb&dl=antique-book-book-bindings-1005324.jpg&fm=jpg" 
          alt="About Us" 
          className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div>
          <h2 className="text-3xl text-center font-bold mb-4">About Us</h2>
          <p className="text-gray-700">📚 Book Hive is a place that celebrates the beauty of printed material. 
            They display their stock in a way that maximizes the visual impact of book design, liberally spreading titles over tables and shelves face-out where possible.
             Rather than traditional sections, they favor mixes of booksellers’ picks, creating a unique browsing experience that algorithms cannot replicate.
             The building itself combines charm, character, and a playful sense of fun. Book Hive also has a rich publishing history and hosts regular events, including author signings and launches.
             “Book Hive is a delightful haven for book lovers.
              Our award-winning independent bookshop celebrates the tactile beauty of printed material. 
              We display books face-out on tables and shelves, creating a visual feast for readers. Instead of traditional sections, we curate collections based on our booksellers’ picks, ensuring a unique browsing experience. Our charming building exudes character, and we’re proud of our rich publishing history. Join us for author signings, workshops, and a warm sense of community. Explore our online catalog, get personalized recommendations, and immerse yourself in the world of literature!” 🌟📖
</p>
        </div>
      </div>
    </section>
  );
};

export default About;