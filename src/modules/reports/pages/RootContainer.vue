<template>
  <div id="rootContainer">
    <el-container :style="{'height':winHeight+'px'}">
      <el-header id="mainHeader" class="flex-row-spacebetween">
        <img src="../../../assets/WechatIMG27.png" id="logo" />
        <div>全域通报表系统-业主端</div>
      </el-header>
      <el-container class="rowContainer">
        <el-aside :style="{'height':winHeight+'px'}" width="null">
          <el-menu :style="{'height':winHeight+'px'}" default-active="1" @select="handleSelect">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span>售票报表</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span>停车场报表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main :style="{'height':winHeight+'px'}">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "report.rootContainer",
  data() {
    return {
      winHeight: document.documentElement.clientHeight - 80,
      winWidth: document.documentElement.clientWidth
    };
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      let router_path = this.$route.path;
      if (key == 1) {
        if (router_path != "/report1Detail") {
          this.$router.push({ path: "/report1Detail" });
        }
      } else {
        if (router_path != "/report2Detail") {
          this.$router.push({ path: "/report2Detail" });
        }
      }
    },
    quitLoginBtnOnClicked() {
      this.$router.push({ path: "/Login" });
    },
    pushReport1() {
      this.$router.push({ path: "/report1Detail" });
    }
  },
  created() {},
  beforeMount() {
    this.$options.methods.pushReport1.bind(this)();
  },
  mounted() {
    window.addEventListener("online", function() {
      console.log("有网络了");
    });
    window.addEventListener("offline", function() {
      const option = {
        title: "提示!",
        body: "网络已经断开，请检查您的网络设置!"
        //  icon: path.join('main-process/favicon2.ico')
      };
      const myNotification = new window.Notification(option.title, option);
      myNotification.onclick = () => {
        console.log("点击了");
      };
    });
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight - 80;
      this.winWidth = document.documentElement.clientWidth;
    };
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

#mainHeader {
  height: 80px !important;
  width: 100%;
  background: #e2f0d9;
  line-height: 80px;
  border-bottom: 1px solid #f3f3f3;
  #logo {
    width: 118px;
    height: 72px;
  }
}

.flex-row-spacebetween {
  display: flex !important;
  flex-flow: row nowrap !important;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
}

.rowContainer {
  display: flex;
  flex-flow: row !important;
}

.el-main {
  width: 100%;
  height: 100%;
  padding: 0; //这里要再添加 padding，页面才能生效
  border: 2px solid #81b65c !important;
}

.el-aside {
  border-top: 2px solid #81b65c !important;
  border-left: 2px solid #81b65c !important;
  border-bottom: 2px solid #81b65c !important;
}

.el-menu-item.is-active {
  background-color: #3370ff !important;
  color: #fff;
  span {
    color: #fff !important;
  }
}
</style>