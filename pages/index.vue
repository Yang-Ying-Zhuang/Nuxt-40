<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
             background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
             background-size:contain contain;
             `"
        ></div>
        
      </el-carousel-item>
    </el-carousel>
    <!-- <button @click="duji" class="ssss">gggg</button> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      banners: [] // 轮播图数据
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res);

      const { data } = res.data;
      this.banners = data;
    });
  },
  methods:{
    duji () {
      // this.$store.state.user.name
      this.$store.commit("user/setName")
    }
  }
};
</script>

<style lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
  // .ssss {
  //   background-color: red;
  // }
}
</style>