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
              <v-flex md12 sm12>
                <v-container fluid grid-list-sm>
                  <v-layout row wrap>
                    <v-flex v-for="eval in evalution.evalutionList"  v-bind:key="eval.question" md12 sm12 xs12  class="mx-1 px-0">
                      <v-text-field name="eval.question" :label="eval.question"  value="Input text" v-model="eval.answer"
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
        title: '',


      }
    },
    computed: {
      ...mapState('evalutions', {
        evalution: 'evalution',
        loading: 'loading',
        mode: 'mode',
        snackbar: 'snackbar',
        notice: 'notice',
      }),
    },
    methods: {
      save() {
        const evalution = { ...this.evalution }

        console.log(evalution)
        Store.dispatch('evalutions/saveEvalution', evalution)
          .then(() => {
            Store.dispatch("evalutions/closeSnackBar", 2000)
          })
      },
      cancel() {
        this.$router.push({ name: 'Evalutions' })
      },
      closeSnackbar() {
        Store.commit("evalutions/setSnackbar", { snackbar: false });
        Store.commit("evalutions/setNotice", { notice: "" });
      },
    },
    created() {
      Store.dispatch('evalutions/getEvalutionById', this.$route.params.id)
    },
    mounted() {
      if (this.$route.params.id) {
        this.title = 'Edit Evalution'
      } else this.title = 'New Evalution'
    }
  }
</script>
<style>
  .profile {
    max-width: 160px;
  }
</style>
