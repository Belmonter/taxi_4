import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { checkForm_2, checkForm_4, formData, inputDate, inputDateTransfer, inputTime, inputTimeTransfer, transferData } from './formLogic.js';

new AirDatepicker('#date', {
	isMobile: true,
	autoClose: true,
	onSelect(date) {
		formData.date = date.formattedDate;
		inputDate.value = date.formattedDate;
		inputDate.classList.add('inp-active');
		checkForm_2();
	},
});

// new AirDatepicker('#time', {
// 	timepicker: true,
// 	onlyTimepicker: true,
// 	minutesStep: 5,
// 	onSelect(date) {
// 		formData.time = date.formattedDate;
// 		inputTime.value = date.formattedDate;
// 		inputTime.classList.add('inp-active');
// 		checkForm_2();
// 	},
// });

$(document).ready(function () {
	$('#time').datetimepicker({
		datepicker: false,
		format: 'H:i',
		step: 5,
		minTime: 0,
		onSelectTime: function (current_time, $input) {
			const result = $('#time').datetimepicker('getValue');
			formData.time = `${result.getHours()}:${result.getMinutes()}`;
			inputTime.value = `${result.getHours()}:${result.getMinutes()}`;
			inputTime.classList.add('inp-active');
			console.log(inputTime.value);
			checkForm_2();
		},
	});
});

new AirDatepicker('#date-transfer', {
	isMobile: true,
	autoClose: true,
	onSelect(date) {
		transferData.date = date.formattedDate;
		inputDateTransfer.value = date.formattedDate;
		checkForm_4();
	},
});

// new AirDatepicker('#time-transfer', {
// 	timepicker: true,
// 	onlyTimepicker: true,
// 	minutesStep: 5,
// 	onSelect(date) {
// 		transferData.time = date.formattedDate;
// 		inputTimeTransfer.value = date.formattedDate;
// 		checkForm_4();
// 	},
// });

$(document).ready(function () {
	$('#time-transfer').datetimepicker({
		datepicker: false,
		format: 'H:i',
		step: 5,
		minTime: 0,
		onSelectTime: function (current_time, $input) {
			const result = $('#time-transfer').datetimepicker('getValue');
			transferData.time = `${result.getHours()}:${result.getMinutes()}`;
			inputTimeTransfer.value = `${result.getHours()}:${result.getMinutes()}`;
			checkForm_4();
		},
	});
});