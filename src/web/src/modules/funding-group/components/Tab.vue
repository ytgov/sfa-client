<template>
  <div>
    <!-- TABLE -->
    <v-data-table :search="search" :headers="[
      { text: '', value: '', filterable: false, sortable: false },
      { text: 'Funding Group', value: 'description', filterable: true, },
      { text: 'Sort Order', value: 'sort_order', filterable: false, },
      { text: 'Status', value: 'is_active', sortable: false, filterable: false },
      { text: 'Delete', value: 'id', sortable: false, filterable: false },
    ]" :items="filteredList" class="mt-8">

      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody" @end="endDrag($event, props.items)">
          <tr v-for="(user, index) in props.items" :key="index">
            <td>
              <v-icon small class="page__grab-icon">
                mdi-arrow-all
              </v-icon>
            </td>
            <!-- FUNDING_GROUP -->
            <td>
              <v-edit-dialog :return-value.sync="user.description" large @save="save(user.id, descriptionToChange)"
                @cancel="cancel" @open="openEdit(user.description)" @close="close">
                {{ user.description }}
                <template v-slot:input>
                  <v-text-field v-model="descriptionToChange" :rules="[max199chars]" label="Edit" single-line counter
                    color="#F3B228"></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <!-- RANK -->
            <td>
              {{ user.sort_order }}
            </td>
            <!-- STATUS -->
            <td>
              <div style="width: 40px;">
                <v-switch v-model="user.is_active" @click="changeStatus(user.id, user.is_active)"></v-switch>
              </div>
            </td>
            <!-- DELETE -->
            <td>
              <v-btn color="transparent" @click="showModalDelete(user.id)">

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
import { FUNDING_GROUP } from '@/urls';
import axios from "axios";
import ModalConfirm from "@/components/commonCatalog/ConfirmDelete.vue";

export default {
  name: "FundingGroupTab",
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
    endDrag(value, items) {
      if (!(value.newDraggableIndex === value.oldDraggableIndex)) {

        const list = value.oldDraggableIndex < value.newDraggableIndex ?
          JSON.parse(JSON.stringify(items))
          .slice(value.oldDraggableIndex, value.newDraggableIndex + 1)
          :
          JSON.parse(JSON.stringify(items))
          .slice(value.newDraggableIndex, value.oldDraggableIndex + 1);

        axios.patch(FUNDING_GROUP + `/sort-order`,
          {
            newSortOrderList: list,
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
            store.dispatch("setFundingGroups", false);
          });
      }
    },
    changeStatus(id, isActive) {
      axios.patch(FUNDING_GROUP + `/status/${id}`, { is_active: isActive })
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
          store.dispatch("setFundingGroups", false);
        });
    },
    changeDescription(id, description) {
      axios.patch(FUNDING_GROUP + `/description/${id}`, { description: description })
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
          store.dispatch("setFundingGroups", false);
        });
    },
    showModalDelete(id) {
      this.isHide = !this.isHide;
      this.idToDelete = id;
    },
    deleteRecord() {
      axios.delete(FUNDING_GROUP + `/${this.idToDelete}`)
        .then((resp) => {
          resp?.data?.wasDelete && store.dispatch("setFundingGroups", false);;
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
    ...mapGetters(["search", "activeOnlyFilter", "FundingGroups"]),
    filteredList: function () {
      let l = _.clone(this.FundingGroups);

      if (this.activeOnlyFilter) l = l.filter((i) => i.is_active);

      return l;
    },
  },
  async created() {
    await store.dispatch("setFundingGroups", false);
  },
  components: {
    ModalConfirm,
    draggable,
  }
};
</script>
