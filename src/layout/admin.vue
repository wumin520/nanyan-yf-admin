<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">
        <img src="../assets/logo1.png" />
      </div>
      <!-- <a-menu theme="light" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu> -->
      <a-menu
        :selectedKeys="selectedKeys"
        :defaultOpenKeys="['2']"
        mode="inline"
        theme="light"
        :inlineCollapsed="collapsed"
      >
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.key">
            <router-link :to="item.url">
              <a-icon type="pie-chart" />
              <span>{{ item.title }}</span>
            </router-link>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.key" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-popover placement="bottom">
          <template slot="content">
            <a href="javascript:;"  @click="exit">退出登录</a>
          </template>
          <template slot="title">
            <div class="username_" style="text-align: center;">{{userName}}</div>
          </template>
          <a-avatar style="backgroundColor:#297FFF; margin-left: auto;position: absolute; right: 72px;top: 13px;" icon="user" />
        </a-popover>
      </a-layout-header>
      <a-breadcrumb style="margin: 16px;" :routes="routes">
        <template
          slot="itemRender"
          slot-scope="{ route, params, routes }"
        >
          <span v-if="routes.indexOf(route) === routes.length - 1">
            {{ route.breadcrumbName }}
          </span>
          <router-link v-else :to="route.path">
            {{ route.breadcrumbName }}
          </router-link>
        </template>
      </a-breadcrumb>
      <a-layout-content
        :style="{
          margin: '0 16px 24px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SubMenu from "./SubMenu";
import api from '@/utils/api';
import { transformMenuData, getUserInfo } from '@/utils/authorized';
import Bus from '@/utils/Bus';

export default {
  data() {
    return {
      collapsed: false,
      list: [
        {
          key: "1",
          title: "用户管理",
          url: "/user/list"
        },
        {
          key: "3",
          title: "角色管理",
          url: "/role/list"
        },
        {
          key: "4",
          title: "菜单管理",
          url: "/adminMenu/list"
        },
        {
          key: "2",
          title: "保单管理",
          children: [
            {
              key: "2.1",
              title: "新增保单",
              url: "/bxOrder/companyList"
            },
            {
              key: "2.2",
              title: "我的保单",
              url: "/bxOrder/list"
            }
          ]
        },
        {
          key: "5",
          title: "批单管理",
          url: "/approve/list",
          iconType: 'project'
        }
      ],
      routes: [],
      selectedKeys: [],
      userName: ''
    };
  },
  watch: {
    $route: function() {
      this.toActiveMenuItem()
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  mounted() {
    console.log(this.$router, this.$route, this);
    api.getResourceByUserId().then(res => res.data).then(data => {
      console.log('getResourceByUserId -> ', data)
      this.list = transformMenuData(data.content, true)
      this.toActiveMenuItem()
      Bus.$emit('findAuthorizedButtons')
    });
    const userInfo = getUserInfo() || {}
    this.userName = userInfo.userName || 'Me'
  },
  methods: {
    toActiveMenuItem () {
      console.log("route change -> ", this.$route);
      const arr = this.$route.matched.map((item, index) => {
        return {
          path: item.path,
          breadcrumbName: item.meta.breadcrumbName || "首页"
        };
      });
      this.routes = arr;

      let path = this.$route.path;
      let hashArr = [];
      let flatList = arr => {
        for (var i = 0; i < arr.length; i++) {
          let item = arr[i];
          hashArr.push(item);
          if (item.children) {
            flatList(item.children);
          }
        }
      };
      flatList(this.list);
      let findItem = hashArr.filter(value => {
        return path == value.url;
      });
      if (findItem.length > 0) {
        this.selectedKeys = [findItem[0].key];
      }
      console.log("findItem ->   ", findItem, hashArr);
    },
    exit () {
      api.exitLogin().then(res => res.data).then((data) => {
        var num=Math.ceil(Math.random()*10);
        this.$router.push({name:"login",params:{num}});
      })
    }
  }
};
</script>
<style lang="scss">
.ant-popover-placement-bottom {
  .ant-popover-title {
    min-width: 150px;
  }
  .ant-popover-inner-content {
    padding: 8px 0;
    text-align: center;
  }
  .username_ {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
#components-layout-demo-custom-trigger {
  min-height: 100%;
  .ant-layout-sider {
    background: #fff;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 35px;
  // background: #eee;
  margin: 16px;
  overflow: hidden;
  img {
    width: 132px;
    height: auto;
    display: block;
  }
}
</style>
