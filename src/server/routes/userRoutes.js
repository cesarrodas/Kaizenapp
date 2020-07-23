import mongoose from 'mongoose';

//import mongoose from 'mongoose';
import User from '../models/userModel'; 

const db = mongoose.connection;

import { checkExistance } from '../validators/userValidators';

import bcrypt from 'bcrypt';
import { responseHandler } from './authRoutes';

const saltRounds = 12;

export const userRoutes = (app) => {

  app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    User.findOne({ _id: id }, (err, user) => {
      if ( err ) {
        res.status(404);
        responseHandler(req, res, { message: "User not found." });
      }

      res.status(200);
      responseHandler(req, res, user);
    });
  });

  app.post('/api/users/create', async function(req, res){

    const { username, email, password } = req.body;
    try {

      const newPass = await bcrypt.hash(password, saltRounds);
      const uniqueUser = await checkExistance(username);
      console.log("uniqueUser: ", uniqueUser);
      
      
      const user = new User({ username: username, email: email, hash: newPass});
      //const errors = user.validateSync();

      // user.validate().catch(error => {
      //   throw new error(error);
      // });

      if(uniqueUser == false){
        throw new Error('Username is already in use.');
      }
      
      if(uniqueUser){        
        await user.save();
        res.status(201);
      }
    } catch (err) {
      res.status(500);
      responseHandler(req, res, { error: err });
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

    User.findOneAndUpdate({ _id: id }, newUser, (err, data) => {
      if(err){
        console.log(err);
        res.status(400);
        responseHandler(req, res, { error: err })
      }

      res.status(204);
      responseHandler(req, res, data);
    });
  });

  app.delete('/api/users/:id', function (req, res){
    // here we will delete a user from the db.
    const id = req.params.id;
    //res.json(req);
    User.findOneAndDelete({ _id: id }, (err) => {
      if(err){
        res.status(500);
        responseHandler(req, res, { error: err });
      }

      res.status(200);
      responseHandler(req, res, { message: "User deleted."});
    });
  });
}

