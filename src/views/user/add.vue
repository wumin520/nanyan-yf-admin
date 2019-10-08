<template>
  <div class="page_">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="8">
        <a-col v-for="(item, index) in formInputs" :key="index" :span="24">
          <a-form-item v-bind="formItemLayout" :label="item.label">
            <a-select
              style="width: 150px;"
              v-if="item.input_type === 'statusSelect'"
              v-decorator="[
                item.dataIndex,
                { initialValue: item.initialValue }
              ]"
              :placeholder="item.placeholder"
            >
              <a-select-option
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
                >{{ option.name }}</a-select-option
              >
            </a-select>
            <a-select
              style="width: 150px;"
              v-else-if="item.input_type === 'userTypeSelect'"
              v-decorator="[
                item.dataIndex,
                { initialValue: item.initialValue }
              ]"
              :placeholder="item.placeholder"
              @change="handleSearchChange"
            >
              <a-select-option
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
                >{{ option.name }}</a-select-option
              >
            </a-select>
            <a-checkbox-group
              v-else-if="item.input_type === 'check_group'"
              v-decorator="[
                item.dataIndex,
                { ...selectRequired, initialValue: checkedList }
              ]"
              style="width: 100%;"
            >
              <a-row>
                <a-col :span="24">
                  <a-checkbox
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.name }}</a-checkbox
                  >
                </a-col>
              </a-row>
            </a-checkbox-group>

            <a-input
              v-else-if="item.input_type === 'input'  && item.dataIndex !== 'userEmail'"
              v-decorator="[item.dataIndex,
                {
                  ...inputRequired,
                  initialValue: item.initialValue
                }
              ]"
              :placeholder="item.placeholder"
            ></a-input>
            <a-input
              v-else-if="item.input_type === 'input'  && item.dataIndex === 'userEmail'"
              v-decorator="[item.dataIndex,
                {
                  ...emailRequired,
                  initialValue: item.initialValue
                }]"
              :placeholder="item.placeholder"
            ></a-input>
              <a-input 
                v-else
                v-decorator="[item.dataIndex,
                {
                  initialValue: item.initialValue
                }
                ]"
                :placeholder="item.placeholder"
                :disabled="item.isShow"
              ></a-input>
          </a-form-item>
        </a-col>
        <a-col :offset="3" :span="24">
          <a-button html-type="submit" type="primary"
            ><a-icon type="save"></a-icon>保存</a-button
          >
          <router-link to="/user">
            <a-button class="marg_l8_" type="primary" ghost
              ><a-icon type="cancel"></a-icon>取消</a-button
            >
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
    .ant-form-item {
      display: flex;
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}

.ant-checkbox-wrapper + .ant-checkbox-wrapper{
  margin-left: 0;
}
</style>
<script>
import api from '@/utils/api';
import qs from 'qs'

export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      },
      checkedList:[],
      userId: '', //编辑使用,用户id
      form: this.$form.createForm(this),
      formInputs: [
        {
          label: "用户账号",
          placeholder: "请输入用户账号",
          dataIndex: "userName",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "用户密码",
          placeholder: "请输入用户密码",
          dataIndex: "userPassword",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "联系电话",
          placeholder: "请输入联系电话",
          dataIndex: "userTel",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "邮箱",
          placeholder: "请输入邮箱",
          dataIndex: "userEmail",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "分配角色",
          placeholder: "请选择",
          dataIndex: "roleIdList",
          input_type: "check_group",
          initialValue: "",
          options: [
            {
              name: "系统管理员",
              value: "1"
            },
            {
              name: "南燕管理员",
              value: "2"
            }
          ]
        },
        {
          label: "用户来源",
          placeholder: "请选择用户来源",
          dataIndex: "userType",
          input_type: "userTypeSelect",
          initialValue: "1",
          options: [
            {
              name: "南燕",
              value: "1"
            },
            {
              name: "保司",
              value: "2"
            },
            {
              name: "客户",
              value: "3"
            }
          ]
        },
        {
          label: "公司证件类型",
          placeholder: "请输入公司证件类型",
          dataIndex: "companyIdType",
          input_type: "inputCompany",
          isShow: true,
          initialValue: ""
        },
        {
          label: "公司证件号码",
          placeholder: "请输入公司证件号码",
          dataIndex: "companyIdNo",
          input_type: "inputCompany",
          isShow: true,
          initialValue: ""
        },
        {
          label: "姓名",
          placeholder: "请输入用户姓名",
          dataIndex: "name",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "地址",
          placeholder: "请输入地址",
          dataIndex: "userAddr",
          input_type: "input",
          initialValue: ""
        },
        {
          label: "状态",
          placeholder: "请选择状态",
          dataIndex: "status",
          input_type: "statusSelect",
          initialValue: "",
          options: [
            {
              name: "有效",
              value: "1"
            },
            {
              name: "无效",
              value: "0"
            }
          ]
        }
      ],
      selectRequired: {
        rules: [
          {
            required: true,
            message: "请选择"
          }
        ]
      },
      inputRequired: {
        rules: [
          {
            required: true,
            message: "请输入"
          }
        ]
      },
      emailRequired: {
        rules: [
          {
              type: 'email', 
              message: '邮箱格式不合法!',
          },
          {
            required: true,
            message: "请输入"
          }
        ]
      }
    };
  },
  methods: {
    getAllRoles() {
      api.getAllRole().then((res) => {
        this.formInputs[4].options = []
        res.data.content.forEach((item) => {
            this.formInputs[4].options.push({
              name: item.roleName,
              value: item.id.toString()
            })
        })
        }).catch((err) => {
          console.log(err)
        })
    },
    handleSearchChange(value) {
      // console.log("----->",value)
      if (value !== "1") {
        this.formInputs[6].isShow = false;
        this.formInputs[7].isShow = false;
      } else {
        this.formInputs[6].isShow = true;
        this.formInputs[7].isShow = true;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      // this.addUserList()
      if (JSON.stringify(this.userId) == "{}") {
        this.addUserList();
      } else {
        this.editUserList();
      }
    },
    addUserList() {  //新增
      this.form.validateFields((err, values) => {
        // console.log("-->values.roleIdList",values.roleIdList)
        let data = {
          userName: values.userName, //	用户账号
          userPassword: values.userPassword, //用户密码，MD5后base64加密
          userType: values.userType, //1:南燕用户，2:保司，2:客户
          name: values.name, //姓名
          userTel: values.userTel, //联系电话
          userEmail: values.userEmail, //邮箱
          userAddr: values.userAddr, //地址
          companyIdType: values.companyIdType, //暂无 公司证件类型
          companyIdNo: values.companyIdNo, //暂无	公司证件号码
          status: values.status, //状态 1,有效，2,无效
          roleIdList: values.roleIdList.join() //用户角色id集合
        };
        if (!err) {
          // console.log("form values -> ", values);
          api.addUser(qs.stringify(data)).then((res) => {
            // console.log(res)
             if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.$message.info("保存成功");
              this.$router.push({name:'user'})
            }
          }).catch((err) => {
            this.$message.info("网络异常")
          })
        }
      });
    },
    editUserList() {   //编辑
      this.form.validateFields((err, values) => {
        // console.log("-->values.roleIdList",values.roleIdList)
        let data = {
          id: this.userId.id,
          userName: values.userName, //	用户账号
          userPassword: values.userPassword, //用户密码，MD5后base64加密
          userType: values.userType, //1:南燕用户，2:保司，2:客户
          name: values.name, //姓名
          userTel: values.userTel, //联系电话
          userEmail: values.userEmail, //邮箱
          userAddr: values.userAddr, //地址
          companyIdType: values.companyIdType, //暂无 公司证件类型
          companyIdNo: values.companyIdNo, //暂无	公司证件号码
          status: values.status, //状态 1,有效，2,无效
          roleIdList: values.roleIdList.join() //用户角色id集合
        };
        if (!err) {
          // console.log("form values -> ", values);
          api.updateUser(qs.stringify(data)).then((res) => {
            // console.log(res)
            if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.$message.info("保存成功");
              this.$router.push({name:'user'})
            }
          }).catch((err) => {
            this.$message.info("网络异常")
          })
        }
      });
    }, 
    //初始化编辑信息
    initEditData() {
      let promiseOne = new Promise((result, reject) => {
        api.getAllRole().then((res) => {
        this.formInputs[4].options = []
        res.data.content.forEach((item) => {
            this.formInputs[4].options.push({
              name: item.roleName,
              value: item.id.toString()
            })
        })
         result()
        }).catch((err) => {
          console.log(err)
          reject()
        })
      })

        promiseOne.then(() => {
          api.getUser({id:this.userId.id}).then((res) => {
          this.formInputs[0].initialValue = res.data.content.userName
          this.formInputs[1].initialValue = res.data.content.userPassword
          this.formInputs[2].initialValue = res.data.content.userTel
          this.formInputs[3].initialValue = res.data.content.userEmail
          this.formInputs[5].initialValue = res.data.content.userType
          this.formInputs[6].initialValue = res.data.content.companyIdType
          this.formInputs[7].initialValue = res.data.content.companyIdNo
          this.formInputs[8].initialValue = res.data.content.name
          this.formInputs[9].initialValue = res.data.content.userAddr
          this.formInputs[10].initialValue = res.data.content.status
          this.checkedList = res.data.content.roleIdList?res.data.content.roleIdList.split(","):[]
          // console.log("状态",this.formInputs[5].initialValue)
          if (this.formInputs[5].initialValue !== "1") {
            this.formInputs[6].isShow = false;
            this.formInputs[7].isShow = false;
          } else {
            this.formInputs[6].isShow = true;
            this.formInputs[7].isShow = true;
          }
        })
      })
    }
  },
  created() {
    this.userId = this.$route.params
    if(this.userId.id !== undefined || null || ""){
      this.initEditData()  
    } else {
      this.getAllRoles()
    }
  }
};
</script>
