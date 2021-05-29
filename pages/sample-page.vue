<template>
  <div class="container">
    <h2>Sample Page</h2>
    <div>
      <div>
        <strong>Rendered By:</strong>
      </div>
      <span>{{ renderedBy }}</span>
    </div>
  </div>
</template>

<script>
export default {
  asyncData() {
    let renderedBy
    if (process.server) renderedBy = 'Server'
    else renderedBy = 'Client'

    return { renderedBy }
  }
}
</script>

<style></style>
