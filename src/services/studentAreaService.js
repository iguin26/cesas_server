import { studentAreaURL } from "../models/studentAreaURL.js";

class StudentAreaService {

    static async listStudentAreaURL() {
        try {
            return await studentAreaURL.findOne({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar URL da Área do Aluno", error);
            throw new Error("Falha ao buscar o URL da Área do Aluno no banco de dados");
        }
    }
}

export default StudentAreaService;