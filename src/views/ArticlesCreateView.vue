<template>
  <div class="edit-article">
    <ArticleForm
      :article="article"
      :is-editing="false"
      :loading="loading"
      @submit-article="submitArticle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleForm from "@/components/ArticleForm.vue";
import { createArticle } from "@/api/articles";
import { ArticleType } from "@/types/article";
import useAPI from "@/hooks/useApi";

export default defineComponent({
  name: "ArticlesCreateView",
  components: {
    ArticleForm,
  },
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      } as ArticleType,
      loading: false,
    };
  },
  methods: {
    async submitArticle(tags: string[]) {
      this.loading = true;
      this.article.tagList = tags;
      const { request, pending } = useAPI({
        apiMethod: () => createArticle(this.article),
        successCallback: () => {
          this.$router.push(`/`);
        },
        failedCallback: () => {
          this.loading = false;
        },
      });
      await request();
      this.loading = false;
    },
  },
});
</script>
