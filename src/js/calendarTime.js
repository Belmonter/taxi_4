import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import {
	checkForm_2,
	checkForm_4,
	formData,
	formDataTransfer,
	inputDate,
	inputDateTransfer,
	inputTime,
	inputTimeTransfer,
	transferData
} from './formLogic.js';

new AirDatepicker('#date', {
	isMobile: true,
	onSelect(date) {
		formData.date = date.formattedDate;
		inputDate.value = date.formattedDate;
		inputDate.classList.add('inp-active');
		checkForm_2();
	},
});

new AirDatepicker('#time', {
	timepicker: true,
	onlyTimepicker: true,
	minutesStep: 5,
	isMobile: true,
	onSelect(date) {
		formData.time = date.formattedDate;
		inputTime.value = date.formattedDate;
		inputTime.classList.add('inp-active');
		checkForm_2();
	},
});

new AirDatepicker('#date-transfer', {
	isMobile: true,
	onSelect(date) {
		transferData.date = date.formattedDate
		inputDateTransfer.value = date.formattedDate;
		checkForm_4();
	},
});

new AirDatepicker('#time-transfer', {
	timepicker: true,
	onlyTimepicker: true,
	minutesStep: 5,
	isMobile: true,
	onSelect(date) {
		transferData.time = date.formattedDate;
		inputTimeTransfer.value = date.formattedDate;
		checkForm_4();
	},
});