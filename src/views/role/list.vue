<template>
  <div class="page_">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="8">
        <a-col v-for="(item, index) in formInputs" :key="index" :span="8">
          <a-form-item :label="item.label">
            <a-select
              style="width: 150px;"
              v-if="item.input_type === 'select'"
              v-decorator="[item.dataIndex]"
            >
              <a-select-option :key="1" :value="1">可以</a-select-option>
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
          <router-link to="/role/add">
            <a-button class="marg_l8_" type="primary" ghost
              ><a-icon type="plus"></a-icon>新建</a-button
            >
          </router-link>
        </a-col>
      </a-row>
    </a-form>
<<<<<<< HEAD
    <a-table
      style="margin-top: 50px;"
      :dataSource="data"
      :columns="columns"
      :pagination="pagination"
    >
=======
    <a-table style="margin-top: 50px;" :dataSource="data" :columns="columns" :pagination="pagination">
>>>>>>> e771bb1... liu
      <template slot="operation" slot-scope="text, record, index">
        <a-button @click="deleteRecord(record, index)" type="primary"
          ><a-icon type="delete"></a-icon>删除</a-button
        >
        <a-button
          @click="editRecord(record)"
          class="marg_l8_"
          type="primary"
          ghost
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
<<<<<<< HEAD
import api from "@/utils/api";
=======
import api from '@/utils/api';
>>>>>>> e771bb1... liu

const columns = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    key: "roleName"
  },
  {
    title: "角色代码",
    dataIndex: "roleCode",
    key: "roleCode"
  },
  {
    title: "最近操作人",
    dataIndex: "modifier",
    key: "modifier"
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
<<<<<<< HEAD
        pageSizeOptions: ["5", "20", "50", "100"], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>this.changePage(page,pageSize),//点击页码事件
=======
        pageSizeOptions: ['1', '20', '50', '100'], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>self.changePage(page,pageSize),//点击页码事件
>>>>>>> e771bb1... liu
        total:0 //总条数
       },
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [
        {
          label: "角色名称",
          placeholder: "请输入角色名称",
          dataIndex: "roleName"
        },
        {
          label: "角色编码",
          placeholder: "请输入角色编码",
          dataIndex: "roleCode"
        }
      ]
    };
  },
  methods: {
<<<<<<< HEAD
    changePage(page, pageSize) {
      this.pagination.pageNo = page;
      this.pagination.pageSize = pageSize;
      this.getRoleList();
=======
    changePage(page,pageSize) {
       this.pagination.pageNo = page
       this.pagination.pageSize = pageSize
      //  console.log("page ->>",this.pagination.pageNo,this.pagination.pageSize)
       this.getRoleList()
>>>>>>> e771bb1... liu
    },
    editRecord (record) {
      // console.log(record, '1')
      this.$router.push('/role/edit/' + record.id)
    },
    deleteRecord (record, index) { //删除角色
      this.data.splice(index, 1)
      // console.log("-->deleteRecord",record,index)
      let data ={
          id:record.id,//	id
          status: 2,  //	1,有效，2,无效
        }
      api.updateRole(data).then((res) => {
              if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.$message.info("保存成功");
            }
            }).catch((err) => {
              this.$message.info("网络异常")
            })
    },
    handleSubmit(e) {
      e.preventDefault();
<<<<<<< HEAD
      this.getRoleList()   //查询角色
    },
    getRoleList() {     //获取角色列表
      this.form.validateFields((err, values) => {
        let data ={
          roleCode:	values.roleCode, //	用户名称
          roleName:	values.roleName, //	用户账号
=======
      this.getRoleList()
    },
    getRoleList() {
      this.form.validateFields((err, values) => {
        let data ={
          roleCode:	values.name, //	用户名称
          roleName:	values.userName, //	用户账号
>>>>>>> e771bb1... liu
          pageNum:	this.pagination.pageNo, //	当前页码
          pageSize:	this.pagination.pageSize //	当前页面显示的数据条目
        }
        if (!err) {
<<<<<<< HEAD
=======
         
>>>>>>> e771bb1... liu
          api.getRoleList(data).then((res) => {
            if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.data = []  //重置data
<<<<<<< HEAD
              this.pagination.total = res.data.content.total  //获得总数据
=======
>>>>>>> e771bb1... liu
              res.data.content.list.forEach(item => {
                this.data.push({
                  roleName: item.roleName,
                  roleCode: item.roleCode,
                  modifier: item.modifier,
<<<<<<< HEAD
                  status: item.status,
=======
>>>>>>> e771bb1... liu
                  id: item.id
                })
              });
            }
          }).catch((err) => {
<<<<<<< HEAD
            this.$message.info("网络异常")
=======
            console.log(err)
>>>>>>> e771bb1... liu
          })
        }
      });
    }
  },
  mounted() {
    this.getRoleList() 
  }
};
</script>
