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
          <router-link to="/adminMenu/add">
            <a-button class="marg_l8_" type="primary" ghost
              ><a-icon type="plus"></a-icon>新建</a-button
            >
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table style="margin-top: 50px;" :dataSource="data" :columns="columns" :pagination="pagination">
      <template slot="type" slot-scope="text">
        {{ text == 1 ? "菜单" : "按钮" }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button @click="delRecord(record,index)" type="primary"
          ><a-icon type="delete"></a-icon>删除</a-button
        >
        <router-link :to="'/adminMenu/edit/' + record.id">
          <a-button class="marg_l8_" type="primary" ghost
            ><a-icon type="edit"></a-icon>编辑</a-button
          >
        </router-link>
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

const columns = [
  {
    title: "菜单id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "资源名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "资源类型",
    dataIndex: "type",
    key: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "菜单路径",
    dataIndex: "url",
    key: "url"
  },
  {
    title: "最近操作人",
    dataIndex: "update",
    key: "update"
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
    id: i,
    name: "小站",
    url: "/dashboard",
    update: "ssh"
  });
}
export default {
  data() {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [
        {
          label: "资源名称",
          placeholder: "请输入菜单名称",
          dataIndex: "name"
        },
        {
          label: "菜单路径",
          placeholder: "请输入菜单路径",
          dataIndex: "url"
        }
      ],
      pagination: {
        total: 0,
        pageNo: 1,
        pageSize: 20,
        pageSizeOptions: ["5", "20", "50", "100"],
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["5", "20", "50", "100"], // 每页数量选项
        showTotal: total => `总共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.changePage(page, pageSize), //点击页码事件
      }
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    changePage(page, pageSize) {
      this.pagination.pageNo = page;
      this.pagination.pageSize = pageSize;
      this.fetchList()
    },
    delRecord(record, index) {
      this.data.splice(index, 1)
      api
        .updateResource({
          id: record.id,
          status: 2
        })
        .then(res => {
          this.fetchList();
        });
    },
    fetchList(options) {
      const params = {
        pageNum: this.pagination.pageNo,
        pageSize: this.pagination.pageSize
      };
      for (let key in options) {
        let val = options[key];
        if (val) {
          params[key] = val;
        }
      }
      api
        .getResourceList(params)
        .then(res => res.data)
        .then(data => {
          this.pagination.total = data.content.total  //获得总数据
          const { list } = data.content;
          this.data = list;
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.fetchList(values);
      });
    }
  }
};
</script>
