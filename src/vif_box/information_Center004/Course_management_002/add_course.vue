<template>
	<!-- 课程库编辑添加 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 10px;">
	   
	  <div class="box_tall">
		  <!-- <p v-if="top_show" style="width:350px;">{{lx_val}}</p>  -->
		  <el-select :disabled='top_show' class='tab_c' @change='lx_cl' v-model="lx_val" placeholder="请选择">
		      <el-option  :label="'机构'" :value="'机构'"></el-option>
			  <el-option  :label="'学校'" :value="'学校'"></el-option>
		  </el-select>
		  
		 <p>*所属类型:</p>
	  </div>
	  
	  <div class="box_tall">
		     <!-- <p v-if="top_show" style="width:350px;">{{dw_val}}</p>  -->
	  		  <el-select :disabled='top_show' class='tab_c' @change='dw_cl' v-model="dw_val" placeholder="请选择">
	  		      <el-option v-for='i in dw_box'  :label="i.name" :value="i.institution_id?i.institution_id:i.school_id"></el-option>
	  		  </el-select>
	  		 <p>*所属单位:</p>
	  </div>
	  
	 <div class="box_tall">
		  <el-input class='tab_c' placeholder="请输入内容" v-model="input[0]" clearable></el-input>
	      <p>*机构/学校课程名称:</p>
	  </div>
      <div class="box_tall">
		  <el-input class='tab_c' placeholder="请输入内容" v-model="input[1]" clearable></el-input>
	      <p>*平台课程名称:</p>
	  </div>
       
	 <div class="box_tall">
	  		  <el-select class='tab_c' :disabled='top_show' @change='ml_cl' v-model="ml_val" placeholder="请选择">
	  		      <el-option v-for='(i,index) in ml_box'  :label="i.name" :value="i.id"></el-option>
	  		  </el-select>
	  		 <p>*课程门类:</p>
	  </div>
      
	  <div class="box_tall">
		      <el-select class='tab_c_f' @change='nian_cl_max' v-model="nian_max_val" placeholder="请选择">
		          <el-option v-for='(i,index) in nian_box'  :label="i" :value="index"></el-option>
		      </el-select>
			   <p style="float:right;margin-left:10px;">--</p>
	  		  <el-select class='tab_c_f' @change='nian_cl_min' v-model="nian_min_val" placeholder="请选择">
	  		      <el-option v-for='(i,index) in nian_box'  :label="i" :value="index"></el-option>
	  		  </el-select>
	  		 <p>*适合年级:</p>
	  </div>

	<div class="box_tall">
		<el-input class='tab_c_f' type='Number' placeholder="最大人数" v-model="input[2]" clearable></el-input>
		<p style="float:right;margin-left:10px;">--</p>
		<el-input class='tab_c_f' type='Number' placeholder="最小人数" v-model="input[3]" clearable></el-input>
		<p>*适合人数:</p>
	</div>	
	
	<div class="box_tall" style="height:150px;">
		<textarea v-model="input[4]" class="textarea_cs"></textarea>
		<p>*课程目标:</p>
	</div>	
	
	<div class="box_tall" style="width:620px;padding: 0;">
	   <div class='tab_c' style="height:auto;width:360px;">
		   <div style="width:50%;padding-top:10px;">
			   <el-radio v-model="radios" label="0">否</el-radio>
               <el-radio v-model="radios" label="1">是</el-radio>
		   </div>
		    <el-card v-show='radios==1' style="width:100%;height:300px;margin:20px 0;border-radius:3px;padding: 0;">
			   <p style="font-size:14px;line-height:21px;text-align:center;width:100%;margin: 0;font-weight:400;">本课程需使用耗材/设备/教材，须家长自备，请家长自行采购，平台不统一购买。请家长参考须自备的耗材/设备/教材，再决定是否购买本课程！</p>
		       <textarea v-model="inputse" class="textarea_cs" maxlength="50" style="width: 100%;height:160px;margin-top:20px;line-height:25px;"></textarea>
			   <p v-if="inputse" style="font-weight:400;margin-top:5px;font-size:13px;">{{inputse.length}}/50</p>
		   </el-card>
	   </div>
		<p>*是否需要耗材/设备/教材:</p>
	</div>	
	
<!-- 封面图  action="https://jsonplaceholder.typicode.com/posts/"	-->
	<div class="box_tall" style="height:150px;width:700px;margin-left:50px;">
		<div class="img-box">
			<el-upload
			  :action=url_img
			  :headers=headers_s
			  name='images'
              list-type="picture-card"
             :on-preview="handlePictureCardPreview"
			 :on-success='handle_img_ok'
			 :on-error='handle_img_no'
			 :limit='3'
			 :file-list='img_file'
             :on-remove="handleRemove">
			<el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"> 
              <i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i>
			 </el-tooltip>
          </el-upload>
		</div>
		<p>*封面图:</p>
	</div>	
	
	<div class="box_tall" style="width:900px;float: left;height:auto;">
		<div style="width:650px;float:right;">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
            </el-checkbox-group>
		</div>
		<p>*课程特色:</p>
	</div>	
   
    <div class="box_tall" style="float: left;width:100%;height:auto;">
		<div style="float:left;margin:10px 0;width:60%;height:40px;">
		  <p style="float:left;margin-left:100px;">*课程大纲:</p>
		  <a :href="xia_url"><el-tooltip class="item" effect="dark" content="请按照模板格式填写" placement="top"> 
			 <el-button style='margin:0 10px 0 0px;float:left;' type="primary">下载模板<i class="el-icon-download el-icon--right"></i></el-button>
		     </el-tooltip>
		   </a>
           <el-button @click='btnClick' style='height:36px;font-size:14px;margin-right:10px;' size="small" type="success">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
		   <a style="color:#A8A9A9;">{{file_name}}</a>
           <input class="input-file" type="file" @change="handleFile" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
		</div>
	   <transition name="el-zoom-in-top">
		   <div v-show="excle_html" class="excel_box" v-html="excle_html"></div>
	   </transition>
	
	<p style="float:left;margin-left:100px;width:70%;margin-top:20px;">*课程简介:</p>
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

<script>
	 import store from "../../../vuex/store.js";
     export default {
	  computed:{
		 url_img(){return store.state.url_data+'/api/uploads'},
		 headers_s(){return {'Authorization':'Bearer '+localStorage.token}},
		 img_file(){return this.file_list}
	  },
		 
	  data(){
	    return {
			inputse:'',
			 radios:'0',
			 file_name:'',//文件名
			 xia_url:'https://smartzt.oss-cn-shenzhen.aliyuncs.com/operate/4791661562294214.xlsx',//下载模板的地址链接
			 checkAll: false,
             checkedCities: [],//选中的数组
             cities:[],//标签选项数组
             isIndeterminate: false,
			dialogImageUrl:'',
			dialogVisible: false,
			img_url_box:[],//封面图url容器
			nian_box:['1年级','2年级','3年级','4年级','5年级','6年级','7年级','8年级','9年级'],
			nian_min_val:'',
			nian_min_id:'',
			nian_max_val:'',
			nian_max_id:'',
			input:[],
			loading:false,
			lx_val:'学校',
			dw_box:[],
			dw_val:'',
			dw_id:'',
			ml_box:[],
			ml_val:"",
			ml_id:'',
			excel_unit:'',//传递的内容
			excel_url:'',//源文件url由后台返回
			excle_html:'',//表格html
			editor:'',
			top_show:false,
			lx_name:'',
			file_list:[],//{name: 'food.jpg', url:'https://xxx.cdn.com/xxx.jpg'}
			show_unm:true,
		}
	  },
	  methods:{
	   
		git_active(){//提交按钮被点击
		   if(this.dw_id==''){this.$message.error('所属单位不能为空');return false;}
		   if(this.input[0]){}else{this.$message.error('机构/学校课程名称不能为空');return false;}
		   if(this.input[1]){}else{this.$message.error('平台课程名称不能为空');return false;}
		   
		   if(this.ml_id==''){this.$message.error('课程门类不能为空');return false;}
		   if(this.nian_min_id){}else{this.$message.error('最小年级不能为空');return false;}
		   if(this.nian_max_id){}else{this.$message.error('最大年级不能为空');return false;}
		   if(this.nian_max_id>=this.nian_min_id){}else{this.$message.error('“最大年级”不能小于“最小年级”');return false;}
			
		   if(this.input[3]){}else{this.$message.error('最小人数不能为空');return false;}
		   if(this.input[2]){}else{this.$message.error('最大人数不能为空');return false;}
		   if(this.input[2]>=this.input[3]){}else{this.$message.error('“最大人数”不能小于“最小人数”');return false;}
		   
		   if(this.input[4]){}else{this.$message.error('课程目标不能为空');return false;}
		   
		   if(this.radios=='1'){//判断为需要 耗材/设备/教材
			   if(this.inputse){}else{this.$message.error('请填写耗材/设备/教材清单');return false;}
		   }else if(this.radios=='0'){
			   this.inputse = '';
		   }
		   
		   console.log(this.img_url_box);
		   
		   if(this.img_url_box.length==0){this.$message.error('封面图至少上传一张');return false;}
		   
		   if(this.checkedCities.length==0){this.$message.error('课程特色为必选');return false;}
		   if(this.excel_url==''){this.$message.error('必须上传课程大纲');return false;}
		   
		   // if(this.editor.txt.text()){}else{this.$message.error('课程简介不能为空');return false;}
		   var r = /img/;　　//正整数
		   if(r.test(this.editor.txt.html())||this.editor.txt.text()){}else{
		   		this.$message.error('请填写简介！');return false;
		    }
		   
		   if(this.show_unm){
		      this.show_unm = false;
		      window.setTimeout(()=>{
		   	   this.show_unm = true;
		      },5000)
		   }else{return false;}
		   
		   let type = sessionStorage.course_id?'put':'post';
		   var postData = {
		               source_type:this.lx_val=='机构'?1:2,//所属类型
		               source_id:this.dw_id,//所属单位
					   
		               name:this.input[0],//机构/学校课程名称
		   			   title:this.input[1],//平台课程名称
		               revised_name:this.input[1],//名字
					   
		               category_id:this.ml_id,//课程分类id
					   
		               min_grade:this.nian_min_id,//最小年级
		               max_grade:this.nian_max_id,//最大年级
					   
		               min_students:this.input[3],//最小人数
		               max_students:this.input[2],//最大人数
		               target:this.input[4],//课程目标
					   
					   material_text:this.inputse,//耗材/设备/教材
					   
		               cover_img1:this.img_url_box[0],//封面图
		   			   cover_img2:this.img_url_box[1],
		   			   cover_img3:this.img_url_box[2],
					   
		               course_tags:this.checkedCities,//标签集合
		               file_dir:this.excel_url,//excel_url
		               detail:this.excel_unit,//excel文件
		               intro:this.editor.txt.html()//课程简介html
		         };
		    console.log(postData,'传递过去的数据')
			let id = sessionStorage.course_id?'/'+sessionStorage.course_id:'';
		   this.$axios({method:type,url:store.state.url_data+'/api/courses'+id,data:postData,headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
				console.log(res.data,'添加课程结果');
		        if(res.data.code==200){
					this.$message({message:'成功',type:'success'});
					this.$router.go(-1);
		   		}else if(res.data.code==407){
					let box = res.data.data;let vals = '';
					for (var index in box){vals=box[index].join(' ')}  
					this.$message.error(vals)
					}
		      }).catch(error=> {});
		},
		
		 git_put_act(){
			if(sessionStorage.course_id){
				console.log('当前页面为编辑课程状态')
				console.log(sessionStorage.course_id);
				this.top_show = true;
			   this.$axios({method:'get',url:store.state.url_data+'/api/courses/'+sessionStorage.course_id,
			      headers:{'Authorization':'Bearer '+localStorage.token}}
			      ).then(res=>{
			   	    console.log(res.data.data,'编辑详情')
			        if(res.data.code==200){
						let datas = res.data.data;
						
						this.radios = datas.material_text?'1':'0';
						this.inputse = datas.material_text;
						
			   		    this.lx_val = datas.source_type==1?'机构':'学校'
						this.dw_val = datas.source_name;
						this.dw_id = datas.source_id;
						this.top_show = true;
						this.input[0] = datas.name;
						this.input[1] = datas.title;
						
						this.ml_id = datas.category_id;
						this.ml_val = datas.category_name;
						
						this.nian_min_id = datas.min_grade;
						this.nian_max_id = datas.max_grade;
						this.nian_min_val = datas.min_grade+'年级'
						this.nian_max_val = datas.max_grade+'年级'
						this.input[3] = datas.min_students;
						this.input[2] = datas.max_students;
						this.input[4] = datas.target;
						if(datas.cover_img1){this.img_url_box[0]=datas.cover_img1}
						if(datas.cover_img2){this.img_url_box[1]=datas.cover_img2}
						if(datas.cover_img3){this.img_url_box[2]=datas.cover_img3}
						
						console.log(this.img_url_box)
						
						for(var i=0;i<this.img_url_box.length;i++){
							if(this.img_url_box[i]){
								this.file_list.push({name:'i',url:this.img_url_box[i]})
							}
						}
					    console.log(this.file_list)
						this.checkedCities = datas.course_tags;
						this.excel_url = datas.file_dir;
						this.excel_unit = datas.units;
						this.excle_html = this.excls(datas.units);
						this.editor.txt.html(datas.intro)
			   		}
			      }).catch(error=> {});
			}else{
				console.log('当前页面为添加课程状态');
				this.top_show = false;
			}
		},
		
		quxioa(){
			this.$router.go(-1);
		},	
//富文本编辑框
     
//上传excel文件
      btnClick(){
      	document.querySelector(".input-file").click();//事件委托
      },
	  git_file(files){//上传文件函数
	    var formData = new FormData();formData.append("excel",files); 
		this.$axios({method:'post',url:store.state.url_data+'/api/uploads',data:formData,headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
		     if(res.data.code==200){
				 this.excel_url = res.data.data.excel;
				 console.log(this.excel_url)
				 return this.$message({message:'上传成功！',type:'success'});
		     }else{return this.$message.error('上传失败')}
		   }).catch(error=> {return this.$message.error('上传失败')});  
	  },
	   excls(excelObj){//解析excel文件，转成表格html
	  	var tableStr = '',rowStr = '';
	  	for (var i = 0; i < excelObj.length; i++) {
	  	        for (var j = 0; j < excelObj[i].class.length; j++) {
	  	          if (j == 0) {
	  	            rowStr += '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
	  	              excelObj[i].class[j].name +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;">' +
	  	              excelObj[i].class[j].title +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
	  	              excelObj[i].class[j].content +
	  	              '</td>'
	  	            tableStr += '<tr>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;" rowspan="' + excelObj[i].class.length + '">' +
	  	              excelObj[i].name +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;" rowspan="' + excelObj[i].class.length + '">' +
	  	              excelObj[i].title +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px;text-align:justify;" rowspan="' + excelObj[i].class.length + '">' +
	  	              excelObj[i].content +
	  	              '</td>' +
	  	              rowStr +
	  	              '</tr>'
	  	          } else {
	  	            rowStr += '<tr style="text-align:center;border:1px solid #ccc;">' +
	  	              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
	  	              excelObj[i].class[j].name +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
	  	              excelObj[i].class[j].title +
	  	              '</td>' +
	  	              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
	  	              excelObj[i].class[j].content +
	  	              '</td>' +
	  	              '</tr>'
	  	            tableStr += rowStr
	  	          }; rowStr = ''
	  	        }
	  	      };
	     let boxs = `<table class="course-table" style="width:100%;float:left;">
		      <tr style='background:#409eff'><th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>单元</th>
		      <th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>单元标题</th>
		      <th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>单元目标</th>
		      <th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>课时编号</th>
		      <th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>课时名称</th>
		      <th style='padding:10px 20px;border:1px solid #ccc;text-align:center;width: 200px;'>课时内容</th>
		      </tr><tbody>`+tableStr+`</tbody></table>`;
	  	return boxs
	  },
      handleFile(e){//读取excel文件
		this.file_name = e.target.files[0].name;
		this.git_file(e.target.files[0]);
        do_file(e.target.files,data=>{
          var excelObj = resolving_new(data).unit;
		  this.excel_unit = excelObj
          console.log(this.excel_unit);
          this.excle_html =  this.excls(this.excel_unit);
		  
		  this.input[4] = resolving_new(data).target;
          this.editor.txt.text(resolving_new(data).intro);
          
        })
      },
	  
//标签选择函数		
      handleCheckedCitiesChange(value) {//任意一项被点击
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		console.log(this.checkedCities)
      },
	  git_check(){//获取课程特色数据
		this.$axios({method:'get',url:store.state.url_data+'/api/tags/options?type=1',
		   headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
			 // console.log(res.data.data,'课程特色')
		     if(res.data.code==200){
					this.cities = res.data.data;
				}
		   }).catch(error=> {});
	  },
		  
//上传图片相关函数		  
	   handleRemove(file, fileList) {//删除图片
		this.img_url_box = [];
		
		// console.log(fileList)
		
		for(var i=0;i<fileList.length;i++){this.img_url_box.push(fileList[i].url)}
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
		  
//所属类型被点击==获取所属单位数据		  
		  lx_cl(){
			 this.dw_val = '';
			 this.dw_id = '';
			 var urls = this.lx_val=='机构'?'institutions':'schools';
			 this.$axios({method:'get',url:store.state.url_data+'/api/'+urls+'?type=options&audit_status=2',
			    headers:{'Authorization':'Bearer '+localStorage.token}}
			    ).then(res=>{
			       console.log(res.data.data,'课程单位数据');
			      if(res.data.code==200){
			 			this.dw_box = res.data.data;
			 		}
			    }).catch(error=> {});
		  },
//所属单位被点击
		  dw_cl(i){
			  console.log(i)
			  this.dw_id = i
		  },
		  
		  
//获取课程门类数据	
		  git_ml(){
			this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',
			   headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
			      // console.log(res.data.data,'课程门类数据');
			     if(res.data.code==200){
						this.ml_box = res.data.data;
					}
			   }).catch(error=> {});  
		  },
//课程门类被点击		
		  ml_cl(i){
			console.log(i);
			 this.ml_id = i
		  },
		  
//适合最da年级被点击		  
		 nian_cl_max(i){
			 this.nian_max_id = i+1
			 console.log(this.nian_max_id,'最大年级');
		 },
//适合最小哦年级被点击		  
		 nian_cl_min(i){
			 this.nian_min_id = i+1
			 console.log(this.nian_min_id,'最小年级');
		 },		  
	
	  },
	  mounted(){
//富文本编辑框初始化
		   var E = window.wangEditor;
		   let editor2 = document.getElementById('editor2');let editor3 = document.getElementById('editor3');
		   // var editor = new E(editor2,editor3);
		   
		    var editor = new E(editor2,editor3)
		  
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
		  
		  this.lx_cl();
		  
		  this.git_ml();
		  this.git_check();
		  
		  this.git_put_act();
		  // xlf.addEventListener('change',this.handleFile, false)
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
