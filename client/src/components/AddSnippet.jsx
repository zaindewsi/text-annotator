import axios from 'axios';
import { useState } from 'react';
import Button from './Button';

function AddSnippet({ setLoading }) {
  const [snippet, setSnippet] = useState('');
  const [counter, setCounter] = useState(255);

  const handleSubmit = async e => {
    e.preventDefault();

    return axios
      .post('/api/snippets', { snippet })
      .then(() => {
        setLoading(true);
        setSnippet('');
        setCounter(255);
      })
      .catch(err => console.error(err.message));
  };

  const handleChange = e => {
    const { value } = e.target;
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
          required
          maxLength={255}
        />
        <Button className='btn btn-success' text='Add' />
      </form>
      <div className={'d-flex justify-content-end'}>
        <p>{counter} character(s) remaining</p>
      </div>
    </>
  );
}

export default AddSnippet;
