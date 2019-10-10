import axios from "axios";
import qs from "qs";

var instance = axios.create({
  baseURL: "/api/",
  timeout: 13000,
  headers: { "X-Custom-Header": "foobar" }
});
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config, "sfdsdf");
    if (
      config.method.toLowerCase() === "post" &&
      config.data &&
      config.data.formEncode
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  if (status === 401) {
    window.notification.error({
      message: "未登录或登录已过期，请重新登录。"
    });
    return;
  }
  // if (error.response) {
  //   // 请求已发出，但服务器响应的状态码不在 2xx 范围内
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  // } else {
  //   // Something happened in setting up the request that triggered an Error
  //   console.log('Error', error.message);
  // }
  // console.log(error.config);
  if (!status) {
    return;
  }
  window.notification.error({
    message: `请求错误 ${status}: ${error.config.url}`,
    description: errortext
  });
  // environment should not be used
  if (status === 403) {
    // router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    // router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    // router.push('/exception/404');
  }
};
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log("response -> ", response);
    const { returnCode, returnMsg } = response.data;
    if (returnCode !== "0000") {
      if (returnCode === '1012') {
        window.router.push('/login')
      }else {
        window.message.error(returnMsg);
      }
      return Promise.reject(response);
    }
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      errorHandler(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    // window.router.push('/login');
    return Promise.reject(error);
  }
);

let api = {};
api.userLogin = function(data) {
  return instance.post("backstage/user/login/authority", data);
};
api.getRole = function(data) {
  return instance.post("/backstage/user/getRole", data);
};
api.getAllProvince = function() {
  return instance.get("/common/getAllProvince");
};
api.getCityByProvinceId = function(data) {
  return instance.get(`/common/getCityByProvinceCode?${qs.stringify(data)}`);
};
// 查询区
api.getAreaByCityCode = function(data) {
  return instance.get(`/common/getAreaByCityCode?${qs.stringify(data)}`);
};
api.getUserList = function(data) {
  return instance.post("/backstage/user/getUserList", data);
};
// 新增保单
api.addPolicy = function(data) {
  return instance.post("/backstage/policy/addPolicy", data);
};
api.updatePolicy = function(data) {
  return instance.post("/backstage/policy/updatePolicy", data);
};
// 保单列表
api.allPolicyList = function(data) {
  return instance.post(`/backstage/policy/allPolicy?${qs.stringify(data)}`);
};
// 保单详情
api.policyDetailById = function(data) {
  return instance.post(`/backstage/policy/policyDetailById`, data);
};
// 保险公司列表
api.companyList = function() {
  return instance.get("/backstage/policy/companyList");
};
// 退出登录
api.exitLogin = function(data) {
  return instance.post("/backstage/user/exit", data);
};
// 获取验证码 /backstage/user/getVerificationCode


// 查询系统资源列表
api.getResourceList = function(data) {
  return instance.post(`/backstage/resource/getResourceList?${qs.stringify(data)}`);
};
// 查询资源详情
api.getResourceById = function(data) {
  return instance.post("/backstage/resource/getResourceById", qs.stringify(data));
};
// 修改、删除资源详情
api.updateResource = function(data) {
  return instance.post("/backstage/resource/updateResource", qs.stringify(data));
};
// 新增资源详情
api.saveResource = function(data) {
  return instance.post("/backstage/resource/saveResource", qs.stringify(data));
};
// 查询用户资源菜单
api.getResourceByUserId = function(data) {
  return instance.post("/backstage/resource/getResourceByUserId", data);
};
// 查询层级结构菜单
api.getAllResource = function(data) {
  return instance.post("/backstage/roles/getResource", data);
};
api.cdkMonthProfit = function() {
  return instance.get("/sh/month/profit");
};

api.getWeixinQrcode = function(params) {
  let origin = "http://wbot.test.youlianhuan.com";
  if (window.location.href.indexOf("https") > -1) {
    origin = `https://youlianhuan.com`;
  }
  return instance.post(`${origin}/v1/wechat/getQrcode`, params);
};

// 单页商品列表
api.singleProductList = function(params) {
  let origin = process.env.VUE_APP_CDK_DEQ;
  return instance.get(
    `${origin}/v1/web/ts/mobile/single?sh_id=${params.sh_id}&type=${params.type}&page=${params.page}`
  );
};

// 单页商品链接
api.singleGoodsurl = function(params) {
  let origin = process.env.VUE_APP_CDK_DEQ;
  return instance.get(
    `${origin}/v1/web/ts/mobile/goods/uri?sh_id=${params.sh_id}&type=${params.type}&task_plan_id=${params.task_plan_id}`
  );
};

//新增用户
api.addUser = function(data) {
  return instance.post("backstage/user/saveUser", data);
};

//编辑用户
api.updateUser = function(data) {
  return instance.post("backstage/user/updateUser", data);
};

//查询用户列表
api.queryUser = function(data) {
  return instance.post("/backstage/user/getUserList", data);
};


//查询用户
api.getUser = function(data) {
  return instance.post("backstage/user/getUserById", qs.stringify(data))
}

//查询角色列表
api.getRoleList = function(data) {
  return instance.post("backstage/roles/getRolesList", qs.stringify(data))
}


//删除或更新角色
api.updateRole = function(data) {
  return instance.post("backstage/roles/updateRoles", qs.stringify(data))
}

//查询角色
api.getRole = function(data) {
  return instance.post("backstage/roles/getRolesById", qs.stringify(data))
}

//查询所有角色
api.getAllRole = function(data) {
  return instance.post("/backstage/user/getRole", qs.stringify(data))
}


//增加角色
api.addRole = function(data) {
  return instance.post("backstage/roles/saveRoles", qs.stringify(data))
}

//查询查询所有系统资源
api.getResource = function(data) {
  return instance.post("backstage/roles/getResource", qs.stringify(data))
};
// 批量上传联系人
// /backstage/policy/getInsurceListFromFile

//查询所有省市区
api.getAllProvinceCityArea = function() {
  return instance.get("common/getProvinceCityArea");
};

export default api;
