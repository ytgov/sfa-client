<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'code', value: 'code', filterable: true, },
      { text: 'Student Category', value: 'description', filterable: true, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">
      <!-- CODE -->
      <template v-slot:item.code="props">
        <v-edit-dialog :return-value.sync="props.item.code" large
          @save="saveCode(props.item.id, codeToChange)" @cancel="cancel" @open="openEditCode(props.item.code)" @close="close">
          {{ props.item.code }}
          <template v-slot:input>
            <v-text-field v-model="codeToChange" :rules="[max199chars]" label="Edit" single-line counter
              color="#F3B228"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- STUDENT_CATEGORY -->
      <template v-slot:item.description="props">
        <v-edit-dialog :return-value.sync="props.item.description" large
          @save="saveDescription(props.item.id, descriptionToChange)" @cancel="cancel" @open="openEditDescription(props.item.description)" @close="close">
          {{ props.item.description }}
          <template v-slot:input>
            <v-text-field v-model="descriptionToChange" :rules="[max199chars]" label="Edit" single-line counter
              color="#F3B228"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- STATUS -->
      <template v-slot:item.is_active="props">
        <div style="width: 40px;">
          <v-switch v-model="props.item.is_active"
            @click="changeStatus(props.item.id, props.item.is_active)"></v-switch>
        </div>
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
import { STUDENT_CATEGORY } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "StudentCategoryTab",
  data() {
    return {
      descriptionToChange: '',
      codeToChange: '',
      isHide: false,
      idToDelete: undefined,
      max199chars: v => v.length <= 199 || 'Input too long!',
    };
  },
  watch: {
    codeToChange(value, oldValue) {
      if (value.length <= 10) {
        this.codeToChange = value.toUpperCase();
      } else {
        this.codeToChange = "";
      }
    }
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    saveCode(id, code) {
      this.changeCode(id, code);
    },
    saveDescription(id, description) {
      this.changeDescription(id, description);
    },
    openEditCode(value) {
      this.codeToChange = value;
      this.open();
    },
    openEditDescription(value) {
      this.descriptionToChange = value;
      this.open();
    },
    close() {
    },
    changeStatus(id, isActive) {
      axios.patch(STUDENT_CATEGORY + `/status/${id}`, { is_active: isActive })
        .then((resp) => {

          resp?.data?.wasUpdated ?
            this.messageStatus({ message: "Switched!", status: "success" })
            :
            this.messageStatus({ message: "Error!", status: "Error" })

        })
        .catch((err) => {
          console.log(err);
          this.messageStatus({ message: "Error!", status: "error" });
        })
        .finally(() => {
          store.dispatch("setStudentCategories", false);
        });
    },
    changeCode(id, code) {
      axios.patch(STUDENT_CATEGORY + `/code/${id}`, { code: code })
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
          store.dispatch("setStudentCategories", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(STUDENT_CATEGORY + `/description/${id}`, { description: description })
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
          store.dispatch("setStudentCategories", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(STUDENT_CATEGORY + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setStudentCategories", false);;
          this.messageStatus({ message: "success!", status: "success" });
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
          this.showModalDelete(null);
        });
    },
  },
  computed: {
    ...mapGetters(["search", "activeOnlyFilter", "studentCategories"]),
    filteredList: function () {
      let l = _.clone(this.studentCategories);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setStudentCategories", false);
  },
  components: {
    ModalConfirm,
  }
};
</script>
