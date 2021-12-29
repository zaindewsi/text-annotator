import Snippet from './Snippet';

function ListSnippets({ snippets, onDelete, setLoading }) {
  return (
    <div>
      <table className='mt-5 table'>
        <thead>
          <tr>
            <th scope='col'>Snippet</th>
            <th scope='col'>Annotate</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map(snippet => (
            <Snippet
              snippet={snippet}
              key={snippet.snippet_id}
              deleteSnippet={onDelete}
              setLoading={setLoading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListSnippets;
