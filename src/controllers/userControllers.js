// import StudentService from "../services/StudentService.js";

// class StudentController {
//   static async create(req, res) {
//     try {
//       const studentData = req.body;

//       if (!studentData.name || !studentData.email || !studentData.cpf){
//         return res.status(400).json({error: 'Nome, email e cpf sao obrigatorios'});

//       }
//       const newStudent = await StudentService.createStudent(studentData);

//       return res.status(201).json({
//         success: true,
//         data: newStudent
//       });
//     }catch (error){
//       return res.status(400).json({
//         success: false,
//         error: error.message
//       });
//     }
//   }
// }

// export default StudentController;

import { Student } from "../models/Student.js"

class StudentController {
  static async listStudent(req, res) {
    try {

      const student = await Student.findAll();
      return res.status(200).json(student);

    } catch (error) {

      console.error("erro ao listar Alunos", error);
      return res.status(500).json({ error: "erro interno do Servidor" });

    }
  }


  // Função para criar um novo estudante
  static async insertStudent(req, res) {
    try {
      const {
        name,
        applyType,
        shift,
        legacyStudent,
        disabledStudent,
        recordlessStudent,
        socialName,
        birthDate,
        cpf,
        nationality,
        state,
        idNumber,
        idExpDate,
        idIssuingBody,
        ethnicity,
        cep,
        address,
        cellphoneNumber,
        landlinePhone,
        emergencyPhone,
        responsibleName,
        responsibleId,
        gender
      } = req.body;

      const studentPhoto = req.files?.studentPhoto?.[0]?.path || null;
      const studentProofOfResidence = req.files?.studentProofOfResidence?.[0]?.path || null;
      const studentId = req.files?.studentProofOfResidence?.[0]?.path || null;
      const studentMedicalReport = req.files?.studentMedicalReport?.[0]?.path || null;
      const studentAcademicRecord = req.files?.studentAcademicRecord?.[0]?.path || null;

      const newStudent = await Student.create({
        name,
        applyType,
        studentPhoto,
        shift,
        legacyStudent,
        disabledStudent,
        recordlessStudent,
        socialName,
        birthDate,
        cpf,
        nationality,
        state,
        idNumber,
        idExpDate,
        idIssuingBody,
        studentId,
        ethnicity,
        cep,
        studentProofOfResidence,
        address,
        cellphoneNumber,
        landlinePhone,
        emergencyPhone,
        responsibleName,
        responsibleId,
        gender,
        studentMedicalReport,
        studentAcademicRecord
      });

      return res.status(201).json({
        message: 'Estudante criado com sucesso!',
        student: newStudent
      });
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
      return res.status(500).json({
        message: 'Erro ao criar estudante',
        error: error.message
      });
    }
  }



}

export default StudentController;