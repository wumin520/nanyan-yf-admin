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
            <a-range-picker v-decorator="[
              'rangeDate',
              selectRequired
            ]" :placeholder="['请选择开始时间', '请选择结束时间']"></a-range-picker>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保单号">
            <a-input v-decorator="[
              'bid',
              inputRequired
            ]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="保费">
            <a-input v-decorator="[
              'bf',
              inputRequired
            ]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="产品名称">
            <a-input v-decorator="[
              'productName',
              inputRequired
            ]" placeholder="请输入"></a-input>
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
            <a-select @change="handleProvinceChange" v-decorator="[
              'province',
              {
                rules: [{
                  required: true,
                  message: '请选择纳税人类别'
                }]
              }
            ]" placeholder="请选择省">
              <a-select-option v-for="item in provinceOptions" :key="item.id" :value="item.provinceCode">{{item.provinceName}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="市">
            <a-select @change="handleCityChange" v-decorator="[
              'city',
              {
                rules: [{
                  required: true,
                  message: '请选择市'
                }]
              }
            ]" placeholder="请选择市">
              <a-select-option v-for="item in cityOptions" :key="item.id" :value="item.cityCode">{{item.cityName}}</a-select-option>
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
              <a-select-option v-for="item in areaOptions" :key="item.id" :value="item.districtCode">{{item.districtName}}</a-select-option>
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
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input v-decorator="[
              'name_legal',
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
              'idType_legal',
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
            <a-input v-decorator="[
              'idNo_legal',
              {
                rules: [{
                  required: true,
                  message: '请选择证件号码'
                }]
              }
            ]" placeholder="请选择证件号码">
              
            </a-input>
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
            <a-input v-decorator="[
              'idNo_linkman',
              {
                rules: [{
                  required: true,
                  message: '请选择证件号码'
                }]
              }
            ]" placeholder="请选择证件号码">
              
            </a-input>
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
            <a-select v-decorator="[
              'province_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择开户行所在省'
                }]
              }
            ]" placeholder="请选择开户行所在省">

            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="开户行所在市">
            <a-select v-decorator="[
              'city_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请选择开户行所在市'
                }]
              }
            ]" placeholder="请选择开户行所在市">

            </a-select>
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
            <a-input v-decorator="[
              'accountName_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请输入开户名'
                }]
              }
            ]" placeholder="请输入开户名">
              
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="银行账号">
            <a-input v-decorator="[
              'accountNo_bankInfo',
              {
                rules: [{
                  required: true,
                  message: '请输入银行账号'
                }]
              }
            ]" placeholder="请输入银行账号">
              
            </a-input>
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
            <a-select v-decorator="[
              'idType_receiptor',
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
          <a-form-item v-bind="formItemLayout" label="证件有效起期">
            <a-date-picker v-decorator="[
              'idStartDate_receiptor',
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
              'idEndDate_receiptor',
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
          <a-form-item v-bind="formItemLayout" label="联系地址">
            <a-input v-decorator="[
              'address_receiptor',
              {
                rules: [{
                  required: true,
                  message: '请输入联系地址'
                }]
              }
            ]" placeholder="请输入联系地址">
              
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h2>请选择保障计划</h2>
          <a-divider></a-divider>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout" label="被保险人类型">
            <a-radio-group @change="e => insurceType=e.target.value" v-decorator="[
              'insurceType',
              {
                initialValue: insurceType
              }
            ]">
              <a-radio value="1">
                员工
              </a-radio>
              <a-radio value="2">
                子女及家属
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-if="insurceType==1" v-bind="formItemLayout" label="意外伤害(员工必填)">
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
        <a-col offset="4" :span="16">
          <a-button @click="showPlanModal" style="margin-bottom: 16px;" type="primary" ghost>新增“{{insurceType == '1' ? '员工其他的' : '子女及家属'}}”的责任类型</a-button>
          <a-table style="margin-bottom: 32px;" :pagination="false" :dataSource="planData" :columns="planColumns">
            <template slot="type" slot-scope="text">
              {{text == 1 ? '员工' : '子女及家属'}}
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <a-button @click="editPlan(record, index)" type="primary" ghost><a-icon type="edit"></a-icon>编辑</a-button>
              <a-button style="margin-left: 8px;" @click="deletePlan(record, index)" type="primary" ghost><a-icon type="delete"></a-icon>删除</a-button>
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
          <a-button @click="showBModal" style="margin-bottom: 16px;" type="primary" ghost>新增被保人</a-button>
          <a-table :pagination="false" :dataSource="insuredData" :columns="insuredColumns">
            <template slot="operation" slot-scope="text, record, index">
              <a-button @click="editBbr(record, index)" type="primary">编辑</a-button>
              <a-button style="margin-left: 8px;" @click="deleteBbr(record, index)" type="primary" ghost><a-icon type="delete"></a-icon>删除</a-button>
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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            :fileList="fileList"
            @preview="handleImagePreview"
            @change="handleImagePreviewChange"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-col>
      </a-row>
      <a-row style="margin-top: 56px;">
        <a-col :push="4" :span="6">
          <a-button html-type="submit" type="primary"><a-icon type="save"></a-icon>保存</a-button>
          <a-button style="margin-left: 16px;" type="primary" ghost><a-icon type="cancel"></a-icon>取消</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal :footer="null" @cancel="handleCancel" :visible="planVisible" title="新建责任类型">
      <a-form :form="planForm" @submit="handlePlanSubmit">
        <a-form-item label="责任名称">
          <a-input v-decorator="[
            'planName',
            {
              initialValue: planRecord.planName,
              rules: [{
                required: true,
                message: '请输入责任名称'
              }]
            }
          ]" placeholder="请输入责任名称">
            <!-- <a-select-option v-for="(item,index) in dutyOptions" :key="index" :value="index">{{item.planName}}</a-select-option> -->
          </a-input>
        </a-form-item>
        <a-form-item label="保额(元)">
          <a-input v-decorator="[
            'planValue',
            {
              initialValue: planRecord.planValue,
              rules: [{
                required: true,
                message: '请输入保额(元)'
              }]
            }
          ]" placeholder="请输入保额(元)">
            <!-- <a-select-option v-for="(item,index) in planAmountOptions" :key="index" :value="index">{{item.value}}</a-select-option> -->
          </a-input>
        </a-form-item>
        <a-form-item label="免赔额">
          <a-input v-decorator="[
            'planAmountValue',
            {
              initialValue: planRecord.planAmountValue,
              rules: [{
                required: true,
                message: '请输入免赔额'
              }]
            }
          ]" placeholder="请输入免赔额">
          </a-input>
        </a-form-item>
        <a-form-item label="赔付比例">
          <a-input v-decorator="[
            'planRateValue',
            {
              initialValue: planRecord.planRateValue,
              rules: [{
                required: true,
                message: '请输入赔付比例'
              }]
            }
          ]" placeholder="请输入赔付比例">
          </a-input>
        </a-form-item>
        <a-row>
          <a-col :span="24">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button @click="handleCancel" style="margin-left: 16px;" type="primary" ghost>取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal :footer="null" @cancel="handleBModalCancel" :visible="bModalVisible" title="新建被保人">
      <a-form :form="bForm" @submit="handleBSubmit">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item label="姓名">
              <a-input v-decorator="[
                'name',
                {
                  initialValue: insuredRecord.name,
                  rules: [{
                    required: true,
                    message: '请输入'
                  }]
                }
              ]" placeholder="请输入">
                <!-- <a-select-option v-for="(item,index) in dutyOptions" :key="index" :value="index">{{item.planName}}</a-select-option> -->
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件类型">
              <a-select v-decorator="[
                'idType',
                {
                  initialValue: insuredRecord.idType,
                  rules: [{
                    required: true,
                    message: '请选择'
                  }]
                }
              ]" placeholder="请选择">
                <a-select-option key="0" value="身份证">身份证</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="证件号码">
              <a-input v-decorator="[
                'idNo',
                {
                  initialValue: insuredRecord.idNo,
                  rules: [{
                    required: true,
                    message: '请输入'
                  }]
                }
              ]" placeholder="请输入">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="出生日期">
              <a-date-picker v-decorator="[
                'birthDate',
                {
                  ...selectRequired,
                  initialValue: insuredRecord.birthDate,
                }
              ]" placeholder="请选择">
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="性别">
              <a-radio-group v-decorator="[
                'sex',
                {
                  ...selectRequired,
                  initialValue: insuredRecord.sex
                }
              ]" placeholder="请选择">
                <a-radio value="男">男</a-radio>
                <a-radio value="女">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="有无社保">
              <a-radio-group v-decorator="[
                'socialsecurity',
                { 
                  selectRequired,
                  initialValue: insuredRecord.socialsecurity
                }
              ]" placeholder="请选择">
                <a-radio value="有">有</a-radio>
                <a-radio value="无">无</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职业类别">
              <a-input v-decorator="[
                'occType',
                { 
                  selectRequired,
                  initialValue: insuredRecord.occType
                }
              ]" placeholder="请输入">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="承保职业">
              <a-input v-decorator="[
                'underwirde_occupational',
                {
                  inputRequired,
                  initialValue: insuredRecord.underwirde_occupational
                }
              ]" placeholder="请输入">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否主被保人">
              <a-radio-group @change="e => isMain = e.target.value" v-decorator="[
                'isMain',
                { 
                  selectRequired,
                  initialValue: insuredRecord.isMain
                }
              ]" placeholder="请选择">
                <a-radio value="是">是</a-radio>
                <a-radio value="否">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <template v-if="isMain==0">
          <a-col :span="12">
            <a-form-item label="主被保人姓名">
              <a-input v-decorator="[
                'mainName',
                {
                  inputRequired, 
                  initialValue: insuredRecord.mainName
                }
              ]" placeholder="请输入">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="主被保人证件号码">
              <a-input v-decorator="[
                'mainIdNo',
                {
                  inputRequired, 
                  initialValue: insuredRecord.mainIdNo
                }
              ]" placeholder="请输入">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="与主被保人关系">
              <a-radio-group v-decorator="[
                'relationship',
                {
                  selectRequired, 
                  initialValue: insuredRecord.relationship
                }
              ]" placeholder="请选择">
                <a-radio value="1">员工</a-radio>
                <a-radio value="2">子女及家属</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-button html-type="submit" type="primary">保存</a-button>
            <a-button @click="handleBModalCancel" style="margin-left: 16px;" type="primary" ghost>取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleImagePreviewCancel">
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
import moment from 'moment';

const planColumns = [{
  title: '被保险人类型',
  dataIndex: 'insurceType',
  key: 'insurceType',
  scopedSlots: { customRender: 'type' }
}, {
  title: '责任名称',
  dataIndex: 'planName',
  key: 'planName'
}, {
  title: '保额(元)',
  dataIndex: 'planValue',
  key: 'planValue'
}, {
  title: '免赔额',
  dataIndex: 'planValue1',
  key: 'planValue1'
}, {
  title: '赔付比率',
  dataIndex: 'planValue2',
  key: 'planValue2'
}, {
  title: '操作',
  key: 'do',
  scopedSlots: { customRender: 'operation' }
}];
const planData = [{
  insurceType: 1,
  planName: '意外医疗',
  planValue: '1万'
}, {
  insurceType: 2,
  planName: '住院医疗',
  planValue: '2万'
}];

const insuredColumns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '证件类型',
  dataIndex: 'idType',
  key: 'idType'
}, {
  title: '证件号码',
  dataIndex: 'idNo',
  key: 'idNo'
}, {
  title: '出生日期',
  dataIndex: 'birthDate',
  key: 'birthDate'
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex'
}, {
  title: '有无社保',
  dataIndex: 'socialsecurity',
  key: 'socialsecurity'
}, {
  title: '职业类别',
  dataIndex: 'occType',
  key: 'occType'
}, {
  title: '承保职业',
  dataIndex: 'underwirde_occupational',
  key: 'underwirde_occupational'
}, {
  title: '是否主被保人',
  dataIndex: 'isMain',
  key: 'isMain'
}, {
  title: '操作',
  key: 'do',
  scopedSlots: { customRender: 'operation' }
}];
const insuredData = [{
		"name": "张三",
		"idType": "身份证",
		"idNo": "234234234",
		"birthDate": "2019-02-12",
		"sex": "男",
		"socialsecurity": "有",
		"occType": "金融",
		"underwirde_occupational": "金融",
		"isMain": "是"
}];

export default {
  data () {
    return {
      insuredRecord: {},
      isMain: '1',
      insurceType: '1',
      provinceOptions: [{ // 字典相关
        "id": 1,
        "provinceName": "北京市",
        "provinceCode": "110000"
      }], // 省字典
      cityOptions: [{
        "id": 1,
		    "cityName": "合肥市",
		    "cityCode": "340100",
		    "provinceCode": "110000"
      }],
      areaOptions: [{
        id: 1,
        districtName: "颖州区",
        districtCode: "340100",
        cityCode: "340000"
      }],
      companyIdTypeOptions: [{
        name: '工商营业执照',
        value: ''
      }, {
        name: '税务登记证',
        value: ''
      }, {
        name: '组织机构代码证',
        value: ''
      }, {
        name: '其他',
        value: ''
      }],
      industryOptions: [{
        
      }],
      previewVisible: false, // 图像上传
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      planRecord: { // 编辑责任信息
        planName: '',
        planValue: '',
        planAmountValue: '',
        planRateValue: ''
      },
      selectRequired: {
        rules: [{
          required: true,
          message: '请选择'
        }]
      },
      inputRequired: {
        rules: [{
          required: true,
          message: '请输入'
        }]
      },
      bModalVisible: false,
      insuredData,
      insuredColumns,
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
    }
  },
  methods: {
    changeYiWai (e) {
      console.log(e, 'changeYiWai -> ')
      if (this._custom_yiwaist) {
        return
      }
      this._custom_yiwaist = setTimeout(() => {
        this.planData.push({
          planName: '意外伤害',
          planValue: e.target.value,
          planAmountValue: '',
          planAmountValue: ''
        })
        clearTimeout(this._custom_yiwaist)
        this._custom_yiwaist = null
      }, 1000);
    },
    insurceTypeChange (e) {
      console.log('insurceTypeChange -> ', e)
    },
    handleProvinceChange (item) {
      console.log('handleProvinceChange -> ', item)
    },
    handleCityChange (item) {
      console.log('handleCityChange -> ', item)
    },
    handleImagePreviewCancel () {
      this.previewVisible = false
    },
    handleImagePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleImagePreviewChange ({ fileList }) {
      this.fileList = fileList
    },
    editBbr (record, index) {
      this.insuredRecord = {
        ...record,
        key: index,
        birthDate: moment(record.birthDate)
      }
      // this.planForm.setFieldsValue(record)
      this.bModalVisible = true
      console.log('editBbr -> ', record, index, this.insuredRecord)
    },
    editPlan (record, index) {
      this.planRecord = {
        ...record,
        key: index
      }
      // this.planForm.setFieldsValue(record)
      this.planVisible = true
      console.log('editPlan -> ', record, index, this.planRecord)
    },
    deleteBbr (record, index) {
      this.insuredData.splice(index, 1)
      console.log('deleteBbr -> ', record)
    },
    deletePlan (record, index) {
      console.log('deletePlan -> ', record)
      this.planData.splice(index, 1)
    },
    handleBSubmit (e) {
      e.preventDefault();
      this.bForm.validateFields((err, values) => {
        if (!err) {
          console.log('handleBSubmit -> ', values)
          if (this.insuredRecord.key !== undefined) {
            // 编辑
            let arr = [...this.insuredData]
            arr[this.insuredRecord.key] = {
              ...values,
              birthDate: values.birthDate.format('YYYY-MM-DD')
            }
            this.insuredData = arr
            this.insuredRecord = {}
            this.bForm.resetFields()
          } else {
            this.insuredData.push({
              ...values,
              birthDate: values.birthDate.format('YYYY-MM-DD')
            })
          }
          this.bModalVisible = false
          console.log(this.insuredRecord, '12 -> ')
        }
      })
    },
    showBModal () {
      this.bModalVisible = true
    },
    handleBModalCancel () {
      this.bModalVisible = false
    },
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
          // const item = {
          //   insured_type: values.insured_type,
          //   planName: this.dutyOptions[values.planName].planName,
          //   planValue: this.planAmountOptions[values.planValue].value
          // }
          if (this.planRecord.key !== undefined) {
            // 正在编辑
            this.planData[this.planRecord.key] = values
            this.planData = [...this.planData]
            this.planRecord = {}
          } else {
            // 新增
            this.planData.push({
              ...values,
              insurceType: this.insurceType
            })
          }
          this.planVisible = false
          console.log('added item values -> ', this.planData, values, this.planRecord)
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
