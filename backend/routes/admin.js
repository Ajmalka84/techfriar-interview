const router = require("express").Router();
const admindata = require("../model/admin");
const vehicledata = require("../model/vehicles");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify } = require("../middlewares/middleware");

const multer = require("multer");

const storage = multer.memoryStorage(); //validations to do
const fileFilter = (req, file, cb) => {
  // Allow only image and video files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const s3_bucket_name = "socialhub-ajmal"
const s3_region = "ap-south-1"
const s3_access_key = "AKIAZ54T4DU5CQ6AKTKP"
const s3_secret_key = "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"
const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  req,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = new S3Client({
    credentials: {
      accessKeyId: s3_access_key,
      secretAccessKey: s3_secret_key,
    },
    region: s3_region,
  });


router.post("/login", async (req, res) => {
  try {
    const adminDB = await admindata.findOne({ username: req.body.username });
    console.log(adminDB);

    if (!adminDB) {
      // If no user is found, return an error response
      return res.status(400).json("Wrong Username");
    }

    let passwordValidation = await bcrypt.compare(
      req.body.password,
      adminDB.password
    );

    if (!passwordValidation) {
      // If password is incorrect, return an error response
      return res.status(400).json("Wrong Password");
    }

    // If username and password are correct, create and send a token
    let payload = { username: req.body.username };
    const token = jwt.sign(payload, "secretKey");
    res.json(token);
  } catch (error) {
    res.status(500).json({ message: "server side issue" });
  }
});

router.get("/get-vehicle", verify, async (req, res) => {
  try {
    console.log("first");
    const vehicleDB = await vehicledata.find();
    console.log("first");
    console.log(vehicleDB);
    res.status(200).json(vehicleDB);
  } catch (error) {
    res.status(500).json({ message: "server side issue" });
  }
});

router.post(
  "/add-vehicle",
  verify,
  upload.array("images", 5),
  async (req, res) => {
    try {
      
        
        let imgfiles = [];
        for (let i = 0; i < req.files.length; i++) {
          const imagename = (bytes = 32) =>
            crypto.randomBytes(bytes).toString("hex");
            const imageName = imagename();
            const params = {
                Bucket: s3_bucket_name,
                Key: imageName,
                Body: req.file?.buffer,
                ContentType: req.file?.mimetype,
              };
              const command = new PutObjectCommand(params);
              await s3.send(command);
              imgfiles.push(imageName);
        }

      const newVehicle = await new vehicledata({
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        images: [...imgfiles],
      });

      await newVehicle.save();
      res.status(200).json("create vehicle success");
    } catch (error) {
      console.log(error);
      res.status(500).json("server side issue")
    }
  }
);

module.exports = router;

// await newVehicle.save();
// console.log("first")
// res.send("its ok")
