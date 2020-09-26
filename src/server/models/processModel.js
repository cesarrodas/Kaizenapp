import mongoose from 'mongoose';

const processSchema = new mongoose.Schema({
  process: String,
  category: String,
  tags: [],
  creator: String
},
{
  timestamps: true
});

const Process = mongoose.model('Process', processSchema);

export default Process;
