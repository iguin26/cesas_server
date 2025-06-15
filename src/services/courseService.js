import { Op, where } from "sequelize";
import { ProfisCourse } from "../models/ProfisCourse.js";
import { ejaCourse } from "../models/ejaCourse.js";

class CourseService {

    static async listAllProfisCourses() {
        try {
            return await ProfisCourse.findAll({
                order: [['id', 'ASC']],
            });
        } catch (error) {
            console.error("Erro no Service ao listar Cursos", error);
            throw new Error("Falha ao buscar Cursos no banco de dados");
        }
    }

    static async listAllEJACourses() {
        try {
            return await ejaCourse.findAll({
                order: [['id', 'ASC']],
            });
        } catch (error) {
            console.error("Erro no Service ao listar Cursos", error);
            throw new Error("Falha ao buscar Cursos no banco de dados");
        }
    }

    static async getCoursesQuantity() {
        try {
            const quantity = await ProfisCourse.count();
            return quantity;
        } catch (error) {
            console.error("Erro ao contar cursos", error);
            throw new Error("Falha ao contar cursos no banco de dados");
        }
    }


    static async listCourseName(term) {
        try {
            if (!term || term.trim() === '') {
                return await this.listAllProfisCourses();
            }

            const courses = await ProfisCourse.findAll({
                where: {
                    name: { [Op.like]: `%${term}%` }
                },
                order: [['createdAt', 'DESC']]
            });

            if (!courses || courses.length === 0) {
                throw new Error('Nenhum Corso encontrado com esse termo')
            }
            return courses;
        } catch (error) {
            console.error("Erro no servoce ao buscar curso", error);
            throw error;

        }
    }

}

export default CourseService;