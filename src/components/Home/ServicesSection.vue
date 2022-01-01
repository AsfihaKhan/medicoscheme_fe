<template>
  <div>
    <v-row class="mb-12">
      <v-col cols="12" md="6">
        <div class="display-1 my-6">FIND DOCTOR</div>
        <p class="custom-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sint, eligendi, sed quisquam ex expedita tenetur, animi asperiores perferendis maiores ullam at veritatis suscipit architecto
          incidunt. Maxime laboriosam accusamus velit?
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <bordered-image image_url="https://firebasestorage.googleapis.com/v0/b/medico-scheme.appspot.com/o/nurse-2019420_1920.jpg?alt=media&token=b7bcf925-2881-4dfe-a87a-e8591c944942" />
      </v-col>
    </v-row>

    <v-row class="d-flex flex-row-reverse mb-12">
      <v-col cols="12" md="6">
        <div class="display-1 mb-6">FIND LAB</div>
        <p class="custom-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sint, eligendi, sed quisquam ex expedita tenetur, animi asperiores perferendis maiores ullam at veritatis suscipit architecto
          incidunt. Maxime laboriosam accusamus velit?
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <bordered-image image_url="https://firebasestorage.googleapis.com/v0/b/medico-scheme.appspot.com/o/lab-3498584_1920.jpg?alt=media&token=afa4e0ba-8b63-49c0-9a31-a7e88b055afb" />
      </v-col>
    </v-row>

    <v-row class=" mb-12">
      <v-col cols="12" md="6">
        <div class="display-1 mb-6">EASY PAYMENT</div>
        <p class="custom-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis sint, eligendi, sed quisquam ex expedita tenetur, animi asperiores perferendis maiores ullam at veritatis suscipit architecto
          incidunt. Maxime laboriosam accusamus velit?
        </p>
      </v-col>
      <v-col cols="12" md="6">
        <bordered-image image_url="https://www.investopedia.com/thmb/K1rNR0LxxrnD1Dv0xXSy3qVad2k=/1500x844/smart/filters:no_upscale()/GettyImages-1154092756-e31f198466e443018b44a088ead1250b.jpg" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BorderedImage from "../common/BorderedImage.vue";
export default {
  components: { BorderedImage },
};
</script>

<style lang="scss" scoped>
.display-2 {
  color: #048c8c;
}
</style>
