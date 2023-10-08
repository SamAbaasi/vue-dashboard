<template>
  <b-container
    fluid
    class="px-0"
  >
    <!-- Skeleton loading state -->
    <b-skeleton-table
      v-if="loading"
      :rows="5"
      :columns="5"
    />
    <!-- Main table element -->
    <template v-else-if="articles && articles.length > 0">
      <b-table
        :items="articles"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        stacked="md"
        tbody-tr-class="tr-classes"
        small
        head-variant="light"
      >
        <template #cell(#)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(actions)="row">
          <b-dropdown
            class="mx-1 my-0 p-0"
            variant="info"
            right
            text="..."
          >
            <b-dropdown-item>
              <router-link
                class="edit-btn text-dark"
                :to="`/articles/${row.item.slug}`"
              >
                Edit
              </router-link>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="info(row.item, $event.target)">
              Delete
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </template>
    <!-- Empty state -->
    <template v-else>
      <div class="text-center my-2">
        <p>No articles found.</p>
      </div>
    </template>
    <!-- User Interface controls -->
    <b-row align-h="center">
      <b-col
        sm="6"
        md="6"
        class="my-1"
      >
        <template v-if="!loading && articles && articles.length > 0">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class=""
            first-number
            last-number
          />
        </template>
        <template v-else-if="loading">
          <div class="d-flex flex-row">
            <b-skeleton type="button" />
            <b-skeleton type="button" />
            <b-skeleton type="button" />
            <b-skeleton type="button" />
          </div>
        </template>
      </b-col>
    </b-row>
    <!-- Info modal -->
    <b-modal
      v-if="!loading"
      :id="infoModal.id"
      centered
      title="Delete Article"
      ok-size="lg"
      @hide="resetInfoModal"
    >
      <p>Are you sure to delete Article?</p>
      <template #modal-footer="{ cancel }">
        <b-button
          :disabled="loadingDelete"
          size="sm"
          variant="outline-dark"
          @click="cancel"
        >
          <span v-if="loadingDelete">
            <b-spinner small />
          </span>
          <span v-else> No </span>
        </b-button>
        <b-button
          :disabled="loadingDelete"
          size="sm"
          variant="danger"
          @click="deleteArticleAction(infoModal.slug)"
        >
          <span v-if="loadingDelete">
            <b-spinner small />
          </span>
          <span v-else> Yes </span>
        </b-button>
      </template>
    </b-modal>
    <b-toast
      id="home-toast"
      variant="success"
      solid
      :title="toastMessage"
    />
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { deleteArticle } from "@/API/articlesApi";
import useAPI from "@/Hooks/useApi";
import { ArticleData } from "@/types/articles";
import store from "@/store";

export default Vue.extend({
  components: {},
  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    loading: Boolean,
  },
  data() {
    return {
      infoModal: {
        id: "delete-modal",
        slug: "",
      },
      loadingDelete: false,
      showToast: false,
      toastVariant: "default",
      toastMessage: "",
      currentPage: 1,
      perPage: 5,
    };
  },
  methods: {
    async deleteArticleAction(slug: string) {
      this.loadingDelete = true;
      const { request } = useAPI({
        apiMethod: () => deleteArticle(slug),
        successCallback: () => {
          this.hideModal();
          this.$emit("fetch-articles");
        },
        failedCallback: (error) => {
          this.loadingDelete = false;
          this.hideModal();
          store.dispatch("addToast", {
            message: error,
            variant: "danger",
          });
        },
      });
      await request();
      this.loadingDelete = false;
    },
    info(item: ArticleData, button: Event) {
      this.infoModal.slug = item.slug || "";
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.slug = "";
    },
    hideModal() {
      this.resetInfoModal();
      this.$root.$emit("bv::hide::modal", this.infoModal.id);
    },
  },
});
</script>
<style lang="scss" scoped>
.edit-btn:hover {
  text-decoration: none;
  color: #000;
}
</style>
