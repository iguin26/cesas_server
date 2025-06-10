import { profisStudent } from "../models/profisStudent.js";

class profisStudentController {
  
  // Listar todos os estudantes
  static async listStudent(req, res) {
    try {
      const students = await profisStudent.findAll();
      return res.status(200).json(students);
    } catch (error) {
      console.error("Erro ao listar estudantes:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Criar novo estudante
  static async insertStudent(req, res) {
    try {
      const {
        name,
        applyCourse,
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
        gender
      } = req.body;

      const studentMedicalReport = req.files?.studentMedicalReport?.[0]?.path || null;

      const newStudent = await profisStudent.create({
        name,
        applyCourse,
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
        studentMedicalReport
      });

      return res.status(201).json({
        message: 'Estudante criado com sucesso!',
        student: newStudent
      });

    } catch (error) {
      console.error("Erro ao criar estudante:", error);
      return res.status(500).json({
        message: 'Erro ao criar estudante',
        error: error.message
      });
    }
  }
}

export default profisStudentController;
