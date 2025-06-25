import { Card } from "../models/Card.js";

class CardService {

    static async listAllCards() {
        try {
            return await Card.findAll({
                order: [['id', 'ASC']], 
            });
        } catch (error) {
            console.error("Erro no Service ao listar Cards", error);
            throw new Error("Falha ao buscar Cards no banco de dados");
        }
    }
}

export default CardService;