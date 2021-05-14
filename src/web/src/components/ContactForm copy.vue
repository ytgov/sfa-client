<template>
  <div>
    <v-card class="default">
      <v-card-text>
        <v-text-field outlined dense background-color="white"></v-text-field>
        <v-text-field outlined dense background-color="white"></v-text-field>
        <v-text-field outlined dense background-color="white"></v-text-field>
        <v-text-field outlined dense background-color="white"></v-text-field>
        <v-text-field outlined dense background-color="white"></v-text-field
      ></v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  data: () => ({
      institution: "",
      address: "",
      city: "",
      province: "",
      postal: "",
      country: "",
      careOf: "",
      instCode: "",
      instLevel: "",
      fos: "",
      classStart: null,
        classEnd: null,
        
  }),
  async created() {
   
  },
  methods: {
  }
};
</script>
