const i18n = require('i18n');
i18n.configure({
  locales: ['en','ar'],

  directory: `${__dirname  }/locales`,
  //directory:path.join(__dirname, '/locales'),
    
  //directoryPermissions: '755',
    
  defaultLocale: 'en',

  // defaultLocale: 'en',
  cookie: 'lang',
    
  // autoReload: true,

  register: global
}); 

module.exports = function (req, res, next) {
  i18n.init(req, res);
  i18n.setLocale(req.headers['accept-language'] ? req.headers['accept-language'] : '');
  return next();
};