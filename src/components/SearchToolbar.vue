<template lang="pug">
    v-flex
        v-dialog(v-model='dialog', width='500' v-show="dialog")
            v-card
                v-card-text

        v-toolbar(xs6, sm6, md4)
            router-link(:to="{name:'home'}")
                v-toolbar-side-icon
                    v-icon business
            v-toolbar-title {{ application }}
            v-spacer
            template.text-center
                v-btn(@click="")
                    v-badge
                        template(v-slot:badge='') {{reservations}}
                        v-icon shopping_cart
            v-spacer
            v-flex(x12)
                SearchField

</template>

<script>
    export default {
        name: 'search-toolbar',
        components: {
            SearchField :()=> import("./SearchField.vue")
        },
        data() {
            return {
                application: 'Bike Rentals',
                dialog:false
            }
        },
        computed :{
            reservations(){
                return this.$store.state.listing.listOfReservations.length;
            }
        }
    }
</script>
