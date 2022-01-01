<template>
  <div class="banner-area">
    <div class="content-area">
      <div class="display-4 font-weight-black">Medico Scheme</div>
      <div class="title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores reiciendis delectus dolore quidem sit. Numquam non rem aut at perferendis.</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style lang="scss" scoped>
.banner-area {
  width: 100%;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(https://firebasestorage.googleapis.com/v0/b/medico-scheme.appspot.com/o/medicine.jpg?alt=media&token=9d33f378-78a6-4d9c-bb4f-007d9243f5a5);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.content-area {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.display-4,
.title {
  color: #fff;
}

@media only screen and (max-width: 600px) {
  .display-2 {
    margin-left: 15px;
    font-size: 1.8em !important;
  }
  .display-2::after {
    content: "";
    position: absolute;
    height: 8px;
    width: 2em;
    background-color: #ffa800;
    bottom: 40%;
    left: 15px;
    border-radius: 20px;
  }
}
</style>
