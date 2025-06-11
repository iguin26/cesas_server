import { where } from "sequelize";
import {Faq} from '../models/Faq.js';


class FaqService {

    static async listAllFaqs(){
        try{
            return await Faq.findAll({
                order: [['createdAt', 'DESC']]
            }); 
        }catch (error) {
            console.error("Erro no Service o listar Faqs", error);
            throw new Error('Falha ao buscar Faqs no banco de dados');
        }
    }

    static async findFaqsByQuestion(term){
        try{
            if(!term || term.trim() === ''){
                return await this.listAllFaqs();
            }

            const faqs = await Faq.findAll({
                where: {
                    pergunta: { [Op.like]: `%${term}%` }
                },
                order: [['createdAt', 'DESC']]
            });

            if (!faqs || faqs.length === 0){
                throw new Error('Nenhuma Faq encontrada com esse termo');
            }
            return faqs;
        }catch(error){
            console.error("Erro no service ao buscar faqs", error);
            throw error;
        }

    }
}

export default FaqService;