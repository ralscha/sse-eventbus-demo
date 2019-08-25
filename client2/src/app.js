import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import uuidv4 from 'uuid/v4';

export default class App {
    constructor() {
        this.names = ['s1', 's2', 's3', 's4', 's5'];
        this.gauges = [];

        const threshold = [0.1, 0.2, 0.7, 0.5, 0.9];

        for (let [index, name] of this.names.entries()) {
            const chart = echarts.init(document.getElementById('chart' + (index + 1)));
            chart.setOption(this.getChartOption(name, threshold[index]));
            this.gauges.push(chart);
        }
    }

    start() {
        this.eventSource = new EventSource(`http://localhost:8080/ssespring/register/${uuidv4()}`);
        this.eventSource.addEventListener('message', this.onMessage.bind(this), false);
        this.eventSource.onerror = this.onError;
        this.eventSource.onopen = this.onOpen;
    }

    stop() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    onMessage(response) {
        const splitted = response.data.split('\n');
        for (const line of splitted) {
            this.handleResponse(JSON.parse(line));
        }
    }

    onError() {
        console.log("Error occurred");
    }

    onOpen() {
        console.log("Connection to server opened");
    }

    handleResponse(data) {
        for (const [index, gauge] of this.gauges.entries()) {
            gauge.setOption({
                series: {
                    data: [{
                        name: this.names[index],
                        value: data[index]
                    }]
                }
            });
        }
    }

    getChartOption(name, threshold) {
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


}
