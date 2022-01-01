<template>
  <v-container>
    <div v-if="isLoading">
      <v-overlay :value="isLoading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else>
      <div class="display-1 text-center font-weight-bold mb-4">Notification List</div>
      <v-row>
        <v-col cols="12" v-for="notification in notifications" :key="notification.id">
          <notification-card :notificationInfo="notification" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import NotificationCard from "../../components/common/NotificationCard.vue";

export default {
  components: { NotificationCard },

  created() {
    this.$store.dispatch("common/getAllNotifications");
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("common", ["notifications"]),
  },
};
</script>

<style lang="scss" scoped></style>
