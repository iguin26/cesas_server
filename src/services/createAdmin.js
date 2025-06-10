import { create } from '../models/Admin.js';

async function createAdmin(){
    try{
        const admin = await create({
            username: 'admin',
            password: 'senha123',

        });
        console.log('Admin criado com sucesso', admin.username);
    } catch(erro){
        console.error('Erro ao criar admin', erro);
    }
}

createAdmin();