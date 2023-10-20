<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[{ text: 'Administration Home', to: '/administration', exact: true }, { text: 'YEA Import' }]"
    >
    </v-breadcrumbs>

    <h1>YEA Import</h1>
    <v-card class="default mb-5">
      <v-card-text>
        <v-row>
          <v-col class="d-flex">
            <v-file-input
              outlined
              dense
              background-color="white"
              hide-details
              label="Select document"
              v-model="file"
              accept=".txt"
            />

            <div class="text-right ml-4">
              <v-btn :disabled="!file" @click="importFile()" class="my-0" color="primary" style="height: 40px"
                >Upload</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
import { YEA_IMPORT_URL } from "@/urls";
export default {
  name: "YEAImport",
  data: () => ({
    file: null,
  }),
  components: {},
  computed: {},
  async mounted() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));
  },
  methods: {
    async importFile() {
      const formData = new FormData();
      formData.append("file", this.file);

      axios
        .post(YEA_IMPORT_URL, formData)
        .then((resp) => {
          if (resp.error) {
            this.$emit("showError", resp.error);
          } else {
            this.$emit("showSuccess", resp.data);
          }
        })
        .catch((resp) => {
          if (resp.response.data.error) {
            this.$emit("showError", resp.response.data.error);
          }
        });
    },
  },
};
</script>
