<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Mensaje</th>
                <th scope="col">De</th>
                <th scope="col">Leido</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data , i) in datas" :key="i">
                <th scope="row">{{i + 1}}</th>
                <td>{{data.message}}</td>
                <td>{{data.username}}</td>
                <td>{{data.isView}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { mapState } from "vuex";

export default {
    props:['data'],
    data(){
        return{
           datas: []
        }
    },
    computed:{
        ...mapState(['userDni'])
    },
    methods:{
        async messages(){
            try{
                const resp = await fetch(`http://localhost:8080/message/${this.userDni}`,{ 
                method: "GET",
                headers:{
                    "Content-type" : "application/json"
                },     
            })
          this.datas = await resp.json()
            }catch(error){
                console.log(error);
            }
        },
        send() {
            console.log("Send message");
            if (this.stompClient && this.stompClient.connected) {
                const msg = { name: 'enviado' };
                this.stompClient.send("/app/hello", JSON.stringify(msg), {});
            }
        },
        connect() {
            this.socket = new SockJS("http://localhost:8080/gs-guide-websocket");
            this.stompClient = Stomp.over(this.socket);
            this.stompClient.connect(
                {},
                () => {
                this.connected = true;
                this.stompClient.subscribe("/topic/greetings", () => {
                    this.messages();
                });
                },
                error => {
                console.log(error);
                this.connected = false;
                }
            );
        },
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
            this.connected = false;
        },
    },
    async mounted(){
       await this.messages();
       this.connect();
    }
}
</script>