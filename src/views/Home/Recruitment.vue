<template>
  <div v-for="(item,index) in recruitmentList" :key="index">
    <recruitment-disp v-bind="item" />
  </div>
</template>

<script>
import RecruitmentDisp from '@/components/RecruitmentDisp';

export default {
  components: {
    RecruitmentDisp
  },
  created() {
    let recruitment = {
      recruitmentId: 0,
      userId: 123,
      userName: 'Ailibaba',
      userType: 'company',
      userIconUrl: '',
      userBriefInfo: '互联网公司',
      recruitmentTitle: 'xxx前端开发工程师',
      recruitmentType: '前端开发',
      salary: '18-20K',
    };
    for(let i = 0; i < 20; i++) {
      let t = JSON.parse(JSON.stringify(recruitment));
      t.recruitmentId = Math.floor(Math.random()*10000);
      this.recruitmentList.push(t);
    }
  },
  data() {
    return {
      recruitmentList: []
    }
  }
}
</script>

<style scoped>

</style>