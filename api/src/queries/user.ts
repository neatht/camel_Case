export const getUserById = "SELECT * FROM public.user u WHERE u.user_id = $1";
export const addUser = "INSERT INTO public.user VALUES ($1, $2, $3, $4)";