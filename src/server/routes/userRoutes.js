import { setConnect } from '../connect-db';
//import mongoose from 'mongoose';
import User from '../models/userModel'; 

import bcrypt from 'bcrypt';
import { successHandler } from './authRoutes';

const saltRounds = 12;

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
        successHandler(req, res, user);
      });
    });
  });

  app.post('/api/users/create', async function(req, res){

    const { username, email, password } = req.body;
    try {

      const newPass = await bcrypt.hash(password, saltRounds);
      
      setConnect(async () => {
        const user = new User({ username: username, email: email, hash: newPass});
        await user.save();
        res.status(201);
        successHandler(req, res, user);
      });

    } catch (err) {
      res.status(500);
      res.send({"error: ": err});
    }



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
        successHandler(req, res, data);
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
        successHandler(req, res, {"message": "User deleted. "});
      });
    });
  });
}

