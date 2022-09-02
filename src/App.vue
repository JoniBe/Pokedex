<template>
  <div class="h-screen w-screen">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "@vue/runtime-core";

defineComponent({
  name: "App",
});
</script>
