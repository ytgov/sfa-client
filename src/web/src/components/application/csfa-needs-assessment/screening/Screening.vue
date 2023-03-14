<template>
    <div>
        <CreditCheckForm></CreditCheckForm>
        <CSLRestrictionForm></CSLRestrictionForm>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import CreditCheckForm from './CreditCheckForm.vue';
import CSLRestrictionForm from './CSLRestrictionForm.vue';
export default {
    components: {
        CreditCheckForm,
        CSLRestrictionForm,
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