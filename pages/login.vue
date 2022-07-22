<template>
  <div class="d-flex align-center flex-column">
    <v-card class="mx-auto my-12" width="374" outlined>
      <v-card-title class="text-h5 mb-1 d-flex justify-center"> Login </v-card-title>

      <v-form ref="form" @submit.prevent="login">
        <v-card-text>
          <div class="d-flex align-center flex-column">
            <v-btn-toggle
              id="btnGroup"
              v-model="form.category"
              group
              dense
              required
              mandatory
              borderless
              class="align-center"
            >
              <v-btn active-class="btn" :elevation="3" :value="'Staff'"> Staff </v-btn>

              <v-btn active-class="btn" :elevation="3" rounded :value="'Doctor'"> Doctor </v-btn>

              <v-btn active-class="btn" :elevation="3" :value="'Admin'"> Admin </v-btn>
            </v-btn-toggle>
          </div>
          <div class="d-flex align-center flex-column pt-6">
            <p subtitle-1 class="subtitle-1">Are you a manager?</p>

            <v-btn-toggle
              id="btnGroup"
              v-model="form.manager"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn active-class="btn" :elevation="3" :value="'yes'"> Yes </v-btn>
              <v-btn active-class="btn" :elevation="3" :value="'no'"> No </v-btn>
            </v-btn-toggle>
          </div>
          <div class="d-flex align-center flex-column">
            <v-btn-toggle
              id="btnGroup"
              v-model="otp"
              class="pt-6 align-center"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
            >
              <v-btn active-class="btn" :elevation="3" :value="1"> OTP </v-btn>
              <v-btn active-class="btn" :elevation="3" :value="0"> PASSWORD </v-btn>
            </v-btn-toggle>
          </div>

          <div v-if="otp">
            <BaseInput
              v-model="form.number"
              label="Phone"
              label-for="input-2"
              class="font-weight-bold"
              :rules="fieldRules"
            />
          </div>

          <div v-else>
            <BaseInput
              v-model="form.email"
              label="Email"
              label-for="input-2"
              class="font-weight-bold"
              :rules="emailRules"
              :placeholder="'VivekAdmin@hospital.com'"
            />

            <v-text-field
              v-model="form.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              label-for="input-2"
              hint="At least 8 characters"
              :placeholder="'secret-password'"
              class="font-weight-bold"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </div>
          <div class="d-flex align-center flex-column">
            <Button dark large width="300" class="primary" depressed color="primary" type="submit"> Login </Button>
          </div>
          <div class="d-flex align-center flex-column pt-4">
            <nuxt-link class="text-muted text-decoration-none" to="/register"> Or click here to register </nuxt-link>
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
      otp: 0,
      showPassword: false,
      form: {
        category: 'Staff',
        manager: 'no',
        number: '',
        email: '',
        password: '',
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
        // TODO: Update the rules as per the backend
        // (value) =>
        // 	(value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) ||
        // 	'Minimum 6 characters, One capital latter, Special charater, Number',
      ],
    }
  },

  head() {
    return {
      title: 'Login',
    }
  },
  methods: {
    login(event) {
      const submitData = {
        email: this.form.email,
        password: this.form.password,
        category: this.form.category,
        manager: this.form.manager,
        submit: '',
      }

      if (this.$refs.form.validate()) {
        this.$auth
          .loginWith('local', {
            data: submitData,
          })
          .then((res) => {
            this.$store.dispatch('user/setUser', res.data.results.logged_in)
            this.$store.dispatch('user/setIsAuthenticated', true)
            this.$store.dispatch('user/setUserRole', res.data.results.role)
            this.$store.dispatch('user/setToken', res.data.results.token)
            this.$auth.strategy.token.set(res.data.results.token)

            this.$router.push('/')
          })
          .catch((err) => {
            this.$toast.error(err.message, {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 3000,
            })
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

#btnGroup .btn {
  background-color: $hospital-primary-color !important;
  color: white !important;
}
</style>
