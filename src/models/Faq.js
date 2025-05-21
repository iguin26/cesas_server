import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const Faq = sequelize.define("Faq", {
    pergunta: {
        type: DataTypes.STRING,
    },
    resposta:{
       type: DataTypes.STRING
    }
});

export const syncFaq = ()=>{
    Faq.sync({alter: true}).then(()=>{
    });
};