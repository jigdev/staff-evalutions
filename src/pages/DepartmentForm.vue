<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title class="title">
          {{title}}
          <v-spacer></v-spacer>
          <v-btn fab small class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text v-if="loading !== true">
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex md9 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex md4 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="departmentName" label="Department Name" hint="Department name is required" value="Input text" v-model="department.name"
                        class="input-group--focused" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
  /* global Store */
  import { mapState, dispatch } from 'vuex'
  export default {
    data() {
      return {
        title: ''
      }
    },
    computed: {
      ...mapState('departments', {
        department: 'department',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    methods: {
      save() {
        const department = { ...this.department }
        Store.dispatch('departments/saveDepartment', department)
          .then(() => {
            Store.dispatch("departments/closeSnackBar", 2000)
            this.$router.push({ name: 'Departments' })
          })
      },
      cancel() {
        this.$router.push({ name: 'Departments' })
      },
      closeSnackbar() {
        Store.commit("departments/setSnackbar", { snackbar: false });
        Store.commit("departments/setNotice", { notice: "" });
      },
    },
    created() {
      Store.dispatch('departments/getDepartmentById', this.$route.params.id)
    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Edit Department'
      } else this.title = 'New Department'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
