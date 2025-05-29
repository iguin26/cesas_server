import CourseService from "../services/courseService.js";

class CourseController {
  static async listCourse(req, res) {
    try{
      const courses = await CourseService.listAllCourses();
      return res.status(200).json(courses);
    }catch(error){
      console.error(" erro no controller", error);
      return res.status(500).json({
        erro: error.message || 'Erro interno ao listar cursos'
      });
    }
  }

  static async listCoursesByName(req, res){
    try{
      const term = req.query.name || '';
      const courses = await CourseService.listCourseName(term);
      return res.status(200).json(courses);
    }catch(error){
      console.error('Erro no controller', error);

      if(error.message === 'Nenum curso encontrado com esse nome'){
        return res.status(404).json({erro: error.message});
      }
      return res.status(500).json({
        erro: error.message || 'Erro interno ao buscar cursos'
      });
    }
  }

}

export default CourseController;