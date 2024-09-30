export const getLocalizedHeading = (lang: string) => {
  if (lang === "ms") {
    return {
      text1: "Habis Rosak",
      text2: "Semua Bila",
      text3: "Anai-Anai",
      text4: "Menyerang!",
    };
  }
  return {
    text1: "Everything",
    text2: "Gets Destroyed When",
    text3: "Termites",
    text4: "Attack!",
  };
};
