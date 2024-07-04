import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel';

const PurchaseModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-8 max-w-lg flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const QuantityModal = ({ book, onConfirm, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');

  const handleConfirm = () => {
    onConfirm(book, quantity, address);
  };

  const totalAmount = book.price * quantity;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-8 max-w-lg flex">
        <div className="flex-shrink-0 mr-4">
          <img src={book.imgUrl} alt={book.bookName} className="object-contain h-40 w-40" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">{book.bookName}</h2>
          <p className="mb-2"><strong>Author:</strong> {book.author}</p>
          <p className="mb-2"><strong>Publisher:</strong> {book.publisherName}</p>
          <p className="mb-2"><strong>Price:</strong> ${book.price}</p>
          <input
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="number"
            min="1"
            max={book.totalCopies}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded p-2 mb-4 w-full"
          />
          <p className="mb-4"><strong>Total Amount:</strong> ${totalAmount}</p>
          <div>
            <button onClick={handleConfirm} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2">
              Confirm
            </button>
            <button onClick={onClose} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [bookToBuy, setBookToBuy] = useState(null);
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [showMyOrders, setShowMyOrders] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://online-book-website-backend-2.onrender.com/books');
        console.log('Books data:', response.data);
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [location.state]);

  const handleLogout = async () => {
    try {
      if (user) {
        await axios.post('https://online-book-website-backend-2.onrender.com/logout', {
          username: user.username,
          logoutTime: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleViewMore = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowPurchaseModal(false);
    setPurchaseMessage('');
  };

  const toggleWishlist = (book) => {
    if (wishlist.some((item) => item._id === book._id)) {
      setWishlist(wishlist.filter((item) => item._id !== book._id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const handleShowWishlist = () => {
    setShowWishlist(!showWishlist);
    setShowMyOrders(false);
  };

  const handleBuyBook = (book) => {
    setBookToBuy(book);
    setShowQuantityModal(true);
  };

  const handleConfirmPurchase = async (book, quantity, address) => {
    try {
      const response = await axios.post(`https://online-book-website-backend-2.onrender.com/purchase/${book._id}`, { quantity, address });
      if (response.status === 200) {
        setPurchaseMessage('Purchase successful!');
        setShowPurchaseModal(true);
        setPublishers((prevPublishers) =>
          prevPublishers.map((publisher) => ({
            ...publisher,
            authors: publisher.authors.map((author) => ({
              ...author,
              books: author.books.map((b) =>
                b._id === book._id ? { ...b, totalCopies: b.totalCopies - quantity } : b
              ),
            })),
          }))
        );
        setWishlist((prevWishlist) =>
          prevWishlist.map((b) =>
            b._id === book._id ? { ...b, totalCopies: b.totalCopies - quantity } : b
          )
        );
        setPurchasedBooks([...purchasedBooks, { ...book, quantity, purchaseDate: new Date(), address }]);
        setTimeout(() => closeModal(), 3000);
      }
    } catch (error) {
      console.error('Error purchasing book:', error);
    }
    setShowQuantityModal(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredBooks([]);
    } else {
      const filtered = publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.filter((book) =>
            book.bookName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            author.authorName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            publisher.publisherName.toLowerCase().includes(event.target.value.toLowerCase())
          ).map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      );
      setFilteredBooks(filtered);
    }
  };

  const handleDeleteFromWishlist = (book) => {
    setWishlist(wishlist.filter((item) => item._id !== book._id));
  };

  const handleShowMyOrders = () => {
    setShowMyOrders(true);
    setShowWishlist(false);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    : publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      ).slice(indexOfFirstBook, indexOfLastBook);

  const totalBooks = searchTerm ? filteredBooks.length : publishers.reduce((acc, publisher) => {
    return acc + publisher.authors.reduce((sum, author) => sum + author.books.length, 0);
  }, 0);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-navy py-4 px-6 flex justify-between items-center">
      <h1 className="text-yellow-500 font-bold text-4xl tracking-widest transform hover:scale-105 transition-transform duration-300" style={{ fontFamily: 'Brush Script MT, cursive' }}>
  User Dashboard</h1>

        <div className="flex items-center">
          <p className="text-white mr-4">{user ? `Welcome, ${user.username}` : 'Welcome, Guest'}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </header>
      <div className="flex-grow p-6">
        <div className="flex justify-between mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search by book, author, or publisher"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded pl-8 pr-4 py-2 w-full"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleShowWishlist}
            >
              {showWishlist ? 'Hide Wishlist' : `Show Wishlist (${wishlist.length})`}
            </button>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleShowMyOrders}
            >
              {showMyOrders ? 'Hide My Orders' : `Show My Orders (${purchasedBooks.length})`}
            </button>
          </div>
        </div>

        {showWishlist ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Wishlist ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
              <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((book) => (
                  <div key={book._id} className="bg-white p-4 rounded-lg shadow">
                    <img src={book.imgUrl} alt={book.bookName} className="object-contain h-40 w-full mb-4" />
                    <h3 className="text-xl font-bold mb-2">{book.bookName}</h3>
                    <p className="mb-2"><strong>Author:</strong> {book.author}</p>
                    <p className="mb-2"><strong>Publisher:</strong> {book.publisherName}</p>
                    <p className="mb-2"><strong>Price:</strong> ₹{book.price}</p>
                    <p className="mb-2"><strong>Copies Available:</strong> {book.totalCopies}</p>
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteFromWishlist(book)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Remove
                      </button>
                      <button
                    className="bg-orangered text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleViewMore(book)}
                  >
                    View More
                  </button>
                      <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleBuyBook(book)}
                        disabled={book.totalCopies === 0}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : showMyOrders ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            {purchasedBooks.length === 0 ? (
              <p className="text-gray-600">You haven't purchased any books yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {purchasedBooks.map((order) => (
                  <div key={order._id} className="bg-white p-4 rounded-lg shadow">
                    <img src={order.imgUrl} alt={order.bookName} className="object-contain h-40 w-full mb-4" />
                    <h3 className="text-xl font-bold mb-2">{order.bookName}</h3>
                    <p className="mb-2"><strong>Author:</strong> {order.author}</p>
                    <p className="mb-2"><strong>Publisher:</strong> {order.publisherName}</p>
                    <p className="mb-2"><strong>Price:</strong> ₹{order.price}</p>
                    <p className="mb-2"><strong>Quantity:</strong> {order.quantity}</p>
                    <p className="mb-2"><strong>Total Amount:</strong>₹{order.price * order.quantity}</p>
                    <p className="mb-2"><strong>Address:</strong> {order.address}</p>
                    <p className="mb-2"><strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
 <Carousel />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentBooks.map((book) => (
                <div key={book._id} className="bg-white p-4 rounded-lg shadow">
                  <img src={book.imgUrl} alt={book.bookName} className="object-contain h-40 w-full mb-4" />
                  <h3 className="text-xl font-bold mb-2">{book.bookName}</h3>
                  <p className="mb-2"><strong>Author:</strong> {book.author}</p>
                  <p className="mb-2"><strong>Publisher:</strong> {book.publisherName}</p>
                  <p className="mb-2"><strong>Price:</strong> ₹{book.price}</p>
                  <p className="mb-2"><strong>Copies Available:</strong> {book.totalCopies}</p>
                  <div className="flex justify-between items-center">    <button
                    className="text-red-500 hover:text-red-500"
                    onClick={() => toggleWishlist(book)}
                  >
                    <FontAwesomeIcon icon={wishlist.some((item) => item._id === book._id) ? solidHeart : regularHeart} />
                  </button>
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleViewMore(book)}
                  >
                    View More
                  </button>
                  <button
                    className="bg-orangered text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleBuyBook(book)}
                    disabled={book.totalCopies === 0}
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-orangered text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === number + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200'
                }`}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            ))}
            <button
              className="bg-orangered text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    {selectedBook && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        
        <div className="bg-white rounded p-8 max-w-lg">
          <h2 className="text-2xl font-bold mb-4">{selectedBook.bookName}</h2>
          <p className="mb-2"><strong>Author:</strong> {selectedBook.author}</p>
          <p className="mb-2"><strong>Publisher:</strong> {selectedBook.publisherName}</p>
          <p className="mb-2"><strong>Description:</strong> {selectedBook.description}</p>
          <p className="mb-2"><strong>Price:</strong> ₹{selectedBook.price}</p>
          <p className="mb-4"><strong>Copies Available:</strong> {selectedBook.totalCopies}</p>
          <div className="flex justify-end">
          <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleBuyBook(selectedBook)}
            >
              Buy
            </button>

            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    {showQuantityModal && (
      <QuantityModal
        book={bookToBuy}
        onConfirm={handleConfirmPurchase}
        onClose={() => setShowQuantityModal(false)}
      />
    )}
    {showPurchaseModal && (
      <PurchaseModal
        message={purchaseMessage}
        onClose={closeModal}
      />
    )}
  </div>
);
};

export default UserDashboard;