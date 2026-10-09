const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const {createProblem , updateProblem , deleteProblem , getProblemById, getAllProblem, solvedAllProblemByUser, submittedProblem}  = require("../controllers/userProblem");
const userMiddleware = require("../middleware/userMiddleware");

const problemRouter = express.Router();

//admin only do this

//create
problemRouter.post('/create' ,adminMiddleware,  createProblem);
//update
problemRouter.put('/update/:id' , updateProblem)
// //delete
problemRouter.delete('/delete/:id' , deleteProblem)






// //fetch
problemRouter.get('/problemById/:id' , userMiddleware, getProblemById)
problemRouter.get('/getAllProblem' ,userMiddleware, getAllProblem)

// // //particular user ne kon-konsi problem solve kri
problemRouter.get('/problemSolvedByUser' ,userMiddleware, solvedAllProblemByUser)

problemRouter.get('/submittedProblem/:pid' , userMiddleware ,submittedProblem);



module.exports = problemRouter;