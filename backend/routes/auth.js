const express = require('express');
const User = require('../models/User');
const { body, validationResult } =  require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

//JWT = JSON-WEB-TOKEN, provides secure communication between client and server.
const JWT_SECRET = "WahaSeHatoon!";

//ROUTE 1: create a user using: POST "/api/auth/createuser". Doesn't require Auth, because for this endpoint user should have logged in or signed in.
//Validation chains are created by functions such as body(), param(), query(), and so on.
router.post('/createuser', [
        body('first_name', 'Enter a valid first name').isLength({min: 3}),
        body('last_name', 'Enter a valid last name').isLength({min: 3}),
        body('username', 'Enter a valid username').isLength({min: 3}),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters long').isLength({min: 5})
    ],
    async (req, res) => {
        //if there are errors then return bad request and the errors.
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        //check whether the user with this email already exists or not.
        try{
            let user = await User.findOne({email: req.body.email});

            if(user)
                return res.status(400).json({error: "Sorry! This user already exists."})

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: securePassword
            });

            const data = {
                user:{
                    id: user.id
                }
            };
            const jwtData = jwt.sign(data, JWT_SECRET);
            console.log(jwtData);
            // when not using async-await then include the below statements.
            //.then(user => res.json(user)).catch(err => {
            //     console.log(err)
            //     res.json({
            //         "error": "This user already exists!",
            //         "message": err.message
            //     })
            // })
            
            // res.send(req.body)
            // const user = User(req.body)
            // user.save()
            // console.log(req.body)
            res.json(user);
        }
        catch(error){
            console.log(error.message)
            res.status(500).send("Some error has occured")
        }
})

//creating second endpoint.
//ROUTE 2: Create a user login endpoint, using POST: "/api/auth/login". No need of user login, signup.
router.post('/login', [
    body("email", "Enter valid email address").isEmail(),
    body("password", "Password can't be blanck and should be atleast 5 characters long").exists().isLength({min: 5})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // if there are validation errors then show them.
        if(!errors.isEmpty())
            res.status(400).json({error: errors.array()});
        
        const {email, password} = req.body;
        try{
            //checking if the email id is present in the database or not.
            const user = await User.findOne({email});
            if(!user)
                return res.status(400).json({error: "Please enter valid mail credentials"});

            //checking the validity of the password entered by the user and the database password using bcrypt.
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if(!isCorrectPassword)
                return res.status(400).json({error: "Please enter valid password credentials"});
            
            //after authentication of login credential is done correctly, we push in the details of the user into the DB.
            const data = {
                user: {
                    id: user.id
                }
            }

            //generating and authentication token to keep the data safe, using JWT.
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken})
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error!");
        }
    }
);

//ROUTE 3: Getting the details of the loggedIn User, using POST: "/api/auth/getuser". We will be needing the login/signup.
// fetchuser | MiddleWare => The middleware in node.js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle. This function can be used for modifying the req and res objects for tasks like adding response headers, parsing requesting bodies, and so on.
router.post('/getuser', fetchuser,
    async (req, res) => {
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }
        catch(error){
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

module.exports = router