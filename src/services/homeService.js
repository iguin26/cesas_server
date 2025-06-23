import { Home } from "../models/Home.js";
import { Event } from "../models/Event.js";

class HomeService {

    static async listEvents() {
        try {
            return await Event.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar eventos", error);
            throw new Error("Falha ao buscar eventos no banco de dados");
        }
    }

    static async listHomeData() {
        try {
            return await Home.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar home infos", error);
            throw new Error("Falha ao buscar home infos no banco de dados");
        }
    }
}

export default HomeService;