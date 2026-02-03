<script setup lang="ts">
const { $authClient } = useNuxtApp();
const session = $authClient.useSession();
const toast = useToast();

const handleSignOut = async () => {
  try {
    await $authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          toast.add({ title: "Déconnecté", description: "À bientôt!" });
          await navigateTo("/", { replace: true, external: true });
        },
        onError: (error) => {
          toast.add({
            title: "Erreur lors de la déconnexion",
            description: error?.error?.message || "Erreur inconnue",
          });
        },
      },
    });
  } catch (error: any) {
    toast.add({
      title: "Une erreur est survenue",
      description: error.message || "Veuillez réessayer.",
    });
  }
};
</script>

<template>
  <div>
    <USkeleton v-if="session.isPending" class="h-9 w-24" />

    <UButton v-else-if="!session.data" variant="outline" to="/login"> Se connecter </UButton>

    <UButton
      v-else
      variant="solid"
      icon="i-lucide-log-out"
      label="Se déconnecter"
      @click="handleSignOut()"
    />
  </div>
</template>
