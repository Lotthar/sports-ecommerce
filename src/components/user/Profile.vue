<template>
  <div v-if="user">
    PROFILE  {{  `${user.firstname} ${user.lastname}` }}
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { getFBUserByUID } from "../../services/firebase/userservices";

export default {
  name: "UserProfile",
  data() {
    return {
      userFB: null
    }
  },
  computed: {
    user() {
      return !this.userFB ? "" : this.userFB.data();
    }
  },
  async mounted() {
    this.userFB = await getFBUserByUID(this.$route.params.userId);
    console.log(this.userFB);
  }
}
</script>