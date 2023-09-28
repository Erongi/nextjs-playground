import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts")
        const { id } = req.query
        const post = await db.collection("posts").findOne({
            _id: ObjectId(id)
        })

        res.json(post)
        
    } catch (err) {

        console.log(err)
        throw new Error(err).message;
    }
}