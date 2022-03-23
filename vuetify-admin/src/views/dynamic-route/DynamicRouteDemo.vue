<template>
  <v-container fluid fill-height class="justify-center">
    动态路由示例
    <br />
    <router-link
      to="/dynamic-route-demo/123"
      v-if="$permission('dynamic-demo:jump-to-child')"
    >
      点击跳转
    </router-link>
  </v-container>
</template>
