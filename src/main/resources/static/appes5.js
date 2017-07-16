'use strict';

function getChartOption(name, threshold) {
	return {
		series: [{
			startAngle: 180,
			endAngle: 0,
			center: ['50%', '90%'],
			radius: 100,
			min: 0,
			max: 30,
			name: 'Serie',
			type: 'gauge',
			splitNumber: 3,
			data: [{
				value: 16,
				name: name
			}],
			title: {
				show: true,
				offsetCenter: ['-100%', '-90%'],
				textStyle: {
					color: '#333',
					fontSize: 15
				}
			},
			axisLine: {
				lineStyle: {
					color: [[threshold, '#ff4500'], [1, 'lightgreen']],
					width: 8
				}
			},
			axisTick: {
				length: 11,
				lineStyle: {
					color: 'auto'
				}
			},
			splitLine: {
				length: 15,
				lineStyle: {
					color: 'auto'
				}
			},
			detail: {
				show: true,
				offsetCenter: ['100%', '-100%'],
				textStyle: {
					color: 'auto',
					fontSize: 25
				}
			}

		}]

	};
}

var names = ['s1', 's2', 's3', 's4', 's5'];
var threshold = [0.1, 0.2, 0.7, 0.5, 0.9];
var gauges = [];

for (var i = 0; i < names.length; i++) {
	var chart = echarts.init(document.getElementById('chart' + (i + 1)));
	chart.setOption(getChartOption(names[i], threshold[i]));
	gauges.push(chart);
}

var uuid = uuid.v4();
var eventSource;

window.onbeforeunload = function () {
	if (eventSource) {
		eventSource.close();
	}
};

eventSource = new EventSource('/register/' + uuid);
eventSource.addEventListener('message', function (response) {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = response.data.split('\n')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var line = _step.value;

			handleResponse(JSON.parse(line));
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}, false);

function handleResponse(data) {
	for (var _i = 0; _i < 5; _i++) {
		gauges[_i].setOption({
			series: {
				data: [{
					name: names[_i],
					value: data[_i]
				}]
			}
		});
	}
}