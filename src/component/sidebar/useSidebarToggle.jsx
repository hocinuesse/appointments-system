import React from "react";
import { create } from "zustand";

const useSidebarToggle = create((set) => ({
  sidebar: false,
  togglesidebar: () =>
    set((state) => ({
      sidebar: !state.sidebar,
    })),
}));

export default useSidebarToggle;
