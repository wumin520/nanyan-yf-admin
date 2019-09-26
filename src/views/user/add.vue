<template>
  <div class="page_">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
      <a-row :gutter="8">
        <a-col v-for="(item,index) in formInputs" :key="index" :span="24">
          <a-form-item v-bind="formItemLayout" :label="item.label">
            <a-select style="width: 150px;" v-if="item.input_type==='select'" v-decorator="[
              item.dataIndex
            ]" :placeholder="item.placeholder">
              <a-select-option :key="1" :value="1">可以</a-select-option>
            </a-select>
            <a-checkbox-group v-else-if="item.input_type==='check_group'" v-decorator="[
              'roles'
            ]" style="width: 100%;">
              <a-row>
                <a-col :span="6">
                  <a-checkbox value="1">管理员</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <a-input v-else v-decorator="[
              item.dataIndex
            ]" :placeholder="item.placeholder"></a-input>
          </a-form-item>
        </a-col>
        <a-col :offset="3" :span="24">
            <a-button html-type="submit" type="primary"><a-icon type="save"></a-icon>保存</a-button>
            <router-link to="/user">
              <a-button class="marg_l8_" type="primary" ghost><a-icon type="cancel"></a-icon>取消</a-button>
            </router-link>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<style lang="scss" scoped>
.page_ {
  .marg_l8_ {
    margin-left: 16px;
  }
  .ant-advanced-search-form {
    margin-top: 50px;
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
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 },
      },
      form: this.$form.createForm(this),
      formInputs: [{
        label: '用户账号',
        placeholder: '请输入用户账号',
        dataIndex: 'account'
      }, {
        label: '用户密码',
        placeholder: '请输入用户密码',
        dataIndex: 'password'
      }, {
        label: '联系电话',
        placeholder: '请输入联系电话',
        dataIndex: 'telephone'
      }, {
        label: '邮箱',
        placeholder: '请输入邮箱',
        dataIndex: 'email'
      }, {
        label: '分配角色',
        placeholder: '请选择',
        dataIndex: 'role',
        input_type: 'check_group'
      }, {
        label: '用户来源',
        placeholder: '请选择用户来源',
        dataIndex: 'origin',
        input_type: 'select'
      }, {
        label: '姓名',
        placeholder: '请输入用户姓名',
        dataIndex: 'username'
      }, {
        label: '地址',
        placeholder: '请输入地址',
        dataIndex: 'address'
      }, {
        label: '状态',
        placeholder: '请选择状态',
        dataIndex: 'state',
        input_type: 'select'
      }, {
        label: '机构名称',
        placeholder: '请选择机构名称',
        dataIndex: 'instruct',
        input_type: 'select'
      }]
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form values -> ', values)
        }
      })
    }
  },
  created () {
    // console.log("acceptRecord ->",this.$route.params.record)
    let record = this.$route.params.record
    if (JSON.stringify(record) === "{}"){
      console.log('from add')
    } else {
      console.log('from edit')
      this.props.form.setFieldsValue((err, values) => {
        console.log("form content ->",values)
        values.account = record.account

      })
    }
  }
}
</script>
