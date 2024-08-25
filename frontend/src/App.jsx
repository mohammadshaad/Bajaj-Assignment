import { useState } from 'react';
import './App.css';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highestLowercaseAlphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const data = JSON.parse(jsonInput);
      const res = await fetch('https://shaad-bajaj-finserv-backend.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const result = await res.json();
      console.log('API Response:', result);
      setResponse(result);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error:', err);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    return (
      <div className="results-container">
        {selectedOptions.includes('numbers') ? (
          numbers.length > 0 ? (
            <div className="result-item">
              <h3 className="result-title">Numbers</h3>
              <pre className="result-content">{JSON.stringify(numbers, null, 2)}</pre>
            </div>
          ) : (
            <div className="result-item">
              <h3 className="result-title">Numbers</h3>
              <p className="result-content">No numbers found.</p>
            </div>
          )
        ) : null}
        
        {selectedOptions.includes('alphabets') ? (
          alphabets.length > 0 ? (
            <div className="result-item">
              <h3 className="result-title">Alphabets</h3>
              <pre className="result-content">{JSON.stringify(alphabets, null, 2)}</pre>
            </div>
          ) : (
            <div className="result-item">
              <h3 className="result-title">Alphabets</h3>
              <p className="result-content">No alphabets found.</p>
            </div>
          )
        ) : null}

        {selectedOptions.includes('highestLowercaseAlphabet') ? (
          highest_lowercase_alphabet.length > 0 ? (
            <div className="result-item">
              <h3 className="result-title">Highest Lowercase Alphabet</h3>
              <pre className="result-content">{JSON.stringify(highest_lowercase_alphabet, null, 2)}</pre>
            </div>
          ) : (
            <div className="result-item">
              <h3 className="result-title">Highest Lowercase Alphabet</h3>
              <p className="result-content">No highest lowercase alphabet found.</p>
            </div>
          )
        ) : null}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>
      <h2>Made with ❤️ by
        {" "}
        <a href="https://github.com/mohammadshaad" target="_blank" rel="noreferrer">
          <strong>Shaad</strong>
        </a>
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='["A","C","Z","c","i"]'
          rows="10"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div>
          <Select
            options={options}
            isMulti
            onChange={handleSelectChange}
            placeholder="Select options..."
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
