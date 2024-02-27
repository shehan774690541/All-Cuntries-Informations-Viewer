<template>
  <div class="wrapper">
    <div style="padding: 20px;">
      <v-img src="../../assets/Images/Frame 39386.png" />
    </div>
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="home" v-on:click="getRoute('/Dashboard')"></v-list-item>
          <v-list-item prepend-icon="mdi-domain" title="Companies" value="Companies" v-on:click="getRoute('/Companies')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Creators" value="Creators" v-on:click="getRoute('/Creators')"></v-list-item>
          <v-list-item prepend-icon="mdi-eye" title="Viewer" value="Viewer" v-on:click="getRoute('/Viewers')"></v-list-item>
          <v-list-item prepend-icon="mdi-file-document" title="Activity Log" value="ActivityLog" v-on:click="getRoute('/Activity_Log')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 500px"></v-main>
    </v-layout>
  </div>
</template>

<script>
import router from '@/router'
export default {
  methods:{
    getRoute(path){
      router.push(path)
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: auto;
  margin: 0;
  padding: 10px;
  display: initial;

}
</style>