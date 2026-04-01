const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  parentName:    { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, required: true },
  childName:     { type: String, required: true },
  grade:         { type: String, required: true },
  slot:          { type: String, required: true },
  amount:        { type: Number, default: 199 },
  currency:      { type: String, default: 'INR' },
  ottuSessionId: { type: String, default: null },
  ottuPaymentId: { type: String, default: null },
  status:        { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  registeredAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
