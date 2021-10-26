<template>
  <div class="home">
    <h1>Documentation Required and Received</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Documentation</h3>
            <div v-for="(item, i) of documents" :key="i" class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Documentation"
                  v-model="item.documentation"
                  :items="documentationOptions"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-menu
                  v-model="item.received_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.received_date"
                      label="Received date"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="white"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="item.received_date"
                    @input="item.received_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-2 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  label="Show online"
                  v-model="item.show_online"
                ></v-switch>
              </div>

              <div class="col-md-1">
                <v-btn
                  color="warning"
                  x-small
                  fab
                  title="Remove"
                  class="my-0 float-right"
                  @click="removeDocumentation(i)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="info" @click="addDocumentation()">Add documentation</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    documentationOptions: [
      "YG Application",
      "Official Transcript - Original document (must be mailed)",
    ],
    documents: [],
  }),
  async created() {
    this.studentId = this.$route.params.id;
    this.loadStudent(this.studentId);},
  methods: {
    addDocumentation() {
      this.documents.push({ birth_date: "" });
    },
    removeDocumentation(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this documentation.",
        () => {
          this.documents.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
