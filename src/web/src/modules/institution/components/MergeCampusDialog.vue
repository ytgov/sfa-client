<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card class="">
      <v-card-title>Merge Campuses of {{ institution.name }}</v-card-title>
      <v-card-text>
        <v-divider class="mb-5"></v-divider>
        <v-form>
          <p>
            This action will move all student applications into the destination
            campus and permanently remove the source campus.
          </p>

          <v-select
            dense
            outlined
            :items="institution.campuses"
            item-text="name"
            item-value="id"
            label="Destination campus"
            persistent-hint
            hint="This campus will remain"
            v-model="destinationId"
            class="mb-3"
          ></v-select>

          <v-select
            dense
            outlined
            :items="institution.campuses"
            item-text="name"
            item-value="id"
            label="Source campus"
            persistent-hint
            hint="This campus will be removed"
            v-model="sourceId"
          ></v-select>

          <v-divider></v-divider>
          <p class="text-error mb-1 mt-4">* This action cannot be undone</p>
          <v-btn color="secondary" class="mb-0" @click="visible = false"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="float-right mb-0"
            @click="doMerge"
            :disabled="!valid"
            >Merge</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["institution", "doCampusMerge"],
  data: () => ({
    visible: false,
    sourceId: 0,
    destinationId: 0,
  }),
  computed: {
    valid: function () {
      return this.sourceId != this.destinationId;
    },
  },
  created() {},
  methods: {
    show() {
      this.visible = true;

      this.destinationId = this.institution.campuses[0].id;
      this.sourceId = this.institution.campuses[1].id;
    },
    hide() {
      this.visible = false;
    },
    doMerge() {
      this.doCampusMerge(this.sourceId, this.destinationId);
    },
  },
};
</script>
