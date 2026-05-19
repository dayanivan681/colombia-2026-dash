import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function getBlocks() {
  try {
    const response = await notion.blocks.children.list({
      block_id: '2c39f15c-d7c5-8015-9f9a-f0bc2eb51a16',
    });
    console.log(JSON.stringify(response.results.map(b => {
      let text = '';
      if (b[b.type] && b[b.type].rich_text) {
          text = b[b.type].rich_text.map(t => t.plain_text).join('');
      } else if (b.type === 'child_page') {
          text = b.child_page.title;
      } else if (b.type === 'child_database') {
          text = b.child_database.title;
      }
      return {
        type: b.type,
        text: text,
      }
    }), null, 2));
  } catch (err) {
    console.error("Error getting blocks:", err);
  }
}

getBlocks();
