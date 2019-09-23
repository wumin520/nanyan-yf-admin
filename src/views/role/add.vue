<template>
  <div class="page_">
    <a-row>
      <a-col :span="16">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="角色名称" v-bind="formItemLayout">
            <a-input v-decorator="[
              'name',
              {
                rules: [{
                  required: true,
                  message: '请输入角色名称'
                }]
              }
            ]"></a-input>
          </a-form-item>
          <a-form-item label="角色编码" v-bind="formItemLayout">
            <a-input v-decorator="[
              'code',
              {
                rules: [{
                  required: true,
                  message: '请输入角色编码'
                }]
              }
            ]"></a-input>
          </a-form-item>
          <a-form-item label="权限分配" v-bind="formItemLayout">
            <a-tree
              checkable
              @expand="onExpand"
              :expandedKeys="expandedKeys"
              :autoExpandParent="autoExpandParent"
              v-model="checkedKeys"
              @select="onSelect"
              :selectedKeys="selectedKeys"
              :treeData="treeData"
            />
          </a-form-item>
          <a-row>
            <a-col :push="3" :span="24">
              <a-button type="primary"><a-icon type="save"></a-icon>保存</a-button>
              <router-link style="margin-left: 16px;" to="/role">
                <a-button type="primary" ghost><a-icon type="save"></a-icon>保存</a-button>
              </router-link>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="scss" scoped>
  .page_ {

  }
</style>
<script>
const treeData = [{
  title: '用户管理',
  key: '0-0',
  children: [{
    title: '新增',
    key: '0-0-0',
  }, {
    title: '查询',
    key: '0-0-1',
  }, {
    title: '修改',
    key: '0-0-2',
  }, {
    title: '删除',
    key: '0-0-3',
  }],
}, {
  title: '角色管理',
  key: '0-1',
  children: [{
    title: '新增',
    key: '0-1-0',
  }, {
    title: '查询',
    key: '0-1-1',
  }, {
    title: '修改',
    key: '0-1-2',
  }, {
    title: '删除',
    key: '0-1-3',
  }],
},{
  title: '菜单管理',
  key: '0-2',
  children: [{
    title: '新增',
    key: '0-2-0',
  }, {
    title: '查询',
    key: '0-2-1',
  }, {
    title: '修改',
    key: '0-2-2',
  }, {
    title: '删除',
    key: '0-2-3',
  }],
},{
  title: '保单管理',
  key: '0-3',
  children: [{
    title: '新增',
    key: '0-3-0',
  }, {
    title: '查询',
    key: '0-3-1',
  }, {
    title: '修改',
    key: '0-3-2',
  }, {
    title: '删除',
    key: '0-3-4',
  }],
},]
export default {
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {span: 3},
        wrapperCol: {span: 8}
      }
    }
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form values -> ', values)
        }
      })
    },
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
  }
}
</script>
