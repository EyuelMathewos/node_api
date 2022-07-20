const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt =  require('bcryptjs');

export function getUser  ( email : string ) {
  return new Promise(async  (resolve, reject) => {
      try{
        const users = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        resolve(users);
      }catch( error ){
        reject(error);
      }
  })
}

export function generateHash ( password : string ) {
  return new Promise(async  (resolve, reject) => {
      bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(password , salt, async function (err: any, hash: unknown) {
          if (err) {
            reject(err);
          } else {
            resolve ( hash );
          }
        });
      });
    }
)}