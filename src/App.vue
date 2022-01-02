<template>
  <div>
    <router-view :key="JSON.stringify($route.params)" />
  </div>
</template>

<style>
body {
  -webkit-font-smoothing: antialiased;
  margin: 0px;
  background-color: #f3f2ef;
}
::-webkit-scrollbar {
  cursor: pointer;
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 147, 153, 0.9);
}
</style>
