<template>
   <a-col>
     <a-row>
        <a-col :span="24">
          <h2 class="title_">基础信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col  v-for="(item, index) in content" :key="index" :span="12">
            <div v-if="item.title!=='电子批单'" class="display">{{item.title}}:   {{contentData[item.dataIndex]}}</div>
            <a-button v-else style="margin:30px;" type="primary" ghost><a target="_blank" :href="contentData[item.dataIndex]">下载电子批单</a></a-button>
        </a-col>
        
    </a-row>
    <a-row>
    <a-col :span="24">
          <h2 class="title_">批单详细列表</h2>
          <a-divider></a-divider>
    </a-col>
      <a-table :columns="columns"  :rowKey="record => record.id" :scroll="{ x: 1500}" :dataSource="listFilter(data)" bordered :pagination="false" >
      <!-- <template slot="idType" slot-scope="text">
            {{ text | filterIdType(idTypeOptions) }}
      </template> -->

      <!-- <template solt="isMain" slot-scope="text, record">
        <a-dropdown>
          <div v-if="record.isTrue">{{text}}{{record.id}}</div>
           <a v-else href="javascript:;"> {{text}}{{record.id}} <a-icon type="down" /> </a>
            <a-menu>
              <a-menu-item>
                与主被保人关系：{{record.relationship}}
              </a-menu-item>
              <a-menu-item>
                主被保人姓名：{{record.mainName}}
              </a-menu-item>
              <a-menu-item>
                主被保人电话：{{record.mainIdNo}}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
      </template> -->
    </a-table>
    </a-row>
   </a-col>
   
</template>
<script>
import api from "@/utils/api";
import dictOptions from "../bx_order/dictOptions";

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left'
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
      // fixed: 'right',
      // width: 120,
      title: '是否主被保人',
      dataIndex: 'isMain',
      scopedSlots: { customRender: 'isMain' }
    },
    {
      title: '与主被保人关联',
      dataIndex: 'relationship',
    },
    {
      title: '主被保人姓名',
      dataIndex: 'mainName',
    },
    {
      title: '主被保人证件号码',
      dataIndex: 'mainIdNo',
    },
  ];

const data = [];

const contentData = {
  // type: '加人',
  // changePremium: '122',
  // batchupdateNo: '212947',
  // payment: "线下",
  // electronicBatch: 'http://baidu.com',
  // status: '失效'
}
const content = [  //表格上方展示区
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

  export default {
    data() {
      return {
        content,
        contentData,
        idTypeOptions: dictOptions.idTypeOptions,
        id: '',
        data,
        columns,
      //   pagination: {
      //   pageNum: 1,
      //   pageSize: 20,
      //   total: 0
      // }
      };
    },
    filters:{
        filterIdType: (val, idTypeOptions) => {
        if (!val) {
          return ''
        }
        return idTypeOptions[val].name;
       },
       filterType: {

       }
    },
    methods: {
      listFilter(list) {
        return list.filter(function(item){
            //状态
            if (item.idType == "0") {
              item.idType = "省份证"
            } else if (item.idType == "1") {
              item.idType = "护照"
            } else if (item.idType == "2") {
              item.idType = "其他"
            }

            //状态
            if (item.sex == "F") {
              item.sex = "女"
            } else if (item.sex == "M") {
              item.sex = "男"
            }

            if(item.socialsecurity == "Y"){
              item.socialsecurity = "有"
            } else if (item.socialsecurity == "N"){
              item.socialsecurity = "无"
            }

            if(item.isMain == "Y"){
              item.isMain = "是"
              item.isTrue = false
              item.relationship = "无"
              item.mainName = "无"
              item.mainIdNo = "无"
            } else if (item.isMain == "N"){
              item.isMain = "否"
              item.isTrue = true
            }
            // console.log("===>>>",item)

            return item
        })
      },
      getBatchDetail(params) {
        api
        .getBatchDetailById(params)
        .then(res => res.data)
        .then(data => {
            this.contentData = data.content;
            this.data = data.content.insurceList;
            // this.data.push(data.content.insurceList[0]);
            // console.log(">>>>>>>",this.data,data.content.insurceList)
        });
      }
    },
    mounted() {
      this.id = this.$route.params.id
      // console.log("this.policyId-->",this.policyId)
      this.getBatchDetail({id:this.id})
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