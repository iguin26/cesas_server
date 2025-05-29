import { Op, where } from "sequelize";
import { Course } from "../models/Course.js";

class CourseService{

    static async listAllCourses(){
        try{
            return await Course.findAll({
                order: [['createdAt','DESC']]
            });
        }catch(error){
            console.error("Erro no Service ao listar Cursos", error);
            throw new Error("Falha ao buscar Cursos no banco de dados");
        }
    }

    static async listCourseName(term){
        try{
            if(!term || term.trim() === ''){
                return await this.listAllCourses();
            }

            const courses = await Course.findAll({
                where: {
                    name: { [Op.like]: `%${term}%`}
                },
                order: [['createdAt', 'DESC']]
            });

            if(!courses || courses.length === 0){
                throw new Error('Nenhum Corso encontrado com esse termo')
            }
            return courses;
        }catch(error){
            console.error("Erro no servoce ao buscar curso", error);
            throw error;

        }
    }
    
}

export default CourseService;