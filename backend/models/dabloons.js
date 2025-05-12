import mongoose from 'mongoose';

const dabloonsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model
    required: true,
    unique: true // Ensures each user has only one dabloons entry
  },
  balance: {
    type: Number,
    required: true,
    default: 1000,
    min: 0 // Dabloons should not be negative
  }
});

const Dabloons = mongoose.model('Dabloons', dabloonsSchema);

export default Dabloons;