<template>
<el-card style="margin-top:20px">
 <div><span id="text-area"/></div>
</el-card>
</template>

<script>
import VditorPreview from 'vditor/dist/method.min';
import '@/assets/vditor.css';
import {getEnterpriseInfo} from '@/apis/users.js'

export default {
  created(){
    this.companyDescription = `
## 概览
Inspire creativity, enrich life.

ByteDance is a technology company operating a range of content platforms that inform, educate, entertain and inspire people across languages, cultures, and geographies.

Dedicated to building global platforms of creation and interaction, ByteDance now has a portfolio of applications available in over 150 markets and 75 languages. For example, TikTok, Helo, Vigo Video, Douyin, and Huoshan.

ByteDance's platforms aim to help users explore and discover the world's creativity, knowledge and moments that matter in everyday life while empowering everyone to be a creator directly from their smartphones. We are committed to building a safe, healthy and positive online environment for all our users.

We welcome people from all backgrounds to join us. If tackling challenges in a fast-changing industry does not scare you, work with us and challenge yourself to move the world!
## 公司网站
https://job.bytedance.com/en/#/
## 公司规模
10001+人
## 公司总部
China,China
## 创立时间
2012
`
  },
  mounted:async function(){
    this.cid=this.$route.params.cid;
    const params={
      uid:localStorage.getItem('unifiedId'),
      sid:this.cid,
    }
    const resp=await getEnterpriseInfo(params);
    const datas=resp.data.data;

    this.companyDescription=datas.description;

    VditorPreview.preview(document.getElementById('text-area'), this.companyDescription);
  },
  data(){
    return{
      companyDescription: ''
    }
  },
}
</script>

<style>

</style>