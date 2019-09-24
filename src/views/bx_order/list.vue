<template>
  <div class="page_">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col v-for="(item,index) in formInputs" :key="index" :span="12">
          <a-form-item :label="item.label">
            <a-select style="width: 150px;" v-if="item.input_type==='select'" v-decorator="[
              item.dataIndex
            ]">
              <a-select-option :key="1" :value="1">可以</a-select-option>
            </a-select>
            <a-range-picker v-else-if="item.input_type==='range_picker'" v-decorator="[
              item.dataIndex
            ]" :placeholder="item.placeholder">
            </a-range-picker>
            <a-input v-else v-decorator="[
              item.dataIndex
            ]" :placeholder="item.placeholder"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-button html-type="submit" type="primary"><a-icon type="search"></a-icon>查询</a-button>
          <router-link to="/bxOrder/add">
            <a-button class="marg_l8_" type="primary" ghost><a-icon type="plus"></a-icon>新建</a-button>
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table style="margin-top: 50px;" :dataSource="data" :columns="columns">
      <template slot="operation">
        <router-link to="/bxOrder/detail/1">查看详情</router-link>
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
  title: '保单号',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '产品名称',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '保费',
  dataIndex: 'amount',
  key: 'amount'
}, {
  title: '投保人',
  dataIndex: 'holder',
  key: 'holder'
}, {
  title: '生效日期',
  dataIndex: 'startDate',
  key: 'startDate'
}, {
  title: '终止日期',
  dataIndex: 'endDate',
  key: 'endDate'
}, {
  title: '操作',
  key: 'do',
  scopedSlots: { customRender: 'operation'}
}];
const data = []
for (var i = 0; i < 3; i++) {
  data.push({
    id: '小站',
    name: '101',
    amount: 'ssh',
    holder: 'admin',
    startDate: '2019-09-23',
    endDate: '2029-09-23',
  })
}
export default {
  data () {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [{
        label: '保单号',
        placeholder: '请输入保单号',
        dataIndex: 'username'
      }, {
        label: '投保人名称',
        placeholder: '请输入投保人名称',
        dataIndex: 'account'
      }, {
        label: '被保人名称',
        placeholder: '请输入被保人名称',
        dataIndex: 'user_origin',
      }, {
        label: '保单备注',
        placeholder: '请输入保单备注',
        dataIndex: 'instruct'
      }, {
        label: '关联保单',
        placeholder: '请输入关联保单',
        dataIndex: 'instruct_code'
      }, {
        label: '投保日期',
        placeholder: ['请选择开始时间', '请选择结束时间'],
        dataIndex: 'rangeDate',
        input_type: 'range_picker'
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
