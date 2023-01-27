<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'Institutions',
          to: '/administration/institutions',
          exact: true,
        },
        {
          text: institution.name,
          to: `/administration/institutions/${institutionId}`,
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>

    <div class="float-right">
      <v-menu offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" small v-bind="attrs" v-on="on" class="mt-2">
            Actions <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="addCampus">
            <v-list-item-icon
              ><v-icon>mdi-plus-circle-outline</v-icon></v-list-item-icon
            >
            <v-list-item-title>Add Campus</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="mergeCampus"
            v-if="institution.campuses.length > 1"
          >
            <v-list-item-icon
              ><v-icon>mdi-vector-combine</v-icon></v-list-item-icon
            >
            <v-list-item-title>Merge Campuses</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <h1>{{ institution.name }}</h1>

    <v-row style="clear: both">
      <v-col cols="6">
        <v-card class="default mb-5">
          <v-card-title>Institution details</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="institution.name"
              label="Name"
              dense
              outlined
              background-color="white"
              @change="doSave('name', institution.name)"
            ></v-text-field>

            <v-row>
              <v-col cols="7">
                <v-select
                  :items="levelOptions"
                  item-text="description"
                  item-value="id"
                  v-model="institution.institution_level_id"
                  label="Level"
                  dense
                  outlined
                  hide-details
                  background-color="white"
                  @change="
                    doSave(
                      'institution_level_id',
                      institution.institution_level_id
                    )
                  "
                ></v-select
              ></v-col>
              <v-col cols="5">
                <v-switch
                  v-model="institution.is_active"
                  label="Active"
                  class="mt-1"
                  dense
                  outlined
                  hide-details
                  @change="doSave('is_active', institution.is_active)"
                ></v-switch
              ></v-col>

              <v-col cols="7">
                <v-text-field
                  v-model="institution.federal_institution_code"
                  dense
                  outlined
                  label="Federal code"
                  background-color="white"
                  hide-details
                  @change="
                    doSave(
                      'federal_institution_code',
                      institution.federal_institution_code
                    )
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="mx-auto text-center default">
          <v-card-text>
            <v-sheet
              color="white"
              outlined
              rounded
              style="border: 1px #e1d6bc solid !important"
            >
              <v-sparkline
                :value="statValues"
                :labels="statLabels"
                color="success"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
                fill
              >
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h5">
              Applications - last {{ stats.length }} years <br /><small
                >{{ institution.total_connections }} in Total</small
              >
            </div>
          </v-card-text>
        </v-card>
        <v-btn
          color="error"
          @click="removeInstitution"
          v-if="institution.has_connections == false"
          >Remove institution</v-btn
        >
      </v-col>
      <v-col cols="6">
        <div v-for="(item, idx) of institution.campuses" :key="idx">
          <v-card class="default mb-5">
            <v-card-title
              ><strong class="mr-2">{{ item.name }}</strong> Campus -
              <strong class="ml-2">{{ item.federal_institution_code }}</strong>
            </v-card-title>
            <v-card-subtitle>
              <span>{{ item.total_connections }} Applications in Total</span>
            </v-card-subtitle>
            <v-card-text>
              <p v-if="item.email_address">
                <a :href="`mailto:item.email_address`">{{
                  item.email_address
                }}</a>
              </p>
              <p><strong>Care of:</strong> {{ item.care_of }}</p>

              <p class="mb-0">
                <strong>Address:</strong><br />
                <span v-if="item.address_line_1"
                  >{{ item.address_line_1 }}<br
                /></span>
                <span v-if="item.address_line_2"
                  >{{ item.address_line_2 }}<br />
                </span>
                <span v-if="item.address_city"
                  >{{ item.address_city.description }},
                </span>
                <span v-if="item.address_province">
                  {{ item.address_province.description }}
                </span>
                {{ item.address_postal_code }}
                <span v-if="item.address_country">
                  <br />
                  {{ item.address_country.description }}
                </span>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-chip color="success" class="mr-2" v-if="item.is_active">
                <v-icon class="mr-2">mdi-check-bold</v-icon>
                Active
              </v-chip>

              <v-chip color="warning" class="mr-2" v-if="!item.is_active">
                <v-icon class="mr-2">mdi-check-bold</v-icon>
                Inactive
              </v-chip>

              <v-chip color="success" class="mr-2" v-if="item.is_primary">
                <v-icon class="mr-2">mdi-star-outline</v-icon>
                Primary
              </v-chip>

              <v-spacer></v-spacer>

              <v-chip
                color="primary"
                class="my-0"
                :to="`/administration/institutions/${institution.id}/campus/${item.id}`"
              >
                <v-icon class="mr-2">mdi-pencil</v-icon> Edit
              </v-chip>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <confirm-dialog ref="confirm"></confirm-dialog>
    <notifier ref="notifier"></notifier>
    <merge-campus-dialog
      ref="merge"
      :institution="institution"
      :doCampusMerge="doCampusMerge"
    ></merge-campus-dialog>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import { mapState } from "vuex";
import { INSTITUTION_LEVEL_URL, INSTITUTION_URL } from "@/urls";
import MergeCampusDialog from "../components/MergeCampusDialog.vue";

export default {
  components: { MergeCampusDialog },
  data: () => ({
    isLoading: false,
    institutionId: -1,
    institution: { campuses: [] },
    levelOptions: [],
    stats: [],
  }),
  watch: {
    "$route.params.id": {
      handler: function (id) {
        this.institutionId = id;
        this.loadInstitution(id);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    statValues: function () {
      return this.stats.map((s) => s.application_count);
    },
    statLabels: function () {
      return this.stats.map((s) => s.academic_year);
    },
    ...mapState(["showSideBarAdmin"]),
  },
  async created() {
    this.loadLevels();
    await store.dispatch(
      "setAppSideBarAdmin",
      this.$route.path.startsWith("/administration"));
  },
  methods: {
    loadLevels() {
      axios.get(`${INSTITUTION_LEVEL_URL}`).then((resp) => {
        this.levelOptions = resp.data.data;
      });
    },
    loadInstitution(id) {
      this.isLoading = true;

      axios
        .get(`${INSTITUTION_URL}/${id}`)
        .then((resp) => {
          this.institution = resp.data.data;
          this.loadStats(id);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadStats(id) {
      axios.get(`${INSTITUTION_URL}/${id}/stats`).then((resp) => {
        this.stats = resp.data.data;
      });
    },
    async doSave(field, value) {
      let isError = await store.dispatch("updateInstitution", [
        field,
        value,
        this,
        this.institutionId,
      ]);

      if (isError) {
        this.loadInstitution(this.institutionId);
      }
    },
    removeInstitution() {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this institution. This operation will not complete if any applications reference this institution.",
        async () => {
          await store.dispatch("deleteInstitution", [this.institution, this]);
          this.$router.push("/administration/institutions");
        },
        () => {}
      );
    },
    addCampus() {
      store.dispatch("createCampus", [
        this.institutionId,
        this,
        (campusId) => {
          this.$router.push(
            `/administration/institutions/${this.institutionId}/campus/${campusId}`
          );
        },
      ]);
    },
    mergeCampus() {
      this.$refs.merge.show();
    },
    doCampusMerge(source, dest) {
      console.log(source, dest);

      let body = {
        sourceId: source,
        destId: dest,
      };

      axios
        .post(`${INSTITUTION_URL}/${this.institutionId}/merge-campuses`, body)
        .then((resp) => {
          this.loadInstitution(this.institutionId);
          this.$refs.merge.hide();
          this.$refs.notifier.showAPIMessages(resp.data);
        });
    },
  },
};
</script>
