import mongoose from 'mongoose';

const url = `mongodb://localhost:27017/kaizendb`;

//let db = null;

export async function connectDB() {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}

