import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts")
        const { title, content } = req.body
        
        const posts = await db.collection("posts").insertOne({
            title,
            content
        })

        res.json(posts)
        
    } catch (err) {

        console.log(err)
        throw new Error(err).message;
    }
}