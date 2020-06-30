import { setConnect } from '../connect-db';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const authRoutes = ( app ) => {

  app.post('/api/authenticate', async (req, res) => {
    const  { username, password } = req.body;
    setConnect( async () => {
      try {
        const user = await User.findOne({ username: username });

        const match = await bcrypt.compare(password, user.hash);

        if(match){
          const token = jsonwebtoken.sign({ username: user.username }, process.env.PRIVATE_KEY, { expiresIn: '1d'});
          
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