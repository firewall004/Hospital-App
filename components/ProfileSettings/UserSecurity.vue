<template>
  <v-card flat class="mt-5">
    <v-form>
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col cols="12" sm="8" md="6">
              <!-- current password -->
              <v-text-field
                v-model="currentPassword"
                :type="isCurrentPasswordVisible ? 'text' : 'password'"
                :append-icon="isCurrentPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                label="Current Password"
                outlined
                dense
                @click:append="isCurrentPasswordVisible = !isCurrentPasswordVisible"
              ></v-text-field>

              <!-- new password -->
              <v-text-field
                v-model="newPassword"
                :type="isNewPasswordVisible ? 'text' : 'password'"
                :append-icon="isNewPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                label="New Password"
                outlined
                dense
                hint="Make sure it's at least 8 characters."
                persistent-hint
                @click:append="isNewPasswordVisible = !isNewPasswordVisible"
              ></v-text-field>

              <!-- confirm password -->
              <v-text-field
                v-model="cPassword"
                :type="isCPasswordVisible ? 'text' : 'password'"
                :append-icon="isCPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                label="Confirm New Password"
                outlined
                dense
                class="mt-3"
                @click:append="isCPasswordVisible = !isCPasswordVisible"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3"> mdi-key-variant </v-icon>
          <span class="text-break">Two-factor authentication</span>
        </v-card-title>

        <v-card-text class="two-factor-auth text-center mx-auto">
          <v-avatar color="primary" class="primary mb-4" rounded>
            <v-icon size="25" color="white"> mdi-key-alert-outline </v-icon>
          </v-avatar>
          <p class="text-base text--primary font-weight-semibold">Two factor authentication is not enabled yet.</p>
          <p class="text-sm text--primary">
            Two-factor authentication adds an additional layer of security to your account by requiring more than just a
            password to log in. Learn more.
          </p>
        </v-card-text>

        <!-- action buttons -->
        <v-card-text>
          <v-btn color="primary" class="me-3 mt-3" @click="setNewPassword"> Save changes </v-btn>
          <v-btn color="secondary" outlined class="mt-3"> Cancel </v-btn>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isCurrentPasswordVisible: false,
      isNewPasswordVisible: false,
      isCPasswordVisible: false,
      currentPassword: '12345678',
      newPassword: '87654321',
      cPassword: '87654321',
    }
  },
  methods: {
    setNewPassword() {
      const newData = {
        changePassword: '',
        current_password: this.currentPassword,
        new_password: this.newPassword,
        re_enter_password: this.cPassword,
      }
      this.$axios.post('/api/edit/profile', newData).then((response) => {
        if (response.status === 200) {
          this.$toast.success('Successfully changed', {
            theme: 'toasted-primary',
            position: 'bottom-right',
            duration: 3000,
          })
        } else {
          this.$toast.success('Please try again', {
            theme: 'toasted-red',
            position: 'bottom-right',
            duration: 3000,
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
