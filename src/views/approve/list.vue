<template>
  <div class="page_">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSubmit"
    >
      <a-row :gutter="8">
        <a-col v-for="(item, index) in formInputs" :key="'index'+index" :span="8">
          <a-form-item :label="item.label">
            <a-select
              :placeholder="item.placeholder"
              style="width: 150px;"
              v-if="item.input_type === 'select'"
              v-decorator="[
              item.dataIndex,
              { ...item.inputRequired }
              ]"
            >
              <a-select-option
                v-for="option in item.options"
                :key="option.key"
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
        <a-col :span="8">
          <a-form-item label="申请日期">
              <a-date-picker
                placeholder="请选择"
                v-decorator="[
                  'appDate'
                ]"
              ></a-date-picker>
          </a-form-item>
        </a-col>

        <a-col :span="2">
          <a-button v-if="authorizedButtonStr.indexOf('查询') > -1" html-type="submit" type="primary"
            ><a-icon type="search"></a-icon>查询</a-button>
        </a-col>
        <a-col :span="2">
          <a-button v-if="authorizedButtonStr.indexOf('导出') > -1" type="primary"
            ><a-icon type="folder-open"></a-icon>导出</a-button>
        </a-col>
        
      </a-row>
    </a-form>
    <a-table
      :rowKey="record => record.id"
      :pagination="pagination"
      @change="handleTableChange"
      style="margin-top: 50px;"
      :dataSource="listFilter(data)"
      :columns="columns"
    >
      <template slot="operation" slot-scope="text, record">
        <router-link v-if="authorizedButtonStr.indexOf('查看详情') > -1" :to="'/approve/detail/' + record.id">查看详情</router-link>
        <router-link
          v-if="authorizedButtonStr.indexOf('编辑') > -1"
          style="margin-left: 16px;"
          :to="'/approve/edit/' + record.id"
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
import authorizedMixin from '@/mixins/authorized';

const columns = [
  {
    title: "批单号",
    dataIndex: "batchupdateNo",
    key: "batchupdateNo"
  },
  {
    title: "支付方式",
    dataIndex: "payment",
    key: "payment"
  },
  // {
  //   title: "电子批单",
  //   dataIndex: "electronicBatch",
  //   key: "electronicBatch"
  // },
  {
    title: "申请日期",
    dataIndex: "appDate",
    key: "appDate"
  },
  {
    title: "保费变化",
    dataIndex: "changePremium",
    key: "changePremium"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "批改类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "操作",
    key: "do",
    scopedSlots: { customRender: "operation" }
  }
];
const data = [
  {
    id: '1001',
    changePremium: "100",
    type: '加人',
    batchupdateNo: "1234",
    lectronicBatch:'adad',
    payment: "支付宝",
    appDate: "2019-09-23",
    status: "审批中"
  },
  {
    id: '1002',
    changePremium: "100",
    type: '加人',
    batchupdateNo: "12345",
    lectronicBatch:'adad',
    payment: "支付宝",
    appDate: "2019-09-23",
    status: "审批中"
  }
];
export default {
  data() {
    return {
      typeId: '',
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
          label: "批单申请号",
          placeholder: "请输入批单申请号",
          dataIndex: "id"
        },
        {
          label: "批单号",
          placeholder: "请输入批单号",
          dataIndex: "batchupdateNo"
        }
     ],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
    };
  },
  mixins: [authorizedMixin],
  mounted() {
    this.typeId = this.$route.params.id
    this.getBatchList(1);
  },
  methods: {
    listFilter(list) {
        return list.filter(function(item){
            //状态
            if (item.status == "0") {
              item.status = "失效"
            } else if (item.status == "1") {
              item.status = "待处理"
            } else if (item.status == "2") {
              item.status = "审批中"
            } else if (item.status == "3") {
              item.status = "已完成"
            }

            if(item.type == "1"){
              item.type = "加人"
            } else if (item.type == "2"){
              item.type = "修改"
            } else if (item.type == "3"){
              item.type = "减人"
            }
            return item
            // console.log("===>>>",item)
        })
    },
    handleTableChange(pagination) {
      this.getBatchList(pagination.current)
    },
    getBatchList(pageNum = 1, formOptions = {}) {
      let params = {
        pageNum,
        pageSize: this.pagination.pageSize
      };
      let ReqData = {}
      for (let key in formOptions) {
        const val = formOptions[key];
        if (val && typeof val !== "object") {
          ReqData[key] = val;
        } else if (val instanceof Object){
          ReqData.appDate = val.format("YYYY-MM-DD");
        }
      }
      
      ReqData.type = this.typeId
      // console.log("--params-->",params)
      api
      .getBatchListByType(params,ReqData)
      .then(res => res.data)
      .then(data => {
          const { list, total } = data.content;
          // console.log("list--->",list,this.listFilter(list))
          this.data = list;
          this.pagination.total = total;
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.getBatchList(1, values);
      });
    }
  }
};
</script>
