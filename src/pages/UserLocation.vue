r<template>
    <!-- <h1>User Location Page</h1> -->
    <div class="column">
        <section class="ui  column centered grid" style="position:relative;z-index:1;"> 
            <div class="column">
                <form class="ui segment large form">
                    <div class="ui message red" v-show="error">{{error}}</div> 
                    <div class="ui segment">
                        <div class="field">
                            <div class = "ui right icon input large" :class="{loading:spinner}">
                                <input type="text" placeholder="Ingresa las coordenadas decimales de latitud y longitud separados por coma ',' o prueba escribiendo una  Dirección :)" 
                                v-model="address"
                                id="autocomplete"
                                
                                >
                                <i class="dot circle link icon" @click="locatorButtonPressed">

                                </i>
                            </div>
                        </div>
                        <button class = "ui button">Historial</button>
                    </div>
                </form>
            </div> 
        </section>
        <section id="map">
     
        </section>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            address: "",
            error: "",  //si es error el layout estará redirigido
            spinner: false
        }
    },

    mounted() {
        let autocomplete = new google.maps.places.Autocomplete(
            // this.$refs["autocomplete"],
            document.getElementById("autocomplete"),
            {
                bounds: new google.maps.LatLngBounds(          //Limites para lugaress relacionados con alguna ubicación especial :) Constante Bog
                    new google.maps.LatLng(4.60971, -74.08175)
                )
            }
        );
        autocomplete.addListener("place_changed", () => {
            let place = autocomplete.getPlace();
            
            
            if(place.name.split(",").length=2) {
            console.log( place.name.split(",")[0]);;
            console.log( place.name.split(",")[1]);;
            
            this.showUserLocationOnTheMap(
                place.name.split(",")[0], 
                place.name.split(",")[1]
                );

            }

            this.showUserLocationOnTheMap(
                place.geometry.location.lat(), 
                place.geometry.location.lng()
                );

             
        },
        

        );
    },

    methods: {
        locatorButtonPressed(){
            
            this.spinner = true;

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.getAdressFrom(
                        position.coords.latitude,
                        position.coords.longitude
                        );

                        this.showUserLocationOnTheMap(
                            position.coords.latitude,
                            position.coords.longitude

                        )
                        // console.log(position.coords.latitude);
                        // 
                        console.log(position.coords.longitude);
                    },
                    error => { 
                        this.error = "La localización 📍 del navegador no está activa 😞. Digita tu dirección en la barra de busqueda o autoriza al navegador para ver tu Ubicación."; //Este error referencia al error con datos
                        this.spinner = false;
                         console.log(error.message);
                    }
                );
            }
            else {
                this.error = error.message;
                this.spinner = false;
                console.log("El navegador no soporta gelolocation API Method");
            }
        },
        getAdressFrom(lat,long) { //pass geocode end point url
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
            + lat 
            + "," 
            + long 
            + "&key=API_KEY").then(response => {
                if(response.data.error_message) {
                    this.error = response.data.error_message;
                    console.log(response.data.error_message);
                } else {
                    this.address = response.data.results[0].formatted_address;
                    this.spinner = false;
                    console.log(response.data.results[0].formatted_address);
                }
            }).catch(error => {
                this.error = error.message;
                this.spinner = false;
                console.log(error.message);
            })
        },
        showUserLocationOnTheMap(latitude,longitude) {
            //Create a Map Object
            //Map method recive two elements
            //1. Where return the html requiest
            let map = new google.maps.Map(document.getElementById("map"), {
                zoom:15,
                center: new google.maps.LatLng(latitude,longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            //Add Marker

            new google.maps.Marker({
                position: new google.maps.LatLng(latitude,longitude),
                map: map
            })
        }
    }
};

</script>


<style>
.ui.button {
    background-color: #ff5a5f;
    color: white
    
}
.dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
}
.pac-icon {
    display: none;
}

.pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

.pac-item:hover {
    background-color: #ececec;
}

.pac-item-query {
    font-size: 16px;
}
/* New Css  */
#map{
    position:absolute;
    top:0;
    right: 0;
    bottom:0;
    left:0;
    background: red;

}


</style>