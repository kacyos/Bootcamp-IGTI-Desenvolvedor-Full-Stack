export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true
    },
    rss: String,
    android: String,
    itunes: String,
    soundcloud: String,
  });

  const Podcast = mongoose.model("podcast", schema, "podcast");
  return Podcast;
};
