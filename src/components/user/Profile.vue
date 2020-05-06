<template>
  <div>
    PROFILE  {{ $route.params.userId }}
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile"
}
</script>