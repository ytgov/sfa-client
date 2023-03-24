<template>
    <div>
        
        <MailingAddress />

        <Parent 
            :index="1" 
            :parent="application.parent1" 
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        />
        <Parent
            :index="2" 
            :parent="application.parent2"
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        />

        <hr/>

        <ParentsDependents 
            v-on:showSuccess="showSuccess"
            v-on:showError="showError"
        />

        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';

import MailingAddress from './ MailingAddress';
import Parent from './Parent';
import ParentsDependents from './ParentsDependents';

export default {
    components: {
        MailingAddress,
        Parent,
        ParentsDependents
    },
    computed: {
        application() {
            return store.getters.selectedApplication;
        }
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