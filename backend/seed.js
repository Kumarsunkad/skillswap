import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany(); // Clear old data

    const hashed = await bcrypt.hash("123456", 10);

    const users = [
      {
        name: "Alice",
        email: "alice@example.com",
        password: hashed,
        skillsOffered: ["UI Design", "Figma"],
        skillsNeeded: ["C++", "Java"],
      },
      {
        name: "Bob",
        email: "bob@example.com",
        password: hashed,
        skillsOffered: ["C++", "DSA"],
        skillsNeeded: ["UI Design", "Photoshop"],
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        password: hashed,
        skillsOffered: ["React", "Node.js"],
        skillsNeeded: ["Python", "ML"],
      },
      {
        name: "David",
        email: "david@example.com",
        password: hashed,
        skillsOffered: ["Python", "Flask"],
        skillsNeeded: ["React", "UI Design"],
      },
      {
        name: "Emma",
        email: "emma@example.com",
        password: hashed,
        skillsOffered: ["Machine Learning", "Pandas"],
        skillsNeeded: ["C++", "DSA"],
      },
      {
        name: "Frank",
        email: "frank@example.com",
        password: hashed,
        skillsOffered: ["Java", "Spring Boot"],
        skillsNeeded: ["React", "Node.js"],
      },
      {
        name: "Grace",
        email: "grace@example.com",
        password: hashed,
        skillsOffered: ["Video Editing", "Photoshop"],
        skillsNeeded: ["Python", "Data Science"],
      },
      {
        name: "Henry",
        email: "henry@example.com",
        password: hashed,
        skillsOffered: ["Android Dev", "Kotlin"],
        skillsNeeded: ["UI Design", "Figma"],
      },
      {
        name: "Ivy",
        email: "ivy@example.com",
        password: hashed,
        skillsOffered: ["Data Science", "ML"],
        skillsNeeded: ["Java", "Spring Boot"],
      },
      {
        name: "Jack",
        email: "jack@example.com",
        password: hashed,
        skillsOffered: ["C Programming", "DSA"],
        skillsNeeded: ["React", "Node.js"],
      },
      {
        name: "Kate",
        email: "kate@example.com",
        password: hashed,
        skillsOffered: ["UI/UX Design", "Illustrator"],
        skillsNeeded: ["C++", "DSA"],
      },
      {
        name: "Leo",
        email: "leo@example.com",
        password: hashed,
        skillsOffered: ["Cybersecurity", "Networking"],
        skillsNeeded: ["JavaScript", "React"],
      },
      {
        name: "Mia",
        email: "mia@example.com",
        password: hashed,
        skillsOffered: ["JavaScript", "Node.js"],
        skillsNeeded: ["Machine Learning", "Python"],
      },
      {
        name: "Nina",
        email: "nina@example.com",
        password: hashed,
        skillsOffered: ["AI", "Deep Learning"],
        skillsNeeded: ["Java", "Spring Boot"],
      },
      {
        name: "Oscar",
        email: "oscar@example.com",
        password: hashed,
        skillsOffered: ["Cloud Computing", "AWS"],
        skillsNeeded: ["Cybersecurity", "Networking"],
      },
    ];

    await User.insertMany(users);
    console.log("✅ 15 sample users inserted successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
