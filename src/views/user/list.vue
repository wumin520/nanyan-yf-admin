<template>
  <div class="page_">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="8">
        <a-col v-for="(item, index) in formInputs" :key="index" :span="6">
          <a-form-item :label="item.label">
            <a-select
              style="width: 150px;"
              v-if="item.input_type === 'select'"
              v-decorator="[item.dataIndex]"
            >
              <a-select-option
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
                >{{ option.name }}</a-select-option
              >
            </a-select>
            <a-input
              v-else
              v-decorator="[item.dataIndex]"
              :placeholder="item.placeholder"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-button v-if="authorizedButtonStr.indexOf('查询') > -1" html-type="submit" type="primary"
            ><a-icon type="search"></a-icon>查询</a-button
          >
          <router-link to="/user/add">
            <a-button v-if="authorizedButtonStr.indexOf('新建') > -1" class="marg_l8_" type="primary" ghost
              ><a-icon type="plus"></a-icon>新建</a-button
            >
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      style="margin-top: 50px;"
      :dataSource="data"
      :columns="columns"
      :pagination="pagination"
      :rowKey="record => record.id"
    >
      <template slot="operation" slot-scope="record">
        <a-button v-if="authorizedButtonStr.indexOf('编辑') > -1" type="primary" ghost @click="editRecord(record)"
          ><a-icon type="edit"></a-icon>编辑</a-button
        >
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
    .ant-form-item {
      display: flex;
    }
    .ant-form-item-control-wrapper {
      flex: 1;
    }
  }
}
</style>
<script>
import api from "@/utils/api";
import qs from "qs";
import authorizedMixin from '@/mixins/authorized';

const columns = [
  {
    title: "用户名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "用户账号",
    dataIndex: "userName",
    key: "userName"
  },
  {
    title: "用户来源",
    dataIndex: "userType",
    key: "userType"
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role"
  },
  {
    title: "创建日期",
    dataIndex: "createDate",
    key: "createDate"
  },
  {
    title: "最近修改人",
    dataIndex: "lastUpdate",
    key: "lastUpdate"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "操作",
    key: "do",
    scopedSlots: { customRender: "operation" }
  }
];
const data = [];
export default {
  data() {
    return {
      pagination: {
        pageNo: 1,
        pageSize: 20, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["5", "20", "50", "100"], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage(page, pageSize), //点击页码事件
        total: 0 //总条数
      },
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [
        {
          label: "用户名称",
          placeholder: "请输入用户名称",
          dataIndex: "name"
        },
        {
          label: "用户账号",
          placeholder: "请输入用户账号",
          dataIndex: "userName"
        },
        {
          label: "用户来源",
          placeholder: "请选择用户来源",
          dataIndex: "userType",
          input_type: "select",
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
          label: "状态",
          placeholder: "请选择状态",
          dataIndex: "status",
          input_type: "select",
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
      ]
    };
  },
  mixins: [authorizedMixin],
  methods: {
    changePage(page, pageSize) {
      this.pagination.pageNo = page;
      this.pagination.pageSize = pageSize;
      //  console.log("page ->>",this.pagination.pageNo,this.pagination.pageSize)
      this.getList();
    },
    getList() {   //获取用户列表
      this.form.validateFields((err, values) => {
        let data = {
          name: values.name, //	用户名称
          userName: values.userName, //	用户账号
          userType: values.userType, //	用户来源 1:南燕用户，2:保司，2:客户
          status: values.status, //	状态 1,有效，2,无效
          pageNum: this.pagination.pageNo, //	当前页码
          pageSize: this.pagination.pageSize //	当前页面显示的数据条目
        };
        if (!err) {
          // console.log("form values -> ", values);
          api.queryUser(qs.stringify(data)).then((res) => {
            this.data = []  //重置data
            this.pagination.total = res.data.content.total  //获得总数据
            res.data.content.list.forEach(item => {
            if(item.userType == 1){
              item.userType = "南燕"
            } else if(item.userType == 2){
              item.userType = "保司"
            } else {
              item.userType == "客户"
            }
              this.data.push({
                name: item.name,
                userName: item.userName,
                userType: item.userType,
                role: item.roleNameList,
                createDate: item.createDate.substr(0,10),
                lastUpdate: item.modifyDate.substr(0,10),
                status: item.status,
                id: item.id
              })
            });
          }).catch((err) => {
            this.$message.info("网络异常")
          })
        }
      });
    },
    handleSubmit(e) {
      // console.log("submit",e)
      e.preventDefault();
      this.getList();
    },
    editRecord(record) {
      // console.log(record, record.id)
      this.$router.push("/user/edit/" + record.id);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
