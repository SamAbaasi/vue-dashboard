<template>
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
</template>
