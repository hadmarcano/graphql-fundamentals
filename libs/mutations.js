const connectDb = require("./db");
const { ObjectId } = require("mongodb");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCourse = Object.assign(defaults, input);

    let db;
    let course;

    try {
      db = await connectDb();
      course = await db.collection("courses").insertOne(newCourse);
      console.log(course);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.log(error);
    }

    return newCourse;
  },
  editCourse: async (root, { _id, input }) => {
    let db;
    let course;

    try {
      db = await connectDb();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectId(_id) });
      console.log(course);
    } catch (error) {
      console.log(error);
    }

    return course;
  },
  createStudent: async (root, { input }) => {
    let db;
    let student;

    try {
      db = await connectDb();
      student = await db.collection("students").insertOne(input);
      console.log(student);
      input._id = student.insertedId;
    } catch (error) {
      console.log(error);
    }

    return input;
  },
  editStudent: async (root, { _id, input }) => {
    let db;
    let student;

    try {
      db = await connectDb();
      await db
        .collection("students")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
      console.log(student);
    } catch (error) {
      console.log(error);
    }

    return student;
  },
  addStudent: async (root, { course_id, student_id }) => {
    let db;
    let course;
    let student;

    try {
      db = await connectDb();
      course = await db
        .collection("courses")
        .findOne({ _id: ObjectId(course_id) });
      console.log(course);
      if (!course) {
        throw new Error("¡The course that you entried not exist!");
      }

      student = await db
        .collection("students")
        .findOne({ _id: ObjectId(student_id) });
      console.log(student);
      if (!student) {
        throw new Error("¡The student that you've selected not exist!");
      }

      await db
        .collection("courses")
        .updateOne(
          { _id: ObjectId(course_id) },
          { $addToSet: { people: student } }
        );

      course = await db
        .collection("courses")
        .findOne({ _id: ObjectId(course_id) });

      return course;
    } catch (error) {
      console.log(error);
    }
  },
};
