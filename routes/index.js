const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userController = require("../controller/userControllers");
const jwt = require("../utils/jwt.utils");
const listControllers = require("../controller/listControllers");
const taskControllers = require("../controller/taskControllers");




router.use(bodyParser.json());

// USER ROUTES
router.get("/user/me",jwt.authenticateJWT, userController.getUserMe);
router.get("/register",jwt.authenticateJWT, userController.getAllUser);
router.get("/register/:id", jwt.authenticateJWT, userController.getOneUser);

router.post("/login", userController.login);
router.post("/register", userController.register);

router.patch("/register/:id", jwt.authenticateJWT, userController.editUser);
router.delete("/register/:id", jwt.authenticateJWT, userController.deleteUser);

//LIST ROUTES
router.post("/lists", jwt.authenticateJWT, listControllers.createList);

router.get("/lists", jwt.authenticateJWT, listControllers.getAllList);
router.get("/lists/:id", jwt.authenticateJWT, listControllers.getOneList);
router.patch("/lists/:id", jwt.authenticateJWT, listControllers.editList);
router.delete("/lists/:id", jwt.authenticateJWT, listControllers.deleteList);

//TASK  ROUTES
router.post("/tasks/:listId", jwt.authenticateJWT, taskControllers.createTask);

router.get("/tasks", jwt.authenticateJWT, taskControllers.getAllTask);
router.get("/tasks/:id", jwt.authenticateJWT, taskControllers.getOneTask);
router.patch("/tasks/:id", jwt.authenticateJWT, taskControllers.editTask);
router.delete("/tasks/:id", jwt.authenticateJWT, taskControllers.deleteTask);

module.exports = router;