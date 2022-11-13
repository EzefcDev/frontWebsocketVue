<template>
    <div class="container ">
        <login 
        class="d-flex justify-content-center m-3"
        v-on:logged="exist = $event"
        ></login>
        <div v-if="exist.userName">
            <send-message 
            :data=exist
            ></send-message>
            <reception-message :data=exist ></reception-message>
        </div>
    </div>
</template>

<script>
import Login from './components/Login.vue';
import ReceptionMessage from './components/ReceptionMessage.vue';
import SendMessage from './components/SendMessage.vue';

export default {
    name: 'App',
    components: {
        Login,
        SendMessage,
        ReceptionMessage
    },
    data(){
        return{
          exist:{}
        }
    }
}
</script>


