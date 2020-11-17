//@ts-check
// helper for image uploads 
import multer from "multer"

const path = require("path")

//image upload
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
         cb(null, path.join("./uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// checking file type
const imageFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        // @ts-ignore
        cb(new Error('Please upload an image of the product.', 400), false);
    }
};

// upload function
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: imageFilter
});

export default upload;
