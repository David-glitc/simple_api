import express, { type Request, type Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';


const app = express();
const upload = multer({ dest: 'uploads/' });


app.post('/api/upload_file', upload.single('file'), (req: Request, res: Response) => {
  const file = req.file;
    if (!file) {
    return res.status(400).json({ status: 'error', message: 'No file uploaded' });
  }

  const tempPath = file.path;
  const targetPath1 = path.join(__dirname, 'uploads', file.originalname);
  const targetPath2 = path.join(__dirname, 'uploads',  "2" + file.originalname );

  fs.readFile(tempPath, (err, data) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'File read error' });
    }

    fs.writeFile(targetPath1, data, (err) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'File write error' });
      }
    });

    fs.writeFile(targetPath2, data, (err) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'File write error' });
      }

      // Clean up the temporary file
      fs.unlink(tempPath, (err) => {
        if (err) {
          return res.status(500).json({ status: 'error', message: 'Temporary file deletion error' });
        }

        res.json({ status: 'success', message: 'File uploaded and saved successfully' });
      });
    });
  });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {

  console.log(`🚀 Server started successfully at http://localhost:${PORT}/api/upload_files`);
});
