new Vue({
    el: '#app',
    userId: '5e70d00493ed583528fb7ee5',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        charts: [],
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
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
        }
    },
    async created() {
        const response = await axios.get('http://localhost:3000/charts');
        console.log(response.data)
        this.charts = response.data;

        this.socket = io('http://localhost:3000/messages');
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})