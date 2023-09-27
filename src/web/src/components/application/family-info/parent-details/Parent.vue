<template>
  <div>
    <v-card class="default mb-8">
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <h3 class="text-h6 font-weight-regular">Parent {{ index }}</h3>
          </div>
          <v-spacer></v-spacer>
          <div class="col-md-3">
            <v-btn block color="success" class="my-0">View parent {{ index }} NOA</v-btn>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="parent.first_name"
              @change="update(parent.id, { first_name: parent.first_name })"
            >
            </v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="parent.last_name"
              @change="update(parent.id, { last_name: parent.last_name })"
            >
            </v-text-field>
          </div>
          <v-spacer></v-spacer>
          <div class="col-md-3">
            <v-autocomplete
              v-if="index === 1"
              outlined
              dense
              background-color="white"
              hide-details
              :items="relationships"
              item-text="description"
              item-value="id"
              label="Relationship"
              v-model="application.parent1_relationship_id"
              @change="doSaveApp('parent1_relationship_id', application.parent1_relationship_id)"
            >
            </v-autocomplete>
            <v-autocomplete
              v-else
              outlined
              dense
              background-color="white"
              hide-details
              :items="relationships"
              item-text="description"
              item-value="id"
              label="Relationship"
              v-model="application.parent2_relationship_id"
              @change="doSaveApp('parent2_relationship_id', application.parent2_relationship_id)"
            >
            </v-autocomplete>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="parent.telephone"
              oninput="
                        if (this.value.length > 12) {
                            this.value = this.value.slice(0, 12);
                        }
                    "
              @keypress="validate.isNumber($event)"
              @change="
                (e) => {
                  if (validate.telephone(parent.telephone) || !String(parent.telephone).length) {
                    return update(parent.id, { telephone: parent.telephone });
                  } else {
                    $store.dispatch('loadApplication', application.id);
                    return $emit('showError', 'Invalid Telephone');
                  }
                }
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Email"
              v-model="parent.email"
              @change="
                (e) => {
                  if (validate.email(parent.email) || !String(parent.email).length) {
                    return update(parent.id, { email: parent.email });
                  } else {
                    $store.dispatch('loadApplication', application.id);
                    return $emit('showError', 'Invalid Email');
                  }
                }
              "
            >
            </v-text-field>
          </div>
          <v-spacer></v-spacer>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              :items="citizenships"
              item-text="description"
              item-value="id"
              label="Citizenship"
              v-model="parent.citizenship_code"
              @change="update(parent.id, { citizenship_code: parent.citizenship_code })"
            >
            </v-autocomplete>
          </div>

          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (line 150)"
              v-currency="{ currency: 'USD', locale: 'en' }"
              v-model="incomes.income"
              @change="
                doSaveApp(incomes.parent === 1 ? 'parent1_income' : 'parent2_income', parseMoney(incomes.income))
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (line 236)"
              v-currency="{ currency: 'USD', locale: 'en' }"
              v-model="incomes.net_income"
              @change="
                doSaveApp(
                  incomes.parent === 1 ? 'parent1_net_income' : 'parent2_net_income',
                  parseMoney(incomes.net_income)
                )
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (line 435)"
              v-currency="{ currency: 'USD', locale: 'en' }"
              v-model="incomes.tax_paid"
              @change="
                doSaveApp(incomes.parent === 1 ? 'parent1_tax_paid' : 'parent2_tax_paid', parseMoney(incomes.tax_paid))
              "
            >
            </v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              @keypress="validate.isNumber($event)"
              v-model="parent.sin"
              @change="
                (e) => {
                  if (validate.SIN(parent.sin) || !String(parent.sin).length) {
                    return update(parent.id, { sin: parent.sin });
                  } else {
                    $store.dispatch('loadApplication', application.id);
                    return $emit('showError', 'Invalid SIN');
                  }
                }
              "
            >
            </v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import axios from "axios";
import { STUDENT_URL, APPLICATION_URL } from "@/urls";
import validator from "@/validator";
import { parse } from "vue-currency-input";

export default {
  components: {},
  computed: {
    ...mapGetters(["relationships", "citizenships"]),
    studentId: function() {
      return store.getters.selectedStudent.id;
    },
    application() {
      return store.getters.selectedApplication;
    },
    telephone() {
      return this.parent.telephone;
    },
    incomes() {
      return this.index === 1
        ? {
            parent: 1,
            income: this.application.parent1_income,
            net_income: this.application.parent1_net_income,
            tax_paid: this.application.parent1_tax_paid,
          }
        : {
            parent: 2,
            income: this.application.parent2_income,
            net_income: this.application.parent2_net_income,
            tax_paid: this.application.parent2_tax_paid,
          };
    },
  },
  watch: {
    telephone: function(value, oldValue) {
      if (value?.length === 3 || value?.length === 7) {
        this.parent.telephone = this.parent.telephone + "-";
      }
    },
  },
  data: () => ({
    validate: {},
  }),
  async created() {
    store.dispatch("setRelationships");
    store.dispatch("setCitizenships");
    this.validate = { ...validator };
  },
  methods: {
    parseMoney(input) {
      return parse(input, { currency: "USD" });
    },
    doSaveStudent() {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
    async update(personId, data) {
      try {
        if (this.parent?.id) {
          const resUpdate = await axios.patch(`${STUDENT_URL}/${personId}/person`, { data });

          const message = resUpdate?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
            //this.setClose();
          } else {
            this.$emit("showError", message.text);
          }
        } else {
          const resInsert = await axios.post(`${APPLICATION_URL}/${this.application.id}/person`, {
            data,
            typeId: `parent${this.index}_id`,
          });

          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
            //this.setClose();
          } else {
            this.$emit("showError", message.text);
          }
        }
      } catch (error) {
        console.log(error);
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
  },
  props: {
    index: Number,
    parent: Object,
  },
};
</script>
