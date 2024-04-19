<template>
  <div class="maskTop">
    <div class="animate-wave">
      <div class="w1"></div>
      <div class="w2"></div>
      <div class="w3"></div>
      <div class="w4"></div>
      <div class="w5"></div>
      <div class="w6"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@keyframes opac {
  from {
    opacity: 1;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
  }

  to {
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
.maskTop {
  // position: absolute;
  // top: 30%;
  // left: 16%;
  // width: 60px;
  // height: 130px;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  // border: 1px solid red;
  .animate-wave {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .animate-wave * {
    background: #ff91da;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    animation: opac 5s infinite;
  }

  .animate-wave .w2 {
    animation-delay: -1s;
  }

  .animate-wave .w3 {
    animation-delay: 0s;
  }

  .animate-wave .w4 {
    animation-delay: 1s;
  }

  .animate-wave .w5 {
    animation-delay: 2s;
  }

  .animate-wave .w6 {
    animation-delay: 3s;
  }
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    // background-color: #c9d4ff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
