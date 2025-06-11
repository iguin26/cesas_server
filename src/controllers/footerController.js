import { Footer } from "../models/Footer.js"

class footerController {
    static async getFooterData(req, res) {
        try {
            const data = await Footer.findOne();
            
            if (!data) {
                return res.status(404).json({ error: "Dados do rodapé não encontrados" });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error("Erro ao buscar dados do rodapé", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export default footerController;
