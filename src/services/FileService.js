import fs from "fs";
import path from "path";

class FileService {
  static privateDir = path.join(process.cwd(), "private");

  static ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static saveStudentFiles(studentId, files, studentType = "ejaStudent") {
    const studentDir = path.join(
      this.privateDir,
      studentType,
      studentId.toString()
    );
    this.ensureDir(studentDir);

    const savedFiles = {};

    Object.keys(files).forEach((fieldName) => {
      const file = files[fieldName][0];

      const ext = path.extname(file.originalname);
      const filename = `${fieldName}${ext}`;
      const filePath = path.join(studentDir, filename);

      try {
        fs.writeFileSync(filePath, file.buffer);
        savedFiles[fieldName] = filename;
        console.log(`Imagem salva: ${filename} para estudante ${studentId}`);
      } catch (error) {
        console.error(`Erro ao salvar imagem ${filename}:`, error);
        savedFiles[fieldName] = null;
      }
    });

    return savedFiles;
  }

  static getStudentFilePath(studentId, filename, studentType = "ejaStudent") {
    return path.join(
      this.privateDir,
      studentType,
      studentId.toString(),
      filename
    );
  }

  static deleteStudentFiles(studentId, studentType = "ejaStudent") {
    try {
      const studentDir = path.join(
        this.privateDir,
        studentType,
        studentId.toString()
      );

      if (fs.existsSync(studentDir)) {
        const files = fs.readdirSync(studentDir);
        files.forEach((file) => {
          fs.unlinkSync(path.join(studentDir, file));
        });
        fs.rmdirSync(studentDir);
        console.log(`Pasta do estudante ${studentId} removida`);
      }
    } catch (error) {
      console.error(`Erro ao remover pasta do estudante ${studentId}:`, error);
    }
  }
}

export default FileService;
