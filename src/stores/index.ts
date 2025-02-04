import { mountStoreDevtool } from "simple-zustand-devtools";

import { useCredentialFormStore } from "@/stores/createCredentialFormStore.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import { useUserStore } from "@/stores/userStore.ts";
import { useCategoriesStore } from "@/stores/categoriesStore.ts";
import { useCredentialsStore } from "@/stores/credentialsStore.ts";
import { useFilterStore } from "@/stores/filterStore.ts";

mountStoreDevtool("authStore", useAuthStore);
mountStoreDevtool("categoriesStore", useCategoriesStore);
mountStoreDevtool("credentialFormStore", useCredentialFormStore);
mountStoreDevtool("userStore", useUserStore);
mountStoreDevtool("credentialsStore", useCredentialsStore);
mountStoreDevtool("filterStore", useFilterStore);

export {
  useUserStore,
  useCategoriesStore,
  useCredentialFormStore,
  useAuthStore,
  useCredentialsStore,
  useFilterStore,
};
