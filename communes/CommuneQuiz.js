const { useState, useEffect, useCallback } = React;
const { Button, Card, CardHeader, CardContent, CardActions } = MaterialUI;

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
    return Array.from({ length: count }, generateQuestion);
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
    return React.createElement('div', null, 'Chargement...');
  }

  return React.createElement(
    'div',
    { className: 'flex items-center justify-center min-h-screen bg-gray-100' },
    React.createElement(
      Card,
      { className: 'bg-card text-card-foreground rounded-xl border shadow w-full max-w-md' },
      showResult
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(CardHeader, { title: 'Résultats du quiz' }),
            React.createElement(
              CardContent,
              null,
              React.createElement('p', { className: 'text-2xl font-bold mb-4' }, `Votre score : ${score} / ${totalQuestions}`),
              React.createElement('p', null, `Taux de réussite global : ${((score / totalQuestions) * 100).toFixed(2)}%`)
            ),
            React.createElement(
              CardActions,
              null,
              React.createElement(Button, { onClick: continuePlay }, 'Continuer de jouer')
            )
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(CardHeader, { title: `Question ${questionsAnswered + currentQuestion + 1} / ${totalQuestions}` }),
            React.createElement(
              CardContent,
              null,
              React.createElement('p', { className: 'mb-4' }, 'Laquelle de ces communes est générée par une IA ?'),
              React.createElement(
                'div',
                { className: 'flex flex-col space-y-2' },
                questions[currentQuestion].names.map((name, index) =>
                  React.createElement(
                    Button,
                    { key: index, onClick: () => handleAnswer(index), variant: 'outlined', className: 'justify-start' },
                    name
                  )
                )
              )
            )
          )
    )
  );
};

ReactDOM.render(React.createElement(CommuneQuiz), document.getElementById('root'));
