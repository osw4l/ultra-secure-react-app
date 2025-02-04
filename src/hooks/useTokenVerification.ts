import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore, useCategoriesStore, useCredentialsStore, useUserStore } from "@/stores";
import { getUser } from "@/services";
import { Category } from "@/stores/categoriesStore.ts";
import { getCategories, getCredentials } from "@/services/credentials.ts";

export const useTokenVerification = () => {
  const { refresh, setToken, startRequest, endRequest } = useAuthStore();
  const { setCategories } = useCategoriesStore();
  const { setCredentials } = useCredentialsStore();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
      setIsVerified(true);

      return;
    }

    const verifyToken = async () => {
      if (!hasVerified.current) {
        hasVerified.current = true;

        startRequest();

        try {
          const user = await getUser();
          setUser(user);

          const currentCategories = await getCategories();

          const userCategories = user.categories.map((category: Category) => ({
            ...category,
            custom: true,
          }));

          const defaultCategories = currentCategories.map(
            (category: Category) => ({
              ...category,
              custom: false,
            }),
          );

          const categories = [...userCategories, ...defaultCategories];

          setCategories(categories);

          const credentials = await getCredentials();

          setCredentials(credentials);

          setIsVerified(true);
        } catch (error) {
          navigate("/login");
        } finally {
          endRequest();
          setLoading(false);
        }
      }
    };

    verifyToken();
  }, [user, refresh, navigate, startRequest, endRequest, setToken]);

  return { loading, isVerified };
};
