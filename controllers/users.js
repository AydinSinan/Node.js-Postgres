const User = require('../models/User');

exports.postSignUp = async (req, res, next) => {
    // getting user data from request body
    const {username, password, email, bio} = req.body;
    try {
        const user = new User({username, password, email, bio});
        const result = await user.createUser();
        res.send(user);
    } 
    catch (error) {
        // just add  a case for when the UNIQUE constraint is violated.
        const errorToThrow = new Error();
        switch (error?.code) {
            case '23505':
                errorToThrow.message = 'User already exists';
                errorToThrow.statusCode = 403;
                break;
            default:
                errorToThrow.statusCode = 500;
        }
        //pass error to next()
        next(errorToThrow);         
        
    }  
};
