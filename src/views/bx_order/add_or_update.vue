<template>
  <div class="page_">
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="24">
          <h2 class="title_">保险信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保险起止日期">
            <a-range-picker
              v-if="editable"
              :ranges="rangesDate"
              v-decorator="[
                'rangeDate',
                {
                  ...selectRequired,
                  initialValue: allFormData.rangeDate
                }
              ]"
              :placeholder="['请选择开始时间', '请选择结束时间']"
            ></a-range-picker>
            <div v-else>
              {{ allFormData.startDate }} - {{ allFormData.endDate }}
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保单号">
            <a-input
              v-if="editable"
              v-decorator="[
                'policyNo',
                {
                  ...inputRequired,
                  initialValue: allFormData.policyNo
                }
              ]"
              placeholder="请输入"
            ></a-input>
            <div v-else>{{ allFormData.policyNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保费">
            <a-input
              v-if="editable"
              v-decorator="[
                'premium',
                {
                  ...inputRequired,
                  initialValue: allFormData.premium
                }
              ]"
              placeholder="请输入"
            ></a-input>
            <div v-else>{{ allFormData.premium }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="产品名称">
            <a-input
              v-if="editable"
              v-decorator="[
                'productName',
                {
                  ...inputRequired,
                  initialValue: allFormData.productName
                }
              ]"
              placeholder="请输入"
            ></a-input>
            <div v-else>{{ allFormData.productName }}</div>
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
            <a-input
              v-if="editable"
              v-decorator="[
                'name_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.name
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.name }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件类型">
            <a-select
              v-if="editable"
              v-decorator="[
                'idType_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.idType
                }
              ]"
            >
              <a-select-option
                v-for="(item, index) in idTypeCompanyOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.application.idType | filterIdTypeCompany(idTypeCompanyOptions) }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件号码">
            <a-input
              v-if="editable"
              v-decorator="[
                'idNo_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.idNo
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.idNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位证件有效止期">
            <a-date-picker
              placeholder="请选择"
              v-if="editable"
              v-decorator="[
                'idEndDate_application',
                {
                  initialValue: allFormData.application.idEndDate
                }
              ]"
            ></a-date-picker>
            <div v-else>{{ allFormData.application.idEndDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="员工总数">
            <a-input
              v-if="editable"
              v-decorator="[
                'empNum_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.empNum
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.empNum }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="经营范围">
            <a-input
              v-if="editable"
              v-decorator="[
                'bussinessScope_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.bussinessScope
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.bussinessScope }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="成立日期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'establishmentDate_application',
                {
                  initialValue: allFormData.application.establishmentDate
                }
              ]"
              placeholder="请选择"
            ></a-date-picker>
            <div v-else>{{ allFormData.application.establishmentDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位性质">
            <a-input
              v-if="editable"
              v-decorator="[
                'unitNatrue_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.unitNatrue
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.unitNatrue }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-row :gutter="8">
            <a-col :span="24">
              <a-form-item v-bind="formItemLayout" label="行业分类">
                <a-select
                  v-if="editable"
                  v-decorator="[
                    'bigType_application',
                    {
                      ...selectRequired,
                      initialValue: allFormData.application.bigType
                    }
                  ]"
                  placeholder="请选择"
                >
                  <a-select-option
                    v-for="(item, index) in industryOptions"
                    :key="index"
                    :value="item.value"
                    >{{ item.name }}</a-select-option
                  >
                </a-select>
                <div v-else>{{ allFormData.application.bigType | filterIndustry(industryOptions) }}</div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="社会保险登记号">
            <a-input
              v-if="editable"
              v-decorator="[
                'socialInsuranceNo_application',
                {
                  initialValue: allFormData.application.socialInsuranceNo
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.socialInsuranceNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="单位联系电话">
            <a-input
              v-if="editable"
              v-decorator="[
                'unitPhone_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.unitPhone
                }
              ]"
            ></a-input>
            <div v-else>{{ allFormData.application.unitPhone }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="纳税人类别">
            <a-select
              v-if="editable"
              v-decorator="[
                'ratepayerType_application',
                {
                  initialValue: allFormData.application.ratepayerType
                }
              ]"
              placeholder="请选择纳税人类别"
            >
              <a-select-option
                v-for="(item, index) in taxpayerTypeOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.application.ratepayerType | filterTaxType(taxpayerTypeOptions) }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="省">
            <a-select
              v-if="editable"
              @change="handleProvinceChange"
              v-decorator="[
                'province_application',
                {
                  ...selectRequired,
                  initialValue: allFormData.application.province
                }
              ]"
              placeholder="请选择省"
            >
              <a-select-option
                v-for="item in provinceOptions"
                :key="item.id"
                :value="item.provinceCode"
                >{{ item.provinceName }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.application.provinceName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="市">
            <a-select
              v-if="editable"
              @change="handleCityChange"
              v-decorator="[
                'city_application',
                {
                  ...selectRequired,
                  initialValue: allFormData.application.city
                }
              ]"
              placeholder="请选择市"
            >
              <a-select-option
                v-for="item in cityOptions"
                :key="item.id"
                :value="item.cityCode"
                >{{ item.cityName }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.application.cityName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="区/县">
            <a-select
              v-if="editable"
              v-decorator="[
                'area_application',
                {
                  ...selectRequired,
                  initialValue: allFormData.application.area
                }
              ]"
              placeholder="请选择区/县"
            >
              <a-select-option
                v-for="item in areaOptions"
                :key="item.id"
                :value="item.districtCode"
                >{{ item.districtName }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.application.areaName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="详细地址">
            <a-input
              v-if="editable"
              v-decorator="[
                'detailAddress_application',
                {
                  ...inputRequired,
                  initialValue: allFormData.application.detailAddress
                }
              ]"
              placeholder="请输入详细地址"
            >
            </a-input>
            <div v-else>{{ allFormData.application.detailAddress }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>法人信息</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input
              v-if="editable"
              v-decorator="[
                'name_legal',
                {
                  initialValue: allFormData.legal.name
                }
              ]"
              placeholder="请输入签名"
            >
            </a-input>
            <div v-else>{{ allFormData.legal.name }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select
              v-if="editable"
              v-decorator="[
                'idType_legal',
                {
                  initialValue: allFormData.legal.idType
                }
              ]"
              placeholder="请选择证件类型"
            >
              <a-select-option
                v-for="(item, index) in idTypeOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.legal.idType | filterIdType(idTypeOptions) }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件号码">
            <a-input
              v-if="editable"
              v-decorator="[
                'idNo_legal',
                {
                  initialValue: allFormData.legal.idNo
                }
              ]"
              placeholder="请选择证件号码"
            >
            </a-input>
            <div v-else>{{ allFormData.legal.idNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idStartDate_legal',
                {
                  initialValue: allFormData.legal.idStartDate
                }
              ]"
              placeholder="请选择证件有效起期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.legal.idStartDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idEndDate_legal',
                {
                  initialValue: allFormData.legal.idEndDate
                }
              ]"
              placeholder="请选择证件有效止期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.legal.idEndDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="法人联系地址">
            <a-input
              v-if="editable"
              v-decorator="[
                'address_legal',
                {
                  initialValue: allFormData.legal.address
                }
              ]"
              placeholder="请选择联系地址"
            >
            </a-input>
            <div v-else>{{ allFormData.legal.address }}</div>
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
            <a-input
              v-if="editable"
              v-decorator="[
                'name_likeman',
                {
                  initialValue: allFormData.likeman.name
                }
              ]"
              placeholder="请输入姓名"
            >
            </a-input>
            <div v-else>{{ allFormData.likeman.name }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="电话">
            <a-input
              v-if="editable"
              v-decorator="[
                'phone_likeman',
                {
                  initialValue: allFormData.likeman.phone
                }
              ]"
              placeholder="请输入电话"
            >
            </a-input>
            <div v-else>{{ allFormData.likeman.phone }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="E-MAIL">
            <a-input
              v-if="editable"
              v-decorator="[
                'email_likeman',
                {
                  initialValue: allFormData.likeman.email
                }
              ]"
              placeholder="请输入E-MAIL"
            >
            </a-input>
            <div v-else>{{ allFormData.likeman.email }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select
              v-if="editable"
              v-decorator="[
                'idType_likeman',
                {
                  initialValue: allFormData.likeman.idType
                }
              ]"
              placeholder="请输入证件类型"
            >
              <a-select-option
                v-for="(item, index) in idTypeOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.likeman.idType | filterIdType(idTypeOptions) }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件号码">
            <a-input
              v-if="editable"
              v-decorator="[
                'idNo_likeman',
                {
                  initialValue: allFormData.likeman.idNo
                }
              ]"
              placeholder="请选择证件号码"
            >
            </a-input>
            <div v-else>{{ allFormData.likeman.idNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idStartDate_likeman',
                {
                  initialValue: allFormData.likeman.idStartDate
                }
              ]"
              placeholder="请选择证件有效起期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.likeman.idStartDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idEndDate_likeman',
                {
                  initialValue: allFormData.likeman.idEndDate
                }
              ]"
              placeholder="请选择证件有效止期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.likeman.idEndDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="地址">
            <a-input
              v-if="editable"
              v-decorator="[
                'address_likeman',
                {
                  initialValue: allFormData.likeman.address
                }
              ]"
              placeholder="请选择联系地址"
            >
            </a-input>
            <div v-else>{{ allFormData.likeman.address }}</div>
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
            <a-input
              v-if="editable"
              v-decorator="[
                'bankName_bankInfo',
                {
                  ...inputRequired,
                  initialValue: allFormData.bankInfo.bankName
                }
              ]"
              placeholder="请输入开户银行"
            >
            </a-input>
            <div v-else>{{ allFormData.bankInfo.bankName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户行所在省">
            <a-select
              v-if="editable"
              @change="handleBAProvinceChange"
              v-decorator="[
                'province_bankInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择开户行所在省'
                    }
                  ],
                  initialValue: allFormData.bankInfo.province
                }
              ]"
              placeholder="请选择开户行所在省"
            >
              <a-select-option
                v-for="item in provinceOptions"
                :key="item.provinceCode"
                :value="item.provinceCode"
                >{{ item.provinceName }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.bankInfo.provinceName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户行所在市">
            <a-select
              v-if="editable"
              v-decorator="[
                'city_bankInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择开户行所在市'
                    }
                  ],
                  initialValue: allFormData.bankInfo.city
                }
              ]"
              placeholder="请选择开户行所在市"
            >
              <a-select-option
                v-for="item in cityBAOptions"
                :key="item.cityCode"
                :value="item.cityCode"
                >{{ item.cityName }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.bankInfo.cityName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户名">
            <a-input
              v-if="editable"
              v-decorator="[
                'accountName_bankInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入开户名'
                    }
                  ],
                  initialValue: allFormData.bankInfo.accountName
                }
              ]"
              placeholder="请输入开户名"
            >
            </a-input>
            <div v-else>{{ allFormData.bankInfo.accountName }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="银行账号">
            <a-input
              v-if="editable"
              v-decorator="[
                'accountNo_bankInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入银行账号'
                    }
                  ],
                  initialValue: allFormData.bankInfo.accountNo
                }
              ]"
              placeholder="请输入银行账号"
            >
            </a-input>
            <div v-else>{{ allFormData.bankInfo.accountNo }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="付款方式">
            <a-select
              v-if="editable"
              v-decorator="[
                'payMent_bankInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择付款方式'
                    }
                  ],
                  initialValue: allFormData.bankInfo.payMent
                }
              ]"
              placeholder="请选择付款方式"
            >
              <a-select-option
                v-for="(item, index) in payTypeOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.bankInfo.payMent | filterPayType(payTypeOptions) }}</div>
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
            <a-input
              v-if="editable"
              v-decorator="[
                'name_receiptor',
                {
                  initialValue: allFormData.receiptor.name
                }
              ]"
              placeholder="请输入姓名"
            >
            </a-input>
            <div v-else>{{ allFormData.receiptor.name }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件类型">
            <a-select
              v-if="editable"
              v-decorator="[
                'idType_receiptor',
                {
                  initialValue: allFormData.receiptor.idType
                }
              ]"
              placeholder="请选择证件类型"
            >
              <a-select-option
                v-for="(item, index) in idTypeOptions"
                :key="index"
                :value="item.value"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <div v-else>{{ allFormData.receiptor.idType | filterIdType(idTypeOptions) }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idStartDate_receiptor',
                {
                  initialValue: allFormData.receiptor.idStartDate
                }
              ]"
              placeholder="请选择证件有效起期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.receiptor.idStartDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="证件有效止期">
            <a-date-picker
              v-if="editable"
              v-decorator="[
                'idEndDate_receiptor',
                {
                  initialValue: allFormData.receiptor.idEndDate
                }
              ]"
              placeholder="请选择证件有效止期"
            >
            </a-date-picker>
            <div v-else>{{ allFormData.receiptor.idEndDate }}</div>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="联系地址">
            <a-input
              v-if="editable"
              v-decorator="[
                'address_receiptor',
                {
                  initialValue: allFormData.receiptor.address
                }
              ]"
              placeholder="请输入联系地址"
            >
            </a-input>
            <div v-else>{{ allFormData.receiptor.address }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>请选择保障计划</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col v-if="editable" :span="12">
          <a-form-item v-bind="formItemLayout" label="被保险人类型">
            <a-radio-group
              @change="e => (insurceType = e.target.value)"
              v-decorator="[
                'insurceType',
                {
                  initialValue: insurceType
                }
              ]"
            >
              <a-radio value="1">
                员工
              </a-radio>
              <a-radio value="2">
                子女及家属
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col v-if="editable && !update_order" :span="12">
          <a-form-item
            v-if="insurceType == 1"
            v-bind="formItemLayout"
            label="意外伤害(员工必填)"
          >
            <a-input
              v-decorator="[
                'customSpecialAmount',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择保额'
                    }
                  ]
                }
              ]"
              placeholder="请选择保额"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col offset="4" :span="16">
          <a-button
            v-if="editable"
            @click="showPlanModal"
            style="margin-bottom: 16px;"
            type="primary"
            ghost
            >新增“{{
              insurceType == "1" ? "员工其他的" : "子女及家属"
            }}”的责任类型</a-button
          >
          <a-table
            style="margin-bottom: 32px;"
            :pagination="false"
            :dataSource="planDataValid"
            :columns="planColumns"
          >
            <template slot="type" slot-scope="text">
              {{ text == 1 ? "员工" : "子女及家属" }}
            </template>
            <template
              v-if="editable"
              slot="operation"
              slot-scope="text, record, index"
            >
              <a-button @click="editPlan(record, index)" type="primary" ghost
                ><a-icon type="edit"></a-icon>编辑</a-button
              >
              <a-button
                style="margin-left: 8px;"
                @click="deletePlan(record, index)"
                type="primary"
                ghost
                ><a-icon type="delete"></a-icon>删除</a-button
              >
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>被保人员清单</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col offset="4" :span="20">
          <a-button
            v-if="editable"
            @click="showBModal"
            style="margin-bottom: 16px;"
            type="primary"
            ghost
            >新增被保人</a-button
          >
          <a-button v-if="editable" style="margin-left: 16px;" type="primary" ghost><a target="_blank" href="/api/file/temp.xlsx">下载模版</a></a-button>
          <a-upload v-if="editable" style="margin-left: 16px;" accept=".xlsl,.xlsx" name="file" :multiple="false" action="/api/backstage/policy/getInsurceListFromFile" @change="handleExcelUploadChange">
            <a-button>
              <a-icon type="upload" /> 模版批量上传
            </a-button>
          </a-upload>
          <a-table
            :pagination="false"
            :dataSource="insuredDataValid"
            :columns="insuredColumns"
          >
            <template slot="idType" slot-scope="text">
              {{ text | filterIdType(idTypeOptions) }}
            </template>
            <template slot="sex" slot-scope="text">
              {{ text | filterSex }}
            </template>
            <template
              v-for="col in ['socialsecurity', 'isMain']"
              :slot="col"
              slot-scope="text"
            >
              {{ text | filterState }}
            </template>
            <template
              v-if="editable"
              slot="operation"
              slot-scope="text, record, index"
            >
            <a-row :gutter="8">
              <a-col :xxl="12" :span="24">
                <a-button style="margin-bottom: 8px;" @click="editBbr(record, index)" type="primary"
                  ><a-icon type="edit"></a-icon>编辑</a-button
                >
              </a-col>
              <a-col :xxl="12" :span="24">
                <a-button
                  @click="deleteBbr(record, index)"
                  type="primary"
                  ghost
                  ><a-icon type="delete"></a-icon>删除</a-button
                >
              </a-col>
            </a-row>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>上传文件</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col offset="4" :span="6">
          <a-upload
            action="/api/common/upload"
            listType="picture-card"
            :fileList="fileList"
            @preview="handleImagePreview"
            @change="handleImagePreviewChange"
            :remove="handleFileRemove"
            :showUploadList="showUploadList"
          >
            <div v-if="fileList.length < 3 && editable">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-col>
      </a-row>
      <a-row style="margin-top: 56px;">
        <a-col v-if="editable" :push="4" :span="6">
          <a-button html-type="submit" type="primary"
            ><a-icon type="save"></a-icon>保存</a-button
          >
          <a-button
            @click="forwardToList"
            style="margin-left: 16px;"
            type="primary"
            ghost
            ><a-icon type="cancel"></a-icon>取消</a-button
          >
        </a-col>
        <a-col v-else :push="4" :span="6">
          <a-button @click="forwardToList" type="primary">返回</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal
      :footer="null"
      @cancel="handleCancel"
      :visible="planVisible"
      :title="planRecord.key !== undefined ? '编辑责任类型' : '新建责任类型'"
    >
      <a-form :form="planForm" @submit="handlePlanSubmit">
        <a-form-item label="责任名称">
          <a-input
            v-decorator="[
              'planName',
              {
                initialValue: planRecord.planName,
                rules: [
                  {
                    required: true,
                    message: '请输入责任名称'
                  }
                ]
              }
            ]"
            placeholder="请输入责任名称"
          >
            <!-- <a-select-option v-for="(item,index) in dutyOptions" :key="index" :value="index">{{item.planName}}</a-select-option> -->
          </a-input>
        </a-form-item>
        <a-form-item label="保额(元)">
          <a-input
            v-decorator="[
              'coverage',
              {
                initialValue: planRecord.coverage,
                rules: [
                  {
                    required: true,
                    message: '请输入保额(元)'
                  }
                ]
              }
            ]"
            placeholder="请输入保额(元)"
          >
            <!-- <a-select-option v-for="(item,index) in planAmountOptions" :key="index" :value="index">{{item.value}}</a-select-option> -->
          </a-input>
        </a-form-item>
        <a-form-item label="免赔额">
          <a-input
            v-decorator="[
              'deductibleExcess',
              {
                initialValue: planRecord.deductibleExcess,
              }
            ]"
            placeholder="请输入免赔额"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="赔付比率">
          <a-input
            v-decorator="[
              'lossRation',
              {
                initialValue: planRecord.lossRation,
              }
            ]"
            placeholder="请输入赔付比率"
          >
          </a-input>
        </a-form-item>
        <a-row>
          <a-col :span="24">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button
              @click="handleCancel"
              style="margin-left: 16px;"
              type="primary"
              ghost
              >取消</a-button
            >
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      :footer="null"
      @cancel="handleBModalCancel"
      :visible="bModalVisible"
      :title="insuredRecord.key !== undefined ? '编辑被保人' : '新增被保人'"
    >
      <a-form :form="bForm" @submit="handleBSubmit">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item label="姓名">
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: insuredRecord.name,
                    rules: [
                      {
                        required: true,
                        message: '请输入'
                      }
                    ]
                  }
                ]"
                placeholder="请输入"
              >
                <!-- <a-select-option v-for="(item,index) in dutyOptions" :key="index" :value="index">{{item.planName}}</a-select-option> -->
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件类型">
              <a-select
                v-decorator="[
                  'idType',
                  {
                    initialValue: insuredRecord.idType,
                    rules: [
                      {
                        required: true,
                        message: '请选择'
                      }
                    ]
                  }
                ]"
                placeholder="请选择"
              >
                <a-select-option
                  v-for="(item, index) in idTypeOptions"
                  :key="index"
                  :value="item.value"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件号码">
              <a-input
                v-decorator="[
                  'idNo',
                  {
                    initialValue: insuredRecord.idNo,
                    rules: [
                      {
                        required: true,
                        message: '请输入'
                      }
                    ]
                  }
                ]"
                placeholder="请输入"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="出生日期">
              <a-date-picker
                v-decorator="[
                  'birthDate',
                  {
                    ...selectRequired,
                    initialValue: insuredRecord.birthDate
                  }
                ]"
                placeholder="请选择"
              >
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="性别">
              <a-radio-group
                v-decorator="[
                  'sex',
                  {
                    ...selectRequired,
                    initialValue: insuredRecord.sex
                  }
                ]"
                placeholder="请选择"
              >
                <a-radio value="M">男</a-radio>
                <a-radio value="F">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="有无社保">
              <a-radio-group
                v-decorator="[
                  'socialsecurity',
                  {
                    ...selectRequired,
                    initialValue: insuredRecord.socialsecurity
                  }
                ]"
                placeholder="请选择"
              >
                <a-radio value="Y">有</a-radio>
                <a-radio value="N">无</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职业类别">
              <a-input
                v-decorator="[
                  'occType',
                  {
                    ...inputRequired,
                    initialValue: insuredRecord.occType
                  }
                ]"
                placeholder="请输入"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="承保职业">
              <a-input
                v-decorator="[
                  'underwirdeOccupational',
                  {
                    ...inputRequired,
                    initialValue: insuredRecord.underwirdeOccupational
                  }
                ]"
                placeholder="请输入"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="工号">
              <a-input
                v-decorator="[
                  'empNo',
                  {
                    initialValue: insuredRecord.empNo
                  }
                ]"
                placeholder="请输入(选填)"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否主被保人">
              <a-radio-group
                @change="e => (isMain = e.target.value)"
                v-decorator="[
                  'isMain',
                  {
                    ...selectRequired,
                    initialValue: insuredRecord.isMain
                  }
                ]"
                placeholder="请选择"
              >
                <a-radio value="Y">是</a-radio>
                <a-radio value="N">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <template v-if="isMain == 'N'">
            <a-col :span="12">
              <a-form-item label="主被保人姓名">
                <a-input
                  v-decorator="[
                    'mainName',
                    {
                      ...inputRequired,
                      initialValue: insuredRecord.mainName
                    }
                  ]"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="主被保人证件号码">
                <a-input
                  v-decorator="[
                    'mainIdNo',
                    {
                      ...inputRequired,
                      initialValue: insuredRecord.mainIdNo
                    }
                  ]"
                  placeholder="请输入"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="与主被保人关系">
                <a-radio-group
                  v-decorator="[
                    'relationship',
                    {
                      ...selectRequired,
                      initialValue: insuredRecord.relationship
                    }
                  ]"
                  placeholder="请选择"
                >
                  <a-radio value="1">配偶</a-radio>
                  <a-radio value="2">子女</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button
              @click="handleBModalCancel"
              style="margin-left: 16px;"
              type="primary"
              ghost
              >取消</a-button
            >
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleImagePreviewCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
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
import moment from "moment";
import dictOptions from "./dictOptions";
import api from "@/utils/api";

const planColumns = [
  {
    title: "被保险人类型",
    dataIndex: "insurceType",
    key: "insurceType",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "责任名称",
    dataIndex: "planName",
    key: "planName"
  },
  {
    title: "保额(元)",
    dataIndex: "coverage",
    key: "coverage"
  },
  {
    title: "免赔额",
    dataIndex: "deductibleExcess",
    key: "deductibleExcess"
  },
  {
    title: "赔付比率",
    dataIndex: "lossRation",
    key: "lossRation"
  },
  {
    title: "操作",
    key: "do",
    scopedSlots: { customRender: "operation" }
  }
];
const planData = [];

const insuredColumns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "证件类型",
    dataIndex: "idType",
    key: "idType",
    scopedSlots: { customRender: "idType" }
  },
  {
    title: "证件号码",
    dataIndex: "idNo",
    key: "idNo"
  },
  {
    title: "出生日期",
    dataIndex: "birthDate",
    key: "birthDate"
  },
  {
    title: "性别",
    dataIndex: "sex",
    key: "sex",
    scopedSlots: { customRender: "sex" }
  },
  {
    title: "有无社保",
    dataIndex: "socialsecurity",
    key: "socialsecurity",
    scopedSlots: { customRender: "socialsecurity" }
  },
  {
    title: "职业类别",
    dataIndex: "occType",
    key: "occType",
    scopedSlots: { customRender: "occType" }
  },
  {
    title: "承保职业",
    dataIndex: "underwirde_occupational",
    key: "underwirde_occupational"
  },
  {
    title: "是否主被保人",
    dataIndex: "isMain",
    key: "isMain",
    scopedSlots: { customRender: "isMain" }
  },
  {
    title: "操作",
    key: "do",
    scopedSlots: { customRender: "operation" }
  }
];
const insuredData = [];

export default {
  data() {
    return {
      showUploadList: {showPreviewIcon: true, showRemoveIcon: true},
      editable: true,
      update_order: false, // 是否是修改
      allFormData: {
        rangeDate: [moment(), moment().add(1, 'years')],
        application: {}, // 投保人信息
        bankInfo: {}, // 银行
        legal: {}, // 法人信息
        likeman: {}, // 联系人
        receiptor: {} // 收益人信息
      },
      insuredRecord: {},
      isMain: "1",
      insurceType: "1",
      provinceOptions: [], // 省字典
      cityOptions: [],
      cityBAOptions: [],
      areaOptions: [],
      industryOptions: dictOptions.industryOptions,
      idTypeOptions: dictOptions.idTypeOptions,
      idTypeCompanyOptions: dictOptions.idTypeCompanyOptions,
      payTypeOptions: dictOptions.payTypeOptions,
      taxpayerTypeOptions: dictOptions.taxpayerTypeOptions,
      previewVisible: false, // 图像上传
      previewImage: "",
      fileList: [],
      planRecord: {
        // 编辑责任信息
        planName: "",
        planValue: "",
        planAmountValue: "",
        planRateValue: ""
      },
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
      bModalVisible: false,
      insuredData,
      insuredColumns,
      planAbout: {
        0: [
          {
            planName: "意外医疗",
            options: [
              {
                value: "10万"
              }
            ]
          }
        ],
        1: [
          {
            planName: "门诊及住院",
            options: [
              {
                value: "10万"
              }
            ]
          }
        ]
      },
      dutyOptions: [], // 责任名称列表
      planAmountOptions: [], // 保额列表
      planVisible: false,
      planColumns,
      planData,
      planForm: this.$form.createForm(this),
      form: this.$form.createForm(this),
      bForm: this.$form.createForm(this),
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
      },
      rangesDate: {
        '一年': [moment(), moment().add(1, 'years')]
      }
    };
  },
  filters: {
    filterProvince (val) {
    },
    filterSex: val => {
      return val === "M" ? "男" : "女";
    },
    filterState: val => {
      return val === "Y" ? "是" : "否";
    },
    filterIdType: (val, idTypeOptions) => {
      if (!val) {
        return ''
      }
      return idTypeOptions[val].name;
    },
    filterIdTypeCompany: (val, idTypeCompanyOptions) => {
      if (val === undefined) {
        return ''
      }
      return idTypeCompanyOptions[val].name;
    },
    filterIndustry: (val, industryOptions) => {
      console.log(industryOptions, ' -> ', val)
      if (val === undefined) {
        return ''
      }
      return industryOptions[val].name
    },
    filterTaxType: (val, taxpayerTypeOptions) => {
      if (val === undefined) {
        return ''
      }
      return taxpayerTypeOptions[val].name
    },
    filterPayType: (val, payTypeOptions) => {
      if (val === undefined) {
        return ''
      }
      return payTypeOptions[val].name
    }
  },
  computed: {
    planDataValid () {
      return this.planData.filter((value) => {
        if (value.id) {
          return value.status == '1'
        }
        return true
      })
    },
    insuredDataValid () {
      return this.insuredData.filter((value) => {
        if (value.id) {
          return value.status == '1'
        }
        return true
      })
    }
  },
  beforeCreate(e) {
    console.log(e, this);
  },
  mounted() {
    let date = moment('2019-06-01')
    let { name, params } = this.$route;
    if (name === "bx_order_detail") {
      this.editable = false;
      this.showUploadList = {showPreviewIcon: true, showRemoveIcon: false};
    } else if (name === "bx_order_edit") {
      this.update_order = true;
    } else {
      this.add_order = true;
    }
    if (!this.add_order) {
      Promise.all([this.getAllProvinceCityArea(), this.fetchPolicyDetailById(params.id)]).then(() => {
        this.resolveProvinceCityArea()
      })
    } else {
      this.fetchProvince();
    }
  },
  methods: {
    moment,
    handleFileRemove (file) {
      console.log(file, 'handleFileRemove -> ')
      if (file.id) {
        this.removedFiles = this.removedFiles || []
        this.removedFiles.push({
          ...file,
          status: '0'
        })
      }
    },
    resolveProvinceCityArea () {
      let {provinceList, cityList, areaList} = this._allProvinceCityArea
      console.log('provinceList -> ', provinceList.findItem, provinceList.find, this.allFormData.application)
      // 详情展示用
      this.allFormData.application.provinceName = provinceList.find(val => {
        return val.provinceCode == this.allFormData.application.province
      }).provinceName

      this.allFormData.application.cityName = cityList.find(val => {
        return val.cityCode == this.allFormData.application.city
      }).cityName

      this.allFormData.application.areaName = areaList.find(val => {
        return val.districtCode == this.allFormData.application.area
      }).districtName

      this.allFormData.bankInfo.provinceName = provinceList.find(val => {
        return val.provinceCode == this.allFormData.bankInfo.province
      }).provinceName

      this.allFormData.bankInfo.cityName = cityList.find(val => {
        return val.cityCode == this.allFormData.bankInfo.city
      }).cityName
      // 列表数据 编辑时用
      this.cityOptions = cityList.filter(val => {
        return val.provinceCode == this.allFormData.application.province
      })
      this.areaOptions = areaList.filter(val => {
        return val.cityCode == this.allFormData.application.city
      })
      // 银行信息
      this.cityBAOptions = cityList.filter(val => {
        return val.provinceCode == this.allFormData.bankInfo.province
      })
      this._allProvinceCityArea = null;
    },
    getAllProvinceCityArea () {
      return api.getAllProvinceCityArea().then(res => res.data).then(data => {
        console.log('getAllProvinceCityArea -> ', data)
        this._allProvinceCityArea = data.content
        this.provinceOptions = data.content.provinceList
      })
    },
    handleExcelUploadChange (info) {
      if (info.file.response) {
        this.insuredData.push(...info.file.response)
      }
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    fetchPolicyDetailById(id) {
      return api
        .policyDetailById({
          id: parseInt(id)
        })
        .then(res => res.data)
        .then(data => {
          // application: {}, // 投保人信息
          // bankInfo: {}, // 银行
          // legal: {}, // 法人信息
          // likeman: {}, // 联系人
          // receiptor: {} // 收益人信息

          const { content } = data;
          let arr = [
            "application",
            "bankInfo",
            "legal",
            "likeman",
            "receiptor"
          ];
          for (let i = 0; i < arr.length; i++) {
            let key = arr[i];
            if (!content[key]) {
              content[key] = {};
            } else if (content[key] && this.update_order) {
              for (var ckey in content[key]) {
                let val = content[key][ckey]
                // 日期
                if (typeof val == 'string' && val.split('-').length > 2) {
                  content[key][ckey] = moment(val)
                }
              }
            }
          }
          this.planData = content.planList;
          this.insuredData = content.insureList;
          this.fileList = content.fileList.map((item, index) => {
            return {
              id: item.id,
              uid: index,
              name: item.name,
              url: item.url
            };
          });
          this.allFormData = {
            ...content,
            rangeDate: [moment(content.startDate), moment(content.endDate)]
          };
        });
    },
    fetchProvince() {
      return api
        .getAllProvince()
        .then(res => res.data)
        .then(data => {
          const { content } = data;
          this.provinceOptions = content;

        });
    },
    getCityByProvinceId(provinceCode) {
      return api
        .getCityByProvinceId({
          provinceCode
        })
        .then(res => res.data);
    },
    getAreaByCityCode(cityCode) {
      return api
        .getAreaByCityCode({
          cityCode
        })
        .then(res => res.data);
    },
    handleBAProvinceChange(code, option) {
      this.allFormData.application.city = null
      this.getCityByProvinceId(code).then(data => {
        this.cityBAOptions = data.content;
      });
    },
    insurceTypeChange(e) {
      console.log("insurceTypeChange -> ", e);
    },
    handleProvinceChange(code, option) {
      console.log("handleProvinceChange -> ", code);
      this.allFormData.application.city = null
      this.allFormData.application.area = null
      this.getCityByProvinceId(code).then(data => {
        this.cityOptions = data.content;
      });
    },
    handleCityChange(code, option) {
      console.log("handleCityChange -> ", code);
      this.allFormData.application.area = null
      this.getAreaByCityCode(code).then(data => {
        this.areaOptions = data.content;
      });
    },
    handleImagePreviewCancel() {
      this.previewVisible = false;
    },
    handleImagePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleImagePreviewChange({ fileList }) {
      this.fileList = fileList;
      console.log("handle upload change -> fileList -> ", fileList);
    },
    editBbr(record, index) {
      this.insuredRecord = {
        ...record,
        key: index,
        birthDate: moment(record.birthDate)
      };
      this.isMain = record.isMain
      // this.planForm.setFieldsValue(record)
      this.bModalVisible = true;
      console.log("editBbr -> ", record, index, this.insuredRecord);
    },
    editPlan(record, index) {
      this.planRecord = {
        ...record,
        key: index
      };
      // this.planForm.setFieldsValue(record)
      this.planVisible = true;
      console.log("editPlan -> ", record, index, this.planRecord);
    },
    deleteBbr(record, index) {
      console.log("deleteBbr -> ", record);
      let item = this.insuredData[index];
      this.insuredData.splice(index, 1);
      if (record.id) {
        item.status = '0'
        this.insuredData.push(item)
      }
    },
    deletePlan(record, index) {
      console.log("deletePlan -> ", record);
      let item = this.planData[index];
      this.planData.splice(index, 1);
      if (record.id) {
        item.status = '0'
        this.planData.push(item)
      }
    },
    handleBSubmit(e) {
      e.preventDefault();
      this.bForm.validateFields((err, values) => {
        if (!err) {
          if (this.insuredRecord.key !== undefined) {
            // 编辑
            let arr = [...this.insuredData];
            arr[this.insuredRecord.key] = {
              ...this.insuredRecord,
              ...values,
              birthDate: values.birthDate.format("YYYY-MM-DD"),
            };
            this.insuredData = arr;
          } else {
            this.insuredData.push({
              ...values,
              birthDate: values.birthDate.format("YYYY-MM-DD")
            });
          }
          console.log("handleBSubmit -> ", values, this.insuredData, this.insuredRecord);
          this.resetBForm()
          this.bModalVisible = false;
        }
      });
    },
    resetBForm () {
      this.insuredRecord = {};
      this.bForm.resetFields();
    },
    showBModal() {
      this.isMain = '1';
      this.bModalVisible = true;
    },
    handleBModalCancel() {
      this.resetBForm();
      this.bModalVisible = false;
    },
    changeDutyOption(value, option) {
      this.planAmountOptions = this.dutyOptions[value].options;
    },
    changeInsuredType(value, option) {
      this.dutyOptions = this.planAbout[value];
      console.log(value, option, "changeInsuredType -> ");
    },
    showPlanModal() {
      this.planVisible = true;
    },
    handleOk() {
      this.planVisible = false;
    },
    handleCancel() {
      this.planRecord = {};
      this.planVisible = false;
    },
    handlePlanSubmit(e) {
      e.preventDefault();
      this.planForm.validateFields((err, values) => {
        if (!err) {
          // const item = {
          //   insured_type: values.insured_type,
          //   planName: this.dutyOptions[values.planName].planName,
          //   planValue: this.planAmountOptions[values.planValue].value
          // }
          if (this.planRecord.key !== undefined) {
            // 正在编辑
            this.planData[this.planRecord.key] = {...this.planRecord, ...values};
            this.planData = [...this.planData];
            this.planRecord = {};
          } else {
            // 新增
            this.planData.push({
              ...values,
              insurceType: this.insurceType
            });
          }
          this.planVisible = false;
          console.log(
            "added item values -> ",
            this.planData,
            values,
            this.planRecord
          );
        }
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form values -> ", values);
          this.postData(values);
        } else {
          window.message.info('请填写相关必填项')
        }
      });
    },
    postData(values) {
      let planList = [
        ...this.planData
      ];
      if (!this.update_order) {
        planList.push(        {
          planName: "意外伤害",
          coverage: values.customSpecialAmount,
          insurceType: 1
        })
      }
      let fileList = [...this.fileList]
      fileList = fileList.map(value => {
        if (value.response) {
          return {
            name: value.name,
            url: value.response.url
          }
        }
        return value
      })
      if (this.removedFiles && this.removedFiles.length > 0) {
        fileList.push(...this.removedFiles)
      }
      let params = {
        startDate: values.rangeDate[0].format("YYYY-MM-DD"),
        endDate: values.rangeDate[1].format("YYYY-MM-DD"),
        insureList: this.insuredData,
        fileList,
        planList
      };
      const copyValues = { ...values };
      for (let key in copyValues) {
        if (key.indexOf("_") > -1) {
          let arr = key.split("_");
          let pre = arr[0];
          let objKey = arr[1];
          let val = copyValues[key];
          params[objKey] = params[objKey] || {};
          if (val instanceof moment) {
            val = val.format('YYYY-MM-DD')
          }
          params[objKey][pre] = val;
          if (this.allFormData[objKey] && this.allFormData[objKey]['id'] !== undefined) {
            params[objKey]['id'] = this.allFormData[objKey]['id'];
          }
        } else if (copyValues[key] && typeof copyValues[key] !== "object") {
          params[key] = copyValues[key];
        }
      }
      // for (var key in ['application', 'bankInfo']) {
      //     provinceOptions
      //     params[key]['provinceName'] = provinceOptions.filter(val => params[key]['province']
      //   if (key === 'application') {
      //     params[key]['cityName'] = params[key]['city']
      //     params[key]['areaName'] = params[key]['area']
      //   } else {
      //     params[key]['cityName'] = params[key]['city']
      //   }
      // }
      console.log("postData -> ", params);
      if (this.update_order) {
        params.id = this.$route.params.id;
        api
          .updatePolicy(params)
          .then(res => res.data)
          .then(data => {
            window.message.success("修改成功！准备跳转...");
            let st = setTimeout(() => {
              clearTimeout(st);
              this.forwardToList();
            }, 2000);
          });
        return;
      }
      params.companyId = this.$route.params.id;
      api
        .addPolicy(params)
        .then(res => res.data)
        .then(data => {
          window.message.success("保存成功！准备跳转...");
          let st = setTimeout(() => {
            clearTimeout(st);
            this.forwardToList();
          }, 2000);
        });
    },
    forwardToList() {
      this.$router.push("/bxOrder/list");
    }
  }
};
</script>
