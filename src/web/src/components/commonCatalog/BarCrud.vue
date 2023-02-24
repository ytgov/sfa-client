<template>
<div>
    <v-row>   
      <v-col cols="6"
        >
        <v-text-field
          v-model="search"
          label="Search"
          dense
          outlined
        ></v-text-field>
      </v-col>
      <v-col v-if="filterActiveOnly">
          <v-switch
                label="Active only?"
                class="mt-1"
                v-model="activeOnly"
            ></v-switch>
        </v-col>
      <v-col>
          <v-btn
              color="primary"
              class="my-0 float-right"
              @click="setDialog"
          >
          <v-icon>mdi-plus</v-icon> Add
          </v-btn>
      </v-col>
    </v-row>
</div>
</template>

<script>
import store from "@/store";

export default {
  name: "CrudBar",
  data: () => ({
    search: '',
    activeOnly: false,
  }),
  computed: {
  },
  watch: {
    search (val) {
        store.dispatch("setSearch", val);
    },
    activeOnly: function (val) {
      store.dispatch("setActiveOnlyFilter", val);
    },
  },
  props: {
    filterActiveOnly: Boolean,
    dialog: Boolean,
    setDialog: Function,
    
  },
  created() {
    store.dispatch("setSearch", '');
    store.dispatch("setActiveOnlyFilter", false);
  },
};
</script>