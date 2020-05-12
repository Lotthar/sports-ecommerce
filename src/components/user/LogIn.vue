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
                  label="Unesite vašu e-mail adresu"
                  :rules="[val => !!val   || 'Korisnički e-mail je neophodan!',
                          val => isValidEmail || 'Morate unijeti pravilan format e-maila']"
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
                  label="Unesite vašu lozinku"
                  :rules="[val => !!val || 'Morate unijeti vašu lozinku',
                          val => isValidPassword || 'Neophodno je makar 8 karaktera']"
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
                  label="Jeste li zaboravili vašu lozinku?"
                />
              </div>
              <div class="row justify-evenly">
                <div class="col-5">
                  <q-btn @click="logIn()" glossy dense color="accent" class="full-width" label="Prijava" />
                </div>
                <div class="col-5">
                  <q-btn
                    to="register"
                    glossy
                    dense
                    style
                    color="secondary"
                    class="full-width"
                    label="Registracija"
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
    async logIn() {
      let success = await this.$refs.loginForm.validate();
      if (success) {
        try {
          // Referencirati prave metode za signin
          await firebaseSignIn(this.user);
          // Treba mi metod koji vraca je li korisnik ulogovan
          if (loggUser()) {
            // Ovdje dodati da se doda novi korisnik u vuex
            this.$q.notify({
              message: "Uspješno ste se prijavili!",
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
                  "E-mail korisnika nije verifikovan! Provjerite vaše sanduče za verifikacioni e-mail..",
                color: "info"
              })
              .onOk(async () => {
                try {
                  await sendEmailVerification();
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
            message: "Greška prilikom prijave sa unesenim kredencijalima!",
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
          title: "Jeste li sigurni da ste zaboravili vašu lozinku?",
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
                    "Kod za resetovanje vaše lozinke vam je poslat na email. E-mail:" +
                    this.user.email +
                    "\n" +
                    "Pratite link i promjenite lozinku."
                });
                this.$emit("passwordReset");
              })
              .catch(error => {
                this.$q.notify({
                  color: "negative",
                  textColor: "dark",
                  message:
                    "Greška prilikom slanja emaila za resetovanje passworda. E-mail: " + this.user.email
                });
                this.passwordForgoten = false;
              });
          } else {
            this.$q.notify({
              color: "negative",
              timeout: 4000,
              message: "E-mail nije validan da bismo vam poslali link za resetovanje!"
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