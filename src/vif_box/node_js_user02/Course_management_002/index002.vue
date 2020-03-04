<template>
	<!-- 课程库管理 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            
			<el-select class='tab_c' @change='git_act(1)' v-model="lei_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lei_box" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='git_act(1)' v-model="deng_val" clearable placeholder="请选择等级">
			   <el-option v-for="(item,index) in deng_box" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input  @change='git_act(1)' placeholder="请输入商品名称" v-model="title" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			 <el-button @click='course_create_put("")' style='float:right;margin-right:10px;' type="primary">添加商品</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
		
	    <el-table-column prop="" align='center' header-align='center' label="商品头像" >
			<template slot-scope="scope"><el-image style="width:50px; height:50px" :src="scope.row.img_title" fit="cover"></el-image></template>
		</el-table-column>
		
		<el-table-column prop="title" align='center' header-align='center' label="商品名称" ></el-table-column>
		
		<el-table-column prop="region_name" align='center' header-align='center' label="下架 / 上架" >
			<template slot-scope="scope">
			    <el-switch v-model="scope.row.type==2?true:false" @change='sx(scope.row)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			 </template>
		</el-table-column>
		
		<el-table-column prop="region_name" align='center' header-align='center' label="普通 / 精选" >
			<template slot-scope="scope">
			    <el-switch v-model="scope.row.jin_num==2?true:false" @change='pj(scope.row)' active-color="#e6a23c" inactive-color="#909399"></el-switch>
			 </template>
		</el-table-column>
		
		<el-table-column prop="" align='center' header-align='center' label="软件大小" >
			<template slot-scope="scope"><a style="color:red;font-weight:600;">{{scope.row.size}}</a>m</template>
		</el-table-column>
		
		<el-table-column prop="" align='center' header-align='center' label="商品类型" >
			<template slot-scope="scope">{{scope.row.type_lei==1?'软件':'游戏'}}</template>
		</el-table-column>
		
		<el-table-column prop="name" align='center' header-align='center' label="图片介绍" >
			<template slot-scope="scope">
			    <el-image style="width:50px; height:50px" :src="img_box(scope.row.img_box)[0]" :preview-src-list="img_box(scope.row.img_box)"></el-image>
			 </template>
		</el-table-column>
		
		<el-table-column prop="title" align='center' header-align='center' label="下载地址" >
			<template slot-scope="scope">
			    <el-button type="success" @click='select_url(scope.row)' round>获取</el-button>
			 </template>
		</el-table-column>
		
       <!-- <el-table-column prop="target" align='center' header-align='center' label="课程目标" show-overflow-tooltip></el-table-column> -->
       <el-table-column prop="message" class='tds' align='center' header-align='center' label="操作" >
		   <template slot-scope="scope">
	           <el-button @click='course_create_put(scope.row)' type="success" plain>编辑</el-button>
			   <el-button @click='delect(scope.row)' type="danger" plain>删除</el-button>
	        </template>
	   </el-table-column>
	   
     </el-table>
	 
	 
	 <el-dialog
	   title="下载地址"
	   :visible.sync="dialogVisible"
	   width="30%"
	   >
	   <p class="ps" style="text-align: center;width:100%;">{{url_xia}}</p>
	   <span slot="footer" class="dialog-footer">
	     <el-button @click="dialogVisible = false">取 消</el-button>
	     <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	   </span>
	 </el-dialog>
	 
	 
	 
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
	 

  </div>
  </el-card>
</div>
</template>

<script>
	
	import store from "../../../vuex/store.js";
	import $ from 'jquery'
	
     export default {
	  computed:{
		  img_box(){ return (box)=>{ return box.split(",")}},//将字符窜转数组
		  
	  },
	  	 
		 
	  data(){
	    return {
		   show_meng:false,
		   total_01:0,//分页-总条数
		   
		   title:'',
	       lei_val:'',
		   lei_box:[{name:'软件',id:'1'},{name:'游戏',id:'2'}],
		   deng_val:'',
		   deng_box:[{name:'普通',id:'1'},{name:'精选',id:'2'}],
		   
		   masg_val:'',//搜索输入框数据
		   tableData3:[],//列表数据
           multipleSelection: [],
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
		   loading:false,
		   pages:1,
		   url_xia:'',
		   dialogVisible:false,
	    }
	  },

	  methods:{
		  delect(i){//删除
		    this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		              confirmButtonText: '确定',
		              cancelButtonText: '取消',
		              type: 'error'
		            }).then(() => {
						let data = {
							id:i.id
						};
						this.$axios({method:'post',url:store.state.url_data+'/shang_delete',data,headers:{'Authorization':'Bater '+localStorage.login_token}}
						   ).then(res=>{
						      console.log(res.data,'数据');
						     if(res.data.code==200){this.git_act(this.pages);}
						}).catch(error=> {if (error.response) {console.log(error.response)}});
					}).catch(() => {})
		  },
		  
		  sx(i){//上架下架
			  console.log(i.type);
			  let data = {
				  type:i.type==2?1:2,
				  id:i.id
			  };
			  this.$axios({method:'post',url:store.state.url_data+'/shang_sx',data,headers:{'Authorization':'Bater '+localStorage.login_token}}
			     ).then(res=>{
			        console.log(res.data,'数据');
			       if(res.data.code==200){
					 window.setTimeout(()=>{
						 this.git_act(this.pages);
					 },200)
					}
			  }).catch(error=> {if (error.response) {console.log(error.response)}});
		  },
		  
		  pj(i){//精选普通
			 console.log(i.jin_num);
			 let data = {
			 	jin_num:i.jin_num==2?1:2,
			 	id:i.id
			 };
			 this.$axios({method:'post',url:store.state.url_data+'/shang_pj',data,headers:{'Authorization':'Bater '+localStorage.login_token}}
			    ).then(res=>{
			       console.log(res.data,'数据');
			      if(res.data.code==200){
					  window.setTimeout(()=>{
					  	this.git_act(this.pages);
					  },200)
				  }
			 }).catch(error=> {if (error.response) {console.log(error.response)}}); 
		  },
		  
		  select_url(i){//获取商品下载地址
			  		  this.$axios({method:'post',url:store.state.url_data+'/select_url',data:{shang_id:i.id},headers:{'Authorization':'Bater '+localStorage.login_token}}
			  		     ).then(res=>{
			  		        console.log(res.data,'数据');
			  		       if(res.data.code==200){
							    //复制下载地址
								this.$copyText(res.data.data).then(
									res => {console.log(res);this.$message({message:'下载地址已复制到粘贴板！',type:'success'});
								},err => {this.$notify({title: '警告',message: '复制失败',type: 'warning'})})
						   }
			  		  }).catch(error=> {
			  				  if (error.response) {}
			  			  });
		},
		
		//跳转添加||编辑页面
		course_create_put(id){
			store.state.shang_put_box = id;
			this.$router.push({path:'/add_course'});
		},
		  
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.pages = val
		this.git_act(val);
      },
	  
	  
//获取列表数据函数
	  git_act(pages){
		      this.loading = true;
	  		  this.$axios({method:'post',url:store.state.url_data+'/select_shang',
			  data:{
				pageSize:15,
				pageNo:pages,
				type_lei:this.lei_val,
				jin_num:this.deng_val,
				title:this.title,
				loactoken:'31f7f2bf38a6d2a754a36a2b34c76736',
				LOGIN:'38a6d2a4a36a2b34c767IA99',
				JFUGH:'SDWDEAa6d2a754a36a2b34c76799',
				URNFG:'ASWa6d2a754a36a2b34c7672IA99',
				loactoken_ID:'ASDA23578A38a6d2a754a36a2b34c76799',
			  },headers:{'Authorization':'Bater '+localStorage.login_token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   let to = res.data.act.replace('{"count(*)":','');
					   this.total_01 = Number(to.replace('}',''))
					   console.log(this.total_01)
	  			   }
	  		  }).catch(error=> {
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
		
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
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
