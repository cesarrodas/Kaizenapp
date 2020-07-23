import User from '../models/userModel';
import { setConnect } from '../connect-db';

export const checkExistance = async (username) => {
  let access = await setConnect( async () => {
    const number = await User.where('username').equals(username).countDocuments().exec();
    console.log("number of docs: ", number);
    if (number >= 1){
      access = false;
    }
    access = true;
  });
  console.log("access", access);
  return access;
};

