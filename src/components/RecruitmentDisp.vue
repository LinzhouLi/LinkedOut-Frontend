<template>
  <el-card style="margin-top:20px">
    <template #header>
      <div style="padding:10px;">
        <user-brief-disp v-bind="user" />
      </div>
    </template>
    <div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    recruitmentId: { // 招聘信息ID
      type: Number,
      required: true,
    },
    userId: { // 用户统一ID
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
    recruitmentName: {
      type: String,
      required: ture,
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
        userId: this.userId,
        userName: this.userName,
        userType: this.userType,
        userIconUrl: this.userIconUrl,
        userBriefInfo: this.userBriefInfo
      }
    }
  },
}
</script>

<style scoped>
.el-card {
  --el-card-padding: 0px;
}
</style>