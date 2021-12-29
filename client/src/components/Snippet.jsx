import axios from 'axios';
import Annotate from './Annotate';

function Snippet({ snippet, setLoading }) {
  const handleDelete = async id => {
    return axios
      .delete(`/api/snippets/${id}`)
      .then(() => setLoading(true))
      .catch(err => console.error(err));
  };

  return (
    <tr>
      <td>{snippet.description}</td>
      <td>
        <Annotate snippet={snippet} />
      </td>
      <td>
        <button
          className='btn btn-danger bg-danger'
          onClick={() => handleDelete(snippet.snippet_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Snippet;
