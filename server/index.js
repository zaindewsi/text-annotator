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
    console.error(error.message);
  }
});

app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM snippet WHERE snippet_id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
  }
});

// TAGS
app.get('/api/tags', async (req, res) => {
  try {
    const allTags = await pool.query('SELECT * FROM tag');
    res.json(allTags.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post('/api/tags', async (req, res) => {
  try {
    const { newTagName, newTagColor } = req.body;
    const newTag = await pool.query(
      'INSERT INTO tag (name, color) VALUES($1, $2) RETURNING *',
      [newTagName.toUpperCase(), newTagColor],
    );
    res.json(newTag.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// ANNOTATIONS
app.get('/api/annotations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const annotationsForSnippet = await pool.query(
      'SELECT start, finish as end, tag.name as tag, tag.color as color, annotation_id FROM annotation JOIN tag ON annotation.tag_id = tag.tag_id WHERE snippet_id = $1',
      [id],
    );
    res.json(annotationsForSnippet.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.put('/api/annotations/:id', async (req, res) => {
  try {
    const snippet_id = req.params.id;

    await pool.query('DELETE FROM annotation WHERE snippet_id = $1', [
      snippet_id,
    ]);

    let result = [];

    const annotations = req.body;
    for (let annotation of annotations) {
      const { start, end, tag } = annotation;
      const id = await pool.query('SELECT tag_id FROM tag WHERE name = $1', [
        tag,
      ]);
      const { tag_id } = id.rows[0];
      const newAnnotations = await pool.query(
        'INSERT INTO annotation (start, finish, tag_id, snippet_id) VALUES($1,$2,$3,$4) RETURNING *',
        [start, end, tag_id, snippet_id],
      );

      result.push(newAnnotations.rows[0]);
    }
    res.json(result);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port || 5000, () => {
  console.log(`server started on port ${port}`);
});
