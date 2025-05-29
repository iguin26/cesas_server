import StudentService from "../services/StudentService";

class StudentController {
  static async create(req, res) {
    try {
      const studentData = req.body;

      if (!studentData.name || !studentData.email || !studentData.cpf){
        return res.status(400).json({error: 'Nome, email e cpf sao obrigatorios'});

      }
      const newStudent = await StudentService.createStudent(studentData);

      return res.status(201).json({
        success: true,
        data: newStudent
      });
    }catch (error){
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default StudentController;