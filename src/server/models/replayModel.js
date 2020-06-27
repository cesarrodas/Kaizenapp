import mongoose from 'mongoose';

const replaySchema = new mongoose.Schema({
  name: String,
  detail: String,
  process: String,
  creator: String
},
{
  timestamps: true
});

const Replay = mongoose.model('Replay', replaySchema);

export default Replay;