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

     const interviewReport = await interviewReportModel.create({
        
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


async function getUserReports(req, res) {
  try {
    // Database se logged-in user ki saari reports find karein
    const reportData = await interviewReportModel.find({ user: req.userId });

    // FIX 1 & 2: Mongoose arrays ke liye '.length === 0' check karein aur 'return' lagayein
    if (reportData.length === 0) {
      
      return res.status(200).json({
        success: true,
        message: "No reports found for this user.",
        reports: [] // Frontend par loop crash na ho, isliye khali array bhejna best practice hai
      });
    }

    // FIX 3: Unnecessary 'length > 2' ka check hata diya, direct data bhejein
    return res.status(200).json({

      reports: reportData
    });

  } catch (err) {
    console.error("Error in getUserReports:", err); // Server logs ke liye
    
    // FIX 4: DB error ke liye 401 ki jagah 500 status code use kiya
    return res.status(500).json({
    
      message: "Internal server error while fetching reports.",
      error: err.message
    });
  }
}
   


module.exports = { generateInterviewReport ,getUserReports};
