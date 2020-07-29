import User from '../models/userModel';

export const checkExistance = async (username) => {
  const number = await User.where('username').equals(username).countDocuments().exec();
  if (number >= 1){
    return Promise.reject(false);
  }
  return Promise.resolve(true);
};

