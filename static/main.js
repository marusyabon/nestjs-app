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
        chatName: '',
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
        async openChat(chatId) {
            this.showChat = true;
            this.chatId = chatId;
            const {data: {name, messages}} = await axios.get(`http://localhost:3000/chats/${chatId}`);
            this.chatName = name;
            this.messages.push(...messages);

            this.socket = io(`http://localhost:3000/chats/${chatId}`);
            this.socket.on('msgToClient', (message) => {
                this.receivedMessage(message)
            });
        },
        async addChat() {
            const response = await axios.post('http://localhost:3000/chats', {name: this.chatName});

            if (response) {
                this.chatName = response.data.name;
                this.openChat(response.data.id);
            }
            console.log(name);
        },
        async showList() {
            this.chatName = '';
            await this.getAllChats();
            this.showChat = false;
        },
        async getAllChats() {
            const response = await axios.get('http://localhost:3000/chats');
            this.chats = response.data;
        },
        async removeChat(chatId, event) {
            event.stopPropagation();
            await axios.delete(`http://localhost:3000/chats/${chatId}`);
            await this.getAllChats();
        }
    },
    async created() {
        await this.getAllChats();
    }
})