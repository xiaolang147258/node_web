<template>
	<!-- 商品库编辑添加 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 10px;">
	   
	<div class="box_tall">
		<el-input class='tab_c' placeholder="请输入内容" v-model="shang.title" clearable></el-input>
	    <p>*商品名称:</p>
	</div>
	
	<div class="box_tall">
		<el-input class='tab_c' placeholder="请输入内容" v-model="shang.url" clearable></el-input>
	    <p>*下载地址:</p>
	</div>
	
	<div class="box_tall">
		   <a style="float: right;line-height:38px;margin-left:10px;font-weight:600;margin-right:177px;">M</a>
		   <el-input type='number' style="width: 150px;" class='tab_c' placeholder="请输入" v-model="shang.size" clearable></el-input>
	     <p>*商品大小:</p>
	 </div>
	 
	 <div class="box_tall">
	 	   <el-select class='tab_c' style='width: 150px;margin-right:200px;' @change='lei' v-model="lei_val" placeholder="请选择类型">
	 	      <el-option v-for="(item,index) in lei_box" :key="item.id" :label="item.name" :value="item.id"></el-option>
	 	   </el-select>
	      <p>*商品类型:</p>
	  </div>
	 
	 
<!-- 商品头像图片  action="https://jsonplaceholder.typicode.com/posts/"	-->	
	<div class="box_tall" style="height:160px;width:700px;margin-left:50px;">
		<div class="img-box" style="height: 160px;">
			<el-upload 
			  class="avatar-uploader"
			  :action=url_img
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :on-error='handle_img_no2'
			  name='myfile'>
			  <img v-if="shang.img_title" :src="shang.img_title" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		<p>*商品头像:</p>
	</div>
	
<!-- 商品内容图片  action="https://jsonplaceholder.typicode.com/posts/"	-->
	<div class="box_tall" style="height:150px;width:900px;margin-left:50px;">
		<div class="img-box" style="width: 700px;">
			
		<el-upload :action=url_img list-type="picture-card" :on-preview="handlePictureCardPreview" :on-success='handle_img_ok' :on-error='handle_img_no'
			 :limit='4' name='myfile' :on-remove="handleRemove" :file-list='img_files1'>
			<el-tooltip class="item" effect="dark" content="建议上传4x8比例且清晰的图片" placement="right-start"> 
              <i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i>
			 </el-tooltip>
          </el-upload>
		  
		</div>
		<p>*封面图:</p>
	</div>	
	
	<div class="box_tall">
		<el-switch  class='tab_c' v-model="shang.jin_num" active-color="#E6A23C" inactive-color="#909399"></el-switch>
	    <p>普通 / 精选:</p>
	</div>
	
    <div class="box_tall" style="float: left;width:100%;height:auto;">
	<p style="float:left;margin-left:100px;width:70%;margin-top:20px;">*商品简介:</p>
	   <div id="editor2"  style="border:1px solid #ccc;float:left;width:80%;margin-left:110px;border-bottom:none;margin-top:10px;"></div>
	   <div id="editor3" class="text" style="float:left;margin-left:110px;height:600px"></div>
	   <div style="width: 100%;height:40px;float: left;margin-top: 30px;">
		    <div style="width: 210px;height: 100%;margin: 0 auto;">
				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
				<el-button @click='git_active' style='float:right;' type="primary">确认提交</el-button>
			</div>
	   </div>
    </div>	
 </el-card>
 
 <!-- 全屏预览图片 -->
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
 </el-dialog>
</div>
</template>

<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
   width: 150px;
   height: 150px;
    display: block;
  }
</style>

<script>
	 import store from "../../../vuex/store.js";
     export default {
	  computed:{
		 url_img(){return store.state.url_data+'/imgage'},
		 headers_s(){return {'Authorization':'Bearer '+localStorage.token}},
		 img_file(){return this.shang.img_box},
		 img_files1(){return this.file_list},
		 
		 
		 img_box(){ return (box)=>{ return box.split(",")}},//将字符窜转数组
	  },
		 
	  data(){
	    return {
			lei_box:[{name:'软件',id:1},{name:'游戏',id:2}],
			lei_val:1,
			
			shang:{
				img_title:'',
				title:'',
				img_box:[],
				size:'',
				type:'',
				jin_num:false,
				value:'',
				url:'',
				id:''
			},
			
			inputse:'',
			 radios:'0',
			 file_name:'',//文件名
			 
             isIndeterminate: false,
			dialogImageUrl:'',
			dialogVisible: false,
			img_url_box:[],//封面图url容器
			
			editor:'',
			top_show:false,
			lx_name:'',
			file_list:[],//{name: 'food.jpg', url:'https://xxx.cdn.com/xxx.jpg'}
			
			show_unm:true,
			imageUrl:'',
			loading:false
		}
	  },
	  methods:{
		  lei(){
			console.log(this.lei_val)  
		  },
		  
	     handleAvatarSuccess(response,res,file) {
				// this.shang.img_title = store.state.url_data+'/img/'+response.data.url;
				this.shang.img_title = response.url;
				console.log(this.shang.img_title);
				this.$message({message: '上传成功',type: 'success' });
	     },
		 
		 handle_img_no2(err, file, fileList){//图片上传失败
		     this.$message.error('上传失败');console.log(err)
		 },
		 
		 //上传图片相关函数
		 	   handleRemove(file, fileList) {//删除图片
		 		this.shang.img_box = [];
		 		// for(var i=0;i<fileList.length;i++){this.shang.img_box.push(store.state.url_data+'/img/'+fileList[i].name)}
				for(var i=0;i<fileList.length;i++){this.shang.img_box.push(fileList[i].name)}
		 		console.log(this.shang.img_box)
		       },
		 	  handle_img_ok(response, file, fileList){//图片上传成功
		 	    this.$message({message: '上传成功',type: 'success' });
		 		// this.shang.img_box.push(store.state.url_data+'/img/'+response.data.url);
				this.shang.img_box.push(response.url);
		 		console.log(this.shang.img_box)
		 	  },
		 	  handle_img_no(err, file, fileList){//图片上传失败
		 	      this.$message.error('上传失败');console.log(err)
		 	  },
		       handlePictureCardPreview(file) {//点击预览图片
		         this.dialogImageUrl = file.url;this.dialogVisible = true;
		       },
		 
		 
		git_active(){//提交按钮被点击
		   if(this.shang.title==''){this.$message.error('商品名称不能为空');return false;}
		   if(this.shang.url==''){this.$message.error('下载地址不能为空');return false;}
		   if(this.shang.size){}else{this.$message.error('商品大小不能为空');return false;}
		   if(this.shang.img_title==''){this.$message.error('商品头像必须上传');return false;}
		   if(this.shang.img_box.length==0){this.$message.error('介绍图至少上传一张');return false;}
		   var r = /img/;　　//正整数
		   if(r.test(this.editor.txt.html())||this.editor.txt.text()){}else{this.$message.error('请填写简介！');return false;}
		   
		   var postData = {
		             img_title:this.shang.img_title,
					 title:this.shang.title,
					 img_box:this.shang.img_box,
					 jin_num:this.shang.jin_num?'2':'1',//精选
		             value:this.editor.txt.html(),//课程简介html
					 size:this.shang.size,//商品大小
					 url:this.shang.url,//下载地址
					 type_lei:this.lei_val,//商品类型
					 id:this.shang.id
		         };
		    console.log(postData,'传递过去的数据')
			
		   let put_s = store.state.shang_put_box?'/delect_shang':'/create_shang';
		   console.log(store.state.shang_put_box?'编辑':'添加',put_s)
		   
		   this.$axios({method:'post',url:store.state.url_data+put_s,data:postData,headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
				console.log(res.data,'添加商品结果');
		        if(res.data.code==200){
					store.state.shang_put_box = '';
					this.$message({message:'成功',type:'success'});
					// this.$router.go(-1);//返回上一页
					this.$router.push({path:'/node_js_user02'});
		   		}else if(res.data.code==407){}
		      }).catch(error=> {});
		},
		
		
		
		 git_put_act(){//判断是否为编辑
			if(store.state.shang_put_box){
			   let box = store.state.shang_put_box
				
				this.shang.title = box.title;
				this.shang.size = box.size;
				this.shang.id = box.id;
			
			//获取下载地址///////
			this.$axios({method:'post',url:store.state.url_data+'/select_url',data:{shang_id:box.id},headers:{'Authorization':'Bater '+localStorage.login_token}}
				   ).then(res=>{
				      console.log(res.data,'数据');
				     if(res.data.code==200){this.shang.url =res.data.data; }
				   }).catch(error=> {if (error.response) {}});
			///////////////////		
				this.lei_val = Number(box.type_lei);
				this.shang.img_title = box.img_title;
				
				let url_box = this.img_box(box.img_box);
				
				for(var i=0;i<url_box.length;i++){
					if(url_box[i]){
						this.file_list.push({name:url_box[i],url:url_box[i]})
					}
				}
				this.shang.img_box = url_box;
				
				this.shang.jin_num = (box.jin_num==1)?false:true;
				this.editor.txt.html(box.value);
			}
		},
		
		quxioa(){
			this.$router.go(-1);
			store.state.shang_put_box = '';
		},	
		
	  },
	  mounted(){
//富文本编辑框初始化
		   var E = window.wangEditor;
		   let editor2 = document.getElementById('editor2');let editor3 = document.getElementById('editor3');
		   var editor = new E(editor2,editor3)
		  	editor.customConfig.uploadImgShowBase64 = false;   // 不使用 base64 保存图片
		  	editor.customConfig.uploadImgServer = store.state.url_data+'/imgage'
		  	editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
		  	editor.customConfig.uploadFileName = 'myfile';
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
		  this.git_put_act();
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
	.course-table tbody tr{
		width: 100%;
		border: 1px solid #ccc;
	}
	.course-table tbody td{
		padding: 5px 20px;
		border: 1px solid #ccc;
		text-align: center;
	}
	.course-table th{
		padding:10px 20px;
		border: 1px solid #ccc;
		text-align: center;
		width: 200px;
	}
	.input-file{
		BACKGROUND-COLOR: transparent;opacity:0;
		display: none;
	}
	.excel_box{
		width: 95%;
		float:left;
		margin-top: 20px;
		float: right;
	}
	.img-box{
		float: right;
		width: 500px;
		height:150px;
		overflow: hidden;
	}
	.textarea_cs{
		height:100%;border:1px solid #d7dae2;border-radius:3px;padding:7px;width:350px;float:right;font-size:14px;
	}
	.tab_c_f{
		height: 40px;
		width: 160px;
		float: right;
	}
	.tab_c{
		width:350px;
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
	}
	
</style>
