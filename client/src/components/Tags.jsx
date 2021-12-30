import { useState } from 'react';
import axios from 'axios';

function Tags({ tag, setTag, tags, getTags }) {
  const [createNewTag, setCreateNewTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('');

  const handleTagChange = e => {
    const { value } = e.target;
    if (value === 'NEW') {
      setCreateNewTag(true);
    } else {
      setCreateNewTag(false);
      setTag(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    return axios
      .post('/api/tags', { newTagName, newTagColor })
      .then(() => {
        getTags();
        setNewTagName('');
        setNewTagColor('');
        setCreateNewTag(false);
      })
      .catch(err => console.error(err.message));
  };
  return (
    <>
      <div className='input-group mb-3'>
        <div className='input-group-prepend'>
          <label className='input-group-text' htmlFor='tags'>
            Tags
          </label>
        </div>
        <select
          value={tag}
          onChange={handleTagChange}
          className='custom-select'
          id='tags'
        >
          {tags.map(tag => (
            <option value={tag.name} key={tag.tag_id}>
              {tag.name}
            </option>
          ))}
          <option value={'NEW'}>CREATE NEW TAG</option>
        </select>
      </div>
      {createNewTag && (
        <form className='d-flex mb-2' onSubmit={handleSubmit}>
          <input
            name='tag'
            required
            placeholder='CREATE NEW TAG'
            className='form-control'
            value={newTagName}
            onChange={e => setNewTagName(e.target.value)}
          />
          <input
            name='color'
            required
            placeholder='HEX COLOR (#000000)'
            className='form-control'
            value={newTagColor}
            onChange={e => setNewTagColor(e.target.value)}
          />
          <button className='btn btn-primary'>OK</button>
        </form>
      )}
    </>
  );
}

export default Tags;
