import { StateSchema } from "@/app/providers/StoreProvider";

export const getInitedState = (state: StateSchema) => state.user._inited;
