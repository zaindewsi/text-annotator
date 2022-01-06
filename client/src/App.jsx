import { useEffect, useState } from 'react';
import axios from 'axios';
import ListSnippets from './components/ListSnippets';
import AddSnippet from './components/AddSnippet';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSnippets = () => {
      return axios
        .get('/api/snippets')
        .then(res => {
          setSnippets(res.data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    };

    if (loading) {
      getSnippets();
    }
  }, [loading]);

  return (
    <div className='container'>
      <h1 className='text-center'>Filament Text Annotator</h1>
      <AddSnippet setLoading={setLoading} />
      <ListSnippets snippets={snippets} setLoading={setLoading} />
    </div>
  );
}

export default App;
