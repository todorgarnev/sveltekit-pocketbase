import type { Admin, Record } from "pocketbase";

export type User = Record | Admin | null | undefined;