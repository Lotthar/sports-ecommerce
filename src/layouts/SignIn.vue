<template>
  <q-layout view="lHh Lpr lFf">
    <div class="sign-in-container fixed-center">
        <q-card class="signin-card" style="min-width: 350px">
          <q-card-section>
            <div class="row justify-center">
              <div style="text-align: center;" class="col-12 add-task-title">{{ signInHeader}}</div>
            </div>
            <q-page-container>
              <router-view />
            </q-page-container>
          </q-card-section>
        </q-card>
      </div>
  </q-layout>
</template>
<script>
export default {
  name: "SignInPage",
  data() {
    return {
      loginForm: true
    };
  },
  computed: {
    signInHeader() {
      return this.$route.name == "LoginPage" ? "Login Form" : "Register Form";
    }
  }
}
</script>

<style lang="scss" scoped>
.q-layout {
  height: 10vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background: url("../statics/sportswearbackground.jpg");
  background-color: rgba(0,0,0,0.5) !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  div.sign-in-container {
    height: 70%;
    max-height: 95%;
    box-shadow: 0px 0px 18px 8px $accent;
    border: 2px solid $primary;
    border-radius: 8px;
    background: rgba($color: $dark, $alpha: 0.85);
    width: 500px;
    .signin-card {
      width: 100%;
      height: 100%;
      color: $accent;
      background: rgba($color: white, $alpha: 0.6);

      div.add-task-title {
        font-size: 24px;
      }
    }
  }
}
</style>