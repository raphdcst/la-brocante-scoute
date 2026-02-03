<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";

const { $authClient } = useNuxtApp();

const emit = defineEmits(["switchToSignIn"]);

const toast = useToast();
const loading = ref(false);

const fields: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Nom",
    placeholder: "Entrez votre nom complet...",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Entrez votre email...",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Mot de passe",
    placeholder: "Entrez votre mot de passe...",
    required: true,
  },
];

const schema = z.object({
  name: z.string("Requis.").min(2, "Le nom doit faire au minimum 2 caractères."),
  email: z.email("Adresse email invalide."),
  password: z.string("Requis.").min(8, "Le mot de passe doit faire au minimum 8 caractères."),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  try {
    await $authClient.signUp.email(
      {
        name: event.data.name,
        email: event.data.email,
        password: event.data.password,
      },
      {
        onSuccess: () => {
          toast.add({ title: "Compte créé!", description: "Veuillez vérifier votre email." });
          navigateTo("/dashboard", { replace: true });
        },
        onError: (error) => {
          toast.add({
            title: "Erreur lors de la création du compte",
            description: error.error.message,
          });
        },
      },
    );
  } catch (error: any) {
    toast.add({
      title: "Une erreur est survenue",
      description: error.message || "Veuillez réessayer.",
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        title="Créer un compte"
        icon="i-lucide-user-plus"
        :submit="{ label: 'Valider ces informations', loading }"
        @submit="onSubmit"
      >
        <template #description>
          Vous avez déjà un compte ?
          <ULink class="text-primary font-medium" @click="$emit('switchToSignIn')">
            Se connecter
          </ULink>
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
