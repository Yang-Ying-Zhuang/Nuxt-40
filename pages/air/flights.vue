<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <fligthsFilters :data="cacheFlightsData" 
        @setDataList="setDataList"/>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表                       flightsData.flights-->                    
          <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
          <!-- 分页组件 -->
          <!-- size-change:切换条数时候触发事件 -->
          <!-- current-change：切换你页面时候触发的事件 -->
          <!-- current-page：当前显示的页面 -->
          <!-- tatal：总条数 -->
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
      </div>
       
      <!-- 侧边栏 -->
      <flightsAside/>
        <!-- 侧边栏组件 -->
    </el-row>
  </section>
</template>

<script>
// import moment, { months } from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import fligthsFilters from '@/components/air/fligthsFilters.vue';
import flightsAside from '@/components/air/flightsAside.vue'; 

export default {
 
  data() {
    return {
       //存储数据// 航班总数据 { info, flights, total, options }
      flightsData: {
        info: {},
        options: {},
        flights: []
      },
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
         info: {},
        options: {},
        flights: []
      },
        // 当前页面
      pageIndex: 1,
      // 当前条数
      pageSize: 5,
      // 总条数
      total: 0,
      // 存放切割出来数据 （1.已经拿了封装）
      // dataList: []
    };
  },
   // 注册组件
  components: {
    FlightsListHead,
    FlightsItem,
    fligthsFilters,
    flightsAside
  },
  watch:{
      $route(){
        this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      // 赋值给总数据，但是该变量中的flights在过滤时候会被修改
      this.flightsData = res.data;
      // 这个是缓存的变量， 一旦赋值之后不能被修改
      this.cacheFlightsData = {...res.data};

    // 切割第一页   切割第一页数据 （1.已经拿了封装）
    // this.dataList = this.flightsData.flights.slice(0, 5);
      // 总条数
      this.total = this.flightsData.total
      });
    }
  },
  computed: {
    //(2.封装) 计算属性监听函数内部引用实例的属性变化，一旦发生了变化，该函数会重新计算，并且返回新的值
    dataList () {
      // 请求如果还没完成，返回空数组
      if (!this.flightsData.flights) return [];
      // 计算分页的数据
      return this.flightsData.flights.slice(
         (this.pageIndex -1) * this.pageSize,
          this.pageIndex * this.pageSize
      );
    }
  },

  mounted () {
    // 请求机票的列表，（请求尽量放到父组件中，好处方便管理数据，和组件之间的数据共享）
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      // 赋值给总数据，但是该变量中的flights在过滤时候会被修改
      this.flightsData = res.data;
      // 这个是缓存的变量， 一旦赋值之后不能被修改
      this.cacheFlightsData = {...res.data};

    // 切割第一页   切割第一页数据 （1.已经拿了封装）
    // this.dataList = this.flightsData.flights.slice(0, 5);
      // 总条数
      this.total = this.flightsData.total
      // 分页初始化为1
      this.pageIndex = 1;
    });
  },

  methods: {

     // 切换分页条数时候触发
      handleSizeChange (value){
        //  console.log(value)
        this.pageSize = value;
         //分页条数数据 （1.已经拿了封装）
        // this.dataList = this.flightsData.flights.slice(
        //   (this.pageIndex -1) * this.pageSize,
        //   this.pageIndex * this.pageSize
        // );
      },
         
        // 切换你页数时候触发的事件
      handleCurrentChange (value){
          // console.log(value)
             this.pageIndex = value
          //分页页数数据 （1.已经拿了封装）
        //   this.dataList = this.flightsData.flights.slice(
        //   (this.pageIndex -1) * this.pageSize,
        //   this.pageIndex * this.pageSize
        // );
      },

      // 给过滤的组件修改this.flightsData.flights
      setDataList(arr) {
        // arr 就是过滤后的符合条件的数据
        this.flightsData.flights = arr;
        // 修改总条数
        this.total = arr.length;
      }
        
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>