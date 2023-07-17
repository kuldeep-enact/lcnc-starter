const { body, oneOf, validationResult } = require('express-validator');
const apiResponse = require('../utills/response');




export function validate  (req, res, next){
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
 
  return apiResponse.ValidationErrorWithData(res, 'Please Enter Required Field', errors.array());

  
};