import * as readLine from 'readline-sync';

/**
 * Распарсить числа из вводной строки
 * @param {string} gotString строка
 * @param {number} dimension число необходимых чисел
 * @returns {number[]} выходной массив
 */
export const parseNumbers: (gotString: string, dimension: number) => number[] =
	(gotString, dimension) => gotString.trim().split(/[\s,]+/, dimension).map(str => Number(str));

/**
 * Проверить, сумма чисел в строке матрицы переходов ~ 1
 * @param {number[]} line массив чисел строки
 * @returns {boolean} результат проверки
 */
export const isTransitionLineRight: (line: number[]) => boolean =
	line => Math.abs(1 - line.reduce((sum, current) => sum + current)) < 0.1e-4;

/**
 * Возвращает массив от 1 до N включительно
 * @param {number} N крайний правый интервал
 * @returns {number[]}
 */
export const getArrayFrom1ToN: (N: number) => number[] =
	N => Array.from(new Array(N),(_, index: number) => index + 1);


export const inputInitialValues: () => {n: number, initialVector: number[], transitionMatrix: number[][]} =
	() => {
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

		return {n, initialVector, transitionMatrix};
	};