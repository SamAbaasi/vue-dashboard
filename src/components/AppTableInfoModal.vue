<template>
  <!-- Info modal -->
  <b-modal
    v-if="!loading"
    :id="infoModal.id"
    centered
    title="Delete Article"
    ok-size="lg"
    @hide="resetInfo"
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
        @click="deleteArticle(infoModal.slug)"
      >
        <span v-if="loadingDelete">
          <b-spinner small />
        </span>
        <span v-else> Yes </span>
      </b-button>
    </template>
  </b-modal>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";

interface InfoModalType {
    id: string,
    slug: string,
};
export default Vue.extend({
    name: "AppTableInfoModal",
    props: {
        loadingDelete: {
            type: Boolean,
            required: true,
            default: false
        },
        infoModal: {
            type: Object as PropType<InfoModalType>,
            required: true
        },
        loading: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    methods: {
        deleteArticle(slug: string): void {
            this.$emit('delete-article-action', slug)
        },
        resetInfo(): void {
            this.$emit('reset-info-modal')
        }
    }
})
</script>