import express from 'express';
import fs from 'fs/promises';
import path from 'path';

import { defaultCells, errorCells } from '../assets/notes';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

enum FilenameErrorMsg {
  NotSupport = 'Currently, only JavaScript file is supported 😂',
  NoExtension = 'I guess you miss the file extension 😅',
  InvalidFormat = 'The original file cannot be compiled correctly 🙁',
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    const parts = filename.split('.');
    try {
      // filename error handling
      if (parts.length === 1) {
        throw new Error(FilenameErrorMsg.NoExtension);
      } else if (parts[parts.length - 1] !== 'js') {
        throw new Error(FilenameErrorMsg.NotSupport);
      }

      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send(defaultCells);
      } else {
        let newFilename = `new-${filename}`;
        let errorMsg = FilenameErrorMsg.InvalidFormat;

        if (err.message === FilenameErrorMsg.NotSupport) {
          newFilename = `${parts[0]}.js`;
        } else if (err.message === FilenameErrorMsg.NoExtension) {
          newFilename = `${filename}.js`;
        }
        const newFilePath = path.join(dir, newFilename);

        await fs.writeFile(
          newFilePath,
          JSON.stringify(errorCells(errorMsg, newFilename)),
          'utf-8'
        );
        res.send(errorCells(errorMsg, newFilename));
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'ok' });
  });

  return router;
};
