<template>
  <el-card>
    <template #header>
      <div style="padding:10px;">
        <el-row>
          <el-col :span="22">
            <user-brief-disp v-bind="user" />
          </el-col>
          <el-col :span="2">
            <el-button v-if="ifSelf" type="text" @click="deleteThisRecuitment">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
    <div class="recruitment-div" @click="checkRecruitment">
      <h3 class="recruitment-name">{{ recruitmentTitle }}</h3>
        <el-row>
          <el-col :span="16">
            <div class="recruitment-classification">{{ `职位分类: ${recruitmentType}` }}</div>
          </el-col>
          <el-col :span="8">
            <div class="salary-number"><b>{{ salary }}</b></div>
          </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
import UserBriefDisp from './UserBriefDisp';
import { deletePosition } from '@/apis/recruit.js';
import { ElMessageBox } from 'element-plus';

export default {
  components: {
    UserBriefDisp
  },
  props: {
    recruitmentId: { // 招聘信息ID
      type: Number,
      required: true,
    },
    unifiedId: { // 用户统一ID
      type: Number,
      required: true,
    },
    userName: { // 动态发布者真实姓名
      type: String,
      required: true,
    },
    userType: { // 动态发布者用户类型
      type: String,
      required: true,
    },
    userIconUrl: { // 动态发布者头像
      type: String,
      default: '',
    },
    userBriefInfo: { // 动态发布者简短介绍
      type: String,
      default: '',
    },
    recruitmentTitle: {
      type: String,
      required: true,
    },
    recruitmentType: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true
    }
  },
  computed: {
    user() {
      return {
        unifiedId: this.unifiedId,
        userName: this.userName,
        userType: this.userType,
        userIconUrl: this.userIconUrl,
        userBriefInfo: this.userBriefInfo
      }
    }
  },
  data() {
    return {
      ifSelf: false
    }
  },
  created() {
    this.ifSelf = this.unifiedId == localStorage.getItem('unifiedId');
  },
  methods: {
    checkRecruitment: function() {
      this.$router.push({ name: 'recruitment', params: { rid: this.recruitmentId }});
    },
    deleteThisRecuitment: async function() {
      ElMessageBox.confirm(
        '确认删除?',
        'Warning',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(async () => {
        const resp = await deletePosition({
          unifiedId: localStorage.getItem('unifiedId'),
          jobId: this.recruitmentId
        });
        if (resp.status == 200 && resp.data.code == 'success') {
          this.$message.success('删除成功!');
          this.$emit('updateAfterDel');
        }
        else this.$message.error('删除失败!');
      });
    }
  }
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
}
.recruitment-div {
  cursor: pointer;
  padding: 5px 15px 10px;
}
.recruitment-name {
  margin:10px 0px 0px;
}
.recruitment-classification {
  margin-top: 10px;
  font-size: 14px;
  color: rgb(122 122 122);
}
.salary-number {
  color: rgb(73 120 206);
  float: right;
  font-size: 20px;
}
</style>