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
import type { ArticleType } from "@/types/article";
import useAPI from "@/hooks/useApi";
type DataShape = {
  article: ArticleType;
  loading: boolean;
}
export default defineComponent({
  name: "ArticlesCreateView",
  components: {
    ArticleForm,
  },
  data(): DataShape {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
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
