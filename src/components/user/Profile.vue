<template>
  <div v-if="user" class="user-profile">
    <div class="user-information">
      <div class="profile-img">
        <q-img :ratio="1" :src="!user.data.imgURL ? 'statics/default-profile.jpg' : user.data.imgURL" />
      </div>
      <div class="user-data">
        <h2 >Personal informations</h2>
        <div> Name: <span> {{ `${user.data.firstname} ${user.data.lastname}` }}</span></div>
        <div> E-mail: <span> {{ user.data.email }}</span></div>
        <div> Country <span> {{ user.data.country }}</span></div>
        <div> City: <span> {{ user.data.city }}</span></div>
        <div> Address: <span> {{ user.data.address }}</span></div>
      </div>
    </div>
    <div class="cart-orders">
      <q-tabs
        v-model="userTabs"
        active-color="accent"
        indicator-color="primary"
        class="bg-primary text-white shadow-2"
        align="justify"
      >
        <q-tab name="cart" icon="shopping_cart" label="Cart" />
        <q-tab name="orders" icon="view_list" label="Orders" />
      </q-tabs>
      <q-separator class="q-ma-md" />
      <q-tab-panels v-if="userTabs.length"  class="q-mb-sm" v-model="userTabs" animated>
          <q-tab-panel name="cart">
            <router-view />
          </q-tab-panel>
          <q-tab-panel name="orders">
            <router-view />
          </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import { getUserFirebase, authUser } from "../../services/firebase/userservices";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
      userTabs: ""  
    }
  },
  beforeCreate() {
    if(!authUser()) {
      this.$router.push({ name: "LoginPage"});
    }
  },
  beforeMount() {
    if(this.$route.fullPath.includes("cart")) {
      this.userTabs = "cart";
    } else if(this.$route.fullPath.includes("orders")) {
      this.userTabs = "orders";
    } else {
      this.userTabs = "";
    }
  },
  watch: {
    userTabs(newTab) {
      if(!newTab.length) return; 
      let namePage = newTab === "cart" ? "UserCartPage" : "UserOrdersPage";
      this.$router.push({ name: namePage });
    }
  },
  async beforeMount() {
    this.$q.loading.show({
          spinner: QSpinnerGears,
          spinnerColor: 'accent',
          messageColor: 'white',
          backgroundColor: 'primary',
          message: 'LOADING USER DATA....'
    })
    this.user = await getUserFirebase(this.$route.params.userId);
    this.$q.loading.hide();
  }
}
</script>

<style lang="scss" scoped>
  div.user-profile {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $accent;
    background: rgba(0,0,0,0.1);
  }
  div.cart-orders {
    display: grid;
    border-radius: 7px;
    width: 97%;
    grid-template-columns: 1fr;
    .q-tab-panel, .q-tabs {
      border-radius: 7px;
    }
  }
  div.user-information {
    border-radius: 7px;
    margin: 10px;
    width: 97%;
    background: rgba($color: $primary, $alpha: 0.95);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    .q-img {
      border-radius: 7px;
      border-right: 2px solid $primary;
      box-shadow: 4px 0px 6px 0px #000000;
    }
    div.user-data {
      display: grid;
      margin: 0;
      padding: 10px;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      div {
        margin-left: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        justify-content: flex-start;
        color: white;
        font-size: 30px;
        
        span{
          font-weight: bolder;
          color: $accent;
        }
      }
      h2 {
        color: $accent;
        margin: 10px 0;
        text-align: center;
        text-decoration: underline;
        font-size: 50px;
      }
    }
  }

  @media(max-width: 700px) {
    div.user-information {
      grid-template-columns: 1fr;
    }
  } 

</style>