import React, { useState } from 'react';

const authors = [
  { 
    name: "A.L.Basham", 
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFQeR-1X0okjRz-RvF00jjzZFfYjFAh1NWwPL9VgXuQr010J5UNEO7RcNZVg5fNd42Brov2CKC5yBDzJwVAwjRXWzshsg1o9pALQCwzCJTWlg_43v_aNMw7haLY0dfdgLCcnTUY9YB9KWKYarEe5WWhQpRL61TPfcXic7YjjhsyApVUGSLl0ArovDB/w1200-h630-p-k-no-nu/A._L._Basham_(1956).jpg",
    bio: "Arthur Llewellyn Basham was a noted historian and indologist. He is best known for his book 'The Wonder That Was India'."
  },
  { 
    name: "Ashwin Sanghi", 
    image: "https://www.indianspeakerbureau.com/img/1605167770.jpg",
    bio: "Ashwin Sanghi is an Indian writer in the fiction-thriller genre. He is known for his bestselling novels 'The Rozabal Line', 'Chanakya's Chant', and 'The Krishna Key'."
  },
  { 
    name: "Aravind Adiga", 
    image: "https://www.babelio.com/users/AVT_Aravind-Adiga_8560.jpeg",
    bio: "Aravind Adiga is an Indian writer and journalist. His debut novel, 'The White Tiger', won the 2008 Man Booker Prize."
  },
  { 
    name: "Shashi Tharoor", 
    image: "https://tse4.mm.bing.net/th?id=OIP.RBdnPb62MGEVe9lv3HMrVAHaFj&pid=Api&P=0&h=180",
    bio: "Shashi Tharoor is an Indian politician, diplomat, and writer. He has authored numerous books including 'An Era of Darkness' and 'The Great Indian Novel'."
  },
  { 
    name: "Ramachandra Guha", 
    image: "https://tse4.mm.bing.net/th?id=OIP.9C9wFVJIbVs9Uw1rTsrNuAHaGL&pid=Api&P=0&h=180",
    bio: "Ramachandra Guha is an Indian historian and writer. His books include 'India After Gandhi' and 'Gandhi: The Years That Changed the World'."
  },
  { 
    name: "Jane Austen", 
    image: "http://englishbookgeorgia.com/blogebg/wp-content/uploads/2014/12/jane-austen.jpg",
    bio: "Jane Austen was an English novelist known primarily for her six major novels, including 'Pride and Prejudice' and 'Sense and Sensibility'."
  },
  { 
    name: "J.R.R. Tolkien", 
    image: "https://www.cityguideny.com/uploads2/148714/files/tolkien.jpg",
    bio: "J.R.R. Tolkien (born January 3, 1892, Bloemfontein, South Africa—died September 2, 1973, Bournemouth, Hampshire, England) was an English writer and scholar who achieved fame with his children’s book The Hobbit (1937) and his richly inventive epic fantasy The Lord of the Rings (1954–55)."
  },
  { 
    name: "Harper Lee", 
    image: "https://compote.slate.com/images/fdd8a579-68c9-4fb8-be28-e6885fd78330.jpg",
    bio: "Harper Lee, American writer nationally acclaimed for her novel To Kill a Mockingbird (1960). She also wrote Go Set a Watchman (2015), which was essentially a sequel To Kill a Mockingbird, though it was written before that book. Learn more about Lee’s life and books."
  },
  { 
    name: "Khushwant Singh", 
    image: "https://tse3.mm.bing.net/th?id=OIP.KiqvSgb5U92w7AgJZ4ad1gHaDz&pid=Api&P=0&h=180",
    bio: "Khushwant Singh is one of India’s most iconic writers and journalists, known for his sharp wit, political commentary, and literary contributions. Born in Hadali, Punjab, British India (now in Pakistan) on February 2, 1915, Singh led a remarkable life, marked by his literary achievements, political commentary, and public service."
  },
  { 
    name: "Chitra Banerjee Divakaruni", 
    image: "http://governancenow.com/temp/chitra.jpg",
    bio: "Chitra Divakaruni is an award-winning writer, activist, professor and speaker, and the author of 21 books such as Mistress of Spices, Sister of My Heart, Before We Visit the Goddess, Palace of Illusions, The Forest of Enchantments, and The Last Queen.  Her newest novel, Independence, depicts the experiences of three sisters in strife-torn Calcutta as India frees itself from the British yoke. She writes for adults and children."
  },
];

const FeaturedAuthors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const openModal = (author) => {
    setSelectedAuthor(author);
  };

  const closeModal = () => {
    setSelectedAuthor(null);
  };

  return (
    <section className="bg-navy p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-white" >Featured Authors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {authors.map((author, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => openModal(author)}>
            <img 
              src={author.image} 
              alt={author.name} 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <p className="text-lg font-semibold text-center text-white">{author.name}</p>
          </div>
        ))}
      </div>

      {selectedAuthor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <img 
              src={selectedAuthor.image} 
              alt={selectedAuthor.name} 
              className="w-32 h-32 rounded-full object-cover mb-4 mx-auto"
            />
            <h3 className="text-xl font-bold mb-2 text-center">{selectedAuthor.name}</h3>
            <p className="text-gray-700 mb-4">{selectedAuthor.bio}</p>
            <button 
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedAuthors;