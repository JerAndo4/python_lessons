import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Home } from 'lucide-react';
import WhileLesson from './components/WhileLesson';
import ListsLesson from './components/ListsLesson';

// ЧТО: Главная страница со списком уроков
// ЗАЧЕМ: Выбор урока пользователем
function HomePage() {
  const navigate = useNavigate();

  const lessons = [
    {
      id: 'while',
      title: 'Цикл while',
      icon: '🔄',
      description: 'Повторение кода пока условие истинно',
      difficulty: 'Средний',
      topics: ['break', 'continue', 'флаги', 'вложенные циклы'],
      path: '/while'
    },
    {
      id: 'lists',
      title: 'Списки (list)',
      icon: '📚',
      description: 'Хранение множества элементов',
      difficulty: 'Начальный',
      topics: ['индексы', 'методы', 'срезы', 'перебор'],
      path: '/lists'
    }
    // ЧТО: Сюда добавляются новые уроки
    // КАК: Просто копируй блок выше и меняй данные
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen size={40} className="text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-600">
              Python для детей
            </h1>
          </div>
          <p className="text-center text-gray-600 text-lg">
            Интерактивные уроки программирования для 4 класса
          </p>
        </div>

        {/* Список уроков */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => navigate(lesson.path)}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
            >
              {/* Иконка и заголовок */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{lesson.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-purple-600">
                    {lesson.title}
                  </h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
                    lesson.difficulty === 'Начальный' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>

              {/* Описание */}
              <p className="text-gray-600 mb-4">{lesson.description}</p>

              {/* Темы урока */}
              <div className="flex flex-wrap gap-2">
                {lesson.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Кнопка */}
              <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition">
                Начать урок →
              </button>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">{lessons.length}</div>
              <div className="text-gray-600">Уроков</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {lessons.reduce((acc, l) => acc + l.topics.length, 0)}
              </div>
              <div className="text-gray-600">Тем</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">10</div>
              <div className="text-gray-600">Задач</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ЧТО: Обёртка для урока с кнопкой возврата
// ЗАЧЕМ: Чтобы из любого урока можно было вернуться на главную
function LessonWrapper({ children }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Кнопка возврата на главную */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 bg-white shadow-lg text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-50 transition flex items-center gap-2"
      >
        <ArrowLeft size={20} />
        К урокам
      </button>
      {children}
    </div>
  );
}

// ЧТО: Главный компонент приложения
// ЗАЧЕМ: Настройка роутинга между страницами
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<HomePage />} />
        
        {/* Урок: Цикл while */}
        <Route 
          path="/while" 
          element={
            <LessonWrapper>
              <WhileLesson />
            </LessonWrapper>
          } 
        />
        
        {/* Урок: Списки */}
        <Route 
          path="/lists" 
          element={
            <LessonWrapper>
              <ListsLesson />
            </LessonWrapper>
          } 
        />

        {/* ЧТО: Сюда добавляются новые маршруты */}
        {/* КАК: Скопируй блок Route выше и измени path + компонент */}
        
        {/* 404 - страница не найдена */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">❌</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Страница не найдена</h1>
                <Link 
                  to="/"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700"
                >
                  <Home size={20} className="inline mr-2" />
                  Вернуться на главную
                </Link>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;