<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="24">
          <h2 class="title_">保险日期</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保险起止日期">
            <a-range-picker v-decorator="[
              'rangeDate'
            ]" :placeholder="['请选择开始时间', '请选择结束时间']"></a-range-picker>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>投保单位信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="投保人名称">
            <a-input v-decorator="[
              'name',
              {
                rules: [{
                  required: true,
                  message: '请输入投保人名称'
                }]
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件类型">
            <a-input v-decorator="[
              'name1'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件号码">
            <a-input v-decorator="[
              'name2'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件有效止期">
            <a-input v-decorator="[
              'name3'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="员工总数">
            <a-input v-decorator="[
              'name4'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="经营范围">
            <a-input v-decorator="[
              'name5'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="成立日期">
            <a-input v-decorator="[
              'name6'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位性质">
            <a-input v-decorator="[
              'name7'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="16">
              <a-form-item v-bind="formItemLayout1" label="行业分类">
                <a-select v-decorator="[
                  'name8'
                ]" placeholder="请选择职业">
                  <a-select-option key="1" value="1">1</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-bind="formItemLayout2" label="">
                <a-select v-decorator="[
                  'name9'
                ]" placeholder="请选择职业类型">
                  <a-select-option key="2" value="2">2</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="社会保险登记号">
            <a-input v-decorator="[
              'name10'
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位联系电话">
            <a-input v-decorator="[
              'phone',
              {
                rules: [{
                  required: true,
                  message: '请输入单位联系电话'
                }]
              }
            ]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="纳税人类别">
            <a-select v-decorator="[
              'draweeType',
              {
                rules: [{
                  required: true,
                  message: '请选择纳税人类别'
                }]
              }
            ]" placeholder="请选择纳税人类别">
              <a-select-option key="1" value="1">一般纳税人</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="省">
            <a-select v-decorator="[
              'province',
              {
                rules: [{
                  required: true,
                  message: '请选择纳税人类别'
                }]
              }
            ]" placeholder="请选择省">
              <a-select-option key="1" value="1">湖南</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="市">
            <a-select v-decorator="[
              'city',
              {
                rules: [{
                  required: true,
                  message: '请选择市'
                }]
              }
            ]" placeholder="请选择市">
              <a-select-option key="1" value="1">长沙</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="区/县">
            <a-select v-decorator="[
              'county',
              {
                rules: [{
                  required: true,
                  message: '请选择区/县'
                }]
              }
            ]" placeholder="请选择区/县">
              <a-select-option key="1" value="1">开福区</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="详细地址">
            <a-input v-decorator="[
              'address',
              {
                rules: [{
                  required: true,
                  message: '请输入详细地址'
                }]
              }
            ]" placeholder="请输入详细地址">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>法人信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="签名">
            <a-input v-decorator="[
              'legal_sign',
              {
                rules: [{
                  required: true,
                  message: '请输入签名'
                }]
              }
            ]" placeholder="请输入签名">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select v-decorator="[
              'legal_id_type',
              {
                rules: [{
                  required: true,
                  message: '请选择证件类型'
                }]
              }
            ]" placeholder="请选择证件类型">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件号码">
            <a-select v-decorator="[
              'legal_id',
              {
                rules: [{
                  required: true,
                  message: '请选择证件号码'
                }]
              }
            ]" placeholder="请选择证件号码">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker v-decorator="[
              'idStartDate_legal',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效起期'
                }]
              }
            ]" placeholder="请选择证件有效起期">
              
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-date-picker v-decorator="[
              'idEndDate_legal',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效止期'
                }]
              }
            ]" placeholder="请选择证件有效止期">
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="法人联系地址">
            <a-input v-decorator="[
              'address_legal',
              {
                rules: [{
                  required: true,
                  message: '请选择联系地址'
                }]
              }
            ]" placeholder="请选择联系地址">
              
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>联系人信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input v-decorator="[
              'name_linkman',
              {
                rules: [{
                  required: true,
                  message: '请输入姓名'
                }]
              }
            ]" placeholder="请输入姓名">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="电话">
            <a-input v-decorator="[
              'phone_linkman',
              {
                rules: [{
                  required: true,
                  message: '请输入电话'
                }]
              }
            ]" placeholder="请输入电话">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="E-MAIL">
            <a-input v-decorator="[
              'email_linkman',
              {
                rules: [{
                  required: true,
                  message: '请输入E-MAIL'
                }]
              }
            ]" placeholder="请输入E-MAIL">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select v-decorator="[
              'idType_linkman',
              {
                rules: [{
                  required: true,
                  message: '请输入证件类型'
                }]
              }
            ]" placeholder="请输入证件类型">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件号码">
            <a-select v-decorator="[
              'idNo_linkman',
              {
                rules: [{
                  required: true,
                  message: '请选择证件号码'
                }]
              }
            ]" placeholder="请选择证件号码">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker v-decorator="[
              'idStartDate_linkman',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效起期'
                }]
              }
            ]" placeholder="请选择证件有效起期">
              
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-date-picker v-decorator="[
              'idEndDate_linkman',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效止期'
                }]
              }
            ]" placeholder="请选择证件有效止期">
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="地址">
            <a-input v-decorator="[
              'address_linkman',
              {
                rules: [{
                  required: true,
                  message: '请选择联系地址'
                }]
              }
            ]" placeholder="请选择联系地址">
              
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>银行信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户银行">
            <a-input v-decorator="[
              'bankName_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请输入开户银行'
                }]
              }
            ]" placeholder="请输入开户银行">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户行所在省">
            <a-input v-decorator="[
              'province_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择开户行所在省'
                }]
              }
            ]" placeholder="请选择开户行所在省">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户行所在市">
            <a-input v-decorator="[
              'city_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择开户行所在市'
                }]
              }
            ]" placeholder="请选择开户行所在市">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select v-decorator="[
              'idType_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择证件类型'
                }]
              }
            ]" placeholder="请选择证件类型">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户名">
            <a-select v-decorator="[
              'accountName_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请输入开户名'
                }]
              }
            ]" placeholder="请输入开户名">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="银行账号">
            <a-date-picker v-decorator="[
              'accountNo_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请输入银行账号'
                }]
              }
            ]" placeholder="请输入银行账号">
              
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="付款方式">
            <a-select v-decorator="[
              'payMent_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择付款方式'
                }]
              }
            ]" placeholder="请选择付款方式">
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>受益所有人信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input v-decorator="[
              'name_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请输入姓名'
                }]
              }
            ]" placeholder="请输入姓名">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-input v-decorator="[
              'idType_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请选择证件类型'
                }]
              }
            ]" placeholder="请选择证件类型">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-input v-decorator="[
              'idStartDate_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效起期'
                }]
              }
            ]" placeholder="请选择证件有效起期">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-select v-decorator="[
              'idEndDate_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请选择证件有效止期'
                }]
              }
            ]" placeholder="请选择证件有效止期">
              
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="联系地址">
            <a-select v-decorator="[
              'address_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请输入联系地址'
                }]
              }
            ]" placeholder="请输入联系地址">
              
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>请选择保障计划</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="意外伤害">
            <a-input v-decorator="[
              '01_planList',
              {
                rules: [{
                  required: true,
                  message: '请选择保额'
                }]
              }
            ]" placeholder="请选择保额">

            </a-input>
          </a-form-item>
        </a-col>
        <a-col offset="4" :span="13">
          <a-button @click="showPlanModal" style="margin-bottom: 16px;" type="primary" ghost>新增责任类型</a-button>
          <a-table style="margin-bottom: 32px;" :pagination="false" :dataSource="planData" :columns="planColumns">
            <template slot="type" slot-scope="text">
              {{text == 0 ? '员工' : '子女及家属'}}
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>被保人员清单</h2>
          <a-divider></a-divider>
        </a-col>
      </a-row>
      <a-row>
        <a-col :push="4" :span="6">
          <a-button html-type="submit" type="primary"><a-icon type="save"></a-icon>保存</a-button>
          <a-button style="margin-left: 16px;" type="primary" ghost><a-icon type="cancel"></a-icon>取消</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal :footer="null" @cancel="handleCancel" :visible="planVisible" title="新建责任类型">
      <a-form :form="planForm" @submit="handlePlanSubmit">
        <a-form-item label="被保险人类型">
          <a-select @change="changeInsuredType" v-decorator="[
            'insured_type'
          ]" placeholder="请选择被保险人类型">
            <a-select-option key="0" value="0">员工</a-select-option>
            <a-select-option key="1" value="1">子女及家属</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="责任名称">
          <a-select @change="changeDutyOption" v-decorator="[
            'planName',
            {
              rules: [{
                required: true,
                message: '请选择责任名称'
              }]
            }
          ]" placeholder="请选择责任名称">
            <a-select-option v-for="(item,index) in dutyOptions" :key="index" :value="index">{{item.planName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="保额(元)">
          <a-select v-decorator="[
            'planValue'
          ]" placeholder="请选择">
            <a-select-option v-for="(item,index) in planAmountOptions" :key="index" :value="index">{{item.value}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-row>
          <a-col :span="24">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button @click="handleCancel" style="margin-left: 16px;" type="primary" ghost>取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  padding-left: 16px;
  font-size: 18px;
  color: #1890ff;
  border-left: 6px solid #1890ff;
}
</style>
<script>
const planColumns = [{
  title: '被保险人类型',
  dataIndex: 'insured_type',
  key: 'insured_type',
  scopedSlots: { customRender: 'type'}
}, {
  title: '责任名称',
  dataIndex: 'planName',
  key: 'planName'
}, {
  title: '保额(元)',
  dataIndex: 'planValue',
  key: 'planValue'
}];
const planData = [{
  insured_type: 0,
  planName: '意外医疗',
  planValue: '1万'
}];

export default {
  data () {
    return {
      planAbout: {
        0: [{
          planName: '意外医疗',
          options: [{
            value: '10万'
          },]
        }],
        1: [{
          planName: '门诊及住院',
          options: [{
            value: '10万'
          },]
        }]
      },
      dutyOptions: [], // 责任名称列表
      planAmountOptions: [], // 保额列表
      planVisible: false,
      planColumns,
      planData,
      planForm: this.$form.createForm(this),
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      formItemLayout1: {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 }
      },
      formItemLayout2: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 }
      }
    }
  },
  methods: {
    changeDutyOption (value, option) {
      this.planAmountOptions = this.dutyOptions[value].options
    },
    changeInsuredType (value, option) {
      this.dutyOptions = this.planAbout[value]
      console.log(value, option, 'changeInsuredType -> ')
    },
    showPlanModal () {
      this.planVisible = true
    },
    handleOk () {
      this.planVisible = false
    },
    handleCancel () {
      this.planVisible = false
    },
    handlePlanSubmit (e) {
      e.preventDefault();
      this.planForm.validateFields((err, values) => {
        if (!err) {
          console.log('handlePlanSubmit -> ', values)
          const item = {
            insured_type: values.insured_type,
            planName: this.dutyOptions[values.planName].planName,
            planValue: this.planAmountOptions[values.planValue].value
          }
          console.log('added item values -> ', item)
          this.planData.push(item)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('form values -> ', values)
        }
      })
    }
  }
}
</script>
