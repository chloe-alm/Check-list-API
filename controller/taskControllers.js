const models = require("../models");
const { User, List } = models;
const {
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require("../helpers/errors");

module.exports = {
  createTask: async (req, res) => {
    const task = {
      listId: req.params.listId,
      taskName: req.body.taskName,
      description: req.body.description,
    };

    if (task.taskName === null) {
      throw new BadRequestError("Bad request", "Input taskName must be filled");
    }
    const addTask = await models.Task.create({
      include: [{ model: List, attributes: ["id", "listName"] }],
      listId: task.listId,
      taskName: task.taskName,
      description: task.description,
    });
    res.status(201).json({ addTask });
  },
  getOneTask: async (req, res) => {
    const taskId = req.params.id;
    if (taskId) {
      const task = await models.Task.findOne({ where: { id: taskId } });
      if (task) {
        return res.status(200).json({ task: task });
      } else throw new NotFoundError("Resource not found", "Event not found");
    } else {
      throw new NotFoundError("Resource not found", "Page indisponible");
    }
  },
  getAllTask: async (req, res) => {
    const taskAll = await models.Task.findAll({
      limit: 20,
      order: [["id", "DESC"]],
    });
    if (taskAll) {
      res.status(200).json({ task: taskAll });
    } else {
      throw new ServerError("servor error", "There is not event");
    }
  },

  editTask: async (req, res) => {
    const getTaskId = req.params.id;
    const initialTask = await models.Task.findOne({
      attributes: ["taskName", "description"],
      where: { id: getTaskId },
    });
    if (!initialTask) {
      throw new NotFoundError(
        "Resource not found",
        "There is nothing to find at that url, the ID does not exist"
      );
    }
    let inputStateTask = {
      taskName: req.body.taskName,
      description: req.body.description,
    };

    if (
      initialTask.taskName === inputStateTask.taskName &&
      initialTask.description === inputStateTask.description
    ) {
      throw new BadRequestError(
        "Bad Request",
        "No need to update, you didn't modified anything"
      );
    }

    const updateTask = await models.Task.update(req.body, {
      where: { id: getTaskId },
    });
    const changedTask = await models.Task.findOne({
      attributes: ["taskName", "description"],
      where: { id: getTaskId },
    });
    return res
      .status(201)
      .json({ updateTask: updateTask, changedTask: changedTask });
  },
  deleteTask: async (req, res) => {
    const taskId = req.params.id;
    const deleted = await models.Task.destroy({
      where: { id: taskId },
    });
    if (deleted) {
      return res.status(201).json({ succes: `Task is delete` });
    } else {
      throw new NotFoundError(
        "Resource not found",
        "The requested resource does not (or no longer) exist"
      );
    }
  },
};
