<template>
  <div class="qup-full-page">
    <template v-if="showDetailPage">
      <detail-page ref="refDetail" :page-show.sync="showDetailPage" :detail-data="activeRowData" />
    </template>
    <div v-show="!showDetailPage">
      <table-box
        ref="refTable"
        :selected-arry.sync="tableSelected"
        :table-config="tableConfig"
        :other-filters="otherFilters"
        :off-set="-10"
        @btnOperate="btnOperate"
      >
        <el-table-column slot="before" fixed="left" label="序号" type="index" />
      </table-box>
      <edit-form v-if="showEdit" ref="formDlg" :visible.sync="showEdit" :detail-data="activeRowData" @success="refreshTable" />
    </div>

    <export-files
      v-if="showExport"
      title="导出"
      :visible.sync="showExport"
      :config="exportConfig"
      @success="refreshTable(true)"
    />
  </div>
</template>

<script>
import { parseTime, createDownload } from '@/utils'
import DetailPage from './Detail'
import EditForm from './component/EditForm'
import { deletDemoData, exportDemoData } from '@/api/demo'

export default {
  name: 'DemoList',
  components: { DetailPage, EditForm },
  data() {
    const that = this
    return {
      tableSelected: [], // 当前所选中表格行数据
      otherFilters: [], // 表格额外查询条件
      tableConfig: {
        interfacePath: `https://qup2dev.quanyou.com.cn/ucenter/api/v2/position/page`,
        hideFuncBar: false,
        pageSize: 20,
        sort: 'createTime',
        order: 'desc',
        setting: [
          {
            prop: 'positionCode',
            label: '职务编码',
            minWidth: 130,
            className: 'btn-green',
            isButton: true,
            clickFun: this.handleDetail
          },
          {
            prop: 'positionName',
            label: '职务名称',
            minWidth: 130
          },
          {
            prop: 'createBy',
            label: '创建人',
            minWidth: 130,
            type: 'hidden'
          },
          {
            prop: 'createTime',
            label: '创建时间',
            minWidth: 130,
            type: 'hidden',
            formatData: ({ createTime }) => {
              return parseTime(createTime)
            }
          },
          {
            prop: 'positionDesc',
            label: '职务描述',
            minWidth: 200,
            type: 'hidden'
          },
          {
            prop: 'insetComponent',
            label: '插入组件',
            minWidth: 200,
            type: 'hidden',
            render: function(_, rows) {
              const header = {
                'Authorization': that.$store.getters.token ? `Bearer ${that.$store.getters.token}` : ''
              }
              return (
                <div class='upload'>
                  <el-upload
                    ref='upload'
                    class='upload-box'
                    with-credentials
                    headers={header}
                    action='/after-patch/api/v1/patchDeclaration/uploadImage'
                    show-file-list={false}
                    {
                    ...{
                      props: {
                        'on-success': (res, file, fileList) => {
                          that.handleUploadSuccess(rows, res, file, fileList)
                        },
                        'on-error': (err, file, fileList) => {
                          that.handleUploadError(rows, err, file, fileList)
                        }
                      }
                    }}
                    multiple
                  >
                    <el-button size='small' type='text' size='mini'>上传图片</el-button>
                  </el-upload>
                  <el-button size='small' type='text' size='mini' class='btn-green' onClick={that.viewImage.bind(this, rows)}>查看图片</el-button>
                  <el-button size='small' type='text' size='mini' onClick={that.deleteImage.bind(this, rows)}>删除图片</el-button>
                </div>
              )
            }
          }],
        btnList: !this.isProduction ? [{
          buttonName: '新增',
          optCode: 'add',
          outerFlag: true
        },
        {
          buttonName: '编辑',
          optCode: 'edit',
          outerFlag: true
        },
        {
          buttonName: '删除',
          optCode: 'del',
          outerFlag: true
        },
        {
          buttonName: '导出',
          optCode: 'export',
          outerFlag: true
        },
        {
          buttonName: '调用组件导出',
          optCode: 'qupExport',
          outerFlag: true
        },
        {
          buttonName: '明细查询',
          optCode: 'detail',
          outerFlag: false
        }] : null
      },
      activeRowData: '',
      showDetailPage: false,
      showEdit: false,
      showExport: false,
      exportConfig: [{
        code: 'vipgoods', // 导出编码，前段定义，同一个config中code不能重复
        name: '导出的数据的名称', // 导出名称，如：商品导出，导出用户
        async: false, // 是否异步
        templateCode: 'export_vip_goods', // 模板code，若需要则由后端提供
        dataApi: `${process.env.VUE_APP_BASE_API}/api/v1/excel/template/download`, // 导出数据的接口地址
        filtersRaw: [], // filter查询参数
        paramsRaw: {}, // params查询参数
        selectedRows: [], // 当前所选中的数据行
        queryField: 'id'// 指定行导出的字段名称
      }]
    }
  },
  methods: {
    refreshTable(isInit) {
      this.$refs.refTable.initTableData(isInit ? '' : 'onPage')
    },
    btnOperate(code) {
      switch (code) {
        case 'add':
          this.handleEdit()
          break
        case 'edit':
          if (!this.singleJudge(this.tableSelected, '编辑', true)) {
            return
          }
          this.handleEdit(this.tableSelected[0])
          break
        case 'del':
          if (!this.singleJudge(this.tableSelected, '删除', true)) {
            return
          }
          this.handleDelete(this.tableSelected[0].positionId)
          break
        case 'export':
          this.handleExport()
          break
        case 'qupExport':
          this.handleQupExport()
          break
        case 'detail':
          if (!this.singleJudge(this.tableSelected, '明细查询', true)) {
            return
          }
          this.handleDetail(this.tableSelected[0])
          break
        default:
          break
      }
    },
    // 查看详情
    handleDetail(data) {
      this.showDetailPage = true
      this.activeRowData = data
    },
    // 新增/编辑
    handleEdit(data) {
      this.showEdit = true
      if (data && data.positionId) {
        this.activeRowData = data
      } else {
        this.activeRowData = ''
      }
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将永久删除该职务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用接口执行删除
        deletDemoData(id).then(res => {
          if (res.success === 1) {
            this.$message({
              message: res.msg || '删除成功',
              type: 'success'
            })
            this.refreshTable()
          }
        })
      }).catch(() => {})
    },
    // 直接导出
    handleExport() {
      const data = {
        page: 1,
        rows: 10,
        sort: 'createTime',
        order: 'desc',
        pageFlag: true,
        onlyCountFlag: false,
        filtersRaw: [],
        sortersRow: []
      }

      exportDemoData(data).then(res => {
        this.$message.success('导出成功，请等待下载')
        createDownload(res, '导出文件名称')
      })
    },
    // 使用公用的导出组件进行导出
    handleQupExport() {
      this.showExport = true
      let filtersRaw = this.otherFilters
      const allFilters = this.$refs.refTable.getAllFilters()
      if (allFilters.searchBarFilter) {
        filtersRaw = { ...filtersRaw, ...allFilters.searchBarFilter }
      }
      if (allFilters.combineFilter) {
        filtersRaw = { ...filtersRaw, ...allFilters.combineFilter }
      }
      const exportConfig = this.exportConfig[0]
      exportConfig.filtersRaw = filtersRaw
      exportConfig.paramsRaw = this.otherRaws
      exportConfig.selectedRows = this.tableSelected || []
      this.$set(this.exportConfig, 0, exportConfig)
    },
    handleUploadSuccess(rows, res, file, fileList) {

    },
    handleUploadError(rows, err, file, fileList) {

    },
    viewImage(row) {

    },
    deleteImage(row) {

    }
  }
}
</script>
<style lang='scss' scoped>

</style>
