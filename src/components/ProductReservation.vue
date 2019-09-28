<template>
    <v-flex cols="12" sm="10" md="8" lg="6">
        <v-card>
            <v-card-text>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-text-field v-model="pr.name"   :counter="15" :rules="nameRules" label="Full Name" required></v-text-field>
                    <v-text-field v-model="pr.email" :rules="emailRules" label="E-mail" required></v-text-field>
                     <v-combobox v-model="pr.hours" :items="totalHours" :rules="hoursRules" chips label="How many hours rent?" required></v-combobox>
                     <v-combobox v-model="pr.accessories" :items="accessories"  name="accesory"  item-text="name"  chips label="Please click here to add accessories ..." required></v-combobox>
                    <v-combobox v-model="pr.addons" :items="addons" name="addon"  item-text="name" chips label="Please click here to add addons ..." required></v-combobox>
                     <v-btn class="mr-4" @click="reset">Cancel</v-btn>
                    <v-btn color="primary" @click="reserveProduct">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-flex>

</template>
<script>
    export default {
        name: 'product-reservation',
        data() {
            return {
                valid: false,
                hours:'1 hrs',
                lazy:false,
                pr:{
                    name:"",
                    email:"",
                    hours:"1 hrs",
                    addons:'',
                    accessories:''
                },

                nameRules: [
                    v => !!v || 'Name is required',
                     v => (v && v.length <= 15) || 'Name must be less than 15 characters',
                ],
                hoursRules :[
                    v => !!v || 'Hours is required',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                totalHours: ['1 hrs', '2 hrs', '3 hrs', '4 hrs', '5 hrs', '6 hrs', '7 hrs', '8 hrs', '9 hrs', '10 hrs', '11 hrs', '12 hrs'],
            }
        },
        computed: {

            addons() {
                return this.$store.state.listing.addons;

            },
             accessories() {

                return this.$store.state.listing.accessories;
            }

        },
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        methods: {
            // Product reservation
            reserveProduct() {
                if(!this.$refs.form.validate())
                    return
                this.pr['product'] = this.product;
                this.$store.dispatch('reservebike', {
                    pr: this.pr
                })
                this.reset();
                this.$emit('closeDialog');
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
            reset() {
                this.$refs.form.reset()
                 this.$emit('closeDialog');
            },
        }
    }

</script>
