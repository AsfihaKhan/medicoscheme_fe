<template>
  <div>
    <v-app-bar app color="white" hide-on-scroll>
      <router-link to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Medico scheme Logo"
            class="shrink mr-2"
            contain
            src="https://firebasestorage.googleapis.com/v0/b/medico-scheme.appspot.com/o/white.png?alt=media&token=58464a1a-6071-4145-90ee-edb926cdd465"
            transition="scale-transition"
            width="80"
          />
        </div>
      </router-link>
      <v-toolbar-title>Medico Scheme</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- in desktop mode -->
      <div class="d-none d-sm-flex">
        <v-btn class="text-capitalize mr-3" v-for="item in pageItems" :key="item.title" :to="item.link" depressed plain text>
          {{ item.title }}
        </v-btn>
      </div>

      <div class="d-flex d-sm-none">
        <v-menu left bottom rounded="lg" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" aria-label="menu">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>

          <!-- in mobile mode -->
          <v-list>
            <v-list-item v-for="item in pageItems" :key="item.title" :to="item.link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    pageItems: [
      { title: "Home", link: "/" },
      { title: "Blogs", link: "/blogs" },
      { title: "Register", link: "/register" },
      { title: "Login", link: "/login" },
    ],
  }),
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
    },
  },
};
</script>

<style lang="scss" scoped></style>
