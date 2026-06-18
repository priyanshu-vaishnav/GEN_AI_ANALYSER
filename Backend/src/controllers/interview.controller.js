const interviewReportModel = require("../models/interviewReport.model.js");
const interviewReportGenerateService = require("../services/api.services.js");
async function generateInterviewReport(req, res) {
  try {
    const { selfDescription, resume, jobDescription } = req.body;
    if (selfDescription.length < 30) {
      return res.status(401).json({
        message: "Self description should be at least 30 characters long !!"
      });
    }
    
    if (!jobDescription && !selfDescription) {
      return res.status(401).json({
        message: "Job description and self Description is mandatory !!",
      });
    }

    const responseData = await interviewReportGenerateService.generateInterviewReport({
      selfDescription,
      resume,
      jobDescription,
    });

     const interviewReport = await interviewReportSchema.create({
        
       user:req.userId,
        selfDescription,
        jobDescription,
        ...responseData
    })

    res.status(200).json({
      report: responseData,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}


async function getUserReports(req,res){



  try{   
     const report = await interviewReportModel.find({user:req.userId})
      
     if(!report){
      res.status(200).json({
        message:"no report found"
      })
     }
     if(report.length >2){
      res.status(200).json({
        reports:report
      })
     }
     
     res.status(200).json({
      reports:[report],
      reportLen :report.length
     })
    }
    catch(err)
{
  res.status(401).json({
    message:err.message
  })
}
   

}
module.exports = { generateInterviewReport ,getUserReports};
