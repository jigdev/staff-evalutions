<template>
    <v-flex>
    <v-card
      class="mx-auto"
      max-width="400">
      <v-list
        :disabled="disabled"
        :dense="dense"
        :two-line="twoLine"
        :three-line="threeLine"
        :shaped="shaped"
        :flat="flat"
        :subheader="subheader"
        :inactive="inactive"
        :sub-group="subGroup"
        :nav="nav"
        :avatar="avatar"
        :rounded="rounded"
      >
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in list"
            :key="i"
          >
            <v-list-item-avatar v-if="avatar">
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-if="twoLine || threeLine" v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
</v-flex>

</template>
<script>
// For future development search product
    export default {
        name: 'reservations-bucket',
        data: () => ({
        item: 5,
        disabled: false,
        dense: false,
        twoLine: false,
        threeLine: false,
        shaped: false,
        flat: false,
        subheader: false,
        inactive: false,
        subGroup: false,
        nav: false,
        avatar: false,
        rounded: false,
        }),
        methods: {
            search() {
               // console.log('Im searching bitch')
            }
        },
       computed: {
            list(){
               if(this.store.state.listOfReservations.length > 0){
                    return this.store.state.listOfReservations;
               }else{
                    return [];
              }

            }
        }
    }
</script>
