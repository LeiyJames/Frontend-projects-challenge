"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw, Trophy, CheckCircle, XCircle, Play } from "lucide-react"

// Quiz data structure
const quizData = {
  title: "General Knowledge Quiz",
  description: "Test your knowledge with these 10 challenging questions",
  questions: [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris",
      explanation: "Paris has been the capital of France since the 5th century.",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      explanation: "Mars appears red due to iron oxide on its surface.",
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      answer: "Leonardo da Vinci",
      explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
      explanation: "The Pacific Ocean covers about 46% of the world's water surface.",
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Iron"],
      answer: "Oxygen",
      explanation: "Oxygen is a chemical element with the symbol O and atomic number 8.",
    },
    {
      id: 6,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      answer: "1945",
      explanation: "World War II ended in 1945 with the surrender of Japan in September.",
    },
    {
      id: 7,
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
      answer: "Vatican City",
      explanation: "Vatican City is the smallest country with an area of just 0.17 square miles.",
    },
    {
      id: 8,
      question: "Which mammal is known to have the most powerful bite?",
      options: ["Lion", "Shark", "Crocodile", "Hippopotamus"],
      answer: "Hippopotamus",
      explanation: "Hippos have the strongest bite force among mammals at 1,800 PSI.",
    },
    {
      id: 9,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      answer: "Diamond",
      explanation: "Diamond is the hardest natural substance, rating 10 on the Mohs scale.",
    },
    {
      id: 10,
      question: "Which country has the most natural lakes?",
      options: ["United States", "Russia", "Canada", "Finland"],
      answer: "Canada",
      explanation: "Canada has over 2 million lakes, more than any other country.",
    },
  ],
  timePerQuestion: 30,
}

type QuizState = "start" | "question" | "feedback" | "results"

interface UserAnswer {
  questionId: number
  selectedAnswer: string
  isCorrect: boolean
  timeSpent: number
}

export default function QuizApp() {
  const [quizState, setQuizState] = useState<QuizState>("start")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(quizData.timePerQuestion)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = quizData.questions[currentQuestionIndex]
  const totalQuestions = quizData.questions.length
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    if (quizState === "question" && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswerSubmit("")
    }
  }, [quizState, timeLeft, showFeedback])

  const startQuiz = () => {
    setQuizState("question")
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setScore(0)
    setTimeLeft(quizData.timePerQuestion)
    setSelectedAnswer("")
    setShowFeedback(false)
  }

  const handleAnswerSelect = (answer: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answer)
    }
  }

  const handleAnswerSubmit = (answer: string) => {
    const isCorrect = answer === currentQuestion.answer
    const timeSpent = quizData.timePerQuestion - timeLeft

    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      isCorrect,
      timeSpent,
    }

    setUserAnswers([...userAnswers, userAnswer])

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowFeedback(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setTimeLeft(quizData.timePerQuestion)
      setShowFeedback(false)
    } else {
      setQuizState("results")
    }
  }

  const restartQuiz = () => {
    setQuizState("start")
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer("")
    setScore(0)
    setTimeLeft(quizData.timePerQuestion)
    setShowFeedback(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 90) return "Excellent! 🎉"
    if (percentage >= 70) return "Great job! 😊"
    if (percentage >= 50) return "Good effort! 👍"
    return "Keep practicing! 💪"
  }

  // Start Screen Component
  if (quizState === "start") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="text-center bg-slate-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">{quizData.title}</CardTitle>
            <CardDescription className="text-slate-200">{quizData.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Time per question:</span>
                <span className="font-semibold">{quizData.timePerQuestion}s</span>
              </div>
              <div className="flex justify-between">
                <span>Total time:</span>
                <span className="font-semibold">{(totalQuestions * quizData.timePerQuestion) / 60} minutes</span>
              </div>
            </div>
            <Button
              onClick={startQuiz}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 text-lg"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Question Screen Component
  if (quizState === "question") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header with progress and timer */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-slate-700">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </Badge>
                <Badge variant="outline" className="text-slate-700">
                  Score: {score}/{totalQuestions}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <Clock className="h-4 w-4" />
                <span className={`font-mono text-lg ${timeLeft <= 10 ? "text-red-500" : ""}`}>{timeLeft}s</span>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-slate-700 text-white rounded-t-lg">
              <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass =
                    "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:shadow-md"

                  if (showFeedback) {
                    if (option === currentQuestion.answer) {
                      buttonClass += " bg-green-100 border-green-500 text-green-800"
                    } else if (option === selectedAnswer && option !== currentQuestion.answer) {
                      buttonClass += " bg-red-100 border-red-500 text-red-800"
                    } else {
                      buttonClass += " bg-gray-50 border-gray-200 text-gray-500"
                    }
                  } else {
                    if (selectedAnswer === option) {
                      buttonClass += " bg-slate-100 border-slate-400 shadow-md"
                    } else {
                      buttonClass += " bg-white border-gray-200 hover:border-slate-300"
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={buttonClass}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showFeedback && option === currentQuestion.answer && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showFeedback && option === selectedAnswer && option !== currentQuestion.answer && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Feedback Section */}
              {showFeedback && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-3">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                  <Button onClick={nextQuestion} className="w-full bg-slate-700 hover:bg-slate-800">
                    {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
                  </Button>
                </div>
              )}

              {/* Submit Button */}
              {!showFeedback && (
                <div className="mt-6">
                  <Button
                    onClick={() => handleAnswerSubmit(selectedAnswer)}
                    disabled={!selectedAnswer}
                    className="w-full bg-slate-700 hover:bg-slate-800 disabled:bg-gray-300"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Results Screen Component
  if (quizState === "results") {
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-lg border-0">
          <CardHeader className="text-center bg-slate-700 text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-400" />
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
            <CardDescription className="text-slate-200 text-lg">{getScoreMessage()}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-slate-700 mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-2xl text-gray-600">{percentage}% Correct</div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                <div className="text-2xl font-bold text-green-700">{score}</div>
                <div className="text-sm text-green-600">Correct</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                <div className="text-2xl font-bold text-red-700">{totalQuestions - score}</div>
                <div className="text-sm text-red-600">Incorrect</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Your Score</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={restartQuiz}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3"
                size="lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
