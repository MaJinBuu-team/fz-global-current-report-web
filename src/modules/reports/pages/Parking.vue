<template>
  <div id="parking">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :height="winHeight-80"
      border
    >
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <div class="flex-row-spacebetween">
            <el-col :span="14">
              <el-radio-group type="success" v-model="radio" @change="radioChanged()" size="mini">
                <el-radio v-model="radio" :label="1">当月</el-radio>
                <el-radio v-model="radio" :label="2">上月</el-radio>
                <el-radio v-model="radio" :label="3">自定义时间查询</el-radio>
              </el-radio-group>
            </el-col>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              size="mini"
              :disabled="timePickerDisabled"
            ></el-date-picker>
            <el-button type="success" size="mini" id="queryBtn" @click="queryData()">查询</el-button>
          </div>
        </template>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-row :gutter="18">
              <el-col :span="1">
                <!-- <el-button type="success" size="mini" id="queryBtn">导出Excel表</el-button> -->
              </el-col>
              <el-col :span="12" :offset="4" class="flex-row-space-around">
                <!-- <el-button type="info" size="mini" plain></el-button> -->
                <div size="mini" class="totalCountDiv">{{formatTime1+' —— '+formatTime2}}</div>
                <div size="mini" class="totalCountDiv">交易总计</div>
                <el-button type="info" size="mini" plain>{{totalData.lastMoneyTotal+"元"}}</el-button>
                <el-button type="info" size="mini" plain>{{totalData.normalSettleCount+"笔"}}</el-button>
              </el-col>
            </el-row>
          </template>
          <el-table-column type="index" width="40" align="center" ></el-table-column>
          <el-table-column prop="parkingName" label="停车场" style="width: 20%" align="center"></el-table-column>
          <el-table-column prop="orderNo" label="订单号" style="width: 20%" align="center" ></el-table-column>
          <el-table-column prop="finallyTime" label="订单完成时间" style="width: 20%" align="center"></el-table-column>
          <el-table-column prop="carNo" label="车牌号" style="width: 20%" align="center"></el-table-column>
          <el-table-column prop="lastMoney" label="结算金额" style="width: 20%" align="center"></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <div class="rolePagination">
      <span class="demonstration">每页显示行</span>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "parking",
  data() {
    return {
      winHeight: document.documentElement.clientHeight - 80,
      winWidth: document.documentElement.clientWidth,
      radio: 1,
      totalData:{
          lastMoneyTotal:"",
          normalSettleCount: ""
      },
      tableData: [
      ],
      timePickerDisabled: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      formatTime1: "",
      formatTime2: "",
      // 分页相关
      pageSize: 10,
      pageSizes: [10, 15, 20, 50],
      currentPage: 1,
      totalPage: 0, //总页数
      input: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions("parking", {
      getParkingDetails: "getParkingDetails",
      getParkingTotal: "getParkingTotal"
    }),
    queryData() {
      this.$options.methods.handleParkBusinessInfo.bind(this)({
        endDate: "",
        endTime: 0,
        limit: 0,
        orderSource: "",
        page: 0,
        startDate: "",
        startTime: 0,
        whetherTotal: true
      });
    },
    handleParkBusinessInfo(paramDic) {
      this.getParkingDetails(paramDic)
        .then(res => {
          console.log(res);
          this.totalPage = res.data["total"];
          this.tableData = res.data["list"]
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleGetParkingTotal(paramDic){
      this.getParkingTotal(paramDic)
        .then(res => {
          console.log(res);
          this.totalData = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //设置本月时间
    initTime() {
      var data = new Date();
      data.setDate(1);
      data.setHours(0);
      data.setSeconds(0);
      data.setMinutes(0);
      var data1 = new Date();
      this.value1 = data.getTime();
      this.value2 = data1.getTime();
      this.formatTime1 = this.$options.methods.formatDate.bind(this)(data);
      this.formatTime2 = this.$options.methods.formatDate.bind(this)(data1);
      console.log("初始时间（本月）" + this.value1 + "——" + this.value2);
    },
    //设置上月时间
    initLastMonthTime() {
      const start = new Date();
      this.value1 = start.setTime(
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
      );

      var date = new Date();
      var day = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      var end = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        day
      );
      this.value2 = end.getTime() + 24 * 60 * 60 * 1000 - 1;
      this.formatTime1 = this.$options.methods.formatDate.bind(this)(
        new Date(this.value1)
      );
      this.formatTime2 = this.$options.methods.formatDate.bind(this)(
        new Date(this.value2)
      );
    },
    //格式时间转换
    formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return year + "年" + month + "月" + date + "日";
    },
    radioChanged() {
      switch (this.radio) {
        case 1:
          this.timePickerDisabled = true;
          this.$options.methods.initTime.bind(this)();
          this.$options.methods.queryTotalData.bind(this)();
          this.$options.methods.queryDetailData.bind(this)();
          break;
        case 2:
          this.timePickerDisabled = true;
          this.$options.methods.initLastMonthTime.bind(this)();
          this.$options.methods.queryTotalData.bind(this)();
          this.$options.methods.queryDetailData.bind(this)();
          break;
        case 3:
          this.timePickerDisabled = false;
          this.$message("请选择时间区间");
          break;
        default:
          break;
      }
    },
    queryData() {
      console.log("11111");
      this.formatTime1 = this.$options.methods.formatDate.bind(this)(
        this.value2[0]
      );
      this.formatTime2 = this.$options.methods.formatDate.bind(this)(
        this.value2[1]
      );
      this.value1 = this.value2[0].getTime();
      this.value2 = this.value2[1].getTime();
      this.$options.methods.queryTotalData.bind(this)();
      this.$options.methods.queryDetailData.bind(this)();
    },
    queryTotalData() {
      this.$options.methods.handleGetParkingTotal.bind(this)({
        startTime: this.value1,
        endTime: this.value2,
        parkingId:"8D7B917E",
        page: 1,
        limit: 50
      });
    },
    queryDetailData(){
      this.$options.methods.handleParkBusinessInfo.bind(this)({
        startTime: this.value1,
        endTime: this.value2,
        parkingId:"8D7B917E",
        page: this.currentPage,
        limit: this.pageSize
      })
    },
    goBack() {
      
      this.$router.go(-1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.$options.methods.queryDetailData.bind(this)();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$options.methods.queryDetailData.bind(this)();
    }
  },

  mounted() {
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight;
      this.winWidth = document.documentElement.clientWidth;
    };
    if (this.value2 == "") {
      this.$options.methods.initTime.bind(this)();
    }
    this.$options.methods.queryTotalData.bind(this)();
    this.$options.methods.queryDetailData.bind(this)();
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#headerTitle {
  height: 40;
  line-height: 40px;
  font-size: 14px;
}

.totalCountDiv {
  font-size: 14px;
}

.flex-row-spacebetween {
  display: flex !important;
  flex-flow: row nowrap !important;
  justify-content: space-between;
  //   font-size: 26px;
}

.flex-row-start {
  display: flex !important;
  flex-flow: row nowrap !important;
  justify-content: flex-start;
  //   font-size: 26px;
}

.flex-row-space-around {
  display: flex !important;
  flex-flow: row nowrap !important;
  justify-content: space-around;
}

.flex-row-center {
  display: flex !important;
  flex-flow: row nowrap !important;
  justify-content: center;
}

.el-radio__input {
  margin-bottom: px(5);
  &.is-checked {
    .el-radio__inner {
      background-color: #2ccf2a;
      border-color: #2ccf2a;
    }
  }
  .el-radio__inner {
    &:hover {
      border-color: #2ccf2a;
    }
  }
}

.el-radio {
  &.is-checked {
    .el-radio__label {
      color: #2ccf2a;
    }
  }
}

.rolePagination {
  margin-top: 20px;
  float: right;
  display: flex !important;
  flex-flow: row nowrap !important;
  text-align: center;
}

/*带背景的分页按钮背景色begin*/
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #67c23a;
  color: #fff;
}
.el-pagination.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.el-pagination.is-background .el-pager li:hover {
  color: #67c23a;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #67c23a;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: #67c23a;
  color: #fff;
}
/*带背景的分页按钮背景色end*/
</style>