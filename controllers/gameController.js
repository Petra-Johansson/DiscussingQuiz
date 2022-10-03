/*
* HÄR MÅSTE VI SKAPA EN METOD SOM 
* HÄMTAR X ANTAL RANDOM FRÅGOR DÅ ETT SPEL STARTAS
* TYP NÅGOT SÅNT HÄR?

const getGameQuestions = async (req,res) => {

  const questions = await gameQuestionsLogic();
  if(questions){
    return res.status(200).json({ questions})
  }else {
    return res.status(500).json({ error: "Could not get any questions. Please try again"});
  }
}
*/
