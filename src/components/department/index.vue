<template>
  <v-container fluid>
      <DepartmentForm :departmentprop="departmentprop" :depform="deptform" v-if="deptform"></DepartmentForm>
    <v-flex xs12 v-if="!deptform">
      <v-card>
             <v-card-title>
            <span class="title">Departments {{pagination? "("+pagination.totalItems+")": ""}}
              <v-text-field append-icon="search" label="Quick Search" single-line hide-details v-model="quickSearch"></v-text-field>
            </span>
            <v-spacer></v-spacer>
            <v-btn class="blue-grey" fab small dark @click.native.stop="rightDrawer = !rightDrawer">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn class="brown lighten-1" fab small dark @click.native="reloadData()">
              <v-icon>refresh</v-icon>
            </v-btn>
            <v-btn class="teal darken-2" fab small dark @click.native="print()">
              <v-icon>print</v-icon>
            </v-btn>
            <v-btn class="deep-orange darken-3" fab small dark @click.native="add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-title>
        <Table v-if="loading===false" :headers="headers" :items="items"  :pagination="pagination" @edit="edit" @remove="remove"></Table>
      </v-card>
    </v-flex>
 <search-panel :rightDrawer="rightDrawer" @cancelSearch="cancelSearch" @searchData="searchDepartments">
 <v-layout row>
          <v-flex xs11 offset-xs1>
            <v-text-field name="input-1-3" label="Department Name" light v-model="searchVm.contains.name"></v-text-field>
          </v-flex>
        </v-layout>
         </search-panel>

    <confirm-dialog :dialog="dialog" :dialogTitle="dialogTitle" :dialogText="dialogText" @onConfirm="onConfirm" @onCancel="onCancel" ></confirm-dialog>
      <v-snackbar v-if="loading===false" :right="true" :timeout="timeout" :color="mode" v-model="snackbar" >
      {{ notice }}
      <v-btn dark flat @click.native="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
/* globals Store */
import Table from "@/basecomponents/Table.vue";
import SearchPanel from "@/basecomponents/SearchPanel.vue";
import ConfirmDialog from "@/basecomponents/ConfirmDialog.vue";
import DepartmentForm from "./DepartmentForm.vue"
import { mapState } from "vuex";
import { debounce } from "lodash";

export default {
  components: {
    Table,
    SearchPanel,
    ConfirmDialog,
    DepartmentForm
  },
  data () {
    return {
      dialog: false,
      deptform: false,
      dialogTitle: "Department delete Dialog",
      dialogText: "Do you want to delete this Department?",
      rightDrawer: false,
      right: true,
      search: '',
      headers: [
        {
          text: 'Department Name',
          left: true,
          value: 'name'
        },
         {
          text: 'Created Date',
          left: true,
          value: 'created_date'
        }
      ],
      // items: [],
      searchVm: {
        contains: {
          period: ''
        },
        between: {
          rewards: { former: 0, latter: 0 }
        }
      },
      departmentId: "",
      departmentprop: "",
      query: "",
      snackbarStatus: false,
      timeout: 2000,
      color: "",
      quickSearchFilter: "",
    }
  },
  methods: {
    print () {
      window.print()
    },
    edit (item) {
      this.department = Object.assign({}, item);
      this.deptform = true;
    },
    add () {
      this.$router.push('NewDepartment')
    },
    remove (item) {
      this.departmentId = item.id;
      this.dialog = true;
    },
    onConfirm () {
      Store.dispatch(
        "departments/deleteDepartment", this.departmentId).then(() => {
        Store.dispatch("departments/searchDepartments", this.query, this.pagination);
        Store.dispatch("departments/closeSnackBar", 2000);
      });
      this.dialog = false;
    },
    onCancel () {
      this.orderId = "";
      this.dialog = false;
    },
    searchDepartments () {
      this.rightDrawer = !this.rightDrawer;
      this.appUtil.buildSearchFilters(this.searchVm);
      this.query = this.appUtil.buildJsonServerQuery(this.searchVm);
      this.quickSearch = "";
      Store.dispatch("departments/searchDepartments", this.query, this.pagination);
    },
    clearSearchFilters () {
      this.rightDrawer = !this.rightDrawer
      this.appUtil.clearSearchFilters(this.searchVm)
      this.api.getData('departments/').then((res) => {
        this.items = res.data
        this.items.forEach((item) => {
          if (item.orders && item.orders.length) {
            item.orderAmount = item.orders.length
          } else {
            item.orderAmount = 0
          }
        })
        this.pagination.totalItems = this.items.length
        console.log(this.items)
      }, (err) => {
        console.log(err)
      })
    },
    reloadData () {
      this.query = "";
      Store.dispatch("departments/getAllDepartments");
    },
    cancelSearch () {
      this.rightDrawer = false;
    },
    closeSnackbar () {
      Store.commit("departments/setSnackbar", { snackbar: false });
      Store.commit("departments/setNotice", { notice: "" });
    },
    quickSearchDepartments: debounce(function () {
      console.log(this.quickSearchFilter)
      this.quickSearchFilter && Store.dispatch("Departments/quickSearch",
       { headers: this.headers,
         qsFilter: this.quickSearchFilter.toLowerCase(),
         pagination: this.pagination });
    }, 300),
  },
  computed: {
    ...mapState("departments", {
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
        this.quickSearchFilter && this.quickSearchDepartments();
      }
    }
  },
  created () {
    Store.dispatch("departments/getAllDepartments")
  },
  mounted () {

  }
}
</script>
