<template>
   <a-col>
     <a-row>
        <a-col :span="24">
          <h2 class="title_">基础信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col  v-for="(item, index) in content" :key="index" :span="12">
            <div class="display">{{item.title}}:   {{contentData[item.dataIndex]}}</div>
        </a-col>
        
    </a-row>
    <a-row>
    <a-col :span="24">
          <h2 class="title_">批单详细列表</h2>
          <a-divider></a-divider>
    </a-col>
      <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" :scroll="{ x: 2600 }">
      <template slot="isMain" slot-scope="text">
        <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>
                与主被保人关系：{{main.relationship}}
              </a-menu-item>
              <a-menu-item>
                主被保人姓名：{{main.mainName}}
              </a-menu-item>
              <a-menu-item>
                主被保人电话：{{main.mainIdNo}}
              </a-menu-item>
            </a-menu>
            <a v-if="isTrue" href="javascript:;"> {{text}} <a-icon type="down" /> </a>
            <div v-else>{{text}}</div>
          </a-dropdown>
      </template>
    </a-table>
    </a-row>
   </a-col>
   
</template>
<script>
import api from "@/utils/api";

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '证件类型',
      dataIndex: 'idType',
    },
    {
      title: '证件号码',
      dataIndex: 'idNo',
    },
    {
      title: '有无社保',
      dataIndex: 'socialsecurity',
    },
    {
      title: '职业类别',
      dataIndex: 'occType',
    },
    {
      title: '承保职业',
      dataIndex: 'underwirdeOccupational',
    },
    {
      fixed: 'right',
      width: 120,
      title: '是否主被保人',
      dataIndex: 'isMain',
      scopedSlots: { customRender: 'isMain' },
    }
  ];

const data = [];
for(var i=0;i<10;i++){
  data.push({
      name: 'John Brown',
      sex: '男',
      phone: '110',
      email: '1313@qq.com',
      idType: '爱上打开' ,
      birthDate: '2010 10-1',
      idNo: '14142',
      socialsecurity: 'akjfhckj',
      occType: '卡萨就成了',
      underwirdeOccupational:'萨克',
      isMain: '否',
      isTrue: false
    })
}

const contentData = {
  type: '加人',
  changePremium: '122',
  batchupdateNo: '212947',
  payment: "线下",
  electronicBatch: 'http://baidu.com',
  status: '失效'
}
const content = [
  {
    title: '批改类型',
    dataIndex: 'type'
  },
  {
    title: '保费变化',
    dataIndex: 'changePremium'
  },
  {
    title: '批单号',
    dataIndex: 'batchupdateNo'
  },
  {
    title: '支付方式',
    dataIndex: 'payment'
  },
  {
    title: '电子批单',
    dataIndex: 'electronicBatch'
  },
  {
    title: '状态',
    dataIndex: 'status'
  }
]

const main = {
      relationship: "与主被保人关联",
		  mainName: "张三",
		  mainIdNo: "12345678888"
}

  export default {
    data() {
      return {
        content,
        contentData,
        policyId: '',
        isTrue: true,
        main,
        data,
        columns,
        pagination: {}
      };
    },
    methods: {
      getBatchDetail(params) {
        api
        .getBatchDetailById(params)
        .then(res => res.data)
        .then(data => {
            const { list, total } = data.content;
            this.data = list;
            this.pagination.total = total;
        });
      }
    },
    mounted() {
      this.policyId = this.$route.params.id
      // console.log("this.policyId-->",this.policyId)
      // this.getBatchDetail({policyId:this.policyId})
    }
  };
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }

  h2 {
    padding-left: 16px;
    font-size: 18px;
    color: #1890ff;
    border-left: 6px solid #1890ff;
  }

  .display{
    padding: 30px;
    font-size: 16px;
  }

  .ant-row{
    margin-bottom: 50px;
  }
</style>