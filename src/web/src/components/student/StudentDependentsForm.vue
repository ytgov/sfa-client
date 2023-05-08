<template>
  <div>
    <v-card class="default mb-5" v-for="(item, i) of student.dependent_info" :key="i">
      <v-card-title>Dependent {{ 1 + i }}
        <v-spacer></v-spacer>
        <v-btn 
          :disabled="showAdd" 
          color="warning" 
          x-small 
          fab class="my-0"
          @click="deleteRecord(item.id)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field 
              :disabled="showAdd" 
              outlined 
              dense 
              background-color="white" 
              hide-details label="First Name" 
              oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');


                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                }

                this.value = arr.join(' ');
              " 
              @change="doSaveDependent('first_name', item.first_name, 'dependentInfo', item.id)"
              v-model="item.first_name"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field 
              :disabled="showAdd" 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="Last name" 
              oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');


                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                }

                this.value = arr.join(' ');
              "
              @change="doSaveDependent('last_name', item.last_name, 'dependentInfo', item.id)"
              v-model="item.last_name"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-menu 
              :disabled="showAdd" 
              v-model="birth_date_menu" 
              :close-on-content-click="false" 
              transition="scale-transition" 
              left
              nudge-top="26" 
              offset-y min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field 
                  :disabled="showAdd"
                  v-model="item.birth_date"
                  label="Birth date"
                  append-icon="mdi-calendar"
                  readonly 
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                  @click="$event => {
                      if (birth_date_menu) {
                        changeCurrentMenu(null);
                      } else {
                        changeCurrentMenu(item.id);
                      }
                    }"
                >
                </v-text-field>
              </template>
              <v-date-picker 
                :disabled="showAdd" 
                v-if="current_menu === item.id" 
                @change="doSaveDependent('birth_date', item.birth_date, 'dependentInfo', item.id)"
                v-model="item.birth_date" 
                @input="birth_date_menu = false"
              >
              </v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-2">
            <v-text-field
              disabled
              outlined
              dense 
              background-color="white" 
              hide-details label="Age"
              :value="getAge(item.birth_date)"
            >
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-select
              :disabled="showAdd" 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="Relationship" 
              item-text="description"
              v-model="item.relationship_id"
              @change="doSaveDependent('relationship_id', item.relationship_id, 'dependentInfo', item.id)"
              item-value="id" 
              :items="relationships"
            >
            </v-select>
          </div>
          <div class="col-md-3">
            <v-textarea 
              :disabled="showAdd" 
              v-model="item.comments" 
              row="1" 
              row-height="7" 
              @change="doSaveDependent('comments', item.comments, 'dependentInfo', item.id)"
              auto-grow 
              outlined 
              dense 
              background-color="white" 
              hide-details
              label="Comments"
            >
            </v-textarea>
          </div>
          <div class="col-md-2 mt-0 pt-0">
            <v-switch 
              :disabled="showAdd" 
              label="Disability" 
              @change="doSaveDependent('is_disability', item.is_disability, 'dependentInfo', item.id)"
              v-model="item.is_disability"
            >
            </v-switch>
          </div>

          <div class="col-md-2 mt-0 pt-0">
            <v-switch 
              :disabled="showAdd" 
              label="Conversion" 
              @change="doSaveDependent('is_conversion', item.is_conversion, 'dependentInfo', item.id)"
              v-model="item.is_conversion"
            >
            </v-switch>
          </div>

          <div class="col-md-2 mt-0 pt-0">
            <v-switch
              :disabled="showAdd" 
              label="In Progress" 
              @change="doSaveDependent('is_in_progress', item.is_in_progress, 'dependentInfo', item.id)"
              v-model="item.is_in_progress"
            >
            </v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5" v-if="showAdd">
      <v-card-title>Add Dependents</v-card-title>

      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-text-field 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="First name" 
              oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');


                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                }

                this.value = arr.join(' ');
              "
              v-model="newRecord.first_name"
            >
            </v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field oninput="
                if (this.value.length > 100) this.value = this.value.slice(0, 10);
                const arr = this.value.split(' ');


                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                }

                this.value = arr.join(' ');
              "
              v-model="newRecord.last_name"
              outlined 
              dense 
              background-color="white" 
              hide-details label="Last name"
            >
            </v-text-field>
          </div>
          <div class="col-md-2">
            <v-menu
              v-model="birth_date_menu_add" 
              :close-on-content-click="false" 
              transition="scale-transition" 
              left
              nudge-top="26" 
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field 
                  v-model="newRecord.birth_date" 
                  label="Birth date" 
                  append-icon="mdi-calendar" 
                  readonly 
                  outlined 
                  dense
                  background-color="white" 
                  v-bind="attrs" 
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker 
                v-model="newRecord.birth_date" 
                @input="birth_date_menu_add = false"
              >
              </v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-2">
            <v-text-field 
              disabled 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="Age"
              v-model="age"
            >
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <v-select 
              outlined 
              dense 
              background-color="white" 
              hide-details 
              label="Relationship" 
              item-text="description"
              item-value="id" 
              :items="relationships" 
              v-model="newRecord.relationship_id"
            >
            </v-select>
          </div>
          <div class="col-md-3">
            <v-textarea 
              row="1" 
              row-height="7" 
              auto-grow 
              outlined 
              dense 
              background-color="white" 
              hide-details
              label="Comments" 
              v-model="newRecord.comments"
            >
            </v-textarea>
          </div>
          <div class="col-md-2 mt-0 pt-0">
            <v-switch 
              label="Disability" 
              v-model="newRecord.is_disability"
            >
            </v-switch>
          </div>

          <div class="col-md-2 mt-0 pt-0">
            <v-switch 
              label="Conversion" 
              v-model="newRecord.is_conversion"
            >
            </v-switch>
          </div>

          <div class="col-md-2 mt-0 pt-0">
            <v-switch 
              label="In Progress" 
              v-model="newRecord.is_in_progress"
            >
            </v-switch>
          </div>
        </div>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn 
          color="red" 
          class="my-0" 
          @click="showAdd = !showAdd"
        >
          <v-icon 
            color="white font-weight-thin" 
            size="21"
          >
            {{ 'mdi-close' }}
          </v-icon>
        </v-btn>
        <v-btn 
          color="success" 
          class="my-0 ml-5" 
          @click="e => {
            doSaveDependent('data', { ...newRecord }, 'dependentInfo', null, true);
          }"
        >
          <v-icon 
            color="white font-weight-thin" 
            size="21"
          >
            {{ 'mdi-content-save' }}
          </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-btn v-if="!showAdd" color="info" @click="setClose">Add dependent</v-btn>
    <v-btn v-else color="info" @click="setClose">Cancel</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";
import store from "../../store";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    showAdd: false,
    birth_date_menu: false,
    birth_date_menu_add: false,
    current_menu: null,
    picker: new Date().toISOString().slice(0, 10),
    relationshipOptions: [],
    residesOptions: [],
    maxDate: moment().format("YYYY-MM-DD"),
    newRecord: {
      first_name: null,
      last_name: null,
      is_disability: false,
      is_conversion: false,
      is_in_progress: false,
      birth_date: null,
      comments: null,
      relationship_id: null,
    },
  }),
  computed: {
    ...mapGetters(["relationships"]),
    student: function () {
      const studentSelected = {
        ...store.getters.selectedStudent,
        dependent_info: store.getters.selectedStudent?.dependent_info?.map(element => {
          return { ...element, birth_date: element?.birth_date?.slice(0, 10) }
        }),
      }

      return studentSelected;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    age: {
      get() {
        return moment().diff(this.picker, 'years');
      },
      set(newValue) {
        this.picker = String(newValue).slice(0, 10);
      },

    },
  },
  async created() {
    store.dispatch("setRelationships");
    this.loadRelationships();
  },
  methods: {
    getAge(date) {
      return moment().diff(date, 'years');
    },
    changeCurrentMenu(id) {
      this.current_menu = id;
    },
    setClose() {
      this.newRecord = {
        first_name: null,
        last_name: null,
        is_disability: false,
        is_conversion: false,
        is_in_progress: false,
        birth_date: null,
        comments: null,
        relationship_id: null,
      };
      this.picker = new Date().toISOString().slice(0, 10),
      this.birth_date_menu_add = false;
      this.showAdd = !this.showAdd;
    },
    deleteRecord(idToDelete) {

      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          store.dispatch(
            "deleteDependent",
            [this, idToDelete],
          );
        },
        () => { }
      );

    },
    doSaveDependent(field, value, type, extraId = null, isInsertion = false) {
      if (isInsertion) {
        const validate = { ...value };
      }

      const url = type === "dependentInfo" ? "/dependent" : "";

      store.dispatch(
        "updateStudent",
        [field, value, type, extraId, this, null, url, isInsertion],
      );

    },
  },
};
</script>