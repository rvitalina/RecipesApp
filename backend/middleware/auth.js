const jwt = require('jsonwebtoken')

const verifyToken = async(req,res, next) => {
    let token = req.headers["authorization"]

    if(token) {
        token=token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err,decoded)=>{
            if(err){
                return res.status(400).json({message: "Invalid token"})
            } else {
                console.log(decoded)
                req.user = decoded
            }
        })
        next()
    } else {
        return res.status(400).json({message: "Invalid token"})
    }
}

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.email === 'admin@mail.ru') {
        console.log("Доступ предоставлен для администратора:", req.user.email);
        return next(); // Если это администратор, продолжаем
    }
    console.log("Доступ запрещен для:", req.user ? req.user.email : "неизвестный пользователь");
    return res.status(403).json({ message: "Access denied." }); // Если не администратор
};

module.exports={verifyToken, checkAdmin}
