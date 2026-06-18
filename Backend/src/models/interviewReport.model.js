const mongoose = require("mongoose");


const technicalQuestionSchema = new mongoose.Schema({
   
    question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"intentions is required"]
    },
    answer:{
        type:String,
        required:[true,"technical answer is required"]
    }

},{
    _id:false
})

const behaviourQuestionSchema = new mongoose.Schema({

        question:{
        type:String,
        required:[true,"technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"intentions is required"]
    },
    answer:{
        type:String,
        required:[true,"technical answer is required"]
    }
},{_id:false})


const skillsGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skills is required"]
    },
    intensity:{
        type:String,
        enum:["Low","Medium","High"]
    }
},{_id:false})


const dailyPreparePlansSchema = new mongoose.Schema({
    
    day:{
        type:String,
        required:[true ,"Day is required"]
    },
    focus:{
        type:String,
        required:[true ,"focus is required"]
    },
    tasks:[
        {
            type:String,
            required:[true,"Tasks cannot be empty"]
        }
    ]

    


},{timestamps:false})

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: false,
    },
    selfDescription: {
      type: String,
      required: true,
    },
    matchScore :{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions :[technicalQuestionSchema],
    behaviourQuestions:[behaviourQuestionSchema],
    skillsGap:[skillsGapSchema],
    dailyPreparePlans:[dailyPreparePlansSchema]
    
    ,user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
},
  { timestamps: true },
);


const interviewReportModel = mongoose.model('interviewreports',interviewReportSchema)

module.exports = interviewReportModel