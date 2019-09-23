<template>
<div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="菜单名称" v-bind="formItemLayout">
          <a-input v-decorator="[
            'name',
            {
                rules: [{
                    required: true,
                    message: '请输入菜单名称'
                }]
            }
          ]"></a-input>
      </a-form-item>
      <a-form-item label="菜单路径" v-bind="formItemLayout">
          <a-input v-decorator="[
            'url',
            {
                rules: [{
                    required: true,
                    message: '请输入菜单路径'
                }]
            }
          ]"></a-input>
      </a-form-item>
      <a-row>
        <a-col :push="3" :span="24">
          <a-button type="primary">确定</a-button>
          <router-link style="margin-left: 16px;" to="/adminMenu">
            <a-button type="primary" ghost>取消</a-button>
          </router-link>
        </a-col>
      </a-row>
    </a-form>
</div>
</template>
<style lang="scss" scoped>
.page_ {

}
</style>
<script>
export default {
    data () {
        return {
            formItemLayout: {
                labelCol: { span: 3 },
                wrapperCol: { span: 8 }
            }
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