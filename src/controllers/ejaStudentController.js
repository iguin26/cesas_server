// import { ejaStudent } from "../models/ejaStudent.js"

// class ejaStudentController {
//   static async listStudent(req, res) {
//     try {

//       const student = await ejaStudent.findAll();
//       return res.status(200).json(student);

//     } catch (error) {

//       console.error("erro ao listar Alunos", error);
//       return res.status(500).json({ error: "erro interno do Servidor" });

//     }
//   }

//   // Função para criar um novo estudante
//   static async insertStudent(req, res) {
//     try {
//       const {
//         name,
//         applyType,
//         shift,
//         legacyStudent,
//         disabledStudent,
//         recordlessStudent,
//         socialName,
//         birthDate,
//         cpf,
//         nationality,
//         state,
//         idNumber,
//         idExpDate,
//         idIssuingBody,
//         ethnicity,
//         cep,
//         address,
//         cellphoneNumber,
//         landlinePhone,
//         emergencyPhone,
//         responsibleName,
//         responsibleId,
//         gender
//       } = req.body;

//       const studentPhoto = req.files?.studentPhoto?.[0]?.path || null;
//       const studentProofOfResidence = req.files?.studentProofOfResidence?.[0]?.path || null;
//       const studentId = req.files?.studentId?.[0]?.path || null;
//       const studentMedicalReport = req.files?.studentMedicalReport?.[0]?.path || null;
//       const studentAcademicRecord = req.files?.studentAcademicRecord?.[0]?.path || null;

//       const newStudent = await ejaStudent.create({
//         name,
//         applyType,
//         studentPhoto,
//         shift,
//         legacyStudent,
//         disabledStudent,
//         recordlessStudent,
//         socialName,
//         birthDate,
//         cpf,
//         nationality,
//         state,
//         idNumber,
//         idExpDate,
//         idIssuingBody,
//         studentId,
//         ethnicity,
//         cep,
//         studentProofOfResidence,
//         address,
//         cellphoneNumber,
//         landlinePhone,
//         emergencyPhone,
//         responsibleName,
//         responsibleId,
//         gender,
//         studentMedicalReport,
//         studentAcademicRecord
//       });

//       return res.status(201).json({
//         message: 'Estudante criado com sucesso!',
//         student: newStudent
//       });
//     } catch (error) {
//       console.error('Erro ao criar estudante:', error);
//       return res.status(500).json({
//         message: 'Erro ao criar estudante',
//         error: error.message
//       });
//     }
//   }

// }

// export default ejaStudentController;

import { ejaStudent } from "../models/ejaStudent.js";
import FileService from "../services/FileService.js";

class ejaStudentController {
  static async listStudent(req, res) {
    try {
      const student = await ejaStudent.findAll();
      return res.status(200).json(student);
    } catch (error) {
      console.error("erro ao listar Alunos", error);
      return res.status(500).json({ error: "erro interno do Servidor" });
    }
  }

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
        gender,
      } = req.body;

      const newStudent = await ejaStudent.create({
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
        gender,
        studentPhoto: null,
        studentProofOfResidence: null,
        studentId: null,
        studentMedicalReport: null,
        studentAcademicRecord: null,
      });

      console.log(` Estudante do eja criado com id: ${newStudent.id}`);

      if (req.files && Object.keys(req.files).length > 0) {
        const savedFiles = FileService.saveStudentFiles(
          newStudent.id,
          req.files,
          "ejaStudent"
        );

        // 3. Atualizar banco com nomes dos arquivos
        await newStudent.update({
          studentPhoto: savedFiles.studentPhoto || null,
          studentProofOfResidence: savedFiles.studentProofOfResidence || null,
          studentId: savedFiles.studentId || null,
          studentMedicalReport: savedFiles.studentMedicalReport || null,
          studentAcademicRecord: savedFiles.studentAcademicRecord || null,
        });

        console.log("imagens do strudent criadas");
      }

      return res.status(201).json({
        message: "Estudante do eja criado com sucesso!",
        student: newStudent,
      });
    } catch (error) {
      console.error("Erro ao criar estudante do eja:", error);
      return res.status(500).json({
        message: "Erro ao criar estudante",
        error: error.message,
      });
    }
  }
}

export default ejaStudentController;
