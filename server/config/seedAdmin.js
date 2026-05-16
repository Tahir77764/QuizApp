const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const ClassCategory = require('../models/ClassCategory');
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

        // Seed classes 5 to 12 if no classes exist
        const classCount = await ClassCategory.countDocuments();
        if (classCount === 0) {
            const defaultClasses = [
                { name: 'Class 5', description: 'Primary Education' },
                { name: 'Class 6', description: 'Middle School' },
                { name: 'Class 7', description: 'Middle School' },
                { name: 'Class 8', description: 'Middle School' },
                { name: 'Class 9', description: 'High School' },
                { name: 'Class 10', description: 'High School Board' },
                { name: 'Class 11', description: 'Senior Secondary' },
                { name: 'Class 12', description: 'Senior Secondary Board' }
            ];
            await ClassCategory.insertMany(defaultClasses);
            console.log('Classes 5 to 12 successfully seeded.');
        } else {
            console.log('Classes already exist.');
        }

        // Seed exams if none exist
        const ExamCategory = require('../models/ExamCategory');
        const examCount = await ExamCategory.countDocuments();
        if (examCount === 0) {
            const defaultExams = [
                { name: 'NEET', description: 'National Eligibility Entrance Test' },
                { name: 'JEE Main', description: 'Joint Entrance Examination Main' },
                { name: 'UPSC Civil Services', description: 'Union Public Service Commission' }
            ];
            await ExamCategory.insertMany(defaultExams);
            console.log('Exams successfully seeded.');
        } else {
            console.log('Exams already exist.');
        }

    } catch (err) {
        console.error('Error seeding data:', err);
    }
};

module.exports = seedAdmin;
