<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: 'High School', value: 'name', filterable: true, },
      { text: 'City', value: 'city_name', filterable: true, },
      { text: 'Province', value: 'province_name', filterable: true, },
      { text: 'Country', value: 'country_name', filterable: true, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">

      <!-- HIGH_SCHOOL -->
      <template v-slot:item.name="props">
        <v-edit-dialog :return-value.sync="props.item.name" large @save="saveName(props.item.id, nameToChange)"
          @cancel="cancel" @open="openEditName(props.item.name)" @close="close">
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field v-model="nameToChange" :rules="[max199chars]" label="Edit" single-line counter
              color="#F3B228"></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- CITY_NAME -->
      <template v-slot:item.city_name="props">
        <v-autocomplete label="City" :items="cities" item-text="description" item-value="id"
          v-model="props.item.city_id"
          @change="changeLocation(props.item.id, props.item.city_id, 'city')"></v-autocomplete>
      </template>

      <!-- PROVINCE_NAME -->
      <template v-slot:item.province_name="props">
        <v-autocomplete label="Province" :items="provinces" item-text="description" item-value="id"
          v-model="props.item.province_id"
          @change="changeLocation(props.item.id, props.item.province_id, 'province')"></v-autocomplete>
      </template>

      <!-- COUNTRY_NAME -->
      <template v-slot:item.country_name="props">
        <v-autocomplete label="Country" :items="countries" item-text="description" item-value="id"
          v-model="props.item.country_id"
          @change="changeLocation(props.item.id, props.item.country_id, 'country')"></v-autocomplete>
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
import { HIGH_SCHOOL } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "HighSchoolTab",
  data() {
    return {
      nameToChange: '',
      isHide: false,
      idToDelete: undefined,
      max199chars: v => v.length <= 199 || 'Input too long!',
    };
  },
  methods: {
    ...mapActions(["cancel", "open", "messageStatus"]),
    saveName(id, description) {
      this.changeName(id, description);
    },
    openEditName(value) {
      this.nameToChange = value;
      this.open();
    },
    close() {
    },
    changeLocation(id, value, type) {
      axios.patch(HIGH_SCHOOL + `/location/${id}`, { value, type })
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
          store.dispatch("setHighSchools", false);
        });
    },
    changeStatus(id, isActive) {
      axios.patch(HIGH_SCHOOL + `/status/${id}`, { is_active: isActive })
        .then((resp) => {

          resp?.data?.wasUpdated ?
            this.messageStatus({ message: "Switched!", status: "success" })
            :
            this.messageStatus({ message: "Error!", status: "error" })

        })
        .catch((err) => {
          console.log(err);
          this.messageStatus({ message: "Error!", status: "error" });
        })
        .finally(() => {
          store.dispatch("setHighSchools", false);
        });
    },
    changeName(id, name) {
      axios.patch(HIGH_SCHOOL + `/name/${id}`, { name: name })
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
          store.dispatch("setHighSchools", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(HIGH_SCHOOL + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setHighSchools", false);;
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
    ...mapGetters(["search", "activeOnlyFilter", "highSchools", "cities", "provinces", "countries"]),
    filteredList: function () {
      let l = _.clone(this.highSchools);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setHighSchools", false);
    await store.dispatch("setCities");
    await store.dispatch("setProvinces");
    await store.dispatch("setCountries");
  },
  components: {
    ModalConfirm,
  }
};
</script>
