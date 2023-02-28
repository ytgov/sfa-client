<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: '', value: '', filterable: false, sortable: false },
      { text: 'Aboriginal Status', value: 'description', filterable: true, },
      { text: 'NARS', value: 'nars_status_id', filterable: false, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">

      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody" @end="endDrag($event, props.items)">
          <tr v-for="(data, index) in props.items" :key="index">
            <td>
              <v-icon small class="page__grab-icon">
                mdi-arrow-all
              </v-icon>
            </td>
            <!-- ABORIGINAL_STATUS -->
            <td>
              <v-edit-dialog :return-value.sync="data.description" large @save="save(data.id, descriptionToChange)"
                @cancel="cancel" @open="openEdit(data.description)" @close="close">
                {{ data.description }}
                <template v-slot:input>
                  <v-text-field v-model="descriptionToChange" label="Edit" single-line counter
                    color="#F3B228"></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <!-- NARS -->
            <td>
              <v-edit-dialog :return-value.sync="data.nars_status_id" large @save="saveNARS(data.id, narsToChange)"
                @cancel="cancel" @open="openEditNARS(data.nars_status_id)" @close="close">
                {{ data.nars_status_id }}
                <template v-slot:input>
                  <v-text-field v-model="narsToChange" label="Edit" single-line counter
                    color="#F3B228"
                    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <!-- STATUS -->
            <td>
              <div style="width: 40px;">
                <v-switch v-model="data.is_active" @click="changeStatus(data.id, data.is_active)"></v-switch>
              </div>
            </td>
            <!-- DELETE -->
            <td>
              <v-btn color="transparent" @click="showModalDelete(data.id)">

                <v-icon color="black font-weight-thin" size="21">
                  {{ 'mdi-trash-can-outline'}}
                </v-icon>

              </v-btn>
            </td>
          </tr>
        </draggable>
      </template>

    </v-data-table>
    <!-- TABLE -->

    <ModalConfirm :messageStatus="messageStatus" :dialog="isHide" :setDialog="showModalDelete"
      :deleteFunction="deleteRecord"></ModalConfirm>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import { ABORIGINAL_STATUS } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "AborigalStatusTab",
  data() {
    return {
      descriptionToChange: '',
      narsToChange: '',
      isHide: false,
      idToDelete: undefined,
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
    saveNARS(id, nars) {
      this.changeNARS(id, nars);
    },
    openEditNARS(value) {
      this.narsToChange = value;
      this.open();
    },
    close() {
    },
    endDrag(value, items) {
      if (!(value.newDraggableIndex === value.oldDraggableIndex)) {

        const list = value.oldDraggableIndex < value.newDraggableIndex ?
          JSON.parse(JSON.stringify(items))
            .slice(value.oldDraggableIndex, value.newDraggableIndex + 1)
          :
          JSON.parse(JSON.stringify(items))
            .slice(value.newDraggableIndex, value.oldDraggableIndex + 1);

        axios.patch(ABORIGINAL_STATUS + `/sort-order`,
          {
            list: list,
            newIndex: value.newDraggableIndex,
            oldIndex: value.oldDraggableIndex,
          })
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
            store.dispatch("setAboriginalStatusList", false);
          });
      }
    },
    changeStatus(id, isActive) {
      axios.patch(ABORIGINAL_STATUS + `/status/${id}`, { is_active: isActive })
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
          store.dispatch("setAboriginalStatusList", false);
        });
    },
    changeNARS(id, nars) {
      axios.patch(ABORIGINAL_STATUS + `/nars/${id}`, { nars: nars })
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
          store.dispatch("setAboriginalStatusList", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(ABORIGINAL_STATUS + `/description/${id}`, { description: description })
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
          store.dispatch("setAboriginalStatusList", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(ABORIGINAL_STATUS + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setAboriginalStatusList", false);;
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
    ...mapGetters(["search", "activeOnlyFilter", "aboriginalStatusList"]),
    filteredList: function () {
      let l = _.clone(this.aboriginalStatusList);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setAboriginalStatusList", false);
  },
  components: {
    ModalConfirm,
    draggable,
  }
};
</script>
