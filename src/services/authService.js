import { where } from 'sequelize';
import { findOne } from '../models/Admin.js';
import { compare } from 'bcrypt';

async function authenticateAdmin(enteredPassword){
  try{
    //pega o adminn pelo nome de usuario
    const admin = await findOne({where: {username: 'admin'}});

    if(!admin){
      console.log('Admin nao encontrado');
      return false;
    }

    //consfere se a senha bate comm o hash do banco
    const match = await compare(enteredPassword, admin.password);

    if(match){
      console.log('Autenticacao bem feita');
      return true;
    }else{
      console.log("Senha incorreta");
      return false;
    }

  }catch(erro){
    console.error('Erro na autenticacao', erro);
    return false;
  }
}

