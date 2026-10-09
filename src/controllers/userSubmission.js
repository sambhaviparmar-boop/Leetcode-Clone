const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");


const submitCode = async(req,res)=>{
   
    try {
       
     const userId = req.result._id;
     const problemId = req.params.id;      

     const {code , language} = req.body;

     if(!userId || !problemId || !code || !language){
        return res.status(400).send("Some field Missing");
     }

     //fetch the problem from db 
     const problem = await Problem.findById(problemId);
     //isse testcases milgye hidden vale

     const submittedResult = await Submission.create({
        userId, 
        problemId,
        code,
        language,
        testCasesPassed: 0,
        status: 'pending',
        testCasesTotal: problem.hiddenTestCases.length
     })

     //judge0 code ko submit krwana hai

     const languageId = getLanguageById(language);
      
      const submissions = problem.hiddenTestCases.map((testcase)=>({
                  
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
             }))

           const submitResult = await submitBatch(submissions);
             
            const resultToken = submitResult.map((value) => value.token);
           
           const testResult = await submitToken(resultToken);

           //ab submittedResult ko update ko
          let testCasesPassed = 0;
          let runTime = 0;
          let memory = 0;
          let status = 'accepted';
          let errorMessage = null;

           for(const test of testResult){
             if(test.status_id==3){
               testCasesPassed++;
               runTime = runTime+parseFloat(test.time);
               memory = Math.max(memory , test.memory)
             }
             else{
                if(test.status_id==4){
                    status = 'error'
                   errorMessage = test.stderr
                }
                else{
                    status = 'wrong'
                     errorMessage = test.stderr
                }
             }
           }



           //store thr result in db in Submission 

           submittedResult.status = status;
           submittedResult.testCasesPassed = testCasesPassed;
           submittedResult.errorMessage = errorMessage;
           submittedResult.runTime = runTime;
           submittedResult.memory = memory;


           await submittedResult.save();

            //problemId ko insert krenge  user schema mai if it not present there 

           if(!req.result.problemSolved.includes(problemId)){
               req.result.problemSolved.push(problemId);
               await req.result.save();
            }




           res.status(201).send(submittedResult);

           


    } catch (error) {
        res.status(500).send("Internal Server Error :" + error);
    }

}

const runCode = async(req,res)=>{

try {
       
     const userId = req.result._id;
     const problemId = req.params.id;      

     const {code , language} = req.body;

     if(!userId || !problemId || !code || !language){
        return res.status(400).send("Some field Missing");
     }

     //fetch the problem from db 
     const problem = await Problem.findById(problemId);
     //isse testcases milgye hidden vale


     //judge0 code ko submit krwana hai

     const languageId = getLanguageById(language);
      
      const submissions = problem.visibleTestCases.map((testcase)=>({
                  
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
             }))

           const submitResult = await submitBatch(submissions);
             
            const resultToken = submitResult.map((value) => value.token);
           
           const testResult = await submitToken(resultToken);

        
           res.status(201).send(testResult);

    } catch (error) {
        res.status(500).send("Internal Server Error :" + error);
    }



}

module.exports = {submitCode, runCode};