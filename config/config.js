//require('dotenv').config(); 
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
//console.log("process.env", process.env)
module.exports = {
  
  'production': {
    'username': process.env.USERNAME,
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE_NAME,
    'host':     process.env.HOSTNAME,
    'dialect': 'mysql',
    'logging':  false
    
  },
  'test': {
    'username': 'root',
    'password': '',
    'database': 'Tenant_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'development': {
    'username':  process.env.USERNAME,  //-->'root'
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE_NAME, //-->'Rentsolute'
    'host':     process.env.HOSTNAME,
    'dialect': 'mysql'
  }
  
  
};

