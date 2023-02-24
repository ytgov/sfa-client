<template>
    <div>
        <v-breadcrumbs
            divider="/"
            large
            :items="[
                {
                    text: 'Administration Home',
                    to: '/administration',
                    exact: true,
                },
            ]"
        >
        </v-breadcrumbs>
        <h1>Administration Home</h1>

        <v-row>
            <v-col>
                <v-card class="default">
                    <v-card-text>
                        <ul>
                            <li>
                                <router-link to="/administration/institutions"
                                    >Institutions</router-link
                                >
                            </li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card class="default">
                    <v-card-text>
                        <h4 class="mb-3">
                            Examples of things to come in this area
                        </h4>
                        <ul>
                            <li>
                                <router-link to="#">Academic Years</router-link>
                            </li>
                            <li><router-link to="#">City</router-link></li>
                            <li><router-link to="#">Province</router-link></li>
                            <li><router-link to="#">Country</router-link></li>
                            <li>
                                <router-link to="#"
                                    >Expense Category</router-link
                                >
                            </li>

                            <li>Etc ..</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({}),
    created() {},
    methods: {},
};
</script>
