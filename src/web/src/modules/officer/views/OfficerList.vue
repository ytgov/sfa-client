<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'Officer Table',
          disabled: true,
        },
      ]"
    >
    </v-breadcrumbs>

    <v-btn @click="addClick" color="primary" class="float-right"><v-icon>mdi-plus</v-icon> Add</v-btn>
    <h1>Officer Table</h1>

    <v-data-table :items="users" :headers="headers" @click:row="rowClick">
      <template v-slot:item.is_active="{ item }">
        <v-icon v-if="item.is_active" color="success">mdi-check</v-icon>
      </template>
      <template v-slot:item.name="{ item }"> {{ item.first_name }} {{ item.last_name }} </template>
    </v-data-table>

    <v-dialog v-model="showEditor" persistent max-width="600px">
      <v-card v-if="user">
        <v-card-title>Officer Edit </v-card-title>
        <v-card-text class="pt-3">
          <v-text-field label="First name" v-model="user.first_name" dense outlined></v-text-field>
          <v-text-field label="Last name" v-model="user.last_name" dense outlined></v-text-field>
          <v-text-field label="Position" v-model="user.position" dense outlined></v-text-field>
          <v-text-field label="Phone" v-model="user.phone" dense outlined></v-text-field>
          <v-text-field label="Phone toll-free" v-model="user.phone_tollfree" dense outlined></v-text-field>
          <v-text-field label="Fax" v-model="user.fax" dense outlined></v-text-field>
          <v-text-field label="Email" v-model="user.email" dense outlined></v-text-field>
          <v-text-field label="Email public" v-model="user.email_public" dense outlined></v-text-field>
          <v-select label="Role" v-model="user.roles" :items="roleOptions" dense outlined clearable></v-select>
          <v-select
            v-model="user.is_active"
            label="Status"
            dense
            outlined
            :items="[
              { text: 'Active', value: true },
              { text: 'Inactive', value: false },
            ]"
          ></v-select>

          <div class="d-flex">
            <v-btn color="primary" @click="saveClick" :disabled="!isValid">Save</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="cancelClick">Cancel</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { clone } from "lodash";
import { mapState } from "vuex";

export default {
  name: "OfficerList",
  data: () => ({
    headers: [
      { value: "email", text: "Email" },
      { value: "name", text: "Name" },
      { value: "is_active", text: "Active" },
      { value: "roles", text: "Role" },
    ],
    showEditor: false,
    user: undefined,
  }),
  components: {},
  computed: {
    ...mapState(["showSideBarAdmin"]),
    ...mapState("officers", ["users", "roleOptions"]),
    isValid() {
      if (this.user) {
        if (this.user.first_name && this.user.last_name && this.user.email && this.user.email_public) return true;
      }

      return false;
    },
  },
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));
    await store.dispatch("officers/loadUsers");
  },
  methods: {
    rowClick(item) {
      this.user = clone(item);
      this.showEditor = true;
    },
    cancelClick() {
      this.showEditor = false;
      this.user = undefined;
    },
    async saveClick() {

      console.log(this.user.id)

      if (this.user.id) await store.dispatch("officers/update", this.user);
      else await store.dispatch("officers/create", this.user);

      this.cancelClick();
    },
    addClick() {
      this.user = { is_active: true };
      this.showEditor = true;
    },
  },
};
</script>
