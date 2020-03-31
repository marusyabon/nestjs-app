new Vue({
    el: '#app',
    userId: '5e70d00493ed583528fb7ee5',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        chats: {},
        socket: null,
        showChat: false,
        chatName: '',
        chatId: null,
        chatsArr: [],
        messages: []
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text,
                    date: new Date()
                }
                if (this.chatId) {
                    this.socket.emit('msgToServer', {chatId: this.chatId, message});
                }
                else {
                    console.log(this.userId);
                    const chatId = this.socket.emit('msgToServer', {name: this.chatName, user: this.userId, message});
                    console.log(chatId);
                }
                
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.chats[this.chatId][messages].push(message);
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        },
        async openChat(chatId) {
            if (chatId) {
                this.chatId = chatId;
                const response = await axios.get(`http://localhost:3000/chats/${chatId}`);
                const {data: {name, messages}} = response;
                this.chatName = name;
                this.chats[chatId].messages = [];
                this.chats[chatId].messages.push(...messages);
                console.log(this.chats[chatId]);
                this.messages = [...messages];
            }
        },
        async addChat() {
            this.openChat();
        },
        async showList() {
            this.chatName = '';
            this.chatId = '';
        },
        async getAllChats() {
            const response = await axios.get('http://localhost:3000/chats');
            this.chatsArr = response.data;
            response.data.forEach((el) => {
                this.chats[el._id] = {name: el.name};
            });
        },
        async removeChat(chatId, event) {
            event.stopPropagation();
            await axios.delete(`http://localhost:3000/chats/${chatId}`);
            delete this.chats.chatId;
        }
    },
    async created() {
        this.socket = io(`http://localhost:3000/chats`);
        const chatId = this.chatId;
        this.socket.on(`msgToClient_${chatId}`, ({name, users, message}) => {
            const chats  = this.chats;
            // if chat is new
            if (!chats.chatId) {
                chats.chatId = {name, messages: [message]};
            }
            else {
                this.receivedMessage(message);
            }
        });
        // this.socket.on('newChat', (chat) => {
        //     console.log('You have new chat');
            
        //     this.chats.push(chat)
        // });
        this.socket.on('chat-removed', (chatId) => {
            delete this.chats.chatId;
        });
        await this.getAllChats();
    }
})