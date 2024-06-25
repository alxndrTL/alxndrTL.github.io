import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const vraiesCommunes = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Montpellier", "Strasbourg", "Bordeaux", "Lille"];
const faussesCommunes = ["Saintville", "Montagnac-sur-Mer", "Boisclair", "Rivière-les-Champs", "Valléeville", "Pontchâteau-la-Forêt", "Beausoleil-sur-Loire", "Rochefort-les-Bains", "Villeneuve-la-Plaine", "Boissy-le-Sec"];

const CommuneQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateQuestion = useCallback(() => {
    const isRealFirst = Math.random() < 0.5;
    const realName = vraiesCommunes[Math.floor(Math.random() * vraiesCommunes.length)];
    const fakeName = faussesCommunes[Math.floor(Math.random() * faussesCommunes.length)];
    return {
      names: isRealFirst ? [realName, fakeName] : [fakeName, realName],
      correctAnswer: isRealFirst ? 1 : 0
    };
  }, []);

  const generateQuestions = useCallback((count) => {
    return Array(count).fill().map(generateQuestion);
  }, [generateQuestion]);

  useEffect(() => {
    const initialQuestions = generateQuestions(5);
    setQuestions(initialQuestions);
    setTotalQuestions(5);
  }, [generateQuestions]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      setQuestionsAnswered(questionsAnswered + 5);
    }
  };

  const continuePlay = () => {
    const newQuestions = generateQuestions(5);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setShowResult(false);
    setTotalQuestions(totalQuestions + 5);
  };

  if (questions.length === 0) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        {showResult ? (
          <>
            <CardHeader>Résultats du quiz</CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Votre score : {score} / {totalQuestions}</p>
              <p>Taux de réussite global : {(score / totalQuestions * 100).toFixed(2)}%</p>
            </CardContent>
            <CardFooter>
              <Button onClick={continuePlay}>Continuer de jouer</Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>Question {questionsAnswered + currentQuestion + 1} / {totalQuestions}</CardHeader>
            <CardContent>
              <p className="mb-4">Laquelle de ces communes est générée par une IA ?</p>
              <div className="flex flex-col space-y-2">
                {questions[currentQuestion].names.map((name, index) => (
                  <Button key={index} onClick={() => handleAnswer(index)} variant="outline" className="justify-start">
                    {name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default CommuneQuiz;