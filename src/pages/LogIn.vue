<template>
    <section>
            <div class="ui segment grey sign-form">
                <h2 class="ui header ">¡Bienvenido al servicio de Geolocalización 🌎!</h2>
                <div class="ui message red big" v-show="errors.length">
                    <li v-for="(error , index) in errors" :key="index">{{error}}</li>
                </div>
                <form class="ui form" @submit="signUpButtonPressed" novalidate>
                    <div class="ui stacked segment">
                    
                         <div class="field">
                            <div class="ui left icon input big">
                                <i class="user icon"></i>
                                <input type="text" name="" id="" placeholder="Ingrese nombre completo" v-model="user.name">
                            </div>
                        </div>

                    <!-- Email Completo -->
                        <div class="field">
                            <div class="ui left icon input big">
                                <i class="mail icon"></i>
                                <input type="email" name="" id="" placeholder="Ingrese un email valido" v-model="user.email">

                            </div>
                            
                        </div>

                         <!-- Email Completo -->
                        <!-- <div class="field">
                            <div class="ui left icon input big">
                                <i class="lock icon"></i>
                                <input type="password" name="" id="" placeholder="Contraseña" v-model="user.password">

                            </div>
                            
                        </div> -->
                        
                    <button class="ui button big fluid">Ingresar</button>

                    </div>
                </form>
            </div>
                
    </section>
</template>


<script>
export default{
    data()
    {
        return {
            user:{
                name: "",
                email: "",
                password: ""
            },
            errors: []
        }
    },
    methods: {
        signUpButtonPressed(event){

           this.errors = [];

            if(!this.user.name) {
                // console.log("Nombre está vacío");
                this.errors.push("Nombre está vacío");
            }
            if(!this.user.email ) {
                this.errors.push("Email está vacio");
            }
              else{
                if(!this.validateEmail(this.user.email)){
                     this.errors.push("El Email No tiene una estructura correcta 🧐");
                }
            }
            // if(!this.user.password) {
            //     this.errors.push("Contraseña está vacio");
            // }
            // else{
            //      if(this.user.password.length < 8 ) {
            //     this.errors.push("La contraseña debe debe contener al menos 8 caracteres");
            // }
            // }
            if(this.errors.length==0) {
               return this.$router.push('/userlocation');
            }

            console.log(this.errors)
        },
    validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
    }
}
</script>



<style>
section {
    height: 100vh;
    background-color: #ececec;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign-form {
    width: 450px; 
    text-align: center;
}
.ui.button {
    background-color: #ff5a5f;
    color: white;
    /* width: 300px; */
}

</style>
