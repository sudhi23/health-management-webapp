/*
Action types needed by admin
    Authenticating admin
    Adding and Deleting members
    Changing admin's profile
*/

export const ADMIN_LOADING = "ADMIN_LOADING";
export const ADMIN_LOADED = "ADMIN_LOADED";
export const ADMINAUTH_ERROR = "ADMINAUTH_ERROR";
export const ADMINLOGIN_SUCCESS = "ADMINLOGIN_SUCCESS";
export const ADMINLOGIN_FAIL = "ADMINLOGIN_FAIL";
export const ADMINLOGOUT_SUCCESS = "ADMINLOGOUT_SUCCESS";

export const ADD_ADMINSUCCESS = "ADD_ADMINSUCCESS";
export const ADD_ADMINFAIL = "ADD_ADMINFAIL";
export const DELETE_ADMINSUCCESS = "DELETE_ADMINSUCCESS";
export const DELETE_ADMINFAIL = "DELETE_ADMINFAIL";

export const ADD_USERSUCCESS = "ADD_USERSUCCESS";
export const ADD_USERFAIL = "ADD_USERFAIL";
export const DELETE_USERSUCCESS = "DELETE_USERSUCCESS";
export const DELETE_USERFAIL = "DELETE_USERFAIL";

export const ADD_MEDICSUCCESS = "ADD_MEDICSUCCESS";
export const ADD_MEDICFAIL = "ADD_MEDICFAIL";
export const DELETE_MEDICSUCCESS = "DELETE_MEDICSUCCESS";
export const DELETE_MEDICFAIL = "DELETE_MEDICFAIL";

export const ADD_STAFFSUCCESS = "ADD_STAFFSUCCESS";
export const ADD_STAFFFAIL = "ADD_STAFFFAIL";
export const DELETE_STAFFSUCCESS = "DELETE_STAFFSUCCESS";
export const DELETE_STAFFFAIL = "DELETE_STAFFFAIL";

export const ADMINCHANGEPASSWORDSUCCESS = "ADMINCHANGEPASSWORDSUCCESS";
export const ADMINCHANGEPASSWORDFAIL = "ADMINPASSWORDCHANGEFAIL";

/*
Action types needed by medic
    Authenticating medic
    Prescripting users
    Changing medic's profile
*/

export const MEDIC_LOADING = "MEDIC_LOADING";
export const MEDIC_LOADED = "MEDIC_LOADED";
export const MEDICAUTH_ERROR = "MEDICAUTH_ERROR";
export const MEDICLOGIN_SUCCESS = "MEDICLOGIN_SUCCESS";
export const MEDICLOGIN_FAIL = "MEDICLOGIN_FAIL";
export const MEDICLOGOUT_SUCCESS = "MEDICLOGOUT_SUCCESS";

export const SUCCESSGET_USER = "SUCCESSGET_USER";
export const FAILGET_USER = "FAILGET_USER";

export const PRESCRIPT_SUCCESS = "PRESCRIPT_SUCCESS";
export const PRESCRIPT_FAIL = "PRESCRIPT_FAIL";

export const MEDICCHANGEPASSWORDSUCCESS = "MEDICCHANGEPASSWORDSUCCESS";
export const MEDICCHANGEPASSWORDFAIL = "MEDICCHANGEPASSWORDFAIL";

/*
Action types needed by user
    Authenticating user
    Changing user's profile
*/

export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const USERAUTH_ERROR = "USERAUTH_ERROR";
export const USERLOGIN_SUCCESS = "USERLOGIN_SUCCESS";
export const USERLOGIN_FAIL = "USERLOGIN_FAIL";
export const USERLOGOUT_SUCCESS = "USERLOGOUT_SUCCESS";

export const USERCHANGEPASSWORDSUCCESS = "USERCHANGEPASSWORDSUCCESS";
export const USERCHANGEPASSWORDFAIL = "USERCHANGEPASSWORDFAIL";

/*
Action types needed by staff
    Authenticating staff
    Add reading for users
    Changing staff's profile
*/

export const STAFF_LOADING = "STAFF_LOADING";
export const STAFF_LOADED = "STAFF_LOADED";
export const STAFFAUTH_ERROR = "STAFFAUTH_ERROR";
export const STAFFLOGIN_SUCCESS = "STAFFLOGIN_SUCCESS";
export const STAFFLOGIN_FAIL = "STAFFLOGIN_FAIL";
export const STAFFLOGOUT_SUCCESS = "STAFFLOGOUT_SUCCESS";
export const ADD_READINGSUCCESS = "ADD_READINGSUCCESS";
export const ADD_READINGFAIL = "ADD_READINGFAIL";

export const STAFFCHANGEPASSWORDSUCCESS = "STAFFCHANGEPASSWORDSUCCESS";
export const STAFFCHANGEPASSWORDFAIL = "STAFFCHANGEPASSWORDFAIL";

export const GET_ERRORS = "GET-ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const PROCESS_REQUEST = "PROCESS_REQUEST";
export const REQUEST_DONE = "REQUEST_DONE";
export const GET_SUCCESS = "GET_SUCCESS";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";

//misc
export const GETIDSUCCESS = "GETIDSUCCESS";
export const GETIDFAIL = "GETIDFAIL";
export const GETREADINGSUCCESS = "GETREADINGSUCCESS";
export const GETREADINGFAIL = "GETREADINGFAIL";
