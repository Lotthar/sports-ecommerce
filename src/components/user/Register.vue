<template>
    <q-page style="min-height: 450px;">
      <q-card-section>
        <q-form ref="registerForm">
          <q-card-section>
            <div class="row">
              <q-input
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
                    @click="user.email = ''"
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
                    @click="user.password = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input  :rules="[val => !!val]" dark v-model="user.displayName" class="col-12" outlined label="Unesite vaše ime i prezime">
                <template v-slot:append>
                  <q-icon
                    v-if="user.displayName"
                    name="close"
                    @click="user.displayName = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input dark v-model="user.country" class="col-12" outlined label="Unesite državu stanovanja">
                <template v-slot:append>
                  <q-icon
                    v-if="user.country"
                    name="close"
                    @click="user.country = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input dark v-model="user.city" class="col-12" outlined label="Unesite grad stanovanja">
                <template v-slot:append>
                  <q-icon
                    v-if="user.city"
                    name="close"
                    @click="user.city = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input dark v-model="user.address" class="col-12" outlined label="Unesite vašu adresu">
                <template v-slot:append>
                  <q-icon
                    v-if="user.address"
                    name="close"
                    @click="user.address = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input
                dark
                v-model="user.photoURL"
                class="col-12"
                outlined
                label="URL do vaše slike na profilu"
              >
                <template v-slot:append>
                  <q-icon
                    v-if="user.photoURL"
                    name="close"
                    @click="user.photoURL = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-separator color="primary" />
          <q-card-section>
            <div class="row justify-evenly">
              <div class="col-3">
                <q-btn to="login" dense color="info" class="full-width" label="Nazad na prijavu" />
              </div>
              <div class="col-3">
                <q-btn
                  @click="resetingValidation()"
                  style
                  dense
                  color="grey"
                  class="full-width"
                  label="Resetuj"
                />
              </div>
              <div class="col-3">
                <q-btn
                  @click="register()"
                  dense
                  style
                  color="negative"
                  class="full-width"
                  label="Registruj"
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
  firebaseRegisterUser,
  authUser,
  sendEmailVerification,
  updateUser,
  registerUserDB
} from "../../services/firebase/userservices";
import { makeNewCart } from "../../services/firebase/cartservice";

export default {
    name: "RegisterPage",
  data() {
    return {
      isPasswordSeen: false,
      user: {
        email: "",
        password: "",
        displayName: "",
        country: "",
        city: "",
        address: "",
        emailVerified: false,
        photoURL: ""
      }
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
    newStateUser() {
      // Zamijeniti sa novom fb funkcijom koja vraca user-a
      let aUser = authUser();
      const firstlastname = !this.user.displayName ? ["",""] : this.user.displayName.split(" ");

      let registerDbUser = {
        email: this.user.email,
        firstname: firstlastname[0],
        lastname: firstlastname[1],
        imgURL: this.user.photoURL,
        country: this.user.country,
        city: this.user.city,
        address: this.user.address
      };
      return { uid: aUser.uid, data: registerDbUser };
    },
    async register() {
      const success = await this.$refs.registerForm.validate();
      if (success) {
        const { email, password, displayName, photoURL } = this.user;
        try {
          await firebaseRegisterUser({ email, password });
          console.log("Uspjesno registrovan i prijavljen");
          try {
            await sendEmailVerification();
            console.log("Verifikacioni email poslat na: " + email);
            try {
              let newFBuser = this.newStateUser();
              await registerUserDB(newFBuser)
              // napravi korisnicku korpu
              await makeNewCart(newFBuser.uid);
              this.$q.notify({
                message:
                  "Uspješna registracija! Verifikacioni e-mail je poslat na: "+email,
                color: "positive",
                duration: "4000"
              });
              this.$router.push({ name: "LoginPage" });
            } catch (error) {
              this.$q.notify({
                message: "Nešto nije u redu prilikom registracije korisnika",
                color: "negative"
              });
            }
          } catch (error) {
            this.$q.notify({
              message: "Greška prilikom slanja verifikacionog maila na: " + email + ". Probajte opet.." ,
              color: "negative"
            });
          }
        } catch (error) {
          this.$q.notify({
            message: "Greška tokom registracije korisnika",
            timeout: 3000,
            color: "negative"
          });
        }
      } else {
        this.$q.notify({
          message: "Email ili password nije u dobrom formatu",
          timeout: 3000,
          color: "negative"
        });
      }
    },
    resetingValidation() {
      this.$refs.registerForm.resetValidation();
      this.user = {
        email: "",
        password: "",
        displayName: "",
        emailVerified: false,
        photoURL: ""
      };
    }
  }
};
</script>
<style lang="scss">
</style>