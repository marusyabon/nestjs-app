new Vue({
    el: '#app',
    userId: '5e70d00493ed583528fb7ee5',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        charts: [],
        socket: null,
        showChart: false,
        chartId: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                console.log(this.chartId)
                const message = {
                    chartId: this.chartId,
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msgToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        },
        openChart(chartId) {
            this.showChart = true;
            this.chartId = chartId;
            this.socket = io(`http://localhost:3000/messages`);
            this.socket.on('msgToClient', (message) => {
                this.receivedMessage(message)
            });
        }
    },
    async created() {
        const response = await axios.get('http://localhost:3000/charts');
        this.charts = response.data;
    }
})