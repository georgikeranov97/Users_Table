const express = require('express');
const upload = require('express-fileupload');

const app = express();

app.use(upload());

app.post('/upload', (req, res) => {
  const file = req.files.file;

  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  file.mv(`${__dirname}/public/files/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/files/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server has been successfully started!'));
