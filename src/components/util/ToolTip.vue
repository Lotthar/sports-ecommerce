<template>
  <q-tooltip
    content-class="shadow-4"
    max-width="300px"
    transition-show="flip-right"
    transition-hide="flip-left"
    :content-style="tooltipStyle"
    :anchor="anchor"
    :self="selfPosition"
    :delay="delay"
  >
    <slot></slot>
  </q-tooltip>
</template>
<script>
export default {
  props: ["anchor", "selfPosition", "delay"],
  data() {
    return {
      tooltipStyle: {
        color: "#be7b22",
        background: "rgba(0,0,0,0.9)",
        fontSize: "15px",
        marginLeft: "%"
      }
    };
  }
};
</script>