<template>
  <div class="d-flex align-center flex-column">
    <v-card class="mx-auto my-12" width="374" outlined>
      <v-card-title class="text-h5 mb-1 d-flex justify-center"> Register </v-card-title>

      <v-form ref="form" @submit.prevent="onSubmit">
        <v-card-text>
          <v-select
            v-model="form.category"
            :items="category_options"
            label="Select category"
            :rules="fieldRules"
          ></v-select>
          <div v-if="form.category == 'Staff'">
            <v-select
              v-model="form.branch"
              :items="branch_options"
              label="Select branch"
              :rules="fieldRules"
            ></v-select>
          </div>
          <BaseInput
            v-model="form.username"
            label="Usernameer"
            label-for="input-2"
            class="font-weight-bold"
            :rules="fieldRules"
          />
          <BaseInput
            v-model="form.phone"
            label="Phone Number"
            label-for="input-2"
            class="font-weight-bold"
            :rules="phoneNumberRules"
          />
          <BaseInput
            v-model="form.emphone"
            label="Emergency Number"
            label-for="input-2"
            class="font-weight-bold"
            :rules="phoneNumberRules"
          />
          <BaseInput
            v-model="form.email"
            label="Email"
            label-for="input-2"
            class="font-weight-bold"
            :rules="emailRules"
          />
          <v-select
            v-model="form.designation"
            :items="category_options"
            label="Select designation"
            :rules="fieldRules"
          ></v-select>
          <v-text-field
            v-model="form.password"
            :append-icon="password1 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            label-for="input-2"
            class="font-weight-bold"
            :type="password1 ? 'text' : 'password'"
            :rules="passwordRules"
            @click:append="password1 = !password1"
          />
          <v-text-field
            v-model="form.confirmPassword"
            :append-icon="password2 ? 'mdi-eye' : 'mdi-eye-off'"
            label="Confirm Password"
            name="confirmPassword"
            :type="password2 ? 'text' : 'password'"
            :rules="confirmPasswordRules"
            @click:append="password2 = !password2"
          />
          <v-file-input
            v-model="form.profile_pic"
            :value="[]"
            show-size
            label="Select Image"
            accept="image/*"
          ></v-file-input>
          <div class="d-flex align-center flex-column">
            <Button dark large width="350" class="primary" depressed color="primary" type="submit"> Register </Button>
          </div>
          <div class="d-flex align-center flex-column pt-4">
            <nuxt-link class="text-muted text-decoration-none" to="/login"> Back to Login </nuxt-link>
          </div>
        </v-card-text>
      </v-form>
    </v-card>

    <toaster :is-open="showErrorToast" :text="errorToastText"></toaster>
  </div>
</template>
<script>
import BaseInput from '~/components/UI/BaseInput'
import Button from '~/components/UI/Button'
import Toaster from '~/components/UI/Toaster'

export default {
  components: {
    BaseInput,
    Button,
    Toaster,
  },
  layout: 'empty',
  middleware: ['guest'],
  data() {
    return {
      showErrorToast: false,
      errorToastText: '',
      password1: false,
      password2: false,
      form: {
        category: '',
        branch: '',
        username: '',
        phone: '',
        emphone: '',
        email: '',
        password: '',
        confirmPassword: '',
        designation: '',
        profile_pic: null,
      },
      category_options: ['Staff', 'Doctor', 'Admin'],
      branch_options: ['aa', 'bb', 'cc'],
      designation_options: ['aa', 'bb'],
      fieldRules: [(v) => !!v || 'This field is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E- mail must be valid',
      ],
      passwordRules: [
        (value) => !!value || 'Please enter a password',
        (value) => !!value || 'Please type password.',
        (value) =>
          (value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) ||
          'Minimum 6 characters, One capital latter, Special charater, Number',
      ],
      confirmPasswordRules: [
        (value) => !!value || 'type confirm password',
        (value) => value === this.form.password || 'The password confirmation does not match.',
      ],
      phoneNumberRules: [
        (value) => !!value || 'Please enter 10 digits.',
        (value) => (value && value.length >= 10) || 'minimum 10 digits',
      ],
    }
  },
  head() {
    return {
      title: 'Register',
    }
  },
  methods: {
    async onSubmit(event) {
      if (this.$refs.form.validate()) {
        const formData = new FormData()

        formData.append('username', this.form.username)
        formData.append('phone', this.form.phone)
        formData.append('category', this.form.category)
        formData.append('emphone', this.form.emphone)
        formData.append('email', this.form.email)
        formData.append('password', this.form.password)
        formData.append('password_confirmation', this.form.password)
        formData.append('designation', this.form.designation)
        formData.append('profile_pic', this.form.profile_pic)

        if (this.form.category === 'Staff') {
          formData.append('branch', this.form.branch)
        }

        await this.$axios
          .post('/api/register', formData)

          .then((res) => {
            this.$router.push('/login')
          })
          .catch((res) => {
            this.showErrorToast = true
            this.errorToastText = 'Error login'
          })
      }
    },
  },
}
</script>
