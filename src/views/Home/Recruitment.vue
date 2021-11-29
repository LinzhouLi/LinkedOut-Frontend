<template>
  <div v-for="(item,index) in recruitmentList" :key="index">
    <recruitment-disp v-bind="item" />
  </div>
</template>

<script>
import RecruitmentDisp from '@/components/RecruitmentDisp';

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

export default {
  components: {
    RecruitmentDisp
  },
  created() {
    this.loadMoreRecruitments();
  },
  mounted() {
    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 距离顶部的距离
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区的高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 滚动条的总高度
      console.log( scrollTop, windowHeight, scrollHeight )
      if(scrollTop + windowHeight >= scrollHeight){ // 加载更多招聘信息
        if(!this.loadingMoreRecruitments) {
          this.loadMoreRecruitments();
        }
      } 
    }
  },
  data() {
    return {
      loadingMoreRecruitments: true,
      recruitmentList: []
    }
  },
  methods: {
    loadMoreRecruitments: function() {
      this.loadingMoreRecruitments = true;
      for(let i = 0; i < 10; i++) {
        let t = JSON.parse(JSON.stringify(recruitment));
        t.recruitmentId = Math.floor(Math.random()*10000);
        this.recruitmentList.push(t);
      }
      this.loadingMoreRecruitments = false;
    }
  }
}
</script>

<style scoped>

</style>