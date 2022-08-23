import ApiService from './apiService.js';
import { debounce } from 'lodash';
import getTime from './TimeFormat.js';
import {getRoute} from './yandexMaps.js';
import {flsModules} from "./files/modules.js";

const api = new ApiService();

// Селекты
const selectFrom = document.querySelector('.select_from');
const selectTo = document.querySelector('.select_to');

// Инпуты полей формы
const fromInput = selectFrom.querySelector('input');
const toInput = selectTo.querySelector('input');
const inputName = document.querySelector('#name');
const inputPhone = document.querySelector('#form-2-tel');
const inputMail = document.querySelector('#mail');
const inputComment = document.querySelector('#comments');
const inputTransferComment = document.querySelector('#comments-transfer');
export const inputTime = document.querySelector('#time');
export const inputDate = document.querySelector('#date');
export const inputTimeTransfer = document.querySelector('#time-transfer');
export const inputDateTransfer = document.querySelector('#date-transfer');

// Данные формы
export const formData = {
	name: '', // Имя
	phone: '', // Телефон
	placeFrom: '', // От куда id
	placeTo: '', // Куда id
	tariffId: '', // Класс авто
	date: '', // Дата
	time: '', // Время
	adult: '', // Взрослые пассажиры
	child: '', // Дети (все дети)
	chairs: '', // Из поля 5
	cradles: '', // изп поля младенцы
	boosters: '', // Из поля 7
	email: '', // Почта
	partnerId: 123, // Любое число пока,
	destinationId: '',
	comment: '', // Комментарий
	isTest: 1, // Тестовый заказ
};

const cityNames = {
	from: '',
	to: '',
};

const childrenData = {
	seven: 0,
	five: 0,
	baby: 0,
};

export const transferData = {
	adult: 0,
	seven: 0,
	five: 0,
	baby: 0,
	comment: '',
	child: '',
	chairs: '',
	boosters: '',
	cradles: '',
	date: '',
	time: '',
};

//Слушатели полей формы
fromInput.addEventListener('input', debounce(getCity, 500));
toInput.addEventListener('input', debounce(getCity, 500));
inputName.addEventListener('input', (e) => inputSaveData(e, 'name'));
inputPhone.addEventListener('input', (e) => inputSaveData(e, 'phone'));
inputMail.addEventListener('input', (e) => inputSaveData(e, 'email'));
inputComment.addEventListener('input', (e) => inputSaveData(e, 'comment'));
inputTransferComment.addEventListener('input', (e) => inputSaveData(e, 'comment-transfer'));

//Глобальный слушатель
document.addEventListener('click', function (e) {
	let target = e.target;
	if (target.classList.contains('select__option') && target.closest('.select_from')) {
		formData.placeFrom = target.dataset.value;
		cityNames.from = target.textContent;
		checkForm_1();
	}
	if (target.classList.contains('select__option') && target.closest('.select_to')) {
		formData.placeTo = target.dataset.value;
		cityNames.to = target.textContent;
		checkForm_1();
	}
	if (target.classList.contains('select__option') && target.closest('.select_class')) {
		formData.tariffId = target.dataset.value;
		checkForm_1();
	}
	if (target.classList.contains('select__option') && target.closest('.select_adult')) {
		formData.adult = target.dataset.value;
		checkForm_3();
	}
	if (target.classList.contains('select__option') && target.closest('.select_seven-years')) {
		childrenData.seven = target.dataset.value;
		checkForm_3();
	}
	if (target.classList.contains('select__option') && target.closest('.select_five-years')) {
		childrenData.five = target.dataset.value;
		checkForm_3();
	}
	if (target.classList.contains('select__option') && target.closest('.select_baby')) {
		childrenData.baby = target.dataset.value;
		checkForm_3();
	}
	if (target.classList.contains('select__option') && target.closest('.select_adult-transfer')) {
		transferData.adult = target.dataset.value;
		checkForm_4();
	}
	if (target.classList.contains('select__option') && target.closest('.select_seven-years-transfer')) {
		transferData.seven = target.dataset.value;
		checkForm_4();
	}
	if (target.classList.contains('select__option') && target.closest('.select_five-years-transfer')) {
		transferData.five = target.dataset.value;
		checkForm_4();
	}
	if (target.classList.contains('select__option') && target.closest('.select_baby-transfer')) {
		transferData.baby = target.dataset.value;
		checkForm_4();
	}
	if (target.classList.contains('form-1__btn') && !target.classList.contains('disabled')) {
		nextFormStep(1, 2);
	}
	if (target.classList.contains('form-2__btn') && !target.classList.contains('disabled')) {
		nextFormStep(2, 3);
	}
	if (
		target.classList.contains('form-3__transfer') ||
		target.classList.contains('_icon-dropdown_plus') ||
		target.classList.contains('transfer-form-3__text')
	) {
		nextFormStep(3, 4);
	}
	if (target.classList.contains('form-2__arrow')) {
		nextFormStep(2, 1);
	}
	if (target.classList.contains('form-3__arrow')) {
		nextFormStep(3, 2);
	}
	if (target.classList.contains('form-4__arrow')) {
		nextFormStep(4, 3);
	}
	if (
		target.classList.contains('form-3__transfer') ||
		target.classList.contains('_icon-dropdown_plus') ||
		target.classList.contains('transfer-form-3__text')
	) {
		nextFormStep(3, 4);
	}
	if (target.classList.contains('form-3__btn')) {
		api.sendOrder();
	}
	if (target.classList.contains('form-4__btn')) {
		api.sendOrder(true);
	}
});

//---------------------------------------------------------------------------------------------------------------------
// Функции

// Данные города
function getCity(e) {
	let value = e.target.value;
	let select = e.target.closest('.select');
	api.getCities(value).then((data) => fillSelect(data.cities, select));
}

// Заполнение селекта
function fillSelect(data, select) {
	const container = select.querySelector('.simplebar-content');
	const selOptions = data.map((el) => `<option value="${el.id}">${el.text}</option>`);
	if (data.length) {
		container.innerHTML = '';
		select.querySelector('select').innerHTML = '';
		select.querySelector('select').insertAdjacentHTML('beforeend', selOptions.join(''));
		const result = data.map((el) => `<button class="select__option" data-value="${el.id}" type="button">${el.text}</button>`);
		container.insertAdjacentHTML('afterbegin', result.join('\n'));
	} else {
		container.innerHTML = '';
		container.insertAdjacentHTML('afterbegin', `<p class="no-select">Ничего не найдено</p>`);
	}
}

// Заполнение данных о поездке
function fillRideInfo(data) {
	document.querySelectorAll('.results-form-1').forEach((el) => {
		el.querySelector('.cash-num').textContent = `${data.price}р`;
		el.querySelector('.distance-num').textContent = `${data.distance} КМ`;
		el.querySelector('.time-num').textContent = `${getTime(data.time)}`;
	});
	formData.destinationId = data.id;
}

// Переключение кнопки формы
function toggleFormButton(formNumber) {
	document.querySelector(`.form-${formNumber}__btn`).classList.remove('disabled');
}

// Переключение формы
function nextFormStep(disableForm, activeForm) {
	document.querySelector(`.form-${disableForm}`).classList.add('form-disable');
	document.querySelector(`.form-${activeForm}`).classList.remove('form-disable');
}

// Запись данных с инпутов
function inputSaveData(event, field) {
	let value = event.target.value;
	if (field === 'name') {
		value ? event.target.classList.add('inp-active') : event.target.classList.remove('inp-active');
		formData.name = value;
		checkForm_2();
	}
	if (field === 'phone') {
		value ? event.target.classList.add('inp-active') : event.target.classList.remove('inp-active');
		value = value.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
		formData.phone = value;
		checkForm_2();
	}
	if (field === 'email') {
		value ? event.target.classList.add('inp-active') : event.target.classList.remove('inp-active');
		formData.email = value;
		checkForm_2();
	}
	if (field === 'comment') {
		value ? event.target.classList.add('inp-active') : event.target.classList.remove('inp-active');
		formData.comment = value;
		checkForm_3();
	}
	if (field === 'comment-transfer') {
		value ? event.target.classList.add('inp-active') : event.target.classList.remove('inp-active');
		transferData.comment = value;
		checkForm_4();
	}
}

// Отображение маршрута на карте
function showRoute() {
	const { from, to } = cityNames;

	if (from && to) {
		getRoute(from, to);
	}
}

// Проверка заполненных полей формы 1
function checkForm_1() {
	const from = document.querySelector('.select_from input').getAttribute('placeholder');
	const to = document.querySelector('.select_to input').getAttribute('placeholder');
	const carClass = document.querySelector('.select_class input').getAttribute('placeholder');
	document.querySelector('.select_from input').addEventListener('input', debounce(getCity, 500));
	document.querySelector('.select_to input').addEventListener('input', debounce(getCity, 500));

	if (carClass !== 'Выберите класс авто' && from !== 'Введите название города...' && to !== 'Введите название города...') {
		showRoute();
		const { placeFrom, placeTo, tariffId } = formData;
		api.getRideInfo(placeFrom, placeTo, tariffId).then(({ destination }) => fillRideInfo(destination));
		toggleFormButton(1);
	}
}

// Проверка заполненных полей формы 2
export function checkForm_2() {
	const name = document.querySelector('#name').value;
	const tel = document.querySelector('#form-2-tel').value;
	const mail = document.querySelector('#mail').value;
	const time = document.querySelector('#time').value;
	const date = document.querySelector('#date').value;

	if (name && tel && time && date) {
		toggleFormButton(2);
	}
}

// Проверка заполненных полей формы 3
function checkForm_3() {
	const { adult } = formData;
	const { seven, five, baby } = childrenData;

	if (adult) {
		formData.child = String(Number(seven) + Number(five) + Number(baby));
		formData.boosters = String(seven);
		formData.chairs = String(five);
		formData.cradles = String(baby);
		toggleFormButton(3);
	}
}

// Проверка заполненных полей формы 4
export function checkForm_4() {
	const { adult, seven, five, baby, time, date } = transferData;

	if (adult && time && date) {
		transferData.child = String(Number(seven) + Number(five) + Number(baby));
		transferData.boosters = String(seven);
		transferData.chairs = String(five);
		transferData.cradles = String(baby);
		toggleFormButton(4);
	}
}
