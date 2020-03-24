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
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msgToServer', {chatId: this.chatId, message})
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

            // this.socket = io(`http://localhost:3000/chats/${chatId}`);
            this.socket.on(`msgToClient_${chatId}`, (message) => {
                this.receivedMessage(message)
            });
        },
        async addChat() {
            const chatData = {chatName: this.chatName, users: ['5e70d00493ed583528fb7ee5', '5e71046397a8d930b85d0d94']};
            this.socket.emit('createChat', chatData)

            this.openChat(response.data.id);
        },
        async showList() {
            this.chatName = '';
            this.showChat = false;
        },
        async getAllChats() {
            const response = await axios.get('http://localhost:3000/chats');
            this.chats = response.data;
            console.log(this.chats);
        },
        async removeChat(chatId, event) {
            event.stopPropagation();
            await axios.delete(`http://localhost:3000/chats/${chatId}`);
            await this.getAllChats();
        }
    },
    async created() {
        this.socket = io(`http://localhost:3000/chats`);
        this.socket.on('newChat', (chat) => {
            console.log('You have new chat');
            
            this.chats.push(chat)
        });
        this.socket.on('chat-removed', (chatId) => {
            console.log(chatId);
            const chatIndex = this.chats.findIndex(el => el._id === chatId);
            this.chats.splice(chatIndex, 1);
        });
        await this.getAllChats();
    }
})