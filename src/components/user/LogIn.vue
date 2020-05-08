<template>
    <q-page style="min-height: 450px;">
      <q-card-section v-if="passwordForgoten == false">
        <q-form ref="loginForm">
          <q-card-section>
              <div class="row">
                <q-input
                  type="email"
                  autofocus
                  ref="email"
                  v-model="user.email"
                  class="col-12"
                  dark
                  outlined
                  label="Enter your email address"
                  :rules="[val => !!val   || 'Email of the user is required',
                          val => isValidEmail || 'You must enter email of proper format']"
                >
                  <template v-slot:append>
                    <q-icon
                      v-if="user.email"
                      name="close"
                      @click="resetingValidation(true)"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <q-input
                  :type="isPasswordSeen ? 'text' : 'password'"
                  dark
                  ref="password"
                  v-model="user.password"
                  class="col-12"
                  outlined
                  label="Enter your password"
                  :rules="[val => !!val || 'Your need to enter your password',
                          val => isValidPassword || 'You need at least 8 characters']"
                >
                  <template v-slot:append>
                    <q-icon
                      color="primary"
                      :name="isPasswordSeen ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click.stop="isPasswordSeen = !isPasswordSeen"
                    />
                    <q-icon
                      v-if="user.password"
                      name="close"
                      @click="resetingValidation(false)"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-separator color="primary" />
            <q-card-section>
              <div class="row">
                <q-toggle
                color="secondary"
                  class="q-ml-md"
                  @input="passwordForgotenMethod()"
                  v-model="passwordForgoten"
                  label="Did you forget your password?"
                />
              </div>
              <div class="row justify-evenly">
                <div class="col-5">
                  <q-btn @click="logIn()" glossy dense color="accent" class="full-width" label="Log-in" />
                </div>
                <div class="col-5">
                  <q-btn
                    to="register"
                    glossy
                    dense
                    style
                    color="secondary"
                    class="full-width"
                    label="Register"
                  />
                </div>
              </div>
            </q-card-section>
          </q-form>
        </q-card-section>
      </q-page>
</template>

<script>
import {
  firebaseSignIn,
  sendPasswordResetEmail,
  loggUser,
  sendEmailVerification,
  authUser,
  setSessionCookies
} from "../../services/firebase/userservices";
import { mapActions } from "vuex";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      passwordForgoten: false,
      isPasswordSeen: false
    };
  },
  computed: {
    isValidEmail() {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(this.user.email);
    },
    isValidPassword() {
      return this.user.password.length >= 8;
    }
  },
  methods: {
    // ...mapActions("users", ["registerUser", "updateUser"]),
    passwordForgotenMethod() {
      if (this.passwordForgoten) {
        this.confirmResetPassword();
      }
    },
    newStateUser() {
      // Zamijeniti sa novom fb funkcijom koja vraca user-a
      let aUser = authUser();
      let { uid, displayName, photoURL, email } = aUser;
      let registerDbUser = {
        email: this.user.email,
        firstname: "",
        lastname: "",
        "country": ""
      };
      return { uid, data: registerDbUser };
    },
    async logIn() {
      let success = await this.$refs.loginForm.validate();
      if (success) {
        try {
          // Referencirati prave metode za signin
          await firebaseSignIn(this.user);
          // Treba mi metod koji vraca je li korisnik ulogovan
          if (loggUser()) {
            let newFBuser = this.newStateUser();
            // Ovdje dodati da se doda novi korisnik u vuex
            this.$q.notify({
              message: "You have succesfully signed in, Welcome!",
              color: "positive",
              duration: "5000"
            });
            this.$router.push({ name: 'HomePage'});
          } else {
            this.$q
              .dialog({
                dark: true,
                title: "Attention",
                cancel: true,
                message:
                  "Email of the user is not verified! Check-out your email for verification link or send another email",
                color: "info"
              })
              .onOk(async () => {
                try {
                  await sendEmailVerification();
                  console.log("Email za verifikaciju uspjesno poslat");
                } catch (error) {
                  if (error.code === "auth/too-many-requests") {
                    this.$q.notify({
                      message:
                        "Too many requests for verification have been sent and we blocked it for now for suspicious activity!",
                      color: "negative",
                      duration: "5000"
                    });
                  } else {
                    console.error(
                      "Doslo je do neke druge greske sa verifikacijom emaila",
                      error
                    );
                  }
                }
              })
              .onCancel(() => {})
              .onDismiss(() => {});
          }
        } catch (error) {
          this.$q.notify({
            message: "Error signing in user with given credentials!",
            color: "negative",
            duration: "4000"
          });
          this.$emit("shake");
        }
      } else {
        this.$emit("shake");
      }
    },
    resetingValidation(flag) {
      if (flag) {
        this.user.email = "";
        this.$refs.email.resetValidation();
      } else if (!flag) {
        this.user.password = "";
        this.$refs.password.resetValidation();
      } else {
        this.$refs.loginForm.resetValidation();
      }
    },
    confirmResetPassword() {
      this.$q
        .dialog({
          title: "Confirm",
          title: "Are you sure you forgot your password?",
          dark: true,
          color: "primary",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.isValidEmail) {
            sendPasswordResetEmail(this.user.email)
              .then(resp => {
                this.$q.notify({
                  color: "info",
                  timeout: 5000,
                  message:
                    "Password reset code has been sent to email: " +
                    this.user.email +
                    "\n" +
                    "Follow the provided link and change your password"
                });
                this.$emit("passwordReset");
              })
              .catch(error => {
                this.$q.notify({
                  color: "negative",
                  textColor: "dark",
                  message:
                    "Error sending email for password reset " + this.user.email
                });
                this.passwordForgoten = false;
              });
          } else {
            this.$q.notify({
              color: "negative",
              textColor: "dark",
              message: "Email is not valid for password reset"
            });
            this.passwordForgoten = false;
          }
        })
        .onCancel(() => {
          this.passwordForgoten = false;
        })
        .onDismiss(() => {
          this.passwordForgoten = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>

.q-btn {
  color: $dark;
}
</style>