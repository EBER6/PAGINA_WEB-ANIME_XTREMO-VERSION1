const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
  }

  res.json({
    mensaje: 'Imagen subida correctamente',
    ruta: `/uploads/${req.file.filename}`
  });
});

module.exports = router;