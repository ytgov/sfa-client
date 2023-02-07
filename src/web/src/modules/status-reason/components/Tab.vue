<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'Status Description', value: 'description', filterable: true, },
      { text: 'Status id', value: 'status_id', filterable: true, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">
      <!-- STATUS_REASON -->
      <template v-slot:item.description="props">
        <v-edit-dialog :return-value.sync="props.item.description" large
          @save="save(props.item.id, descriptionToChange)" @cancel="cancel" @open="openEdit(props.item.description)"
          @close="close">
          {{ props.item.description }}
          <template v-slot:input>
            <v-text-field v-model="descriptionToChange" :rules="[max199chars]" label="Edit" single-line counter
              color="#F3B228"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- STATUS ID -->
      <template v-slot:item.status_id="props">
        <v-autocomplete label="Status Id" :items="statusList" item-text="description" item-value="id"
          v-model="props.item.status_id" @change="changeStatusId(props.item.id, props.item.status_id)"></v-autocomplete>
      </template>

      <!-- STATUS_REASON -->
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
import { STATUS_REASON } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "StatusReasonTab",
  data() {
    return {
      descriptionToChange: '',
      onlineDescriptionToChange: '',
      isHide: false,
      idToDelete: undefined,
      max199chars: v => v.length <= 199 || 'Input too long!',
    };
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    save(id, description) {
      this.changeDescription(id, description);
    },
    openEdit(value) {
      this.descriptionToChange = value;
      this.open();
    },
    saveOnlineDescription(id, description) {
      this.changeOnlineDescription(id, description);
    },
    openEditOnlineDescription(value) {
      this.onlineDescriptionToChange = value;
      this.open();
    },
    close() {
    },
    changeStatusId(id, status_id) {
      axios.patch(STATUS_REASON + `/change-status-id/${id}`, { status_id })
        .then((resp) => {
          resp?.data?.wasUpdated ?
            this.messageStatus({ message: "success!", status: "success" })
            :
            this.messageStatus({ message: "Error!", status: "error" });
        })
        .catch((err) => {
          console.log(err);
          const res = { ...err };
          const message = res?.response?.data?.message ? res.response.data.message : "Error!";
          this.messageStatus({ message, status: 'error' });
        })
        .finally(() => {
          store.dispatch("setStatusReasons", false);
          store.dispatch("setStatus");
        });
    },
    changeStatus(id, isActive) {
      axios.patch(STATUS_REASON + `/status/${id}`, { is_active: isActive })
        .then((resp) => {

          resp?.data?.wasUpdated ?
            this.messageStatus({ message: "Switched!", status: "success" })
            :
            this.messageStatus({ message: "Error!", status: "Error" })

        })
        .catch((err) => {
          console.log(err);
          this.messageStatus("Error!", "error");
        })
        .finally(() => {
          store.dispatch("setStatusReasons", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(STATUS_REASON + `/description/${id}`, { description: description })
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
          store.dispatch("setStatusReasons", false);
        });
    },
    changeOnlineDescription(id, description) {
      axios.patch(STATUS_REASON + `/online-description/${id}`, { online_description: description })
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
          store.dispatch("setStatusReasons", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(STATUS_REASON + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setStatusReasons", false);;
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
    ...mapGetters(["search", "activeOnlyFilter", "statusReasons", "statusList"]),
    filteredList: function () {
      let l = _.clone(this.statusReasons);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setStatusReasons", false);
    await store.dispatch("setStatus");
  },
  components: {
    ModalConfirm,
  }
};
</script>
