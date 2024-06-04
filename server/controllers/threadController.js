const Thread = require("../models/Thread");

exports.getSpecificThread = async (req, res, next) => {
  const thread = Thread.findById(req.params.threadId)
    .populate("thread")
    .populate("user");
  if (!thread) {
    return res.sendStatus(404);
  }
  return res.status(200).json({
    thread,
  });
};

exports.postsFromManyOwners = async (req, res, next) => {
  const threads = await Thread.find({
    type: "post",
  })
    .sort([["date", 1]])
    .populate("user")
    .populate("thread");
  if (!threads) {
    return res.sendStatus(404);
  }
  const groupedThreads = threads.filter((thread) => {
    console.log(thread.creatorId.toString());
    if (req.params.id.includes(thread.creatorId.toString())) {
      return thread;
    }
  });
  return res.status(200).json({
    threads: groupedThreads,
  });
};

exports.createNewThread = async (req, res) => {
  const { creatorId, type, content } = req.body;
  const newThread = new Thread({
    creatorId,
    type,
    content,
    threads: [],
    createdAt: new Date(),
  });
  await newThread.save();
  return res.sendStatus(201);
};
exports.deleteThread = async (req, res) => {
  await Thread.findByIdAndDelete(req.params.threadId);
  return res.sendStatus(200);
};
exports.updateThread = async (req, res) => {
  const updatedThread = await Thread.findByIdAndUpdate(
    req.params.threadId,
    ...req.body
  );
  if (!updatedThread) {
    return res.sendStatus(404);
  }
  return res.status(200).json({
    thread: updatedThread,
  });
};
