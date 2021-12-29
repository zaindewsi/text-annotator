import axios from 'axios';
import { useEffect, useState } from 'react';

import { TextAnnotator } from 'react-text-annotate';

function Annotate({ snippet }) {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('PERSON');
  const [annotation, setAnnotation] = useState([]);
  console.log(annotation);

  const tagColors = {};
  tags.forEach(tag => (tagColors[tag.name] = tag.color));

  const getAnnotations = async id => {
    return axios
      .get(`/api/annotations/${id}`)
      .then(res => setAnnotation(res.data));
  };

  useEffect(() => {
    const getTags = async () => {
      return axios
        .get('/api/tags')
        .then(res => {
          setTags(res.data);
        })
        .catch(err => console.error(err));
    };

    getTags();
  }, []);

  return (
    <>
      <button
        type='button'
        className='btn btn-warning'
        data-bs-toggle='modal'
        data-bs-target={`#snippet-${snippet.snippet_id}`}
        onClick={() => getAnnotations(snippet.snippet_id)}
      >
        Annotate
      </button>
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
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <select value={tag} onChange={e => setTag(e.target.value)}>
                {tags.map(tag => (
                  <option value={tag.name} key={tag.tag_id}>
                    {tag.name}
                  </option>
                ))}
              </select>

              <TextAnnotator
                content={snippet.description}
                value={annotation}
                onChange={value => {
                  console.log('here', value);
                  setAnnotation(value);
                }}
                getSpan={span => ({
                  ...span,
                  tag: tag,
                  color: tagColors[tag],
                })}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Annotate;
