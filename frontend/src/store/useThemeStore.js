import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme:localStorage.getItem("Frenzy-theme") || "forest",
  setTheme:(theme)=>{localStorage.setItem("Frenzy-theme",theme);
  set({theme});
}
}))
