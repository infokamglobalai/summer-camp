import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  parentName: { type: String, required: true },
  grade: { type: String, required: true },
  slot: { type: String, required: true },
  address: { type: String },
  
  // Payment tracking
  order_no: { type: String, required: true, unique: true },
  invoice_id: { type: String, required: true, unique: true },
  amount: { type: Number, default: 199.00 },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  ottuSessionId: { type: String },
  paymentUrl: { type: String },
  
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
