const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path');

const app = express();

// enable files upload
app.use(fileUpload());


//add other middleware
app.use(cors());
app.use(morgan('dev'));

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.post('/upload', function(req, res) {
    let imageFile;
    let profileFile;
    let imageUploadPath;
    let profileUploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    imageFile = req.files.myImage;
    imageUploadPath = __dirname + '/public/' + imageFile.name;

    profileFile = req.files.myProfile;
    profileUploadPath = __dirname + '/public/' + profileFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    let err = null;
    imageFile.mv(imageUploadPath, function(err) {
      if (err) err = err;
    });

    profileFile.mv(profileUploadPath, function(err) {
      if (err) err = err;
    });

    if (err) {
      return res.status(500).send(err);
    } else {
      res.send('File uploaded!');
    }
});

//start app 
const port = process.env.PORT || 4000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);