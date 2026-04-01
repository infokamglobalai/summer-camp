const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      console.log(`✅ Admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log(`ℹ️  Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
};

module.exports = { seedAdmin };
