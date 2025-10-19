import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Plus, AlertCircle, Check, X, Lightbulb, Lock } from 'lucide-react';

const ListsLesson = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [algoAnswer, setAlgoAnswer] = useState('');
  const [algoChecked, setAlgoChecked] = useState(false);
  
  const [appendDemo, setAppendDemo] = useState({ running: false, output: [], list: [] });
  const [indexDemo, setIndexDemo] = useState({ running: false, output: [], currentIndex: -1 });
  const [sliceDemo, setSliceDemo] = useState({ running: false, output: [], highlighted: [] });
  
  const [activeTask, setActiveTask] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [solvedTasks, setSolvedTasks] = useState([]);
  
  const sections = [
    { id: 0, title: '🔄 Быстрое повторение' },
    { id: 1, title: '📚 Что такое список?' },
    { id: 2, title: '🔢 Индексы и доступ' },
    { id: 3, title: '➕ Методы списков' },
    { id: 4, title: '✂️ Срезы (slicing)' },
    { id: 5, title: '🔁 Перебор списков' },
    { id: 6, title: '⚡ Оптимизация и ошибки' },
    { id: 7, title: '📝 Сложные задания' },
    { id: 8, title: '💻 Практика с проверкой' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Задача 1: Создание списка',
      difficulty: '⭐',
      description: 'Создай список из 3 любимых фруктов и выведи его',
      starterCode: '# Создай список fruits\n',
      solution: 'fruits = ["яблоко", "банан", "апельсин"]\nprint(fruits)',
      tests: [{ input: null, expected: ['["яблоко", "банан", "апельсин"]'] }],
      hints: ['Используй квадратные скобки []', 'Элементы через запятую', 'Строки в кавычках']
    },
    {
      id: 2,
      title: 'Задача 2: Доступ по индексу',
      difficulty: '⭐⭐',
      description: 'Выведи первый и последний элементы списка [10, 20, 30, 40, 50]',
      starterCode: 'numbers = [10, 20, 30, 40, 50]\n# Выведи первый и последний\n',
      solution: 'numbers = [10, 20, 30, 40, 50]\nprint(numbers[0])\nprint(numbers[-1])',
      tests: [{ input: null, expected: ['10', '50'] }],
      hints: ['Первый элемент: индекс 0', 'Последний: индекс -1', 'Используй numbers[индекс]']
    },
    {
      id: 3,
      title: 'Задача 3: Добавление элементов',
      difficulty: '⭐⭐',
      description: 'К списку [1, 2, 3] добавь число 4 и выведи список',
      starterCode: 'nums = [1, 2, 3]\n# Добавь 4 и выведи\n',
      solution: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)',
      tests: [{ input: null, expected: ['[1, 2, 3, 4]'] }],
      hints: ['Используй метод .append()', 'Синтаксис: список.append(элемент)', 'Потом print(nums)']
    },
    {
      id: 4,
      title: 'Задача 4: Перебор списка',
      difficulty: '⭐⭐⭐',
      description: 'Выведи каждый элемент списка ["кот", "собака", "птица"] с его номером',
      starterCode: 'animals = ["кот", "собака", "птица"]\n# Выведи: 1. кот, 2. собака, 3. птица\n',
      solution: 'animals = ["кот", "собака", "птица"]\nfor i in range(len(animals)):\n    print(f"{i+1}. {animals[i]}")',
      tests: [{ input: null, expected: ['1. кот', '2. собака', '3. птица'] }],
      hints: ['Используй цикл for', 'range(len(animals)) даст индексы', 'i+1 потому что индексы с 0']
    },
    {
      id: 5,
      title: 'Задача 5: Срез списка',
      difficulty: '⭐⭐⭐',
      description: 'Из списка [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] выведи элементы с индексами 2 до 5',
      starterCode: 'nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n# Выведи [2, 3, 4, 5]\n',
      solution: 'nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(nums[2:6])',
      tests: [{ input: null, expected: ['[2, 3, 4, 5]'] }],
      hints: ['Используй срез [start:end]', 'end не включается!', 'nums[2:6] даст элементы с индексами 2, 3, 4, 5']
    }
  ];

  const checkAlgoAnswer = () => {
    setAlgoChecked(true);
  };

  const runAppendDemo = () => {
    if (appendDemo.running) return;
    const initialList = ['🍎', '🍌'];
    setAppendDemo({ running: true, output: [], list: [...initialList] });
    
    let output = [];
    let currentList = [...initialList];
    output.push(`Начальный список: ${JSON.stringify(currentList)}`);
    
    const items = ['🍊', '🍇'];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < items.length) {
        currentList.push(items[step]);
        output.push(`Добавили ${items[step]} → ${JSON.stringify(currentList)}`);
        setAppendDemo({ running: true, output: [...output], list: [...currentList] });
        step++;
      } else {
        setAppendDemo({ running: false, output: [...output], list: [...currentList] });
        clearInterval(interval);
      }
    }, 1000);
  };

  const runIndexDemo = () => {
    if (indexDemo.running) return;
    setIndexDemo({ running: true, output: [], currentIndex: -1 });
    
    const list = ['A', 'B', 'C', 'D', 'E'];
    let output = [];
    output.push(`Список: ${JSON.stringify(list)}`);
    
    const indices = [0, 2, -1, -2];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < indices.length) {
        const idx = indices[step];
        const value = list[idx >= 0 ? idx : list.length + idx];
        output.push(`Индекс ${idx} → элемент "${value}"`);
        setIndexDemo({ running: true, output: [...output], currentIndex: idx });
        step++;
      } else {
        setIndexDemo({ running: false, output: [...output], currentIndex: -1 });
        clearInterval(interval);
      }
    }, 1200);
  };

  const runSliceDemo = () => {
    if (sliceDemo.running) return;
    setSliceDemo({ running: true, output: [], highlighted: [] });
    
    const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let output = [];
    output.push(`Список: ${JSON.stringify(list)}`);
    
    const slices = [
      { notation: '[2:5]', start: 2, end: 5 },
      { notation: '[:3]', start: 0, end: 3 },
      { notation: '[5:]', start: 5, end: 10 },
      { notation: '[::2]', start: 0, end: 10, step: 2 }
    ];
    
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < slices.length) {
        const slice = slices[step];
        let result = [];
        let highlighted = [];
        
        if (slice.step) {
          for (let i = slice.start; i < slice.end; i += slice.step) {
            result.push(list[i]);
            highlighted.push(i);
          }
        } else {
          for (let i = slice.start; i < slice.end; i++) {
            result.push(list[i]);
            highlighted.push(i);
          }
        }
        
        output.push(`list${slice.notation} = ${JSON.stringify(result)}`);
        setSliceDemo({ running: true, output: [...output], highlighted: [...highlighted] });
        step++;
      } else {
        setSliceDemo({ running: false, output: [...output], highlighted: [] });
        clearInterval(interval);
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end);
      setUserCode(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const runCode = () => {
    const task = tasks[activeTask];
    const outputLines = [];
    let passed = false;

    try {
      const lines = userCode.split('\n');
      const variables = {};
      
      for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;

        const listMatch = line.match(/^(\w+)\s*=\s*\[(.*)\]$/);
        if (listMatch) {
          const varName = listMatch[1];
          const elements = listMatch[2] ? listMatch[2].split(',').map(el => {
            el = el.trim();
            if (el.startsWith('"') || el.startsWith("'")) {
              return el.replace(/['"]/g, '');
            }
            return parseInt(el) || el;
          }) : [];
          variables[varName] = elements;
          continue;
        }

        const appendMatch = line.match(/^(\w+)\.append\((.+)\)$/);
        if (appendMatch) {
          const varName = appendMatch[1];
          let value = appendMatch[2].trim();
          if (value.startsWith('"') || value.startsWith("'")) {
            value = value.replace(/['"]/g, '');
          } else {
            value = parseInt(value) || value;
          }
          if (variables[varName]) {
            variables[varName].push(value);
          }
          continue;
        }

        const printMatch = line.match(/^print\((.+)\)$/);
        if (printMatch) {
          let content = printMatch[1].trim();
          
          if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.substring(2, content.length - 1);
            content = content.replace(/\{(.+?)\}/g, (match, expr) => {
              if (expr.includes('[')) {
                const arrMatch = expr.match(/(\w+)\[(\d+)\]/);
                if (arrMatch && variables[arrMatch[1]]) {
                  return variables[arrMatch[1]][parseInt(arrMatch[2])];
                }
              }
              if (expr.includes('+')) {
                const parts = expr.split('+').map(p => p.trim());
                let result = '';
                for (let part of parts) {
                  if (part.match(/^\d+$/)) {
                    result += part;
                  } else if (variables[part] !== undefined) {
                    result += variables[part];
                  }
                }
                return result;
              }
              return variables[expr] || expr;
            });
            outputLines.push(content);
          } else if (content.startsWith('"') || content.startsWith("'")) {
            outputLines.push(content.replace(/['"]/g, ''));
          } else if (content.includes('[')) {
            const arrMatch = content.match(/(\w+)\[(-?\d+)\]/);
            if (arrMatch && variables[arrMatch[1]]) {
              const idx = parseInt(arrMatch[2]);
              const list = variables[arrMatch[1]];
              const actualIdx = idx < 0 ? list.length + idx : idx;
              outputLines.push(String(list[actualIdx]));
            }
          } else if (content.includes(':')) {
            const sliceMatch = content.match(/(\w+)\[(\d*):(\d*)\]/);
            if (sliceMatch && variables[sliceMatch[1]]) {
              const list = variables[sliceMatch[1]];
              const start = sliceMatch[2] ? parseInt(sliceMatch[2]) : 0;
              const end = sliceMatch[3] ? parseInt(sliceMatch[3]) : list.length;
              outputLines.push(JSON.stringify(list.slice(start, end)));
            }
          } else if (variables[content]) {
            outputLines.push(JSON.stringify(variables[content]));
          }
          continue;
        }

        const forMatch = line.match(/^for\s+(\w+)\s+in\s+range\(len\((\w+)\)\):$/);
        if (forMatch) {
          const loopVar = forMatch[1];
          const listVar = forMatch[2];
          const list = variables[listVar];
          
          const currentIndex = lines.indexOf(line);
          for (let i = 0; i < list.length; i++) {
            variables[loopVar] = i;
            
            if (currentIndex + 1 < lines.length) {
              const bodyLine = lines[currentIndex + 1].trim();
              const bodyPrintMatch = bodyLine.match(/^print\(f"(.+)"\)$/);
              if (bodyPrintMatch) {
                let text = bodyPrintMatch[1];
                text = text.replace(/\{(.+?)\}/g, (match, expr) => {
                  if (expr.includes('[')) {
                    const arrMatch = expr.match(/(\w+)\[(\w+)\]/);
                    if (arrMatch && variables[arrMatch[1]] && variables[arrMatch[2]] !== undefined) {
                      return variables[arrMatch[1]][variables[arrMatch[2]]];
                    }
                  }
                  if (expr.includes('+')) {
                    const parts = expr.split('+').map(p => p.trim());
                    let result = '';
                    for (let part of parts) {
                      if (variables[part] !== undefined) {
                        result += variables[part];
                      }
                    }
                    return result;
                  }
                  return variables[expr];
                });
                outputLines.push(text);
              }
            }
          }
        }
      }

      setOutput(outputLines);
      
      const expected = task.tests[0].expected;
      passed = JSON.stringify(outputLines) === JSON.stringify(expected);
      
      if (!passed) {
        setAttempts(attempts + 1);
      } else {
        setSolved(true);
        if (!solvedTasks.includes(activeTask)) {
          setSolvedTasks([...solvedTasks, activeTask]);
        }
      }
      
      setTestResults({ passed, expected, output: outputLines });

    } catch (error) {
      setOutput([`Ошибка: ${error.message}`]);
      setTestResults({ passed: false, error: error.message });
      setAttempts(attempts + 1);
    }
  };

  const resetTask = () => {
    setUserCode(tasks[activeTask].starterCode);
    setOutput([]);
    setTestResults(null);
  };

  const changeTask = (index) => {
    setActiveTask(index);
    setUserCode(tasks[index].starterCode);
    setOutput([]);
    setTestResults(null);
    setAttempts(0);
    setSolved(false);
  };

  const showSolution = () => {
    setUserCode(tasks[activeTask].solution);
    setOutput([]);
    setTestResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-purple-600">
            📚 Списки (list) в Python
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  activeSection === section.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {activeSection === 0 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔄 Быстрое повторение</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Что нужно знать перед изучением списков?</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-600">1. Переменные</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-sm mt-2">
                        name = "Вася"  <span className="text-gray-400"># переменная хранит значение</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-600">2. Типы данных</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-sm mt-2">
                        <div>number = 42       <span className="text-gray-400"># int - целое число</span></div>
                        <div>text = "Hello"    <span className="text-gray-400"># str - строка</span></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-600">3. Индексация (счёт с нуля)</strong>
                      <div className="text-gray-600 mt-2">
                        В программировании счёт начинается с 0, а не с 1!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">🧠 Задача на понимание</h3>
                  <p className="text-gray-700 mb-4">Если у нас есть 5 коробок, пронумерованных с 0, какой номер у последней коробки?</p>
                  
                  <div className="flex gap-4 mb-4">
                    <div className="bg-white p-3 rounded text-center font-bold">0</div>
                    <div className="bg-white p-3 rounded text-center font-bold">1</div>
                    <div className="bg-white p-3 rounded text-center font-bold">2</div>
                    <div className="bg-white p-3 rounded text-center font-bold">3</div>
                    <div className="bg-white p-3 rounded text-center font-bold bg-yellow-200">?</div>
                  </div>

                  <input
                    type="text"
                    value={algoAnswer}
                    onChange={(e) => setAlgoAnswer(e.target.value)}
                    placeholder="Введи номер последней коробки..."
                    className="border-2 border-yellow-300 rounded-lg px-4 py-2 w-full"
                  />
                  <button
                    onClick={checkAlgoAnswer}
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold mt-3"
                  >
                    Проверить
                  </button>
                  
                  {algoChecked && (
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      {algoAnswer === '4' ? (
                        <div>
                          <strong className="text-green-600">✓ Правильно!</strong>
                          <p className="text-gray-700 mt-2">
                            5 коробок: 0, 1, 2, 3, <strong>4</strong>. Последний номер = количество - 1!
                          </p>
                        </div>
                      ) : (
                        <div>
                          <strong className="text-red-600">✗ Не совсем</strong>
                          <p className="text-gray-700 mt-2">
                            Подсказка: Если начинаем с 0, то 5 коробок это 0, 1, 2, 3, ?
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">📚 Что такое список?</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Аналогия: Книжная полка 📚</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>Список</strong> в Python — это как полка с книгами:
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex justify-around mb-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📕</div>
                        <div className="text-sm text-gray-600">Позиция 0</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">📗</div>
                        <div className="text-sm text-gray-600">Позиция 1</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">📘</div>
                        <div className="text-sm text-gray-600">Позиция 2</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">📙</div>
                        <div className="text-sm text-gray-600">Позиция 3</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-gray-700">
                      <div>✅ <strong>Упорядоченный</strong> — каждая книга на своём месте</div>
                      <div>✅ <strong>Изменяемый</strong> — можно добавлять/убирать книги</div>
                      <div>✅ <strong>Индексированный</strong> — каждая позиция имеет номер (с 0!)</div>
                      <div>✅ <strong>Может хранить разное</strong> — книги, журналы, комиксы</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-4 border-purple-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">📋 Синтаксис создания списка:</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># ЧТО: Создаём список</div>
                    <div className="text-green-400"># ЗАЧЕМ: Хранить несколько значений в одной переменной</div>
                    <div className="text-green-400"># КАК: Используем квадратные скобки []</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Пустой список</span></div>
                    <div>empty = []</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Список чисел</span></div>
                    <div>numbers = [1, 2, 3, 4, 5]</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Список строк</span></div>
                    <div>fruits = [<span className="text-yellow-300">"яблоко"</span>, <span className="text-yellow-300">"банан"</span>, <span className="text-yellow-300">"апельсин"</span>]</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Список с разными типами</span></div>
                    <div>mixed = [<span className="text-yellow-300">"текст"</span>, 42, <span className="text-blue-300">True</span>, 3.14]</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">🎯 Диаграмма: Как хранится список в памяти</h3>
                  <div className="bg-white p-6 rounded-lg font-mono text-sm">
                    <div className="mb-4 text-gray-700">fruits = ["🍎", "🍌", "🍊"]</div>
                    <div className="flex gap-2">
                      <div className="flex-1 border-2 border-green-500 p-4 rounded text-center">
                        <div className="text-2xl mb-2">🍎</div>
                        <div className="text-xs text-gray-600">Индекс: 0</div>
                        <div className="text-xs text-gray-600">fruits[0]</div>
                      </div>
                      <div className="flex-1 border-2 border-green-500 p-4 rounded text-center">
                        <div className="text-2xl mb-2">🍌</div>
                        <div className="text-xs text-gray-600">Индекс: 1</div>
                        <div className="text-xs text-gray-600">fruits[1]</div>
                      </div>
                      <div className="flex-1 border-2 border-green-500 p-4 rounded text-center">
                        <div className="text-2xl mb-2">🍊</div>
                        <div className="text-xs text-gray-600">Индекс: 2</div>
                        <div className="text-xs text-gray-600">fruits[2]</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔢 Индексы и доступ к элементам</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Аналогия: Нумерация домов 🏠</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Представь улицу с домами. У каждого дома свой номер — это и есть <strong>индекс</strong>!
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex justify-around mb-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <div className="font-bold text-blue-600">Дом 0</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <div className="font-bold text-blue-600">Дом 1</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <div className="font-bold text-blue-600">Дом 2</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏠</div>
                        <div className="font-bold text-blue-600">Дом 3</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-center">
                      Чтобы найти дом, нужно знать его номер (индекс)!
                    </p>
                  </div>
                </div>

                <div className="bg-white border-4 border-blue-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">📋 Доступ к элементам:</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># ЧТО: Получаем элемент по индексу</div>
                    <div className="text-green-400"># ЗАЧЕМ: Чтобы работать с конкретным элементом</div>
                    <div className="text-green-400"># КАК: список[индекс]</div>
                    <div className="mt-2"></div>
                    <div>letters = [<span className="text-yellow-300">"A"</span>, <span className="text-yellow-300">"B"</span>, <span className="text-yellow-300">"C"</span>, <span className="text-yellow-300">"D"</span>]</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Положительные индексы (с начала)</span></div>
                    <div><span className="text-purple-300">print</span>(letters[0])  <span className="text-gray-400"># "A" - первый элемент</span></div>
                    <div><span className="text-purple-300">print</span>(letters[2])  <span className="text-gray-400"># "C" - третий элемент</span></div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Отрицательные индексы (с конца)</span></div>
                    <div><span className="text-purple-300">print</span>(letters[-1])  <span className="text-gray-400"># "D" - последний</span></div>
                    <div><span className="text-purple-300">print</span>(letters[-2])  <span className="text-gray-400"># "C" - предпоследний</span></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 Интерактивная демонстрация:</h3>
                  <p className="text-gray-700 mb-4">Смотри как работают разные индексы!</p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runIndexDemo}
                      disabled={indexDemo.running}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Play size={20} />
                      Запустить демонстрацию
                    </button>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32 max-h-64 overflow-y-auto">
                      {indexDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку для запуска</p>
                      ) : (
                        indexDemo.output.map((line, i) => (
                          <div key={i} className="mb-1 text-gray-700 font-mono text-sm">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">📊 Диаграмма индексов:</h3>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="mb-4 font-mono text-sm">list = ["A", "B", "C", "D", "E"]</div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Положительные индексы (→):</div>
                        <div className="flex gap-2">
                          {['A', 'B', 'C', 'D', 'E'].map((item, idx) => (
                            <div key={idx} className="flex-1 text-center">
                              <div className="bg-green-100 border-2 border-green-500 p-3 rounded font-bold">{item}</div>
                              <div className="text-xs text-gray-600 mt-1">индекс: {idx}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Отрицательные индексы (←):</div>
                        <div className="flex gap-2">
                          {['A', 'B', 'C', 'D', 'E'].map((item, idx) => (
                            <div key={idx} className="flex-1 text-center">
                              <div className="bg-red-100 border-2 border-red-500 p-3 rounded font-bold">{item}</div>
                              <div className="text-xs text-gray-600 mt-1">индекс: {idx - 5}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                  <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    Частая ошибка: IndexError
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Если попытаться получить элемент по несуществующему индексу — Python выдаст ошибку!
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                    <div className="mt-2"></div>
                    <div><span className="text-purple-300">print</span>(fruits[5])  <span className="text-red-400"># ❌ IndexError!</span></div>
                    <div className="text-red-400"># list index out of range</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Индексы: 0, 1, 2 (всего 3 элемента)</span></div>
                    <div><span className="text-gray-400"># Индекс 5 не существует!</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">➕ Методы списков</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Аналогия: Операции с книжной полкой 📚</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Со списком можно делать разные операции, как с полкой книг:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-3xl mb-2">➕</div>
                      <strong className="text-purple-600">append()</strong>
                      <div className="text-sm text-gray-600 mt-1">Поставить книгу в конец</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-3xl mb-2">🗑️</div>
                      <strong className="text-red-600">remove()</strong>
                      <div className="text-sm text-gray-600 mt-1">Убрать конкретную книгу</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-3xl mb-2">📌</div>
                      <strong className="text-blue-600">insert()</strong>
                      <div className="text-sm text-gray-600 mt-1">Вставить между другими</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-3xl mb-2">📏</div>
                      <strong className="text-green-600">len()</strong>
                      <div className="text-sm text-gray-600 mt-1">Посчитать количество</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-4 border-purple-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">📋 Основные методы:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <strong className="text-green-700">1. append() - добавить в конец</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Добавляем элемент в конец списка</div>
                        <div className="text-green-400"># ЗАЧЕМ: Расширить список новым элементом</div>
                        <div className="text-green-400"># КАК: список.append(элемент)</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>]</div>
                        <div>fruits.append(<span className="text-yellow-300">"🍊"</span>)  <span className="text-gray-400"># Добавили апельсин</span></div>
                        <div><span className="text-purple-300">print</span>(fruits)  <span className="text-gray-400"># ["🍎", "🍌", "🍊"]</span></div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <strong className="text-red-700">2. remove() - удалить элемент</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Удаляем первое вхождение элемента</div>
                        <div className="text-green-400"># ЗАЧЕМ: Убрать ненужный элемент</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div>fruits.remove(<span className="text-yellow-300">"🍌"</span>)  <span className="text-gray-400"># Удалили банан</span></div>
                        <div><span className="text-purple-300">print</span>(fruits)  <span className="text-gray-400"># ["🍎", "🍊"]</span></div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <strong className="text-blue-700">3. insert() - вставить на позицию</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Вставляем элемент на определённую позицию</div>
                        <div className="text-green-400"># КАК: список.insert(индекс, элемент)</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div>fruits.insert(1, <span className="text-yellow-300">"🍌"</span>)  <span className="text-gray-400"># Вставили на позицию 1</span></div>
                        <div><span className="text-purple-300">print</span>(fruits)  <span className="text-gray-400"># ["🍎", "🍌", "🍊"]</span></div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <strong className="text-yellow-700">4. len() - длина списка</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Получаем количество элементов</div>
                        <div className="text-green-400"># ЗАЧЕМ: Узнать размер списка</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div>count = <span className="text-purple-300">len</span>(fruits)  <span className="text-gray-400"># 3</span></div>
                        <div><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"У нас count фрукта"</span>)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">🎯 Интерактивная демонстрация append():</h3>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runAppendDemo}
                      disabled={appendDemo.running}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Plus size={20} />
                      Запустить добавление
                    </button>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Текущий список:</div>
                      <div className="flex gap-2">
                        {appendDemo.list.map((item, idx) => (
                          <div key={idx} className="bg-purple-100 border-2 border-purple-500 p-4 rounded-lg text-2xl">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-24">
                      {appendDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку чтобы увидеть как работает append</p>
                      ) : (
                        appendDemo.output.map((line, i) => (
                          <div key={i} className="mb-1 text-gray-700 font-mono text-sm">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-4 border-blue-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">💡 Другие полезные методы:</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <code className="font-bold">pop()</code> - удалить последний элемент и вернуть его
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <code className="font-bold">clear()</code> - очистить весь список
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <code className="font-bold">sort()</code> - отсортировать список
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <code className="font-bold">reverse()</code> - развернуть список задом наперёд
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <code className="font-bold">count(элемент)</code> - посчитать сколько раз встречается элемент
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">✂️ Срезы (slicing)</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-yellow-700 mb-4">Аналогия: Резка торта 🍰</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    <strong>Срез</strong> — это как отрезать кусок торта. Ты говоришь "с какого места по какое" и получаешь часть!
                  </p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex justify-center gap-1 mb-4">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <div key={num} className="w-12 h-12 bg-yellow-200 border-2 border-yellow-500 flex items-center justify-center font-bold rounded">
                          {num}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-gray-600">
                      Можем взять кусочек от 2 до 5: [2, 3, 4, 5]
                    </p>
                  </div>
                </div>

                <div className="bg-white border-4 border-yellow-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">📋 Синтаксис срезов:</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># ЧТО: Срез списка</div>
                    <div className="text-green-400"># ЗАЧЕМ: Получить часть списка</div>
                    <div className="text-green-400"># КАК: список[start:end:step]</div>
                    <div className="mt-2"></div>
                    <div>numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># От 2 до 5 (end не включается!)</span></div>
                    <div><span className="text-purple-300">print</span>(numbers[2:6])  <span className="text-gray-400"># [2, 3, 4, 5]</span></div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Первые 3 элемента</span></div>
                    <div><span className="text-purple-300">print</span>(numbers[:3])  <span className="text-gray-400"># [0, 1, 2]</span></div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># С 5 до конца</span></div>
                    <div><span className="text-purple-300">print</span>(numbers[5:])  <span className="text-gray-400"># [5, 6, 7, 8, 9]</span></div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Каждый второй элемент</span></div>
                    <div><span className="text-purple-300">print</span>(numbers[::2])  <span className="text-gray-400"># [0, 2, 4, 6, 8]</span></div>
                    <div className="mt-2"></div>
                    <div><span className="text-gray-400"># Развернуть список</span></div>
                    <div><span className="text-purple-300">print</span>(numbers[::-1])  <span className="text-gray-400"># [9, 8, 7, ..., 0]</span></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Интерактивная демонстрация срезов:</h3>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runSliceDemo}
                      disabled={sliceDemo.running}
                      className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Play size={20} />
                      Запустить демонстрацию
                    </button>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Список: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</div>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <div 
                            key={num} 
                            className={`w-10 h-10 flex items-center justify-center font-bold rounded border-2 ${
                              sliceDemo.highlighted.includes(num) 
                                ? 'bg-yellow-300 border-yellow-600' 
                                : 'bg-gray-100 border-gray-300'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32">
                      {sliceDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку чтобы увидеть разные срезы</p>
                      ) : (
                        sliceDemo.output.map((line, i) => (
                          <div key={i} className="mb-1 text-gray-700 font-mono text-sm">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">📊 Диаграмма: Как работают границы среза</h3>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="mb-4 text-center text-sm text-gray-600">
                      Важно: end НЕ ВКЛЮЧАЕТСЯ в срез!
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="font-mono mb-2">list[2:5]</div>
                        <div className="flex gap-1">
                          {['0', '1', '✅2', '✅3', '✅4', '❌5', '6', '7'].map((item, idx) => (
                            <div key={idx} className={`flex-1 p-2 text-center rounded ${item.includes('✅') ? 'bg-green-200' : item.includes('❌') ? 'bg-red-200' : 'bg-gray-100'}`}>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Результат: [2, 3, 4]</div>
                      </div>
                      
                      <div>
                        <div className="font-mono mb-2">list[:3]</div>
                        <div className="flex gap-1">
                          {['✅0', '✅1', '✅2', '❌3', '4', '5', '6', '7'].map((item, idx) => (
                            <div key={idx} className={`flex-1 p-2 text-center rounded ${item.includes('✅') ? 'bg-green-200' : item.includes('❌') ? 'bg-red-200' : 'bg-gray-100'}`}>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Результат: [0, 1, 2]</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">💡 Полезные трюки со срезами:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded">
                      <code className="font-bold">list[:]</code> — копия всего списка
                    </div>
                    <div className="bg-white p-4 rounded">
                      <code className="font-bold">list[::-1]</code> — развернуть список
                    </div>
                    <div className="bg-white p-4 rounded">
                      <code className="font-bold">list[::2]</code> — каждый второй элемент
                    </div>
                    <div className="bg-white p-4 rounded">
                      <code className="font-bold">list[-3:]</code> — последние 3 элемента
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔁 Перебор списков</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Аналогия: Проверка билетов 🎫</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Представь контролёра в поезде — он проходит по вагону и проверяет билет у <strong>каждого пассажира</strong>. 
                    Так же цикл <code>for</code> проходит по списку и работает с каждым элементом!
                  </p>
                </div>

                <div className="bg-white border-4 border-blue-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">📋 Способы перебора:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <strong className="text-green-700">1. Перебор элементов напрямую</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Проходим по каждому элементу</div>
                        <div className="text-green-400"># ЗАЧЕМ: Когда нам важен сам элемент, а не его позиция</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> fruit <span className="text-blue-300">in</span> fruits:</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Я люблю fruit"</span>)</div>
                        <div className="mt-2 text-gray-400"># Выведет:</div>
                        <div className="text-gray-400"># Я люблю 🍎</div>
                        <div className="text-gray-400"># Я люблю 🍌</div>
                        <div className="text-gray-400"># Я люблю 🍊</div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <strong className="text-yellow-700">2. Перебор с индексами (range + len)</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Проходим по индексам</div>
                        <div className="text-green-400"># ЗАЧЕМ: Когда нужна позиция элемента</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> i <span className="text-blue-300">in</span> <span className="text-purple-300">range</span>(<span className="text-purple-300">len</span>(fruits)):</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"i+1. fruits[i]"</span>)</div>
                        <div className="mt-2 text-gray-400"># Выведет:</div>
                        <div className="text-gray-400"># 1. 🍎</div>
                        <div className="text-gray-400"># 2. 🍌</div>
                        <div className="text-gray-400"># 3. 🍊</div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <strong className="text-purple-700">3. Перебор с enumerate (лучший способ!)</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div className="text-green-400"># ЧТО: Получаем и индекс, и элемент одновременно</div>
                        <div className="text-green-400"># ЗАЧЕМ: Самый удобный способ когда нужно и то, и то</div>
                        <div className="mt-2"></div>
                        <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>, <span className="text-yellow-300">"🍊"</span>]</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> index, fruit <span className="text-blue-300">in</span> <span className="text-purple-300">enumerate</span>(fruits):</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Позиция index: fruit"</span>)</div>
                        <div className="mt-2 text-gray-400"># Выведет:</div>
                        <div className="text-gray-400"># Позиция 0: 🍎</div>
                        <div className="text-gray-400"># Позиция 1: 🍌</div>
                        <div className="text-gray-400"># Позиция 2: 🍊</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">📊 Сравнение способов:</h3>
                  <div className="bg-white p-6 rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-green-500">
                          <th className="text-left p-2">Способ</th>
                          <th className="text-left p-2">Когда использовать</th>
                          <th className="text-left p-2">Плюсы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="p-2"><code>for item in list</code></td>
                          <td className="p-2">Нужен только элемент</td>
                          <td className="p-2">Самый простой</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="p-2"><code>for i in range(len())</code></td>
                          <td className="p-2">Нужен только индекс</td>
                          <td className="p-2">Полный контроль</td>
                        </tr>
                        <tr>
                          <td className="p-2"><code>for i, item in enumerate()</code></td>
                          <td className="p-2">Нужно и то, и то</td>
                          <td className="p-2">Удобнее всего!</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">💡 Практические примеры:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>Пример 1: Поиск элемента</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>names = [<span className="text-yellow-300">"Вася"</span>, <span className="text-yellow-300">"Петя"</span>, <span className="text-yellow-300">"Маша"</span>]</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> name <span className="text-blue-300">in</span> names:</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> name == <span className="text-yellow-300">"Петя"</span>:</div>
                        <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Нашли Петю!"</span>)</div>
                        <div className="ml-8"><span className="text-blue-300">break</span>  <span className="text-gray-400"># Выходим из цикла</span></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>Пример 2: Подсчёт чётных чисел</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>numbers = [1, 2, 3, 4, 5, 6, 7, 8]</div>
                        <div>count = 0</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> num <span className="text-blue-300">in</span> numbers:</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> num % 2 == 0:</div>
                        <div className="ml-8">count += 1</div>
                        <div className="mt-2"></div>
                        <div><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Чётных чисел: count"</span>)</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>Пример 3: Создание нового списка</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>numbers = [1, 2, 3, 4, 5]</div>
                        <div>doubled = []  <span className="text-gray-400"># Новый пустой список</span></div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> num <span className="text-blue-300">in</span> numbers:</div>
                        <div className="ml-4">doubled.append(num * 2)  <span className="text-gray-400"># Умножаем на 2</span></div>
                        <div className="mt-2"></div>
                        <div><span className="text-purple-300">print</span>(doubled)  <span className="text-gray-400"># [2, 4, 6, 8, 10]</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 6 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">⚡ Оптимизация и частые ошибки</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-400">
                  <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <AlertCircle size={28} />
                    Топ-5 ошибок со списками
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">1️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">IndexError - выход за границы</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ОШИБКА:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>]</div>
                                <div><span className="text-purple-300">print</span>(fruits[5])</div>
                                <div className="text-red-400"># IndexError!</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>fruits = [<span className="text-yellow-300">"🍎"</span>, <span className="text-yellow-300">"🍌"</span>]</div>
                                <div><span className="text-blue-300">if</span> 5 &lt; <span className="text-purple-300">len</span>(fruits):</div>
                                <div className="ml-4"><span className="text-purple-300">print</span>(fruits[5])</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">2️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Изменение списка во время перебора</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ОПАСНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>nums = [1, 2, 3, 4]</div>
                                <div><span className="text-blue-300">for</span> num <span className="text-blue-300">in</span> nums:</div>
                                <div className="ml-4">nums.remove(num)</div>
                                <div className="text-red-400"># Пропустит элементы!</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>nums = [1, 2, 3, 4]</div>
                                <div><span className="text-blue-300">for</span> num <span className="text-blue-300">in</span> nums[:]:</div>
                                <div className="ml-4">nums.remove(num)</div>
                                <div className="text-green-400"># Перебор копии</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">3️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Неправильное копирование списков</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ОШИБКА:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>list1 = [1, 2, 3]</div>
                                <div>list2 = list1  <span className="text-red-400"># Не копия!</span></div>
                                <div>list2.append(4)</div>
                                <div><span className="text-purple-300">print</span>(list1)</div>
                                <div className="text-red-400"># [1,2,3,4] Изменился!</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>list1 = [1, 2, 3]</div>
                                <div>list2 = list1[:]  <span className="text-green-400"># Копия</span></div>
                                <div>list2.append(4)</div>
                                <div><span className="text-purple-300">print</span>(list1)</div>
                                <div className="text-green-400"># [1,2,3] Не изменился</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">4️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Забыть что срез end не включается</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ДУМАЛ:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>nums = [0, 1, 2, 3, 4]</div>
                                <div><span className="text-purple-300">print</span>(nums[1:3])</div>
                                <div className="text-red-400"># Думал: [1,2,3]</div>
                                <div className="text-red-400"># На деле: [1,2]</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПОНЯЛ:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>nums = [0, 1, 2, 3, 4]</div>
                                <div><span className="text-purple-300">print</span>(nums[1:4])</div>
                                <div className="text-green-400"># Теперь: [1,2,3]</div>
                                <div className="text-green-400"># end+1!</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">5️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Использовать append вместо extend</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ НЕПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>list1 = [1, 2]</div>
                                <div>list2 = [3, 4]</div>
                                <div>list1.append(list2)</div>
                                <div><span className="text-purple-300">print</span>(list1)</div>
                                <div className="text-red-400"># [1, 2, [3, 4]]</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>list1 = [1, 2]</div>
                                <div>list2 = [3, 4]</div>
                                <div>list1.extend(list2)</div>
                                <div><span className="text-purple-300">print</span>(list1)</div>
                                <div className="text-green-400"># [1, 2, 3, 4]</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">⚡ Советы по оптимизации:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>1. Используй list comprehension для создания списков</strong>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Медленно:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div>doubled = []</div>
                            <div><span className="text-blue-300">for</span> i <span className="text-blue-300">in</span> <span className="text-purple-300">range</span>(100):</div>
                            <div className="ml-4">doubled.append(i*2)</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Быстро:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div>doubled = [i*2 <span className="text-blue-300">for</span> i</div>
                            <div className="ml-10"><span className="text-blue-300">in</span> <span className="text-purple-300">range</span>(100)]</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Используй in для проверки наличия</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div><span className="text-blue-300">if</span> <span className="text-yellow-300">"🍎"</span> <span className="text-blue-300">in</span> fruits:  <span className="text-green-400"># Быстро и понятно</span></div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Есть яблоко!"</span>)</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>3. Не создавай список если нужна сумма</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div className="text-green-400"># Вместо создания списка и sum():</div>
                        <div>total = <span className="text-purple-300">sum</span>(i <span className="text-blue-300">for</span> i <span className="text-blue-300">in</span> <span className="text-purple-300">range</span>(1000))  <span className="text-gray-400"># Генератор</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🔀 Когда использовать список vs другие структуры?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-600">Используй список:</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Нужен порядок элементов</li>
                        <li>• Доступ по индексу</li>
                        <li>• Могут быть дубликаты</li>
                        <li>• Изменяемая коллекция</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-green-600">НЕ используй список:</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Нужна уникальность → set</li>
                        <li>• Ключ-значение → dict</li>
                        <li>• Неизменяемый → tuple</li>
                        <li>• Частый поиск → set</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 7 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">📝 Сложные задания</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Задание 1: Фильтр списка ⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай программу, которая из списка чисел от 1 до 20 выберет только чётные и сохранит их в новый список.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Требования:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Используй цикл for</li>
                      <li>Проверка на чётность: число % 2 == 0</li>
                      <li>Метод append() для добавления</li>
                      <li>Выведи результат</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Задание 2: Обратный список ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай функцию, которая переворачивает список БЕЗ использования срезов [::-1] или метода reverse().
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Требования:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Используй два индекса (начало и конец)</li>
                      <li>Меняй элементы местами в цикле</li>
                      <li>Работай с исходным списком</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">Задание 3: Поиск дубликатов ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Найди все элементы, которые встречаются в списке больше одного раза.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Пример:</strong>
                    <div className="bg-gray-100 p-2 rounded font-mono text-sm mt-2">
                      Вход: [1, 2, 3, 2, 4, 1, 5]<br/>
                      Выход: [1, 2]
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Подсказка:</strong> Используй метод count() или создай словарь для подсчёта.
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">Задание 4: Объединение списков ⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Даны два отсортированных списка. Объедини их в один отсортированный список БЕЗ использования sort().
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Пример:</strong>
                    <div className="bg-gray-100 p-2 rounded font-mono text-sm mt-2">
                      list1 = [1, 3, 5, 7]<br/>
                      list2 = [2, 4, 6, 8]<br/>
                      Результат: [1, 2, 3, 4, 5, 6, 7, 8]
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Алгоритм:</strong> Два указателя, сравниваем элементы, добавляем меньший.
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Задание 5: Матрица (двумерный список) ⭐⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай программу для работы с матрицей 3×3 (список списков).
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Задачи:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Создать матрицу 3×3 заполненную нулями</li>
                      <li>Заполнить её числами от 1 до 9</li>
                      <li>Вывести красиво (построчно)</li>
                      <li>Найти сумму элементов по диагонали</li>
                    </ul>
                    <div className="bg-gray-100 p-2 rounded font-mono text-sm mt-3">
                      1 2 3<br/>
                      4 5 6<br/>
                      7 8 9<br/>
                      Диагональ: 1 + 5 + 9 = 15
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">
                    🎯 Критерии оценки решений
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">✓</div>
                      <strong>Корректность</strong>
                      <div className="text-sm text-gray-600 mt-2">Программа работает без ошибок</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">📖</div>
                      <strong>Читаемость</strong>
                      <div className="text-sm text-gray-600 mt-2">Код понятен и структурирован</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <strong>Эффективность</strong>
                      <div className="text-sm text-gray-600 mt-2">Оптимальное решение</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 8 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    📋 Выбери задачу
                  </h2>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <button
                        key={task.id}
                        onClick={() => changeTask(index)}
                        className={`w-full text-left p-4 rounded-lg transition ${
                          activeTask === index
                            ? 'bg-purple-100 border-2 border-purple-500'
                            : solvedTasks.includes(index)
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-800">{task.title}</span>
                          <span className="text-yellow-500">{task.difficulty}</span>
                        </div>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">
                    {tasks[activeTask].title}
                  </h3>
                  <p className="text-gray-700 mb-4">{tasks[activeTask].description}</p>
                  
                  {attempts < 5 ? (
                    <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center gap-3">
                      <Lock size={20} className="text-gray-500" />
                      <div>
                        <strong className="text-gray-700">Подсказки заблокированы</strong>
                        <p className="text-sm text-gray-600">Сделай 5 попыток чтобы открыть ({attempts}/5)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={20} className="text-yellow-600" />
                        <strong className="text-blue-700">Подсказки:</strong>
                      </div>
                      <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                        {tasks[activeTask].hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <strong className="text-green-700">Ожидаемый вывод:</strong>
                    <div className="mt-2 bg-white p-3 rounded font-mono text-sm text-gray-800">
                      {tasks[activeTask].tests[0].expected.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>

                  {attempts > 0 && (
                    <div className="mt-4 text-center text-gray-600">
                      Попыток: {attempts}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-600">💻 Редактор кода</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={resetTask}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                      >
                        <RotateCcw size={16} />
                        Сброс
                      </button>
                      {(solved || attempts >= 10) && (
                        <button
                          onClick={showSolution}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          Показать решение
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full h-64 p-4 bg-gray-900 text-white font-mono text-sm rounded-lg resize-none"
                    placeholder="# Пиши код здесь... (Tab для отступа)"
                    spellCheck={false}
                  />
                  
                  <button
                    onClick={runCode}
                    className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2"
                  >
                    <Play size={20} />
                    Запустить код
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">📤 Результат</h3>
                  
                  {testResults && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      testResults.passed
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {testResults.passed ? (
                          <>
                            <Check size={24} className="text-green-600" />
                            <span className="font-bold text-green-700 text-lg">Отлично! Задача решена!</span>
                          </>
                        ) : (
                          <>
                            <X size={24} className="text-red-600" />
                            <span className="font-bold text-red-700 text-lg">Не совсем правильно</span>
                          </>
                        )}
                      </div>
                      {testResults.error && (
                        <p className="text-red-600 text-sm">{testResults.error}</p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-bold text-gray-700 mb-2">Твой вывод:</div>
                      <div className="bg-gray-100 p-3 rounded font-mono text-sm min-h-32">
                        {output.length > 0 ? (
                          output.map((line, i) => (
                            <div key={i} className="text-gray-800">{line}</div>
                          ))
                        ) : (
                          <div className="text-gray-400">Пусто</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-bold text-gray-700 mb-2">Ожидается:</div>
                      <div className="bg-green-50 p-3 rounded font-mono text-sm min-h-32">
                        {tasks[activeTask].tests[0].expected.map((line, i) => (
                          <div key={i} className="text-gray-800">{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t-2">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 rounded-lg font-bold disabled:opacity-50"
            >
              <ChevronLeft size={20} />
              Назад
            </button>
            <button
              onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
              disabled={activeSection === sections.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold disabled:opacity-50"
            >
              Далее
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListsLesson;