<template>
    <div class="container">
        <h3> Hola {{data.userName}}</h3>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Ingrese el dni del destino</label>
            <input v-model="dniDestination" type="text" class="form-control" id="exampleFormControlInput1" placeholder="DNI">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Escriba su mensaje</label>
            <textarea v-model="messageText" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
         <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3" @click="sendConnect">Enviar</button>
        </div>
        {{sendOk}}
    </div>
</template>

<script>
import ReceptionMessageVue from './ReceptionMessage.vue';

export default {
    props:['data'],
    data(){
        return{
            dniDestination:'',
            messageText:'',
            sendOk: ''
        }
    },
    methods:{
        async send(){
            const message = {
                userDni : this.data.dni,
                messageText : this.messageText,
                targetUser : this.dniDestination,
                viewed : false
            }
            console.log(message);
            const resp = await fetch('http://localhost:8080/message',{
                method: "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(message)    
            })
            this.sendOk = await resp.text();
            this.dniDestination = '';
            this.messageText = '';
            setTimeout(()=>{
                this.sendOk = ''
            ReceptionMessageVue.methods.send();
            },500)
        },
        sendConnect() {
            ReceptionMessageVue.methods.connect();
            this.send();
        },
    }
}
</script>