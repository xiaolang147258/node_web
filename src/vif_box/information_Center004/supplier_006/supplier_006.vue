<template>
	<!-- 供应商管理 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c' v-model="cs_val" style='width:150px;' placeholder="请选择城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:150px;' v-model="qy_val" clearable placeholder="请选择区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:150px;' v-model="jd_val" clearable placeholder="请选择街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入供应商名字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<el-button style='float:right;margin-right:20px;' @click='create_supplier("","")' type="primary">添加供应商</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
       <!-- <el-table-column prop="created_at" align='center' header-align='center' label="提交日期时间"><template slot-scope="scope">{{ scope.row.created_at }}</template></el-table-column> -->
       <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="name" class='tds' align='center' header-align='center'  label="供应商" ></el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button style='margin-left:10px;' @click='create_supplier(scope.row.supplier_id,scope.row)' type="primary" plain>编辑</el-button>
	       </template>
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
  </div>
    <transition name="el-fade-in-linear">
       <div v-show="show" class="transition-box">
    			<transition name="el-zoom-in-top">
             <el-card v-show="show" class="transition-boxs">
    				 
    				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">添加 / 编辑供应商</p>  
    				 <div class="box_call">
    					 <div style="width:400px;float:right;height:100%;">
    						 <el-select style='width:125px;' @change='cs_click2' v-model="cs_val2" placeholder="请选择城市">
    						    <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
    						 </el-select>
    						 <el-select style='width:125px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
    						    <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
    						 </el-select>
    						 <el-select style='width:125px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
    						    <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
    						 </el-select>
    					 </div><p>*城市区域：</p>
    				 </div> 
    				 
					 <div class="box_call">
					    <div style="width:400px;float:right;height:100%;"><el-input style='width:385px' placeholder="请输入" v-model="input_val[0]" clearable></el-input></div>
					    <p>*供应商名称：</p>
					 </div> 
					 <div class="box_call">
					    <div style="width:400px;float:right;height:100%;"><el-input @blur='put_act' :disabled="shows" style='width:385px' type='Number' placeholder="请输入11位数手机号" v-model="input_val[1]" clearable></el-input></div>
					    <p>*联系人号码：</p>
					 </div> 
					 <div class="box_call">
					    <div style="width:400px;float:right;height:100%;"><el-input :disabled="shows" style='width:385px' placeholder="请输入" v-model="input_val[2]" clearable></el-input></div>
					    <p>*登录密码：</p>
					 </div> 
    				    
    				<div style="width:180px;height:40px;margin:35px auto;">
    					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
    					   <el-button @click='create_put' style='float:right;' type="primary">提交</el-button>
    				</div>
    			  </el-card>
          </transition>
    		</div>
     </transition>
    
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		   shows:false,
			
		   input_val:[],
			
		   show:false,
		   
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
		   //弹出框城市区域街道  
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
		   supplier_id:'',
		   pages_in:1,
		   region_box:[],
		   region_box2:[],
	    }
	  },
		
	methods:{
		put_act(){//账号验证
		    if(this.input_val[1]){}else{return false;}
			this.$axios({method:'get',url:store.state.url_data+'/api/checkAccount',
			    params:{
					// username:this.input[4],
					// password:this.input[5],
					phone:this.input_val[1]
				},headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				 console.log(res,'账号验证')
			     if(res.data.code==200){
					  this.$message({message:'验证通过，该手机号可以使用！',type:'success'});    
				  }else{
					   let box = res.data.data; let vals = '';
					   for (var index in box) {
					 	vals = box[index].join(' ');
					   }
					   this.$message.error(vals+'账号验证不通过将无法提交！')
				  }
				}).catch(error=> {
					if (error.response) {
						this.$message.error(error.response.data.message+'账号验证不通过将无法提交！')
					} else {
						this.$message.error('发生了错误')
					}
				});
		},
		
		
		create_supplier(i,item){//添加被点击 
		  this.supplier_id = i;
		  if(this.supplier_id==''){//判断为添加 
		     this.shows = false;
			 this.cs_val2='';
			 this.qy_val2='';
			 this.jd_val2='';
			 this.cs_id2='';
			 this.qy_id2='';
			 this.jd_id2='';
			 this.cs_fn2();
			 this.input_val=[];
		  }else{//判断为编辑
		      this.shows = true;
			 this.cs_val2=item.city_name;
			  this.cs_id2=item.city_id;
			this.qy_fn2()
			 this.qy_val2=item.region_name;
			 this.qy_id2=item.region_id;
			this.jd_fn2()
			  this.jd_val2=item.street_name;
			 this.jd_id2=item.street_id;
			 this.input_val[0] = item.name;
			 this.input_val[1] = item.phone;
			 this.input_val[2] = item.password;
		  }
		  this.show = true;
		},
        create_put(){
			if(this.jd_id2){}else{this.$message({message:'请选择区域街道！',type:'warning'});return false}
			if(this.input_val[0]){}else{this.$message({message:'请填写供应商名字！',type:'warning'});return false}
			if(this.supplier_id==''){
				if(this.input_val[1]){}else{this.$message({message:'请填写手机号码！',type:'warning'});return false}
				if(this.input_val[1].length==11){}else{this.$message({message:'请填写11位数的手机号！',type:'warning'});return false}
				if(this.input_val[2]){}else{this.$message({message:'请填写密码！',type:'warning'});return false}
			}
			let type = this.supplier_id==''?'post':'put';
			let ids = this.supplier_id==''?'':'/'+this.supplier_id
			this.$axios({method:type,url:store.state.url_data+'/api/suppliers'+ids,
			  data:{
				 city_id:this.cs_id2+'',
				 region_id:this.qy_id2+'',
				 street_id:this.jd_id2+'',
				 city_name:this.cs_val2,
				 region_name:this.qy_val2,
				 street_name:this.jd_val2,
				 name:this.input_val[0],//供应商名字
				 account:this.input_val[1],//账号
				 password:this.input_val[2],//密码  
				 phone:this.input_val[1],//手机号码
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				  console.log(res.data)
			     if(res.data.code==200){
					 this.$message({message:'提交成功',type:'success'});
					 this.show=false;
					 this.git_act(this.pages_in);
				  }else{
					  let box = res.data.data;let vals = '';
					  for(var index in box){vals=box[index].join(' ')}
					  this.$message.error(vals)
				  }
				  }).catch(error=> {
					 if (error.response) {
					 	this.$message.error(error.response.data.message)
					 } else {
					 	this.$message.error('发生了错误')
					 }
				  });
		},
		 
		 
//////////弹出框选择城市街道///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
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
					this.qy_fn2()
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
									}
								  }
							   }
							}
							// this.qy_val2 = this.qy_box2[0].region_name;
							// this.qy_id2 = this.qy_box2[0].region_id; 
							// this.jd_fn2();
							
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
						   let id = '';
						   for(var i in this.region_box2){
							   if(this.region_box2[i].region_id==this.qy_id2){
								   id=this.region_box2[i];
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
							 this.jd_box2 = [];
							 
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
				  		}
				     }).catch(error=> {});
					 
				},
				//当街道选项被点击
				jd_click2(i){
					this.jd_val2 = i.street_name;
					this.jd_id2 = i.street_id;
					// this.git_jg()
				},
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		//城市区域街道函数
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
									this.git_act(1)
									this.jd_fn();//获取街道数据
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
									 this.jd_box = []
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
		this.git_act(val);
		this.pages_in = val
      },
	
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/suppliers',
			  params:{
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				search:this.masg_val,
				page:pages
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=> {
				  this.loading = false;
				  if (error.response) {
				     console.log(error.response);
				     if(error.response.status==403){
				  		this.$notify({ title: '警告', message: '账号异常请重新登录',type: 'warning'});this.$router.push('/login');
				  	 }else{this.$message({message:'发生了错误，请联系技术中心！',type:'warning'})}
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
	.box_call_c{
		width:400px;float:right;height:100%;
	}
	.box_call p{
		float: right;
		font-size: 15px;
		font-weight: 600;
		margin: 0;
		margin-right: 10px;
		line-height: 40px;
	}
	.box_call{
		width: 100%;
		height: 40px;
		margin: 25px 0;
		padding-right: 20px;
	}
	.transition-boxs{
		width: 600px;
		height: 420px;
		background: white;
		margin: 100px auto;
	}
	.transition-box{
		 position: fixed;
		 top: 0;
		 left: 0;
		 z-index: 500;
		 width: 100%;
		 height: 100%;
		 background: rgba(0,0,0,.3);
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
