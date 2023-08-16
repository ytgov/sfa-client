<template>
  <v-dialog v-model="dialogModel" persistent max-width="700px">
    <v-card>
      <v-card-text>
        <div class="d-flex justify-center">
          <v-card-title>Vendor Selection</v-card-title>
        </div>

        <div class="row">
          <div class="col-6">
            <v-text-field
              v-model="searcher"
              label="Filter"
              dense
              outlined
              append-icon="mdi-magnify"
              @click:append="vendorSearchClick"
              @keydown="checkEnter"
              hint="Enter a search term and press Enter"
              persistent-hint
            >
            </v-text-field>
          </div>
          <div class="col-6">
            <div class="row">
              <v-switch label="Vendor ID" v-model="filterVendorId"> </v-switch>
              <v-switch label="Vendor Name" class="ml-5" v-model="filterVendorName"> </v-switch>
            </div>
          </div>
        </div>

        <v-data-table
          height="400px"
          @click:row="enterSelect"
          :headers="[
            { text: 'Vendor ID', value: 'VendorId', sortable: false, filterable: filterVendorId },
            { text: 'Vendor Name', value: 'VendName', sortable: false, filterable: filterVendorName },
          ]"
          :items="vendorList"
        >
          <template v-slot:item="i">
            <!-- Since v-slot:item overrides how each row is rendered, I rebuild the row starting from <tr>. This allows me to add a class to <tr> based on any condition I want (in this case, the calorie count) -->
            <tr :class="i.item.VendorId === current?.VendorId && 'success'" @click="enterSelect(i.item)">
              <td>{{ i.item.VendorId }}</td>
              <td>{{ i.item.VendName }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" :disabled="!!!current" @click="doConfirm()">Confirm</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="doDeny()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    student: function() {
      return store.getters.selectedStudent;
    },
  },
  watch: {
    searcher(val) {
      store.dispatch("setSearch", val);
    },
  },
  components: {},
  data: () => ({
    searcher: "",
    filterVendorId: true,
    filterVendorName: true,
    title: "",
    current: null,
  }),
  methods: {
    doSaveStudent(field, value, type, extraId = null, addressType = "") {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
    doConfirm() {
      if (this.current?.VendorId) {
        this.doSaveStudent("vendor_id", this.current.VendorId, "studentInfo", this.student.id);
      }
      this.current = null;
      this.searcher = "";
      this.showModal(false);
    },
    doDeny() {
      this.current = null;
      this.searcher = "";
      this.showModal(false);
    },
    enterSelect(e) {
      this.current = e;
    },
    vendorSearchClick() {
      this.doSearch(this.searcher);
    },
    checkEnter(event) {
      if (event.key === "Enter") this.doSearch(this.searcher);
    },
  },
  async created() {},
  props: {
    dialogModel: Boolean,
    showModal: Function,
    getVendorData: Function,
    vendorList: Array,
    doSearch: Function,
  },
};
</script>
