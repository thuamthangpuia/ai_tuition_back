import { InferInsertModel } from "drizzle-orm";
import { Profiles } from "../models/profile.ts";

export type ProfileType= InferInsertModel<typeof Profiles> // for registration only

// type ProfileType = {
//     user_id: number;
//     full_name: string;
//     user_type: string;
//     id?: number | undefined;
//     address?: string | null | undefined;
//     dob?: string | null | undefined;
//     gender?: string | null | undefined;
//     school?: string | null | undefined;
//     grade?: string | null | undefine