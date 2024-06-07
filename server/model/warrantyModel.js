import mongoose from 'mongoose';

const warrantySchema = new mongoose.Schema({
  productName: { type: String, required: true },
  vendor: { type: String, required: true },
  price: { type: Number, required: true },
  pr: { type: String, required: true },
  po: { type: String, required: true },
  prFile: { type: String, required: true },
  poFile: { type: String, required: true },
  expireDate: { type: Date, required: true },
});

// If the model already exists, use it; otherwise, create a new model
const warrantyModel = mongoose.models.warrantyitem || mongoose.model('warrantyitem', warrantySchema);

export default warrantyModel;
