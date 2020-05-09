<template>
<div  v-if="!user">
  <h1>Loading user data...</h1>
</div>
  <div v-else>
    PROFILE  {{  `${user.data.firstname} ${user.data.lastname}` }}
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { getUserFirebase, authUser } from "../../services/firebase/userservices";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null
    }
  },
  beforeCreate() {
    if(!authUser()) {
      this.$router.push({ name: "LoginPage"});
    }
  },
  async beforeMount() {
    this.user = await getUserFirebase(this.$route.params.userId);
  }
}
</script>