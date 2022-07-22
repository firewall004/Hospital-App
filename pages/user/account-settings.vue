<template>
  <v-card id="account-setting-card">
    <!-- tabs -->
    <v-tabs v-model="tab" show-arrows>
      <v-tab v-for="accountTab in tabs" :key="accountTab.icon">
        <v-icon size="20" class="me-3">
          {{ accountTab.icon }}
        </v-icon>
        <span>{{ accountTab.title }}</span>
      </v-tab>
    </v-tabs>

    <!-- tabs item -->
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <user-account :account-data="accountSettingData.account" />
      </v-tab-item>

      <v-tab-item>
        <user-security />
      </v-tab-item>
      <v-tab-item>
        <notification />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import UserAccount from '~/components/ProfileSettings/UserAccount'
import UserSecurity from '~/components/ProfileSettings/UserSecurity'
import Notification from '~/components/ProfileSettings/Notification'

export default {
  components: {
    UserAccount,
    UserSecurity,
    Notification,
  },
  data() {
    return {
      tab: '',
      tabs: [
        { title: 'Account', icon: 'mdi-account-circle' },
        { title: 'Security', icon: 'mdi-account-circle' },
        { title: 'Notifications', icon: 'mdi-bell-badge' },
      ],
      accountSettingData: {
        account: {
          avatarImg: require('@/assets/images/avatars/1.png'),
          username: 'johnDoe',
          name: 'john Doe',
          email: 'johnDoe@example.com',
          role: 'Admin',
          status: 'Active',
          company: 'Google.inc',
        },
        information: {
          bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
          birthday: 'February 22, 1995',
          phone: '954-006-0844',
          website: 'https://themeselection.com/',
          country: 'USA',
          languages: ['English', 'Spanish'],
          gender: 'male',
        },
      },
    }
  },
  head() {
    return {
      title: 'Account Settings',
    }
  },
}
</script>
