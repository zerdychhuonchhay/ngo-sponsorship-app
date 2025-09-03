import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Configuration ---
// IMPORTANT: Replace this with your actual live backend URL
const API_URL = 'https://ngo-sponsorship-app-production.up.railway.app/api/students/';

// --- Reusable Components ---
const Header = () => (
  <header className="bg-gray-800 text-white shadow-md">
    <div className="container mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold">NGO Student Management</h1>
    </div>
  </header>
);

const StudentCard = ({ student }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {/* Placeholder for a profile photo */}
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-gray-900 truncate">
            {student.first_name} {student.last_name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            Student ID: {student.student_id}
          </p>
          <p className="text-sm text-gray-500 truncate">
            Status: <span className={`font-medium ${student.sponsorship_status === 'Sponsored' ? 'text-green-600' : 'text-yellow-600'}`}>{student.sponsorship_status || 'N/A'}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert">
    <strong className="font-bold">Error:</strong>
    <span className="block sm:inline ml-2">{message}</span>
  </div>
);


// --- Main App Component ---
function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function fetches data from our live Django API
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use axios to send a GET request to our API
        const response = await axios.get(API_URL);
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError('Failed to fetch student data. Please make sure the API server is running and accessible.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // The empty array [] means this effect runs only once when the component mounts

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Roster</h2>
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorDisplay message={error} />}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length > 0 ? (
              students.map(student => (
                <StudentCard key={student.id} student={student} />
              ))
            ) : (
              <p className="text-gray-500">No students found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
