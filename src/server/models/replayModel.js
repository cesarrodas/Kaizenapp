import mongoose from 'mongoose';

const replaySchema = new mongoose.Schema({
  hypothesis: String,
  experiment: String,
  analysis: String,
  conclusion: String,
  process: String,
  creator: String,
  tags: []
},
{
  timestamps: true
});

const Replay = mongoose.model('Replay', replaySchema);

export default Replay;