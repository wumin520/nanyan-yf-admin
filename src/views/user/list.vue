<template>
  <div class="page_">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col v-for="(item,index) in formInputs" :key="index" :span="6">
          <a-form-item :label="item.label">
            <a-select style="width: 150px;" v-if="item.input_type==='select'" v-decorator="[
              item.dataIndex
            ]">
              <a-select-option :key="1" :value="1">可以</a-select-option>
            </a-select>
            <a-input v-else v-decorator="[
              item.dataIndex
            ]" :placeholder="item.placeholder"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-button html-type="submit" type="primary"><a-icon type="search"></a-icon>查询</a-button>
          <router-link to="/user/add">
            <a-button class="marg_l8_" type="primary" ghost><a-icon type="plus"></a-icon>新建</a-button>
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table style="margin-top: 50px;" :dataSource="data" :columns="columns">
      <template slot="operation">
        <a-button type="primary"><a-icon type="delete"></a-icon>删除</a-button>
        <a-button class="marg_l8_" type="primary" ghost><a-icon type="edit"></a-icon>编辑</a-button>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss" scoped>
.page_ {
  .marg_l8_ {
    margin-left: 16px;
  }
  .ant-advanced-search-form {
    .ant-form-item  {
      display: flex;
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}
</style>
<script>
const columns = [{
  title: '用户名称',
  dataIndex: 'username',
  key: 'username'
}, {
  title: '用户账号',
  dataIndex: 'account',
  key: 'account'
}, {
  title: '用户来源',
  dataIndex: 'origin',
  key: 'origin'
}, {
  title: '角色',
  dataIndex: 'role',
  key: 'role'
}, {
  title: '机构名称',
  dataIndex: 'instruct',
  key: 'instruct'
}, {
  title: '创建日期',
  dataIndex: 'createDate',
  key: 'createDate'
}, {
  title: '最近修改人',
  dataIndex: 'lastUpdate',
  key: 'lastUpdate'
}, {
  title: '状态',
  dataIndex: 'state',
  key: 'state'
}, {
  title: '操作',
  key: 'do',
  scopedSlots: { customRender: 'operation'}
}];
const data = []
for (var i = 0; i < 3; i++) {
  data.push({
    username: '小站',
    account: '101',
    origin: 'ssh',
    role: 'admin',
    instruct: '百里',
    createDate: '2019-09-23',
    lastUpdate: '2019-10-01',
    state: 1
  })
}
export default {
  data () {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [{
        label: '用户名称',
        placeholder: '请输入用户名称',
        dataIndex: 'username'
      }, {
        label: '用户账号',
        placeholder: '请输入用户账号',
        dataIndex: 'account'
      }, {
        label: '用户来源',
        placeholder: '请选择用户来源',
        dataIndex: 'user_origin',
        input_type: 'select'
      }, {
        label: '机构名称',
        placeholder: '请输入机构名称',
        dataIndex: 'instruct'
      }, {
        label: '机构代码',
        placeholder: '请输入机构代码',
        dataIndex: 'instruct_code'
      }, {
        label: '状态',
        placeholder: '请选择状态',
        dataIndex: 'state',
        input_type: 'select'
      }]
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
    }
  }
}
</script>
