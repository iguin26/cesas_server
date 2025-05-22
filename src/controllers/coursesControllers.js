import { Course } from "../models/Course.js"


class CourseController{
//LISTANDO TODOS OS CURSOS
    static async listCourse(req, res){
      try{

        const course = await Course.findAll();
        return res.status(200).json(course);

      }catch(error){

        console.error("erro ao listar Cursos", error);
        return res.status(500).json({error: "erro interno do Servidor"});

      }
    }

    static async listCourseByName(req, res){
  //LISTANDO CURSOS POR NOME
      try{
        const {name} = req.params;
        const course = await Course.findOne({where: {name} });
        if (!course){
          return res.status(404).json({error: 'Curso nao encontrado'});
        }
        return res.status(200).json(course);

      }catch(error){

        console.error("Erro ao buscar Curso", error);
        return res.status(500).json({error: "Erro interno no servidor"});

      }

    }

}

export default CourseController;