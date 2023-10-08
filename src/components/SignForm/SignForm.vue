<template>
  <div class="SignForm">
    <b-card
      :title="formTranslations.title"
      class="SignForm-card"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(submitForm)">
          <ValidationProvider
            v-if="isRegister"
            v-slot="validationUser"
            name="User"
            rules="required|alpha|min:4"
          >
            <b-form-group
              :label="formData.TRANSLATIONS.user"
              label-for="user"
              class="label"
            >
              <b-form-input
                id="user"
                v-model="formData.username"
                type="text"
                :state="getValidationState(validationUser)"
              />
              <b-form-invalid-feedback>
                {{ validationUser.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="validationEmail"
            name="Email"
            rules="required|email"
          >
            <b-form-group
              :label="formData.TRANSLATIONS.email"
              label-for="email"
              class="label"
            >
              <b-form-input
                id="email"
                v-model="formData.email"
                type="email"
                :state="getValidationState(validationEmail)"
              />
              <b-form-invalid-feedback>
                {{ validationEmail.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            v-slot="validationPassword"
            name="Password"
            :rules="passwordRules"
          >
            <b-form-group
              :label="formData.TRANSLATIONS.password"
              label-for="password"
              class="label"
            >
              <b-form-input
                id="password"
                v-model="formData.password"
                type="password"
                :state="getValidationState(validationPassword)"
              />
              <b-form-invalid-feedback>
                {{ validationPassword.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-button
            block
            type="submit"
            variant="primary"
            class="SignForm-btn"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <b-spinner small />
            </span>
            <span v-else>
              {{ formTranslations.btn }}
            </span>
          </b-button>
          <p>
            {{ formTranslations.footerText }}
            <span>
              <router-link
                class="font-weight-bold ml-2 link"
                :to="footerLink"
              >{{ formTranslations.footerAction }}</router-link>
            </span>
          </p>
        </b-form>
      </ValidationObserver>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { validations } from "./constants";
import { TRANSLATIONS } from "./constants";
import { LoginDataTypes, PageTranslations } from "./types";
import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from "vee-validate";
import "@/utils/validationRules";
setInteractionMode("eager");

export default Vue.extend({
  name: "SignForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
        username: "",
        TRANSLATIONS,
        validations,
      } as LoginDataTypes,
    };
  },
  computed: {
    footerLink(): string {
      return this.type === "login" ? "/register" : "/login";
    },
    isRegister(): boolean {
      return this.type === "register";
    },
    passwordRules(): string {
      return this.type === "register" ? "required|password" : "required|min:4";
    },
    formTranslations(): PageTranslations {
      return this.type === "register"
        ? this.formData.TRANSLATIONS.register
        : this.formData.TRANSLATIONS.login;
    },
    isLoading(): boolean {
      return this.loading;
    },
  },
  methods: {
    getValidationState({
      dirty,
      validated,
      valid = null,
    }: {
      dirty: boolean;
      validated: boolean;
      valid?: null | boolean;
    }) {
      return dirty || validated ? valid : null;
    },
    //improve validations add global methods for validations
    submitForm() {
      this.$emit("form-submit", this.formData);
    },
  },
});
</script>
<style lang="scss" scoped>
.SignForm {
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.SignForm-card {
  width: 450px;
  min-height: 423px;
  border-radius: 4px;
  background-color: #eceeef;
}
.card-title {
  font-size: 47px;
  color: var(--warm-grey);
}
.label {
  text-align: left;
}
.SignForm-btn {
  margin: 28px 0px 15px 0px;
}
.link {
  color: black;
}
.link:hover {
  color: #1c7cd5;
  text-decoration: none;
}
</style>
