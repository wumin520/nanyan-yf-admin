<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="关联父菜单" v-bind="formItemLayout">
        <a-tree-select
          style="width: 300px"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="treeData"
          placeholder="请选择"
          treeDefaultExpandAll
          v-model="formInfo.parentId"
          @change="onChange"
        >
          <span
            style="color: #08c"
            slot="title"
            slot-scope="{ key, value }"
            v-if="(key = '0-0-1')"
          >
            Child Node1 {{ value }}
          </span>
        </a-tree-select>
      </a-form-item>
      <a-form-item label="菜单名称" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: formInfo.name,
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
              initialValue: formInfo.url,
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
            'type',
            {
              initialValue: formInfo.type,
              rules: [
                {
                  required: true,
                  message: '请选择菜单类型'
                }
              ]
            }
          ]"
        >
          <a-select-option key="1" value="1">菜单</a-select-option>
          <a-select-option key="2" value="2">按钮</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="同级排序权重" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'priority',
            {
              initialValue: formInfo.priority,
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
          <a-button html-type="submit" type="primary">确定</a-button>
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
import api from "@/utils/api";
import { transformMenuData } from "@/utils/authorized";

const treeData = [];
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      },
      treeExpandedKeys: [],
      form: this.$form.createForm(this),
      treeData,
      value: undefined,
      formInfo: {
      }
    };
  },
  watch: {
    value(value) {
      console.log(value);
    }
  },
  mounted() {
    // this.form.setFieldsValue({
    //   url: 'http://'
    // })
    const { name, params } = this.$route;
    if (name === "menu_edit") {
      console.log(name)
    }
    const id = params.id;
    if (id) {
      this.edit_id = id;
      this.fetchDetail(id);
    }
    this.fetchResourceList();
  },
  methods: {
    postData(params) {
      params.parentId = this.formInfo.parentId || 0
      params.status = 1
      api
        .saveResource({
          ...params
        })
        .then(res => res.data)
        .then(() => {
          this.promptMsg("添加成功！正在跳转...");
        });
    },
    promptMsg(msg) {
      window.message.success(msg);
      let st = setTimeout(() => {
        this.$router.push("/adminMenu/list");
        clearTimeout(st);
      }, 2000);
    },
    fetchDetail(id) {
      api
        .getResourceById({
          id
        })
        .then(res => res.data)
        .then(data => {
          data.content.parentId = data.content.parentId && data.content.parentId.toString()
          this.formInfo = data.content;
          // console.log("formInfo---->>>",this.formInfo)
        });
    },
    updateResource(params) {
      params.id = this.edit_id;
      params.parentId = this.formInfo.parentId || 0
      api
        .updateResource(params)
        .then(res => res.data)
        .then(data => {
          this.promptMsg("修改成功！正在跳转...");
        });
    },
    fetchResourceList() {
      api
        .getAllResource()
        .then(res => res.data)
        .then(data => {
          this.treeData = transformMenuData(data.content, null, true)
          console.log("treeData--->>>",data.content);
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form values -> ", values);
          if (this.$route.name == "admin_menu_edit") {
            this.updateResource(values);
            return;
          }
          this.postData(values);
        }
      });
    },
    onChange(value) {
      // console.log(value);
      this.value = value;
      console.log(this.formInfo, '1')
    }
  }
};
</script>
