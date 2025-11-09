import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Check, X, AlertCircle, Zap, BookOpen, Package, Key, Lightbulb, Lock } from 'lucide-react';

const TuplesDictsLesson = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  // Состояния для демонстраций
  const [tupleDemo, setTupleDemo] = useState({ running: false, output: [] });
  const [dictBasicDemo, setDictBasicDemo] = useState({ running: false, output: [] });
  const [dictMethodsDemo, setDictMethodsDemo] = useState({ running: false, output: [] });
  const [nestedDemo, setNestedDemo] = useState({ running: false, output: [] });
  
  // Состояния для интерактивной практики
  const [activeTask, setActiveTask] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [solvedTasks, setSolvedTasks] = useState([]);

  const sections = [
    { id: 0, title: '🔄 Быстрое повторение' },
    { id: 1, title: '📦 Кортежи - Основы' },
    { id: 2, title: '🎯 Кортежи - Практика' },
    { id: 3, title: '📖 Словари - Основы' },
    { id: 4, title: '🔑 Методы словарей' },
    { id: 5, title: '🔁 Перебор словарей' },
    { id: 6, title: '🗂️ Вложенные структуры' },
    { id: 7, title: '📝 Сложные задания' },
    { id: 8, title: '💻 Практика с проверкой' }
  ];

  // Задачи для интерактивной практики
  const tasks = [
    {
      id: 1,
      title: 'Задача 1: Создание кортежа',
      difficulty: '⭐',
      description: 'Создай кортеж coordinates с числами 10, 20, 30 и выведи его',
      starterCode: '# Твой код здесь\n',
      solution: 'coordinates = (10, 20, 30)\nprint(coordinates)',
      tests: [{ input: null, expected: ['(10, 20, 30)'] }],
      hints: ['Синтаксис кортежа: (элемент1, элемент2, элемент3)', 'Используй print() для вывода', 'Название переменной: coordinates']
    },
    {
      id: 2,
      title: 'Задача 2: Распаковка кортежа',
      difficulty: '⭐⭐',
      description: 'Распакуй кортеж point = (5, 15) в переменные x и y, затем выведи их',
      starterCode: 'point = (5, 15)\n# Твой код здесь\n',
      solution: 'point = (5, 15)\nx, y = point\nprint(x)\nprint(y)',
      tests: [{ input: null, expected: ['5', '15'] }],
      hints: ['Синтаксис распаковки: x, y = кортеж', 'Выведи каждую переменную отдельно', 'Сначала x, потом y']
    },
    {
      id: 3,
      title: 'Задача 3: Создание словаря',
      difficulty: '⭐⭐',
      description: 'Создай словарь student с ключами name="Alice" и age=20, выведи значение по ключу name',
      starterCode: '# Твой код здесь\n',
      solution: 'student = {"name": "Alice", "age": 20}\nprint(student["name"])',
      tests: [{ input: null, expected: ['Alice'] }],
      hints: ['Синтаксис словаря: {"ключ": значение}', 'Доступ к значению: словарь["ключ"]', 'Выведи только значение по ключу "name"']
    },
    {
      id: 4,
      title: 'Задача 4: Перебор словаря',
      difficulty: '⭐⭐⭐',
      description: 'Создай словарь prices = {"apple": 50, "banana": 30} и выведи каждую пару в формате "apple: 50"',
      starterCode: '# Твой код здесь\n',
      solution: 'prices = {"apple": 50, "banana": 30}\nfor item, price in prices.items():\n    print(f"{item}: {price}")',
      tests: [{ input: null, expected: ['apple: 50', 'banana: 30'] }],
      hints: ['Используй метод .items() для перебора', 'Синтаксис: for key, value in dict.items():', 'Формат вывода: f"{key}: {value}"']
    },
    {
      id: 5,
      title: 'Задача 5: Вложенная структура',
      difficulty: '⭐⭐⭐',
      description: 'Создай словарь user с ключами name="Bob" и scores=[85, 90, 78], выведи второй элемент scores',
      starterCode: '# Твой код здесь\n',
      solution: 'user = {"name": "Bob", "scores": [85, 90, 78]}\nprint(user["scores"][1])',
      tests: [{ input: null, expected: ['90'] }],
      hints: ['Значением может быть список', 'Доступ: словарь["ключ"][индекс]', 'Второй элемент имеет индекс 1']
    }
  ];

  // Демонстрация: Кортежи vs Списки
  const runTupleDemo = () => {
    if (tupleDemo.running) return;
    setTupleDemo({ running: true, output: [] });
    
    let output = [];
    let i = 0;
    
    const steps = [
      "# Creating list and tuple",
      "my_list = [1, 2, 3]",
      "my_tuple = (1, 2, 3)",
      "",
      "print('List:', my_list)",
      "→ List: [1, 2, 3]",
      "print('Tuple:', my_tuple)",
      "→ Tuple: (1, 2, 3)",
      "",
      "# Lists are MUTABLE (can change)",
      "my_list[0] = 100",
      "print(my_list)",
      "→ [100, 2, 3] ✅",
      "",
      "my_list.append(4)",
      "print(my_list)",
      "→ [100, 2, 3, 4] ✅",
      "",
      "# Tuples are IMMUTABLE (cannot change)",
      "try:",
      "    my_tuple[0] = 100",
      "except TypeError:",
      "    print('Error: Cannot modify tuple!')",
      "→ Error: Cannot modify tuple! ❌",
      "",
      "try:",
      "    my_tuple.append(4)",
      "except AttributeError:",
      "    print('Error: Tuple has no append!')",
      "→ Error: Tuple has no append! ❌"
    ];

    const interval = setInterval(() => {
      if (i < steps.length) {
        output.push(steps[i]);
        setTupleDemo({ ...tupleDemo, output: [...output] });
        i++;
      } else {
        clearInterval(interval);
        setTupleDemo({ running: false, output: [...output] });
      }
    }, 400);
  };

  // Демонстрация: Базовые операции со словарями
  const runDictBasicDemo = () => {
    if (dictBasicDemo.running) return;
    setDictBasicDemo({ running: true, output: [] });
    
    let output = [];
    let i = 0;
    
    const steps = [
      "# Создаём словарь - телефонную книгу",
      "phone_book = {}",
      "print('Empty dictionary created')",
      "→ Empty dictionary created",
      "",
      "# Добавляем контакты",
      "phone_book['Mom'] = '555-0001'",
      "print('Added: Mom → 555-0001')",
      "→ Added: Mom → 555-0001",
      "",
      "phone_book['Dad'] = '555-0002'",
      "print('Added: Dad → 555-0002')",
      "→ Added: Dad → 555-0002",
      "",
      "phone_book['Friend'] = '555-0003'",
      "print('Added: Friend → 555-0003')",
      "→ Added: Friend → 555-0003",
      "",
      "# Получаем значение по ключу",
      "mom_phone = phone_book['Mom']",
      "print(f\"Mom's phone: {mom_phone}\")",
      "→ Mom's phone: 555-0001",
      "",
      "# Обновляем значение",
      "phone_book['Mom'] = '555-9999'",
      "print('Updated Mom phone')",
      "→ Updated Mom phone",
      "",
      "# Весь словарь",
      "print(phone_book)",
      "→ {'Mom': '555-9999', 'Dad': '555-0002', 'Friend': '555-0003'}"
    ];

    const interval = setInterval(() => {
      if (i < steps.length) {
        output.push(steps[i]);
        setDictBasicDemo({ ...dictBasicDemo, output: [...output] });
        i++;
      } else {
        clearInterval(interval);
        setDictBasicDemo({ running: false, output: [...output] });
      }
    }, 500);
  };

  // Демонстрация: Методы словарей
  const runDictMethodsDemo = () => {
    if (dictMethodsDemo.running) return;
    setDictMethodsDemo({ running: true, output: [] });
    
    let output = [];
    let i = 0;
    
    const steps = [
      "# Создаём словарь с оценками",
      "grades = {'Math': 5, 'English': 4, 'Science': 5}",
      "",
      "# Метод .keys() - все ключи",
      "print(grades.keys())",
      "→ dict_keys(['Math', 'English', 'Science'])",
      "",
      "# Метод .values() - все значения",
      "print(grades.values())",
      "→ dict_values([5, 4, 5])",
      "",
      "# Метод .items() - пары ключ-значение",
      "print(grades.items())",
      "→ dict_items([('Math', 5), ('English', 4), ('Science', 5)])",
      "",
      "# Перебираем словарь циклом",
      "print('\\nGrades by subject:')",
      "for subject, grade in grades.items():",
      "    print(f'{subject}: {grade}')",
      "",
      "→ Grades by subject:",
      "→ Math: 5",
      "→ English: 4",
      "→ Science: 5"
    ];

    const interval = setInterval(() => {
      if (i < steps.length) {
        output.push(steps[i]);
        setDictMethodsDemo({ ...dictMethodsDemo, output: [...output] });
        i++;
      } else {
        clearInterval(interval);
        setDictMethodsDemo({ running: false, output: [...output] });
      }
    }, 450);
  };

  // Демонстрация: Вложенные структуры
  const runNestedDemo = () => {
    if (nestedDemo.running) return;
    setNestedDemo({ running: true, output: [] });
    
    let output = [];
    let i = 0;
    
    const steps = [
      "# Создаём игрового персонажа с вложенными структурами",
      "player = {",
      "    'name': 'Hero',",
      "    'level': 5,",
      "    'inventory': ['sword', 'shield', 'potion'],",
      "    'stats': {",
      "        'hp': 100,",
      "        'mp': 50,",
      "        'attack': 25",
      "    }",
      "}",
      "",
      "# Доступ к простым данным",
      "print('Name:', player['name'])",
      "→ Name: Hero",
      "",
      "print('Level:', player['level'])",
      "→ Level: 5",
      "",
      "# Доступ к элементу списка",
      "print('First item:', player['inventory'][0])",
      "→ First item: sword",
      "",
      "# Доступ к вложенному словарю",
      "print('HP:', player['stats']['hp'])",
      "→ HP: 100",
      "",
      "print('Attack:', player['stats']['attack'])",
      "→ Attack: 25"
    ];

    const interval = setInterval(() => {
      if (i < steps.length) {
        output.push(steps[i]);
        setNestedDemo({ ...nestedDemo, output: [...output] });
        i++;
      } else {
        clearInterval(interval);
        setNestedDemo({ running: false, output: [...output] });
      }
    }, 500);
  };

  // Интерактивная практика - функции
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

        // Присваивание переменной
        const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          const value = assignMatch[2].trim();
          
          // Обработка кортежей
          if (value.startsWith('(') && value.endsWith(')')) {
            const content = value.slice(1, -1);
            const elements = content.split(',').map(x => {
              const trimmed = x.trim();
              if (trimmed.match(/^['"].*['"]$/)) {
                return trimmed.slice(1, -1);
              }
              return isNaN(trimmed) ? trimmed : Number(trimmed);
            });
            variables[varName] = elements;
          }
          // Обработка словарей
          else if (value.startsWith('{') && value.endsWith('}')) {
            const content = value.slice(1, -1);
            const dict = {};
            
            // Простой парсинг словаря
            const pairs = content.match(/(['"]?\w+['"]?)\s*:\s*([^,}]+)/g) || [];
            pairs.forEach(pair => {
              const [key, val] = pair.split(':').map(x => x.trim());
              const cleanKey = key.replace(/['"]/g, '');
              let cleanVal = val.trim();
              
              // Проверка типа значения
              if (cleanVal.startsWith('[') && cleanVal.endsWith(']')) {
                // Список
                const listContent = cleanVal.slice(1, -1);
                const listItems = listContent.split(',').map(x => {
                  const trimmed = x.trim();
                  return isNaN(trimmed) ? trimmed : Number(trimmed);
                });
                dict[cleanKey] = listItems;
              } else if (cleanVal.match(/^['"].*['"]$/)) {
                dict[cleanKey] = cleanVal.slice(1, -1);
              } else {
                dict[cleanKey] = isNaN(cleanVal) ? cleanVal : Number(cleanVal);
              }
            });
            variables[varName] = dict;
          }
          // Обработка списков
          else if (value.startsWith('[') && value.endsWith(']')) {
            const content = value.slice(1, -1);
            const elements = content.split(',').map(x => {
              const trimmed = x.trim();
              if (trimmed.match(/^['"].*['"]$/)) {
                return trimmed.slice(1, -1);
              }
              return isNaN(trimmed) ? trimmed : Number(trimmed);
            });
            variables[varName] = elements;
          }
          // Обработка чисел и строк
          else if (value.match(/^['"].*['"]$/)) {
            variables[varName] = value.slice(1, -1);
          } else if (!isNaN(value)) {
            variables[varName] = Number(value);
          } else if (variables[value]) {
            variables[varName] = variables[value];
          }
        }
        // Распаковка кортежа
        else if (line.includes(',') && line.includes('=') && !line.includes('{')) {
          const parts = line.split('=');
          const leftSide = parts[0].trim().split(',').map(x => x.trim());
          const rightSide = parts[1].trim();
          
          if (variables[rightSide] && Array.isArray(variables[rightSide])) {
            leftSide.forEach((varName, idx) => {
              variables[varName] = variables[rightSide][idx];
            });
          }
        }
        // Print
        else if (line.startsWith('print(')) {
          const content = line.match(/print\((.*)\)/)[1];
          
          // f-string
          if (content.startsWith('f"') || content.startsWith("f'")) {
            let str = content.slice(2, -1);
            Object.keys(variables).forEach(varName => {
              const regex = new RegExp(`\\{${varName}\\}`, 'g');
              str = str.replace(regex, variables[varName]);
            });
            outputLines.push(str);
          }
          // Обычная строка
          else if (content.match(/^['"].*['"]$/)) {
            outputLines.push(content.slice(1, -1));
          }
          // Переменная
          else if (variables[content]) {
            const val = variables[content];
            if (Array.isArray(val)) {
              outputLines.push(`(${val.join(', ')})`);
            } else if (typeof val === 'object') {
              outputLines.push(JSON.stringify(val));
            } else {
              outputLines.push(String(val));
            }
          }
          // Доступ к элементу словаря или списка
          else if (content.includes('[')) {
            const match = content.match(/(\w+)\[['"]?(\w+)['"]?\](?:\[(\d+)\])?/);
            if (match) {
              const [, varName, key, index] = match;
              if (variables[varName]) {
                let value = variables[varName][key];
                if (index !== undefined && Array.isArray(value)) {
                  value = value[Number(index)];
                }
                outputLines.push(String(value));
              }
            }
          }
        }
        // For loop
        else if (line.startsWith('for ')) {
          const forMatch = line.match(/for\s+(\w+)(?:,\s*(\w+))?\s+in\s+(.+):/);
          if (forMatch) {
            const [, key, value, iterable] = forMatch;
            
            let items = [];
            if (iterable.includes('.items()')) {
              const dictName = iterable.replace('.items()', '').trim();
              if (variables[dictName]) {
                items = Object.entries(variables[dictName]);
              }
            }
            
            // Выполняем тело цикла
            lineIndex++;
            items.forEach(([k, v]) => {
              variables[key] = k;
              if (value) variables[value] = v;
              
              let loopLine = codeLines[lineIndex].trim();
              if (loopLine.startsWith('print(')) {
                const content = loopLine.match(/print\((.*)\)/)[1];
                
                if (content.startsWith('f"') || content.startsWith("f'")) {
                  let str = content.slice(2, -1);
                  str = str.replace(/\{(\w+)\}/g, (_, varName) => variables[varName]);
                  outputLines.push(str);
                }
              }
            });
          }
        }

        lineIndex++;
      }

      setOutput(outputLines);
      setAttempts(attempts + 1);

      // Проверка результата
      const expected = task.tests[0].expected;
      passed = outputLines.length === expected.length && 
               outputLines.every((line, i) => line === expected[i]);

      setTestResults({ passed, error: null });

      if (passed && !solvedTasks.includes(activeTask)) {
        setSolved(true);
        setSolvedTasks([...solvedTasks, activeTask]);
      }

    } catch (error) {
      setOutput([]);
      setTestResults({ passed: false, error: error.message });
      setAttempts(attempts + 1);
    }
  };

  const resetTask = () => {
    setUserCode(tasks[activeTask].starterCode);
    setOutput([]);
    setTestResults(null);
    setAttempts(0);
    setSolved(false);
  };

  const showSolution = () => {
    setUserCode(tasks[activeTask].solution);
  };

  const changeTask = (index) => {
    setActiveTask(index);
    setUserCode(tasks[index].starterCode);
    setOutput([]);
    setTestResults(null);
    setAttempts(0);
    setSolved(solvedTasks.includes(index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
            Кортежи и Словари в Python
          </h1>
          <p className="text-gray-600 text-lg">
            Изучи неизменяемые структуры и хранение данных ключ-значение
          </p>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-3 rounded-lg text-sm font-medium transition ${
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

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Секция 0: Быстрое повторение */}
          {activeSection === 0 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔄 Быстрое повторение</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Что ты уже знаешь:</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✓</div>
                      <p><strong>Списки [...]</strong> - изменяемая коллекция элементов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✓</div>
                      <p><strong>Индексация</strong> - доступ к элементам по позиции</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✓</div>
                      <p><strong>Методы списков</strong> - append(), remove(), sort() и другие</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">✓</div>
                      <p><strong>Циклы</strong> - перебор элементов с for и while</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Что узнаешь сегодня:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Package size={24} className="text-purple-600" />
                        <strong className="text-lg">Кортежи (Tuples)</strong>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Неизменяемая версия списков. Быстрее и безопаснее для хранения постоянных данных.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Key size={24} className="text-blue-600" />
                        <strong className="text-lg">Словари (Dictionaries)</strong>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Хранение данных в формате ключ-значение. Быстрый поиск по уникальному ключу.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    Зачем нужны новые структуры данных?
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Списки хороши</strong>, но не всегда оптимальны:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Если данные не должны меняться → используй <strong>кортеж</strong></li>
                      <li>Если нужен быстрый поиск по имени/ID → используй <strong>словарь</strong></li>
                      <li>Если данные связаны (ключ → значение) → используй <strong>словарь</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 1: Кортежи - Основы */}
          {activeSection === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">📦 Кортежи - Основы</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Что такое кортеж?</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>Кортеж (Tuple)</strong> - это неизменяемая упорядоченная коллекция элементов.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-green-600 font-bold mb-2">Список (List)</div>
                        <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                          my_list = [1, 2, 3]<br/>
                          <span className="text-gray-400"># Можно менять</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-purple-600 font-bold mb-2">Кортеж (Tuple)</div>
                        <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                          my_tuple = (1, 2, 3)<br/>
                          <span className="text-gray-400"># Нельзя менять</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-4 border-purple-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 Синтаксис кортежей</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                      <div><span className="text-gray-400"># Создание кортежа</span></div>
                      <div>coordinates = (10, 20, 30)</div>
                      <div>colors = (<span className="text-yellow-300">"red"</span>, <span className="text-yellow-300">"green"</span>, <span className="text-yellow-300">"blue"</span>)</div>
                      <div className="mt-3"></div>
                      <div><span className="text-gray-400"># Пустой кортеж</span></div>
                      <div>empty = ()</div>
                      <div className="mt-3"></div>
                      <div><span className="text-gray-400"># Кортеж с одним элементом (запятая обязательна!)</span></div>
                      <div>single = (5,)  <span className="text-green-400">✓ Правильно</span></div>
                      <div>wrong = (5)    <span className="text-red-400">✗ Это число, не кортеж!</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🔍 Доступ к элементам</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div>point = (100, 200, 300)</div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># По индексу (как в списках)</span></div>
                    <div><span className="text-purple-300">print</span>(point[0])  <span className="text-gray-400"># 100</span></div>
                    <div><span className="text-purple-300">print</span>(point[1])  <span className="text-gray-400"># 200</span></div>
                    <div><span className="text-purple-300">print</span>(point[-1]) <span className="text-gray-400"># 300 (последний)</span></div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Срезы (slicing)</span></div>
                    <div><span className="text-purple-300">print</span>(point[0:2])  <span className="text-gray-400"># (100, 200)</span></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">💡 Интерактивная демонстрация</h3>
                  <button
                    onClick={runTupleDemo}
                    disabled={tupleDemo.running}
                    className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play size={20} />
                    {tupleDemo.running ? 'Запущено...' : 'Запустить демонстрацию'}
                  </button>
                  
                  {tupleDemo.output.length > 0 && (
                    <div className="mt-4 bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {tupleDemo.output.map((line, i) => (
                        <div key={i} className="font-mono text-sm mb-1">
                          {line.startsWith('#') ? (
                            <span className="text-green-400">{line}</span>
                          ) : line.startsWith('→') ? (
                            <span className="text-yellow-300">{line}</span>
                          ) : (
                            <span className="text-white">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Секция 2: Кортежи - Практика */}
          {activeSection === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🎯 Кортежи - Практика</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Распаковка (Unpacking)</h3>
                  <p className="text-gray-700 mb-4">
                    Можно "распаковать" кортеж в отдельные переменные одной строкой:
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div><span className="text-gray-400"># Создаём кортеж с координатами</span></div>
                    <div>point = (10, 20)</div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Распаковка в переменные</span></div>
                    <div>x, y = point</div>
                    <div className="mt-3"></div>
                    <div><span className="text-purple-300">print</span>(x)  <span className="text-gray-400"># 10</span></div>
                    <div><span className="text-purple-300">print</span>(y)  <span className="text-gray-400"># 20</span></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🔄 Обмен значений</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Без кортежей (3 строки):</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>temp = a</div>
                        <div>a = b</div>
                        <div>b = temp</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-2">С кортежами (1 строка):</div>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>a, b = b, a</div>
                        <div className="text-green-400"># Элегантно! ✨</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-4">📊 Методы кортежей</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      У кортежей всего 2 метода (потому что они неизменяемые):
                    </p>
                    <div className="space-y-3">
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>numbers = (1, 2, 3, 2, 4, 2)</div>
                        <div className="mt-2"></div>
                        <div><span className="text-gray-400"># .count() - сколько раз встречается элемент</span></div>
                        <div><span className="text-purple-300">print</span>(numbers.count(2))  <span className="text-gray-400"># 3</span></div>
                        <div className="mt-2"></div>
                        <div><span className="text-gray-400"># .index() - первый индекс элемента</span></div>
                        <div><span className="text-purple-300">print</span>(numbers.index(3))  <span className="text-gray-400"># 2</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
                    <Zap size={24} />
                    Когда использовать кортежи?
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>✓ Используй кортежи когда:</strong>
                      <ul className="mt-2 list-disc ml-6 text-gray-700">
                        <li>Данные не должны меняться (координаты, RGB цвета)</li>
                        <li>Нужна гарантия неизменности</li>
                        <li>Используешь данные как ключи в словаре</li>
                        <li>Возвращаешь несколько значений из функции</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <strong>✗ Используй списки когда:</strong>
                      <ul className="mt-2 list-disc ml-6 text-gray-700">
                        <li>Данные будут изменяться</li>
                        <li>Нужно добавлять/удалять элементы</li>
                        <li>Порядок элементов будет меняться</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 3: Словари - Основы */}
          {activeSection === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">📖 Словари - Основы</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Что такое словарь?</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    <strong>Словарь (Dictionary)</strong> - это коллекция пар "ключ: значение". Позволяет быстро находить данные по уникальному ключу.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-center text-2xl mb-4">📞 = 📖</div>
                    <p className="text-gray-600 text-center">
                      Как телефонная книга: имя (ключ) → номер телефона (значение)
                    </p>
                  </div>
                </div>

                <div className="bg-white border-4 border-blue-300 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Синтаксис словарей</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div><span className="text-gray-400"># Создание словаря</span></div>
                    <div>student = {"{"}<span className="text-yellow-300">"name"</span>: <span className="text-yellow-300">"Alice"</span>, <span className="text-yellow-300">"age"</span>: 20, <span className="text-yellow-300">"grade"</span>: <span className="text-yellow-300">"A"</span>{"}"}</div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Пустой словарь</span></div>
                    <div>empty_dict = {"{}"}</div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Доступ к значению по ключу</span></div>
                    <div><span className="text-purple-300">print</span>(student[<span className="text-yellow-300">"name"</span>])  <span className="text-gray-400"># Alice</span></div>
                    <div><span className="text-purple-300">print</span>(student[<span className="text-yellow-300">"age"</span>])   <span className="text-gray-400"># 20</span></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">➕ Добавление и изменение</h3>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div>phone_book = {"{}"}</div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Добавление нового элемента</span></div>
                    <div>phone_book[<span className="text-yellow-300">"Mom"</span>] = <span className="text-yellow-300">"555-0001"</span></div>
                    <div>phone_book[<span className="text-yellow-300">"Dad"</span>] = <span className="text-yellow-300">"555-0002"</span></div>
                    <div className="mt-3"></div>
                    <div><span className="text-gray-400"># Изменение существующего</span></div>
                    <div>phone_book[<span className="text-yellow-300">"Mom"</span>] = <span className="text-yellow-300">"555-9999"</span></div>
                    <div className="mt-3"></div>
                    <div><span className="text-purple-300">print</span>(phone_book)</div>
                    <div className="text-yellow-300"># {"{"}'Mom': '555-9999', 'Dad': '555-0002'{"}"}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">💡 Интерактивная демонстрация</h3>
                  <button
                    onClick={runDictBasicDemo}
                    disabled={dictBasicDemo.running}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play size={20} />
                    {dictBasicDemo.running ? 'Запущено...' : 'Запустить демонстрацию'}
                  </button>
                  
                  {dictBasicDemo.output.length > 0 && (
                    <div className="mt-4 bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {dictBasicDemo.output.map((line, i) => (
                        <div key={i} className="font-mono text-sm mb-1">
                          {line.startsWith('#') ? (
                            <span className="text-green-400">{line}</span>
                          ) : line.startsWith('→') ? (
                            <span className="text-yellow-300">{line}</span>
                          ) : (
                            <span className="text-white">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Секция 4: Методы словарей */}
          {activeSection === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔑 Методы словарей</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">Основные методы</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-700 text-lg">.keys()</strong>
                      <p className="text-gray-600 mb-2">Возвращает все ключи словаря</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div>grades = {"{"}<span className="text-yellow-300">"Math"</span>: 5, <span className="text-yellow-300">"English"</span>: 4{"}"}</div>
                        <div><span className="text-purple-300">print</span>(grades.keys())</div>
                        <div className="text-yellow-300"># dict_keys(['Math', 'English'])</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-700 text-lg">.values()</strong>
                      <p className="text-gray-600 mb-2">Возвращает все значения словаря</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div><span className="text-purple-300">print</span>(grades.values())</div>
                        <div className="text-yellow-300"># dict_values([5, 4])</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-700 text-lg">.items()</strong>
                      <p className="text-gray-600 mb-2">Возвращает пары (ключ, значение)</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div><span className="text-purple-300">print</span>(grades.items())</div>
                        <div className="text-yellow-300"># dict_items([('Math', 5), ('English', 4)])</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-purple-700 text-lg">.get()</strong>
                      <p className="text-gray-600 mb-2">Безопасное получение значения (не даёт ошибку)</p>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                        <div><span className="text-gray-400"># Если ключа нет - вернёт None</span></div>
                        <div><span className="text-purple-300">print</span>(grades.get(<span className="text-yellow-300">"Science"</span>))  <span className="text-gray-400"># None</span></div>
                        <div className="mt-2"></div>
                        <div><span className="text-gray-400"># Можно указать значение по умолчанию</span></div>
                        <div><span className="text-purple-300">print</span>(grades.get(<span className="text-yellow-300">"Science"</span>, 0))  <span className="text-gray-400"># 0</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">💡 Интерактивная демонстрация</h3>
                  <button
                    onClick={runDictMethodsDemo}
                    disabled={dictMethodsDemo.running}
                    className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play size={20} />
                    {dictMethodsDemo.running ? 'Запущено...' : 'Запустить демонстрацию'}
                  </button>
                  
                  {dictMethodsDemo.output.length > 0 && (
                    <div className="mt-4 bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {dictMethodsDemo.output.map((line, i) => (
                        <div key={i} className="font-mono text-sm mb-1">
                          {line.startsWith('#') ? (
                            <span className="text-green-400">{line}</span>
                          ) : line.startsWith('→') ? (
                            <span className="text-yellow-300">{line}</span>
                          ) : (
                            <span className="text-white">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Секция 5: Перебор словарей */}
          {activeSection === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🔁 Перебор словарей</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Три способа перебора</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-blue-700 text-lg">1. Перебор ключей</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div>grades = {"{"}<span className="text-yellow-300">"Math"</span>: 5, <span className="text-yellow-300">"English"</span>: 4{"}"}</div>
                        <div className="mt-2"></div>
                        <div><span className="text-blue-300">for</span> subject <span className="text-blue-300">in</span> grades:</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(subject)  <span className="text-gray-400"># Math, English</span></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong className="text-green-700 text-lg">2. Перебор значений</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div><span className="text-blue-300">for</span> grade <span className="text-blue-300">in</span> grades.values():</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(grade)  <span className="text-gray-400"># 5, 4</span></div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-4 border-purple-300">
                      <strong className="text-purple-700 text-lg">3. Перебор пар (ключ + значение) ⭐ Лучший способ</strong>
                      <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm mt-2">
                        <div><span className="text-blue-300">for</span> subject, grade <span className="text-blue-300">in</span> grades.items():</div>
                        <div className="ml-4"><span className="text-purple-300">print</span>(<span className="text-yellow-300">f"</span>{"{subject}"}: {"{grade}"}<span className="text-yellow-300">"</span>)</div>
                        <div className="mt-2"></div>
                        <div className="text-yellow-300"># Вывод:</div>
                        <div className="text-yellow-300"># Math: 5</div>
                        <div className="text-yellow-300"># English: 4</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
                    <AlertCircle size={24} />
                    Важно!
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      При переборе с <code className="bg-yellow-200 px-2 py-1 rounded">.items()</code> получаешь <strong>две переменные</strong>:
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-red-600 font-bold mb-2">❌ Неправильно:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div><span className="text-blue-300">for</span> item <span className="text-blue-300">in</span> dict.items():</div>
                            <div className="ml-4"><span className="text-purple-300">print</span>(item)</div>
                            <div className="text-gray-400"># Выведет кортеж</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-green-600 font-bold mb-2">✓ Правильно:</div>
                          <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs">
                            <div><span className="text-blue-300">for</span> key, value <span className="text-blue-300">in</span> dict.items():</div>
                            <div className="ml-4"><span className="text-purple-300">print</span>(key, value)</div>
                            <div className="text-gray-400"># Распаковка!</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 6: Вложенные структуры */}
          {activeSection === 6 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">🗂️ Вложенные структуры</h2>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Словари внутри словарей</h3>
                  <p className="text-gray-700 mb-4">
                    Можно создавать сложные структуры данных, вкладывая словари и списки друг в друга.
                  </p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div>player = {"{"}</div>
                    <div className="ml-4"><span className="text-yellow-300">"name"</span>: <span className="text-yellow-300">"Hero"</span>,</div>
                    <div className="ml-4"><span className="text-yellow-300">"level"</span>: 5,</div>
                    <div className="ml-4"><span className="text-yellow-300">"inventory"</span>: [<span className="text-yellow-300">"sword"</span>, <span className="text-yellow-300">"shield"</span>],</div>
                    <div className="ml-4"><span className="text-yellow-300">"stats"</span>: {"{"}</div>
                    <div className="ml-8"><span className="text-yellow-300">"hp"</span>: 100,</div>
                    <div className="ml-8"><span className="text-yellow-300">"mp"</span>: 50</div>
                    <div className="ml-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Доступ к вложенным данным</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                      <div><span className="text-gray-400"># Простые данные</span></div>
                      <div><span className="text-purple-300">print</span>(player[<span className="text-yellow-300">"name"</span>])   <span className="text-gray-400"># Hero</span></div>
                      <div><span className="text-purple-300">print</span>(player[<span className="text-yellow-300">"level"</span>])  <span className="text-gray-400"># 5</span></div>
                    </div>

                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                      <div><span className="text-gray-400"># Элемент из списка</span></div>
                      <div><span className="text-purple-300">print</span>(player[<span className="text-yellow-300">"inventory"</span>][0])  <span className="text-gray-400"># sword</span></div>
                    </div>

                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm">
                      <div><span className="text-gray-400"># Значение из вложенного словаря</span></div>
                      <div><span className="text-purple-300">print</span>(player[<span className="text-yellow-300">"stats"</span>][<span className="text-yellow-300">"hp"</span>])  <span className="text-gray-400"># 100</span></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">💡 Интерактивная демонстрация</h3>
                  <button
                    onClick={runNestedDemo}
                    disabled={nestedDemo.running}
                    className="px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play size={20} />
                    {nestedDemo.running ? 'Запущено...' : 'Запустить демонстрацию'}
                  </button>
                  
                  {nestedDemo.output.length > 0 && (
                    <div className="mt-4 bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
                      {nestedDemo.output.map((line, i) => (
                        <div key={i} className="font-mono text-sm mb-1">
                          {line.startsWith('#') ? (
                            <span className="text-green-400">{line}</span>
                          ) : line.startsWith('→') ? (
                            <span className="text-yellow-300">{line}</span>
                          ) : (
                            <span className="text-white">{line}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">🎮 Примеры использования</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <strong>База данных пользователей</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div>users = {"{"}</div>
                        <div className="ml-4"><span className="text-yellow-300">"user123"</span>: {"{"}<span className="text-yellow-300">"name"</span>: <span className="text-yellow-300">"Alice"</span>, <span className="text-yellow-300">"age"</span>: 25{"}"},</div>
                        <div className="ml-4"><span className="text-yellow-300">"user456"</span>: {"{"}<span className="text-yellow-300">"name"</span>: <span className="text-yellow-300">"Bob"</span>, <span className="text-yellow-300">"age"</span>: 30{"}"}</div>
                        <div>{"}"}</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <strong>Каталог товаров</strong>
                      <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                        <div>store = {"{"}</div>
                        <div className="ml-4"><span className="text-yellow-300">"laptop"</span>: {"{"}<span className="text-yellow-300">"price"</span>: 1000, <span className="text-yellow-300">"stock"</span>: 5{"}"},</div>
                        <div className="ml-4"><span className="text-yellow-300">"mouse"</span>: {"{"}<span className="text-yellow-300">"price"</span>: 25, <span className="text-yellow-300">"stock"</span>: 50{"}"}</div>
                        <div>{"}"}</div>
                      </div>
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
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Задание 1: Телефонная книга ⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай программу для управления телефонной книгой с возможностью добавления, поиска и удаления контактов.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Требования:</strong>
                    <ul className="list-disc ml-6 text-gray-600 mt-2">
                      <li>Используй словарь для хранения контактов (имя: телефон)</li>
                      <li>Добавь функцию поиска по имени</li>
                      <li>Выведи все контакты в алфавитном порядке</li>
                      <li>Обработай случай, когда контакт не найден</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Задание 2: Инвентарь игры ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай систему инвентаря для RPG игры с предметами разных типов.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Структура данных:</strong>
                    <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                      <div>inventory = {"{"}</div>
                      <div className="ml-4"><span className="text-yellow-300">"weapons"</span>: [<span className="text-yellow-300">"sword"</span>, <span className="text-yellow-300">"bow"</span>],</div>
                      <div className="ml-4"><span className="text-yellow-300">"potions"</span>: [<span className="text-yellow-300">"health"</span>, <span className="text-yellow-300">"mana"</span>],</div>
                      <div className="ml-4"><span className="text-yellow-300">"gold"</span>: 150</div>
                      <div>{"}"}</div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Требования:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Добавление предметов в категории</li>
                        <li>Подсчёт количества предметов по типам</li>
                        <li>Вывод полного содержимого инвентаря</li>
                        <li>Проверка наличия конкретного предмета</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-yellow-700 mb-3">Задание 3: Статистика по данным ⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Дан список кортежей с данными о продажах: (товар, количество, цена). Посчитай статистику.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Пример данных:</strong>
                    <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                      <div>sales = [</div>
                      <div className="ml-4">(<span className="text-yellow-300">"apple"</span>, 10, 50),</div>
                      <div className="ml-4">(<span className="text-yellow-300">"banana"</span>, 5, 30),</div>
                      <div className="ml-4">(<span className="text-yellow-300">"apple"</span>, 8, 50)</div>
                      <div>]</div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Задачи:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Подсчитай общую выручку по каждому товару</li>
                        <li>Найди самый продаваемый товар (по количеству)</li>
                        <li>Посчитай общую сумму продаж</li>
                        <li>Результат сохрани в словарь</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">Задание 4: Группировка данных ⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Дан список студентов с их оценками. Сгруппируй студентов по среднему баллу.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Входные данные:</strong>
                    <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                      <div>students = [</div>
                      <div className="ml-4">(<span className="text-yellow-300">"Alice"</span>, [5, 4, 5]),</div>
                      <div className="ml-4">(<span className="text-yellow-300">"Bob"</span>, [3, 3, 4]),</div>
                      <div className="ml-4">(<span className="text-yellow-300">"Charlie"</span>, [5, 5, 5])</div>
                      <div>]</div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Требования:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Посчитай средний балл для каждого студента</li>
                        <li>Создай словарь: категория → список студентов</li>
                        <li>Категории: "Отличники" (≥4.5), "Хорошисты" (3.5-4.4), "Троечники" (&lt;3.5)</li>
                        <li>Выведи результат в читаемом формате</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Задание 5: База данных студентов ⭐⭐⭐⭐⭐</h3>
                  <p className="text-gray-700 mb-3">
                    Создай полноценную систему управления студентами с вложенными структурами.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Структура данных:</strong>
                    <div className="bg-gray-900 text-white p-2 rounded font-mono text-xs mt-2">
                      <div>database = {"{"}</div>
                      <div className="ml-4"><span className="text-yellow-300">"STU001"</span>: {"{"}</div>
                      <div className="ml-8"><span className="text-yellow-300">"name"</span>: <span className="text-yellow-300">"Alice"</span>,</div>
                      <div className="ml-8"><span className="text-yellow-300">"age"</span>: 20,</div>
                      <div className="ml-8"><span className="text-yellow-300">"grades"</span>: {"{"}<span className="text-yellow-300">"Math"</span>: [5, 4, 5], <span className="text-yellow-300">"English"</span>: [4, 4, 5]{"}"},</div>
                      <div className="ml-8"><span className="text-yellow-300">"attendance"</span>: {"{"}<span className="text-yellow-300">"present"</span>: 28, <span className="text-yellow-300">"absent"</span>: 2{"}"}</div>
                      <div className="ml-4">{"}"}</div>
                      <div>{"}"}</div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      <strong>Функционал:</strong>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Добавление нового студента</li>
                        <li>Поиск студента по ID</li>
                        <li>Расчёт среднего балла по предмету</li>
                        <li>Расчёт общего среднего балла</li>
                        <li>Процент посещаемости</li>
                        <li>Топ-3 студента по среднему баллу</li>
                        <li>Экспорт данных студента в читаемом формате</li>
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
                      <div className="text-3xl mb-2">🏗️</div>
                      <strong>Структура данных</strong>
                      <div className="text-sm text-gray-600 mt-2">Правильный выбор кортежей/словарей</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="text-3xl mb-2">📖</div>
                      <strong>Читаемость</strong>
                      <div className="text-sm text-gray-600 mt-2">Понятный и чистый код</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Секция 8: Практика с проверкой */}
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

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
              Назад
            </button>

            <span className="text-gray-600 font-medium">
              Раздел {activeSection + 1} из {sections.length}
            </span>

            <button
              onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
              disabled={activeSection === sections.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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

export default TuplesDictsLesson;