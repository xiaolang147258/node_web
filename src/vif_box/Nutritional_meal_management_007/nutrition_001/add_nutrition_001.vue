<template>
	<!-- 课程库编辑添加 -->
	<div style="width:100%;">
	  <el-card class="box-card"  style="padding:0;margin:20px;padding-bottom: 10px;">
	   
	   <div class="box_tall">
	  	  <el-input class='tall' placeholder="请输入" v-model="input" clearable></el-input>
	      <p>*营养餐标题:</p>
	  </div>
	  
	   <div class="box_tall" style="width:1205px;">
	  		                       <div style="width:1005px;float:right;height:100%;">
	  		      						 <el-select style='width:130px;' @change='cs_click2' v-model="cs_val2" placeholder="请选择城市">
	  		      						    <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
	  		      						 </el-select>
	  		      						 <el-select style='width:130px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
	  		      						    <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
	  		      						 </el-select>
	  		      						 <el-select style='width:130px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
	  		      						    <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
	  		      						 </el-select>
	  									 
	  									 <el-select style='width:185px;'  @change='g_click' v-model="g_val"  placeholder="请选择供应商">
	  									    <el-option v-for="(item,index) in g_box"  :label="item.name" :value="item"></el-option>
	  									 </el-select>
	  									 
	  									 <el-select style='width:185px;'  @change='t_click' v-model="t_val"  placeholder="请选择套餐">
	  									    <el-option v-for="(item,index) in t_box"  :label="item.sku_name" :value="item"></el-option>
	  									 </el-select>
	  									 <el-button @click='jia' type="primary">+</el-button>
	  		      				   </div><p>*供应商：</p>
	  </div>
	  
	   <div class="box_tall">
	  		<el-select class='tall' v-model="tuo_lei" placeholder="用餐类型">
	  		   <el-option :label="'月度用餐'" :value="'月度用餐'"></el-option>
	  		   <el-option :label="'学期用餐'" :value="'学期用餐'"></el-option>
	  		</el-select>
	      <p>*用餐类型:</p>
	  </div>
	  
	  <!-- <div class="box_tall">
	  	   <el-date-picker class='tall' v-if='tuo_lei=="月度用餐"' v-model="tuo_yue" type="month" placeholder="选择月"></el-date-picker>
	       <div v-else class='tall'>
	  						   <el-date-picker style='width:195px;float:left;' v-model="tuo_yue_2[0]" type="month" placeholder="起始月份"></el-date-picker>
	  						   <el-date-picker style='width:195px;float:right;' v-model="tuo_yue_2[1]" type="month" placeholder="结束月份"></el-date-picker>
	  					   </div>
	  		<p>*用餐月份:</p>
	  </div> -->
	  
	  <div class="box_tall">
	  	  <el-date-picker class='tall' value-format='yyyy-MM-dd' format='yyyy-MM-dd' @change='que_date' v-model="tuo_date[0]" type="date" placeholder="选择日期"></el-date-picker>
	      <p>*开始日期:</p>
	  </div>
	  
	  <div class="box_tall">
	  	  <el-date-picker class='tall' value-format='yyyy-MM-dd' format='yyyy-MM-dd' @change='que_date' v-model="tuo_date[1]" type="date" placeholder="选择日期"></el-date-picker>
	      <p>*结束日期:</p>
	  </div>
	  
	  <div class="box_tall">
	  	  <div class="tall">{{date_ri}}天</div>
	      <p>*服务天数:</p>
	  </div>
	  
	  <div class="box_tall">
	  	  <div class="tall">{{dan_pase}}￥</div>
	      <p>*单价:</p>
	  </div>
	  
	  <div class="box_tall">
	  	  <div class="tall">{{date_ri*dan_pase}}￥</div>
	      <p>*金额:</p>
	  </div>
	 
	  <!-- <div class="box_tall" style="width:590px;">
	  		                       <div style="float:right;height:100%;">
	  		      						 <el-select style='width:125px;'  v-model="cs_val3" placeholder="请选择城市">
	  		      						    <el-option v-for="(item,index) in cs_box3" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
	  		      						 </el-select>
	  		      						 <el-select style='width:125px;'  @change='qy_click3' v-model="qy_val3"  placeholder="请选择区域">
	  		      						    <el-option v-for="(item,index) in qy_box3" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
	  		      						 </el-select>
	  		      						 <el-select style='width:125px;'  @change='jd_click3' v-model="jd_val3"  placeholder="请选择街道">
	  		      						    <el-option v-for="(item,index) in jd_box3" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
	  		      						 </el-select>
	  		      				   </div><p>*服务学校：</p>
	  </div> -->
	  
<!-- 穿梭框，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，，， -->	  
	  <!-- <div class="box_tall" style="width:790px;height:310px;">
	  		<el-transfer style='margin-left:133px;' 
			  filterable :filter-method="filterMethod"
			  filter-placeholder="请输入城市名字" 
			  v-model="value2" :data="data2" 
			  :titles="['全选', '全选']">
			  </el-transfer>
	  </div> -->
	
    <div v-show="html_box" class="box_tall" style="float:left;width:1200px;height:auto;">
	  <div style="float:right;width:1000px;background: #79C9EC;border-radius:3px;padding:10px;" v-html="html_box"></div> 
	  <p style="float:right;">*餐单详细:</p>
	</div>	 
	   <div style="width: 100%;height:40px;float:left;margin: 20px 0 20px 0;">
		    <div style="width: 210px;height: 100%;margin: 0 auto;">
				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
				<el-button @click='git_act' style='float:right;' type="primary">确认提交</el-button>
			</div>
	   </div>
	   
 </el-card>
 
</div>
</template>
<script>
	 import store from "../../../vuex/store.js";
     export default {
	  data(){
		// const generateData2 = _ => {
  //       const data = [];
  //       const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
  //       const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
  //       cities.forEach((city, index) => {
  //         data.push({
  //           label: city,
  //           key: index,
  //           pinyin: pinyin[index]
  //         });
  //       });
  //         return data;
  //       };
	    return {
			 // data2: generateData2(),
			 data2:[
				 // {
					// key:0,
					// label:'上海',
					// pinyin:'上海'
				 // },
			 ],
            // value2: [],//选定的学校列表
            filterMethod(query, item) {return item.pinyin.indexOf(query) > -1;},
			
			tuo_date:['',''],
			tuo_date_lei:'',//托管时间段类型
			tuo_yue_2:['',''],//托管月份时间段
			tuo_yue:'',//托管月份
			tuo_lei:'月度用餐',//托管类型
			input:'',	
			show_meng:false,
			value4:'',//月份
			input_val:'',
			
	//供应商 		
			cs_box2:[],
			qy_box2:[],
			jd_box2:[],
			cs_val2:'',
			qy_val2:'',
			jd_val2:'',
			cs_id2:'',
			qy_id2:'',
			jd_id2:'',
			
     //服务学校 
			cs_box3:[],
			qy_box3:[],
			jd_box3:[],
			cs_val3:'',
			qy_val3:'',
			jd_val3:'',
			cs_id3:'',
			qy_id3:'',
			jd_id3:'',
			region_box2:[],
			g_val:'',
			g_box:[],
			g_id:'',//供应商id
			
			t_val:'',
			t_box:[],
			t_id:'',//套餐id
			
			html_box:'',//餐单详情（html）
			dan_pase:0,//单价
			marenr:0,//金额
			date_ri:0,//天数
			
			put_num:true,
		}
	  },
	  methods:{
		 jia(){this.$router.push({path:'/Menu_management_002'});},
		 put_xue(){//判断是否为编辑状态
			if(sessionStorage.sku_id!=''){
				// this.input = data.sku_name
				// this.tuo_lei=period_type=='月度用餐'?1:2;
				// this.tuo_date[0]=data.start_date;
				// this.tuo_date[1] = data.end_date
				
				this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/'+sessionStorage.sku_id,headers:{'Authorization':'Bearer '+localStorage.token}}
				   ).then(res=>{
					   console.log(res.data,'编辑详情')
				     if(res.data.code==200){
						 let data = res.data.data[0];
						 this.input = data.sku_name;
						 this.tuo_lei= data.period_type==1?'月度用餐':'学期用餐';
						this.tuo_date[0] = data.start_format
						this.tuo_date[1] = data.end_format
						
						 console.log( this.tuo_date);
						
						 this.date_ri = data.total_days
						 this.dan_pase = data.dining_price
						
						 this.cs_val2 = data.supplier.city_name;
						  this.cs_id2 = data.supplier.city_id;
						 
						 this.qy_val2 = data.supplier.region_name;
						 this.qy_id2 = data.supplier.region_id;
						 this.jd_fn2()
						 
						 this.jd_val2 = data.supplier.street_name;
						 this.jd_id2 = data.supplier.street_id;
						 this.git_g();
						 
						 this.g_id = data.supplier_id;
						 this.g_val = data.supplier.name;
						 
						 this.t_id = data.sku.sku_id;
						 this.t_val = data.sku.sku_name;
						 
						 this.html_box =  data.sku.description;
						 
						 // this.cs_val3 = data.school.city_name;
						 // this.qy_val3 = data.school.region_name;
						 // this.qy_id3 = data.school.region_id;
						 // this.jd_val3 = data.school.street_name;
						 // this.jd_id3 = data.school.street_id;
						 
						 // this.git_xue(data.puhui_sku_list);
					
					 }}).catch(error=> {});  
			   }
		 },
		 
		 //提交按钮被点击
		  git_act(){
		 			 if(this.input==''){this.$message({message:'套餐名字不能为空！',type:'warning'});return false};
					 if(this.g_id==''){this.$message({message:'请选择供应商！',type:'warning'});return false};
					 if(this.t_id==''){this.$message({message:'请选择套餐！',type:'warning'});return false};
		 			 if(this.tuo_date[0]==''||this.tuo_date[1]==''){this.$message({message:'开始日期或者结束日期不能为空！',type:'warning'});return false};
		 			 if(new Date(this.tuo_date[0]).getTime()< new Date(this.tuo_date[1]).getTime()){}else{this.$message({message:'开始日期必须小于结束日期！',type:'warning'});return false};
		 			 if(this.tuo_lei=='月度用餐'){
		 			 	if(this.date_ri<=31){}else{this.$message({message:'月度用餐服务天数不能大于31天！',type:'warning'});return false;}
		 			 } 
					 // if(this.qy_id3==''){this.$message({message:'请选择服务学校区域街道！',type:'warning'});return false};
					 // if(this.value2.length==0){this.$message({message:'请选定需要服务的学校！',type:'warning'});return false};
		 			 // console.log(this.value2);//选定的学校下标
		 			//  let xue_idbox = [];//选定的学校id
					 // for(var i in this.value2){
						//  for(var j in this.data2){
						// 	 if(this.value2[i]==j){
						// 		 xue_idbox.push(this.data2[j].school_id);
						// 	 }
						//  }
					 // };console.log(xue_idbox,'学校id');
					  if(this.put_num){
					 	this.put_num = false;
						window.setTimeout(()=>{
							this.put_num = true
						},3000)
					 }else{
					 	return false
					 }
					 let types =  sessionStorage.sku_id==''?'post':'put';
					 let id = sessionStorage.sku_id==''?'':'/'+sessionStorage.sku_id;
					 let start_dates = this.tuo_date[0];
					 let end_dates = this.tuo_date[1];
					 this.$axios({method:types,url:store.state.url_data+'/api/diningSkus'+id,
					     data:{
					 	   sku_name:this.input,//标题
						   period_type:this.tuo_lei=='月度用餐'?1:2,
						   start_date:start_dates,//开始时间
						   end_date:end_dates,//结束时间
						   sku_id:this.t_id,//套餐id
						   // school_ids:xue_idbox,//学校id
						   dining_price:this.dan_pase,//单价
						   supplier_id:this.g_id,//供应商id
						   // dining_sku_id:this.t_id,//套餐id
						   
						   supplier_name:this.g_val,//供应商名字
						   total_days:this.date_ri,//天数
					 	},headers:{'Authorization':'Bearer '+localStorage.token}}
					    ).then(res=>{
					 	   console.log(res.data,'添加结果')
					      if(res.data.code==200){
							 this.$message({ message: '成功',type: 'success'});
							 this.quxioa();//返回上一页
						  }else{
							 let box = res.data.data;let vals = '';for (var index in box){vals=box[index].join(' ')}this.$message.error(vals);
						  }
						  }).catch(error=> {
							  if (error.response) {let response=error.response.data;this.$message({message:response.message, type:'error'});}
						  });
		 },
		 
         //获取服务学校数据 
		 git_xue(datas){
			this.data2 = [];
			// this.value2 =[];
			this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/schools',
			    params:{
				  city_id:localStorage.cs_id,
				  region_id:this.qy_id3,
				  street_id:this.jd_id3
				},headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				   console.log(res.data,'服务学校')
			     if(res.data.code==200){
					if(res.data.data.length!=0){
						let data = res.data.data;
						for(var i in data){
						   this.data2.push({key:i,label:data[i].name,pinyin:data[i].name,school_id:data[i].school_id});
						}
					  if(datas){
						for(var i in datas){
							 for(var j in this.data2){
								 if(datas[i].school_id==this.data2[j].school_id){
									this.value2.push(this.data2[j].key);
								 }
							 }
						 }
						 console.log(this.value2);
					  }
					  
					}
				 }}).catch(error=> {});  
		 },
		 
		 
		 
		  t_click(i){//套餐被选定
		      this.t_val = i.sku_name;
			  this.t_id = i.sku_id;
			  this.dan_pase = i.price;
			  this.html_box = i.description;
		  },
		  git_t(id){//获取套餐
		      // this.t_id = '';this.t_val = '';
			  // this.dan_pase = 0;this.html_box = '';
			  this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/skus',
			      params:{ supplier_id:id},headers:{'Authorization':'Bearer '+localStorage.token}}
			     ).then(res=>{
			  	   console.log(res.data,'套餐')
			       if(res.data.code==200){
			  		this.t_box = res.data.data;
					// this.t_id = this.t_box[0].sku_id;
					// this.t_val = this.t_box[0].sku_name;
					// this.dan_pase = this.t_box[0].price;
					// this.html_box = this.t_box[0].description;
			  	 }}).catch(error=> {});  
		  },
		  
		  g_click(i){//供应商被选定
		    this.t_id = '';this.t_val = '';this.g_id = i.supplier_id;this.dan_pase = 0;this.html_box = '';
			this.g_val = i.name
			this.git_t(this.g_id);//获取套餐
		  },
		  git_g(){//获取供应商
		    this.g_val = '';this.g_id = '';this.html_box = '';
			this.t_id = '';this.t_val = '';this.dan_pase = 0;
			this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/suppliers',
			    params:{
				  city_id:localStorage.cs_id,
				  region_id:this.qy_id2,
				  street_id:this.jd_id2
				},headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				   // console.log(res.data,'供应商')
			     if(res.data.code==200){
					if(res.data.data.length!=0){
					  this.g_box = res.data.data;
					  this.g_id = this.g_box[0].supplier_id;
					  this.g_val = this.g_box[0].name;
					  this.git_t(this.g_id);
					}
				 }}).catch(error=> {});  
		  },
		  
		 que_date(i){//开始日期||结束日期被选定
			if(this.tuo_date[0]){}else{this.date_ri=0;this.marenr=0;return false;}
			if(this.tuo_date[1]){}else{this.date_ri=0;this.marenr=0;return false;}
			 this.calculateDiffTime(this.tuo_date[0],this.tuo_date[1]);
			
		},
		
		calculateDiffTime(start_time, end_time){//获取具体有多少天 
		    this.$axios({method:'get',url:store.state.url_data+'/api/activeDays',
		      params:{
		  		 start_date:start_time,
		  		 end_date:end_time
		  		},headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
		            // console.log(res.data,'获取的时间');
		           if(res.data.code==200){
		    		     this.date_ri = res.data.data.total_days;
		  			 this.marenr = this.date_ri*5;
		    	   }
		      }).catch(error=>{});
		 },  
		  
		quxioa(){
			this.$router.go(-1);
		},	  
//////////供应商选择城市街道///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
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
					   this.jd_val2 = this.jd_box2[0].street_name;
					   this.jd_id2 = this.jd_box2[0].street_id;
					   this.git_g();
			  		}
			     }).catch(error=> {});
				 
			},
			//当街道选项被点击
			jd_click2(i){
				this.jd_val2 = i.street_name;
				this.jd_id2 = i.street_id;
				this.git_g();
			},
				
//////////服务学校 选择城市街道///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				
			// //城市数据			 
			//         cs_fn3(){
			// 		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
			// 		      ).then(res=>{
			// 		        if(res.data.code==200){
			// 		   		  for (var i = 0; i < res.data.data.length;i++){
			// 		   		  		if(localStorage.cs_id==res.data.data[i].city_id){
			// 		   		  			this.cs_box3 = [];this.cs_box3.push(res.data.data[i]);this.cs_val3 = res.data.data[i].city_name;
			// 		   		  		}
			// 		   		  };this.qy_fn3();//获取区域数据
			// 				    
			// 		   		}}).catch(error=> {});
			// 		},
			// 		
			// //获取区域数据
			// 		qy_fn3(){
			// 		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:localStorage.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
			// 		      ).then(res=>{
			// 		        if(res.data.code==200){
			// 		   		    this.qy_box3 = res.data.data;
			// 					// this.qy_val2 = this.qy_box2[0].region_name;
			// 					// console.log(this.qy_val2)
			// 					// this.qy_id2 = this.qy_box[0].region_id;
			// 					// this.jd_fn2();
			// 		   		}
			// 		      }).catch(error=> {});
			// 		},
			// 		
			// //当区域选项被点击
			// 		qy_click3(i){
			// 			this.qy_val3 = i.region_name;
			// 			this.qy_id3 = i.region_id;this.jd_val3 = '';
			// 			this.jd_box3 = [];this.jd_id3 = '';
			// 			this.jd_fn3();//获取街道数据
			// 		    // console.log(this.qy_id3,this.qy_val3);
			// 		},
			// 		
			// //获取街道数据
			// 		jd_fn3(){
			// 		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id3},headers:{'Authorization':'Bearer '+localStorage.token}}
			// 		     ).then(res=>{
			// 				 // console.log(res.data,'街道数据222')
			// 		       if(res.data.code==200){
			// 		  		    this.jd_box3 = res.data.data;
			// 					this.jd_id3 = this.jd_box3[0].street_id;
			// 					this.jd_val3 = this.jd_box3[0].street_name;
			// 					this.git_xue()
			// 		  		}
			// 		     }).catch(error=> {});
			// 		},
			// 		
			// //当街道选项被点击
			// 		jd_click3(i){
			// 			this.jd_id3 = i.street_id;this.jd_val3 = i.street_name;
			// 			this.git_xue()
			// 		},	
		   
	},
	mounted(){
		  this.cs_fn2();
		  // this.cs_fn3();
		  this.put_xue();
		  
		  // console.log(this)
	  }
	};
</script>
<style scoped="scoped">
	.text{
		width:80%;height:400px;float:left;
		border: 1px solid #ccc;
	}
	
	.tall{
		width: 400px;
		height: 40px;
		float: right;
	}
	
	.box_tall p{
		font-size: 15px;
		font-weight: 600;
		float: right;
		margin: 0;
		line-height: 40px;
		margin-right: 10px;
	}
	.box_tall{
		width: 600px;
		height: 40px;
		padding-left: 70px;
		margin: 20px 0;
		line-height: 40px;
	}
	
</style>
