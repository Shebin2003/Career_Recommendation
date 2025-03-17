const academicSelection = require("../services/questionSelection")
const selectOceanQuestions = require("../services/oceanSelection")
const selectRandomQuestions = require("../services/randomSelection")
const ocean = require("../Data/OCEAN.json")

const question = async(req,res) => {
    const databaseData = require("../Data/Database_Fundamentals.json")
    const databaseQuestions = databaseData.questions
    const type = "Database_Fundamentals"
    let selectedQuestions = academicSelection(databaseQuestions,type);

    const computerArchitectureData = require("../Data/Computer_Architrecture.json")
    const computerArchitectureQuestions = computerArchitectureData.questions
    const type2 = "Computer_Architecture"
    const selectedQuestions2 = academicSelection(computerArchitectureQuestions,type2);
    selectedQuestions = selectedQuestions.concat(selectedQuestions2)

    const distributedComputingData = require("../Data/Distributed_Computing.json")
    const distributedComputingQuestions = distributedComputingData.questions
    const type3 = "Distributed_Computing"
    const selectedQuestions3 = academicSelection(distributedComputingQuestions,type3);
    selectedQuestions = selectedQuestions.concat(selectedQuestions3)

    const cyberSecurityData = require("../Data/Cyber_Security.json")
    const cyberSecurityQuestions = cyberSecurityData.questions
    const type4 = "Cyber_Security"
    const selectedQuestions4 = academicSelection(cyberSecurityQuestions,type4);
    selectedQuestions = selectedQuestions.concat(selectedQuestions4)

    const networkingData = require("../Data/Networking.json")
    const networkingQuestions = networkingData.questions
    const type5 = "Networking"
    const selectedQuestions5 = academicSelection(networkingQuestions,type5);
    selectedQuestions = selectedQuestions.concat(selectedQuestions5)

    const softwareDevelopmentData = require("../Data/Software_Development.json")
    const softwareDevelopmentQuestions = softwareDevelopmentData.questions
    const type6 = "Software_Development"
    const selectedQuestions6 = academicSelection(softwareDevelopmentQuestions,type6);
    selectedQuestions = selectedQuestions.concat(selectedQuestions6)

    const programmingSkillsData = require("../Data/Programming_skills.json")
    const programmingSkillsQuestions = programmingSkillsData.questions
    const type7 = "Programming_Skills"
    const selectedQuestions7 = academicSelection(programmingSkillsQuestions,type7);
    selectedQuestions = selectedQuestions.concat(selectedQuestions7)

    const projectManagementData = require("../Data/Project_Management.json")
    const projectManagementQuestions = projectManagementData.questions
    const type8 = "Project_Management"
    const selectedQuestions8 = academicSelection(projectManagementQuestions,type8);
    selectedQuestions = selectedQuestions.concat(selectedQuestions8)

    const computerForensicsFundamentalsData = require("../Data/Computer_Forensics.json")
    const computerForensicsFundamentalsQuestions = computerForensicsFundamentalsData.questions
    const type9 = "Computer_Forensics_Fundamentals"
    const selectedQuestions9 = academicSelection(computerForensicsFundamentalsQuestions,type9);
    selectedQuestions = selectedQuestions.concat(selectedQuestions9)

    const technicalCommunicationData = require("../Data/Technical_Communication.json")
    const technicalCommunicationQuestions = technicalCommunicationData.questions
    const type10 = "Technical_Communication"
    const selectedQuestions10 = academicSelection(technicalCommunicationQuestions,type10);
    selectedQuestions = selectedQuestions.concat(selectedQuestions10)

    const aIMLData = require("../Data/Ai_and_Ml.json")
    const aIMLQuestions = aIMLData.questions
    const type11 = "AI_ML"
    const selectedQuestions11 = academicSelection(aIMLQuestions,type11);
    selectedQuestions = selectedQuestions.concat(selectedQuestions11)

    const softwareEngineeringData = require("../Data/Software_Engineering.json")
    const softwareEngineeringQuestions = softwareEngineeringData.questions
    const type12 = "Software_Engineering"
    const selectedQuestions12 = academicSelection(softwareEngineeringQuestions,type12);
    selectedQuestions = selectedQuestions.concat(selectedQuestions12)

    const businessAnalysisData = require("../Data/Business_Analysis.json")
    const businessAnalysisQuestions = businessAnalysisData.questions
    const type13 = "Business_Analysis"
    const selectedQuestions13 = academicSelection(businessAnalysisQuestions,type13);
    selectedQuestions = selectedQuestions.concat(selectedQuestions13)

    const dataScienceData = require("../Data/Data_Science.json")
    const dataScienceQuestions = dataScienceData.questions
    const type15 = "Data_Science"
    const selectedQuestions15 = academicSelection(dataScienceQuestions,type15);
    selectedQuestions = selectedQuestions.concat(selectedQuestions15)

    const troubleshootingSkillsData = require("../Data/Troubleshooting_Skills.json")
    const troubleshootingSkillsQuestions = troubleshootingSkillsData.questions
    const type16 = "Troubleshooting_Skills"
    const selectedQuestions16 = academicSelection(troubleshootingSkillsQuestions,type16);
    selectedQuestions = selectedQuestions.concat(selectedQuestions16)

    const graphicsDesigningData = require("../Data/Graphic_Design.json")
    const graphicsDesigningQuestions = graphicsDesigningData.questions
    const type17 = "Graphics_Designing"
    const selectedQuestions17 = academicSelection(graphicsDesigningQuestions,type17);
    selectedQuestions = selectedQuestions.concat(selectedQuestions17)

    res.send(selectedQuestions)
}

const oceanQuestions = async(req,res) => {
    const type = "openness"
    let selectedQuestions = selectOceanQuestions(ocean,type);

    const type1 = "conscientiousness"
    const selectedQuestions1 = selectOceanQuestions(ocean,type1);
    selectedQuestions = selectedQuestions.concat(selectedQuestions1)

    const type2 = "extraversion"
    const selectedQuestions2 = selectOceanQuestions(ocean,type2);
    selectedQuestions = selectedQuestions.concat(selectedQuestions2)

    const type3 = "agreeableness"
    const selectedQuestions3 = selectOceanQuestions(ocean,type3);
    selectedQuestions = selectedQuestions.concat(selectedQuestions3)

    const type4 = "neuroticism"
    const selectedQuestions4 = selectOceanQuestions(ocean,type4);
    selectedQuestions = selectedQuestions.concat(selectedQuestions4)

    const communcation = {
        "type": "communcation_skills",
        "question": "How good is your communcation skill",
      }

    selectedQuestions = selectedQuestions.concat(communcation)

    res.send(selectedQuestions)
}


module.exports = {
    oceanQuestions,
    question
}