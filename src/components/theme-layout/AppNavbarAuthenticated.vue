<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <sidebar-options />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-medium">Medico Scheme</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn outlined class="text-capitalize" color="red" @click="handleLogout"> Logout <v-icon right>mdi-logout-variant</v-icon> </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import SidebarOptions from "./SidebarOptions.vue";
export default {
  components: { SidebarOptions },
  data: () => ({
    drawer: null,
  }),
  methods: {
    handleLogout() {
      this.isLoading = true;

      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
