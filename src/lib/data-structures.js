export const defaultPost = { title: "", content: "", tag_id: "" };
export const defaultPlan = {
  location: "",
  title: "",
  description: "",
  arrive_date: "",
  leave_date: "",
};

const getIsoDateNow = () => {
  const date = new Date();
  return date.toISOString();
};

export const buildPostEntity = (post) => {
  //
  // if created_at exists, we are only updating a post
  if (post.created_at) {
    const updated_at = getIsoDateNow();
    return { ...post, updated_at };
  }

  let created_at, updated_at;
  created_at = updated_at = getIsoDateNow();
  return { ...post, created_at, updated_at };
};

