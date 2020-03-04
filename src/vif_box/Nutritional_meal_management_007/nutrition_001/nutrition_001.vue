<template>
	<!-- 阴阳餐 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="用餐类型">
			   <el-option :label="'月度用餐'" :value="'月度用餐'"></el-option>
			   <el-option :label="'学期用餐'" :value="'学期用餐'"></el-option>
			</el-select>
			
			<el-date-picker class='tab_c'  value-format='yyyy-MM' style='width:150px;' @change='git_act(1)' v-model="value4" type="month" placeholder="用餐月份"></el-date-picker>
   
			<div class='inp_a' style='width:200px;'><el-input placeholder="请输入营养餐标题" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<el-button @click='create_date("")' style='float:right;' type="primary" >添加信息</el-button>
		</div>
		
 <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="sku_name" align='center' header-align='center' label="标题" ></el-table-column>
       <el-table-column prop="diging" class='tds' align='center' header-align='center'  label="金额" >
		    <template slot-scope="scope">{{scope.row.dining_price*scope.row.total_days}}</template>
	   </el-table-column>
	   
       <el-table-column prop="start_format" align='center' header-align='center' label="开始时间" ></el-table-column>
	   <el-table-column prop="end_format" class='tds' align='center' header-align='center'  label="结束时间" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="period_type" align='center' header-align='center' label="用餐类型" >
		    <template slot-scope="scope">{{scope.row.period_type==1?'月度用餐':'学期用餐'}}</template>
	   </el-table-column>
	   
	   <el-table-column prop="month" align='center' header-align='center' label="用餐月份" show-overflow-tooltip></el-table-column>
		   
	   <el-table-column prop="total_days" class='tds' align='center' header-align='center'  label="用餐天数" show-overflow-tooltip></el-table-column>
		    
	   <el-table-column prop="dining_price" align='center' header-align='center' label="单价" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="supplier.name" align='center' header-align='center' label="供应商" show-overflow-tooltip></el-table-column>
	   
	   <!-- <el-table-column prop="scope.row.active" class='tds' align='center' header-align='center'  label="状态" >
		   <template slot-scope="scope">
			   <p>{{scope.row.active==0?'下架':'上架'}}</p>
		   </template>
	   </el-table-column> -->
	   


	    <!-- <el-table-column prop="" class='tds' align='center' header-align='center'  label="操作" show-overflow-tooltip> -->
	   		   <!-- <template slot-scope="scope"> -->
				 <!-- <div> -->
					<!-- <el-button style='margin-bottom:5px;' @click='create_date(scope.row.id)'  :disabled='scope.row.active==0?false:true' type="primary" plain>编辑</el-button> -->
					<!-- <el-button style='margin-bottom:5px;' @click='create_date(scope.row.dining_sku_id)'  type="primary" plain>编辑</el-button> -->
				 <!-- </div> -->
	   			<!-- <el-button @click='put_sx(1,scope.row)' v-if='scope.row.active==0' type="success">上架</el-button>
	   			 <el-button @click='put_sx(0,scope.row)' v-else type="danger">下架</el-button> -->
	   		   <!-- </template> -->
	   <!-- </el-table-column> -->

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
   
   <!-- 添加标签 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
   	  
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		   marenr:0,
		   date_ri:0,
		   value4:'',//月份
		   input_val:'',
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   masg_val:'',//搜索输入框数据
		   tableData3:[],//列表数据
           multipleSelection:[],
		   loading:true,
		   pages:1,
	    }
	  },
		
	methods:{
		
	put_sx(i,item){//上架下架被点击
	    console.log(item)
		this.$axios({method:'put',url:store.state.url_data+'/api/diningSkus/'+item.id,
		  data:{"active":i},headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
		        console.log(res.data,'修改状态');
		       if(res.data.code==200){
				    this.$message({ message: '修改成功',type: 'success'});
					this.git_act(this.pages);
			   }else{this.$message({ message: '修改失败',type: 'warning'});}
		  }).catch(error=>{this.$message({ message: '修改失败',type: 'warning'});});
	},
		
	create_date(i){//添加||编辑被点击
	    sessionStorage.sku_id = i;
		this.$router.push({path:'/add_nutrition_001'});
	},
   
//提交数据
         
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
		this.pages = val;
      },
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus',
			  params:{
				page:pages,
				search:this.masg_val,
				month:this.value4,
				period_type:this.lx_val=='月度用餐'?1:(this.lx_val=='学期用餐'?2:0),
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	  		        console.log(res.data,'数据');
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
