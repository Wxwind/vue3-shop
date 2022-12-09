import { watch } from "vue";
import { useLangStore } from "@/stores/langStore";
import { storeToRefs } from "pinia";

const langStore = useLangStore();

const { lang } = storeToRefs(langStore);

export const watchLang = (...args: ((newLang: string) => void)[]) => {
  watch(
    () => {
      return lang.value;
    },
    () => {
      console.log("刷新driver");
      args.forEach((cb) => {
        cb(lang.value);
      });
    }
  );
};
