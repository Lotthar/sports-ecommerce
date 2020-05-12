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
                label="Enter your email address"
                :rules="[val => !!val   || 'Email of the user is required',
                        val => isValidEmail || 'You must enter email of proper format']"
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
                    @click="user.password = ''"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-input  :rules="[val => !!val]" dark v-model="user.displayName" class="col-12" outlined label="Enter your first and lastname">
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
              <q-input dark v-model="user.country" class="col-12" outlined label="Enter your country">
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
              <q-input dark v-model="user.city" class="col-12" outlined label="Enter your city">
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
              <q-input dark v-model="user.address" class="col-12" outlined label="Enter your address">
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
                label="URL to your profile picture"
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
                <q-btn to="login" dense color="info" class="full-width" label="Back to Login" />
              </div>
              <div class="col-3">
                <q-btn
                  @click="resetingValidation()"
                  style
                  dense
                  color="grey"
                  class="full-width"
                  label="Reset"
                />
              </div>
              <div class="col-3">
                <q-btn
                  @click="register()"
                  dense
                  style
                  color="negative"
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
  firebaseRegisterUser,
  authUser,
  sendEmailVerification,
  updateUser,
  registerUserDB
} from "../../services/firebase/userservices";

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
            console.log("Verification email has been sent to: " + email);
            try {
              let newFBuser = this.newStateUser();
              await registerUserDB(newFBuser)
              this.$q.notify({
                message:
                  "User successfuly registered! Verification email has been sent! ",
                color: "positive",
                duration: "4000"
              });
              this.$router.push({ name: "LoginPage" });
            } catch (error) {
              this.$q.notify({
                message: "Something went wrong while trying to register user",
                color: "negative"
              });
            }
          } catch (error) {
            this.$q.notify({
              message: "Error sending verification to this email: " + email,
              color: "negative"
            });
          }
        } catch (error) {
          this.$q.notify({
            message: "Error registering user",
            color: "negative"
          });
        }
      } else {
        this.$q.notify({
          message: "Email or password are not of the right format",
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