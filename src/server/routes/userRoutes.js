import { sureThing, responseFinalizer, filterObject } from '../../helpers';
import { checkExistance } from '../validators/userValidators';

//import mongoose from 'mongoose';
import User from '../models/userModel'; 
import bcrypt from 'bcrypt';

const saltRounds = 12;

export const userRoutes = (app) => {

  app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    const response = await sureThing(User.findOne({ _id: id }).select('categories _id username email createdAt updatedAt').exec(), {
      success: "success",
      rejected: "The user was not found."
    });

    if(!response.ok){
      res.status(404);
      responseFinalizer(req, res, response);
    } else {
      res.status(200);
      responseFinalizer(req, res, response);
    }
  });

  app.get('/api/users/:username', async (req, res) => {
    const username = req.params.username;

    const response = await sureThing(User.findOne({ username: username }).select('categories _id username email createdAt updatedAt').exec(), {
      success: "success",
      rejected: "The user was not found."
    });

    if(!response.ok){
      res.status(404);
      responseFinalizer(req, res, response);
    } else {
      res.status(200);
      responseFinalizer(req, res, response);
    }
  });

  app.post('/api/users/create', async function(req, res){

    const { username, email, password } = req.body;
    const newPass = await sureThing(bcrypt.hash(password, saltRounds));

    if (!newPass.ok) {
      res.status(500);
      responseFinalizer(req, res, newPass);
    }

    const user = new User({ username: username, email: email, hash: newPass.result});

    const uniqueUsername = await sureThing(checkExistance(username), {
      success: "success",
      rejected: "This username is already in use."
    });

    if (!uniqueUsername.ok){
      res.status(400);
      responseFinalizer(req, res, uniqueUsername);
    }

    const response = await sureThing(user.save());

    //console.log("USER RESPONSE: ", response.result);
    const userData = filterObject(["hash", "loginKeys", "__v"], response.result._doc);

    if(!response.ok){
      res.status(500);
      responseFinalizer(req, res, response);
    }

    res.status(201);
    responseFinalizer(req, res, { ok: true, message: "User created.", user: userData });

  });

  app.put('/api/users/:id', async (req, res) => {
    let newUser = {};
    const id = req.params.id;

    if(req.body.password){
      newUser.password = req.body.password;
    }

    if(req.body.email){
      newUser.email = req.body.email;
    }

    const updated = await sureThing(User.findOneAndUpdate({ _id: id }, newUser, { new: true } ), {
      success: "success",
      rejected: "User update failed."
    });

    if(!updated.ok){
      res.status(400);
      responseFinalizer(req, res, updated)
    }

    res.status(202);
    responseFinalizer(req, res, updated);
  });

  app.delete('/api/users/:id', async (req, res) => {

    const id = req.params.id;

    const deleted = await sureThing(User.findOneAndDelete({ _id: id }), {
      success: "success",
      rejected: "User was not deleted."
    });

    if(!deleted.ok){
      res.status(500);
    }

    res.status(200);
    responseFinalizer(req, res, deleted);

  });
}

