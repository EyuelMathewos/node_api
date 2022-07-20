const  { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt =  require('bcryptjs');

export function getUser  ( email : string ) {
  return new Promise(async  (resolve, reject) => {
      try{
        console.log("get user is called")
        const users = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        // if(!users){
        //   throw({ message: 'Incorrect email' })
        // }
        // console.log(users)
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

export function compareHash ( password : string, hashedPassword: string ) {
  return new Promise(async  (resolve, reject) => {
    await bcrypt.compare(password, hashedPassword).then(function(err: Error,result:any) {
      if (result) {
        console.log("success flully running "+ result)
       resolve(result);
      } else {
        console.log("error occured compare Hash")
        reject(result);
      }
  });
    }
)}

// export function login ( username: string ,password : string ) {
//     console.log("passport js auth")

//  }
 