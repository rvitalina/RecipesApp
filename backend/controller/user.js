const { Users } = require("../sequelize/models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Электронная почта и пароль обязательны."})
    }

    let user = await Users.findOne({ where: { email: email } });

    if(user) {
        return res.status(400).json({error: "Электронная почта уже существует."});
    }

    const hasPwd = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
        email, password: hasPwd
    })

    let token = jwt.sign({email, id:newUser.id}, process.env.SECRET_KEY);

    return res.status(200).json({token, user: newUser});
};

const userLogIn = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Электронная почта и пароль обязательны."})
    }

    let user = await Users.findOne({ where: { email: email } });

    if(user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({email, id:user.id}, process.env.SECRET_KEY);
        return res.status(200).json({token, user});
    } else {
        return res.status(400).json({error: "Invalid credientals"});
    } 
};

const getUser = async (req, res) => {
    const user = await Users.findByPk(req.params.id);

    res.json({email: user.email})
};

module.exports = { userLogIn, userSignUp, getUser };
