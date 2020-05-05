<template>
  <div>
    <h1>Poslati id kategorije:  {{ $route.params.id }}</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "ProductCategory",
  
}
</script>