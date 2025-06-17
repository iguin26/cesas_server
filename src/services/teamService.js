import { Staff} from "../models/Staff.js";
import { Coordinators } from "../models/Coordinators.js";
import { Supervision } from "../models/Supervision.js";
import { TeachingStaff } from "../models/TeachingStaff.js";

class TeamService {

    static async listStaff() {
        try {
            return await Staff.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar equipe", error);
            throw new Error("Falha ao buscar equipe no banco de dados");
        }
    }

    static async listSupervision() {
        try {
            return await Supervision.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar supervisão", error);
            throw new Error("Falha ao buscar supervisão no banco de dados");
        }
    }

    static async listCoordinators() {
        try {
            return await Coordinators.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar coordenadores", error);
            throw new Error("Falha ao buscar coordenadores no banco de dados");
        }
    }

    static async listTeachingStaff() {
        try {
            return await TeachingStaff.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar equipe docente", error);
            throw new Error("Falha ao buscar equipe docente no banco de dados");
        }
    }
}

export default TeamService;