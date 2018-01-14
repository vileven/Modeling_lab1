/**
 *  Лабораторная работа по моделированию №1
 *  Построение марковской цепи при дискретном времени
 */

import * as readLine from 'readline-sync';

/**
 * Распарсить числа из вводной строки
 * @param {string} gotString строка
 * @param {number} dimension число необходимых чисел
 * @returns {number[]} выходной массив
 */
const parseNumbers: (gotString: string, dimension: number) => number[] =
	(gotString, dimension) => gotString.trim().split(/[\s,]+/, dimension).map(str => Number(str));

/**
 * Проверить, сумма чисел в строке матрицы переходов ~ 1
 * @param {number[]} line массив чисел строки
 * @returns {boolean} результат проверки
 */
const isTransitionLineRight: (line: number[]) => boolean =
		line => Math.abs(1 - line.reduce((sum, current) => sum + current)) < 0.1e-4;

/**
 * Возвращает массив от 1 до N включительно
 * @param {number} N крайний правый интервал
 * @returns {number[]}
 */
const getArrayFrom1ToN: (N: number) => number[] =
		N => Array.from(new Array(N),(_, index: number) => index + 1);

/**
 * Функция выбора состояния из вектора
 * @param {number[]} vect вектор – массив чисел
 * @returns {number} новое случайное состояние – по расчетам
 */
const getState: (vect: number[]) => number = vect => {
	const rnd: number = Math.random();
	let result: number = vect.length - 1;

	vect.reduce((prev, cur, index) => {
		if (prev <= rnd && rnd <= cur) {
			result = index;
		}

		return prev + cur;
	}, 0);

	return result;
};

// Ввод числа состояний
const n: number = readLine.questionInt('Введите число состояний: \n');

// Ввод начального вектора
const inputString: string   = readLine.question('Введите вектор начального состояния: \n');
const initialVector: number[] = parseNumbers(inputString, n);

if (!isTransitionLineRight(initialVector)) {
	console.log('Неправильное значение входного вектора, сумма чисел должна быть равна 1');
	process.exit(0);
}

// Ввод матрицы переходов
console.log('Введите матрицу переходов');

const transitionMatrix: number[][] = [];

getArrayFrom1ToN(n).forEach(i => {
	const inputStr: string = readLine.question(`${i} строка: `);
	const line: number[] = parseNumbers(inputStr, n);

	if (!isTransitionLineRight(line)) {
		console.log('Неправильное значение строки матрицы переходов, сумма чисел должна быть равна 1');
		process.exit(0);
	}

	transitionMatrix.push(line);
});

// Моделирование

/**
 * Размер цепи, передается как аргумент запуска программы, по умолчанию 10
 */
const chainSize = Number(process.argv[2]) || 10;

let state = getState(initialVector);
const result: number[] = [state];

getArrayFrom1ToN(chainSize).forEach(() => {
	state = getState(transitionMatrix[state]);
	result.push(state);
});

//Вывод результата
console.log('Результат моделирования: ');
console.log(result.join('-'));
