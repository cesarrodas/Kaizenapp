import { setConnect } from '../connect-db';
import User from '../models/userModel';

export const authRoutes = ( app ) => {

  app.post('api/authenticate', async (req, res) => {
    const  { username, password } = req.body;
    try {
      setConnect(() => {
        const user = await User.findOne({ username: username });

        const match = await bcrypt.compare(password, user.hash);

        if(match) {
          //process.env.PRIVATE_KEY
        }
      });
    } catch (err) {
      res.status(500);
      res.send({"error: ": "Unable to verify user."});
    }
  });

}