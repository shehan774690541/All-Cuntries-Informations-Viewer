<template>
  <div class="container">
    <div class="topBar">
      <div style="font-size: 20px;  font-family: 'Century Gothic';"> {{ $route.meta.title }}</div>
      <div style="display: flex; padding: ;">
        <div>
          <input v-model="this.store.createCard.searchBar" v-on:keyup="updateStore()" type="text" placeholder="   search..."
            style="margin-right: 30px; padding: 3px; background-color: #ffffff; border: solid 1px rgba(0, 0, 0, 0.13); border-radius: 20px;">
        </div>
        <div style="margin-right: 30px; ">
          <v-badge :content="20">
            <v-icon size="x-large">mdi-bell-outline</v-icon>
          </v-badge>
        </div>
        <div>
          <v-avatar icon="$vuetify"
            image="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"></v-avatar>
        </div>
        <div style="margin-left: 20px;">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" style="box-shadow: none; background-color: transparent;">
                {{ this.userName }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list style="background-color: transparent; box-shadow: none;">
              <v-list-item>
                <v-list-item-title>
                  <v-btn v-on:click="logoutUser()"
                    style="border: none; box-shadow: none; background-color: #1E1E1E; color: #ffffff;">
                    <v-icon left>mdi-logout</v-icon>
                    LOGOUT
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view :key="RouterKey" />
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { useStore } from '@/store/store';
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import networkManager from '@/network'

export default defineComponent({
  name: "AppMain",
  data() {
    return {
      searchValue: "",
      userName: ""
    }
  },
  computed: {
    RouterKey() {
      return this.$route.path;
    },
    changeTitle() {
      console.log(this.$route.meta.title);
    },

  },
  methods: {
    updateStore() {
      this.store.updateCard(this.store.createCard)
      console.log(this.store.createCard)
    },
    searchValueChange(vlv) {
      this.store.searchBar = vlv
    },
    viewUserName() {
      this.userName = JSON.parse(localStorage.getItem('loginData')).name
    },
    logoutUser() {
      console.log("logouting user...")
      localStorage.clear();
      router.push("/");
    }

  },
  created() {
    this.viewUserName();
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      store.loadFromLocalStorage();
    });

    const updateStore = () => {
      store.updateCard(store.createCard);
    };

    const changePageNextOrBack = (path) => {
      router.push(path);
    };

    return { store, updateStore, changePageNextOrBack };
  },
  // created() {
  // }
},
)
</script>

<style scoped>
.container {
  background-color: #EFEFEF;
  height: 100vh;
  padding: 0px 40px 0px 40px;
}

.topBar {
  width: 100%;
  height: 100px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  background-color: rgb(255, 255, 255);
  width: 100%;
  /* display: flex; */
  max-height: 85%;
  padding: 10px;
  border-radius: 20px;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0;
}
</style>