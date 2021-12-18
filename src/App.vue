<template>
  <router-view :key="JSON.stringify($route.params)" />
</template>

<style>
body {
  -webkit-font-smoothing: antialiased;
  margin: 0px;
  background-color: #f3f2ef;
}
</style>
