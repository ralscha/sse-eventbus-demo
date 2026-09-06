import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GaugeChart, CanvasRenderer]);

const CLIENT_ID_KEY = 'sse-eventbus-demo-client-id';

export default class App {
    constructor() {
        this.names = ['s1', 's2', 's3', 's4', 's5'];
        this.gauges = [];

        const threshold = [0.1, 0.2, 0.7, 0.5, 0.9];

        for (const [index, name] of this.names.entries()) {
            const chart = echarts.init(document.getElementById('chart' + (index + 1)));
            chart.setOption(this.getChartOption(name, threshold[index]));
            this.gauges.push(chart);
        }
    }

    start() {
        const clientId = sessionStorage.getItem(CLIENT_ID_KEY) ?? crypto.randomUUID();
        sessionStorage.setItem(CLIENT_ID_KEY, clientId);

        this.eventSource = new EventSource(`/register/${clientId}`);
        this.eventSource.addEventListener('message', this.onMessage.bind(this), false);
        this.eventSource.addEventListener('dto', event => {
            console.log('DTO event:', JSON.parse(event.data));
        });
        this.eventSource.onerror = () => this.setConnectionStatus('Reconnecting…');
        this.eventSource.onopen = () => this.setConnectionStatus('Connected');

        window.addEventListener('pagehide', () => this.stop(), { once: true });
        window.addEventListener('resize', () => {
            for (const gauge of this.gauges) {
                gauge.resize();
            }
        });
    }

    stop() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    onMessage(response) {
        try {
            const values = JSON.parse(response.data);
            if (!Array.isArray(values) || values.length !== this.gauges.length
                    || !values.every(Number.isFinite)) {
                throw new TypeError('Expected five numeric gauge values');
            }
            this.handleResponse(values);
        }
        catch (error) {
            console.error('Ignoring invalid SSE payload', error);
        }
    }

    setConnectionStatus(status) {
        document.getElementById('connection-status').textContent = status;
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
                    value: 0,
                    name: name
                }],
                title: {
                    show: true,
                    offsetCenter: ['-100%', '-90%'],
                    color: '#333',
                    fontSize: 15
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
                        color: 'inherit'
                    }
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        color: 'inherit'
                    }
                },
                detail: {
                    show: true,
                    offsetCenter: ['100%', '-100%'],
                    color: 'inherit',
                    fontSize: 25
                }

            }]
        };
    }


}
