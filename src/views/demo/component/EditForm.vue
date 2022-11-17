<template>
  <el-dialog
    ref="refDlg"
    v-el-drag-dialog
    :title="formData.positionId ? '编辑' : '新增'"
    :visible.sync="dialogShow"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="clearForm"
    width="600px"
    @close="closeDialog"
  >
    <div>
      <el-form ref="refForm" :rules="formRules" :model="formData" size="mini" label-width="100px">
        <el-form-item label="职务名称:" prop="positionName">
          <el-input v-model.trim="formData.positionName" maxlength="20" show-word-limit placeholder="请输入职务名称" />
        </el-form-item>
        <el-form-item label="职务编码:" prop="positionCode">
          <el-input v-model.trim="formData.positionCode" placeholder="请输入职务编码" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item label="所属类型:" prop="typeId">
          <el-select v-model="formData.typeId" placeholder="请选择所属类型" style="width:100%">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片上传:" prop="pic">
          <div class="img-upload-container">
            <qup-img-uploader
              :width="100"
              :height="80"
              mask
              :image-size="300"
              :image-url="coverPic.absoluteUrl"
              :relative-url="coverPic.relativeUrl"
              @upload-success="uploadSuccess"
              @remove="deleteImage"
            />
            <span class="icon-msg">建议图片300KB以内,支持png\jpg\jpeg</span>
            <!-- 大小100*80 -->
          </div>
        </el-form-item>
        <el-form-item label="职务描述:">
          <el-input
            v-model="formData.positionDesc"
            type="textarea"
            placeholder="请输入职务描述"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button size="mini" @click="closeDialog">取消</el-button>
      <el-button size="mini" type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import QupImgUploader from '@/components/imgUploader'
import { saveDemo } from '@/api/demo'
export default {
  name: 'DemoEditForm',
  components: { QupImgUploader },
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    detailData: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      submiting: false,
      formData: {
        positionId: null,
        positionName: '',
        positionCode: '',
        typeId: '',
        pic: '',
        positionDesc: ''
      },
      formRules: {
        positionName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        positionCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { pattern: /^[a-z_]+$/, message: '请输入小写字母或下划线' }
        ],
        typeId: [
          { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
        ],
        pic: [
          { required: true, message: '请上传图片', trigger: ['blur', 'change'] }
        ]
      },
      typeList: [
        { id: 1, name: 'demo类型1' }
      ],
      coverPic: {
        absoluteUrl: '',
        relativeUrl: ''
      }
    }
  },

  computed: {
    dialogShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  created() {
    const data = this.detailData
    if (data && data.positionId) {
      const { positionId, positionName, positionCode, positionDesc } = data
      this.formData = { positionId, positionName, positionCode, positionDesc }
    }
  },

  methods: {
    closeDialog() {
      this.dialogShow = false
      this.clearForm()
    },
    clearForm(done) {
      this.formData = {
        positionId: null,
        positionName: '',
        positionCode: '',
        positionDesc: ''
      }
      this.$refs.refForm && this.$refs.refForm.clearValidate()
      done && done()
    },
    // 图片上传成功回调处理
    uploadSuccess(res) {
      const data = res.data || ''
      this.$set(this.formData, 'pic', data.picturePath || '')
      this.coverPic = {
        absoluteUrl: res.imageUrl,
        relativeUrl: data.picturePath
      }
      this.$refs.refForm.validateField('pic')
    },
    // 移除图片处理
    deleteImage() {
      this.formData.pic = ''
      this.coverPic = {
        absoluteUrl: '',
        relativeUrl: ''
      }
      this.$refs.refForm.validateField('pic')
    },
    // 提交表单处理
    submitForm() {
      if (this.submiting) return
      this.$refs['refForm'].validate((valid) => {
        if (valid) {
          this.submiting = true
          saveDemo(this.formData).then(res => {
            this.submiting = false
            if (res.success === 1) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.closeDialog()
              const isNew = !this.formData.positionId // 是否新增数据 true (新增则刷新列表到第一页)/ false (非新增则刷新当前页)
              this.$emit('success', isNew)
            }
          }).catch(() => {
            this.submiting = false
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.img-upload-container {
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  .icon-msg{
    margin-left: 10px;
    color: #999;
  }
}
</style>
