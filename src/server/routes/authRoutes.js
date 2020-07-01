import { setConnect } from '../connect-db';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const authRoutes = ( app ) => {

  app.post('/api/authenticate', async (req, res) => {
    const  { username, password } = req.body;

    const addMinutes = (date, minutes) => {
      return new Date(date.getTime() + minutes*60000).getTime();
    }

    setConnect( async () => {
      try {
        const user = await User.findOne({ username: username });

        const match = await bcrypt.compare(password, user.hash);

        const exp = addMinutes(new Date(), 15);

        if(match){
          const token = jsonwebtoken.sign({ username: user.username, apiExp: exp }, process.env.PRIVATE_KEY, { expiresIn: '7d'});
          
          res.status(200);
          res.send({ token: token });
        } else {
          throw "Unable to login";
        }

      } catch (err) {
        res.status(500);
        res.send({"error: ": "Unable to verify user."});
      }
    });
  });

}

export const authentication = (req, res, next) => {
  // We want to check the json web token in the headers.
  const Unauthorized = (err) => {
    res.status(401);
    res.send({ error: err });
  }
  
  if(req.headers.authorization){
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
      const decoded = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
      if(new Date().getTime() - decoded.apiExp){
        const time = newDate().getTime() - decoded.apiExp;
        console.log("TIME AUTH: ", time);
        req.timer = time;
        next();
      }

    } catch(err) {
      Unauthorized(err);
    }
  } else {
    Unauthorized("error");
  }

} 