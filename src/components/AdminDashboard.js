import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import AdminNavbar from './AdminNavbar';

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const userStatisticsChartRef = useRef(null);
  const userRegistrationChartRef = useRef(null);
  const bookStatisticsChartRef = useRef(null);
  const publisherAuthorChartRef = useRef(null);
  const bookAvailabilityChartRef = useRef(null);
  const publisherPurchasesChartRef = useRef(null);
  const userLoginCountChartRef = useRef(null);

  useEffect(() => {
    fetchDataAndCreateCharts();
  }, []);

  async function fetchDataAndCreateCharts() {
    try {
      setIsLoading(true);

      // Fetch data
      const userStatsResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/user-statistics');
      const userStats = await userStatsResponse.json();
      console.log(userStats);

      const userRegistrationsResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/user-registrations');
      const userRegistrations = await userRegistrationsResponse.json();
      console.log(userRegistrations);

      const bookStatsResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/book-statistics');
      const bookStats = await bookStatsResponse.json();
      console.log(bookStats);

      const publisherAuthorStatsResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/publisher-author-statistics');
      const publisherAuthorStats = await publisherAuthorStatsResponse.json();
      console.log(publisherAuthorStats);

      const publisherPurchasesResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/publisher-purchases');
      const publisherPurchases = await publisherPurchasesResponse.json();
      console.log(publisherPurchases);

      const userLoginCountResponse = await fetch('https://online-book-website-backend-2.onrender.com/api/user-login-count');
      const userLoginCount = await userLoginCountResponse.json();
      console.log(userLoginCount);

      // Create charts
      createUserStatisticsChart(userStats);
      createUserRegistrationChart(userRegistrations);
      createBookStatisticsChart(bookStats);
      createPublisherAuthorChart(publisherAuthorStats);
      createBookAvailabilityChart(bookStats);
      createPublisherPurchasesChart(publisherPurchases);
      createUserLoginCountChart(userLoginCount);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data or creating charts:', error);
      setIsLoading(false);
    }
  }

  function createUserStatisticsChart(data) {
    new Chart(userStatisticsChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Total Users', 'Admin Users', 'Regular Users'],
        datasets: [{
          label: 'User Statistics',
          data: [data.totalUsers, data.adminUsers, data.regularUsers],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'User Statistics'
          }
        }
      }
    });
  }

  function createUserRegistrationChart(data) {
    new Chart(userRegistrationChartRef.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'New User Registrations',
          data: data.values,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'User Registrations Over Time'
          }
        }
      }
    });
  }

  function createBookStatisticsChart(data) {
    new Chart(bookStatisticsChartRef.current, {
      type: 'pie',
      data: {
        labels: ['Available Books', 'Purchased Books'],
        datasets: [{
          data: [data.availableBooks, data.purchasedBooks],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Book Statistics'
          }
        }
      }
    });
  }

  function createPublisherAuthorChart(data) {
    new Chart(publisherAuthorChartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Publishers', 'Authors'],
        datasets: [{
          data: [data.totalPublishers, data.totalAuthors],
          backgroundColor: [
            'rgba(255, 159, 64, 0.6)',
            'rgba(201, 203, 207, 0.6)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Publishers and Authors'
          }
        }
      }
    });
  }

  function createBookAvailabilityChart(data) {
    const totalBooks = data.availableBooks + data.purchasedBooks;

    new Chart(bookAvailabilityChartRef.current, {
      type: 'bar',
      data: {
        labels: ['Total Books', 'Available Books', 'Purchased Books'],
        datasets: [{
          label: 'Book Availability',
          data: [totalBooks, data.availableBooks, data.purchasedBooks],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Book Availability'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Books'
            }
          }
        }
      }
    });
  }

  function createPublisherPurchasesChart(data) {
    new Chart(publisherPurchasesChartRef.current, {
      type: 'bar',
      data: {
        labels: data.publishers,
        datasets: [{
          label: 'Purchased Copies',
          data: data.purchasedCopies,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Publisher Sales'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Purchased Copies'
            }
          }
        }
      }
    });
  }

  function createUserLoginCountChart(data) {
    new Chart(userLoginCountChartRef.current, {
      type: 'bar',
      data: {
        labels: data.usernames,
        datasets: [{
          label: 'Login Count',
          data: data.loginCounts,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'User Login Activity'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Logins'
            }
          }
        }
      }
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '50%', padding: '10px' }}>
          <canvas ref={userStatisticsChartRef} id="userStatisticsChart"></canvas>
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <canvas ref={userRegistrationChartRef} id="userRegistrationChart"></canvas>
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <canvas ref={bookAvailabilityChartRef} id="bookAvailabilityChart"></canvas>
        </div>
        <div style={{ width: '35%', padding: '10px' }}>
          <canvas ref={bookStatisticsChartRef} id="bookStatisticsChart"></canvas>
        </div>
        <div style={{ width: '35%', padding: '10px' }}>
          <canvas ref={publisherAuthorChartRef} id="publisherAuthorChart"></canvas>
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <canvas ref={publisherPurchasesChartRef} id="publisherPurchasesChart"></canvas>
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <canvas ref={userLoginCountChartRef} id="userLoginCountChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
