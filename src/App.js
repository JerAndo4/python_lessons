import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import WhileLesson from './components/WhileLesson';
import ListsLesson from './components/ListsLesson';
import TuplesDictsLesson from './components/TuplesDictsLesson';
import { ArrowLeft, Home } from 'lucide-react';

// Обёртка для уроков с кнопкой возврата
const LessonWrapper = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-indigo-600"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">К урокам</span>
        </button>
        {children}
      </div>
    </div>
  );
};

// Главная страница
const HomePage = () => {
  const lessons = [
    {
      id: 'while',
      title: 'Цикл while',
      description: 'Изучи цикл while, break, continue и вложенные циклы',
      icon: '🔄',
      color: 'from-blue-500 to-indigo-600',
      path: '/while',
      topics: ['Основы while', 'break и continue', 'Вложенные циклы', 'Практика']
    },
    {
      id: 'lists',
      title: 'Списки',
      description: 'Работа со списками, методы и операции',
      icon: '📚',
      color: 'from-purple-500 to-pink-600',
      path: '/lists',
      topics: ['Создание списков', 'Методы', 'Срезы', 'Задачи']
    },
    {
      id: 'tuples-dicts',
      title: 'Кортежи и Словари',
      description: 'Неизменяемые структуры и хранение данных ключ-значение',
      icon: '📦',
      color: 'from-teal-500 to-cyan-600',
      path: '/tuples-dicts',
      topics: ['Кортежи (Tuples)', 'Словари (Dicts)', 'Вложенные структуры', 'Практика']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home size={40} className="text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Python для начинающих
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Выбери урок и начни обучение
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lessons.map((lesson) => (
            <Link key={lesson.id} to={lesson.path} className="block group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform group-hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${lesson.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl">{lesson.icon}</span>
                    <h2 className="text-2xl font-bold">{lesson.title}</h2>
                  </div>
                  <p className="text-white/90">{lesson.description}</p>
                </div>

                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Что изучишь:
                  </h3>
                  <ul className="space-y-2">
                    {lesson.topics.map((topic, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                    <span className="font-medium text-indigo-700">Начать урок</span>
                    <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// 404
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/while" element={<LessonWrapper><WhileLesson /></LessonWrapper>} />
        <Route path="/lists" element={<LessonWrapper><ListsLesson /></LessonWrapper>} />
        <Route path="/tuples-dicts" element={<LessonWrapper><TuplesDictsLesson /></LessonWrapper>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;