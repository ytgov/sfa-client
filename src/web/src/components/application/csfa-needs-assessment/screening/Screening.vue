<template>
    <div>
        <!-- THE 'CreditCheckForm' COMPONENT WAS HERE -->
        
        <CSLRestrictionForm
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        >
        </CSLRestrictionForm>
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
        showSuccess(mgs) {
            this.$emit("showSuccess", mgs);
        },
        showError(mgs) {
            this.$emit("showError", mgs);
        },
    },
};
</script>