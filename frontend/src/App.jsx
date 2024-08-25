// // src/App.jsx
// import React, { useState } from 'react';
// import InputField from './components/InputField';
// import ResultDisplay from './components/ResultDisplay';

// const App = () => {
//   const [result, setResult] = useState(null);

//   const handleSubmit = async (data) => {
//     try {
//       const response = await fetch('/bfhl', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ data }),
//       });
//       const result = await response.json();
//       setResult(result);
//     } catch (e) {
//       console.error('Error:', e);
//     }
//   };

//   return (
//     <div>
//       <h1>Bajaj Finserv Health Challenge</h1>
//       <InputField onSubmit={handleSubmit} />
//       <ResultDisplay result={result} />
//     </div>
//   );
// };

// export default App;

import { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('http://localhost:8080/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });      

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError('Invalid JSON');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(prevOptions =>
      prevOptions.includes(value)
        ? prevOptions.filter(option => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Numbers') && (
          <div>
            <h3>Numbers</h3>
            <pre>{JSON.stringify(numbers, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>
            <h3>Alphabets</h3>
            <pre>{JSON.stringify(alphabets, null, 2)}</pre>
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet</h3>
            <pre>{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A","C","z"]}'
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <select multiple={true} value={selectedOptions} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
