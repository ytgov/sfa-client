<template>
    <div>
        <h3 class="text-h6 font-weight-bold">Pre-Study Expenses</h3>
        <PreStudyExpensesForm
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        ></PreStudyExpensesForm>
        <h3 class="text-h6 font-weight-bold">Study Expenses</h3>
        <StudyExpensesForm
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        ></StudyExpensesForm>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';

import PreStudyExpensesForm from './PreStudyExpensesForm.vue';
import StudyExpensesForm from './StudyExpensesForm.vue';

export default {
    components: {
        PreStudyExpensesForm,
        StudyExpensesForm,
    },
    computed: {
    },
    data: () => ({

    }),
    async created() {
    },
    watch: {

    },
    methods: {
        showSuccess(mgs) {
            this.$emit("showSuccess", mgs);
        },
        showError(mgs) {
            this.$emit("showError", mgs);
        },
    },
};
</script>