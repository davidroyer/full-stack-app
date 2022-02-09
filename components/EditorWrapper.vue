<template>
  <div>
    <VueEditor v-model="editorContent"></VueEditor>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
    editorContent: ''
    // editorContent: 'From EditorWrapper.vue'
  })
}
</script>

<style></style>
