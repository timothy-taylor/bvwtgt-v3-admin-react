import { supabase } from "./supabase-client";

export const queries = {
  //
  // CRUD queries
  create: async (table, data) => {
    try {
      const { data: response } = await supabase.from(table).insert([data]).select();
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  read: (table, id = false) => {
    // read one or read all
    return id
      ? supabase.from(table).select("*").eq("id", id).limit(1).single()
      : supabase.from(table).select("*");
  },
  update: async (table, id, data) => {
    try {
      const { data: response } = await supabase.from(table).update(data).eq("id",  id).select();
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  delete: (table, id) => supabase.from(table).delete().eq("id", id),

  //
  // user auth queries
  getUser: () => supabase.auth.getUser(),
  signIn: async (email) => {
    try {
      const { user, session } = await supabase.auth.signInWithOtp({ email });
      console.log("user: ", user);
      console.log("session: ", session);
    } catch (err) {
      console.error(err);
    }
  },
};
