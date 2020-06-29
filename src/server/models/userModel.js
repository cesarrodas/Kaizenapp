import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'This username may already be in use.'],
    required: [true, 'Username is required.']
  },
  //email: String,
  email: {
    type: String,
    validate: {
      validator: function(e) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e);
      },
      message: props => `${props.value} is not a valid email.`
    },
    required: [true, 'User email is required.']
  },
  hash: String,
  loginKeys: [],
  categories: []  
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;