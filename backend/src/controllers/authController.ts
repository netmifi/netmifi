import { userSchema } from "@/schemas/userSchema";
import { queryState } from "../constants/queryState";
import { RequestType, ResponseType } from "@/types/headers"
import User from "@/models/User";
import { UserSchemaDocument } from "@/types";

export const signUp = async (req: RequestType, res: ResponseType) => {
    const bodyValues = req.body as UserSchemaDocument;
    try {
        const { error: validationError, values } = await userSchema.validateAsync({ ...bodyValues });

        if (validationError) {
            console.log(validationError.details[0].message);
            res.json({
                message: validationError.details[0].message,
                state: queryState.error,
                data: undefined,
            }).status(400);
        } else {
            res.json({
                message: 'You have made a request',
                state: queryState.success,
                data: [],
            }).status(201);
        }
    } catch (error) {
        res.json({
            message: "error",
            state: queryState.error,
            data: undefined,
        }).status(400);
    }
}