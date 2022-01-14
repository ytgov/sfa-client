<template>
  <div>
    <v-switch
      outlined
      dense
      hide-details
      label="Applying for CSG for students with disabilities"
      v-model="is_applying"
    ></v-switch>

    <div v-if="is_applying">
      <v-card class="default mt-5">
        <v-card-text>
          <div class="row">
            <div class="col-md-12">
              <h3>Disabilities</h3>
              <div v-for="(item, i) of disabilities" :key="i" class="row">
                <div class="col-md-5">
                  <v-select
                    outlined
                    dense
                    background-color="#ffaaaa"
                    hide-details
                    label="Nature of disability"
                    v-model="item.nature_of_disability"
                    :items="disabilityOptions"
                  ></v-select>
                </div>
                <div class="col-md-5">
                  <v-text-field
                    outlined
                    dense
                    background-color="#ffaaaa"
                    hide-details
                    label="Comment"
                    v-model="item.comment"
                  ></v-text-field>
                </div>
                <div class="col-md-2">
                  <v-btn
                    color="warning"
                    x-small
                    fab
                    title="Remove"
                    class="my-0 float-right"
                    @click="removeDisability(i)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>
              </div>
              <v-btn color="info" @click="addDisability()">Add record</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="default mt-5">
        <v-card-text>
          <h3>Services Required</h3>

          <div class="row" v-for="(item, i) of services" :key="i">
            <div class="col-md-10">
              <v-select
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Service required"
                v-model="item.service_required"
                :items="serviceOptions"
              ></v-select>
            </div>

            <div class="col-md-2">
              <v-btn
                color="warning"
                x-small
                fab
                title="Remove"
                class="my-0 float-right"
                @click="removeService(i)"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
          </div>

          <v-btn color="info" @click="addService()">Add service</v-btn>
          <hr />
          <div class="row mt-5">
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Amount requested"
                v-model="service_amount_requested"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Maximum amount"
                v-model="service_max_amount"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Amount approved"
                v-model="service_amount_approved"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>

            <div class="col-md-4 pt-0">
              <v-switch
                dense
                hide-details
                label="Receipts received"
                v-model="service_receipts_received"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-file-input
                multiple
                truncate-length="15"
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Upload receipts"
              ></v-file-input>
            </div>
            <div class="col-md-4 pt-0">
              <v-btn color="primary">View receipts</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="default mt-5">
        <v-card-text>
          <h3>Equipment Required</h3>
          <div class="row">
            <div class="col-md-12">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Equipment required"
                v-model="equipment_required"
              ></v-text-field>
            </div>
            <div class="col-md-8">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Previous CSG-disability amount received this loan year"
                v-model="previous_amount"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>
            <div class="col-md-4 pt-0">
              <v-switch
                dense
                hide-details
                label="Permanent disability"
                v-model="permanent_disability"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Amount requested"
                v-model="equipment_amount_requested"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Maximum amount"
                v-model="equipment_max_amount"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Amount approved"
                v-model="equipment_amount_approved"
                v-currency="{ currency: 'USD', locale: 'en' }"
              ></v-text-field>
            </div>

            <div class="col-md-4 pt-0">
              <v-switch
                dense
                hide-details
                label="Receipts received"
                v-model="equipment_receipts_received"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-file-input
                multiple
                truncate-length="15"
                outlined
                dense
                background-color="#ffaaaa"
                hide-details
                label="Upload receipts"
              ></v-file-input>
            </div>
            <div class="col-md-4 pt-0">
              <v-btn color="primary">View receipts</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    disabilityOptions: ["Disability 1", "Disability 2"],
    serviceOptions: ["Service 1", "Service 2"],

    disabilities: [],
    services: [],

    service_amount_requested: 0,
    service_max_amount: 0,
    service_amount_approved: 0,
    service_receipts_received: false,
    
    is_applying: true,
    equipment_required: "",
    previous_amount: 0,
    permanent_disability: false,

    equipment_amount_requested: 0,
    equipment_max_amount: 0,
    equipment_amount_approved: 0,
    equipment_receipts_received: false,
  }),
  async created() {},
  methods: {
    addDisability() {
      this.disabilities.push({});
    },
    removeDisability(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this disability.",
        () => {
          this.disabilities.splice(index, 1);
        },
        () => {}
      );
    },
    addService() {
      this.services.push({
        amount_requested: 0,
        max_amount: 0,
        amount_approved: 0,
      });
    },
    removeService(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this service.",
        () => {
          this.services.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
