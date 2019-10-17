<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      
      <a-form-item label="保费" v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'changePremium',
            {
              initialValue: contentData.changePremium,
            }
          ]"
        ></a-input>
      </a-form-item>
      
      <a-form-item label="状态" v-bind="formItemLayout">
        <a-select
          v-decorator="[
            'status',
            {
              initialValue: contentData.status,
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
              initialValue: contentData.batchupdateNo,
            }
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item label="生效日期" v-bind="formItemLayout">
        <a-col :span="8">
              <a-date-picker
                placeholder="请选择"
                v-decorator="[
                  'effectiveDate'
                ]"
              ></a-date-picker>
        </a-col>
      </a-form-item>

       <a-row>
        <a-col :span="24">
          <h2>上传文件</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col offset="4" :span="6">
           <a-upload
              action="/api/common/upload"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>

        </a-col>
      </a-row>

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
      previewVisible: false,
      previewImage: '',
      fileList: [ ],
      fileUpload: [],
      contentData:[],
      pidanId: '',
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
    const { name, params } = this.$route;
    const id = params.id;
    if (id) {
      this.pidanId = id;
      this.getBatchDetail({id:this.pidanId})
    }

  },
  methods: {
    handleCancel() {
        this.previewVisible = false;
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
      },
    handleChange({ fileList }) {
        this.fileList = fileList;
        // let file = [...this.fileList]  //多附件上传
        // this.fileUpload = file.map(value => {
        //   if (value.response) {
        //     return {
        //       name: value.name,
        //       url: value.response.url
        //     }
        //   }
        //   return value
        // })

          let file = [...this.fileList]  //此处需求是只能上传一个附件
          this.fileUpload = file.map(value => {
          if (value.response) {
            return value.response.url
          }
          return value
        }) 
    },

    Batchupdate(params) {   //编辑批单
      params = {
        ...params,
        id: this.pidanId,
        electronicBatch: this.fileUpload.join()
      }
      params.effectiveDate = params.effectiveDate.format("YYYY-MM-DD");
      // console.log("参数2",params)

      api.completeBatchupdate(params).then((res) => {
        if( res.data.returnCode !== "0000"){
          window.message.info(msg);
        } else {
          window.message.info("保存成功，准备跳转...");
          let st = setTimeout(() => {
            this.$router.go(-1)
            clearTimeout(st);
          }, 2000);
        }
      })
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
    getBatchDetail(params) {  //进入编辑页时的初始化请求
        api
        .getBatchDetailById(params)
        .then(res => res.data)
        .then(data => {
            this.contentData = data.content;
            // console.log("---->",this.contentData)
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
