import multer from "../node_modules/multer/index.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "mongodb://casataramelli.duckdns.org:27017/test")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
const uploadStorage = multer({ storage: storage })

export default uploadStorage;