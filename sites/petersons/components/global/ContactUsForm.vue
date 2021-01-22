<template>
  <v-form class="contact-us-form" v-model="isValid" lazy-validation>
    <v-text-field
      filled
      v-model="form.name"
      label="Name"
      required
      :rules="nameRules"
    >
    </v-text-field>
    <v-text-field filled v-model="form.phone" label="Phone Number (Optional)">
    </v-text-field>
    <v-text-field
      filled
      v-model="form.email"
      label="Email Address"
      type="email"
      :rules="emailRules"
      required
    >
    </v-text-field>
    <v-textarea
      filled
      v-model="form.comment"
      label="Questions/Comments"
      :rules="commentRules"
      required
    ></v-textarea>
    <v-btn color="secondary">Submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    isValid: true,
    nameRules: [(v) => !!v || 'Name is required'],
    emailRules: [(v) => !!v || 'Email address is required'],
    commentRules: [(v) => !!v || 'A comment is required'],
    form: {
      name: '',
      phone: '',
      email: '',
      comment: '',
    },
  }),
})
</script>

<style lang="scss">
.contact-us-form {
  max-width: 500px;
}
</style>
