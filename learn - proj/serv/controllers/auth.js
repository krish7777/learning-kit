const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
exports.signup = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed.');
    //   error.statusCode = 422;
    //   error.data = errors.array();
    //   throw error;
    // }

    const { email, name, password } = req.body;
    const checkExistingUser = await User.findOne({ email: email })
    if (!checkExistingUser)
        try {
            const hashedPw = await bcrypt.hash(password, 12);

            const student = new User({
                email: email,
                password: hashedPw,
                name: name,
                role: "STUDENT"
            });
            const result = await student.save();
            console.log("result", result)
            res.status(201).json({ message: 'User created!', userId: result._id });
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    else {
        const error = new Error('User already exists');
        error.statusCode = 401;
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error('A user with this email could ot be found')
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
            'find_me_ifyacan',
            { expiresIn: '24h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}