import FaqService from "../services/faqService.js";

class FaqController{

  static async listFaq(req, res){
    try{
      const faqs = await FaqService.listAllFaqs();
      return res.status(200).json(faqs);
    }catch(error) {
      console.error('Erro no Controller (listFaq)', error);
      return res.status(500).json({
        erro: error.message || 'Erro interno ao listar Faqs'
      });
    }
  }

  static async listFaqByLike(req, res){
    try{
      const serchTerm = req.query.pergunta || '';
      const faqs = await FaqService.findFaqsByQuestion(serchTerm);

      return res.status(200).json(faqs);
    }catch(error){
      console.error('Erro no Controller (listFaqByLike):', error);

      if (error.message === 'Nenhuma FAQ encontrada com esse termo') {
      return res.status(404).json({ erro: error.message });
      }

      return res.status(500).json({
        erro: error.message || 'Erro interno ao buscar faqs'
      });
    }
  }
}

export default FaqController;