const express = require('express');
const cors = require('cors');

const pool = require('./db');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES

// SNIPPETS
app.get('/api/snippets', async (req, res) => {
  try {
    const allSnippets = await pool.query('SELECT * FROM snippet');
    res.json(allSnippets.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/api/snippets', async (req, res) => {
  try {
    const { snippet } = req.body;
    const newSnippet = await pool.query(
      'INSERT INTO snippet (description) VALUES($1) RETURNING *',
      [snippet],
    );
    res.json(newSnippet.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM snippet WHERE snippet_id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
  }
});

// TAGS
app.get('/api/tags', async (req, res) => {
  try {
    const allTags = await pool.query('SELECT * FROM tag');
    res.json(allTags.rows);
  } catch (error) {
    console.error(error);
  }
});

// ANNOTATIONS
app.get('/api/annotations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const annotationsForSnippet = await pool.query(
      'SELECT start, finish as end, tag.name as tag FROM annotation JOIN tag ON annotation.tag_id = tag.tag_id WHERE snippet_id = $1',
      [id],
    );
    res.json(annotationsForSnippet.rows);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port || 5000, () => {
  console.log(`server started on port ${port}`);
});
