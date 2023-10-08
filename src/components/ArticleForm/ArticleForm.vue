<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div class="article-form" v-if="!localLoading">
      <h2 class="text-dark">{{ formTitle }}</h2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form class="row gap-2">
          <div class="col-9">
            <ValidationProvider
              name="Title"
              rules="required"
              v-slot="validationTitle"
            >
              <b-form-group
                id="title"
                :label="TRANSLATIONS.title"
                label-for="title-input"
                class="label"
              >
                <b-form-input
                  id="title-input"
                  v-model="article.title"
                  type="text"
                  :placeholder="TRANSLATIONS.title"
                  :state="getValidationState(validationTitle)"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ validationTitle.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Description"
              rules="required"
              v-slot="validationDesc"
            >
              <b-form-group
                id="description"
                :label="TRANSLATIONS.desc"
                label-for="description-input"
                class="label"
              >
                <b-form-input
                  id="description-input"
                  v-model="article.description"
                  type="text"
                  :placeholder="TRANSLATIONS.desc"
                  :state="getValidationState(validationDesc)"
                ></b-form-input>
                <b-form-invalid-feedback>
                  {{ validationDesc.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Body"
              rules="required"
              v-slot="validationBody"
            >
              <b-form-group
                id="body"
                :label="TRANSLATIONS.body"
                label-for="body-textarea"
                class="label"
              >
                <b-form-textarea
                  id="body-textarea"
                  v-model="article.body"
                  rows="7"
                  :placeholder="TRANSLATIONS.body"
                  :state="getValidationState(validationBody)"
                ></b-form-textarea>
                <b-form-invalid-feedback>
                  {{ validationBody.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
          </div>
          <div class="col-3">
            <b-form-group
              id="tags"
              :label="TRANSLATIONS.tags"
              label-for="tags-input"
              class="label"
            >
              <b-input-group>
                <b-form-input
                  id="tags-input"
                  v-model="newTag"
                  :placeholder="TRANSLATIONS.newTag"
                  @keyup.enter="addTag"
                ></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-checkbox-group
              class="tags"
              :options="tagOptions"
              v-model="selectedTags"
            />
          </div>

          <div class="submit-btn">
            <b-button @click="handleSubmit(submitForm)" variant="primary">{{
              TRANSLATIONS.submit
            }}</b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </div>
    <template v-else>
      <!-- skeleton -->
      <ArticleFormSkeleton />
    </template>
  </div>
</template>

<script lang="ts">
import { Article, ArticleFormData } from "./types"; // Import your types
import { getAllTags } from "@/API/tags";
import { TRANSLATIONS } from "@/components/ArticleForm/constants";
import ArticleFormSkeleton from "@/components/ArticleForm/components/ArticlePageSkeleton.vue";
import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from "vee-validate";
import "@/utils/validationRules";
import useAPI from "@/Hooks/useApi";
setInteractionMode("eager");

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    ArticleFormSkeleton,
  },
  props: {
    article: {
      type: Object as () => Article,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },
  data(): ArticleFormData {
    return {
      tags: [],
      selectedTags: [],
      TRANSLATIONS,
      newTag: "",
      isLoading: false,
    };
  },
  computed: {
    formTitle(): string {
      return this.isEditing
        ? TRANSLATIONS.editArticle
        : TRANSLATIONS.newArticle;
    },
    tagOptions(): string[] {
      // Ensure that tags are unique and sorted alphabetically
      const uniqueTags = [...new Set([...this.tags, ...this.article.tagList])];
      return uniqueTags.sort();
    },
    localLoading(): boolean {
      return this.isLoading || this.loading;
    },
  },
  watch: {
    "article.tagList": {
      immediate: true, // This ensures the watcher runs immediately on component creation
      handler(newValue) {
        // Update selectedTags with a copy of article.tagList
        this.selectedTags = [...newValue];
      },
    },
  },
  async created() {
    await this.fetchTags();
  },
  methods: {
    async fetchTags() {
      this.isLoading = true;
      const { request } = useAPI({
        apiMethod: () => getAllTags(),
        successCallback: (data) => {
          this.tags = data.tags;
        },
      });
      await request();
      this.isLoading = false;
    },
    submitForm() {
      this.$emit("submit-article", this.selectedTags);
    },
    addTag() {
      const newTagText: string = this.newTag.trim();
      if (newTagText !== "") {
        const isTagExisted = this.tags.includes(newTagText);
        const isTagSelected = this.selectedTags.includes(newTagText);

        if (!isTagExisted) {
          this.tags.push(newTagText);
        }
        if (!isTagSelected) {
          this.selectedTags.push(newTagText);
        }
        this.newTag = "";
      }
    },
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
  },
};
</script>

<style scoped>
.article-form {
  text-align: left;
}
.label {
  text-align: left;
  margin-bottom: 25px;
}
.submit-btn {
  display: flex;
  padding-left: 15px;
}
.tags {
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  margin-bottom: 25px;
  height: 310px;
  padding: 16px;
  border: solid 1px #ddd;
  overflow: scroll;
}
</style>
