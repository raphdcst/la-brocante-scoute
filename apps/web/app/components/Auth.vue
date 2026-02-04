<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const { $authClient } = useNuxtApp();
const { createCallbackURL } = useCallbackURL();

const toast = useToast();
const loading = ref(false);
const emailSent = ref(false);

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Entrez votre email...",
    required: true,
    autofocus: true,
    autocomplete: "email",
  },
];

const schema = z.object({
  email: z.email("Adresse email invalide."),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    const callbackURL = createCallbackURL("/dashboard");

    await $authClient.signIn.magicLink(
      {
        email: event.data.email,
        callbackURL,
      },
      {
        onSuccess: () => {
          emailSent.value = true;
        },
        onError: (error) => {
          toast.add({ title: "Erreur lors de la connexion", description: error.error.message });
        },
      },
    );
  } catch (error: any) {
    toast.add({
      title: "Une erreur est survenue",
      description: error.message || "Veuillez réessayer",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <div v-if="emailSent" class="flex flex-col items-center justify-center gap-3">
        <UIcon name="i-lucide-mail-check" class="text-4xl text-primary pb-12" />
        <span class="text-3xl">Un email vous a été envoyé.</span>
        <span>Veuillez consulter votre boîte mail.</span>
      </div>
      <UAuthForm
        v-else
        :schema="schema"
        :fields="fields"
        title="Bienvenue"
        icon="i-lucide-log-in"
        :submit="{ label: 'Se connecter', loading }"
        @submit="onSubmit"
      >
        <template #description>
          Si vous n'avez pas encore de compte, le lien vous permettra également d'en créer un.
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
