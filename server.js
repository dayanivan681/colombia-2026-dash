import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = '2c39f15c-d7c5-8015-9f9a-f0bc2eb51a16';

app.get('/api/packing-list', async (req, res) => {
  try {
    const response = await notion.blocks.children.list({ block_id: PAGE_ID, page_size: 100 });
    const items = response.results.map(b => ({
      id: b.id,
      type: b.type,
      text: b[b.type]?.rich_text?.[0]?.plain_text || '',
      checked: b.type === 'to_do' ? b.to_do.checked : undefined
    }));
    res.json(items);
  } catch (error) {
    console.error("Error fetching from Notion:", error);
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/packing-list/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;
    
    await notion.blocks.update({
      block_id: id,
      to_do: {
        checked: checked
      }
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating Notion:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
