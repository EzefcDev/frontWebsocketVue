<template>
    <div class="container">
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Login User</h5>
                <p class="card-text">Logueate para usar la mensajeria</p>
                <div class="input-group mb-3">
                    <input 
                    v-model="dni"
                    type="text" 
                    class="form-control" 
                    placeholder="Ingresa tu DNI" 
                    >
                </div>
                <a href="#" class="btn btn-primary" @click="login">Login</a>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data(){
        return{
            dni:'',
            logged: {}
        }
    },
    methods:{
        async login(){
            this.$store.dispatch('getUserDni', this.dni)
            try {
                const data = await fetch(`http://localhost:8080/login/${this.dni}`,{
                method: "GET",
                headers:{
                    "Content-type" : "application/json"
                },     
                })
                const resp = await data.json();
                this.logged = resp
                this.logged.dni = this.dni
                this.$emit('logged', this.logged)
            } catch (error) {
                this.logged = {}
                this.$emit('logged', this.logged)
                throw error
            }
        }
    }
}

</script>
