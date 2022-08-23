import axios from 'axios';
import { formData, transferData } from './formLogic.js';
import { flsModules } from './files/modules.js';

class ApiService {
	#url = 'https://vl-taxi.ru/';

	async getCities(city) {
		const result = await axios.get(`${this.#url}cities?city=${city}&raw=1`);
		return await result.data;
	}

	async getRideInfo(from, to, carClass) {
		const result = await axios.get(`${this.#url}getDestination?placeFrom=${from}&placeTo=${to}&tariff=${carClass}`);
		return await result.data;
	}

	sendOrder(transfer) {
		if (transfer) {
			const { adult, comment, child, chairs, boosters, cradles, date, time } = transferData;
			const { placeFrom: fromCity, placeTo: toCity } = formData;
			console.log(fromCity, toCity);
			let data = {
				...formData,
				placeFrom: toCity,
				placeTo: fromCity,
				adult: adult,
				child: child,
				boosters: boosters,
				chairs: chairs,
				cradles: cradles,
				comment: comment,
				date: date,
				time: time,
			};
			$.ajax({
				type: 'POST',
				url: `https://vl-taxi.ru/order/addWithCost`,
				data: data,
			});
		}
		$.ajax({
			type: 'POST',
			url: `https://vl-taxi.ru/order/addWithCost`,
			data: formData,
			success: function (data) {
				data = JSON.parse(data);
				console.log(typeof data.status);
				data.status === false ? flsModules.popup.open('#popup-error') : flsModules.popup.open('#popup');
			},
		});
	}
}

export default ApiService;
