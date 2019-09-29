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
          <a-button html-type="submit" type="primary"
            ><a-icon type="search"></a-icon>查询</a-button
          >
          <router-link to="/user/add">
            <a-button class="marg_l8_" type="primary" ghost
              ><a-icon type="plus"></a-icon>新建</a-button
            >
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table style="margin-top: 50px;" :dataSource="data" :columns="columns" :pagination="pagination">
      <template slot="operation" slot-scope="record">
        <a-button type="primary" ghost @click="editRecord(record)"><a-icon type="edit"></a-icon>编辑</a-button>
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
import api from '@/utils/api';
import qs from 'qs'
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
for (var i = 0; i < 3; i++) {
  data.push({
    name: "小站",
    userName: "101",
    userType: "ssh",
    role: "admin",
    instruct: "百里",
    createDate: "2019-09-23",
    lastUpdate: "2019-10-01",
    status: 1,
    id: i
  });
}
export default {
  data() {
    let self = this
    return {
      pagination: {
        pageNo: 1,
        pageSize: 20, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['1', '20', '50', '100'], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>self.changePage(page,pageSize),//点击页码事件
        total:0 //总条数
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
  methods: {
    changePage(page,pageSize) {
       this.pagination.pageNo = page
       this.pagination.pageSize = pageSize
      //  console.log("page ->>",this.pagination.pageNo,this.pagination.pageSize)
       this.getList()
    },
    getList() {
      this.form.validateFields((err, values) => {
        let data ={
          name:	values.name, //	用户名称
          userName:	values.userName, //	用户账号
          userType:	values.userType, //	用户来源 1:南燕用户，2:保司，2:客户
          status:	values.status, //	状态 1,有效，2,无效
          pageNum:	this.pagination.pageNo, //	当前页码
          pageSize:	this.pagination.pageSize //	当前页面显示的数据条目
        }
        if (!err) {
          // console.log("form values -> ", values);
          api.queryUser(data).then((res) => {
            this.data = []  //重置data
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
            console.log(err)
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleSubmit(e) {
      // console.log("submit",e)
      e.preventDefault();
      this.getList()
    },
    editRecord (record) {
      // console.log(record, record.id)
      this.$router.push('/user/edit/' + record.id)
    }
  }
};
</script>
