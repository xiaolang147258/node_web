<template>
	<!--  -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            
			 <el-button @click='create_biao("")' style='float:right;margin-left:10px;' type="primary">添加标签</el-button>
			 <!-- <el-button @click='she_data' style='float:right;' type="success">标签关系设置</el-button> -->
			 
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
		
       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
       <!-- <el-table-column prop="updated_at" align='center' header-align='center' label="序号"><template slot-scope="scope">{{ scope.row.updated_at }}</template></el-table-column> -->
       <el-table-column prop="name" align='center' header-align='center' label="标签" ></el-table-column>
       <el-table-column prop="type" class='tds' align='center' header-align='center'  label="标签类型" show-overflow-tooltip><template slot-scope="scope">
		   {{scope.row.type==1?'课程特色':(scope.row.type==2?'育人目标':'办学特色')}}
	   </template></el-table-column>
       <el-table-column prop="school_count" align='center' header-align='center' label="使用学校数" ></el-table-column>
	   <el-table-column prop="course_count" align='center' header-align='center' label="使用课程数" ></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='create_biao(scope.row.id,scope.row)' type="primary" plain>编辑</el-button>
	       </template>
	   </el-table-column>
     </el-table>
  <div style="margin-top: 20px;">
<!-- 分页插件 :current-page="currentPage4" -->
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
	 
<!-- 添加标签 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
	  <transition name="el-fade-in-linear">
        <div v-show="show_meng" class="transition-box">
		   <transition name="el-zoom-in-top">
             <div v-show="show_meng" class="transition-box_child">
				 <p class="p_title">添加标签</p>
				  <div class="inp_box"><el-input placeholder="请输入标签名字" v-model="input" clearable></el-input></div>
                  <div class="inp_box">
					 <el-select style='width: 100%;' v-model="lx_val" clearable placeholder="请选择类型">
					    <el-option v-for="(item,index) in lx_box" :key="index" :label="item" :value="item"></el-option>
					 </el-select>
				  </div>
                  <div class="inp_box" style="width:170px;">
					  <el-button @click='show_meng=false' style='float:left;' type="info">取消</el-button>
					  <el-button @click='create_put' style='float:right;' type="primary">确认</el-button>
				  </div>
			  </div>
           </transition>
		</div>
      </transition>
<!-- 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 --> 

<!-- 关系设置 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
	  <transition name="el-fade-in-linear">
        <div v-show="show_meng2" class="transition-box">
		   <transition name="el-zoom-in-top">
             <div v-show="show_meng2" class="transition-box_child" style="width:900px;height:650px;margin-top:30px;">
				<div style="width:100%;height:550px;overflow:auto;">
				  <p class="p_title">标签关系设置</p>
				  
				  <div style="width:90%;margin:20px auto;">
					  <p style="font-size:15px;font-weight:600;margin-bottom:5px;">关键字</p>
					  <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
					     <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in 20" :label="city" :key="city" border>关键字标签</el-checkbox>
					  </el-checkbox-group>
				  </div>
				  
				  <div style="width:90%;margin:20px auto;">
				  					  <p style="font-size:15px;font-weight:600;margin-bottom:5px;">育人目标</p>
				  					  <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
				  					     <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in 20" :label="city" :key="city" border>育人目标标签</el-checkbox>
				  					  </el-checkbox-group>
				  </div>
				  <div style="width:90%;margin:20px auto;">
				  					  <p style="font-size:15px;font-weight:600;margin-bottom:5px;">办学特色</p>
				  					  <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
				  					     <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in 20" :label="city" :key="city" border>办学特色标签</el-checkbox>
				  					  </el-checkbox-group>
				  </div>
				  <div style="width:90%;margin:20px auto;">
				  					  <p style="font-size:15px;font-weight:600;margin-bottom:5px;">课程特色</p>
				  					  <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4">
				  					     <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in 20" :label="city" :key="city" border>课程特色标签</el-checkbox>
				  					  </el-checkbox-group>
				  </div>
				  
				</div>  
                  <div class="inp_box" style="width:170px;">
					  <el-button @click='show_meng2=false' style='float:left;' type="info">取消</el-button>
					  <el-button style='float:right;' type="primary">确认</el-button>
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
	//标签关系设置
			checkedCities1:'',
			checkedCities2:'',
			checkedCities3:'',
			checkedCities4:'',
			
			checkedbox1:[],
			checkedbox2:[],
			checkedbox3:[],
			checkedbox4:[],
			
		   show_meng2:false,
		   input:'',
		   lx_box:['育人目标','办学特色','课程特色'],
		   lx_val:'',
		   
		   show_meng:false,
		   total_01:0,//分页-总条数
	       
		   tableData3:[],//列表数据
           multipleSelection: [],
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
		   loading:true,
		   biao_id:'',
		   pages_in:1,
		   
		   put_show:true,
	    }
	  },
	
	  methods:{
		 
//标签关系设置		  
		handleCheckedCitiesChange1(value) {//关键字被点击
		  let checkedCount = value.length;
		  this.checkAll = checkedCount === this.cities.length;
		  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			console.log(this.checkedCities1)
		},
		handleCheckedCitiesChange2(value) {//关键字被点击
		  let checkedCount = value.length;
		  this.checkAll = checkedCount === this.cities.length;
		  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			console.log(this.checkedCities1)
		},  
		handleCheckedCitiesChange3(value) {//关键字被点击
		  let checkedCount = value.length;
		  this.checkAll = checkedCount === this.cities.length;
		  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			console.log(this.checkedCities1)
		},  
		handleCheckedCitiesChange4(value) {//关键字被点击
		  let checkedCount = value.length;
		  this.checkAll = checkedCount === this.cities.length;
		  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			console.log(this.checkedCities1)
		},  
//标签关系设置被点击
		she_data(){
			this.show_meng2 = true;
		},
		 create_biao(id,i){
			this.biao_id = id;
			this.show_meng = true;
			if(this.biao_id==''){//判断未添加状态
				this.input = '';
				this.lx_val = '';
			}else{//判断为编辑状态
				this.input = i.name;
				this.lx_val = i.type==1?'课程特色':(i.type==2?'育人目标':'办学特色');
			}
		 },
		 create_put(){
			 if(this.input){}else{this.$message({message:'标签名字不能为空！',type:'warning'});return false};
			 if(this.lx_val){}else{this.$message({message:'请选择类型',type:'warning'});return false};
			 
			 console.log(this.put_show);
			 if(this.put_show){
				 this.put_show = false;
				  window.setTimeout(()=>{
				 	this.put_show = true;
				 },3000)
			 }else{
				 return false;
			 }
			 
			 let type = this.biao_id==''?'post':'put';
			 let ids = this.biao_id==''?'':'/'+this.biao_id
			 this.$axios({method:type,url:store.state.url_data+'/api/tags'+ids,
			   data:{
			 	  name:this.input,
				  type:this.lx_val =='课程特色'?1:(this.lx_val =='育人目标'?2:(this.lx_val =='办学特色'?3:''))
			    },headers:{'Authorization':'Bearer '+localStorage.token}}
			    ).then(res=>{
			 	  console.log(res.data)
			      if(res.data.code==200){
			 		 this.$message({message:'提交成功',type:'success'});
			 		 this.show_meng=false;
			 		 this.git_act(this.pages_in);
			 	  }else{
					  this.put_show = false;
			 		  let box=res.data.data;let vals = '';for (var index in box){vals=box[index].join(' ')}
			 		  this.$alert(vals,'服务器返回!',{confirmButtonText:'确定',callback:action=>{}})
			 	   }
			 	  }).catch(error=> {
					  if(error.response){
						this.$message({message:error.response.data.message,type:'warning'});
					  } 
				});
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
	  		  this.$axios({method:'get',url:store.state.url_data+'/api/tags',
			  params:{page:pages},headers:{'Authorization':'Bearer '+localStorage.token}}
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
		this.git_act(1);
		
	  }
	};
	
</script>
<style scoped="scoped">
	.inp_box{
		width: 320px;
		height: 40px;
		margin: 20px auto;
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
		font-weight: 600;
		text-align: center;
		margin: 0 0 20px 0;
		
	}
	.transition-box_child{
		width:400px;
		height:260px;
		margin:200px auto;
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
