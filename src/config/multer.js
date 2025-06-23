import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

const privateStorage = multer.memoryStorage();

const studentFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Tipo de arquivo não permitido. Apenas JPEG, PNG, SVG e PDF são aceitos."
      ),
      false
    );
  }

  cb(null, true);
};

export const uploadStudentFiles = multer({
  storage: privateStorage,
  fileFilter: studentFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10mb
  },
});
