import admin from '../models/Admin.js';
import bcrypt from 'bcrypt';

const DEFAULT_ADMIN = {
  email: admin.findOne({
    attributes: ['login'],
  }),
  password: admin.findOne({
    attributes: ['password']
  })
}

  export const authenticate = async(email, password) => {
    if(email === DEFAULT_ADMIN.email && compare(password, admin.password)){
      return Promise.resolve(DEFAULT_ADMIN);

    }
    return null;

};
