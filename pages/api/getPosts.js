import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts")
        
        const posts = await db.collection("posts").find({}).limit(20).toArray()

        res.json(posts)
        
    } catch (err) {

        console.log(err)
        throw new Error(e).message;
    }
}