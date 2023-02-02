<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'Start Age', value: 'start_age', filterable: true, },
      { text: 'End Age', value: 'end_age', filterable: true, },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="ageDistributions" class="mt-8">

      <!-- START_AGE -->
      <template v-slot:item.start_age="props">
        <v-edit-dialog :return-value.sync="props.item.start_age" large
          @save="save(props.item.id, Number(startAge), props.item.end_age)" @cancel="cancel"
          @open="openEditStartAge(props.item.start_age)" @close="close">
          {{ props.item.start_age }}
          <template v-slot:input>
            <v-text-field v-model="startAge" label="Edit" type="number" single-line counter color="#F3B228"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- END_AGE-->
      <template v-slot:item.end_age="props">
        <v-edit-dialog :return-value.sync="props.item.end_age" large
          @save="save(props.item.id, props.item.start_age, Number(endAge))" @cancel="cancel"
          @open="openEditEndAge(props.item.end_age)" @close="close">
          {{ props.item.end_age }}
          <template v-slot:input>
            <v-text-field v-model="endAge" label="Edit" type="number" single-line counter color="#F3B228"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- DELETE -->
      <template v-slot:item.id="props">
        <v-btn color="transparent" @click="showModalDelete(props.item.id)">

          <v-icon color="black font-weight-thin" size="21">
            {{ 'mdi-trash-can-outline'}}
          </v-icon>

        </v-btn>
      </template>

    </v-data-table>
    <!-- TABLE -->

    <ModalConfirm :messageStatus="messageStatus" :dialog="isHide" :setDialog="showModalDelete"
      :deleteFunction="deleteRecord"></ModalConfirm>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import { AGE_DISTRIBUTION } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "SexTab",
  data() {
    return {
      startAge: 0,
      endAge: 1,
      isHide: false,
      idToDelete: undefined,
    };
  },
  watch: {
    startAge(value, oldValue) {
      const regexRange = /^[0-9]$|^[1-9][0-9]$|^[0-1][0-9][0-9]$/g;
      if (regexRange.test(value)) {
        this.startAge = value;
      } else {
        this.startAge = "";
      }
    },
    endAge(value, oldValue) {
      const regexRange = /^[0-9]$|^[1-9][0-9]$|^[0-1][0-9][0-9]$/g;
      if (regexRange.test(value)) {
        this.endAge = value;
      } else {
        this.endAge = "";
      }
    }
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    save(id, star, end) {
      this.changeDistribution(id, star, end);
    },
    openEditStartAge(value) {
      this.startAge = value;
      this.open();
    },
    openEditEndAge(value) {
      this.endAge = value;
      this.open();
    },
    close() {
    },
    changeDistribution(id, start, end) {
      axios.patch(AGE_DISTRIBUTION + `/distribution/${id}`, { start_age: start, end_age: end })
        .then((resp) => {
          resp?.data?.wasUpdated ?
            this.messageStatus({ message: "Updated!", status: "success" })
            :
            this.messageStatus({ message: "Error!", status: "error" })
        })
        .catch((err) => {
          console.log(err);
          const res = { ...err };
          const message = res?.response?.data?.message ?
            res.response.data.message
            :
            "Error!"
          this.messageStatus({ message, status: "error" });
        })
        .finally(() => {
          store.dispatch("setAgeDistributions");
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(AGE_DISTRIBUTION + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setAgeDistributions");
          this.messageStatus({ message: "success!", status: "success" });
        })
        .catch((err) => {
          console.log(err);
          this.messageStatus({ message: "Error to delete", status: "error" });
        })
        .finally(() => {
          this.showModalDelete(null);
        });
    },
  },
  computed: {
    ...mapGetters(["search", "activeOnlyFilter", "ageDistributions"]),

  },
  async created() {
    await store.dispatch("setAgeDistributions");
  },
  components: {
    ModalConfirm,
  }
};
</script>
