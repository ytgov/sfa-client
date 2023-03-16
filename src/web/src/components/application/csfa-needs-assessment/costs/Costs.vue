<template>
    <div>
        <h3 class="text-h6 font-weight-bold">Pre-Study Expenses</h3>
        <PreStudyExpensesForm></PreStudyExpensesForm>
        <h3 class="text-h6 font-weight-bold">Study Expenses</h3>
        <StudyExpensesForm></StudyExpensesForm>
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

    },
};
</script>