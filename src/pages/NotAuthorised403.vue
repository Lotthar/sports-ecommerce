<template>
  <div class="fixed-center text-center">
    <p>
      <img
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Nemate pristup ovom sadrzaju...<strong>(403)</strong>
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
  name: 'NotAuthorized403'
}
</script>
