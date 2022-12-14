const connectDb = require("./db");
const { ObjectId } = require("mongodb");

module.exports = {
  getCourses: async () => {
    let db;
    let courses = [];
    try {
      db = await connectDb();
      courses = await db.collection("courses").find().toArray();
    } catch (error) {
      console.log(error);
    }
    return courses;
  },
  // Queries thaT receive arguments...
  getCourse: async (root, args) => {
    const { _id } = args;
    let db;
    let course;
    try {
      db = await connectDb();
      course = await db.collection("courses").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.log(error);
    }
    return course;
  },
  getStudents: async () => {
    let db;
    let students = [];
    try {
      db = await connectDb();
      students = await db.collection("students").find().toArray();
    } catch (error) {
      console.log(error);
    }
    return students;
  },
  // Queries thaT receive arguments...
  getStudent: async (root, args) => {
    const { _id } = args;
    let db;
    let student;
    try {
      db = await connectDb();
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      console.log(error);
    }
    return student;
  },
};
