const multer = require("multer")
const path = require("path")
const fs = require("fs")







//check if the dictionary exist

const uploadDir = path.join(__dirname, "../uploads")

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb)
    {
      const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);

        const fileExtension = path.extname(file.originalname)
        cb(null, uniqueSuffix + fileExtension)
    }
})

const upload = multer({ storage: storage})

module.exports = upload