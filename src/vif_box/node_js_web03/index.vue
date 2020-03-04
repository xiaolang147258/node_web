<template><!-- 内部嵌入浏览器 -->
<div style="width:100%;">
  <div style="padding:20px;width: 100%;height:auto;">
	
	 <iframe src="http://www.baidu.com" id="mobsf" scrolling="no" frameborder="0" style="width:80%;float: left;"></iframe>	
	 
	 <el-card id="right_box" style="width:18.5%;float:right;">
		  <el-button @click='btn' type="primary">自动</el-button>
	 </el-card>
	 
	 
  </div>
</div>
</template>
<style scope></style>
<script>
	import store from "../../vuex/store.js";
	import $ from 'jquery';
     export default {
	  
	  computed:{
		  
	  },
	  data(){
	    return {}
	  },

	  methods:{
		  btn(){
			  var iframe = document.getElementById("mobsf");
			   var iwindow = iframe.contentWindow;
			   var idoc = iwindow.document;
			          // console.log("window",iwindow);//获取iframe的window对象
			          // console.log("document",idoc);  //获取iframe的document
			          // console.log("html",idoc.documentElement);//获取iframe的html
			          // console.log("head",idoc.head);  //获取head
			          console.log("body",idoc.body);  //获取body
			  
			    // idoc.body.input.val('123');
			  
			  
			  
			  
		  },
		  
		  
		  
		  
	  },
	  mounted(){
		/**
		      * iframe-宽高自适应显示   
		      */
		      function changeMobsfIframe(){
		        const mobsf = document.getElementById('mobsf');
				const right_box = document.getElementById('right_box');
		        const deviceWidth = document.body.clientWidth;
		        const deviceHeight = document.body.clientHeight;
		        mobsf.style.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差
				right_box.style.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差
		      }
		 
		      changeMobsfIframe()
		 
		      window.onresize = function(){
		        changeMobsfIframe()
		      
              }
		
	  }
	};
	
</script>
<style scoped="scoped">
	  
</style>
