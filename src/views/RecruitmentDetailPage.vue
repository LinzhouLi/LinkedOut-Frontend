<template>
  <top-nav/>
  <el-row style="margin-top:20px">
    <el-col :offset="4" :span="11" style="margin-right:20px">
      <el-card>
        <div id="mini-text">招聘中</div>
        <h1>{{ recruitmentTitle }}</h1>
      </el-card>
    </el-col>
    <el-col :span="5">
      <user-recommend-card/>
    </el-col>
  </el-row>
</template>

<script>
import TopNav from '@/components/TopNav';
import UserRecommendCard from '@/components/UserRecommendCard';
// import Vditor from 'vditor';
// import '@/assets/vditor.css';

export default {
  // mounted() {
  //   console.log(this.$route.params.rid);
  //   this.editor = new Vditor('text-area', {
  //     width: 500,
  //     height: 500,
  //     toolbar: ['emoji', 'br', 'bold', '|', 'line'],
  //     cache: {
  //       enable: false,
  //     },
  //     blur: value => { console.log(value) },
  //     mode: "wysiwyg"
  //   })
  // },
  components: {
    TopNav,
    UserRecommendCard
  },
  beforeCreate() {
    this.recruitmentTitle = '资深前端研发-到综商家';
    this.salary = '20-40K·15薪';
    this.limit = '上海 · 1-3年 · 本科'
  },
  data() {
    return {
      recruitmentTitle: '',
      salary: '',
      limit: '',
      detailedInfo: '',
      type: ''
    }
  }
}
</script>

<style scoped>
#mini-text {
  font-size: 10px;
  color: rgb(122 122 122);
}
</style>