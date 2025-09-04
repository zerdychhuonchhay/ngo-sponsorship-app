import { useState, useEffect } from 'react';
import axios from 'axios';

// --- Configuration ---
// This remains pointed to your local backend server for development.
const API_URL = 'http://127.0.0.1:8000/api/';

// --- Helper Components ---

// A simple placeholder for a user icon, used if no profile photo is available.
const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-400">
    <path d="M18 20a6 6 0 0 0-12 0" />
    <circle cx="12" cy="10" r="4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);


// --- Main Application Components ---

function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">NGO Student Management</h1>
      </nav>
    </header>
  );
}

function StudentCard({ student }) {
  // --- WHY this component exists ---
  // Breaking the UI into small, reusable components like this is a core concept in React.
  // It keeps the code clean, organized, and easier to manage.
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            {student.profile_photo ? (
              <img className="h-16 w-16 rounded-full object-cover" src={student.profile_photo} alt={`${student.first_name} ${student.last_name}`} />
            ) : (
              <UserCircleIcon />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-gray-900 truncate">
              {student.first_name} {student.last_name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              ID: {student.student_id}
            </p>
          </div>
        </div>
        <div className="mt-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.sponsorship_status === 'Sponsored' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {student.sponsorship_status}
            </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}students/`);
        setStudents(response.data);
        setError('');
      } catch (err) {
        console.error("Error fetching students:", err);
        setError('Failed to fetch student data. Please make sure the local API server is running.');
      } finally {
        // --- WHY we use finally ---
        // This block runs regardless of whether the try or catch block was executed.
        // It's the perfect place to set loading to false, because we know the
        // data fetching process is complete, whether it succeeded or failed.
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Student Roster</h2>

        {/* --- Conditional Rendering Logic --- */}
        {loading && <p className="text-center text-gray-500">Loading students...</p>}
        
        {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg"><strong>Error:</strong> {error}</p>}
        
        {!loading && !error && students.length === 0 && (
          <p className="text-center text-gray-500 bg-white p-6 rounded-lg shadow-md">
            No students found. You can add one in the Django Admin panel.
          </p>
        )}

        {!loading && !error && students.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

