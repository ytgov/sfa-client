<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'First Nation', value: 'description', filterable: true, },
      { text: 'City', value: 'city_name', filterable: true, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">
      <!-- FIRST_NATION -->
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

      <!-- CITY_NAME -->
      <template v-slot:item.city_name="props">
        <v-autocomplete label="City" :items="cities" item-text="description" item-value="id"
          v-model="props.item.city_id"
          @change="changeCity(props.item.id, props.item.city_id, props.item.description)"></v-autocomplete>
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
import { FIRST_NATION } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "FirstNationTab",
  data() {
    return {
      descriptionToChange: '',
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
    close() {
    },
    changeStatus(id, isActive) {
      axios.patch(FIRST_NATION + `/status/${id}`, { is_active: isActive })
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
          store.dispatch("setFirstNations", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(FIRST_NATION + `/description/${id}`, { description: description })
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
          store.dispatch("setFirstNations", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(FIRST_NATION + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete &&
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
          store.dispatch("setFirstNations", false);
          this.showModalDelete(null);
        });
    },
    changeCity(id, idCity, description) {
      axios.patch(FIRST_NATION + `/city/${id}`, { city_id: idCity, description })
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
          store.dispatch("setFirstNations", false);
          store.dispatch("setCities");
        });
    },
  },
  computed: {
    ...mapGetters(["search", "activeOnlyFilter", "firstNations", "cities"]),
    filteredList: function () {
      let l = _.clone(this.firstNations);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setFirstNations", false);
    await store.dispatch("setCities");
  },
  components: {
    ModalConfirm,
  }
};
</script>
