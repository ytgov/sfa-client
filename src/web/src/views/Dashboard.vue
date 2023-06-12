<template>
    <div class="home">
        <h1>Dashboard</h1>

        <v-card class="mt-5" color="#fff2d5">
            <v-card-title>Find a Student or Application</v-card-title>
            <v-card-text>
                <v-text-field
                    dense
                    outlined
                    background-color="white"
                    label="Search"
                    append-icon="mdi-magnify"
                    @click:append="doSearch"
                    @keydown="searchKeyUp"
                    hint="Enter a Name, SIN or locator number and press Enter"
                    v-model="search"
                ></v-text-field>
                <router-link to="/search">Advanced search</router-link>
            </v-card-text>
        </v-card>

        <div class="row">
            <div class="col-md-4">
                <v-card class="mt-5" color="#fff2d5">
                    <v-card-title>Recently viewed Students:</v-card-title>
                    <v-card-text>
                      <p v-if="recentStudents.length == 0" class="mb-0">None yet</p>
                        <ol v-if="recentStudents.length > 0">
                            <li
                                v-for="(item, idx) of recentStudents"
                                :key="idx"
                            >
                                <router-link :to="`/student/${item.id}`"
                                    >{{ item.first_name }} {{ item.initials }}
                                    {{ item.last_name }} ({{ item.sin }})
                                </router-link>
                            </li>
                        </ol>
                    </v-card-text>
                </v-card>
            </div>
            <div class="col-md-4">
                <v-card class="mt-5" color="#fff2d5">
                    <v-card-title>Recently viewed Applications:</v-card-title>
                    <v-card-text>
                      <p v-if="recentApplications.length == 0" class="mb-0">None yet</p>
                        <ol v-if="recentApplications.length > 0">
                            <li
                                v-for="(item, idx) of recentApplications"
                                :key="idx"
                            >
                                <router-link :to="`/student/${item.id}`"
                                    >{{ item.first_name }} {{ item.initials }}
                                    {{ item.last_name }} ({{ item.sin }})
                                </router-link>
                            </li>
                        </ol>
                    </v-card-text>
                </v-card>
            </div>
            <div class="col-md-4">
                <v-card class="mt-5" color="#fff2d5">
                    <v-card-title>New Applications</v-card-title>
                    <v-card-text
                        >Maybe use STATUS=ONLINE to filter and find items that
                        may require action</v-card-text
                    >
                </v-card>
            </div>
        </div>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            right
            temporary
            width="600"
            loading
        >
            <v-list-item loading>
                <v-list-item-content>
                    <v-list-item-title>
                        <div class="float-right">
                            <v-btn
                                x-small
                                color="primary"
                                text
                                :to="'/search?text=' + search"
                                class="my-0"
                                style="font-size: 12px !important"
                            >
                                Advanced search</v-btn
                            >
                        </div>
                        <div class="float-left">
                            Students ({{ resultCount }} matches)
                        </div>
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <div style="max-height: 90%; overflow-y: scroll">
                <v-data-table
                    hide-default-footer
                    :headers="[
                        { text: '', value: 'action', width: '40px' },
                        { text: 'SIN', value: 'sin' },
                        { text: 'Name', value: 'name' },
                        { text: 'Locator', value: 'locator_number' },
                    ]"
                    :items="searchResults"
                    :items-per-page="-1"
                    :loading="isSearching"
                    @click:row="selectStudent"
                    loading-text="Searching for students"
                >
                    <template v-slot:item.action="{ item }">
                        <v-btn
                            outlined
                            icon
                            color="primary"
                            :to="`/student/${item.student_id}`"
                            title="View student record"
                            ><v-icon>mdi-school</v-icon></v-btn
                        >
                    </template>
                </v-data-table>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { STUDENT_SEARCH_URL } from "../urls";

export default {
    name: "Home",
    computed: {
        ...mapState(["recentStudents", "recentApplications"]),
    },
    data: () => ({
        search: "",
        drawer: null,
        selectedStudent: null,
        searchResults: [],
        resultCount: 0,
        isSearching: false,
    }),
    methods: {
        searchKeyUp(event) {
            if (event.key == "Enter") this.doSearch();
        },
        doSearch() {
            this.drawer = true;
            this.selectedStudent = null;
            this.searchResults = [];
            this.resultCount = 0;

            let cleanSearch = this.search.trim().toLowerCase();
            if (cleanSearch.length == 0) return;

            this.isSearching = true;

            axios
                .post(`${STUDENT_SEARCH_URL}`, { terms: cleanSearch })
                .then((resp) => {
                    this.searchResults = resp.data.data;
                    this.resultCount = resp.data.meta.item_count;
                })
                .catch((err) => {
                    this.$emit("showError", err);
                })
                .finally(() => {
                    this.isSearching = false;
                });
        },
        selectStudent(item) {
            this.selectedStudent = item;
            this.$router.push(`/student/${item.student_id}`);
        },
    },
};
</script>
