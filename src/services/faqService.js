import { where } from "sequelize";
import {EjaFaq} from '../models/ejaFaq.js';
import {ProfisFaq} from '../models/profisFaq.js';


class FaqService {

    static async listAllEJAFaqs(){
        try{
            return await EjaFaq.findAll({
                order: [['id', 'ASC']], 
            }); 
        }catch (error) {
            console.error("Erro no Service o listar Faqs", error);
            throw new Error('Falha ao buscar Faqs no banco de dados');
        }
    }

    static async listAllProfisFaqs(){
        try{
            return await ProfisFaq.findAll({
                order: [['id', 'ASC']], 
            }); 
        }catch (error) {
            console.error("Erro no Service o listar Faqs", error);
            throw new Error('Falha ao buscar Faqs no banco de dados');
        }
    }
}

export default FaqService;