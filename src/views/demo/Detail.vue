<!--
  @Descripttion：DEMO详情
  @Author：zqy
  @Date：2020-07-28 10:57:14
  @Last Modified by：zqy
  @Last Modified time：2020-07-28 10:57:14
-->
<template>
  <inside-page :titles="['Demo列表','详情']" cancel-title="取消" @go-back="goBack">
    <template slot="button">
      <el-button v-preventReClick size="mini" type="primary">保存</el-button>
    </template>
    <div class="mt20">
      <el-form size="mini" inline label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="职务编码:">
              {{ detailData.positionCode }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务名称:">
              {{ detailData.positionName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人:">
              {{ detailData.createBy }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间:">
              {{ detailData.createTime | filterTime }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="职务描述:">
              {{ detailData.positionDesc }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="mt20">
      <div class="qup-title-box"><span class="border" /><span>虚拟表格数据</span></div>
      <plx-table-box
        ref="refDetailTable"
        table-size="mini"
        :data="tableData"
        :show-index="true"
        :table-config="tableConfig"
        :other-filters="otherFilters"
        table-height="400"
      />
    </div>
    <div class="mt20">
      <div class="qup-title-box"><span class="border" /><span>表格数据</span></div>
      <div class="table-list-box">
        <el-table
          style="width: 100%"
          :data="productList"
          header-row-class-name="table-list-header"
          highlight-current-row
          border
        >
          <el-table-column label="序号" type="index" />
          <el-table-column prop="productCode" label="产品编码" min-width="150" />
          <el-table-column prop="productDesc" label="产品名称" min-width="200" />
          <el-table-column label="数量" min-width="60">
            <template v-slot="{row}">
              {{ row.quantity || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="关闭量" min-width="60">
            <template v-slot="{row}">
              {{ row.closeNum || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="排工量" min-width="60">
            <template v-slot="{row}">
              {{ row.scheduleNum || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="出库量" min-width="60">
            <template v-slot="{row}">
              {{ row.outStockNum || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="完工量" min-width="60">
            <template v-slot="{row}">
              {{ row.completionNum || 0 }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="150" />
        </el-table>
      </div>
    </div>
    <div class="mt20">
      <div class="qup-title-box"><span class="border" /><span>分组标题</span></div>
      <el-form size="mini" inline label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="职务编码:">
              {{ detailData.positionCode }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务名称:">
              {{ detailData.positionName }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人:">
              {{ detailData.createBy }}
            </el-form-item>
          </el-col>
          <el-col v-if="pictureList && pictureList.length" :span="24">
            <el-form-item label="凭证:" class="note-item">
              <div class="voucher-list">
                <div v-for="(item,index) in pictureList" :key="index" class="voucher">
                  <el-image
                    style="width: 120px; height: 120px"
                    :src="item"
                    :preview-src-list="pictureList"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </inside-page>
</template>

<script>
import { parseTime } from '@/utils'
import BackPageMixin from '@/mixins/backPage'
export default {
  name: 'DetailPage',
  filters: {
    filterTime(val) {
      return parseTime(val) || ''
    }
  },
  mixins: [BackPageMixin],
  props: {
    detailData: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      productList: [
        {
          productCode: 'SPUC00000091',
          productDesc: '床-部分SKU参与秒杀活动的测试',
          quantity: 2,
          closeNum: 1,
          scheduleNum: 2,
          outStockNum: 0,
          completionNum: 1,
          remark: '测试数据'
        }
      ],
      pictureList: [
        'https://testimg.quanyou.com.cn/group1/M00/00/E8/rB8Mk19leUeAENytAApIOcZ78Zw513.JPG',
        'https://testimg.quanyou.com.cn/group1/M00/00/F4/rB8Mk198AyuAD3SxAA1BKG7d-8A396.png',
        'https://testimg.quanyou.com.cn/group1/M00/00/D9/rB8Mkl9R8zGAHAaIAAJiR9cXsKg193.JPG'
      ],

      otherFilters: [], // 表格额外查询条件
      tableConfig: {
        // interfacePath: `${process.env.VUE_APP_BASE_API}/api/v1/settlementDetail/page`,
        tabIndex: 12,
        hideSearchBar: true,
        pageSize: 20,
        sort: '',
        order: 'desc',
        setting: [{
          prop: 'sourceType',
          label: '来源类型',
          minWidth: 120
        }, {
          prop: 'adjustAccountsCode',
          label: '核算单号',
          minWidth: 120
        }, {
          prop: 'platformName',
          label: '平台名称',
          minWidth: 120
        }, {
          prop: 'storeName',
          label: '店铺名称',
          minWidth: 120
        }, {
          prop: 'dcCode',
          label: '平台单号',
          minWidth: 120
        }, {
          prop: 'ecCode',
          label: '电商单号',
          minWidth: 120
        }, {
          prop: 'buyer',
          label: '顾客ID',
          minWidth: 120
        }, {
          prop: 'receiver',
          label: '顾客姓名',
          minWidth: 120
        }, {
          prop: 'receiverPhone',
          label: '联系方式',
          minWidth: 120
        }, {
          prop: 'receiverAddress',
          label: '顾客收货地址',
          minWidth: 150
        }, {
          prop: 'bookTime',
          label: '下单时间',
          minWidth: 150,
          type: 'date'
        }, {
          prop: 'agencyName',
          label: '办事处',
          minWidth: 120
        }, {
          prop: 'servicerCode',
          label: '服务商编码',
          minWidth: 120
        }, {
          prop: 'servicerName',
          label: '服务商名称',
          minWidth: 130
        }, {
          prop: 'isBasePrice',
          label: '是否基价核算',
          minWidth: 120
        }, {
          prop: 'refundFee',
          label: '业务账号编码',
          minWidth: 120
        }, {
          prop: 'businessAccountName',
          label: '业务账号名称',
          minWidth: 130
        }, {
          prop: 'supplierName',
          label: '供应商名称',
          minWidth: 130
        }, {
          prop: 'adjustedServicerCode',
          label: '调拨后服务商编码',
          minWidth: 150
        }, {
          prop: 'adjustedServicerName',
          label: '调拨后服务商名称',
          minWidth: 150
        }, {
          prop: 'adjustedBusinessAccountCode',
          label: '调拨后业务账号编码',
          minWidth: 150
        }, {
          prop: 'adjusteDusinessAccountName',
          label: '调拨后业务账号名称',
          minWidth: 150
        }, {
          prop: 'ecSkuCode',
          label: '商品编码',
          minWidth: 120
        }, {
          prop: 'ecSkuName',
          label: '商品名称',
          minWidth: 120
        }, {
          prop: 'finalUnitPrice',
          label: '成交单价',
          minWidth: 120
        }, {
          prop: 'buyQuantity',
          label: '购买数量',
          minWidth: 120
        }, {
          prop: 'saleReturnedQuantity',
          label: '实退货数量(售中)',
          minWidth: 150
        }, {
          prop: 'afterSaleReturnedQuantity',
          label: '实退货数量(售后)',
          minWidth: 150
        }, {
          prop: 'isGift',
          label: '是否赠品',
          minWidth: 120
        }, {
          prop: 'giftType',
          label: '赠品类型',
          minWidth: 120
        }, {
          prop: 'giftRemark',
          label: '赠品备注',
          minWidth: 120
        }, {
          prop: 'serviceFeeDiscount',
          label: '服务费点数',
          minWidth: 130
        }, {
          prop: 'serviceFee',
          label: '服务费',
          minWidth: 120
        }, {
          prop: 'purchaseCost',
          label: '采购成本',
          minWidth: 150
        }, {
          prop: 'allowanceCode',
          label: '补贴单号',
          minWidth: 120
        }, {
          prop: 'allowanceType',
          label: '补贴类型',
          minWidth: 120
        },
        {
          prop: 'allowanceFee',
          label: '补贴金额',
          minWidth: 120
        }, {
          prop: 'allowanceReason',
          label: '补贴原因',
          minWidth: 130
        }, {
          prop: 'allowanceTime',
          label: '补贴时间',
          minWidth: 150
        }, {
          prop: 'cutPaymentCode',
          label: '扣款单号',
          minWidth: 120
        }, {
          prop: 'cutPaymentType',
          label: '扣款类型',
          minWidth: 120
        }, {
          prop: 'cutPaymentFee',
          label: '扣款金额',
          minWidth: 120
        }, {
          prop: 'cutPaymentReason',
          label: '扣款原因',
          minWidth: 120
        }, {
          prop: 'cutPaymentTime',
          label: '扣款时间',
          minWidth: 150
        }, {
          prop: 'relationRefundApplyCode',
          label: '关联退款申请明细单号',
          minWidth: 180
        }, {
          prop: 'adjustmentFee',
          label: '调整金额',
          minWidth: 120
        }, {
          prop: 'allowanceTotalFee',
          label: '补贴总金额',
          minWidth: 120
        }, {
          prop: 'cutPaymentTotalFee',
          label: '扣款总金额',
          minWidth: 120
        }, {
          prop: 'refundTotalFee',
          label: '返款总金额',
          minWidth: 120
        }, {
          prop: 'settleQuantity', // 缺字段
          label: '核算数量',
          minWidth: 130
        }, {
          prop: 'adjustAccountsEndTime',
          label: '核算截止时间',
          minWidth: 150
        }, {
          prop: 'refundApplyCode',
          label: '退款申请明细单号',
          minWidth: 150
        }, {
          prop: 'dcRefundCode',
          label: '平台退款单号',
          minWidth: 120
        }, {
          prop: 'refundableFee',
          label: '应退款金额',
          minWidth: 120
        }, {
          prop: 'refundApplyFee',
          label: '退款申请金额',
          minWidth: 120
        }, {
          prop: 'refundReason',
          label: '买家退款原因',
          minWidth: 130
        }, {
          prop: 'subjectToliabilityName',
          label: '责任主体',
          minWidth: 150
        }, {
          prop: 'remark',
          label: '退款备注',
          minWidth: 120
        }, {
          prop: 'refundPropertyName',
          label: '退款性质',
          minWidth: 120
        }, {
          prop: 'cleanDiscount',
          label: '清理折扣',
          minWidth: 130
        }, {
          prop: 'goodsStateName',
          label: '货品状态',
          minWidth: 120
        }, {
          prop: 'afterDiscountFee',
          label: '折后金额',
          minWidth: 120
        }, {
          prop: 'discountFee',
          label: '折扣金额',
          minWidth: 120
        }, {
          prop: 'cleanState',
          label: '清理状态',
          minWidth: 120
        }, {
          prop: 'settleState',
          label: '结算状态',
          minWidth: 120
        }, {
          prop: 'paymentFee', // 缺字段
          label: '应结算单价(售中)',
          minWidth: 130
        }, {
          prop: 'allowanceFee',
          label: '本次应结算金额',
          minWidth: 150
        }, {
          prop: 'shouldSettlementFee',
          label: '本次核算成交金额',
          minWidth: 120
        }, {
          prop: 'settledFee',
          label: '已结算金额',
          minWidth: 120
        }, {
          prop: 'expressCompanyName',
          label: '快递公司名称',
          minWidth: 120
        }, {
          prop: 'expressNumber',
          label: '快递单号',
          minWidth: 120
        }, {
          prop: 'isReturnGoods',
          label: '是否退货',
          minWidth: 130
        }, {
          prop: 'channelStockCode',
          label: '渠道库存号',
          minWidth: 120
        }, {
          prop: 'productCode',
          label: '产品编码',
          minWidth: 150
        }, {
          prop: 'productName',
          label: '产品名称',
          minWidth: 120
        }, {
          prop: 'isProductCombine', // 缺字段
          label: '是否产品组合',
          minWidth: 120
        }, {
          prop: 'cdsOrderCode', // 缺字段
          label: '产品组合编码',
          minWidth: 120
        }, {
          prop: 'paymentFee', // 缺字段
          label: '产品组合名称',
          minWidth: 130
        }, {
          prop: 'purchaseCode',
          label: '采购单号',
          minWidth: 150
        }, {
          prop: 'isSecondSale',
          label: '是否二次销售',
          minWidth: 120
        }, {
          prop: 'stockCreateTime',
          label: '库存产生时间',
          minWidth: 120
        }, {
          prop: 'handleType',
          label: '处理方式',
          minWidth: 120
        }, {
          prop: 'applicant',
          label: '申请人',
          minWidth: 120
        }, {
          prop: 'applicationTime',
          label: '申请日期',
          minWidth: 150
        }, {
          prop: 'isInitial',
          label: '是否期初',
          minWidth: 120
        }, {
          prop: 'stockCreateReason',
          label: '库存产生原因',
          minWidth: 150
        }, {
          prop: 'settleApplicant',
          label: '结算申请人',
          minWidth: 120
        }, {
          prop: 'settleApplicationTime',
          label: '结算申请时间',
          minWidth: 150
        }, {
          prop: 'settleApplicationRemark',
          label: '结算申请备注',
          minWidth: 180
        }, {
          prop: 'settleAuditor',
          label: '结算审核人',
          minWidth: 130
        }, {
          prop: 'settleAuditTime',
          label: '结算审核时间',
          minWidth: 150
        }, {
          prop: 'settleAuditRemark',
          label: '结算审核备注',
          minWidth: 150
        }, {
          prop: 'settleReturnedBy',
          label: '结算退回人',
          minWidth: 120
        }, {
          prop: 'settleReturnTime',
          label: '结算退回时间',
          minWidth: 120
        }, {
          prop: 'settleReturnRemark',
          label: '结算退回备注',
          minWidth: 120
        }, {
          prop: 'isGather',
          label: '是否汇总',
          minWidth: 130
        }, {
          prop: 'aggregator',
          label: '汇总人',
          minWidth: 120
        }, {
          prop: 'gatherTime',
          label: '汇总时间',
          minWidth: 150
        }, {
          prop: 'gatherCode',
          label: '汇总单号',
          minWidth: 120
        }, {
          prop: 'isUploadSap',
          label: '是否上传SAP',
          minWidth: 130
        }, {
          prop: 'uploader',
          label: '上传SAP人',
          minWidth: 120
        }, {
          prop: 'uploadTime',
          label: '上传SAP时间',
          minWidth: 150
        }, {
          prop: 'uploadRemark',
          label: '上传SAP备注',
          minWidth: 140
        }, {
          prop: 'lockedBy',
          label: '锁定人',
          minWidth: 120
        }, {
          prop: 'lockTime',
          label: '锁定时间',
          minWidth: 120
        }, {
          prop: 'unlockedBy',
          label: '解锁人',
          minWidth: 130
        }, {
          prop: 'unlockTime',
          label: '解锁时间',
          minWidth: 150
        }, {
          prop: 'adjustAccountsSchemeCode',
          label: '核算方案编码',
          minWidth: 130
        }, {
          prop: 'dcCode', // 缺字段
          label: '终止结算人',
          minWidth: 150
        }, {
          prop: 'buyer', // 缺字段
          label: '终止结算备注',
          minWidth: 150
        }, {
          prop: 'storeCode',
          label: '店铺编码',
          minWidth: 120
        }, {
          prop: 'shopName', // 缺字段
          label: '库存状态',
          minWidth: 120
        }, {
          prop: 'cdsOrderCode', // 缺字段
          label: '运费',
          minWidth: 120
        }, {
          prop: 'receiverPhone', // 缺字段
          label: '联系方式2',
          minWidth: 130
        }, {
          prop: 'refundPropertyName', // 缺字段 退款性质名称
          label: '退款来源类型',
          minWidth: 150
        }, {
          prop: 'adjustmentFee', // 缺字段
          label: '调整金额现值',
          minWidth: 150
        }, {
          prop: 'remark', // 缺字段
          label: '备注',
          minWidth: 120
        }, {
          prop: 'storeName', // 缺字段
          label: '账号名称',
          minWidth: 130
        }]
      },
      tableData: [
        { id: 1, name: 111 },
        { id: 2, name: 111 },
        { id: 3, name: 111 },
        { id: 4, name: 111 }
      ]
    }
  },
  created() {

  },

  methods: {
    // mixins 中已存在goBack，若需重写，则增加goBack方法
    goBack() {
      this.nowPageShow = false
    }
  }
}
</script>
<style lang='scss' scoped>
  /deep/ .el-breadcrumb__inner{
    color: $qup-color-primary;
  }
  .mt20{
    margin-top: 20px;
  }
  .voucher-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .voucher{
      width: 120px;
      height: 120px;
      margin:0 5px 5px 0;
      overflow: hidden;
      img{
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
  }
</style>
