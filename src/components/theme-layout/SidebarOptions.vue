<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <sidebar-lists v-if="role === 'admin'" :options="admin" />
    <sidebar-lists v-if="role === 'patient'" :options="patient" />
    <sidebar-lists v-if="role === 'doctor'" :options="doctor" />
    <sidebar-lists v-if="role === 'lab'" :options="labAdmin" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidebarLists from "./SidebarLists.vue";
import { admin, patient, doctor, labAdmin } from "../../utils/RoleBasedNavMenu";

export default {
  components: { SidebarLists },
  data: () => ({
    managerRoutes: [],
    admin,
    patient,
    doctor,
    labAdmin,
  }),
  computed: {
    ...mapState("auth", ["role", "userName"]),
  },
};
</script>
