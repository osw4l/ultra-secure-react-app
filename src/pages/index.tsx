import { useState } from "react";

import EmptyRecords from "@/components/credentials/EmptyRecords.tsx";
import CreateCredentialModal from "@/components/credentials/createCredentialModal/CreateCredentialModal.tsx";
import ListCredentialsComponent from "@/components/credentials/listCredentials/ListCredentialsComponent.tsx";
import FiltersComponent from "@/components/credentials/listCredentials/Filters.tsx";
import AnimatedPage from "@/components/AnimatedPage.tsx";
import { useCredentialsStore, useFilterStore } from "@/stores";
import { getCredentials } from "@/services/credentials.ts";
import CredentialModal from "@/components/credentials/detail/CredentialModal.tsx";
import Loader from "@/components/animations/Loader.tsx";
import CustomCategoryModal from "@/components/credentials/CustomCategoryModal.tsx";

export default function IndexPage() {
  const [onRequest, setOnRequest] = useState(false);
  const { setCredentials, credentials, loading } = useCredentialsStore();
  const { isModalOpen } = useCredentialsStore();
  const { filter } = useFilterStore();

  const fetchCredentials = async () => {
    setOnRequest(true);

    setTimeout(async () => {
      try {
        console.log("Fetching credentials...");
        const credentials = await getCredentials(filter);

        setCredentials(credentials);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setOnRequest(false);
      }
    }, 1000);
  };

  const isFilterEmpty =
    filter.search === "" &&
    filter.user_category === null &&
    filter.category === null;

  return (
    <AnimatedPage>
      <CustomCategoryModal />
      <CreateCredentialModal fetchCredentials={fetchCredentials} />
      <CredentialModal
        fetchCredentials={fetchCredentials}
        isOpen={isModalOpen}
      />

      <section className="flex flex-col items-center justify-center w-full mt-4">
        {loading ? (
          <Loader />
        ) : credentials.length === 0 && isFilterEmpty ? (
          <EmptyRecords />
        ) : (
          <FiltersComponent fetchCredentials={fetchCredentials}>
            <ListCredentialsComponent
              credentials={credentials}
              fetchCredentials={fetchCredentials}
              onRequest={onRequest}
            />
          </FiltersComponent>
        )}
      </section>
    </AnimatedPage>
  );
}
