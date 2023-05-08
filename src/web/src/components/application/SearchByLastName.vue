<template>
    <v-dialog v-model="dialogModel" persistent max-width="700px">
      <v-card>
        <div class="d-flex justify-center">
            <v-card-title>YEA Student Selection</v-card-title>
        </div>
        <v-data-table
            height="400px"
            @click:row="enterSelect($event)"
            :headers="[
                { text: 'First Name', value: 'first_name', filterable: true, },
                { text: 'Last Name', value: 'last_name', sortable: false, filterable: false, },
                { text: 'Birth Date', value: 'birth_date', filterable: true, },
                { text: 'Yukon ID', value: 'yukon_id', sortable: false, filterable: false },
            ]"
            :items="yeaList"
        >
            <template v-slot:item="i">
            <!-- Since v-slot:item overrides how each row is rendered, I rebuild the row starting from <tr>. This allows me to add a class to <tr> based on any condition I want (in this case, the calorie count) -->
                <tr :class="i.item.id === current?.id && 'success'" @click="enterSelect(i.item)">
                <td>{{i.item.first_name}}</td>
                <td>{{i.item.last_name}}</td>
                <td>{{i.item.birth_date?.slice(0, 10)}}</td>
                <td>{{i.item.yukon_id}}</td>
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
        student: function () {
            return store.getters.selectedStudent;
        },
    },
    components: {

    },
    data: () => ({
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
            if (this.current?.yukon_id) {
                this.doSaveStudent('yukon_id', this.current.yukon_id, 'studentInfo', this.student.id);
            }
            this.current = null;
            this.showModal(false);
        },
        doDeny() {
            this.current = null;
            this.showModal(false);
        },
        enterSelect(e) {
            console.log(e);
            this.current = e;
        },
    },
    async created() {
        if (this.student?.yukon_id) {
            this.current = this.yeaList
                .find(yea => Number(yea.yukon_id) === Number(this.student.yukon_id)) || null;
        }
    },
    props: {
        dialogModel: Boolean,
        showModal: Function,
        yeaList: Array,
        
    }
};
</script>