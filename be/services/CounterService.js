const Counter = require("../models/Counter");

const createCounter = async (name) => {
  try {
    const newCounter = new Counter({
      _id: name,
      seq: 1,
    });

    const savedCounter = await newCounter.save();

    return savedCounter;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const findCounter = async (name) => {
  try {
    const counter = await Counter.findOne({ _id: name });
    if (!counter) {
      return -2;
    }
    return counter;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

const getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 }, new: true }
  );
  return counter.seq;
};

module.exports = { createCounter, findCounter, getNextSequence };
