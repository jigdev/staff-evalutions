<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
           <v-card-title>
            <span class="title">Users {{pagination? "("+pagination.totalItems+")": ""}}
              <v-text-field append-icon="search" label="Quick Search" single-line hide-details v-model="quickSearch"></v-text-field>
            </span>
           </v-card-title>
           <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination"></Table>
     </v-card>
    </v-flex>
    </v-container>
</template>
<script>
/* globals Store */
import Table from "@/components/Table.vue";
import { mapState } from "vuex";
import { debounce } from "lodash";
export default {
    components: {
          Table
    },
    data() {
        return {
        headers: [
        {
          text: 'Users Name',
          left: true,
          value: 'first_name'
        },
         {
          text: 'Email Id',
          left: true,
          value: 'email'
        },
        {
          text: 'Mobile No',
          left: true,
          value: 'mobile_no'
        }
      ],
      }
    },
    methods: {
      quickSearchUsers: debounce(function () {
        console.log(this.quickSearchFilter)
        this.quickSearchFilter && Store.dispatch("Users/quickSearch",
        { headers: this.headers,
          qsFilter: this.quickSearchFilter.toLowerCase(),
          pagination: this.pagination });
        }, 300)
    },
    computed: {
    ...mapState("users", {
      items: "items",
      pagination: "pagination",
      loading: "loading",
      mode: "mode",
      snackbar: "snackbar",
      notice: "notice"
    }),
    quickSearch: {
      get: function () {
        return this.quickSearchFilter;
      },
      set: function ( val ) {
        this.quickSearchFilter = val;
        this.quickSearchFilter && this.quickSearchUsers();
      }
    }},

    created () {
        Store.dispatch("users/getAllUsers")
    },
  mounted () {

  }
}

</script>

