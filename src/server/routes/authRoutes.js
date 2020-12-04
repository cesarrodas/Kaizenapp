import User from '../models/userModel';
import Process from '../models/processModel';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { sureThing, responseFinalizer, filterObject } from '../../helpers';

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes*60000).getTime();
}

const addAccessCookie = (res, username, id) => {
  const exp = addMinutes(new Date(), 15);
  const token = jsonwebtoken.sign({ username: username, apiExp: exp, _id: id }, process.env.PRIVATE_KEY, { expiresIn: '7d'});
  res.cookie('access_token', token, {
    expires: new Date(Date.now() + 168 * 3600000),
    secure: true,
    httpOnly: true,
    signed: true
  });
}

const unauthorized = (res, err) => {
  res.status(403);
  res.send({ 
    ok: false, 
    message: 'Forbidden',
    err
  });
}

export const authRoutes = ( app ) => {

  app.get('/api/logout', async (req, res) => {
    if(req.signedCookies.access_token){      
      res.clearCookie('access_token', {
        secure: true,
        httpOnly: true,
        signed: true
      });
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  });

  app.get('/api/getUserData', async (req, res) => {

    if(req.signedCookies.access_token){
      const cookie = req.signedCookies.access_token;
      const decoded = jsonwebtoken.verify(cookie, process.env.PRIVATE_KEY);
      
      const userData = await sureThing(User.findOne({ _id: decoded._id }).select('categories _id username email createdAt updatedAt').exec(), {
        success: "success",
        rejected: "The user was not found."
      });

      let allData = {};
      
      const response = {
        ok: false,
        message: "User data not found."
      }
  
      if(!userData.ok){
        res.status(404);
        responseFinalizer(req, res, response);
        return;
      }

      allData.user = userData.result;

      const processes = await sureThing(Process.find({ creator: decoded._id }).exec(), {
        success: 'success',
        rejected: 'The processes were not found.'
      });

      if(!processes.ok){
        res.status(404);
        responseFinalizer(req, res, response);
        return;
      }

      allData.processes = processes.result;

      res.send({
        result: allData,
        ok: true
      });
    } else {
      res.send({
        ok: false
      });
    }
  });

  app.post('/api/authenticate', async (req, res) => {
    const  { username, password } = req.body;

    const user = await sureThing(User.findOne({ username: username }), {
      success: 'success',
      rejected: 'User not found.'
    });
    
    if(!user.ok){
      res.status(404);
      responseFinalizer(req, res, user)
      return;
    }

    const match = await sureThing(bcrypt.compare(password, user.result.hash), {
      success: 'success',
      rejected: 'Username/Password combination was not found.'
    });

    if(!match.ok) {
      res.status(404);
      responseFinalizer(req, res, match);
      return;
    }

    let newUser = filterObject(["hash", "loginKeys", "__v"], user.result._doc);

    res.status(200);
    addAccessCookie(res, username, newUser._id);
    res.send({ user: newUser, ok: true });

  });

}

export const authentication = (req, res, next) => {

  if(!req.signedCookies.access_token){
    unauthorized(res);
  }

  if(req.signedCookies.access_token){
    const access_token = req.signedCookies.access_token;
    let decoded;
    try {
      decoded = jsonwebtoken.verify(access_token, process.env.PRIVATE_KEY);
      res.locals.user = decoded;
      if(decoded.apiExp - new Date().getTime() > 0){
        next();
      } else {
        addAccessCookie(res, decoded.username, decoded._id);
        next();
      }
    } catch (err) {
      Unauthorized(res, err);
    }
  }
} 

export const responseHandler = (req, res, data) => {
  if(req.token){
    res.send({ data: data });
  } else {
    res.send({ data: data });
  }
}