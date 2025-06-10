
import { profisSubmitFormTitle } from "../models/profisSubmitFormTitle.js"

class profisSubmitFormTitleController {
    static async getSubmitFormTitle(req, res) {
        try {

            const title = await profisSubmitFormTitle.findOne();
            if (!title) {
                return res.status(404).json({ error: "Título não encontrado" });
            }

            return res.status(200).json(title);
        } catch (error) {
            console.error("Erro ao buscar título", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }

    }
}

export default profisSubmitFormTitleController;