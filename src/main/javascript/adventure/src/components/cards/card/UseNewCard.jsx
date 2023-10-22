export const useNewCard = () => ({
  id: null,
  name: "New Card",
  type: "ABILITY",
  quality: "COMMON",

  body: null,
  flavor: null,
  author: null,

  editionId: "",
  costInExperience: 0,

  appearance: {
    fullArt: true,
    image: "https://cdn.discordapp.com/attachments/954643538342182924/963221684985409546/unknown.png",
    imageSize: "cover",
    imagePosition: "center top",
    darkText: true,
    bodyOpacity: 80,
    fontSize: "10pt",
  },

  prerequisites: {
    "attributePrerequisites": [],
    "skillPrerequisites": [],
    "cardPrerequisites": []
  }
});
