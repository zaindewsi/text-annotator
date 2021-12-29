import axios from 'axios';
import { useState } from 'react';

function AddSnippet({ setLoading }) {
  const [snippet, setSnippet] = useState('');
  const [counter, setCounter] = useState(255);
  const [formError, setFormError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!snippet) setFormError('empty');
    else if (snippet.length > 255) setFormError('length');
    else {
      return axios
        .post('/api/snippets', { snippet })
        .then(() => {
          setLoading(true);
          setSnippet('');
          setCounter(255);
        })
        .catch(err => console.error(err));
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    setFormError(false);
    setSnippet(value);
    setCounter(255 - value.length);
  };

  return (
    <>
      <form className='d-flex' onSubmit={handleSubmit}>
        <textarea
          type='text'
          placeholder='Create a new snippet'
          className='form-control'
          value={snippet}
          onChange={handleChange}
        />
        <button className='btn btn-success'>Add</button>
      </form>
      <div
        className={`d-flex ${
          formError ? 'justify-content-between' : 'justify-content-end'
        }`}
      >
        {formError && (
          <p className='text-danger'>
            {formError === 'length' && 'Snippet cannot exceed 255 characters'}
            {formError === 'empty' && 'Snippet cannot be empty'}
          </p>
        )}
        <p className={`${counter < 0 && 'text-danger'}`}>
          {counter} character(s) remaining
        </p>
      </div>
    </>
  );
}

export default AddSnippet;
