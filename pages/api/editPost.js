import clientPromise from "../../lib/mongodb"
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts")
        const { id } = req.query
        const { title, content } = req.body
        
        const post = await db.collection("posts").updateOne(
            {
                _id: ObjectId(id)
            },
            {
                $set: {
                    title: title,
                    content: content
                }
            }
        )

        res.json(post)
        
    } catch (err) {

        console.log(err)
        throw new Error(err).message;
    }
}