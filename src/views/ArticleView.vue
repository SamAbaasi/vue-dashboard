<template>
  <div class="edit-article">
    <ArticleForm
      :article="article"
      :is-editing="true"
      :loading="loading"
      @submit-article="submitArticle"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArticleForm from "@/components/ArticleForm.vue";
import { getArticle, editArticle } from "@/api/articles";
import { ArticleData } from "@/types/articles";
import useAPI from "@/hooks/useApi";

export default Vue.extend({
  name: "ArticleView",
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
      slug: "",
      loading: false,
    };
  },
  created() {
    this.slug = this.$route.params.slug;
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      this.loading = true;
      const { request } = useAPI({
        apiMethod: () => getArticle(this.slug),
        successCallback: (data) => {
          this.article = data.article;
        },
      });
      await request();
      this.loading = false;
    },
    async submitArticle(tags: string[]) {
      this.article.tagList = tags;
      this.loading = true;
      const { request, pending } = useAPI({
        apiMethod: () => editArticle(this.slug, this.article),
        successCallback: () => {
          this.$router.push("/");
        },
        failedCallback: () => {
          this.loading = false;
        },
      });

      await request();
      this.loading = pending.value;
    },
  },
});
</script>
