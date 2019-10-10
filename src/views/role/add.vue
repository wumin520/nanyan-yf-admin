<template>
  <div class="page_">
    <a-row>
      <a-col :span="16">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item label="角色名称" v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'roleName',
                {
                  initialValue: initialList.roleName,
                  rules: [
                    {
                      required: true,
                      message: '请输入角色名称'
                    }
                  ]
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="角色编码" v-bind="formItemLayout">
            <a-input
              v-decorator="[
                'roleCode',
                {
                  initialValue: initialList.roleCode,
                  rules: [
                    {
                      required: true,
                      message: '请输入角色编码'
                    }
                  ]
                }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="权限分配" v-bind="formItemLayout">
            <a-tree
              checkable
              @expand="onExpand"
              v-model="checkedKeys"
              @select="onSelect"
              :selectedKeys="selectedKeys"
              :treeData="treeData"
            />
          </a-form-item>
          <a-row>
            <a-col :push="3" :span="24">
              <a-button type="primary" html-type="submit"
                ><a-icon type="save"></a-icon>保存</a-button
              >
              <router-link style="margin-left: 16px;" to="/role/list">
                <a-button type="primary" ghost
                  ><a-icon type="cancel" />取消</a-button
                >
              </router-link>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="scss" scoped>
.page_ {
}
</style>
<script>
import api from '@/utils/api';
import { transformMenuData } from '@/utils/authorized'
const treeData = [
  // {
  //   title: "用户管理",
  //   key: "5",
  //   children: [
  //     {
  //       title: "查询",
  //       key: "8"
  //     },
  //     {
  //       title: "新增",
  //       key: "9"
  //     },
      
  //     {
  //       title: "修改",
  //       key: "10"
  //     },
  //     {
  //       title: "删除",
  //       key: "0-0-3"
  //     }
  //   ]
  // },
  // {
  //   title: "角色管理",
  //   key: "6",
  //   children: [
  //     {
  //       title: "查询",
  //       key: "11"
  //     },
  //     {
  //       title: "新增",
  //       key: "12"
  //     },
      
  //     {
  //       title: "修改",
  //       key: "13"
  //     },
  //     {
  //       title: "删除",
  //       key: "0-1-3"
  //     }
  //   ]
  // },
  // {
  //   title: "菜单管理",
  //   key: "7",
  //   children: [
  //     {
  //       title: "查询",
  //       key: "14"
  //     },
  //     {
  //       title: "新增",
  //       key: "15"
  //     },
  //     {
  //       title: "删除",
  //       key: "16"
  //     },
  //     {
  //       title: "修改",
  //       key: "17"
  //     }
  //   ]
  // },
  // {
  //   title: "保单管理",
  //   key: "0-3",
  //   children: [
  //     {
  //       title: "新增",
  //       key: "0-3-0"
  //     },
  //     {
  //       title: "查询",
  //       key: "0-3-1"
  //     },
  //     {
  //       title: "修改",
  //       key: "0-3-2"
  //     },
  //     {
  //       title: "删除",
  //       key: "0-3-4"
  //     }
  //   ]
  // }
];
export default {
  data() {
    return {
      initialList:{
        roleName:'',
        roleCode:''
      },
      children:[],
      roleId: '', //编辑用的id
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 8 }
      }
    };
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },
  methods: {
        del(arr,num) {
            var l=arr.length;
            for (var i = 0; i < l; i++) {
                if (arr[0]!==num) { 
                    arr.push(arr[0]);
                }
                arr.shift(arr[0]);
            }
            return arr;
        },
    handleSubmit(e) {
      e.preventDefault();
      if(this.roleId === undefined){
        this.addRoles()  //新增角色
      } else {
        this.updateRoles()  //更新角色
      }
    },
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      // this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    //新增角色
    addRoles() {    
       this.form.validateFields((err, values) => {
          if (!err) {
            // console.log("form values -> ", values);
            let data ={
              roleCode:	values.roleCode, //	用户名称
              roleName:	values.roleName, //	用户账号
              status:	1,//	1,有效，2,无效
              resourceIdList:	this.checkedKeys.join()//	资源id集合
            }
            api.addRole(data).then((res) => {
              if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.$message.info("保存成功");
              this.$router.push({name:'role'})
            }
            }).catch((err) => {
              this.$message.info("网络异常")
            })
          }
        });
    },
    //更新角色
    updateRoles() {    
       this.form.validateFields((err, values) => {
          if (!err) {
            // console.log("form values -> ", values);
            let data ={
              id: this.roleId,
              roleCode:	values.roleCode, //	用户名称
              roleName:	values.roleName, //	用户账号
              status:	1,//	1,有效，2,无效
              resourceIdList:	this.checkedKeys.join()//	资源id集合
            }
            api.updateRole(data).then((res) => {
              if(res.data.returnCode !== "0000"){
              this.$message.info(res.data.returnMsg);
            } else{
              this.$message.info("保存成功");
              this.$router.push({name:'role'})
            }
            }).catch((err) => {
              this.$message.info("网络异常")
            })
          }
        });
    },
    //获取权限树
    getResourceTree() {  
      this.treeData = []     
      return api.getResource().then((res) => {
        this.treeData = transformMenuData(res.data.content)
      })
    },
    //通过id查询用户角色
    getRoleById() {
       api.getRole({id:this.$route.params.id}).then((res) => {
          this.checkedKeys = res.data.content.resourceIdList.split(",")
          this.initialList.roleName = res.data.content.roleName
          this.initialList.roleCode = res.data.content.roleCode
          // api.getResourceByUserId({id:this.$route.params.id}).then((res) => {
          //   res.data.content.forEach(item => {
          //     this.del(roleList,item.id.toString())
          //   })
          //   // console.log("hhh",this.checkedKeys)
          // this.checkedKeys = roleList
          // })
       })
    }
  },
  created() {
    this.roleId = this.$route.params.id
    // console.log(this.roleId !==  undefined)
    if(this.roleId !== undefined){
        this.getResourceTree().then(() => {
          this.getRoleById()
        })
    } else {
        this.getResourceTree()
    }
  }
};
</script>
