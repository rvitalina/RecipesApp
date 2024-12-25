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
        return res.status(400).json({error: "Неверный логин или пароль"});
    } 
};

const getUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json({ id: user.id, email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'email', 'password'], 
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        return res.status(500).json({ message: "Ошибка сервера." });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID пользователя обязателен." });
    }

    const user = await Users.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "Пользователь не найден." });
    }

    if (email) {
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser && existingUser.id !== user.id) {
            return res.status(400).json({ error: "Электронная почта уже существует." });
        }
    }

    const updatedData = {};
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    await Users.update(updatedData, { where: { id } });

    const updatedUser = await Users.findByPk(id);
    return res.status(200).json({ message: "Данные пользователя успешно обновлены.", user: updatedUser });
};

const deleteUser = async (req, res) => {
    const { id } = req.params; 
  
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      const deletedCount = await Users.destroy({
        where: { id }
      });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ status: "ok", message: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Error deleting user" });
    }
  };
  

module.exports = { userLogIn, userSignUp, getUser, updateUser, getUsers, deleteUser };
