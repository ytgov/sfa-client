<template>
    <v-dialog v-model="dialogModel" persistent max-width="700px">
      <v-card>
        <div class="d-flex justify-center">
            <v-card-title>Vendor Selection</v-card-title>
        </div>

        <div class="row mx-4">
            <div class="col-6">
                <v-text-field
                    v-model="search"
                    label="Filter"
                    dense
                    outlined
                >
                </v-text-field>
            </div>
            <div class="col-6">
                <div class="row">
                    <v-switch
                    label="Vendor ID"
                    v-model="filterVendorId"
                >
                </v-switch>
                <v-switch 
                    label="Vendor Name"
                    class="ml-5"
                    v-model="filterVendorName"
                >
                </v-switch>
                </div>
            </div>
        </div>
        
        <v-data-table
            :search="search"
            height="400px"
            @click:row="enterSelect($event)"
            :headers="[
                { text: 'Vendor ID', value: 'VendorId', sortable: false, filterable: filterVendorId, },
                { text: 'Last Name', value: 'VendName', sortable: false, filterable: filterVendorName, },
            ]"
            :items="vendorList"
        >
            <template v-slot:item="i">
            <!-- Since v-slot:item overrides how each row is rendered, I rebuild the row starting from <tr>. This allows me to add a class to <tr> based on any condition I want (in this case, the calorie count) -->
                <tr :class="i.item.VendorId === current?.VendorId && 'success'" @click="enterSelect(i.item)">
                <td>{{i.item.VendorId}}</td>
                <td>{{i.item.VendName}}</td>
                </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-card>
        <v-card-actions>
          <v-btn color="primary" :disabled="!!!current" @click="doConfirm()">Confirm</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="doDeny()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
    computed:{
        ...mapGetters(["search"]),
        student: function () {
            return store.getters.selectedStudent;
        },
    },
    watch: {
        search (val) {
            store.dispatch("setSearch", val);
        },
    },
    components: {

    },
    data: () => ({
        filterVendorId: true,
        filterVendorName: true,
        search: '',
        selected: [],
        title: "",
        message: "",
        confirmCallback: null,
        denyCallback: null,
        current: null
    }),
    methods: {
        doSaveStudent(field, value, type, extraId = null, addressType = "") {
            store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
        },
        doConfirm() {
            if (this.current?.VendorId) {
                this.doSaveStudent('vendor_id', this.current.VendorId, 'studentInfo', this.student.id);
            }
            this.current = null;
            this.search = '';
            this.showModal(false);
        },
        doDeny() {
            this.current = null;
            this.search = '';
            this.showModal(false);
        },
        enterSelect(e) {
            console.log(e);
            this.current = e;
        },
    },
    async created() {

    },
    props: {
        dialogModel: Boolean,
        showModal: Function,
        getVendorData: Function,
        vendorList: Array,
    }
};
</script>