import { Op } from 'sequelize';
import { Student } from '../models/Student.js';
import ValidaCpf from '../utils/ValidaCpf.js';
import { rgUtils } from '../utils/ValidaRg.js';


class StudentService{
    static async createStudent(studentData){
        if(!studentData.name || !studentData.were_student || !studentData.birthday || !studentData.cpf || !studentData.nationality || !studentData.state || !studentData.rg_number || !studentData.rg_date || !studentData.race || !studentData.cep || !studentData.address || !studentData.phone || !studentData.parent_name || !studentData.parent_cpf){
            throw new Error('Dados incompletos para cadastro');
        }

        if(!ValidaCpf(studentData.cpf)){
            throw new Error('CPF invalido');
        }
        if(!ValidaCpf(studentData.parent_cpf)){
            throw new Error('CPF invalido')
        }

        if(!rgUtils(studentData.rg_number)){
            throw new Error("RG invalido");
        }
            
        const existingStudent = await Student.findOne({
            where: {
                [Op.or]: [
                    {email: studentData.email},
                    {cpf: studentData.cpf}
                ]
            }
        });

        if (existingStudent) {
            if(existingStudent.email === studentData.email){
                throw new Error('Email ja cadastrado');
            }else {
                throw new Error('CPF ja cadastrado');
            }
        }

        const formattedData = {
            ...studentData,
            name: this.formatName(studentData.name),
            email: studentData.email.toLowerCase()
        };

        try {
            const newStudent = await Student.create(formattedData);
            return this.formatStudentOutput(newStudent);
        }catch(error){
            console.error("Erro ao criar Estudante", error);
            throw new Error("Erro ao cadastrar estudante");
        }
    }

      static formatName(name) {
    return name.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

    static formatStudentOutput(student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      status: student.status,
      registrationDate: student.registration_date
      // Não retornamos o CPF por segurança
    };
  }
 
}

export default StudentService;