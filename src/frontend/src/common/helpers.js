import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api.service";

export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
  };
};
