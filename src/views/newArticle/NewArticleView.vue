<template>
  <div class="edit-article">
    <ArticleForm
      :article="article"
      :isEditing="false"
      @submit-article="submitArticle"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
import ArticleForm from "@/components/ArticleForm/ArticleForm.vue"; // Import your ArticleForm component here
import { createArticle } from "@/API/articlesApi";
import { ArticleData } from "@/types/articles";
import useAPI from "@/Hooks/useApi";

export default {
  name: "NewArticleView",
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
      } as ArticleData,
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
      });
      await request();
      this.loading = pending.value;
    },
  },
};
</script>
