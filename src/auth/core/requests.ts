import { usersTable } from "@/db/schema";
import { getSession } from "./auth";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { signOut } from "./actions";

export async function getUserSessionData() {
    const session = await getSession()
    if (!session) return null
    const users = await db.select().from(usersTable).limit(1).where(eq(usersTable.id, session.id))
    if(users.length === 0){
        await signOut()
        return null
    }
    return users[0]
}