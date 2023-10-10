<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <div
      v-if="!localLoading"
      class="article-form"
    >
      <h2 class="text-dark">
        {{ formTitle }}
      </h2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form class="row gap-2">
          <div class="col-9">
            <ValidationProvider
              v-slot="validationTitle"
              name="Title"
              rules="required"
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
                />
                <b-form-invalid-feedback>
                  {{ validationTitle.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationDesc"
              name="Description"
              rules="required"
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
                />
                <b-form-invalid-feedback>
                  {{ validationDesc.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="validationBody"
              name="Body"
              rules="required"
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
                />
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
                />
              </b-input-group>
            </b-form-group>
            <b-form-checkbox-group
              v-model="selectedTags"
              class="tags"
              :options="tagOptions"
            />
          </div>

          <div class="submit-btn">
            <b-button
              variant="primary"
              @click="handleSubmit(submitForm)"
            >
              {{
                TRANSLATIONS.submit
              }}
            </b-button>
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
import { defineComponent } from "vue";
import { Article, ArticleFormData } from "@/types/articleForm";
import { getAllTags } from "@/api/tags";
import { TRANSLATIONS } from "@/constants/articleForm";
import ArticleFormSkeleton from "@/components/ArticleFormSkeleton.vue";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate";
import "@/utils/validationRules";
import useAPI from "@/hooks/useApi";

export default defineComponent({
  name: 'ArticleForm',
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
      required: true,
      default: false,
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
      handler(newValue: string[]) {
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
});
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
