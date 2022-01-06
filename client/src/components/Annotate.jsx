import axios from 'axios';
import { useEffect, useState } from 'react';
import { TokenAnnotator } from 'react-text-annotate';
import Button from './Button';
import Tags from './Tags';

function Annotate({ snippet }) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('PERSON');
  const [annotations, setAnnotations] = useState([]);

  const tagColors = {};
  tags.forEach(tag => (tagColors[tag.name] = tag.color));

  const getAnnotations = () => {
    return axios
      .get(`/api/annotations/${snippet.snippet_id}`)
      .then(res => setAnnotations(res.data))
      .catch(err => console.error(err.message));
  };

  const handleSave = () => {
    return axios
      .put(`/api/annotations/${snippet.snippet_id}`, annotations)
      .then(res => setAnnotations(res.data))
      .catch(err => console.error(err.message));
  };

  const getTags = () => {
    return axios
      .get('/api/tags')
      .then(res => {
        setTags(res.data);
      })
      .catch(err => console.error(err.message));
  };

  useEffect(() => {
    getTags();
  }, [annotations]);

  return (
    <>
      <Button
        type='button'
        className='btn btn-warning'
        toggle='modal'
        target={`#snippet-${snippet.snippet_id}`}
        handleClick={getAnnotations}
        text='Annotate'
      />
      <div
        className='modal fade'
        id={`snippet-${snippet.snippet_id}`}
        tabIndex='-1'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Snippet {snippet.snippet_id}</h5>
              <Button
                type='button'
                className='btn-close'
                dismiss='modal'
                abel='Close'
              />
            </div>
            <div className='modal-body'>
              <Tags tag={tag} tags={tags} setTag={setTag} getTags={getTags} />
              <TokenAnnotator
                tokens={snippet.description.split(' ')}
                value={annotations}
                onChange={value => {
                  setAnnotations(value);
                }}
                getSpan={span => {
                  return {
                    ...span,
                    tag: tag,
                    color: tagColors[tag],
                  };
                }}
              />
            </div>
            <div className='modal-footer'>
              <Button
                type='button'
                className='btn btn-secondary'
                text='Close'
                dismiss='modal'
              />
              <Button
                type='button'
                className='btn btn-primary'
                text='Save'
                dismiss='modal'
                handleClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Annotate;
