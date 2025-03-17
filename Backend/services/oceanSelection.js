

function selectRandomQuestions(questions,type) {
    const selectedQuestions = [];
    const temp = questions.filter(q => q.type === type);
    selectedQuestions.push(...getRandomItems(temp, 3));
    return selectedQuestions;
}
  
// Helper function to get random items from an array
function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

module.exports = selectRandomQuestions