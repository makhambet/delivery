<template>
  <div class="addresses">
    <nav>
      <ul>
        <li
            v-for="address in USER_BY_ID.addresses" 
            :key="address.id"
        >
            <p>
                {{$ml.get('street')}}. {{address.street}} {{$ml.get('home')}} {{address.home}} {{$ml.get('apartment')}} {{address.apartment}}
                <a @click="editAddress(address.id, address.street, address.home, address.apartment)" class="changeA">{{$ml.get('change')}}</a> 
                <a style="float: right" @click.prevent="addressDelete(address.id)" class="deleteA">{{$ml.get('delete')}}</a>
            </p>
        </li>
      </ul>
    </nav>
    <button @click="newAddressClick()" class="sp-content-btn">
      {{$ml.get('new_address')}}
    </button>
    <div v-if="newAddress" class="addNewAddress">
      <form>
        <label>{{$ml.get('added_new_address')}}</label><br>
        <input v-model="addNewAddressStreet" type="text" :placeholder="$ml.get('street')"><a @click.prevent="newAddress=false" class="deleteA">{{$ml.get('cancel')}}</a><br>
        <input v-model="addNewAddressHome" type="text" :placeholder="$ml.get('home')">
        <input v-model="addNewAddressApartment" type="text" :placeholder="$ml.get('apartment')"><br>
        <button @click.prevent="map=true" class="allBtn">{{$ml.get('on_map')}}</button><br>
        <p>{{$ml.get('your_map_address')}} <br>{{$ml.get('your_marker')}}</p>
        <button v-if="!edit" @click.prevent="newAddress=false, map=false" class="allBtn">{{$ml.get('cancel')}}</button>
        <button :disabled="addAddress" @click.prevent="addNewAddress()" class="allBtn"><span v-if="!edit">{{$ml.get('add')}}</span><span v-if="edit">{{$ml.get('to_change')}}</span></button>
      </form>
    </div>
    <div class="addresses-map-block" v-if="map">
      <gmap-map
        @click="mapRclicked"
        ref="google"
        :center="center"
        :zoom="14"
         class="addresses-map"
         id="map"
      >
      
          <!-- @click="center=m.position" -->
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
        ></gmap-marker>
      </gmap-map>
      <div>
        <p>{{markers}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import user from '../help/user_id'
  import AppAlert from '@/components/AppAlert'
  import config from '@/help/config'
  import { MLBuilder } from 'vue-multilanguage'
  export default {
    name: "GoogleMap",
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        map: false,
        addNewAddressStreet: null,
        addNewAddressHome: null,
        addNewAddressApartment: '',
        newAddress: false,
        addAddress: false,
        lastId: 1,
        center: { lat: 43.237998, lng: 76.911768 },
        url: config.url,
        markers: [
          {
            name: "Биокомбинатская 29в",
            description: "Здания рядом с домом",
            date_build: "",
            position: {lat: 43.237662, lng: 76.911302}
          }
        ],
      };
    },

    mounted() {
      this.geolocate();
    },
    computed: {
      ...mapGetters(['USER_BY_ID']),
      activeMarkers() {
        if (this.markersEven) {
          return this.markers.filter(
            (v, k) => k % 2 == 0
          );
        } else {
          return this.markers;
        }
      },
      mlmyMessage () {
          return new MLBuilder('header')
      } 
    },

    methods: {
      newAddressClick(){
        this.edit=false
        this.newAddress=true
        this.addNewAddressStreet = ''
        this.addNewAddressHome = ''
        this.addNewAddressApartment = ''
      },

      addressDelete(id){
        if(user.token === null || user.token === 'null'){
          console.log('Адрес не удален')
          return;
        }
        axios.post(this.url + 'api/user/address/delete', {
          "address_id": id
        },
        {
          headers: {
            "token": user.token
          },
        })
        .then(response => { 
          console.log(response)
          this.$store.dispatch('GET_USER_BY_ID')
        })
        .catch(error => {
          console.log(error.response)
        });
      },
      alertBox(title){
        this.propTitle = title
        this.visible = true
        setTimeout(() => {
          this.visible = false
        }, 2000);
      },
      addNewAddress(){
        if(this.addNewAddressStreet===null || this.addNewAddressHome===null || user.token === null || user.token === 'null'){
          return
        }
        else{
          this.$emit('alerted')
          this.addAddress = true
          this.newAddress = false
          axios.post(this.url + 'api/user/address/add', {
              "street": this.addNewAddressStreet,
              "home": this.addNewAddressHome,
              "apartment": this.addNewAddressApartment,
              "lat": this.markers[0].position.lat,
              "lng": this.markers[0].position.lng,
          },
          {
              headers: {
                  "token": user.token
              },
          })
          .then(response => { 
              console.log(response)
              this.newAddress=false;
              this.map=false
              this.$store.dispatch('GET_USER_BY_ID')
          })
          .catch(error => {
              console.log(error.response)
          });
          if(this.edit) this.edit = false
        }
      },
      editAddress(id, street, home, apartment){
        this.newAddress = true
        this.addNewAddressStreet = street
        this.addNewAddressHome = home
        this.addNewAddressApartment = apartment
        this.edit = true
        this.addressDelete(id)
        console.log(this.edit)
      },
      // placeMarker(location){
      //   var marker = new google.maps.Marker({
      //     position: location, 
      //     map: map
      //   });
      // },
      // receives a place object via the autocomplete component
      // setPlace(place) {
      //   this.currentPlace = place;
      // },
      // addMarker() {
      //   if (this.currentPlace) {
      //     const marker = {
      //       lat: this.currentPlace.geometry.location.lat(),
      //       lng: this.currentPlace.geometry.location.lng()
      //     };
      //     this.markers[0].position = marker;
      //     this.places.push(this.currentPlace);
      //     this.center = marker;
      //     this.currentPlace = null;
      //   }
      // },
      mapRclicked(mouseArgs) {
        const createdMarker = this.addMarker();
        createdMarker.position.lat = mouseArgs.latLng.lat();
        createdMarker.position.lng = mouseArgs.latLng.lng();
        let geocoder = new google.maps.Geocoder();


        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: this.center
        });
        // this.geocodeAddress(geocoder, map);
        
      },
      addMarker: function addMarker() {
        // this.lastId++;
        return this.markers[0];
      },
      geocodeAddress(geocoder, resultsMap) {
        // var address = this.addNewAddressStreet;
        // geocoder.geocode({'address': 'Almaty'}, function(results, status) {
        //   if (status === 'OK') {
        //     console.log('asdfsdf')
        //     resultsMap.setCenter(results[0].geometry.location);
        //     var marker = new google.maps.Marker({
        //       map: resultsMap,
        //       position: results[0].geometry.location
        //     });
        //   } else {
        //     alert('Geocode was not successful for the following reason: ' + status);
        //   }
        // });
      }
    },
  };
</script>
<style >
  .addresses{
    position: relative;
  }
  .addresses-map-block{
    position: absolute;
    top: 0;
    width: 100%;
    height: 400px;
    margin-left: 105%;
  }
  .addresses-map{
    width: 100%;
    height: 100%;
  }
  @media (max-width: 579px){
    .addNewAddress .deleteA{
      display: none;
    } 
  }
</style>