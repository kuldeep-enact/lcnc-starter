

module.exports = {
 
  SuccessResponseWithData: (res, msg, data) => {
    return res.status(200).json({
      statusCode: 200,
      message: msg,
      data: data,
      
    });
  },

  SuccessResponseWithOutData: (res, msg) => {
    return res.status(200).json({
      statusCode: 200,
      message: msg,
    
    });
  },
  SuccessResponseData: (res, data) => {
    return res.status(200).json({
      statusCode: 200,
      details: data,
    
    });
  },
  SuccessContentData: (res,message, data) => {
    return res.status(200).json({
      statusCode: 200,
      message: message,
      data: data,
    });
  },
   
 
  FailedResponseWithData: (res, msg, data) => {
    return res.status(400).json({
      statusCode: 400,
      message: msg,
      error: data
    
    });
  },
    
  FailedResponseWithOutData: (res, msg) => {
    return res.status(400).json({
      statusCode: 400,
      message: msg,
    
    });
  },
  InternalServerError: (res, e) => {
    return res.status(500).json({
      statusCode: 500,
      message: res.__('INTERNAL_SERVER_ERROR'),
      error: e.message,
    });
  },
  SomethingWentWrong: (res, e) => {
    return res.status(400).json({
      statusCode: 400,
      message: 'Something Went Wrong',
      error: e.message
    });
  },
  SessionTimeOut: (res, e) => {
    return res.status(400).json({
      statusCode: 400,
      message: 'SessionTimeOut Login Again',
      error: e.message
    });
  },
  UnAuthorized: (res, msg) => {
    return res.status(401).json({
      statusCode: 401,
      message: msg,
    });
    
  },
  NotFound: (res, msg) => {
    return res.status(404).json({
      statusCode: 404,
      message: msg,
    });
  },
  DuplicateEmail: (res,message) => {
    return res.status(400).json({
      statusCode: 400,
      message: res.__('EMAIL_ALREADY_EXIST'),
       
    });
  },
  ValidationError: (res, err) => {
    return res.status(422).json({
      statusCode: 422,
      message: 'validation error',
      error:err
    });
  },
  LoginSuccessFull: (res, data) => {
    return res.status(200).json({
      statusCode: 200,
      message: res.__('LOGIN_SUCESSFULL'),
      user_details: data,
    });
  },
  SignUpSuccessFull: (res, data) => {
    return res.status(200).json({
      statusCode: 200,
      message: res.__('SIGNUP_SUCESSFULL'),
      user_details: data
     
    });
  },
  SignUpFailed: (res,message) => {
    return res.status(400).json({
      statusCode: 400,
      message: message,
    });
  },
  LoginFailed: (res, message) => {
    return res.status(400).json({
      statusCode: 400,
      message: message
    });
  },
  ValidationErrorWithData: (res, data,error) => {
    return res.status(400).json({
      statusCode: 400,
      message: data,
      error:error
    
    });
    
  },
  SubscribedSuccessFully: (res, data) => {
    return res.status(200).json({
      statusCode: 200,
      message: res.__('SUBSCRIBED_SUCESSFULL'),
      user_details: data
     
    });
  },
  SuccessSignUp: (res, message,data,statusCode) => {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      data:data,
    
    });
  },
  PasswordUpdatedSucessfully:(res,message) => {
    return res.status(200).json({
      statusCode:200,
      message:'Updated Sucessfully',
          

    });
  },
  SuccessResponseWithMultpleData: (res, message, suggested_list,custom_list) => {
    return res.status(200).json({
      statusCode: 200,
      message: message,
      suggested_list: suggested_list,
      custom_list:custom_list

    });
  },

  SuccessResponseWithMultipleData: (res,message, tenanted, vacant) => {
    return res.status(200).json({
      statusCode: 200,
      message:message,
      tenanted:tenanted,
      vacant:vacant,
    });
  },

  SuccessResponseWithMultipleDataCount: (res,message,data,current_applicant,bedroom, bathroom,other) => {
    return res.status(200).json({
      statusCode: 200,
      message:message,
      data:data,
      current_applicant:current_applicant,
      bedroom:bedroom,
      bathroom:bathroom,
      others:other
    });
  },
  SuccessResponseMultipleData : (res, message, data, property_questions) => {
    return res.status(200).json({
      statusCode: 200,
      message:message,
      data:data,
      property_questions:property_questions
    });
  },

  SuccessResponseMultipleData1 : (res, message, data, AllUser) => {
    return res.status(200).json({
      statusCode: 200,
      message:message,
      data:data,
      AllUser:AllUser
    });
  }


};
    