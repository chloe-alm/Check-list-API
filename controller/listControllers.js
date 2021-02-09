const models = require("../models");
const {
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
  ServerError,
  NotFoundError,
} = require("../helpers/errors");

module.exports = {
    createList: async (req, res) => {
      const list = {
        listName: req.body.listName,
        
      };
      
      if (list.listName === null) {
        throw new BadRequestError(
          "Bad request", 
          "Input content must be filled"
        );
      }
      const addList = await models.List.create({
        listName: list.listName,
        userId: req.user.userId,
       
      });
      res.status(201).json({ addList});
    },
    getOneList: async (req, res) => {
      const listId = req.params.id;
      if (listId) {
        const list = await models.List.findOne({ where: { id: listId } });
        if (list) {
          return res.status(200).json({ list: list });
        } else
        throw new NotFoundError(
          "Resource not found", 
          "Post not found");
      } else {
        throw new NotFoundError(
          "Resource not found", 
          "Page indisponible");
        
      }
    },
    getAllList: async (req, res) => {
      const listAll = await models.List.findAll({ limit: 10, order:[["id", "DESC"]] });
      if (listAll) {
        res.status(200).json({ list: listAll });
      } else {
        throw new ServerError(
          "servor error",
          "There is not post");
      }
    },
    editList: async (req, res) => {
      const getListId = req.params.id;
      const initialList = await models.List.findOne({
        attributes: ["listName"],
        where: { id: getListId },
      });
  
      if (!initialList) {
        throw new NotFoundError(
          "Resource not found",
          "There is nothing to find at that url, the ID does not exist"
        );
      }
        let inputStateList = {
        listName: req.body.listName,
   
      };
  
      if (
        initialList.listName === inputStateList.listName 
   
      ) {
        throw new BadRequestError(
          "Bad Request",
          "No need to update, you didn't modified anything"
        );
      }
  
      const updateList = await models.List.update(req.body, {
        where: { id: getListId },
      });
      const changedList = await models.List.findOne({
        attributes: ["listName"],
        where: { id: getListId },
      });
      return res.status(201).json({ updateList: updateList, changedList });
    },
    deleteList: async (req, res) => {
      const listId = req.params.id;
      const deleted = await models.List.destroy({
        where: { id: listId },
      });
      if (deleted) {
        return res.status(201).json({ succes: `List post delete` });
      } else {
        throw new NotFoundError(
          "Resource not found",
          "The requested resource does not (or no longer) exist"
        );
      }
    },

    




}