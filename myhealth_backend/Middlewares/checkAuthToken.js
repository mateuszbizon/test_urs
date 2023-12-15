import jwt from 'jsonwebtoken';

function checkAuth(req, res, next) {
    
    try{
        const authToken = req.headers.authorization.split(" ")[1];
        
        let decodedData = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
        req.userId = decodedData?.userId

        next();
    }
    catch(error){
        res.status(401).json({message:"notAutenticated"})
    }
    
}

export default checkAuth;