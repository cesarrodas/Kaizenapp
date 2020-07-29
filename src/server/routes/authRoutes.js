import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { sureThing, responseFinalizer } from '../../helpers';
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

    const user = await sureThing(User.findOne({ username: username }).select('categories _id username email createdAt updatedAt').exec(), {
      success: 'success',
      rejected: 'User not found.'
    });

    if(!user.ok){
      res.status(404);
      responseFinalizer(req, res, user)
    }

    const match = await sureThing(bcrypt.compare(password, user.hash), {
      success: 'success',
      rejected: 'Username/Password combination was not found.'
    });

    if(!match.ok){
      res.status(404);
      responseFinalizer(req, res, match);
    }

    const exp = addMinutes(new Date(), 15);
    const token = jsonwebtoken.sign({ username: user.username, apiExp: exp }, process.env.PRIVATE_KEY, { expiresIn: '7d'});
    
    //let newUser = filterObject(["hash", "loginKeys"], user._doc);

    res.status(200);
    res.cookie('access_token', token, {
      expires: new Date(Date.now() + 168 * 3600000)
    });
    res.send({ token: token, user: user });


  });

}

export const authentication = (req, res, next) => {
  const Unauthorized = (err) => {
    res.status(403);
    res.send({ 
      ok: false, 
      message: 'Forbidden',
      err
    });
  }
  
  if(!req.headers.authorization){
    Unauthorized();
  }
    
  const token = req.headers.authorization.replace("Bearer ", "");
  let decoded;

  try {
    decoded = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
  } catch (err) {
    Unauthorized(err);
  }

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
} 

export const responseHandler = (req, res, data) => {
  if(req.token){
    res.send({ data: data, token: req.token });
  } else {
    res.send({ data: data });
  }
}