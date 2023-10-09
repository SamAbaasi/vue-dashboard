<template>
  <div>
    <h1 class="text-left mb-4">
      All Posts
    </h1>
    <TableView
      :loading="loading"
      :articles="articles"
      :fields="fields"
      :total-rows="totalRows"
      @fetch-articles="fetchArticles"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TableView from "@/components/TableView/TableView.vue";
import { fields } from "@/views/Home/constants";
import { getAllArticles } from "@/API/articles";
import { ArticlesData } from "@/types/articles";
import useAPI from "@/Hooks/useApi";
export default Vue.extend({
  components: {
    TableView,
  },
  data(): ArticlesData {
    return {
      articles: [],
      loading: true,
      fields: fields,
      totalRows: 0,
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      const { request } = useAPI({
        apiMethod: () => getAllArticles(),
        successCallback: (data) => {
          this.articles = data.articles;
          this.totalRows = data.articles.length;
        },
      });
      await request();
      this.loading = false;
    },
    generateExcerpt(body: string) {
      // Extract the first 20 words from the article body
      const words = body.split(" ");
      if (words.length <= 20) {
        return body;
      } else {
        const excerpt = words.slice(0, 20).join(" ");
        return `${excerpt}...`;
      }
    },
  },
});
</script>
