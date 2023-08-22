import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      console.log(decodedData);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;