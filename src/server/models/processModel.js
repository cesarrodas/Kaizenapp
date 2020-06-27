import mongoose from 'mongoose';

const processSchema = new mongoose.Schema({
  name: String,
  category: String,
  pages: [],
  tags: [],
  creator: String
},
{
  timestamps: true
});

const Process = mongoose.model('Process', processSchema);

export default Process;
