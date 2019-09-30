export default {
  // 行业分类
  industryOptions: [
    {
      name: "农、林、牧、渔业",
      value: "0"
    },
    {
      name: "采矿业",
      value: "1"
    }
  ], // 个人证件类型
  idTypeOptions: [
    {
      name: "身份证",
      value: "0"
    },
    {
      name: "护照",
      value: "1"
    },
    {
      name: "其他",
      value: "2"
    }
  ], // 公司证件类型
  idTypeCompanyOptions: [
    {
      name: "工商营业执照",
      value: "0"
    },
    {
      name: "税务登记证",
      value: "1"
    },
    {
      name: "组织机构代码证",
      value: "2"
    },
    {
      name: "其他",
      value: "3"
    }
  ], // 支付类型
  payTypeOptions: [
    {
      name: "直付保司",
      value: "0"
    },
    {
      name: "宇泰代收",
      value: "1"
    }
  ], // 纳税人类别
  taxpayerTypeOptions: [
    {
      name: "一般纳税人",
      value: "0"
    },
    {
      name: "小规模纳税人",
      value: "1"
    }
  ]
};

// 单位证件类型：统一社会信用代码、税务登记证、纳税识别号，调用友接口自动填充证件号码
