// const {op} = require('sequelize')
import {Op} from 'sequelize';
import {Faq} from "../models/Faq.js"

class FaqController{
  //Listar todas as perguntas e respostas
  static async listFaq(req, res){
    try{

      const faq = await Faq.findAll();
      return res.status(200).json(faq);

    }catch(erro){

      console.error("Erro ao listar as Perguntas", erro);
      return res.status(500).json({erro: "Erro inter no servidor"})

    }
  }

  static async listFaqByLike(req, res){
//Listando a perguntas por palavras parecidas
    try{
      const filter = req.query.pergunta || '';

      const questions = await Faq.findAll({
        where: {
          pergunta: {[Op.like]: `%${filter}%`}
        }
      });
      if (!questions){
        return res.status(404).json({erro: "Pergunta nao Encontrada"});
      }
      return res.status(200).json(questions);

    }catch(erro){

      console.error("Erro ao buscar Pergunta", erro);
      return res.status(500).json({erro: "Erro interno no Servidor"});

    }
  }
}

export default FaqController;