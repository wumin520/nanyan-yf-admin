<template>
<div class="page_">
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index">
      <!-- <router-link slot="extra" to="/bxOrder/add"></router-link> -->
      <!-- <a href="#" slot="extra">新建保单</a> -->
      <a-card :title="item.title">
        <div>公司简介</div>
        <div>产品简介 <a target="_blank" href="#">点击跳转</a></div>
        <template class="ant-card-actions" slot="actions">
            <router-link to="/bxOrder/add">
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
<style lang="scss" scoped>

</style>
<script>
const data = [
  {
    title: '保险公司A',
  },
  {
    title: '保险公司B',
  },
  {
    title: '保险公司C',
  },
  {
    title: '保险公司D',
  },
]
export default {
    data () {
        return {
            data
        }
    }
}
</script>