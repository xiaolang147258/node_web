(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb5c537c"],{a1f7:function(t,e,a){},c32c:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"100%"}},[a("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"box-card",staticStyle:{padding:"0",margin:"20px","padding-bottom":"20px"}},[a("div",{staticStyle:{width:"100%","margin-bottom":"10px",float:"left"}},[a("el-select",{staticClass:"tab_c",attrs:{clearable:"",placeholder:"请选择类型"},on:{change:function(e){return t.git_act(1)}},model:{value:t.lei_val,callback:function(e){t.lei_val=e},expression:"lei_val"}},t._l(t.lei_box,function(t,e){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1),t._v(" "),a("el-select",{staticClass:"tab_c",attrs:{clearable:"",placeholder:"请选择等级"},on:{change:function(e){return t.git_act(1)}},model:{value:t.deng_val,callback:function(e){t.deng_val=e},expression:"deng_val"}},t._l(t.deng_box,function(t,e){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1),t._v(" "),a("div",{staticClass:"inp_a"},[a("el-input",{attrs:{placeholder:"请输入商品名称",clearable:""},on:{change:function(e){return t.git_act(1)}},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),a("el-button",{staticClass:"tab_c",attrs:{type:"primary"},on:{click:function(e){return t.git_act(1)}}},[t._v("搜索")]),t._v(" "),a("el-button",{staticStyle:{float:"right","margin-right":"10px"},attrs:{type:"primary"},on:{click:function(e){return t.course_create_put("")}}},[t._v("添加商品")])],1),t._v(" "),a("div",{staticStyle:{width:"100%",float:"left"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData3,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"",align:"center","header-align":"center",label:"商品头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("el-image",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t.row.img_title,fit:"cover"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",align:"center","header-align":"center",label:"商品名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"region_name",align:"center","header-align":"center",label:"下架 / 上架"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:function(a){return t.sx(e.row)}},model:{value:2==e.row.type,callback:function(a){t.$set(e.row,"type==2?true:false",a)},expression:"scope.row.type==2?true:false"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"region_name",align:"center","header-align":"center",label:"普通 / 精选"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-color":"#e6a23c","inactive-color":"#909399"},on:{change:function(a){return t.pj(e.row)}},model:{value:2==e.row.jin_num,callback:function(a){t.$set(e.row,"jin_num==2?true:false",a)},expression:"scope.row.jin_num==2?true:false"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",align:"center","header-align":"center",label:"软件大小"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticStyle:{color:"red","font-weight":"600"}},[t._v(t._s(e.row.size))]),t._v("m")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",align:"center","header-align":"center",label:"商品类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(1==e.row.type_lei?"软件":"游戏"))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center","header-align":"center",label:"图片介绍"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-image",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t.img_box(e.row.img_box)[0],"preview-src-list":t.img_box(e.row.img_box)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",align:"center","header-align":"center",label:"下载地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",round:""},on:{click:function(a){return t.select_url(e.row)}}},[t._v("获取")])]}}])}),t._v(" "),a("el-table-column",{staticClass:"tds",attrs:{prop:"message",align:"center","header-align":"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",plain:""},on:{click:function(a){return t.course_create_put(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",plain:""},on:{click:function(a){return t.delect(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:"下载地址",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("p",{staticClass:"ps",staticStyle:{"text-align":"center",width:"100%"}},[t._v(t._s(t.url_xia))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("div",{staticStyle:{float:"right","margin-right":"10px"}},[a("el-pagination",{attrs:{background:"","page-sizes":[15],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total_01},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1)])],1)},o=[],l=(a("c5f6"),a("a481"),a("28a5"),a("653a")),i=(a("1157"),{computed:{img_box:function(){return function(t){return t.split(",")}}},data:function(){return{show_meng:!1,total_01:0,title:"",lei_val:"",lei_box:[{name:"软件",id:"1"},{name:"游戏",id:"2"}],deng_val:"",deng_box:[{name:"普通",id:"1"},{name:"精选",id:"2"}],masg_val:"",tableData3:[],multipleSelection:[],xiang_value:"",xiang_ly:"",xiang_date:"",loading:!1,pages:1,url_xia:"",dialogVisible:!1}},methods:{delect:function(t){var e=this;this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"error"}).then(function(){var a={id:t.id};e.$axios({method:"post",url:l["a"].state.url_data+"/shang_delete",data:a,headers:{Authorization:"Bater "+localStorage.login_token}}).then(function(t){console.log(t.data,"数据"),200==t.data.code&&e.git_act(e.pages)}).catch(function(t){t.response&&console.log(t.response)})}).catch(function(){})},sx:function(t){var e=this;console.log(t.type);var a={type:2==t.type?1:2,id:t.id};this.$axios({method:"post",url:l["a"].state.url_data+"/shang_sx",data:a,headers:{Authorization:"Bater "+localStorage.login_token}}).then(function(t){console.log(t.data,"数据"),200==t.data.code&&window.setTimeout(function(){e.git_act(e.pages)},200)}).catch(function(t){t.response&&console.log(t.response)})},pj:function(t){var e=this;console.log(t.jin_num);var a={jin_num:2==t.jin_num?1:2,id:t.id};this.$axios({method:"post",url:l["a"].state.url_data+"/shang_pj",data:a,headers:{Authorization:"Bater "+localStorage.login_token}}).then(function(t){console.log(t.data,"数据"),200==t.data.code&&window.setTimeout(function(){e.git_act(e.pages)},200)}).catch(function(t){t.response&&console.log(t.response)})},select_url:function(t){var e=this;this.$axios({method:"post",url:l["a"].state.url_data+"/select_url",data:{shang_id:t.id},headers:{Authorization:"Bater "+localStorage.login_token}}).then(function(t){console.log(t.data,"数据"),200==t.data.code&&e.$copyText(t.data.data).then(function(t){console.log(t),e.$message({message:"下载地址已复制到粘贴板！",type:"success"})},function(t){e.$notify({title:"警告",message:"复制失败",type:"warning"})})}).catch(function(t){t.response})},course_create_put:function(t){l["a"].state.shang_put_box=t,this.$router.push({path:"/add_course"})},handleSizeChange:function(t){console.log("每页 ".concat(t," 条"))},handleCurrentChange:function(t){this.pages=t,this.git_act(t)},git_act:function(t){var e=this;this.loading=!0,this.$axios({method:"post",url:l["a"].state.url_data+"/select_shang",data:{pageSize:15,pageNo:t,type_lei:this.lei_val,jin_num:this.deng_val,title:this.title,loactoken:"31f7f2bf38a6d2a754a36a2b34c76736",LOGIN:"38a6d2a4a36a2b34c767IA99",JFUGH:"SDWDEAa6d2a754a36a2b34c76799",URNFG:"ASWa6d2a754a36a2b34c7672IA99",loactoken_ID:"ASDA23578A38a6d2a754a36a2b34c76799"},headers:{Authorization:"Bater "+localStorage.login_token}}).then(function(t){if(console.log(t.data,"数据"),e.loading=!1,200==t.data.code){e.tableData3=t.data.data;var a=t.data.act.replace('{"count(*)":',"");e.total_01=Number(a.replace("}","")),console.log(e.total_01)}}).catch(function(t){e.loading=!1,t.response&&(console.log(t.response),403==t.response.status&&(e.$notify({title:"警告",message:"账号异常请重新登录",type:"warning"}),e.$router.push("/login")))})}},mounted:function(){this.git_act(1)}}),c=i,r=(a("e9a4"),a("2877")),s=Object(r["a"])(c,n,o,!1,null,"208176dd",null);e["default"]=s.exports},e9a4:function(t,e,a){"use strict";var n=a("a1f7"),o=a.n(n);o.a}}]);