import { setConnect } from '../connect-db';
//import mongoose from 'mongoose';
import User from '../models/userModel'; 

 export const userRoutes = (app) => {

  app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      User.findOne({ _id: id }, (err, user) => {
        if ( err ) {
          res.status(404);
          res.send({ message: "User not found." });
        }
  
        res.status(200);
        res.send(user);
      });
    });
  });

  app.post('/api/users/create', async function(req, res){

    const { username, email, password } = req.body;

    setConnect(() => {
      const user = new User({ username: username, email: email, password: password });
      user.save(function (err, user) {
        if (err) {
          res.status(500);
          res.send({"error": err});
        };
        res.status(201);
        res.send(user);
      });
    });

  });

  app.put('/api/users/:id', (req, res) => {
    let newUser = {};
    const id = req.params.id;

    if(req.body.username){
      newUser.username = req.body.username;
    }

    if(req.body.password){
      newUser.password = req.body.password;
    }

    if(req.body.email){
      newUser.email = req.body.email;
    }
    setConnect(() => {
      User.findOneAndUpdate({ _id: id }, newUser, (err, data) => {
        if(err){
          console.log(err);
          res.status(400);
          res.send({"error": err});
        }
  
        res.status(204);
        res.send(data);
      });
    });
  });

  app.delete('/api/users/:id', function (req, res){
    // here we will delete a user from the db.
    const id = req.params.id;
    //res.json(req);
    setConnect(() => {
      User.findOneAndDelete({ _id: id }, (err) => {
        if(err){
          res.status(500);
          res.send({ "error": err });
        }
  
        res.status(200);
        res.send({"message": "User deleted."});
      });
    });
  });
}

