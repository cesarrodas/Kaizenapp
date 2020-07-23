import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
//import { useSelector } from 'react-redux';

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes*60000).getTime();
}

const filterObject = (keysToRemove, object) => {
	let newObject = {};
  	let keys = Object.keys(object);
  	for(let i = 0; i < keys.length; i++){
    	if(keysToRemove.indexOf(keys[i]) == -1){
        	newObject[keys[i]] = object[keys[i]];		                             
        }
    }
	return newObject;
}

export const authRoutes = ( app ) => {

  app.post('/api/authenticate', async (req, res) => {
    const  { username, password } = req.body;

    try {
      const user = await User.findOne({ username: username });

      const match = await bcrypt.compare(password, user.hash);

      const exp = addMinutes(new Date(), 15);

      if(match){
        const token = jsonwebtoken.sign({ username: user.username, apiExp: exp }, process.env.PRIVATE_KEY, { expiresIn: '7d'});
        
        let newUser = filterObject(["hash", "loginKeys"], user._doc);

        res.status(200);
        res.cookie('access_token', token, {
          expires: new Date(Date.now() + 168 * 3600000)
        });
        res.send({ token: token, user: newUser });
      } else {
        throw "Unable to verify user existance.";
      }

    } catch (err) {
      res.status(500);
      res.send({"error: ": "Unable to verify user."});
    }
  });

}

export const authentication = (req, res, next) => {
  const Unauthorized = (err) => {
    res.status(401);
    res.send({ error: err });
  }
  
  if(req.headers.authorization){
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
      const decoded = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);

      if(decoded.apiExp - new Date().getTime() > 0){
        next();
      } else {
        // we need to sign a new token
        const exp = addMinutes(new Date(), 15);
        const newToken = jsonwebtoken.sign({ username: decoded.username, apiExp: exp }, process.env.PRIVATE_KEY, { expiresIn: '7d'});
        req.token = newToken;
        res.cookie('access_token', newToken, {
          expires: new Date(Date.now() + 168 * 3600000)
        });
        next();
      }

    } catch(err) {
      Unauthorized(err);
    } 
  } else {
    Unauthorized("Forbidden");
  }

} 

export const responseHandler = (req, res, data) => {
  if(req.token){
    res.send({ data: data, token: req.token });
  } else {
    res.send({ data: data });
  }
}