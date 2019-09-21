<template>
  <div class="param-config">
    <el-tabs type="border-card" tab-position="left" class="custom-el-tabs" v-model="select">
      <el-tab-pane name="1" class="lc-pane">
        <span slot="label" class="el-lable-title"> 楼层修正&nbsp;<i class="el-icon-arrow-right" style="font-size: 16px"></i></span>
        <div class="lc-pane-container">
          <div class="lc-pane-title">楼层修正</div>
          <div class="lc-pane-content">
            <div class="lc-table-search">
              <div class="lc-filter-item" style="margin-left: 5px">
                <span class="lc-filter-item-label">楼房类型</span>
                <el-select placeholder="楼房类型"
                           clearable
                           class="lc-filter-item-content"
                           v-model="lc"
                           @change="changeLcHandler">
                  <el-option v-for="item in lcOption" :key="item.key" :label="item.label" :value="item.key"/>
                </el-select>
              </div>
              <div class="lc-filter-item">
                <span class="lc-filter-item-label">所在楼层</span>
                <el-input placeholder="所在楼层"
                          class="lc-filter-item-content"
                          v-model="pcg"
                          @keyup.enter.native="enterSearchParam"/>
              </div>
              <div class="lc-filter-item">
                <span class="lc-filter-item-label">总层数</span>
                <el-input placeholder="总层数"
                          class="lc-filter-item-content"
                          v-model="zcs"
                          @keyup.enter.native="enterSearchParam"/>
              </div>
              <el-button v-waves class="filter-item-search" type="primary" icon="el-icon-search" @click="doSearchParamByPages">搜索
              </el-button>
            </div>
            <el-table
              :data="tableData"
              highlight-current-row
              fit
              v-loading="listLoading"
              :height="lcTableHeight"
              :header-cell-style="{backgroundColor:'#EFF2F7'}"
              style="width: 100%;">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="参数类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="楼房类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param4 }}</span>
                </template>
              </el-table-column>
              <el-table-column
              label="所在楼层"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.param2 }}</span>
              </template>
            </el-table-column>
              <el-table-column
                label="总层数"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param3 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="楼层等级值"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.degree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formateDatetime(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"> <i class="el-icon-edit"></i><span>编辑</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lc-pane-bottom">
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
      </el-tab-pane >
      <el-tab-pane name="2" class="lc-pane">
        <span slot="label" class="el-lable-title"> 朝向修正&nbsp;<i class="el-icon-arrow-right" style="font-size: 16px"></i></span>
        <div class="lc-pane-container">
          <div class="lc-pane-title">朝向修正</div>
          <div class="lc-pane-content">
            <el-table
              :data="tableData"
              highlight-current-row
              fit
              v-loading="listLoading"
              :height="lcTableHeight1"
              :header-cell-style="{backgroundColor:'#EFF2F7'}"
              style="width: 100%;margin-top: 5px">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="参数类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="朝向"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param2 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="朝向等级值"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.degree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formateDatetime(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"> <i class="el-icon-edit"></i><span>编辑</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lc-pane-bottom">
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
      </el-tab-pane>
      <el-tab-pane name="3" class="lc-pane">
        <span slot="label" class="el-lable-title"> 面积修正&nbsp;<i class="el-icon-arrow-right" style="font-size: 16px"></i></span>
        <div class="lc-pane-container">
          <div class="lc-pane-title">面积修正</div>
          <div class="lc-pane-content">
            <el-table
              :data="tableData"
              highlight-current-row
              fit
              v-loading="listLoading"
              :height="lcTableHeight2"
              :header-cell-style="{backgroundColor:'#EFF2F7'}"
              style="width: 100%;margin-top: 5px">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="参数类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="面积范围"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param4 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="面积等级值"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.degree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formateDatetime(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"> <i class="el-icon-edit"></i><span>编辑</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lc-pane-bottom">
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
      </el-tab-pane>
      <el-tab-pane name="4" class="lc-pane">
        <span slot="label" class="el-lable-title"> 户型修正&nbsp;<i class="el-icon-arrow-right" style="font-size: 16px"></i></span>
        <div class="lc-pane-container">
          <div class="lc-pane-title">户型修正</div>
          <div class="lc-pane-content">
            <el-table
              :data="tableData"
              highlight-current-row
              fit
              v-loading="listLoading"
              :height="lcTableHeight3"
              :header-cell-style="{backgroundColor:'#EFF2F7'}"
              style="width: 100%;margin-top: 5px">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="参数类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="户型房数"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param4 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="户型等级值"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.degree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formateDatetime(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"> <i class="el-icon-edit"></i><span>编辑</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lc-pane-bottom">
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
      </el-tab-pane>
      <el-tab-pane name="5" class="lc-pane">
        <span slot="label" class="el-lable-title"> 装修修正&nbsp;<i class="el-icon-arrow-right" style="font-size: 16px"></i></span>
        <div class="lc-pane-container">
          <div class="lc-pane-title">装修修正</div>
          <div class="lc-pane-content">
            <el-table
              :data="tableData"
              highlight-current-row
              fit
              v-loading="listLoading"
              :height="lcTableHeight4"
              :header-cell-style="{backgroundColor:'#EFF2F7'}"
              style="width: 100%;margin-top: 5px">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                label="参数类型"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="装修程度"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.param2 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="装修等级值"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.degree }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="修改日期"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ formateDatetime(scope.row.updateTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"> <i class="el-icon-edit"></i><span>编辑</span></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="lc-pane-bottom">
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
      </el-tab-pane>
    </el-tabs>
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
        zcs:'',
        pcg:'',
        lc:'小高层',
        lcOption:[{label: '小高层', key: '小高层'}, {label: '高层', key: '高层'}, {label: '超高层', key: '超高层'}],
        listLoading:true,
        select:"1",                              //默认选择中第一个
        lcTableHeight:'calc(100% - 70px)',     //表格高度
        lcTableHeight1:'calc(100% - 0px)',     //表格高度
        lcTableHeight2:'calc(100% - 0px)',     //表格高度
        lcTableHeight3:'calc(100% - 0px)',     //表格高度
        lcTableHeight4:'calc(100% - 0px)',     //表格高度
        currentPage: 1,                         //当前页
        pageSize: 10,                           //页面大小
        totalItems: 0,                          //总记录数
        tableData: []                           //查询数据
      }
    },
    mounted(){
      this.doSearchParamByPages();
    },
    methods: {
      enterSearchParam(ev){
        if (ev.keyCode == 13) {
          this.doSearchParamByPages();
        }
      },
      changeLcHandler(){
        this.doSearchParamByPages();
      },
      //格式化时间
      formateDatetime(datetiime) {
        return dateFormat(new Date(datetiime), 'yyyy-MM-dd hh:mm:ss');
      },
      //分页查询参数表
      doSearchParamByPages(){
        let _this = this;
        this.listLoading = true;
        let searchParam = {
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        };
        if(_this.select == "1"){
          //楼层修正
          searchParam.param1 = "LC";
          searchParam.param4 = _this.lc;
          searchParam.param2 = _this.pcg;
          searchParam.param3 = _this.zcs;

        }else if(_this.select == "2"){
          //朝向修正
          searchParam.param1 = "CX";

        }else if(_this.select == "3"){
          //面积修正
          searchParam.param1 = "MJ";

        }else if(_this.select == "4"){
          //户型修正
          searchParam.param1 = "HX";

        }else if(_this.select == "5"){
          //装修修正
          searchParam.param1 = "ZX";

        }

        _this.$post('/param/getParamByPage', searchParam).then(resp => {
          _this.tableData = resp.items;
          _this.totalItems = resp.totalNum;
          console.log(678, resp);
          setTimeout(() => {
            _this.listLoading = false
          }, 1.0 * 1000)
        })
      },
      handleEdit(index, row) {
        console.log(6666,row.id);
        let _this = this;
        _this.$prompt('请输入等级值', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^-{0,1}[0-9]+([.]{1}[0-9]+){0,1}$/,
          inputErrorMessage: '等级值不正确'
        }).then(({ value }) => {
          let updateParam = {
            id:row.id,
            degree:value
          };
          _this.$post('/param/updateParamById', updateParam).then(resp => {
            console.log(2232323, resp);
            if(resp.code == 1){
              _this.$message({
                type: 'success',
                message: '编辑成功!'
              });
              _this.doSearchParamByPages();
            }else{
              _this.$message({
                type: 'error',
                message: '编辑失败!'
              });
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.doSearchParamByPages();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.doSearchParamByPages();
      },
    },
    watch:{
      select(){
        console.log(8989,this.select);
        this.doSearchParamByPages();
      }
    }
  }
</script>

<style lang="scss">
  .param-config {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #EFF2F7;
    box-sizing: border-box;
    .el-tabs__content {
      height: calc(100% - 40px) !important;
    }
    .custom-el-tabs {
      width: 100%;
      height: calc(100% - 60px);
      .el-lable-title {
        font-size: 16px;
      }
      .lc-pane {
        width: 100%;
        height: 100%;
        .lc-pane-container {
          width: 100%;
          height: 100%;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          padding: 5px;
          box-sizing: border-box;
          .lc-pane-title {
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            font-family: "Microsoft YaHei UI";
            border-bottom: #EFF2F7 solid 4px;
          }
          .lc-pane-content {
            width: 100%;
            height: calc(100% - 100px);
            .lc-table-search{
              display: flex;
              align-items: center;
              height: 70px;
              .lc-filter-item{
                display: inline-block;
                margin-right: 10px;
                .lc-filter-item-label{
                  margin-right: 10px;
                }
                .lc-filter-item-content{
                  width: 200px;
                }
              }
            }
          }
          .lc-pane-bottom {
            width: 100%;
            height: 50px;
            border-top:#EFF2F7 solid 4px;
          }
        }
      }
    }
  }
</style>
