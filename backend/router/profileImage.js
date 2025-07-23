const express = require('express');
const router = express.Router()
const multer = require('multer');
const cloudinary = require('../lib/cloudinaryConfig');
const { Readable } = require('stream');



// Use memory storage so files aren't saved locally
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/profile-upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  // Convert buffer to readable stream
  const bufferStream = Readable.from(req.file.buffer);

  // Upload stream to Cloudinary
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'dream aura' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary Error:', error);
        return res.status(500).json({ error: 'Cloud upload failed' });
      }

      res.json({
        message: 'Uploaded successfully!',
        url: result.secure_url,
      });
    }
  );

  bufferStream.pipe(stream); // pipe buffer to Cloudinary upload
});


module.exports = router

