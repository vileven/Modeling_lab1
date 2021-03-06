/**
 *  Лабораторная работа по моделированию №1
 *  Построение марковской цепи при дискретном времени
 */

import * as readLine from 'readline-sync';
import {parseNumbers, isTransitionLineRight, getArrayFrom1ToN, inputInitialValues} from './common';

/**
 * Функция выбора состояния из вектора
 * @param {number[]} vect вектор – массив чисел
 * @returns {number} новое случайное состояние – по расчетам
 */
const getState: (vect: number[]) => number =
		vect => {
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

// ввод исходных данных
const {n, initialVector, transitionMatrix}: {n: number, initialVector: number[], transitionMatrix: number[][]} =
	inputInitialValues();

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

// Вывод результата
console.log('Результат моделирования: ');
console.log(result.join('-'));
