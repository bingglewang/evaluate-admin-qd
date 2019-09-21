<template>
  <div class="record-list-container">
    <!-- <head-top></head-top>-->
    <div class="container-record">
      <div class="record-panel">
        <div class="filter-container-record">
          <div>
            <div class="filter-item-record">
              <span class="filter-item-label">小区/地址</span>
              <el-input placeholder="小区/地址" class="filter-item-content" v-model="address"
                        @keyup.enter.native="enterSearchRecordList" id="loupanFocus"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">楼<span style="visibility: hidden">楼栋</span>栋</span>
              <el-input placeholder="楼栋" class="filter-item-content" v-model="ownStatus"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">房<span style="visibility: hidden">楼栋</span>号</span>
              <el-input placeholder="房号" class="filter-item-content" v-model="indoorStructure"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">所属用户</span>
              <el-input placeholder="所属用户" class="filter-item-content" v-model="blongedUser"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
           <!-- <div class="filter-item-record">
              <span class="filter-item-label">查询结果</span>
              <el-input placeholder="查询结果" class="filter-item-content" v-model="queryResult"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>-->
            <div class="filter-item-record">
              <span class="filter-item-label">建筑面积</span>
              <el-input placeholder="建筑面积" class="filter-item-content" v-model="area" type="number"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
           <!-- <div class="filter-item-record">
              <span class="filter-item-label">建筑年代</span>
              <el-input placeholder="建筑年代" class="filter-item-content" v-model="buildYear" type="number"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>-->
           <!-- <div class="filter-item-record">
              <span class="filter-item-label">预期结果</span>
              <el-input placeholder="预期结果" class="filter-item-content" v-model="expectedPrice" type="number"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>-->
          </div>
          <div >
            <div class="filter-item-record">
              <span class="filter-item-label">朝<span style="visibility: hidden">楼/栋</span>向</span>
              <el-input placeholder="朝向" class="filter-item-content" v-model="orientation"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">装修程度</span>
              <el-input placeholder="装修程度" class="filter-item-content" v-model="degreeDecoration"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">景<span style="visibility: hidden">楼栋</span>观</span>
              <el-input placeholder="景观" class="filter-item-content" v-model="buildType"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">户<span style="visibility: hidden">楼栋</span>型</span>
              <el-input placeholder="户型" class="filter-item-content" v-model="houseType"
                        @keyup.enter.native="enterSearchRecordList"/>
            </div>
            <div class="filter-item-record">
              <span class="filter-item-label">结果异议</span>
              <!--<el-input placeholder="结果异议" class="filter-item-content" v-model="dissent"/>-->
              <el-select placeholder="结果异议" clearable class="filter-item-content" v-model="dissent"
                         @change="changeDissentHandler">
                <el-option v-for="item in dissentOption" :key="item.key" :label="item.label" :value="item.key"/>
              </el-select>
            </div>
          </div>
          <div>

            <div class="filter-item-record" style="margin-right: 20px">
              <span class="demonstration">查询时间</span>
              <el-date-picker
                v-model="queryTime"
                type="datetimerange"
                :picker-options="pickerOptions1"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right">
              </el-date-picker>
            </div>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getRecordList">搜索
            </el-button>
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                       @click="handleDownload">导出
            </el-button>
          </div>
        </div>
          <el-table
            :data="tableData5"
            style="width: 100%"
            fit
            :height="recordTableHeight"
            v-loading="listLoading"
            highlight-current-row
            :header-cell-style="{backgroundColor:'#EFF2F7'}"
            :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                  <el-form-item label="小区/地址">
                    <span>{{ props.row.detailAddress }}</span>
                  </el-form-item>
                  <el-form-item label="所属用户">
                    <span>{{ props.row.back1 }}</span>
                  </el-form-item>
                  <el-form-item label="查询结果">
                    <span>{{ props.row.queryResult }}</span>
                  </el-form-item>
                  <el-form-item label="建筑面积">
                    <span>{{ props.row.area }}</span>
                  </el-form-item>
                  <!--<el-form-item label="建筑年代">
                    <span>{{ props.row.buildYear}}</span>
                  </el-form-item>-->
                  <el-form-item label="预期结果">
                    <span>{{ props.row.expectedPrice}}</span>
                  </el-form-item>
                  <el-form-item label="朝向">
                    <span>{{ props.row.orientation}}</span>
                  </el-form-item>
                  <el-form-item label="装修程度">
                    <span>{{ props.row.degreeDecoration}}</span>
                  </el-form-item>
                  <el-form-item label="景观">
                    <span>{{ props.row.buildType}}</span>
                  </el-form-item>
                  <el-form-item label="户型">
                    <span>{{ props.row.houseType}}</span>
                  </el-form-item>
                  <el-form-item label="结果异议">
                    <span>{{ props.row.dissent}}</span>
                  </el-form-item>
                  <el-form-item label="楼栋">
                    <span>{{ props.row.ownStatus}}</span>
                  </el-form-item>
                  <el-form-item label="房号">
                    <span>{{ props.row.indoorStructure}}</span>
                  </el-form-item>
                  <el-form-item label="查询时间">
                    <span>{{ props.row.queryDate}}</span>
                  </el-form-item>
                  <el-form-item label="异议理由">
                    <span>{{ props.row.dissentReason }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="小区/地址"
              align="center"
              prop="detailAddress">
            </el-table-column>
            <el-table-column
              label="建筑面积"
              align="center"
              prop="area">
            </el-table-column>
            <el-table-column
              label="查询时间"
              align="center"
              prop="queryDate">
            </el-table-column>
            <el-table-column
              label="所属用户"
              align="center"
              prop="back1">
            </el-table-column>
            <el-table-column
              label="查询结果"
              align="center"
              prop="queryResult">
            </el-table-column>
           <!-- <el-table-column
              label="参考案例查看"
              prop="id">
              <template slot-scope="scope">
                <el-button style="margin-left: 10px" @click="seeReferenceCase(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>-->

          </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50,100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="估价参考案例查看"
      :visible.sync="ReferenceRecordVisible"
      width="80%"
      modal
      center>
      <el-table
        :header-cell-style="{backgroundColor:'#EFF2F7'}"
        :data="ReferenceRecordTable"
        style="width: 100%">
        <el-table-column
          prop="rsDz"
          label="案例价格"
          >
        </el-table-column>
        <el-table-column
          prop="gjsd"
          label="案例时间"
          >
        </el-table-column>
        <el-table-column
          prop="build"
          label="案例地址"
        >
        </el-table-column>
        <el-table-column
          prop="lc"
          label="楼层">
        </el-table-column>
        <el-table-column
          prop="pm"
          label="户型">
        </el-table-column>
        <el-table-column
          prop="cx"
          label="朝向">
        </el-table-column>
        <el-table-column
          prop="rjMj"
          label="建筑面积">
        </el-table-column>
        <el-table-column
          prop="zx"
          label="装修程度">
        </el-table-column>
        <el-table-column
          prop="wq"
          label="外墙装饰">
        </el-table-column>
        <el-table-column
          prop="completedate"
          label="建筑年代">
        </el-table-column>
        <el-table-column
          prop="jg"
          label="建筑结构">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  import {dateFormat} from '@/utils/dateUtil/index'

  export default {
    directives: {
      waves
    },
    data() {
      return {
        recordTableHeight:'calc(100% - 320px)',
        //参考案例
        ReferenceRecordVisible:false,
        ReferenceRecordTable:[],
        listLoading: true,
        //楼盘
        address: '',
        //所属用户
        blongedUser: '',
        //查询结果
        queryResult: '',
        //面积
        area: '',
        //建筑年代
        buildYear: '',
        //预期结果
        expectedPrice: '',
        //朝向
        orientation: '',
        //装修程度
        degreeDecoration: '',
        //外墙装饰
        buildType: '',
        //户型
        houseType: '',
        //结果异议
        dissent: '',
        dissentOption: [{label: '请选择', key: ''}, {label: '偏高', key: '0'}, {label: '偏低', key: '1'}],
        //楼栋
        ownStatus: '',
        //房号
        indoorStructure: '',
        //查询时间
        queryTime: '',
        //日期快捷键
        pickerOptions1: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //表格数据
        tableData5: [],
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        downloadLoading: false
      }
    },
    components: {},
    mounted() {
      this.initRecordData();
      this.getRecordList();
      let loupan = document.getElementById('loupanFocus');
      loupan.focus();
    },
    methods: {
      //查看参考案例
      seeReferenceCase(id){
        let _this = this;
        _this.ReferenceRecordTable = [];
        let referenceCase = {
          recordId:id
        }
        this.$post('/record/getReferenceRecord',referenceCase).then(resp=>{
          console.log(87878,resp)
          let formatData = resp.data;
          let resultFormatData = [];
          formatData.forEach((item,index)=>{
            let resultTmpObject = {};
            resultTmpObject.rsDz = item.rsDz != '' && item.rsDz != null ? item.rsDz+'元':'';
            resultTmpObject.gjsd = item.gjsd != '' && item.gjsd != null ?_this.formateDatetime(item.gjsd):'';
            resultTmpObject.build = item.build;
            resultTmpObject.lc = item.lc;
            resultTmpObject.pm = item.pm;
            resultTmpObject.cx = item.cx;
            resultTmpObject.rjMj = item.rjMj != '' && item.rjMj != null ?item.rjMj+"平方米":'';
            resultTmpObject.zx = item.zx;
            resultTmpObject.wq = item.wq;
            resultTmpObject.completedate = item.completedate != '' && item.completedate != null ?item.completedate+'年':'';
            resultTmpObject.jg = item.jg;
            /*resultTmpObject.yt = item.yt;*/
            resultFormatData.push(resultTmpObject);

          })
          _this.ReferenceRecordTable = resultFormatData;
        })
        this.ReferenceRecordVisible = true;
      },
      //搜索条件初始化
      initRecordData() {
        this.address = '';
        this.area = '';
        this.blongedUser = '';
        this.buildType = '';
        this.buildYear = '';
        this.degreeDecoration = '';
        this.expectedPrice = '';
        this.dissent = '';
        this.houseType = '';
        this.indoorStructure = '';
        this.orientation = '';
        this.ownStatus = '';
        this.queryResult = '';
        this.queryTime = '';
      },
      //回车搜索时间
      enterSearchRecordList(ev) {
        if (ev.keyCode == 13) {
          this.getRecordList();
        }
      },
      //获取获取查询记录列表
      getRecordList() {
        let _this = this;
        this.listLoading = true;
        let queryRecord = {
          address: this.address,
          area: this.area,
          back1: this.blongedUser,
          buildType: this.buildType,
          buildYear: this.buildYear,
          currentPage: this.currentPage,
          degreeDecoration: this.degreeDecoration,
          expectedPrice: this.expectedPrice,
          dissent: this.dissent,
          houseType: this.houseType,
          indoorStructure: this.indoorStructure,
          orientation: this.orientation,
          ownStatus: this.ownStatus,
          pageSize: this.pageSize,
          queryResult: this.queryResult,
          startQueryDate: this.queryTime != '' && this.queryTime != null ? dateFormat(this.queryTime[0], 'yyyy-MM-dd hh:mm:ss') : '',
          endQueryDate: this.queryTime != '' && this.queryTime != null ? dateFormat(this.queryTime[1], 'yyyy-MM-dd hh:mm:ss') : ''
        }
        this.$post('/record/getRecordByPage', queryRecord).then(resp => {
          console.log(12345, resp);
          /*_this.tableData5 = resp.items;*/
          _this.totalItems = resp.totalNum;
          let foreachData = resp.items;
          let temArray = [];
          foreachData.forEach((item, index) => {
            let tempObject = {};
            tempObject.id = item.id;
            tempObject.index = index + 1;
            tempObject.detailAddress = item.detailAddress;
            tempObject.back1 = item.back1;
            tempObject.queryResult = item.queryResult != '' && item.queryResult != null ? ((parseFloat(item.queryResult)*parseFloat(item.area)) / 10000).toFixed(0) + '万元' : '';
            tempObject.area = item.area != '' && item.area != null ? item.area + '平方米' : '';
            tempObject.buildYear = item.buildYear != '' && item.buildYear != null ? item.buildYear + '年' : '';
            tempObject.expectedPrice = item.expectedPrice != '' && item.expectedPrice != null ? (item.expectedPrice) + '万元' : '';
            tempObject.orientation = item.orientation;
            tempObject.degreeDecoration = item.degreeDecoration;
            tempObject.buildType = item.buildType;
            tempObject.houseType = item.houseType;
            if(item.dissent == '0'){
              tempObject.dissent = '偏高';
            }else if(item.dissent == '1'){
              tempObject.dissent = '偏低';
            }
            tempObject.ownStatus = item.ownStatus;
            tempObject.indoorStructure = item.indoorStructure;
            tempObject.queryDate = item.queryDate != '' && item.queryDate != null ? _this.formateDatetime(item.queryDate) : '';
            tempObject.dissentReason = item.dissentReason;
            //楼曾导出用到
            tempObject.floor = item.floor;
            temArray.push(tempObject);
          })
          _this.tableData5 = temArray;
          setTimeout(() => {
            _this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      //格式化时间
      formateDatetime(datetiime) {
        return dateFormat(new Date(datetiime), 'yyyy-MM-dd hh:mm:ss');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getRecordList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getRecordList();
      },
      //结果异议下拉框
      changeDissentHandler() {
        this.getRecordList();
      },
      tableRowClassName({row, rowIndex}) {
        /* if ((rowIndex + 1) % 2 === 0) {
           return 'warning-row';
         } else if (rowIndex % 2 === 0) {
           return 'success-row';
         }*/
        return '';
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '小区/地址', '所属用户', '查询结果', '建筑面积',
            '预期结果', '朝向', '装修程度', '景观',
            '户型', '结果异议', '楼栋', '房号', '查询时间', '异议理由', '楼层'];
          const filterVal = ['index', 'detailAddress', 'back1', 'queryResult', 'area',
            'expectedPrice', 'orientation', 'degreeDecoration', 'buildType',
            'houseType', 'dissent', 'ownStatus', 'indoorStructure', 'queryDate', 'dissentReason', 'floor'];
          const data = this.formatJson(filterVal, this.tableData5)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '记录查询列表'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    },
  }
</script>

<style lang="scss">
  .record-list-container {
    height: 100%;
    .container-record {
      width: 100%;
      height: calc(100% - 60px);
      padding: 20px;
      box-sizing: border-box;
      background-color: #EFF2F7;
      .record-panel {
        height: calc(100% - 60px);
        background-color: white;
        border: 1px solid #fff;
        padding: 20px 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border-radius: 4px;
      }
      .filter-container-record {
        margin-bottom: 20px;
        .filter-item-record {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          .filter-item-label {

          }
          .filter-item-content {
            width: 200px;
          }
        }
      }
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .el-table .warning-row {
      background: #ffffff;
    }

    .el-table .success-row {
      background: #ffffff;
    }
    .el-table .header-color {
      background-color: #EFF2F7;
    }
  }
</style>
