const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const exists = await Admin.findOne({ email: adminEmail });
        if (!exists) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            const newAdmin = new Admin({
                email: adminEmail,
                password: hashedPassword,
            });
            await newAdmin.save();
            console.log('Seed Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (err) {
        console.error('Error seeding admin user:', err);
    }
};

module.exports = seedAdmin;
