<template>
  <el-dialog
    custom-class="job-dialog"
    v-model="visible" 
    :center="true" 
    :before-close="closeDialog"
    title="选择求职意向"
  >
    <el-cascader-panel
      v-model="selectedJobs"
      ref="jobCascader"
      style="height:250px;" 
      :options="jobOptions"
      :props="{ multiple: true, emitPath: false, checkStrictly: true }"
      @change="jobSelected"
    />
    <template #footer>
      <el-row justify="end">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.jobOptions = require('@/assets/job.json');
  },
  data() {
    return {
      jobOptions: {},
      selectedJobs: []
    }
  },
  methods: {
    closeDialog: function(done) {
      this.$emit('close');
      done();
    },
    jobSelected: function() {
      const disable = this.selectedJobs.length >= 3;
      this.setCanSelect(this.jobOptions, disable);
    },
    setCanSelect(items, disable) {
      items.forEach((item, index) => {
        if (_.get(item, "children", false)) { // 向子节点递归
          this.setCanSelect(item.children, disable);
        }
        else {
          items[index].disabled = this.selectedJobs.indexOf(item.value) > -1 ? false : disable;
        }
      });
      return items;
    },
    submit: function() {
      // TODO
      console.log(this.selectedJobs)
      this.$emit('close');
    }
  }
}
</script>

<style>
.el-cascader-menu__wrap.el-scrollbar__wrap {
  height: 260px;
}
.job-dialog {
  width: 582px;
  --el-dialog-padding-primary: 20px;
}
.job-dialog .el-dialog__body {
  padding: 10px 20px;
}
</style>
