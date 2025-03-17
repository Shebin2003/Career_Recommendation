

// Function to select 2 random questions from each difficulty level
function academicSelection(questions,type) {
    const selectedQuestions = [];
  
    // Select 1 random easy question
    const easyQuestions = questions.filter(q => q.difficulty_level === 'easy');
    if (easyQuestions.length < 2) {
      console.warn('Not enough questions for difficulty: easy');
    }
    selectedQuestions.push(...getRandomItems(easyQuestions, 1));
  
    // Select 1 random medium question
    const mediumQuestions = questions.filter(q => q.difficulty_level === 'medium');
    if (mediumQuestions.length < 2) {
      console.warn('Not enough questions for difficulty: medium');
    }
    selectedQuestions.push(...getRandomItems(mediumQuestions, 1));
  
    // Select 1 random hard question
    const hardQuestions = questions.filter(q => q.difficulty_level === 'hard');
    if (hardQuestions.length < 2) {
      console.warn('Not enough questions for difficulty: hard');
    }
    selectedQuestions.push(...getRandomItems(hardQuestions, 1));
    return selectedQuestions.map(question => ({
      ...question,
      type: question.type || type
    }))
}
  
// Helper function to get random items from an array
function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

module.exports = academicSelection