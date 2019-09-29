export default {
  industryOptions: [
    {
      name: "农、林、牧、渔业",
      value: ""
    },
    {
      name: "采矿业",
      value: ""
    }
  ],
  idTypeOptions: [
    {
      name: "身份证",
      value: '0',
    },
    {
      name: "护照",
      value: '1',
    },
    {
      name: "其他",
      value: '2',
    }
  ],
  idTypeCompanyOptions: [
    {
      name: "工商营业执照",
      value: '0',
    },
    {
      name: "税务登记证",
      value: '1',
    },
    {
      name: "组织机构代码证",
      value: '2',
    },
    {
      name: '其他',
      value: '3'
    }
  ]
};

// 单位证件类型：统一社会信用代码、税务登记证、纳税识别号，调用友接口自动填充证件号码
