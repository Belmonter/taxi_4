import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const formDate = new AirDatepicker('#date', {
  isMobile: true,
})

const formTime = new AirDatepicker('#time', {
  timepicker: true,
  onlyTimepicker: true,
  minutesStep: 5,
  isMobile: true,
})