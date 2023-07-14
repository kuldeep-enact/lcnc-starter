require('dotenv').config();
//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const password = process.env.CRYPTO_PASSWORD;
const crypto = require('crypto'),algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);
const apiResponse = require('./response');
const logger = require('../utills/logger');

// const models = require('../models');
// const User = models.User;

//get utc time in millisecons
exports.getCurrentTime = () => {
  const d = new Date();
  const n = d.toUTCString();
  const date = new Date(n);
  const milliseconds = date.getTime(); //1440516958
  return milliseconds;
};

exports.hashPassword = (myPlaintextPassword) => {
  return bcrypt.hashSync(myPlaintextPassword, saltRounds);

};

exports.compareHashPassword = (myPlaintextPassword, hash) => {
  return bcrypt.compareSync(myPlaintextPassword, hash);
};

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_TIMEOUT_DURATION});
};

exports.verifyToken = async(req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      //return res.send('UnAuthorized');
      return apiResponse.FailedResponseWithOutData(res,res.__('TOKEN_IS_REQUIRED'));
    } else {
      const Token = token.split(' ')[1];
      //console.log(Token)
      jwt.verify(Token,  process.env.JWT_SECRET_KEY, async function (err, decoded) {
        if (err)  return apiResponse.InternalServerError(res,err);
        //console.log(decoded)
        User.findOne({where:{id: decoded.id}})
          .then((data) => {
            if (!data) {
              return apiResponse.NotFound(res, 'User not found');
            } else {
              req.userData = decoded;
              req.userData.account_type = data.account_type;
              next();
            }
          }).catch((e) => {
            
            return apiResponse.InternalServerError(res,e);
          });
      });
    }
  } catch (e) {
    console.log(e);
    return apiResponse.InternalServerError(res,e);
  }
};


exports.checkLoggedIn = async(req,res,next) => {
  const token = req.headers['authorization'];
  if (!token) {
    req.userData = 0;
    return next();
  }
  const Token = token.split(' ')[1];
  jwt.verify(Token,  process.env.JWT_SECRET_KEY, async function (err, decoded) {
    if (err)  return apiResponse.InternalServerError(res,err);
    //console.log(decoded)
    User.findOne({id: decoded.id})
      .then((data) => {
        if (!data) {
          return apiResponse.NotFound(res, 'User not found');
        } else {
          req.userData = decoded;
          console.log(decoded.id);
          next();
        }
      }).catch((e) => {
        return apiResponse.InternalServerError(res,e);
      });
  });

};

exports.generateTokenLink = async(req,res,length) => {
  try {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } catch (error) {
    return apiResponse.InternalServerError(res,error);
  }
};

exports.logResponseBody = (req, res, next) => {
  if (req.body) {
    const oldWrite = res.write,
      oldEnd = res.end;
    const chunks = [];

    res.write = function (chunk) {
      chunks.push(chunk);

      return oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) chunks.push(chunk);

      const body = Buffer.concat(chunks).toString('utf8');
      console.log(req.path, body);
      logger.info(JSON.stringify(req.body,req.path));

      oldEnd.apply(res, arguments);
    
    };
  }
  

  next();
};

exports.encryptPropertyId = (id) => {
  const cipher = crypto.createCipheriv(algorithm, password, iv);
  const encrypted = Buffer.concat([cipher.update(id.toString()), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

exports.decryptPropertyId = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, password, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  return decrpyted.toString();
};

exports.paging = (sequelizeResult, page, limit) => ({
  page: page,
  limit: limit,
  total: sequelizeResult.count,
  data: sequelizeResult.rows,
});
exports.tryParseInt = (stringValue, defaultValue) => {
  if (!stringValue) return defaultValue;

  try {
    return parseInt(stringValue, 10);
  } catch (err) {
    return defaultValue;
  }
};