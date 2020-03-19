new Vue({
    el: '#app',
    userId: '5e70d00493ed583528fb7ee5',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        chats: [],
        socket: null,
        showChat: false,
        chatId: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    chatId: this.chatId,
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
        openChat(chatId) {
            this.showChat = true;
            this.chatId = chatId;
            this.socket = io(`http://localhost:3000/chats/${chatId}`);
            this.socket.on('msgToClient', (message) => {
                this.receivedMessage(message)
            });
        }
    },
    async created() {
        const response = await axios.get('http://localhost:3000/chats');
        this.chats = response.data;
    }
})