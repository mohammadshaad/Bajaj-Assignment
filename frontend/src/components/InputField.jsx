
import React, { useState } from 'react';

const InputField = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = () => {
    try {
      const data = JSON.parse(jsonInput);
      onSubmit(data);
    } catch (e) {
      alert('Invalid JSON');
    }
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="10"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputField;
