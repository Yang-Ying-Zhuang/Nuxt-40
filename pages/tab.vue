<template>
  <div>
    <div>
      <span
        v-for="(item,index) in ['新闻', '体育', '娱乐']" :key="index" @click="handleClick(index)"
        :class="{active: current === index}"
      >{{item}}</span>
      <!-- <span @click="bb">体育2</span>
      <span @click="cc">娱乐3</span>-->
    </div>
    <div v-if="current === 0">
      <ul>
        <li>新闻1</li>
        <li>新闻2</li>
        <li>新闻3</li>
      </ul>
    </div>
    <div v-if="current === 1">
      <ul>
        <li>体育1</li>
        <li>体育2</li>
        <li>体育3</li>
      </ul>
    </div>
    <div v-if="current === 2">
      <ul>
        <li>娱乐1</li>
        <li>娱乐2</li>
        <li>娱乐3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang='less' scoped>
.active {
  color: red;
}
</style>