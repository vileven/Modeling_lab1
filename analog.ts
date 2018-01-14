/**
 * Лабораторная работа №1
 * Моделироавание марковской цепи
 * Аналоговый случай
 */

import * as readLine from 'readline-sync';
import {parseNumbers, isTransitionLineRight, getArrayFrom1ToN, inputInitialValues} from './common';

declare type StateObject = {state: number, minTau: number};

/**
 * Функция выбора состояния из вектора
 * @param {number[]} vect вектор – массив чисел
 * @returns {number} новое случайное состояние – по расчетам
 */
const getState: (vect: number[]) => StateObject =
		vect => {
			const taus: number[] = vect.map(el => (-1 / el) * Math.log(Math.random()) );
			const state: number = taus.indexOf(Math.min(...taus));

			return {state, minTau: taus[state]};
		};


// ввод исходных данных
const {n, initialVector, transitionMatrix}: {n: number, initialVector: number[], transitionMatrix: number[][]} =
	inputInitialValues();

// Моделирование

/**
 * Размер цепи, передается как аргумент запуска программы, по умолчанию 10
 */
const chainSize = Number(process.argv[2]) || 10;

let statePair: StateObject = getState(initialVector);
const result: StateObject[] = [statePair];

getArrayFrom1ToN(chainSize).forEach(() => {
	statePair = getState(transitionMatrix[statePair.state]);
	result.push(statePair);
});

// Вывод результата
console.log('Результат моделирования: ');
console.log(result.map(({state, minTau}) => `${state}, ${minTau}`).join('\n'));
