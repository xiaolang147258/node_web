<template>
	<!-- 会员列表 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            
			<el-select class='tab_c' @change='git_act(1)' v-model="select.number" clearable placeholder="筛选賬戶类型">
			   <el-option v-for="(item,index) in number_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='git_act(1)' v-model="select.fs_number" clearable placeholder="筛选账户状态">
			   <el-option v-for="(item,index) in fs_number_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input @change='git_act(1)' placeholder="请输入账号" v-model="select.name" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			 <el-button @click='drawer = true' style='float:right;margin-right:10px;' type="primary">创建账号</el-button>
		</div>
		
   <div style="width:100%;float: left;" >
	<el-table :data="tableData3" :row-class-name="tableRowClassName" style="width: 100%">
		<el-table-column prop="" align='center' header-align='center' label="账户级别" >
			<template slot-scope="scope">{{vip(scope.row)}}{{datetime_c(scope.row.vip_date)?' - ('+datetime_c(scope.row.vip_date)+')':''}}</template>
		</el-table-column>
	    <el-table-column prop="name" align='center' header-align='center' label="账号" ></el-table-column>
		<el-table-column prop="name" align='center' header-align='center' label="账号状态" >
		   <template slot-scope="scope">
			<i v-if="datetime_c(scope.row.fs_date)" class="el-icon-error" style="color:#f56c6c ;font-size: 25px;"></i>
			<i v-else class="el-icon-success" style="color:#42b983;font-size:25px;" ></i>
		   </template>
		</el-table-column>
		<el-table-column prop="name" align='center' header-align='center' label="限制时间" >
		       <template slot-scope="scope">
				   {{datetime_c(scope.row.fs_date)?datetime_c(scope.row.fs_date):0}}
			   </template>
		</el-table-column>
		<el-table-column prop="message" class='tds' align='center' header-align='center' label="创建时间" >
		     <template slot-scope="scope">{{date_fil(scope.row.date)}}</template>
		</el-table-column>
		<el-table-column  label="操作" align='center' header-align='center'>
				   <template slot-scope="scope">
					   <el-dropdown  @command="handleCommand" @visible-change='item_box = scope.row'>
					     <el-button type="success"> 操作菜单<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
					     <el-dropdown-menu slot="dropdown">
					       <el-dropdown-item icon="el-icon-upload2" command="a">账户升级</el-dropdown-item>
					       <el-dropdown-item icon="el-icon-error" command="b">封禁账户</el-dropdown-item>
						   <el-dropdown-item icon="el-icon-remove" :disabled='datetime_c(item_box.fs_date)?false:true' command="e">解封账户</el-dropdown-item>
					       <el-dropdown-item icon="el-icon-edit-outline" command="c">修改密码</el-dropdown-item>
					       <el-dropdown-item icon="el-icon-delete-solid" command="d">删除账户</el-dropdown-item>
					     </el-dropdown-menu>
					   </el-dropdown>
		           </template>
		</el-table-column>
     </el-table>
  <div style="margin-top: 20px;">
       
<!-- 分页插件 :current-page="currentPage4" > -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="[15]"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total_01">
       </el-pagination>
	  </div>
    </div>
	 
	 <el-drawer
	   title="创建账户"
	   :visible.sync="drawer"
	   :direction="direction"
	   :before-close="handleClose">
	   <div style="width: 100%;padding:0 40px;height: 40px;margin-top: 100px;padding-left: 20%;">
		 <el-input style="width: 250px;" type='number' oninput="if(value.length > 11)value = value.slice(0, 11)" placeholder="请输入账号" v-model="user_box.name" clearable></el-input>
		 <el-input style="width: 250px;margin-left: 10px;" oninput="if(value.length > 11)value = value.slice(0, 11)" placeholder="请输入密码" v-model="user_box.password" clearable></el-input>
		 <el-input style="width: 250px;margin-left: 10px;" oninput="if(value.length > 11)value = value.slice(0, 11)" placeholder="请再次输入密码" v-model="user_box.to_password" clearable></el-input>
		 <el-button @click='create_user' style='margin-left: 10px;' type="primary">创建账号</el-button>
	   </div>
	 </el-drawer>
	 
  <!-- 升级账户 -->
	 <el-dialog title="升级账户" :visible.sync="dialogFormVisible" width='30%'>
	   <el-form >
	     <el-form-item label="账户级别 :" label-width="200">
	              <el-select class='tab_c' v-model="lx_val" clearable placeholder="请选择类型">
	                 <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
	              </el-select>
	     </el-form-item>
	     <el-form-item label="账户时长 :" label-width="200">
	              <el-select class='tab_c' v-model="date_val" clearable placeholder="请选择时长">
	                 <el-option v-for="(item,index) in date_box" :key="index" :label="item.name" :value="item.id"></el-option>
	              </el-select>
	     </el-form-item>
	   </el-form>
	   <div slot="footer" class="dialog-footer">
	     <el-button @click="dialogFormVisible = false">取 消</el-button>
	     <el-button type="primary" @click="update_top">确 定</el-button>
	   </div>
	 </el-dialog>
	 
<!-- 封禁对话框 -->	 
     <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
         <el-form >
           <el-form-item label="封禁时长 :" label-width="200">
                    <el-select class='tab_c' v-model="date_val_fs" clearable placeholder="请选择时长">
                       <el-option v-for="(item,index) in date_box_fs" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
           </el-form-item>
         </el-form> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="fs_update">确 定</el-button>
        </span>
     </el-dialog>

  </div>
  </el-card>
</div>
</template>
<style scope>
	/* 动态绑定颜色 */
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  
  .el-table .error {
    background: #E4E7ED;
  }
  
</style>
<script>
	import store from "../../vuex/store.js";
     export default {
	  
	  computed:{//计算属性
		  vip(){
			  return function(index){//传参的用法
			    return index.number==0?'普通':(index.number==1?'会员':'管理员')
			  }     
		  },
		   add0() {//数字小于10在前面加一个0
			   return function(m){return m < 10 ? '0' + m : m}
		  },
		  //计算传参时间距离当前时间的差
		  datetime_c(){
			  return function(index){//传参的用法
			     var diff = '',time_diff = new Date(index).getTime() - new Date().getTime();//时间差的毫秒数 
			     var days = Math.ceil(time_diff / (24 * 3600 * 1000)); //计算出相差天数 
			     if (days > 0) {diff = days + '天'};return diff;
			  }
		  },
		  date_fil(){//时间拼接
			  return function(index){
				  return new Date(index).getFullYear()+' / '+this.add0((new Date(index).getMonth()+1))+' / '+this.add0(new Date(index).getDate())+' / '+this.add0(new Date(index).getHours())+' : '+this.add0(new Date(index).getMinutes());
			  }
		  }
		  
	  },
	  data(){
	    return {
			
			select:{//條件賽選數據
				number:'',
				vip_date:'',
				fs_number:'',
				fs_date:'',
				name:'',
			},
			
			number_box:[{name:'普通用戶',id:0},{name:'会员用戶',id:1},{name:'管理员用戶',id:2}],
			fs_number_box:[{name:'正常',id:0},{name:'封號',id:1}],
			
			dialogVisible:false,
			date_val_fs:'',
			date_val:'',
			date_box:[{name:'一个月',id:30},{name:'三个月',id:90},{name:'一年',id:365}],
			date_box_fs:[{name:'一天',id:1},{name:'七天',id:7},{name:'一个月',id:30},{name:'一年',id:365}],
			dialogFormVisible:false,
			item_box:'',
			user_box:{
				type_id:0,
				name:'',
				password:'',
				to_password:'',
				login_token:'',
			},
			visible: false,
			drawer: false,
			direction: 'ttb',
			
		   show_meng:false,
		   total_01:0,//分页-总条数
	       
		   lx_box:[{name:'会员账户',id:1},{name:'管理员账户',id:2}],
		   lx_id:'',//类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		    
		   tableData3:[],//列表数据
			  
           multipleSelection: [],
		   
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
		   loading:false,
		   pages:1,
	    }
	  },

	  methods:{
		    tableRowClassName({row, rowIndex}) {
				if(this.datetime_c(row.fs_date)){
				  return 'error';
				}else{
					if (row.number == 1) {
		              return 'warning-row';
		            } else if (row.number == 2) {
		              return 'success-row';
		            }
				}
		            return '';
		    },
			
		    handleCommand(command) {//操作菜单栏
					console.log(this.item_box);
					if(command=='a'){//升级账户
						this.dialogFormVisible = true;
					}else if(command=='b'){//封禁账户
						this.dialogVisible = true;
					}else if(command=='c'){//修改密码
						this.$prompt('请输入密码', '提示', {confirmButtonText: '确定',cancelButtonText: '取消',inputPattern: /^\d{6,11}$/,inputErrorMessage: '密码长度必须为6-11个字符'
						        }).then(({ value }) => {
						            this.$axios({method:'post',url:store.state.url_data+'/update_xiu',data:{password:value,id:this.item_box.id}}).then(res=>{
						                 console.log(res.data,'修改结果');if(res.data.code==200){this.$message({ type: 'success', message: '修改成功!'});}
						            }).catch(error=> {console.log(error.response);});
						        }).catch(() => {});
					}else if(command=='d'){//删除账户
						this.delect(this.item_box);
					}else if(command=='e'){//解封
						this.$confirm('确定要对'+this.item_box.name+'执行解封?','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).then(()=>{
							    let das = {id:this.item_box.id};
								this.$axios({method:'post',url:store.state.url_data+'/update_fs_off',data:das}).then(res=>{
										 console.log(res.data,'解封');
										if(res.data.code==200){
											window.setTimeout(()=>{this.git_act(this.pages)},200)
											this.$message({ type: 'success', message: '解封成功!'});
										 }
								}).catch(error=>{console.log(error.response);})}).catch(() => {});
					}
		        },
				
		  fs_update(){//封禁账户
			  this.$axios({method:'post',url:store.state.url_data+'/update_fs',data:{fs_date:this.date_val_fs,id:this.item_box.id}}).then(res=>{
			       console.log(res.data,'修改结果');
			  				   if(res.data.code==200){
			  					   window.setTimeout(()=>{this.git_act(this.pages)},200)
			  					   this.$message({ type: 'success', message: '成功封禁!'});
			  					   this.dialogVisible = false;
			  				   }
			  }).catch(error=> {console.log(error.response);});
		  },
			 
		  update_top(){//升级账户
			  this.$axios({method:'post',url:store.state.url_data+'/update_top',data:{number:this.lx_val,vip_date:this.date_val,id:this.item_box.id}}).then(res=>{
			       console.log(res.data,'修改结果');
				   if(res.data.code==200){
					   window.setTimeout(()=>{this.git_act(this.pages)},200)
					   this.$message({ type: 'success', message: '升级成功!'});
					   this.dialogFormVisible = false;
				   }
			  }).catch(error=> {console.log(error.response);});
		  },
		  
		  delect(i){//删除账户
			  this.$confirm('此操作将永久删除'+i.name+', 是否继续?', '提示', {
			            confirmButtonText: '确定',
			            cancelButtonText: '取消',
			            type: 'error'
			    }).then(() => {
					let das = {};das.id = i.id;das.login_token = localStorage.login_token;
					this.$axios({method:'post',url:store.state.url_data+'/delect',data:das}).then(res=>{
					                   console.log(res.data,'删除');
					                   if(res.data.code==200){
										    window.setTimeout(()=>{this.git_act(this.pages)},200)
											this.$message({ type: 'success', message: '删除成功!'});
						  			   }
					}).catch(error=>{
									  if (error.response) {console.log(error.response);
									     if(error.response.status==403){this.$notify({title: '警告',message: '账号异常请重新登录',type: 'warning'});}
									   }else{this.$notify({title: '警告',message: '删除失败！',type: 'warning'});}});	
			    }).catch(() => {});
		  },
		  
		  create_user(){//创建账户
			  if(this.user_box.password==this.user_box.to_password){
				this.$axios({method:'post',url:store.state.url_data+'/create_name',data:this.user_box}).then(res=>{
				                  console.log(res.data,'新建结果');
				                   if(res.data.code==200){
									    window.setTimeout(()=>{this.git_act(this.pages)},200)
										this.drawer = false;
									    let user = this.user_box.type_id==0?'普通':(this.user_box.type_id==1?'会员':'管理员');
									    this.$notify({title: '创建成功',message: '已成功创建'+user+'账户',type: 'success'});
										this.handleClose();
					  			   }
				}).catch(error=> {
								  if (error.response) {
								     console.log(error.response);
								     if(error.response.status==403){
								  		 this.$notify({title: '警告',message: '账号异常请重新登录',type: 'warning'});
								  	 }
								   }else{
									     // this.$notify({title: '警告',message: '获取会员数据失败',type: 'warning'});
								   }
				});
			  }else{
				this.$notify({title: '错误',message: '两次输入的密码不同，请重新输入',type: 'warning'});return false;
			  }
		  },
		  
		  select_c(){
			  console.log(this.user_box)
		  },
		  
		  handleClose(done) {//创建账户下拉框 被关闭时 的回调函数
		      done();
			  this.user_box.name = '';this.user_box.password = '';this.user_box.to_password = '';
		  },
		  
		  
		//跳转添加||编辑页面
		course_create_put(id){
			sessionStorage.course_id = id;
			this.$router.push({path:'/add_course'});
		},
		  
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.pages = val;
		this.git_act(this.pages);
      },
	  
	  lx_cl(i){
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  
	//获取类型函数
	  // git_lx(){
		 //  this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',headers:{'Authorization':'Bearer '+localStorage.token}}
		 //     ).then(res=>{
		 //        console.log(res.data,'类型数据');
		 //       if(res.data.code==200){
			// 	   this.lx_box = res.data.data;
			//    }
		 //     }).catch(error=> {});
	  // },
	
	  
//获取列表数据函数
	  git_act(pages){
		      this.loading = true;
			  let data = {
				  pageSize:15,
				  pageNo:pages,
				  name:this.select.name,
				  number:this.select.number,
				  vip_date:this.select.vip_date,
				  fs_number:this.select.fs_number,
				  fs_date:this.select.fs_date,
				  loactoken:'31f7f2bf38a6d2a754a36a2b34c76736',
				  LOGIN:'38a6d2a4a36a2b34c767IA99',
				  JFUGH:'SDWDEAa6d2a754a36a2b34c76799',
				  URNFG:'ASWa6d2a754a36a2b34c7672IA99',
				  loactoken_ID:'ASDA23578A38a6d2a754a36a2b34c76799',
			  };
	  		  this.$axios({method:'post',url:store.state.url_data+'/select_id',data,headers:{'Authorization':'Bater '+localStorage.login_token}}).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   let to = res.data.act.replace('{"count(*)":','');
					   this.total_01 = Number(to.replace('}',''))
	  			   }else if(res.data.code==300){
					   this.$notify({title: '警告',message: '账号登录过期，请重新登录',type: 'warning'});
					   // window.location = 'http://localhost:8081/index'
				   }
	  		  }).catch(error=> {
				  this.loading = false;
				  if (error.response) {
				     console.log(error.response);
				     if(error.response.status==403){
				  		 this.$notify({title: '警告',message: '账号异常请重新登录',type: 'warning'});
				  	 }
				   }else{
					    //this.$notify({title: '警告',message: '获取会员数据失败',type: 'warning'});/
				   }
			  });
	  },
       
	  },
	  mounted(){
		this.user_box.login_token=localStorage.login_token;
		this.git_act(1);
		
		
		
	  }
	};
	
</script>
<style scoped="scoped">
	  .el-table .warning-row {
	      background: oldlace;
	    }
	  .el-table .success-row {
	    background: #4C566A;
	  }
	
	.ming{
		float:right;
		line-height: 30px;
		margin: 0;
		margin-right:40px;
	}
	.tit_val{
		width: 70%;
		margin: 30px auto;
		/* background: red; */
		text-align:justify;
		line-height: 30px;
		margin-bottom: 80px;
		margin-top: 60px;
	}
	.p_title{
		font-size: 15px;
		/* width: 100%; */
		margin: 0px 0 50px 40px;
		font-weight: 600;
	}
	.transition-box_child{
		width: 70%;
		height: 90%;
		margin: 2% auto;
		background: white;
		border-radius:5px;
		overflow:auto;
		padding-top:30px;
		
		
	}
	.transition-box{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
	}
	.tds{
		text-align: center;
	}
	.tab_c{
		float:left;margin-right:10px;
	}
	.inp_a{
		width: 200px;
		float: left;
		margin-right: 10px;
	}
</style>
