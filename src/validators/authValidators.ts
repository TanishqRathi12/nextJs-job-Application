import z from "zod";

export const Validator = (email:string,password:string) => {
    const schema = z.object({
        email:z.email(),
        password:z.string().min(6).max(20)
    })

    return schema.safeParse({email,password})
}