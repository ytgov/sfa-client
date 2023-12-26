<template>
  <v-navigation-drawer
    v-model="dialog"
    app
    right
    clipped
    width="50%"
    style="max-width: 700px; overflow-y: hidden"
    disable-resize-watcher
  >
    <!-- <v-overlay absolute :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-overlay> -->
    <v-app-bar dark color="#0097A9" dense>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon title="Download" class="mr-2" @click="download"> <v-icon>mdi-download</v-icon></v-btn>
      <v-btn icon title="Close" @click="hide"><v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <v-card tile :height="previewHeight" style="overflow: scroll; height: auto; overflow:hidden">
      <v-card-text v-if="pdfUrl.length > 0">
        <pdf v-for="i in numPages" :src="loadingTask" :key="i" :page="i" @loaded="doneLoading"></pdf>
      </v-card-text>
      <v-card-text v-else style="height: 100%">
        <img :src="imageUrl" style="border: 1px #ccc solid; width: 100%; height: auto" />
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: { pdf },
  data: () => ({
    dialog: false,
    pdfUrl: "",
    imageUrl: "",
    title: "",
    loading: false,
    previewHeight: "200px",

    loadingTask: undefined,
    numPages: undefined,
  }),
  methods: {
    show(title, url) {
      this.loading = true;
      this.title = title;
      this.pdfUrl = url;
      this.dialog = true;

      this.loadingTask = pdf.createLoadingTask(this.pdfUrl, { withCredentials: true });

      this.loadingTask.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });

      let windowHeight = window.innerHeight;

      if (windowHeight < 400) this.previewHeight = "";
      else this.previewHeight = `${windowHeight - 200}px`;
    },
    showImage(title, url) {
      this.pdfUrl = "";
      this.title = title;
      this.imageUrl = url;
      this.dialog = true;
    },

    hide() {
      this.title = "";
      this.pdfUrl = "";
      this.dialog = false;
      this.loading = false;
    },
    doneLoading() {
      this.loading = false;
    },
    download() {
      if (this.pdfUrl.length > 0) window.open(this.pdfUrl);
      else window.open(this.imageUrl);

      this.hide();
    },
  },
};
</script>
