<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="关联父菜单" v-bind="formItemLayout">
        <a-tree-select
          showSearch
          style="width: 300px"
          :value="value"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择要关联的父菜单(可选)"
          allowClear
          treeDefaultExpandAll
          @change="onChange"
        >
          <a-tree-select-node value="parent 1" title="parent 1" key="0-1">
            <a-tree-select-node
              value="parent 1-0"
              title="parent 1-0"
              key="0-1-1"
            >
              <a-tree-select-node
                :selectable="false"
                value="leaf1"
                title="my leaf"
                key="random"
              />
              <a-tree-select-node
                value="leaf2"
                title="your leaf"
                key="random1"
              />
            </a-tree-select-node>
            <a-tree-select-node
              value="parent 1-1"
              title="parent 1-1"
              key="random2"
            >
              <a-tree-select-node value="sss" key="random3">
                <b style="color: #08c" slot="title">sss</b>
              </a-tree-select-node>
            </a-tree-select-node>
          </a-tree-select-node>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: '请输入菜单名称'
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单路径" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'url',
            {
              rules: [
                {
                  required: true,
                  message: '请输入菜单路径'
                }
              ]
            }
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="菜单类型" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'menuType',
            {
              rules: [
                {
                  required: true,
                  message: '请选择菜单类型'
                }
              ]
            }
          ]"
        >
            <a-select-option key="0" value="菜单">菜单</a-select-option>
            <a-select-option key="1" value="按钮">按钮</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="同级排序权重" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'sort',
            {
              rules: [
                {
                  required: true,
                  message: '请输入菜单同级权重'
                }
              ]
            }
          ]"
        >
        </a-input>
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
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      },
      treeExpandedKeys: [],
      value: undefined,
      form: this.$form.createForm(this)
    };
  },
  mounted () {
    this.form.setFieldsValue({
      url: 'http://'
    })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form values -> ", values);
        }
      });
    },
    onChange(value) {
      console.log(value);
      this.value = value;
    }
  }
};
</script>
