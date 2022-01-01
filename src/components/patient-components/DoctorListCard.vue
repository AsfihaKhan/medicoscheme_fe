<template>
  <router-link :to="`/patient/doctor-list/${doctorInfo.id}`" class="text-decoration-none">
    <v-card rounded="lg" class="card-height">
      <v-row dense>
        <v-col cols="4" class="ma-0 pa-0" >
          <v-img :src="doctorInfo.picture" alt="Doctor" class="img" width="100%" height="75%" style="margin:10% 8%" />
        </v-col>
        <v-col cols="8">
          <v-card-title class="font-weight-bold pb-0">{{ doctorInfo.full_name }} </v-card-title>
          <v-card-text>
            <div class="subtitle-1">{{ doctorInfo.designation }}</div>
            
            <div class="subtitle-1">{{ doctorInfo.gender}}</div>
            <div class="subtitle-1">{{ doctorInfo.phone_no}}</div>
            <div class="subtitle-2">
              <span v-for="(specialty, index) in doctorInfo.specialist" :key="index"> {{ specialty.title }} </span>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: ["doctorInfo"],
};
</script>

<style lang="scss" scoped>
.card-height {
  height: 100%;
}
.img {
  border-radius: 8px;
}
</style>
