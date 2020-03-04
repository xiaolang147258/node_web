<template>
	<!-- 餐单编辑 -->
	<div style="width:100%;">
	  <el-card class="box-card"  style="padding:0;margin:20px;padding-bottom: 10px;">
		
		<div class="box_tall">
			    <el-select class='tall'  @change='gy_click2' v-model="gy_val2"  placeholder="请选择套餐">
			      <el-option v-for="(item,index) in gy_box"  :label="item.name" :value="item.supplier_id"></el-option>
			   </el-select>
		    <p>*供应商:</p>
		</div>
		  
	   <div class="box_tall">
	  	  <el-input class='tall' placeholder="请输入" v-model="input[0]" clearable></el-input>
	      <p>*营养餐标题:</p>
	  </div>
	  
	  <div class="box_tall">
	   	  <el-input class='tall' type='Number' placeholder="请输入" v-model="input[1]" clearable></el-input>
	       <p>*金额:</p>
	   </div>
	  
	  <div class="box_tall" style="height:148px;line-height:0;">
		  <div class="tall">
			  <div style="width:148px;height: 148px;overflow: hidden;">
				  <el-upload
    :action=url_img
    :headers=headers_s
    name='images'
   :on-success='handle_img_ok'
   :on-error='handle_img_no'
   :limit='1'
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :file-list='img_file'
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>  
			  </div>
		  </div>
	       <p>*封面图:</p>
	   </div>
	   
    <div  v-show="dialogVisible==false" class="box_tall" style="float:left;width:1200px;height:auto;">
	  <div style="float:right;width:1000px;">
	   <div id="editor2"  style="border:1px solid #ccc;width:100%;z-index:0;border-bottom:none;"></div>
	   <div id="editor3" class="text" style="width:100%;"></div>
	  </div> 
	  <p style="float:right;">*简介:</p>
	</div>	 
	   <div style="width:100%;height:40px;float:left;margin: 20px 0 20px 0;">
		    <div style="width: 210px;height: 100%;margin: 0 auto;">
				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
				<el-button @click='git_act' style='float:right;' type="primary">确认提交</el-button>
			</div>
	   </div>
	 
	 <!-- 全屏预览图片 -->
	  <el-dialog :visible.sync="dialogVisible">
	    <img width="100%" :src="dialogImageUrl" alt="">
	 </el-dialog>  
 </el-card>
 
</div>
</template>
<script>
	 import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
			input:[],
			editor:'',
			
			gy_box:[],
			gy_val2:'',
			gy_id:'',
			
			edit_show:true,
			
			dialogImageUrl:'',
			dialogVisible: false,
			img_url_box:[],//封面图url容器
			
			file_list:[],
			
			show_num:true,
		}
	  },
	  
	 computed:{
	 		 url_img(){return store.state.url_data+'/api/uploads'},
	 		 headers_s(){return {'Authorization':'Bearer '+localStorage.token}},
	 		 img_file(){return this.file_list}
	 },
	  methods:{
		  git_put_act(){//判断为编辑状态
			  if(sessionStorage.sku_ids!=''){
				  this.$axios({method:'get',url:store.state.url_data+'/api/skus/'+sessionStorage.sku_ids,headers:{'Authorization':'Bearer '+localStorage.token}}
				    ).then(res=>{
				      if(res.data.code==200){
				 		 let datas = res.data.data;
						 console.log(datas);
						  this.gy_id = datas.supplier_id;
						  for(var i in this.gy_box){
							  if(this.gy_box[i].supplier_id==datas.supplier_id){
								 this.gy_val2 =  this.gy_box[i].name;
							  }
						  };
						  this.input[0] = datas.sku_name;
						  this.input[1] = datas.price;
						  this.editor.txt.text(datas.description);
						  if(datas.menu.url){
							  this.img_url_box[0] = datas.menu.url;
							  this.file_list=[{name:'url',url:datas.menu.url}];
						  }
				 	 }}).catch(error=> {});   
			  }
		  },
//提交按钮被点击
		  git_act(){
			  if(this.gy_id==''){this.$message({message:'请选择供应商！',type:'warning'});return false};
			  if(this.input[0]){}else{this.$message({message:'请输入营养餐标题！',type:'warning'});return false};
			  if(this.input[1]){}else{this.$message({message:'请输入金额！',type:'warning'});return false};
			  if(this.img_url_box.length==0){this.$message({message:'上传一张封面图！',type:'warning'});return false};
			  
			  var r = /img/;　　//正整数
			  if(r.test(this.editor.txt.html())||this.editor.txt.text()){}else{
				  this.$message.error('请填写简介！');return false;
			   }
			  
			  if(this.show_num){this.show_num = false;window.setTimeout(()=>{this.show_num = true;},3000)}else{return false;}
			 
			  let types =  sessionStorage.sku_ids==''?'post':'put';
			  let id = sessionStorage.sku_ids==''?'':'/'+sessionStorage.sku_ids;
			  this.$axios({method:types,url:store.state.url_data+'/api/skus'+id,
			    data:{
			  	   supplier_id:this.gy_id,
				   sku_name:this.input[0],
				   price:this.input[1],
				   description:this.editor.txt.html(),
				   url:this.img_url_box[0]
				   
			  	},headers:{'Authorization':'Bearer '+localStorage.token}}
			     ).then(res=>{
			  	   console.log(res.data,'添加结果')
			       if(res.data.code==200){
			  			 this.$message({ message: '成功',type: 'success'});
			  			 this.quxioa();//返回上一页
			  		 }}).catch(error=> {});  
		  },
//上传图片相关函数		  
	   handleRemove(file, fileList) {//删除图片
		this.img_url_box = [];
		for(var i=0;i<fileList.length;i++){this.img_url_box.push(fileList[i].response.data.image)}
		console.log(this.img_url_box);
      },
	  handle_img_ok(response, file, fileList){//图片上传成功
	    this.$message({message: '上传成功',type: 'success' });
		this.img_url_box.push(response.data.image);
		console.log(this.img_url_box)
	  },
	  handle_img_no(err, file, fileList){//图片上传失败
	      this.$message.error('上传失败');console.log(err)
	  },
      handlePictureCardPreview(file) {//点击预览图片
        this.dialogImageUrl = file.url;this.dialogVisible = true;
      },		
		
		
//供应商被点击		  
		  gy_click2(i){
			this.gy_id = i
		  },
		  git_gy(){//获取供应商
			  this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/suppliers',
			      params:{
			  	    
			  	},headers:{'Authorization':'Bearer '+localStorage.token}}
			     ).then(res=>{
			  	   console.log(res.data,'供应商')
			       if(res.data.code==200){
			  		if(res.data.data.length!=0){
			  		  this.gy_box = res.data.data;
			  		}
			  	 }}).catch(error=> {});  
		  },
		  
		quxioa(){
			this.$router.go(-1);
		},	
	},
	mounted(){
//富文本编辑框初始化
		  var E = window.wangEditor;
		  let editor2 = document.getElementById('editor2');let editor3 = document.getElementById('editor3');
		  var editor = new E(editor2,editor3);
		  editor.customConfig.uploadImgShowBase64 = false;   // 不使用 base64 保存图片
		  
		  editor.customConfig.uploadImgServer = store.state.url_data+'/api/uploads'
		  editor.customConfig.uploadImgHeaders = {'Authorization':'Bearer '+localStorage.token}
		  editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
		  editor.customConfig.uploadFileName = 'wang';
		  
		  editor.customConfig.menus = [//自定义菜单
		    'head',//标题
		    'bold',//粗体
		    'italic',//斜体
		    'underline',//下划线
		    'strikeThrough',//删除线
		    'foreColor',  //文字颜色
		    'backColor',  //背景颜色
		    'link',  // 插入链接
		    'list',  // 列表
		    'justify',  //对齐方式
		    'quote',  //引用
		    // 'emoticon',  //表情
		    'image',  //插入图片
		    'table',  //表格
		    // 'video',  //插入视频
		    'code',  //插入代码
		    'undo',  //撤销
		    'redo'  //重复
		  ];editor.create();
		  this.editor = editor;
		 this.git_gy();
		 
	    window.setTimeout(()=>{
			this.git_put_act();
		},500)
		 
		 
		  // editor.style={'z-index':0};
	  }
	};
</script>
<style scoped="scoped">
	/* 解决编辑框层级太高==》覆盖其他元素的问题 */
		.w-e-menu{
	  z-index: 2 !important;
	}
	.w-e-text-container{
	  z-index: 1 !important;
	}
	/*  */
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
