import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'simpsons.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const items = JSON.parse(fileContents);

      if (items.simpsons && items.simpsons.characters) {
        res.status(200).json(items.simpsons.characters);
      } else {
        res.status(404).json({ error: 'Simpsons characters not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
