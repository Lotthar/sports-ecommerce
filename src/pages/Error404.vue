<template>
  <div class="fixed-center text-center">
    <p>
      <img
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Ne postoji nijedna stranica na ovoj lokaciji...<strong>(404)</strong>
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      to="/"
      label="Go back"
    />
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
