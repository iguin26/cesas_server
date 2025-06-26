import { profisStudent } from "../models/profisStudent.js";
import FileService from "../services/FileService.js";

class profisStudentController {
  static async listStudent(req, res) {
    try {
      const students = await profisStudent.findAll();
      return res.status(200).json(students);
    } catch (error) {
      console.error("Erro ao listar estudantes:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async insertStudent(req, res) {
    try {
      const {
        name,
        applyCourse,
        applyCourseName,
        applyShift,
        disabledStudent,
        levelOfEducation,
        specialNecessity,
        birthDate,
        cpf,
        nationality,
        naturality,
        cep,
        address,
        phone,
        mothersName,
        fathersName,
        gender,
      } = req.body;

      const newStudent = await profisStudent.create({
        name,
        applyCourse,
        applyCourseName,
        applyShift,
        disabledStudent,
        levelOfEducation,
        specialNecessity,
        birthDate,
        cpf,
        nationality,
        naturality,
        cep,
        address,
        phone,
        mothersName,
        fathersName,
        gender,
        studentMedicalReport: null,
      });

      console.log(`Estudante do profis criado id: ${newStudent.id}`);

      if (req.files && req.files.studentMedicalReport) {
        const savedFiles = FileService.saveStudentFiles(
          newStudent.id,
          req.files,
          "profisStudent"
        );

        await newStudent.update({
          studentMedicalReport: savedFiles.studentMedicalReport || null,
        });

        console.log("imagem do student salva");
      }

      return res.status(201).json({
        message: "Estudante do profis criado com sucesso!",
        student: newStudent,
      });
    } catch (error) {
      console.error("Erro ao criar estudante do profis:", error);
      return res.status(500).json({
        message: "Erro ao criar estudante",
        error: error.message,
      });
    }
  }
}

export default profisStudentController;
