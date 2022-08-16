ymaps.ready(init);
let myMap;
let myCollectionPoint;

function init() {
	// Создание карты.
	myMap = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.753994, 37.622093],
		options: {
			scroll: false,
		},
		controls: [],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 12,
	});
	myMap.behaviors.disable('scrollZoom');
	myMap.behaviors.disable('drag');
	myCollectionPoint = new ymaps.GeoObjectCollection();
}

export function getRoute(from, to) {
	myCollectionPoint.removeAll();

	const multiRoute = new ymaps.multiRouter.MultiRoute(
		{
			// Описание опорных точек мультимаршрута.
			referencePoints: [from, to],
			// Параметры маршрутизации.
			params: {
				// Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
				results: 1,
			},
		},
		{
			// Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
			boundsAutoApply: true,
		}
	);
	myCollectionPoint.add(multiRoute);
	myMap.geoObjects.add(myCollectionPoint);
}
