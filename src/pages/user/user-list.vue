<template>
  <div class="user-list-container">
    <!--<head-top></head-top>-->
    <div class="container-user">
      <div class="user-panel">
        <div class="filter-container">
          <div>
            <div class="filter-item">
              <span class="filter-item-label">姓名</span>
              <el-input placeholder="姓名" class="filter-item-content" v-model="userName"
                        @keyup.enter.native="enterSearchList" id="nameFocus"/>
            </div>
            <div class="filter-item">
              <span class="filter-item-label">电话</span>
              <el-input placeholder="电话" class="filter-item-content" v-model="phoneNumber"
                        @keyup.enter.native="enterSearchList"/>
            </div>
            <div class="filter-item">
              <span class="demonstration">可查时段</span>
              <el-date-picker
                v-model="queryDate"
                type="daterange"
                align="right"
                unlink-panels
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                style="width: 400px"
              >
              </el-date-picker>
            </div>
            <div class="filter-item">
              <span class="filter-item-label">可查次数</span>
              <el-input placeholder="可查次数" type="number" class="filter-item-content" v-model="enableCount"
                        @keyup.enter.native="enterSearchList"/>
            </div>
          </div>
          <div>
            <div class="filter-item">
              <span class="filter-item-label">昵称</span>
              <el-input placeholder="昵称" class="filter-item-content" v-model="nickName"
                        @keyup.enter.native="enterSearchList"/>
            </div>
            <div class="filter-item">
              <span class="filter-item-label">邮箱</span>
              <el-input placeholder="邮箱" class="filter-item-content" v-model="userEmail"
                        @keyup.enter.native="enterSearchList"/>
            </div>
            <div class="filter-item">
              <span class="demonstration">注册时间</span>
              <el-date-picker
                v-model="registerTime"
                type="datetimerange"
                :picker-options="pickerOptions1"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right">
              </el-date-picker>
            </div>
            <div class="filter-item" style="margin-right: 20px">
              <span class="filter-item-label">性<span style="visibility: hidden">楼栋</span>别</span>
              <el-select placeholder="性别" clearable class="filter-item-content" v-model="sex"
                         @change="changeSexHandler">
                <el-option v-for="item in sexOption" :key="item.key" :label="item.label" :value="item.key"/>
              </el-select>
            </div>
            <el-button v-waves class="filter-item-search" type="primary" icon="el-icon-search" @click="doSearchUser">搜索
            </el-button>
            <el-button v-waves :loading="downloadLoading" class="filter-item-download" type="primary"
                       icon="el-icon-download"
                       @click="handleDownload">导出
            </el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;"
          fit
          :height="userTableHeight"
          v-loading="listLoading"
          highlight-current-row
          :header-cell-style="{backgroundColor:'#EFF2F7'}"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            label="用户头像"
            align="center"
            width="160">
            <template slot-scope="scope">
              <img :src="scope.row.userImage" width="60px" height="60px"/>
            </template>
          </el-table-column>
          <el-table-column
            label="注册时间"
            align="center"
            width="190">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ formateDatetime(scope.row.registerDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.userName }}</p>
                <p>电话: {{ scope.row.phoneNumber }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="昵称"
            align="center"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.nickName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="电话"
            align="center"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.phoneNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            align="center"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.userMail}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            align="center"
            width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.sex==1 ?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已查次数"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.back1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="可查次数"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{scope.row.enableCount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="可查时段"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{formateDate(scope.row.startEnableTime)}}~{{formateDate(scope.row.endEnableTime)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width=250px>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row.id)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.delFlag == 'Y'"
                @click="handleDelete(scope.row.id)">禁用
              </el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.delFlag == 'N'"
                style="background-color: #5daf34;border-color: #5daf34"
                @click="handleEnable(scope.row.id)">启用
              </el-button>
            </template>
          </el-table-column>
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
      title="编辑用户查询次数和时段"
      :visible.sync="centerDialogVisible"
      width="30%"
      modal
      center>
      <el-form ref="formRule" :model="form" label-width="80px">
        <el-form-item label="可查次数">
          <!--<span style="color: red">*</span>-->
          <el-input type="number" v-model="form.name" oninput="if(value.length>10)value=value.slice(0,10)"
                    placeholder="请输入可查次数" style="width: calc(100% - 50px)"></el-input>
        </el-form-item>
        <el-form-item label="可查时段">
          <!-- <span style="color: red">*</span>-->
          <el-date-picker
            style="width: calc(100% - 50px)"
            v-model="form.formqueryDate"
            type="daterange"
            align="right"
            unlink-panels
            clearable
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="float: right">确定</el-button>
          <el-button @click="cancle" style="float: right;margin-right: 15px">取消</el-button>
        </el-form-item>
      </el-form>
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
    components: {},
    data() {
      return {
        userTableHeight: 'calc(100% - 280px)',
        listLoading: true,
        dialogId: '',
        form: {
          name: '',
          formqueryDate: ''
        },
        centerDialogVisible: false,
        //用户姓名
        userName: '',
        //用户昵称
        nickName: '',
        //用户电话
        phoneNumber: '',
        //用户邮箱
        userEmail: '',
        //查询时段
        queryDate: '',
        //用户性别
        sex: '',
        sexOption: [{label: '请选择', key: ''}, {label: '男', key: '1'}, {label: '女', key: '0'}],
        //可查询次数
        enableCount: '',
        //注册时间
        registerTime: '',
        //表格数据
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        downloadLoading: false,
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
        pickerOptions2: {
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
        }
      }
    },
    mounted() {
      this.initUserData();
      this.doSearchUser();
      let nameFocus = document.getElementById('nameFocus');
      nameFocus.focus();
    },
    methods: {
      //清除搜索条件
      initUserData() {
        this.userName = '';
        this.nickName = '';
        this.phoneNumber = '';
        this.userEmail = '';
        this.sex = '';
        this.enableCount = '';
        this.queryDate = '';
        this.registerTime = '';
      },
      //回车搜索时间
      enterSearchList(ev) {
        if (ev.keyCode == 13) {
          this.doSearchUser();
        }
      },
      cancle() {
        this.centerDialogVisible = false;
        this.form.name = '';
        this.form.formqueryDate = '';
      },
      onSubmit(id) {
        let _this = this;
        /* if (this.form.name != '' && this.form.formqueryDate != '') {*/
        let edit = {
          id: parseInt(_this.dialogId),
        }
        if (_this.form.name != '' && _this.form.name != null) {
          edit.enableCount = _this.form.name;
        }
        if (_this.form.formqueryDate != '' && _this.form.formqueryDate != null) {
          edit.startEnableTime = _this.form.formqueryDate != '' && _this.form.formqueryDate != null ? dateFormat(_this.form.formqueryDate[0], 'yyyy-MM-dd') : '';
          edit.endEnableTime = _this.form.formqueryDate != '' && _this.form.formqueryDate != null ? dateFormat(_this.form.formqueryDate[1], 'yyyy-MM-dd') : '';
        }
        if(_this.form.name == '' && _this.form.formqueryDate == ''){
          this.centerDialogVisible = false;
          return ;
        }
        _this.$post('/admin/updateUserById', edit).then(resp => {
          if (resp.msg == "success") {
            _this.$message({
              type: 'success',
              message: '编辑成功!'
            });
            _this.doSearchUser();
          } else {
            _this.$message({
              type: 'error',
              message: '编辑失败!'
            });
          }

        })
        _this.centerDialogVisible = false;
        _this.form.name = '';
        _this.form.formqueryDate = '';
        /* } else {
           this.$message.error('请填写可查次数和可查时段');
           return false;
         }*/
      },
      //搜索
      doSearchUser() {
        let _this = this;
        this.listLoading = true
        console.log(656565, this.queryDate);
        console.log(8787, this.registerTime);
        let searchUser = {
          userName: this.userName,
          nickName: this.nickName,
          phoneNumber: this.phoneNumber,
          userMail: this.userEmail,
          sex: this.sex,
          enableCount: this.enableCount,
          startEnableTime: this.queryDate != '' && this.queryDate != null ? dateFormat(this.queryDate[0], 'yyyy-MM-dd') : '',
          endEnableTime: this.queryDate != '' && this.queryDate != null ? dateFormat(this.queryDate[1], 'yyyy-MM-dd') : '',
          startRegisterDate: this.registerTime != '' && this.registerTime != null ? dateFormat(this.registerTime[0], 'yyyy-MM-dd hh:mm:ss') : '',
          endRegisterDate: this.registerTime != '' && this.registerTime != null ? dateFormat(this.registerTime[1], 'yyyy-MM-dd hh:mm:ss') : '',
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        this.$post('/admin/getUserByPages', searchUser).then(resp => {
          _this.tableData = resp.items;
          _this.totalItems = resp.totalNum;
          console.log(678, resp);
          setTimeout(() => {
            _this.listLoading = false
          }, 1.5 * 1000)
        })


      },
      open1(id) {
        let _this = this;
        this.$confirm('此操作将启用用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //后台更新
          let deleData = {
            id: id,
            delFlag: 'N'
          }
          this.$post('/admin/updateUserById', deleData).then(resp => {
            if (resp.msg == "success") {
              _this.$message({
                type: 'success',
                message: '启用成功!'
              });
              _this.doSearchUser();
            } else {
              _this.$message({
                type: 'error',
                message: '启用失败!'
              });
            }

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open2(id) {
        let _this = this;
        this.$confirm('此操作将禁用用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //后台更新
          let deleData = {
            id: id,
            delFlag: 'Y'
          }
          this.$post('/admin/updateUserById', deleData).then(resp => {
            if (resp.msg == "success") {
              _this.$message({
                type: 'success',
                message: '禁用成功!'
              });
              _this.doSearchUser();
            } else {
              _this.$message({
                type: 'error',
                message: '禁用失败!'
              });
            }

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //格式化日期
      formateDate(date) {
        return dateFormat(new Date(date), 'yyyy-MM-dd');
      },
      //格式化时间
      formateDatetime(datetiime) {
        return dateFormat(new Date(datetiime), 'yyyy-MM-dd hh:mm:ss');
      },
      //用户性别下拉框
      changeSexHandler() {
        /* this.listQuery.page = 1
         this.getList()*/
        this.doSearchUser();
      },
      handleEdit(id) {
        console.log(11, id);
        this.dialogId = id;
        this.centerDialogVisible = true;
      },
      handleEnable(id) {
        this.open1(id);
      },
      handleDelete(id) {
        console.log(22, id);
        this.open2(id);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.doSearchUser();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.doSearchUser();
      },
      tableRowClassName({row, rowIndex}) {
        if ((rowIndex + 1) % 2 === 0) {
          return 'warning-row';
        } else if (rowIndex % 2 === 0) {
          return 'success-row';
        }
        return '';
      },
      //excel导出
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['序号', '注册时间', '姓名', '昵称', '电话', '邮箱', '性别', '可查次数', '可查时段'];
          const filterVal = ['index', 'registerDate', 'userName', 'nickName', 'phoneNumber', 'userMail', 'sex', 'enableCount', 'enableTime'];
          let excelData = [];
          let sourceData = this.tableData;
          sourceData.forEach((item, index) => {
            let tempItem = {};
            tempItem.index = index + 1;
            tempItem.registerDate = this.formateDatetime(item.registerDate);
            tempItem.userName = item.userName;
            tempItem.nickName = item.nickName;
            tempItem.phoneNumber = item.phoneNumber;
            tempItem.userMail = item.userMail;
            tempItem.sex = item.sex == 1 ? '男' : '女';
            tempItem.enableCount = item.enableCount;
            tempItem.enableTime = this.formateDate(item.startEnableTime) + '~' + this.formateDate(item.endEnableTime);
            excelData.push(tempItem);
          })
          const data = this.formatJson(filterVal, excelData)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '用户列表'
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
    }
  }
</script>


<style lang="scss">
  .user-list-container {
    height: 100%;
    .container-user {
      width: 100%;
      height: calc(100% - 60px);
      padding: 20px;
      background-color: #EFF2F7;
      box-sizing: border-box;
      .user-panel {
        height: calc(100% - 60px);
        background-color: white;
        border: 1px solid #fff;
        padding: 20px 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border-radius: 4px;
      }
      .filter-container {
        margin-bottom: 20px;
        .filter-item {
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
  }
</style>
