<template>
  <q-layout view="lHh Lpr lFf">
      <div class="sign-in-container">
          <q-card class="signin-card" style="min-width: 350px">
            <q-img class="cursor-pointer" src="statics/sports-logo.jpg" @click="$router.push({name: 'HomePage'})" />
            <q-slide-transition>
              <q-card-section v-show="visible">
                <div class="row justify-center">
                  <div style="text-align: center;" class="col-12 add-task-title">{{ signInHeader}}</div>
                </div>
                <q-page-container>
                  <router-view />
                </q-page-container>
              </q-card-section>
            </q-slide-transition>
          </q-card>
        </div>
  </q-layout>
</template>
<script>
export default {
  name: "SignInPage",
  data() {
    return {
      loginForm: true,
      visible: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.visible = true;
    }, 250)
  },
  computed: {
    signInHeader() {
      return this.$route.name == "LoginPage" ? "Forma za prijavu korisnika" : "Forma za registraciju korisnika";
    }
  }
}
</script>

<style lang="scss" scoped>
.q-layout {
  overflow-x: hidden;
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-areas: '. signinarea signinarea .' ;
  background: url("../statics/sportswearbackground.jpg");
  background-color: rgba(0,0,0,0.5) !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  padding: 20px 0;
  div.sign-in-container {
    grid-area: signinarea;
    max-height: 100%;
    box-shadow: 0px 0px 18px 8px $accent;
    border: 2px solid $primary;
    border-radius: 8px;
    background: rgba($color: $dark, $alpha: 0.85);
    .signin-card {
      width: 100%;
      height: 100%;
      color: $primary;
      background: rgba($color: white, $alpha: 0.6);
      .q-img {
        height: 100%;
        width: 100%;
      }
      div.add-task-title {
        font-size: 24px;
      }
    }
  }
}
</style>