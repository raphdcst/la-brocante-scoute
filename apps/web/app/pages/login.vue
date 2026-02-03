<script setup lang="ts">
const { $authClient } = useNuxtApp();
import Auth from "~/components/Auth.vue";

const session = $authClient.useSession();

watchEffect(() => {
  if (!session?.value.isPending && session?.value.data) {
    navigateTo("/dashboard", { replace: true });
  }
});
</script>

<template>
  <UContainer class="py-8">
    <div v-if="session.isPending" class="flex flex-col items-center justify-center gap-4 py-12">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-4xl text-primary" />
      <span class="text-muted">Chargement...</span>
    </div>
    <div v-else-if="!session.data">
      <Auth />
    </div>
  </UContainer>
</template>
