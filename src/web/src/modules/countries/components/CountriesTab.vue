<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'Country', value: 'description', filterable: !countrySelected, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">
      <!-- COUNTRIES -->
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

    <modalConfirmCountries :messageStatus="messageStatus" :dialog="isHide" :setDialog="showModalDelete"
      :deleteFunction="deleteCountry"></modalConfirmCountries>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import { COUNTRIES } from '@/urls';
import axios from "axios";
import modalConfirmCountries from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "CountriesTab",
  data() {
    return {
      descriptionToChange: '',
      isHide: false,
      idToDelete: undefined,
      countrySelected: false,
      max199chars: v => v.length <= 199 || 'Input too long!',
    };
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    save(id, description) {
      this.changeDescription(id, description);
    },
    close() {
    },
    openEdit(value) {
      this.descriptionToChange = value;
      this.open();
    },
    changeStatus(id, isActive) {
      axios.patch(COUNTRIES + `/status/${id}`, { is_active: isActive })
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
          store.dispatch("setCountries", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(COUNTRIES + `/description/${id}`, { description: description })
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
          store.dispatch("setCountries", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteCountry() {
      axios.delete(COUNTRIES + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setCountries", false);
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
    ...mapGetters(["search", "activeOnlyFilter", "countries"]),
    filteredList: function () {
      let l = _.clone(this.countries);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setCountries", false);
  },
  components: {
    modalConfirmCountries,
  }
};
</script>
