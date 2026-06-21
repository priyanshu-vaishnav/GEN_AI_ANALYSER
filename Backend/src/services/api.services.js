const { GoogleGenAI, Type } = require("@google/genai");
const {PDFParse} = require("pdf-parse")
const dotenv = require("dotenv")
dotenv.config();
const ai = new GoogleGenAI({
    apiKey: `${process.env.GENAPIKEY}`
});

// 1. Official Gemini Schema Definition (No Zod, No Conversion needed)
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "A score between 0 to 100 indicating how well the candidate matches the job description",
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Array of technical questions tailored to the job and profile",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question" },
                    intention: { type: Type.STRING, description: "The intention behind asking this question" },
                    answer: { type: Type.STRING, description: "How the candidate should answer, key points to cover" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        behaviourQuestions: {
            type: Type.ARRAY,
            description: "Array of behavioral/soft-skill questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question" },
                    intention: { type: Type.STRING, description: "What core competency is being tested" },
                    answer: { type: Type.STRING, description: "The best way to answer this question using STAR method" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        skillsGap: {
            type: Type.ARRAY,
            description: "Identified gaps between candidate profile and job requirements",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The specific technology or skill lacking" },
                    intensity: { 
                        type: Type.STRING, 
                        enum: ["Low", "Medium", "High"], 
                        description: "The importance/priority of this skill" 
                    },
                },
                required: ["skill", "intensity"],
            },
        },
        dailyPreparePlans: {
            type: Type.ARRAY,
            description: "A structured 7-day preparation roadmap",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day identifier, e.g., 'Day 1'" },
                    focus: { type: Type.STRING, description: "The main domain or topic of focus for this day" },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "List of tasks the candidate needs to perform" 
                    },
                },
                required: ["day", "focus", "tasks"],
            },
        },
    },
    required: ["matchScore", "technicalQuestions", "behaviourQuestions", "skillsGap", "dailyPreparePlans"],
};

// 2. Generate Function
async function generateInterviewReport({ selfDescription, resume, jobDescription }) {


    /**@method : Pdf Parse method jo pdf extact krega  */
    let resumeText = "";

        // 1. Check karein ki resume ek URL hai ya nahi
        if (resume && resume.startsWith('http')) {
            console.log("Fetching and parsing PDF using native fetch:", resume);
            
            // Native Node.js fetch use kiya
            const response = await fetch(resume);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.statusText}`);
            }

            // Response ko arrayBuffer me convert kiya aur fir Node.js Buffer banaya
            const arrayBuffer = await response.arrayBuffer();
            const pdfBuffer = Buffer.from(arrayBuffer);
            
            // pdf-parse se text nikala
            const parsedPdf = await new PDFParse(pdfBuffer);
            resumeText = parsedPdf.text; 
        } else {
            resumeText = resume;
        }
    
    const prompt = `You are an expert career coach and interviewer. 
    Analyze the candidate's self-description, resume, and the target job description provided below.
    Generate a highly accurate, customized interview preparation report strictly following the JSON schema layout.

    Candidate Self-Description: ${selfDescription}
    Candidate Resume: ${resumeText}
    Target Job Description: ${jobDescription}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Fully stable for structured outputs
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportSchema, // Directly passing compliant schema object
            },
        });

        return JSON.parse(response.text);
    }
  catch (error) {
        console.error("Error generating structured report:", error);
        throw error;
    }

}

module.exports = { generateInterviewReport };