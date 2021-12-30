import axios from 'axios';
import Annotate from './Annotate';
import Button from './Button';

function Snippet({ snippet, setLoading }) {
  const handleDelete = async id => {
    return axios
      .delete(`/api/snippets/${id}`)
      .then(() => setLoading(true))
      .catch(err => console.error(err.message));
  };

  return (
    <tr>
      <td>{snippet.description}</td>
      <td>
        <Annotate snippet={snippet} />
      </td>
      <td>
        <Button
          className='btn btn-danger bg-danger'
          handleClick={() => handleDelete(snippet.snippet_id)}
          text='Delete'
        />
      </td>
    </tr>
  );
}

export default Snippet;
