<template>
	<!-- 机构管理-->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<!-- <el-select class='tab_c'  @change='lx_cl' v-model="lx_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select> -->
			
			<el-select class='tab_c' @change='zt_cl' v-model="sh_val" clearable placeholder="请选择状态">
			    <el-option :label="'开启'" :value="'开启'"></el-option>
			    <el-option :label="'关闭'" :value="'关闭'"></el-option>
			</el-select>
			
			<el-select class='tab_c' style='width:150px;' v-model="cs_val" placeholder="请选择城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' style='width:150px;' @change='qy_click' v-model="qy_val" clearable placeholder="请选择区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' style='width:150px;' @change='jd_click' v-model="jd_val" clearable placeholder="请选择街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<el-button @click='create_act("","添加机构")' style='float: right;margin-right:35px;' type="primary" >添加机构</el-button>
			<div class='inp_a'><el-input placeholder="请输入机构名称" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
       <el-table-column prop="name" align='center' header-align='center' label="机构名称" ><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
       <el-table-column prop="address" align='center' header-align='center' label="地址" show-overflow-tooltip></el-table-column>
       <el-table-column prop="city_name" class='tds' align='center' header-align='center'  label="城市" ></el-table-column>
       <el-table-column prop="region_name" align='center' header-align='center' label="区域" ></el-table-column>
	   <el-table-column prop="street_name" class='tds' align='center' header-align='center'  label="街道" ></el-table-column>
	   <el-table-column prop="contact_name" align='center' header-align='center' label="联系人" ></el-table-column>
	   <el-table-column prop="contact_phone" class='tds' align='center' header-align='center'  label="手机号码" ></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope"><el-button  @click='create_act(scope.row.institution_id,"编辑机构")' type="primary" plain>编辑</el-button></template>
	   </el-table-column>
     </el-table>
  <div style="margin-top:20px;">
<!-- 分页插件 :current-page="currentPage4" -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="ye_s"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total_01">
       </el-pagination>
	  </div>
     </div>
	 
<!-- 查看详情弹窗 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
	 	  <transition name="el-fade-in-linear">
	         <div v-show="show_meng" class="transition-box">
	 		   <transition name="el-zoom-in-top">
	              <div v-show="show_meng" class="transition-box_child">
					  <p style="margin-left:20px;font-weight:600;">{{title_p}}</p>
					  
	 				  <div class="inp_boxs"><p>机构名称：</p><el-input style='width:450px;' v-model="input[0]" placeholder="请输入内容"></el-input></div>
					  
					   <div class="inp_boxs"><p>所在城市：</p>
					        <el-select style='width:450px;' class='tab_c'  @change='cs_click2' v-model="cs_val2" placeholder="请选择城市">
					           <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item"></el-option>
					        </el-select>
					   </div>
					   <div class="inp_boxs"><p>所在区域：</p>
					       <el-select style='width:450px;' class='tab_c' @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
					          <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
					       </el-select>
					  </div>
					  <div class="inp_boxs"><p>所在街道：</p>
					       <el-select style='width:450px;' class='tab_c' @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
					          <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
					       </el-select>
					  </div>
					  
					 <div class="inp_boxs"><p>机构地址：</p><el-input style='width:450px;' v-model="input[1]" placeholder="请输入内容"></el-input></div>  
					 
					 <!-- <div v-show="cre_ate_show" class="inp_boxs"><p>登录账号：</p><el-input @input='id_f_t=false' style='width:450px;' v-model="input[2]" placeholder="请输入内容"></el-input></div> -->
					 
					 <div v-show="cre_ate_show" class="inp_boxs"><p>手机号码：</p><el-input @input='id_f_t=false' style='width:450px;' v-model="input[5]" placeholder="请输入内容"></el-input></div>
					 
					 <div v-show="cre_ate_show" class="inp_boxs"><p>登录密码：</p><el-input @input='id_f_t=false' style='width:450px;' v-model="input[3]" placeholder="请输入内容"></el-input></div>
					 
					 <div class="inp_boxs" style="padding:0;margin: 20px auto;padding-right:15px;"><el-input style='width:450px;float:right;' v-model="input[4]" placeholder="请输入内容">
					 </el-input><p style="float:right;">联系人：</p></div>
					 
					 
					 
					<!-- <div class="inp_boxs"><p>分成比例：</p><el-input style='width:450px;' v-model="input[6]" placeholder="请输入内容"></el-input></div>-->
					 
					 <div class="inp_boxs" style="padding: 0;width: 100%;">
						 <div style="width:170px;height:40px;margin:0 auto;">
							   <el-button @click='show_meng=false' style='float:left;' type="danger">取消</el-button>
							   <el-button @click='create_act_fn' style='float:right;' type="primary">确认</el-button>
						 </div>
					  </div>
	 			  </div>
	            </transition>
	 		</div>
	       </transition>
<!-- 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 --> 
	 
  </div>
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
			currentPage4:1,
			cre_ate_show:true,
			
			ider:'',
			
			input:[],
			title_p:'添加机构',
			
			show_meng:false,
			
		   sh_val:'',
		 
		   sh_zt_id:'',
			
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
		   masg_val:'',//搜索输入框数据
		   
		   tableData3:[],//列表数据
		   
           multipleSelection: [],
		   
		   // 城市区域街道
		   cs_box:[],
		   qy_box:[],
		   jd_box:[],
		   
		   cs_val:'',
		   qy_val:'',
		   jd_val:'',
		   
		   cs_id:'',
		   qy_id:'',
		   jd_id:'',
		    // 城市区域街道2
		   cs_box2:[],
		   qy_box2:[],
		   jd_box2:[],
		   
		   cs_val2:'',
		   qy_val2:'',
		   jd_val2:'',
		   
		   cs_id2:'',
		   qy_id2:'',
		   jd_id2:'',
		   loading:true,
		   
		   id_f_t:false,//账号密码手机号验证
		   region_box:[],
		   region_box2:[],
	    }
	  },
	
	methods:{
		cs_click(i){
			this.cs_id2 = i.city_id;
			this.cs_val2 = i.city_name;
		},
		create_act(id,i){//打开添加编辑机构面板
			if(i=='添加机构'){
			  this.ider = '';
			  this.id_f_t = false;
			  this.cre_ate_show = true;
			  this.input = [];
			  
			}else if(i=='编辑机构'){
			  this.ider = '/'+id;
			  this.id_f_t = true; 
			  this.cre_ate_show = false;
			  this.git_act_c(id);
			}
			this.title_p = i
		    this.show_meng = true;	
		},
		
	   //获取机构详情函数
	   git_act_c(id){
		   this.$axios({method:'get',url:store.state.url_data+'/api/institutions/'+id,headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
		        console.log(res.data.data,'机构详情')
				if(res.data.code==200){
				  window.setTimeout(()=>{
					this.input = [];
					let datas = res.data.data;
		   		    this.input[0] =datas.name;
				    
					this.cs_id = datas.city_id
				    this.cs_val2=datas.city_name;
					this.qy_fn2()
						this.qy_val2=datas.region_name;
					    this.qy_id2=datas.region_id;
					this.jd_fn2()	
					  this.jd_val2=datas.street_name;
					  this.jd_id2=datas.street_id;
					  
					this.input[1] = datas.address;
					this.input[4] = datas.contact_name;  
				  },2000)
					
				//	this.input[6] = datas.ratio;
		   		}}).catch(error=> {});
	   },
	
		
//添加机构函数
		create_act_fn(){
			
			if(this.input[0]){}else{this.$message.error('机构名称不能为空！');return false;}
			if(this.input[1]){}else{this.$message.error('机构地址不能为空！');return false;}
			
		if(this.title_p=='添加机构'){
			// if(this.input[2]){}else{this.$message.error('登录账号不能为空！');return false;}
			
			if(this.input[5]){}else{this.$message.error('手机号码不能为空！');return false;}
			if(this.input[3]){}else{this.$message.error('登录密码不能为空！');return false;}
			if(this.input[5].length==11){}else{this.$message.error('手机号码必须为11位数！');return false;}
		}
			
			if(this.input[4]){}else{this.$message.error('联系人不能为空！');return false;}
		//	if(this.input[6]){}else{this.$message.error('分成比例不能为空！');return false;}
			
			if(this.id_f_t==false){
				this.id_psa_fn();
				return false;
			}
			
			let type =  this.title_p == '添加机构'?'post':'put';
			this.$axios({method:type,url:store.state.url_data+'/api/institutions'+this.ider,
			  data:{
				    name:this.input[0],
					city_id:this.cs_id+'',
					region_id:this.qy_id2+'',
					street_id:this.jd_id2+'',
					
					city_name:this.cs_val2,
					region_name:this.qy_val2,
					street_name:this.jd_val2,
					// account:this.input[5],
					password:this.input[3],
					contact_name:this.input[4],
					contact_phone:this.input[5],
				//	ratio:this.input[6],
					address:this.input[1],
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
				  console.log(res.data,'添加机构')
			     if(res.data.code==200){
					   this.$message({ message:'成功',type:'success'});
                       this.show_meng = false;
                       this.input = [];
					   this.git_act(this.currentPage4);
					}else if(res.data.code==407){
					    let box = res.data.data;let vals = '';
						for (var index in box){vals=box[index].join(' ')}  
						this.$alert(vals, '信息', { confirmButtonText: '确定',callback: action => {}})}
				}).catch(error=> {})
		},
//验证账号函数
		id_psa_fn(){
			 if(this.input[5]){}else{return false;};
			 this.$axios({method:'get',url:store.state.url_data+'/api/checkAccount',
			 params:{
				   // username:this.input[2],
				   password:this.input[3],
				   phone:this.input[5]
				},headers:{'Authorization':'Bearer '+localStorage.token},
				}).then(res=>{
				   console.log(res.data,'账号验证')
				if(res.data.code==200){
				   this.id_f_t = true; 
				   this.$alert('账号验证成功！', '提示!', { confirmButtonText: '确定',callback: action => {this.create_act_fn();}})
				}else if(res.data.code==407){
					let box = res.data.data;let vals = '';
					for (var index in box){vals=box[index].join(' ')}  
					this.$alert(vals, '验证失败！', { confirmButtonText: '确定',callback: action => {}})
				}
			   }).catch(error=> {
				   console.log(error,'错误信息');
				   this.$alert('账号或手机号已存在!', '验证失败！', { confirmButtonText: '确定',callback: action => {}})
			   });
		},
		
//城市区域街道函数
		cs_fn2(){//城市数据
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		        if(res.data.code==200){
				 let crs_box = store.state.crs_box;
				 this.cs_box2 = [];
				 for(var j in crs_box){
					  for (var i in res.data.data) {
					 	if(crs_box[j].city_id==res.data.data[i].city_id){
					 		this.cs_box2.push(res.data.data[i]);
							console.log(3)
					 	  }
					  };
				 }
				 this.cs_val2 = this.cs_box2[0].city_name;
				 this.cs_id2 = this.cs_box2[0].city_id;
				 this.qy_fn2();//获取区域数据
		   		}
		      }).catch(error=> {});
		},
		cs_click2(i){
			this.cs_val2 = i.city_name;
			this.cs_id2 = i.city_id;
			this.qy_fn2
		},
		//获取区域数据
		qy_fn2(){
		   
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:this.cs_id2},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
				console.log(res.data,'区域数据')
		        if(res.data.code==200){
					let crs_box = store.state.crs_box;
					if(crs_box[0].region==-1){
						this.qy_box2 = res.data.data;
						this.region_box2 = [];
					}else{
					   for(var j in crs_box){
						  if(this.cs_id2==crs_box[j].city_id){
							this.region_box2 = crs_box[j].region;
						  }
					   }
					   this.qy_box2 = [];
					   for(var j in this.region_box2){
						  for (var i in res.data.data){
							if(this.region_box2[j].region_id==res.data.data[i].region_id){
								this.qy_box2.push(res.data.data[i]);
								console.log(2222)
								
							}
						  }
					   }
					}
					this.qy_val2 = this.qy_box2[0].region_name;
					this.qy_id2 = this.qy_box2[0].region_id; 
					this.jd_fn2();
					
		   		}
		      }).catch(error=> {});
			  
		},
		//当区域选项被点击
		qy_click2(i){
			this.qy_val2 = i.region_name;
			this.qy_id2 = i.region_id; 
			this.jd_val2 = '';
			this.jd_box2 = [];
			this.jd_id2 = '';
			this.jd_fn2();//获取街道数据
		},
		//获取街道数据
		jd_fn2(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id2},headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  		console.log(res.data,'街道数据')
		       if(res.data.code==200){
				   let id = ''
				   for(var i in this.region_box2){
					   if(this.region_box2[i].region_id==this.qy_id2){
						   id=this.region_box2[i]
					   }
				   }
				   if(id.street==-1){
				   	  this.jd_box2 = res.data.data;
				   }else{
					  let street_box = '';
					  for(var j in this.region_box2){
						 if(this.region_box2[j].region_id==this.qy_id2){
							 street_box = this.region_box2[j].street;
						 }
					  };
					 this.jd_box2 = []
					 for(var j in street_box){
					   for (var i in res.data.data){
				   	  	 if(street_box[j].street_id==res.data.data[i].street_id){
				   	  		this.jd_box2.push(res.data.data[i]);
				   	  	 }
				   	   };
					 }
				   }
				   // this.jd_val2 = this.jd_box2[0].street_name;
				   // this.jd_id2 = this.jd_box2[0].street_id;
				   // this.git_jg()
				 
		  		}
		     }).catch(error=> {});
			 
		},
		//当街道选项被点击
		jd_click2(i){
			this.jd_val2 = i.street_name;
			this.jd_id2 = i.street_id;
			// this.git_jg()
		},
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		//城市区域街道函数
						cs_fn(){//城市数据
						   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
						      ).then(res=>{
						        if(res.data.code==200){
								 let crs_box = store.state.crs_box;
								 // let crs_box = this.crs_boxs;
								 this.cs_box = [];
								 for(var j in crs_box){
									  for (var i in res.data.data) {
									 	if(crs_box[j].city_id==res.data.data[i].city_id){
									 		this.cs_box.push(res.data.data[i]);
									 	  }
									  }; 
								 }
								 this.cs_val = this.cs_box[0].city_name;
								 this.cs_id = this.cs_box[0].city_id;
								 this.qy_fn();//获取区域数据
						   		}
						      }).catch(error=> {});
						},
						
						
						//获取区域数据
						qy_fn(){
						   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:this.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
						      ).then(res=>{
								console.log(res.data,'区域数据')
						        if(res.data.code==200){
									let crs_box = store.state.crs_box;
									// let crs_box = this.crs_boxs;
									console.log(res.data.data,'111111111111111111111111111111')
									if(crs_box[0].region==-1){
										this.qy_box = res.data.data;
										this.region_box = [];
									}else{
									   for(var j in crs_box){
										  if(this.cs_id==crs_box[j].city_id){
											this.region_box = crs_box[j].region;
										  }
									   }
									   this.qy_box = [];
									   for(var j in this.region_box){
										  for (var i in res.data.data){
											if(this.region_box[j].region_id==res.data.data[i].region_id){
												this.qy_box.push(res.data.data[i]);
												console.log(2222)
												
											}
										  }
									   }
									}
									this.qy_val = this.qy_box[0].region_name;
									this.qy_id = this.qy_box[0].region_id; 
									// this.jd_fn();
									this.jd_fn();//获取街道数据
									 this.git_act(1)
						   		}
						      }).catch(error=> {});
						},
						
						//当区域选项被点击
						qy_click(i){
							this.qy_id = i;
							this.jd_val = '';
							this.jd_box = [];
							this.jd_id = '';
							this.jd_fn();//获取街道数据
							this.git_act(1)
						},
						//获取街道数据
						jd_fn(){
						   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id},headers:{'Authorization':'Bearer '+localStorage.token}}
						     ).then(res=>{
						  		console.log(res.data,'街道数据')
						       if(res.data.code==200){
								   let id = ''
								   for(var i in this.region_box){
									   if(this.region_box[i].region_id==this.qy_id){
										   id=this.region_box[i]
									   }
								   }
								   if(id.street==-1){
								   	  this.jd_box = res.data.data;
								   }else{
									  let street_box = '';
									  for(var j in this.region_box){
										 if(this.region_box[j].region_id==this.qy_id){
											 street_box = this.region_box[j].street;
										 }
									  };
									 for(var j in street_box){
									   for (var i in res.data.data){
								   	  	 if(street_box[j].street_id==res.data.data[i].street_id){
								   	  		this.jd_box.push(res.data.data[i]);
								   	  	 }
								   	   };
									 }
								   }
								   // this.jd_val = this.jd_box[0].street_name;
								   // this.jd_id = this.jd_box[0].street_id;
								   // this.git_act(1)
						  		}
						     }).catch(error=> {});
						},
						//当街道选项被点击
						jd_click(i){
							this.jd_id = i;
							this.git_act(1)
						},
				
		
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.currentPage4 = val;
		this.git_act(val);
      },
	  
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	
	  
	//获取列表数据函数
	  git_act(pages,i){
		    this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/institutions',
			  params:{
				    active:this.sh_zt_id,
					city_id:this.cs_id,
					region_id:this.qy_id,
					street_id:this.jd_id,
					 search: this.masg_val,
					page:pages,
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   
					   this.total_01 = res.data.meta.total;
					   
	  			   }
	  		  }).catch(error=>{
				  this.loading = false;
				  if (error.response) {
				     console.log(error.response);
				     if(error.response.status==403){
				  		 this.$notify({
				          title: '警告',
				          message: '账号异常请重新登录',
				          type: 'warning'
				        });
				  		 this.$router.push('/login')
				  	 }
				   }
			  });
	  },
	 
	 },
	  mounted(){
		this.cs_fn();
		this.cs_fn2();
		// this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.inp_boxs p{
		float: left;
		line-height: 40px;
		margin: 0;
	}
	.inp_boxs{
		width:570px;
		height: 40px;
		/* background: red; */
		/* padding-left: 20px; */
		margin: 20px auto;
		margin-right: 0;
		/* padding-left: 20px; */
	}
	
	
	.transition-box_child{
		width:620px;
		height: 90%;
		margin: 2% auto;
		background: white;
		/* border-radius:5px; */
		overflow:auto;
		padding-top:10px;
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
