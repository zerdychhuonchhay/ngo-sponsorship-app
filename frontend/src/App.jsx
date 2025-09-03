import { useState, useEffect } from 'react';
import axios from 'axios';

// --- Configuration ---
// This is the address of our local backend API.
// We've changed it from the Railway URL to point to our local Django server.
const API_URL = 'http://127.0.0.1:8000/api/';

function App() {
  // --- State Management ---
  // 'students' will hold the list of students we fetch from the API.
  // 'error' will hold any error messages if the fetch fails.
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  // --- Data Fetching ---
  // useEffect is a React hook that runs code after the component renders.
  // We use it here to fetch our student data as soon as the app loads.
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // We use axios to send a GET request to our API's 'students' endpoint.
        // Note the trailing slash, which is important for Django REST Framework.
        const response = await axios.get(`${API_URL}students/`);
        // If the request is successful, we update our 'students' state with the data.
        setStudents(response.data);
        setError(''); // Clear any previous errors
      } catch (err) {
        // If there's an error (like a network issue or a 500 server error),
        // we update our 'error' state to display a helpful message.
        console.error("Error fetching students:", err);
        setError('Failed to fetch student data. Please make sure the API server is running and accessible.');
      }
    };

    fetchStudents();
  }, []); // The empty array [] means this effect runs only once, when the component first mounts.


  // --- Rendering the UI ---
  // This is the JSX that defines what our application looks like.
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>NGO Student Management</h1>
      
      <h2>Student Roster</h2>

      {/* Conditional Rendering: Show an error message if something went wrong. */}
      {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}

      {/* Conditional Rendering: Show a loading message while we wait for data. */}
      {!error && students.length === 0 && <p>Loading students...</p>}
      
      {/* Conditional Rendering: If there are students, map over the array 
        and render a list item for each one. 
      */}
      {!error && students.length > 0 && (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.first_name} {student.last_name} ({student.student_id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

