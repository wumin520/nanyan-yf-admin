<template>
  <div class="page_">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <!-- <router-link slot="extra" to="/bxOrder/add"></router-link> -->
        <!-- <a href="#" slot="extra">新建保单</a> -->
        <a-card :title="item.companyName">
          <div>公司联系电话：{{ item.companyPhone }}</div>
          <div>公司邮箱：{{ item.companyEmail }}</div>
          <div
            style="white-space:pre-wrap;margin-top: 16px;"
            v-html="item.companyPresentation"
          ></div>
          <template class="ant-card-actions" slot="actions">
            <router-link :to="'/bxOrder/add/' + item.id">
              <a-icon type="plus" />新建保单
            </router-link>
            <!-- <router-link to="/bxOrder/list">
                <a-icon type="edit" />查看保单
            </router-link> -->
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import api from "@/utils/api";

const data = [
  {
    companyName: "保险公司A",
    companyPresentation: "这是一个很好的公司",
    presentationType: "2",
    companyCode: "T10001",
    companyPhone: "13888888888",
    companyEmail: "fasfdsafa@qq.com",
    status: "1",
    creator: 1001,
    createDate: "2019-09-25T06:59:51.000+0000",
    modifier: 1001,
    modifyDate: "2019-09-25T06:59:51.000+0000"
  }
];
export default {
  data() {
    return {
      data
    };
  },
  mounted() {
    this.fetchCompanyList();
  },
  methods: {
    fetchCompanyList() {
      api
        .companyList()
        .then(res => res.data)
        .then(data => {
          this.data = data.content;
        });
    }
  }
};
</script>
