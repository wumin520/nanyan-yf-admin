<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      
      <a-form-item label="保费" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'changePremium',
            {
              initialValue: formInfo.changePremium,
            }
          ]"
        ></a-input>
      </a-form-item>
      
      <a-form-item label="状态" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'status',
            {
              initialValue: formInfo.status,
            }
          ]"
        >
          <a-select-option key="0" value="0">失效</a-select-option>
          <a-select-option key="3" value="3">完成</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="批单号" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'batchupdateNo',
            {
              initialValue: formInfo.batchupdateNo,
            }
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item label="电子批单" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'electronicBatch',
            {
              initialValue: formInfo.electronicBatch,
            }
          ]"
        ></a-input>
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
      policyId: '',
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
    // console.log("this.$route",this.$route)
    // if (name === "approve_edit") {
    //   console.log(name)
    // }
    const id = params.id;
    if (id) {
      this.policyId = id;
    }

  },
  methods: {
    Batchupdate(params) { //编辑批单
      api.completeBatchupdate(params).then((res) => {
        console.log(res)
      })
    },
    promptMsg(msg) {
      window.message.success(msg);
      let st = setTimeout(() => {
        this.$router.push("/approve/list");
        clearTimeout(st);
      }, 2000);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form values -> ", values);
          if (this.$route.name == "approve_edit") {
            this.Batchupdate(values);
            return;
          }
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
