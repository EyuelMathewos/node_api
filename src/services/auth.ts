const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

export function getUser(email: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      if (!users) {
        reject({
          message: "Account doest exist"
        });
      } else {
        resolve(users);
      }
    } catch (error) {
      reject(error);
    }
  })
}

export function generateHash(password: string) {
  return new Promise(async (resolve, reject) => {
    if (password.length >= 6) {
      bcrypt.genSalt(10, function (err: any, salt: any) {
        bcrypt.hash(password, salt, async function (err: any, hash: unknown) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
    } else {
      resolve(password);
    }
  })
}