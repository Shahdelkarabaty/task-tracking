import type { Directive } from "vue";

export const vOverdue: Directive<HTMLElement, Date> = {
  mounted: (el, binding) => {
    const deadline = new Date(binding.value);
    const now = new Date();

    if (deadline < now) {
      el.classList.add("is-overdue");
    }
  },
};
