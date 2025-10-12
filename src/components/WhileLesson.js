import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Zap, AlertCircle, Check, X, Lightbulb, Lock } from 'lucide-react';

const WhileLesson = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [algoAnswer, setAlgoAnswer] = useState('');
  const [algoChecked, setAlgoChecked] = useState(false);
  const [breakDemo, setBreakDemo] = useState({ running: false, output: [] });
  const [continueDemo, setContinueDemo] = useState({ running: false, output: [] });
  const [nestedDemo, setNestedDemo] = useState({ running: false, output: [] });
  
  // Практика
  const [activeTask, setActiveTask] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [solvedTasks, setSolvedTasks] = useState([]);
  
  const sections = [
    { id: 0, title: '🔄 Быстрое повторение' },
    { id: 1, title: '🛑 break - остановка цикла' },
    { id: 2, title: '⏭️ continue - пропуск итерации' },
    { id: 3, title: '🎯 Флаги и состояния' },
    { id: 4, title: '♾️ Бесконечные циклы' },
    { id: 5, title: '🔁 Вложенные циклы' },
    { id: 6, title: '⚡ Оптимизация и ошибки' },
    { id: 7, title: '📝 Сложные задания' },
    { id: 8, title: '💻 Практика с проверкой' }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Задача 1: Счётчик',
      difficulty: '⭐',
      description: 'Выведи числа от 1 до 5',
      starterCode: '# Твой код здесь\n',
      solution: 'counter = 1\nwhile counter <= 5:\n    print(counter)\n    counter += 1',
      tests: [{ input: null, expected: ['1', '2', '3', '4', '5'] }],
      hints: ['Начни переменную с 1', 'Условие: переменная <= 5', 'Не забудь увеличивать переменную += 1']
    },
    {
      id: 2,
      title: 'Задача 2: Обратный отсчёт',
      difficulty: '⭐⭐',
      description: 'Обратный отсчёт от 5 до 1, затем "Пуск!"',
      starterCode: '# Твой код здесь\n',
      solution: 'counter = 5\nwhile counter >= 1:\n    print(counter)\n    counter -= 1\nprint("Пуск!")',
      tests: [{ input: null, expected: ['5', '4', '3', '2', '1', 'Пуск!'] }],
      hints: ['Начни переменную с 5', 'Используй -= 1 для уменьшения', 'После цикла выведи "Пуск!"']
    },
    {
      id: 3,
      title: 'Задача 3: Пропуск чётных',
      difficulty: '⭐⭐',
      description: 'Выведи только нечётные от 1 до 8',
      starterCode: '# Твой код здесь\n',
      solution: 'num = 0\nwhile num < 8:\n    num += 1\n    if num % 2 == 0:\n        continue\n    print(num)',
      tests: [{ input: null, expected: ['1', '3', '5', '7'] }],
      hints: ['Увеличивай переменную ПЕРЕД continue!', 'Проверь if переменная % 2 == 0: continue', 'Условие цикла: переменная < 8']
    },
    {
      id: 4,
      title: 'Задача 4: Поиск с break',
      difficulty: '⭐⭐⭐',
      description: 'Найди число 7, выведи все до него включительно и "Нашли!"',
      starterCode: '# Твой код здесь\n',
      solution: 'num = 1\nwhile num <= 10:\n    print(num)\n    if num == 7:\n        print("Нашли!")\n        break\n    num += 1',
      tests: [{ input: null, expected: ['1', '2', '3', '4', '5', '6', '7', 'Нашли!'] }],
      hints: ['Выведи число сначала, потом проверяй', 'Если число == 7, выведи "Нашли!" и break', 'Не забудь увеличить переменную в конце']
    },
    {
      id: 5,
      title: 'Задача 5: Сумма чисел',
      difficulty: '⭐⭐⭐',
      description: 'Посчитай сумму чисел от 1 до 10',
      starterCode: '# Твой код здесь\n',
      solution: 'counter = 1\ntotal = 0\nwhile counter <= 10:\n    total += counter\n    counter += 1\nprint(total)',
      tests: [{ input: null, expected: ['55'] }],
      hints: ['Нужны 2 переменных: для счёта и для суммы', 'В цикле добавляй счётчик к сумме', 'print(сумма) только ПОСЛЕ цикла']
    }
  ];

  const checkAlgoAnswer = () => {
    setAlgoChecked(true);
  };

  const runBreakDemo = () => {
    if (breakDemo.running) return;
    setBreakDemo({ running: true, output: [] });
    
    let output = [];
    let i = 1;
    const interval = setInterval(() => {
      if (i <= 10) {
        output.push(`Число: ${i}`);
        if (i === 5) {
          output.push('⛔ Нашли 5! Выходим из цикла (break)');
          setBreakDemo({ running: false, output: [...output] });
          clearInterval(interval);
        } else {
          setBreakDemo({ running: true, output: [...output] });
          i++;
        }
      }
    }, 800);
  };

  const runContinueDemo = () => {
    if (continueDemo.running) return;
    setContinueDemo({ running: true, output: [] });
    
    let output = [];
    let i = 0;
    const interval = setInterval(() => {
      if (i < 8) {
        i++;
        if (i % 2 === 0) {
          output.push(`${i} - чётное, пропускаем (continue)`);
        } else {
          output.push(`${i} - нечётное, обрабатываем ✓`);
        }
        setContinueDemo({ running: true, output: [...output] });
      } else {
        setContinueDemo({ running: false, output: [...output] });
        clearInterval(interval);
      }
    }, 700);
  };

  const runNestedDemo = () => {
    if (nestedDemo.running) return;
    setNestedDemo({ running: true, output: [] });
    
    let output = [];
    let row = 1;
    let col = 1;
    
    const interval = setInterval(() => {
      if (row <= 3) {
        if (col <= 3) {
          output.push(`Строка ${row}, Столбец ${col}: ⭐`);
          setNestedDemo({ running: true, output: [...output] });
          col++;
        } else {
          col = 1;
          row++;
        }
      } else {
        setNestedDemo({ running: false, output: [...output] });
        clearInterval(interval);
      }
    }, 600);
  };

  // Практика
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
    const codeLines = userCode.split('\n');
    const outputLines = [];
    let passed = false;

    try {
      const variables = {};
      let lineIndex = 0;

      while (lineIndex < codeLines.length) {
        let line = codeLines[lineIndex].trim();
        
        if (!line || line.startsWith('#')) {
          lineIndex++;
          continue;
        }

        const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          const value = assignMatch[2].trim();
          
          if (value.match(/^\d+$/)) {
            variables[varName] = parseInt(value);
          } else if (value.includes('+') || value.includes('-') || value.includes('*') || value.includes('/')) {
            const parts = value.split(/([+\-*/])/);
            let result = variables[parts[0].trim()] || parseInt(parts[0].trim()) || 0;
            for (let i = 1; i < parts.length; i += 2) {
              const op = parts[i];
              const nextVal = variables[parts[i+1].trim()] || parseInt(parts[i+1].trim()) || 0;
              if (op === '+') result += nextVal;
              if (op === '-') result -= nextVal;
              if (op === '*') result *= nextVal;
              if (op === '/') result = Math.floor(result / nextVal);
            }
            variables[varName] = result;
          } else if (value.startsWith('"') || value.startsWith("'")) {
            variables[varName] = value.replace(/['"]/g, '');
          }
          lineIndex++;
          continue;
        }

        const printMatch = line.match(/^print\((.+)\)$/);
        if (printMatch) {
          const content = printMatch[1].trim();
          if (content.startsWith('"') || content.startsWith("'")) {
            outputLines.push(content.replace(/['"]/g, ''));
          } else if (variables[content] !== undefined) {
            outputLines.push(String(variables[content]));
          }
          lineIndex++;
          continue;
        }

        const whileMatch = line.match(/^while\s+(.+):$/);
        if (whileMatch) {
          const condition = whileMatch[1];
          let whileBody = [];
          lineIndex++;
          
          while (lineIndex < codeLines.length && (codeLines[lineIndex].startsWith('    ') || codeLines[lineIndex].trim() === '')) {
            if (codeLines[lineIndex].trim()) {
              whileBody.push(codeLines[lineIndex].replace(/^    /, ''));
            }
            lineIndex++;
          }

          let iterations = 0;
          while (iterations < 100 && evaluateCondition(condition, variables)) {
            let bodyIndex = 0;
            let shouldBreak = false;

            while (bodyIndex < whileBody.length && !shouldBreak) {
              let bodyLine = whileBody[bodyIndex].trim();
              
              if (bodyLine === 'continue') {
                break;
              }
              if (bodyLine === 'break') {
                shouldBreak = true;
                break;
              }

              const bodyAssign = bodyLine.match(/^(\w+)\s*([+\-*/]?)=\s*(.+)$/);
              if (bodyAssign) {
                const varName = bodyAssign[1];
                const op = bodyAssign[2];
                const value = bodyAssign[3].trim();
                
                if (op === '+') {
                  variables[varName] = (variables[varName] || 0) + (variables[value] || parseInt(value) || 0);
                } else if (op === '-') {
                  variables[varName] = (variables[varName] || 0) - (variables[value] || parseInt(value) || 0);
                } else {
                  variables[varName] = variables[value] || parseInt(value) || 0;
                }
              }

              const bodyPrint = bodyLine.match(/^print\((.+)\)$/);
              if (bodyPrint) {
                const content = bodyPrint[1].trim();
                if (content.startsWith('"') || content.startsWith("'")) {
                  outputLines.push(content.replace(/['"]/g, ''));
                } else if (variables[content] !== undefined) {
                  outputLines.push(String(variables[content]));
                }
              }

              const ifMatch = bodyLine.match(/^if\s+(.+):$/);
              if (ifMatch) {
                const ifCondition = ifMatch[1];
                bodyIndex++;
                if (evaluateCondition(ifCondition, variables)) {
                  while (bodyIndex < whileBody.length && whileBody[bodyIndex].startsWith('    ')) {
                    const ifLine = whileBody[bodyIndex].trim();
                    if (ifLine === 'break') {
                      shouldBreak = true;
                      break;
                    }
                    if (ifLine === 'continue') {
                      break;
                    }
                    const ifPrint = ifLine.match(/^print\((.+)\)$/);
                    if (ifPrint) {
                      const content = ifPrint[1].trim();
                      if (content.startsWith('"') || content.startsWith("'")) {
                        outputLines.push(content.replace(/['"]/g, ''));
                      }
                    }
                    bodyIndex++;
                  }
                } else {
                  while (bodyIndex < whileBody.length && whileBody[bodyIndex].startsWith('    ')) {
                    bodyIndex++;
                  }
                }
                continue;
              }

              bodyIndex++;
            }

            if (shouldBreak) break;
            iterations++;
          }
          continue;
        }

        lineIndex++;
      }

      setOutput(outputLines);
      
      const expected = task.tests[0].expected;
      passed = JSON.stringify(outputLines) === JSON.stringify(expected);
      
      if (!passed) {
        setAttempts(attempts + 1);
      } else {
        setSolved(true);
      }
      if (!solvedTasks.includes(activeTask)) {
          setSolvedTasks([...solvedTasks, activeTask]);
      }
      
      setTestResults({ passed, expected, output: outputLines });

    } catch (error) {
      setOutput([`Ошибка: ${error.message}`]);
      setTestResults({ passed: false, error: error.message });
      setAttempts(attempts + 1);
    }
  };

  const evaluateCondition = (condition, variables) => {
    const match = condition.match(/(\w+)\s*([<>=!]+)\s*(\w+|\d+)/);
    if (!match) return false;
    
    const left = variables[match[1]] !== undefined ? variables[match[1]] : parseInt(match[1]);
    const operator = match[2];
    const right = variables[match[3]] !== undefined ? variables[match[3]] : parseInt(match[3]);
    
    switch(operator) {
      case '<': return left < right;
      case '>': return left > right;
      case '<=': return left <= right;
      case '>=': return left >= right;
      case '==': return left === right;
      case '!=': return left !== right;
      default: return false;
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
            🔄 Цикл WHILE - Углублённое изучение
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
          
          {/* Секция 0: Повторение */}
          {activeSection === 0 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔄 Быстрое повторение</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Что такое while?</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <strong>while</strong> - это цикл, который повторяет код <strong>ПОКА</strong> условие истинно (True).
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                    <div className="text-green-400"># Базовая структура</div>
                    <div><span className="text-blue-300">while</span> condition:</div>
                    <div className="ml-4 text-gray-300"># код выполняется пока condition = True</div>
                    <div className="ml-4">do_something()</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Основные элементы:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-600">1. Инициализация</strong> - устанавливаем начальное значение
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-sm mt-2">
                        counter = 1  <span className="text-gray-400"># начало</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-600">2. Условие</strong> - проверка перед каждой итерацией
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-sm mt-2">
                        <span className="text-blue-300">while</span> counter {'<='} 10:  <span className="text-gray-400"># условие</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-600">3. Изменение</strong> - инкремент/декремент (иначе бесконечный цикл!)
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-sm mt-2">
                        counter += 1  <span className="text-gray-400"># изменяем</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">🧠 Задача на понимание алгоритма</h3>
                  <p className="text-gray-700 mb-4">Посмотри на код и ответь: <strong>что выведется на экран?</strong></p>
                  
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mb-4">
                    <div>number = 10</div>
                    <div>total = 0</div>
                    <div className="mt-2"><span className="text-blue-300">while</span> number {'>'} 0:</div>
                    <div className="ml-4">total = total + number</div>
                    <div className="ml-4">number = number - 2</div>
                    <div className="mt-2"><span className="text-purple-300">print</span>(total)</div>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={algoAnswer}
                      onChange={(e) => setAlgoAnswer(e.target.value)}
                      placeholder="Твой ответ..."
                      className="border-2 border-yellow-300 rounded-lg px-4 py-2 w-full"
                    />
                    <button
                      onClick={checkAlgoAnswer}
                      className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Проверить
                    </button>
                    
                    {algoChecked && (
                      <div className="mt-4 p-4 bg-white rounded-lg">
                        <strong className="text-green-600">✓ Правильный ответ: 30</strong>
                        <div className="mt-3 text-gray-700">
                          <strong>Разбор алгоритма:</strong>
                          <div className="mt-2 space-y-1 text-sm">
                            <div>• Итерация 1: number=10, total=0+10=10, number=10-2=8</div>
                            <div>• Итерация 2: number=8, total=10+8=18, number=8-2=6</div>
                            <div>• Итерация 3: number=6, total=18+6=24, number=6-2=4</div>
                            <div>• Итерация 4: number=4, total=24+4=28, number=4-2=2</div>
                            <div>• Итерация 5: number=2, total=28+2=30, number=2-2=0</div>
                            <div>• number=0, условие number {'>'} 0 = False → выход</div>
                            <div className="mt-2 font-bold text-purple-600">Итого: 10+8+6+4+2 = 30</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 1: break */}
          {activeSection === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🛑 Оператор break</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-red-700 mb-4">Что такое break?</h3>
                  <p className="text-lg text-gray-700">
                    <strong>break</strong> - немедленно останавливает цикл и выходит из него, даже если условие ещё True.
                  </p>
                  <div className="bg-white p-4 rounded-lg mt-4">
                    <p className="text-gray-600">💡 Используй когда нашёл то, что искал, и дальнейшие проверки не нужны.</p>
                  </div>
                </div>

                <div className="bg-white border-4 border-red-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-4">📋 Синтаксис:</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div><span className="text-blue-300">while</span> condition:</div>
                    <div className="ml-4"><span className="text-blue-300">if</span> special_condition:</div>
                    <div className="ml-8 text-red-400">break  <span className="text-gray-400"># выход из цикла</span></div>
                    <div className="ml-4">do_something()</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Интерактивная демонстрация:</h3>
                  <p className="text-gray-700 mb-4">Ищем число 5 среди чисел от 1 до 10. Как только находим - сразу выходим!</p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runBreakDemo}
                      disabled={breakDemo.running}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Play size={20} />
                      Запустить поиск
                    </button>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32 max-h-64 overflow-y-auto">
                      {breakDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку для запуска</p>
                      ) : (
                        breakDemo.output.map((line, i) => (
                          <div key={i} className={`mb-1 ${line.includes('break') ? 'font-bold text-red-600' : 'text-gray-700'}`}>
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                    <div>i = 1</div>
                    <div><span className="text-blue-300">while</span> i {'<='} 10:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Число: {'{i}'}"</span>)</div>
                    <div className="ml-4"><span className="text-blue-300">if</span> i == 5:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Нашли 5! Выходим"</span>)</div>
                    <div className="ml-8 text-red-400">break  <span className="text-gray-400"># цикл останавливается</span></div>
                    <div className="ml-4">i += 1</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">💡 Практические примеры использования:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>1. Поиск в списке</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>found = <span className="text-blue-300">False</span></div>
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(names):</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> names[i] == <span className="text-yellow-300">"Alice"</span>:</div>
                        <div className="ml-8">found = <span className="text-blue-300">True</span></div>
                        <div className="ml-8 text-red-400">break</div>
                        <div className="ml-4">i += 1</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Валидация ввода с выходом</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div><span className="text-blue-300">while</span> <span className="text-blue-300">True</span>:</div>
                        <div className="ml-4">password = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"Password: "</span>)</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> password == <span className="text-yellow-300">"exit"</span>:</div>
                        <div className="ml-8 text-red-400">break  <span className="text-gray-400"># выход по команде</span></div>
                        <div className="ml-4"><span className="text-blue-300">if</span> <span className="text-purple-300">len</span>(password) {'>'} 8:</div>
                        <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Good!"</span>)</div>
                        <div className="ml-8 text-red-400">break</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 2: continue */}
          {activeSection === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">⏭️ Оператор continue</h2>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-yellow-700 mb-4">Что такое continue?</h3>
                  <p className="text-lg text-gray-700">
                    <strong>continue</strong> - пропускает остаток текущей итерации и переходит к следующей проверке условия.
                  </p>
                  <div className="bg-white p-4 rounded-lg mt-4">
                    <p className="text-gray-600">💡 Используй когда нужно пропустить определённые элементы, но продолжить цикл.</p>
                  </div>
                </div>

                <div className="bg-white border-4 border-yellow-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">🔄 Разница break vs continue:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-2xl mb-2 text-red-600">🛑</div>
                      <strong className="text-red-700">break</strong>
                      <div className="text-sm text-gray-600 mt-2">Полностью выходит из цикла</div>
                      <div className="text-sm text-gray-600">Цикл завершается</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl mb-2 text-yellow-600">⏭️</div>
                      <strong className="text-yellow-700">continue</strong>
                      <div className="text-sm text-gray-600 mt-2">Пропускает текущую итерацию</div>
                      <div className="text-sm text-gray-600">Цикл продолжается</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Интерактивная демонстрация:</h3>
                  <p className="text-gray-700 mb-4">Обрабатываем только нечётные числа от 1 до 8, чётные пропускаем.</p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runContinueDemo}
                      disabled={continueDemo.running}
                      className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Play size={20} />
                      Запустить фильтрацию
                    </button>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32 max-h-64 overflow-y-auto">
                      {continueDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку для запуска</p>
                      ) : (
                        continueDemo.output.map((line, i) => (
                          <div key={i} className={`mb-1 ${line.includes('continue') ? 'text-yellow-600' : line.includes('✓') ? 'font-bold text-green-600' : 'text-gray-700'}`}>
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                    <div>i = 0</div>
                    <div><span className="text-blue-300">while</span> i {'<'} 8:</div>
                    <div className="ml-4">i += 1</div>
                    <div className="ml-4"><span className="text-blue-300">if</span> i % 2 == 0:  <span className="text-gray-400"># если чётное</span></div>
                    <div className="ml-8 text-yellow-400">continue  <span className="text-gray-400"># пропускаем</span></div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"{'{i}'} - нечётное"</span>)</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">💡 Практические примеры:</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>1. Фильтрация данных</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(students):</div>
                        <div className="ml-4">student = students[i]</div>
                        <div className="ml-4">i += 1</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> student.grade {'<'} 50:</div>
                        <div className="ml-8 text-yellow-400">continue  <span className="text-gray-400"># пропускаем неуспевающих</span></div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(student.name)</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Пропуск ошибочных данных</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(numbers):</div>
                        <div className="ml-4">num = numbers[i]</div>
                        <div className="ml-4">i += 1</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> num == 0:</div>
                        <div className="ml-8 text-yellow-400">continue  <span className="text-gray-400"># деление на 0</span></div>
                        <div className="ml-4">result = 100 / num</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                  <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    ВАЖНО: позиция инкремента!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    При использовании <code className="bg-red-200 px-2 py-1 rounded">continue</code> следи, чтобы инкремент был <strong>ПЕРЕД</strong> continue, иначе получишь бесконечный цикл!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-red-600 font-bold mb-2">❌ НЕПРАВИЛЬНО:</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> i % 2 == 0:</div>
                        <div className="ml-8 text-yellow-400">continue</div>
                        <div className="ml-4 text-red-400">i += 1  # не выполнится!</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-green-600 font-bold mb-2">✓ ПРАВИЛЬНО:</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                        <div className="ml-4 text-green-400">i += 1  # сначала!</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> i % 2 == 0:</div>
                        <div className="ml-8 text-yellow-400">continue</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 3: Флаги */}
          {activeSection === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🎯 Флаги и состояния</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Что такое флаг?</h3>
                  <p className="text-lg text-gray-700 mb-3">
                    <strong>Флаг</strong> - это переменная типа bool (True/False), которая хранит состояние и управляет циклом.
                  </p>
                  <p className="text-gray-600">
                    Флаги делают код понятнее и позволяют управлять циклом на основе событий, а не только счётчиков.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">📋 Базовый пример с флагом:</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># Поиск с флагом</div>
                    <div>found = <span className="text-blue-300">False</span>  <span className="text-gray-400"># флаг</span></div>
                    <div>i = 0</div>
                    <div className="mt-2"><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(items) <span className="text-blue-300">and not</span> found:</div>
                    <div className="ml-4"><span className="text-blue-300">if</span> items[i] == target:</div>
                    <div className="ml-8">found = <span className="text-blue-300">True</span>  <span className="text-gray-400"># меняем флаг</span></div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Нашли на позиции {'{i}'}"</span>)</div>
                    <div className="ml-4">i += 1</div>
                    <div className="mt-2"><span className="text-blue-300">if not</span> found:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Не найдено"</span>)</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">🎮 Пример: игровой цикл</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># Игра с несколькими условиями выхода</div>
                    <div>game_running = <span className="text-blue-300">True</span></div>
                    <div>player_hp = 100</div>
                    <div>level = 1</div>
                    <div className="mt-2"><span className="text-blue-300">while</span> game_running:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Level {'{level}'}, HP: {'{player_hp}'}"</span>)</div>
                    <div className="ml-4">action = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"Что делаем? "</span>)</div>
                    <div className="ml-4 mt-2"><span className="text-blue-300">if</span> action == <span className="text-yellow-300">"quit"</span>:</div>
                    <div className="ml-8">game_running = <span className="text-blue-300">False</span>  <span className="text-gray-400"># выход</span></div>
                    <div className="ml-4"><span className="text-blue-300">elif</span> action == <span className="text-yellow-300">"fight"</span>:</div>
                    <div className="ml-8">player_hp -= 20</div>
                    <div className="ml-8"><span className="text-blue-300">if</span> player_hp {'<='} 0:</div>
                    <div className="ml-12"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Game Over!"</span>)</div>
                    <div className="ml-12">game_running = <span className="text-blue-300">False</span></div>
                    <div className="ml-4"><span className="text-blue-300">elif</span> action == <span className="text-yellow-300">"heal"</span>:</div>
                    <div className="ml-8">player_hp = 100</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">🔄 Множественные флаги:</h3>
                  <p className="text-gray-700 mb-4">Можно использовать несколько флагов одновременно для сложной логики:</p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># Система с несколькими условиями</div>
                    <div>authenticated = <span className="text-blue-300">False</span></div>
                    <div>verified = <span className="text-blue-300">False</span></div>
                    <div>attempts = 0</div>
                    <div>max_attempts = 3</div>
                    <div className="mt-2"><span className="text-blue-300">while not</span> authenticated <span className="text-blue-300">and</span> attempts {'<'} max_attempts:</div>
                    <div className="ml-4">password = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"Пароль: "</span>)</div>
                    <div className="ml-4 mt-2"><span className="text-blue-300">if</span> password == <span className="text-yellow-300">"secret"</span>:</div>
                    <div className="ml-8">authenticated = <span className="text-blue-300">True</span></div>
                    <div className="ml-8">code = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"2FA код: "</span>)</div>
                    <div className="ml-8"><span className="text-blue-300">if</span> code == <span className="text-yellow-300">"1234"</span>:</div>
                    <div className="ml-12">verified = <span className="text-blue-300">True</span></div>
                    <div className="ml-4"><span className="text-blue-300">else</span>:</div>
                    <div className="ml-8">attempts += 1</div>
                    <div className="mt-2"><span className="text-blue-300">if</span> authenticated <span className="text-blue-300">and</span> verified:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Доступ разрешён!"</span>)</div>
                    <div><span className="text-blue-300">else</span>:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Доступ запрещён"</span>)</div>
                  </div>
                </div>

                <div className="bg-white border-4 border-purple-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">💡 Когда использовать флаги?</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <strong>✓ Управление состоянием программы</strong>
                      <div className="text-sm text-gray-600 mt-1">Игра идёт / меню открыто / загрузка завершена</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <strong>✓ Поиск элементов</strong>
                      <div className="text-sm text-gray-600 mt-1">Нашли / не нашли нужный элемент</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <strong>✓ Валидация данных</strong>
                      <div className="text-sm text-gray-600 mt-1">Данные корректны / есть ошибки</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <strong>✓ Множественные условия выхода</strong>
                      <div className="text-sm text-gray-600 mt-1">Таймаут / успех / отмена пользователем</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 4: Бесконечные циклы */}
          {activeSection === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">♾️ Бесконечные циклы</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Что такое бесконечный цикл?</h3>
                  <p className="text-lg text-gray-700 mb-3">
                    Цикл, условие которого <strong>всегда True</strong>. Он работает пока не встретит <code className="bg-blue-200 px-2 py-1 rounded">break</code>.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                      <div><span className="text-blue-300">while</span> <span className="text-blue-300">True</span>:  <span className="text-gray-400"># условие всегда истинно</span></div>
                      <div className="ml-4"><span className="text-gray-400"># код повторяется вечно</span></div>
                      <div className="ml-4"><span className="text-blue-300">if</span> exit_condition:</div>
                      <div className="ml-8 text-red-400">break  <span className="text-gray-400"># единственный выход</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-400">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                    <Zap size={24} />
                    Когда это полезно?
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>1. Когда условие выхода внутри цикла</strong>
                      <div className="text-sm text-gray-600 mt-2">Проще написать логику выхода в одном месте</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Серверы и программы реального времени</strong>
                      <div className="text-sm text-gray-600 mt-2">Программа должна работать постоянно до остановки</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong>3. Меню и интерфейсы</strong>
                      <div className="text-sm text-gray-600 mt-2">Показываем меню пока пользователь не выберет "выход"</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">📋 Пример: Меню программы</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># Главное меню с бесконечным циклом</div>
                    <div><span className="text-blue-300">while</span> <span className="text-blue-300">True</span>:</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"\n=== МЕНЮ ==="</span>)</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"1. Новая игра"</span>)</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"2. Загрузить"</span>)</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"3. Настройки"</span>)</div>
                    <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"4. Выход"</span>)</div>
                    <div className="ml-4 mt-2">choice = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"Выбор: "</span>)</div>
                    <div className="ml-4 mt-2"><span className="text-blue-300">if</span> choice == <span className="text-yellow-300">"1"</span>:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Запуск новой игры..."</span>)</div>
                    <div className="ml-4"><span className="text-blue-300">elif</span> choice == <span className="text-yellow-300">"2"</span>:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Загрузка сохранения..."</span>)</div>
                    <div className="ml-4"><span className="text-blue-300">elif</span> choice == <span className="text-yellow-300">"3"</span>:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Настройки..."</span>)</div>
                    <div className="ml-4"><span className="text-blue-300">elif</span> choice == <span className="text-yellow-300">"4"</span>:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"До свидания!"</span>)</div>
                    <div className="ml-8 text-red-400">break  <span className="text-gray-400"># выход из программы</span></div>
                    <div className="ml-4"><span className="text-blue-300">else</span>:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Неверный выбор!"</span>)</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 Пример: Валидация с несколькими попытками</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-400"># Ввод числа в диапазоне</div>
                    <div><span className="text-blue-300">while</span> <span className="text-blue-300">True</span>:</div>
                    <div className="ml-4">num = <span className="text-purple-300">input</span>(<span className="text-yellow-300">"Введи число от 1 до 10: "</span>)</div>
                    <div className="ml-4 mt-2"><span className="text-blue-300">if not</span> num.isdigit():</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Это не число!"</span>)</div>
                    <div className="ml-8 text-yellow-400">continue  <span className="text-gray-400"># новая попытка</span></div>
                    <div className="ml-4 mt-2">num = <span className="text-purple-300">int</span>(num)</div>
                    <div className="ml-4"><span className="text-blue-300">if</span> num {'<'} 1 <span className="text-blue-300">or</span> num {'>'} 10:</div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">"Число вне диапазона!"</span>)</div>
                    <div className="ml-8 text-yellow-400">continue</div>
                    <div className="ml-4 mt-2"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Отлично! Ты выбрал {'{num}'}"</span>)</div>
                    <div className="ml-4 text-red-400">break  <span className="text-gray-400"># корректный ввод</span></div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                  <h3 className="text-xl font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    ОПАСНОСТЬ: случайные бесконечные циклы!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Бесконечный цикл <code className="bg-red-200 px-2 py-1 rounded">while True</code> с <code className="bg-red-200 px-2 py-1 rounded">break</code> - это хорошо.<br/>
                    Но если забыть изменить условие или инкремент - программа зависнет!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-green-600 font-bold mb-2">✓ СПЕЦИАЛЬНО (ОК):</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div><span className="text-blue-300">while</span> <span className="text-blue-300">True</span>:</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> condition:</div>
                        <div className="ml-8 text-red-400">break</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-red-600 font-bold mb-2">❌ СЛУЧАЙНО (БАГ):</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(i)</div>
                        <div className="ml-4 text-red-400"># забыли i += 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 5: Вложенные циклы */}
          {activeSection === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔁 Вложенные циклы while</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Что это?</h3>
                  <p className="text-lg text-gray-700">
                    <strong>Вложенный цикл</strong> - это цикл внутри другого цикла. Внутренний цикл полностью выполняется на каждой итерации внешнего.
                  </p>
                </div>

                <div className="bg-white border-4 border-purple-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">🔄 Как это работает:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div className="flex-1">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <strong>Внешний цикл</strong> делает 1 итерацию
                        </div>
                      </div>
                    </div>
                    <div className="ml-16 border-l-4 border-purple-300 pl-4">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">2a</div>
                        <div className="flex-1 bg-blue-100 p-3 rounded-lg">
                          <strong>Внутренний цикл</strong> выполняется полностью (все итерации)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div className="flex-1">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <strong>Внешний цикл</strong> делает 2 итерацию → внутренний снова выполняется полностью
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Интерактивная демонстрация:</h3>
                  <p className="text-gray-700 mb-4">Таблица 3×3 - внешний цикл по строкам, внутренний по столбцам:</p>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <button
                      onClick={runNestedDemo}
                      disabled={nestedDemo.running}
                      className="bg-purple-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 disabled:bg-gray-300 mb-4"
                    >
                      <Play size={20} />
                      Запустить вложенные циклы
                    </button>
                    
                    <div className="bg-gray-50 p-4 rounded-lg min-h-32 max-h-64 overflow-y-auto">
                      {nestedDemo.output.length === 0 ? (
                        <p className="text-gray-400 text-center">Нажми кнопку для запуска</p>
                      ) : (
                        nestedDemo.output.map((line, i) => (
                          <div key={i} className="mb-1 text-gray-700 font-mono text-sm">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm mt-4">
                    <div className="text-green-400"># Вложенные циклы - таблица</div>
                    <div>row = 1</div>
                    <div><span className="text-blue-300">while</span> row {'<='} 3:  <span className="text-gray-400"># внешний цикл</span></div>
                    <div className="ml-4">col = 1</div>
                    <div className="ml-4"><span className="text-blue-300">while</span> col {'<='} 3:  <span className="text-gray-400"># внутренний</span></div>
                    <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"Строка {'{row}'}, Столбец {'{col}'}"</span>)</div>
                    <div className="ml-8">col += 1</div>
                    <div className="ml-4">row += 1</div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">💡 Практические примеры:</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>1. Таблица умножения:</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>i = 1</div>
                        <div><span className="text-blue-300">while</span> i {'<='} 3:</div>
                        <div className="ml-4">j = 1</div>
                        <div className="ml-4"><span className="text-blue-300">while</span> j {'<='} 3:</div>
                        <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"{'{i}'} × {'{j}'} = {'{i*j}'}"</span>, end=<span className="text-yellow-300">"  "</span>)</div>
                        <div className="ml-8">j += 1</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>()  <span className="text-gray-400"># новая строка</span></div>
                        <div className="ml-4">i += 1</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Поиск в двумерном массиве:</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>found = <span className="text-blue-300">False</span></div>
                        <div>row = 0</div>
                        <div><span className="text-blue-300">while</span> row {'<'} <span className="text-purple-300">len</span>(matrix) <span className="text-blue-300">and not</span> found:</div>
                        <div className="ml-4">col = 0</div>
                        <div className="ml-4"><span className="text-blue-300">while</span> col {'<'} <span className="text-purple-300">len</span>(matrix[row]):</div>
                        <div className="ml-8"><span className="text-blue-300">if</span> matrix[row][col] == target:</div>
                        <div className="ml-12">found = <span className="text-blue-300">True</span></div>
                        <div className="ml-12 text-red-400">break</div>
                        <div className="ml-8">col += 1</div>
                        <div className="ml-4">row += 1</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-400">
                  <h3 className="text-xl font-bold text-yellow-700 mb-4">⚠️ break и continue во вложенных циклах:</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-700 mb-3"><strong>Важно:</strong> break и continue влияют только на тот цикл, в котором находятся!</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 3:</div>
                        <div className="ml-4">j = 0</div>
                        <div className="ml-4"><span className="text-blue-300">while</span> j {'<'} 3:</div>
                        <div className="ml-8"><span className="text-blue-300">if</span> j == 1:</div>
                        <div className="ml-12 text-red-400">break  <span className="text-gray-400"># выход из ВНУТРЕННЕГО</span></div>
                        <div className="ml-8"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"{'{i}'},{'{j}'}"</span>)</div>
                        <div className="ml-8">j += 1</div>
                        <div className="ml-4">i += 1  <span className="text-gray-400"># внешний продолжается!</span></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-700 mb-3">Чтобы выйти из обоих циклов, используй флаг:</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>exit_all = <span className="text-blue-300">False</span></div>
                        <div>i = 0</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 3 <span className="text-blue-300">and not</span> exit_all:</div>
                        <div className="ml-4">j = 0</div>
                        <div className="ml-4"><span className="text-blue-300">while</span> j {'<'} 3:</div>
                        <div className="ml-8"><span className="text-blue-300">if</span> condition:</div>
                        <div className="ml-12">exit_all = <span className="text-blue-300">True</span></div>
                        <div className="ml-12 text-red-400">break</div>
                        <div className="ml-8">j += 1</div>
                        <div className="ml-4">i += 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 6: Оптимизация */}
          {activeSection === 6 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">⚡ Оптимизация и частые ошибки</h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-400">
                  <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <AlertCircle size={28} />
                    Топ-5 ошибок с while
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">1️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Забыть инкремент/декремент</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ОШИБКА:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>i = 0</div>
                                <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                                <div className="ml-4"><span className="text-purple-300">print</span>(i)</div>
                                <div className="ml-4 text-red-400"># зависнет!</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>i = 0</div>
                                <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                                <div className="ml-4"><span className="text-purple-300">print</span>(i)</div>
                                <div className="ml-4 text-green-400">i += 1</div>
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
                          <strong className="text-red-700">Неправильная позиция инкремента с continue</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ ОШИБКА:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>i = 0</div>
                                <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                                <div className="ml-4"><span className="text-blue-300">if</span> i % 2 == 0:</div>
                                <div className="ml-8 text-yellow-400">continue</div>
                                <div className="ml-4 text-red-400">i += 1  # пропускается!</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ ПРАВИЛЬНО:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>i = 0</div>
                                <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                                <div className="ml-4 text-green-400">i += 1  # сначала!</div>
                                <div className="ml-4"><span className="text-blue-300">if</span> i % 2 == 0:</div>
                                <div className="ml-8 text-yellow-400">continue</div>
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
                          <strong className="text-red-700">Изменение условия внутри без осторожности</strong>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                            <div>count = 0</div>
                            <div>limit = 10</div>
                            <div><span className="text-blue-300">while</span> count {'<'} limit:</div>
                            <div className="ml-4"><span className="text-purple-300">print</span>(count)</div>
                            <div className="ml-4">count += 1</div>
                            <div className="ml-4 text-red-400">limit += 1  # бесконечный цикл!</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">4️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Не проверять граничные случаи</strong>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                            <div>i = 0</div>
                            <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(items):</div>
                            <div className="ml-4 text-red-400"># что если items пустой?</div>
                            <div className="ml-4"><span className="text-purple-300">print</span>(items[i])</div>
                            <div className="ml-4">i += 1</div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            ✓ Лучше: проверить <code className="bg-gray-200 px-1 rounded">if not items:</code> перед циклом
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">5️⃣</div>
                        <div className="flex-1">
                          <strong className="text-red-700">Использовать while когда нужен for</strong>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div>
                              <div className="text-red-600 text-sm font-bold mb-1">❌ Неоптимально:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div>i = 0</div>
                                <div><span className="text-blue-300">while</span> i {'<'} 10:</div>
                                <div className="ml-4"><span className="text-purple-300">print</span>(i)</div>
                                <div className="ml-4">i += 1</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-green-600 text-sm font-bold mb-1">✓ Лучше:</div>
                              <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                                <div><span className="text-blue-300">for</span> i <span className="text-blue-300">in</span> <span className="text-purple-300">range</span>(10):</div>
                                <div className="ml-4"><span className="text-purple-300">print</span>(i)</div>
                                <div className="text-gray-400"># короче и понятнее</div>
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
                      <strong>1. Минимизируй вычисления в условии</strong>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Медленно:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(items):</div>
                            <div className="text-gray-400"># len() каждый раз</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Быстро:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div>length = <span className="text-purple-300">len</span>(items)</div>
                            <div><span className="text-blue-300">while</span> i {'<'} length:</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>2. Используй early exit (break) при нахождении результата</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div><span className="text-blue-300">while</span> i {'<'} <span className="text-purple-300">len</span>(items):</div>
                        <div className="ml-4"><span className="text-blue-300">if</span> items[i] == target:</div>
                        <div className="ml-8 text-red-400">break  <span className="text-gray-400"># не проверяем остальное</span></div>
                        <div className="ml-4">i += 1</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>3. Не дублируй проверки</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div className="text-green-400"># Плохо: двойная проверка</div>
                        <div><span className="text-blue-300">while</span> i {'<'} 10 <span className="text-blue-300">and</span> i {'<'} max_value:</div>
                        <div className="text-gray-400"># если max_value всегда {'>'} 10</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🔀 Когда использовать while vs for?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-600">Используй while:</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Не знаешь количество итераций</li>
                        <li>• Условие сложное</li>
                        <li>• Зависит от пользовательского ввода</li>
                        <li>• Ждёшь определённого события</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-green-600">Используй for:</strong>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Знаешь количество повторений</li>
                        <li>• Проходишь по списку/диапазону</li>
                        <li>• Фиксированное число итераций</li>
                        <li>• Код короче и понятнее</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 7: Сложные задания */}
          {activeSection === 7 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">📝 Сложные задания</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Задание 1: Угадай число ⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Программа загадывает число от 1 до 100. Пользователь угадывает.
                    После каждой попытки программа говорит "больше" или "меньше".
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Требования:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Используй <code className="bg-gray-200 px-1 rounded">while True</code></li>
                      <li>Считай попытки</li>
                      <li>При угадывании выведи количество попыток и выйди из цикла</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Задание 2: Калькулятор с меню ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай калькулятор с меню, который работает пока пользователь не выберет выход.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Меню:</strong>
                    <div className="mt-2 font-mono text-sm">
                      <div>1. Сложение</div>
                      <div>2. Вычитание</div>
                      <div>3. Умножение</div>
                      <div>4. Деление</div>
                      <div>5. Выход</div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Требования:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Бесконечный цикл с break при выборе 5</li>
                        <li>Запрос двух чисел для операций</li>
                        <li>Обработка деления на ноль</li>
                        <li>При неверном выборе - повторный запрос</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">Задание 3: Поиск простых чисел ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Найди все простые числа от 2 до N (вводит пользователь).
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Алгоритм:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Внешний цикл: проверяем каждое число от 2 до N</li>
                      <li>Внутренний цикл: проверяем делители от 2 до √числа</li>
                      <li>Используй флаг <code className="bg-gray-200 px-1 rounded">is_prime</code></li>
                      <li>Если находим делитель - <code className="bg-gray-200 px-1 rounded">break</code> из внутреннего цикла</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">Задание 4: Игра "Быки и коровы" ⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Программа загадывает 4-значное число (все цифры разные).
                    Пользователь угадывает. Программа даёт подсказки:
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="list-disc ml-6 text-gray-700">
                      <li><strong>Бык</strong> - правильная цифра на правильной позиции</li>
                      <li><strong>Корова</strong> - правильная цифра на неправильной позиции</li>
                    </ul>
                    <div className="mt-3 text-sm text-gray-600">
                      Пример: загадано 1234, пользователь ввёл 1356
                      <div className="mt-1">Ответ: 1 бык (1), 1 корова (3)</div>
                    </div>
                    <div className="mt-3">
                      <strong>Требования:</strong>
                      <ul className="list-disc ml-6 text-gray-600 mt-1">
                        <li>Генерация случайного 4-значного числа</li>
                        <li>Проверка ввода (4 цифры, все разные)</li>
                        <li>Подсчёт быков и коров</li>
                        <li>Цикл до победы (4 быка)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Задание 5: Банковская система ⭐⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай простую банковскую систему с аутентификацией.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Функционал:</strong>
                    <div className="mt-2 space-y-2 text-gray-700">
                      <div><strong>1. Вход в систему:</strong></div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Запрос логина и пароля</li>
                        <li>Максимум 3 попытки</li>
                        <li>Блокировка при превышении</li>
                      </ul>
                      <div><strong>2. Главное меню (после входа):</strong></div>
                      <ul className="list-disc ml-6 text-sm">
                        <li>Проверить баланс</li>
                        <li>Пополнить счёт</li>
                        <li>Снять деньги (с проверкой достаточности)</li>
                        <li>История операций (последние 5)</li>
                        <li>Выход</li>
                      </ul>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Требования:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Использовать флаги для состояний</li>
                        <li>Вложенные циклы (меню внутри входа)</li>
                        <li>Сохранять операции в список</li>
                        <li>Валидация всех вводов</li>
                      </ul>
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
                      <div className="text-sm text-gray-600 mt-2">Нет лишних операций</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 8: Практика */}
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

          {/* Навигация внизу */}
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

export default WhileLesson;