<template>
  <div class="page_">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="8">
        <a-col v-for="(item, index) in formInputs" :key="index" :span="12">
          <a-form-item :label="item.label">
            <a-select
              :placeholder="item.placeholder"
              style="width: 150px;"
              v-if="item.input_type === 'select'"
              v-decorator="[item.dataIndex]"
            >
              <a-select-option
                v-for="(option, index) in item.options"
                :key="index"
                :value="option.value"
                >{{ option.name }}</a-select-option
              >
            </a-select>
            <a-range-picker
              v-else-if="item.input_type === 'range_picker'"
              v-decorator="[item.dataIndex]"
              :placeholder="item.placeholder"
            >
            </a-range-picker>
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
          <router-link to="/bxOrder/companyList">
            <a-button class="marg_l8_" type="primary" ghost
              ><a-icon type="plus"></a-icon>新建</a-button
            >
          </router-link>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :pagination="pagination"
      @change="handleTableChange"
      style="margin-top: 50px;"
      :dataSource="data"
      :columns="columns"
    >
      <template slot="operation" slot-scope="text, record">
        <router-link :to="'/bxOrder/detail/' + record.id">查看详情</router-link>
        <router-link
          style="margin-left: 16px;"
          :to="'/bxOrder/edit/' + record.id"
          >编辑</router-link
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
import moment from "moment";

const columns = [
  {
    title: "保单号",
    dataIndex: "policyNo",
    key: "policyNo"
  },
  {
    title: "产品名称",
    dataIndex: "productName",
    key: "productName"
  },
  {
    title: "保费",
    dataIndex: "premium",
    key: "premium"
  },
  {
    title: "投保人",
    dataIndex: "applicantName",
    key: "applicantName"
  },
  {
    title: "生效日期",
    dataIndex: "startDate",
    key: "startDate"
  },
  {
    title: "终止日期",
    dataIndex: "endDate",
    key: "endDate"
  },
  {
    title: "操作",
    key: "do",
    scopedSlots: { customRender: "operation" }
  }
];
const data = [];
// for (var i = 0; i < 3; i++) {
//   data.push({
//     id: "小站",
//     productName: "101",
//     premium: "ssh",
//     applicantName: "admin",
//     startDate: "2019-09-23",
//     endDate: "2029-09-23"
//   });
// }
export default {
  data() {
    return {
      data,
      columns,
      form: this.$form.createForm(this),
      formInputs: [
        {
          label: "保单号",
          placeholder: "请输入保单号",
          dataIndex: "policyNo"
        },
        {
          label: "投保人名称",
          placeholder: "请输入投保人名称",
          dataIndex: "applicantName"
        },
        {
          label: "保险公司名称",
          placeholder: "请输入保险公司名称",
          dataIndex: "companyName"
        },
        {
          label: "承保状态",
          placeholder: "请选择",
          dataIndex: "underwrideStatus",
          input_type: "select",
          options: [
            {
              name: "有效",
              value: "Y"
            },
            {
              name: "无效",
              value: "N"
            }
          ]
        },
        {
          label: "投保日期",
          placeholder: ["请选择开始时间", "请选择结束时间"],
          dataIndex: "rangeDate",
          input_type: "range_picker"
        }
      ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    };
  },
  mounted() {
    this.fetchPolicyList(1);
  },
  methods: {
    handleTableChange(pagination) {
      this.fetchPolicyList(pagination.current)
    },
    fetchPolicyList(pageNum = 1, formOptions = {}) {
      let params = {
        pageNum,
        pageSize: this.pagination.pageSize
      };
      for (let key in formOptions) {
        const val = formOptions[key];
        if (val && typeof val !== "object") {
          params[key] = val;
        } else if (val instanceof Array) {
          params.startDate = val[0].format("YYYY-MM-DD");
          params.endDate = val[1].format("YYYY-MM-DD");
        }
      }
      api
        .allPolicyList(params)
        .then(res => res.data)
        .then(data => {
          const { list, total } = data.content;
          this.data = list;
          this.pagination.total = total;
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log("form values -> ", values);
        this.fetchPolicyList(1, values);
      });
    }
  }
};
</script>
