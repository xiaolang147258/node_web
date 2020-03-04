<template>
    <!-- 班级名单 -->
    <div style="width:100%;">
        <el-card v-loading="loading" class="box-card" style="padding:0;margin:20px;padding-bottom: 20px;">
            <div style="width:100%;margin-bottom:10px;float: left;">

                <!-- <el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="托管时段">
                   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select> -->

                <!-- <el-time-select value-format='HH-mm' class='tab_c' style='width:150px;'  v-model="valuedate" :picker-options="{start:'08:30',step:'00:15',end:'18:30'}" placeholder="选择时间段"> -->

                <el-date-picker
                        value-format='yyyy-MM-dd' class='tab_c' style='width:150px;' v-model="valuedate"
                        @change='git_act(1)'
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>

                <!--		</el-time-select>-->

                <el-select class='tab_c' @change='zt_cl' style='width:150px;' v-model="sh_val"  placeholder="托管类型">
                    <el-option :label="'午托'" :value="'noon'"></el-option>
                    <el-option :label="'晚托'" :value="'afternoon'"></el-option>
                </el-select>

                <!-- <el-date-picker class='tab_c' style='width:150px;' value-format='yyyy-MM' @change='git_act(1)'
                                v-model="value4" type="month" placeholder="托管月份"></el-date-picker> -->

                <div class='inp_a' style='width:150px;'>
                    <el-input placeholder="请输入托管标题" v-model="masg_val" clearable></el-input>
                </div>
                <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>

                <el-button @click='create_date("")' style='float:right;' type="primary">添加信息</el-button>
            </div>

            <div style="width:100%;float: left;">
                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">

                    <el-table-column prop="sku_name" align='center' header-align='center' label="标题"></el-table-column>
                    <el-table-column prop="total_price" class='tds' align='center' header-align='center'
                                     label="金额"></el-table-column>
                    <el-table-column prop="start_format" align='center' header-align='center'
                                     label="开始时间"></el-table-column>
                    <el-table-column prop="end_format" class='tds' align='center' header-align='center' label="结束时间"
                                     show-overflow-tooltip></el-table-column>

                    <el-table-column prop="period_type" align='center' header-align='center' label="托管类型">
                        <template slot-scope="scope">{{scope.row.period_type==1?'月度托管':'学期托管'}}</template>
                    </el-table-column>

                    <el-table-column prop="hosting_type" align='center' header-align='center' label="托管时段"
                                     show-overflow-tooltip>
                        <template slot-scope="scope">{{scope.row.hosting_type=='noon'?'午托':'晚托'}}</template>
                    </el-table-column>

                    <!-- <el-table-column prop="month" class='tds' align='center' header-align='center' label="托管月份"
                                     show-overflow-tooltip></el-table-column> -->

                    <el-table-column prop="total_days" align='center' header-align='center' label="托管天数" show-overflow-tooltip></el-table-column>
                               
                    <!-- <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center'label="状态">
                        <template slot-scope="scope"><a>{{scope.row.active==0?'下架':'上架'}}</a></template>
                    </el-table-column> -->


                    <!-- <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center' label="状态" show-overflow-tooltip> -->
                                    
                        <!-- <template slot-scope="scope"> -->
							<!-- <div v-show='scope.row.active==0' style="margin-bottom:5px;"><el-button  @click='create_date(scope.row)' type="primary" plain> 编辑</el-button></div> -->
                            <!-- <div style="margin-bottom:5px;"><el-button  :disabled='scope.row.active==0?false:true' @click='create_date(scope.row)' type="primary" plain> 编辑</el-button></div> -->
							<!-- <el-button @click='type_cl(1,scope.row)' v-if='scope.row.active==0' type="success">上架</el-button>
                            <el-button @click='type_cl(0,scope.row)' v-else type="danger">下架</el-button> -->
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
            <transition name="el-fade-in-linear">
                <div v-show="show_meng" class="transition-box">
                    <transition name="el-zoom-in-top">
                        <div v-show="show_meng" class="transition-box_child">
                            <p class="p_title">添加/编辑普惠套餐</p>
                            <div class="divbox">
                                <el-input class='tall' placeholder="请输入(不能超过25个字)" v-model="input[0]"
                                          clearable></el-input>
                                <p>*托管标题:</p>
                            </div>

                            <div class="divbox">
                                <el-select class='tall' v-model="tuo_lei" placeholder="托管类型">
                                    <el-option :label="'月度托管'" :value="'月度托管'"></el-option>
                                    <el-option :label="'学期托管'" :value="'学期托管'"></el-option>
                                </el-select>
                                <p>*托管类型:</p>
                            </div>

                            <!-- <div class="divbox">
                                   <el-date-picker class='tall' v-if='tuo_lei=="月度托管"' v-model="tuo_yue" type="month" placeholder="选择月"></el-date-picker>
                                 <div v-else class='tall'>
                                     <el-date-picker style='width:135px;float:left;' v-model="tuo_yue_2[0]" type="month" placeholder="起始月份"></el-date-picker>
                                     <el-date-picker style='width:135px;float:right;' v-model="tuo_yue_2[1]" type="month" placeholder="结束月份"></el-date-picker>
                                 </div>
                                 <p>*托管月份:</p>
                            </div> -->

                            <div class="divbox">
                                <el-select class='tall' v-model="tuo_date_lei" placeholder="托管时段类型">
                                    <el-option :label="'午托'" :value="'午托'"></el-option>
                                    <el-option :label="'晚托'" :value="'晚托'"></el-option>
                                </el-select>
                                <p>*托管时段:</p>
                            </div>

                            <div class="divbox">
                                <el-date-picker class='tall' value-format='yyyy-MM-dd' @change='que_date'
                                                v-model="tuo_date[0]" type="date" placeholder="选择日期"></el-date-picker>
                                <p>*开始日期:</p>
                            </div>

                            <div class="divbox">
                                <el-date-picker class='tall' value-format='yyyy-MM-dd' @change='que_date'
                                                v-model="tuo_date[1]" type="date" placeholder="选择日期"></el-date-picker>
                                <p>*结束日期:</p>
                            </div>

                            <div class="divbox">
                                <div class="tall">{{date_ri}}天</div>
                                <p>*服务天数:</p>
                            </div>
                            <div class="divbox">
                                <div class="tall">{{marenr}}￥</div>
                                <p>*金额:</p>
                            </div>

                            <div class="inp_box" style="width:170px;">
                                <el-button @click='show_meng=false' style='float:left;' type="info">取消</el-button>
                                <el-button @click='git_num' style='float:right;' type="primary">确认</el-button>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        </el-card>
    </div>
</template>

<script>

  import store from '../../../vuex/store.js'

  export default {
    data() {
      return {
        valuedate: '',//赛选的时间段

        marenr: 0,
        date_ri: 0,
        hosting_price: 5,

        tuo_date: ['', ''],
        tuo_date_lei: '',//托管时间段类型

        tuo_yue_2: ['', ''],//托管月份时间段
        tuo_yue: '',//托管月份

        tuo_lei: '月度托管',//托管类型
        input: [],

        show_meng: false,
        value4: '',//月份

        input_val: '',

        sh_val: 'noon',
        sh_zt_box: [],
        sh_zt_id: 'noon',

        total_01: 0,//分页-总条数
        ye_s: [15],

        lx_box: [],
        lx_id: '',//类型id
        lx_val: '',

        masg_val: '',//搜索输入框数据

        tableData3: [],//列表数据

        multipleSelection: [],
        loading: true,

        itrm: '',
        pages: 1,

        put_num: true
      }
    },

    methods: {

//上架下架按钮被点击		
      type_cl(i, item) {//上架为1下架为0
        console.log(item.hosting_type)
        this.$axios({
          method: 'put', url: store.state.url_data + '/api/hostingSkus/' + item.sku_id,
          data: {
            'active': i,
            'hosting_type': item.hosting_type
          }, headers: { 'Authorization': 'Bearer ' + localStorage.token }
        }).then(res => {
          console.log(res.data, '修改状态')
          if (res.data.code == 200) {
            this.$message({ message: '修改成功', type: 'success' })
            this.git_act(this.pages)
          } else {
            this.$message({ message: '修改失败', type: 'warning' })
          }
        }).catch(error => {
          this.$message({ message: '修改失败', type: 'warning' })
        })
      },

      create_date(i) {//添加||编辑被点击
        this.show_meng = true
        this.itrm = i
        if (i == '') {//判断为添加状态
          this.input[0] = ''
          this.tuo_lei = '月度托管'
          this.tuo_date = ['', '']
          this.tuo_date_lei = ''
          this.date_ri = 0
          this.marenr = 0
        } else {
					console.log(i);
          this.input[0] = i.sku_name
          this.tuo_lei = i.period_type==2?'学期托管':'月度托管';
          this.tuo_date = [i.start_format, i.end_format]
          this.tuo_date_lei = i.hosting_type == 'noon' ? '午托' : '晚托'
          this.date_ri = i.total_days
          this.marenr = i.hosting_price
        }
      },
      que_date(i) {//开始日期||结束日期被选定
        if (this.tuo_date[0]) {
        } else {
          this.date_ri = 0
          this.marenr = 0
          return false
        }
        if (this.tuo_date[1]) {
        } else {
          this.date_ri = 0
          this.marenr = 0
          return false
        }
        this.calculateDiffTime(this.tuo_date[0], this.tuo_date[1])
      },

//获取具体有多少天 	
      calculateDiffTime(start_time, end_time) {
        this.$axios({
          method: 'get', url: store.state.url_data + '/api/activeDays',
          params: {
            start_date: start_time,
            end_date: end_time
          }, headers: { 'Authorization': 'Bearer ' + localStorage.token }
        }).then(res => {
          console.log(res.data, '获取的时间')
          if (res.data.code == 200) {
            this.date_ri = res.data.data.total_days
            //this.marenr = this.date_ri*5;
            this.marenr = this.date_ri * this.hosting_price
          }
        }).catch(error => {
        })
      },

//提交数据
      git_num() {

        if (this.input[0]) {
        } else {
          this.$message({ message: '托管标题不能为空！', type: 'warning' })
          return false
        }

        if (this.input[0].length <= 25) {
        } else {
          this.$message({ message: '托管标题字数不能超过25个字！', type: 'warning' })
          return false
        }

        if (this.tuo_date_lei) {
        } else {
          this.$message({ message: '请选择托管时间段！', type: 'warning' })
          return false
        }

        if (this.tuo_date[0] == '' || this.tuo_date[1] == '') {
          this.$message({ message: '开始日期或者结束日期不能为空！', type: 'warning' })
          return false
        }

        let staer = new Date(this.tuo_date[0]).getTime()
        let enddate = new Date(this.tuo_date[1]).getTime()
        if (staer < enddate) {
        } else {
          this.$message({ message: '开始日期必须小于结束日期！', type: 'warning' })
          return false
        }

        if (this.tuo_lei == '月度托管') {
           let cre_date = new Date(this.tuo_date[0]).getMonth()+1
		   let end_date = new Date(this.tuo_date[1]).getMonth()+1
		   if(cre_date==end_date){}else{
			  this.$message({ message: '月度托管情况下，开始日期与结束日期的月份必须相同！', type: 'warning' })
			  return false;
		   }
        }else if(this.tuo_lei == '学期托管'){
					if (this.date_ri > 31) {
					} else {
					  this.$message({ message: '学期托管情况下，服务天数必须大于31天！', type: 'warning' })
					  return false
					}
		}
		
        if (this.put_num) {
          this.put_num = false
          window.setTimeout(() => {
            this.put_num = true
          }, 3000)
        } else {
          return false

        }

        let types = this.itrm == '' ? 'post' : 'put'
        let id = this.itrm == '' ? '' : '/' + this.itrm.sku_id
        this.$axios({
          method: types, url: store.state.url_data + '/api/hostingSkus' + id,
          data: {
            sku_name: this.input[0].replace(/\s*/g, ''),
            period_type: this.tuo_lei == '学期托管' ? 2 : 1,
            start_date: this.tuo_date[0],
            end_date: this.tuo_date[1],
            hosting_type: this.tuo_date_lei == '午托' ? 'noon' : 'afternoon',
            total_days: this.date_ri,
            hosting_price: this.hosting_price
          }, headers: { 'Authorization': 'Bearer ' + localStorage.token }
        }).then(res => {
          console.log(res.data, '添加状态')
          if (res.data.code == 200) {
            this.$message({ message: '提交成功', type: 'success' })
            this.show_meng = false
            this.git_act(this.pages)
          } else {
            this.$message({ message: '提交失败', type: 'warning' })
          }
        }).catch(error => {
          this.$message({ message: '提交失败', type: 'warning' })
        })
      },

      //分页相关函数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.git_act(val)
        this.pages = val
      },
      lx_cl(i) {
        // console.log(i);
        this.lx_id = i
        this.git_act(1)
      },
      zt_cl(i) {
        this.sh_zt_id = i
        this.git_act(1)
      },

      //获取列表数据函数
      git_act(pages) {
				this.loading = true;
        this.$axios({
          method: 'get', url: store.state.url_data + '/api/hostingSkus',
          params: {
            page: pages,
            search: this.masg_val,
            hosting_type: this.sh_val,
            time: this.valuedate,
            month: this.value4

          }, headers: { 'Authorization': 'Bearer ' + localStorage.token }
        }).then(res => {
          console.log(res.data, '数据')
          this.loading = false
          if (res.data.code == 200) {
            this.tableData3 = res.data.data
            this.total_01 = res.data.meta.total
          }
        }).catch(error => {
					this.loading = false;
					 if (error.response) {
					    console.log(error.response);
					    if(error.response.status==403){
					 		this.$notify({ title: '警告', message: '账号异常请重新登录',type: 'warning'});this.$router.push('/login');
					 	 }else{this.$message({message:'发生了错误，请联系技术中心！',type:'warning'})}
					  }
        })
      }

    },
    mounted() {

      this.git_act(1)

    }
  }

</script>
<style scoped="scoped">
    .divbox p {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        float: right;
    }

    .tall {
        float: right;
        width: 280px;
        margin-left: 10px;
    }

    .divbox {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin: 20px 0;
        padding: 0 50px 0 0;
    }

    .inp_box {
        width: 320px;
        height: 40px;
        margin: 20px auto;
    }

    .p_title {
        font-size: 15px;
        font-weight: 600;
        text-align: center;
        margin: 0 0 20px 0;

    }

    .transition-box_child {
        width: 450px;
        height: 550px;
        margin: 50px auto;
        background: white;
        border-radius: 5px;
        overflow: auto;
        padding-top: 30px;


    }

    .transition-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 500;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }

    .tds {
        text-align: center;
    }

    .tab_c {
        float: left;
        margin-right: 10px;
    }

    .inp_a {
        width: 200px;
        float: left;
        margin-right: 10px;
    }
</style>
