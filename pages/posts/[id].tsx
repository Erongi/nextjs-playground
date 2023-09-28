import React, { useState } from "react";
import type { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Layout from "../../components/Layout";

type PageParams = {
  id: string;
};

type ContentPageProps = {
  post: Post;
};

type Post = {
  _id: string;
  title: string;
  content: string;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>): Promise<
  GetStaticPropsResult<ContentPageProps>
> {
  try {
    let response = await fetch(
      "http://localhost:3000/api/getPost?id=" + params?.id
    );

    let responseFromServer: Post = await response.json();

    return {
      props: {
        post: {
          _id: responseFromServer._id,
          title: responseFromServer.title,
          content: responseFromServer.content,
        },
      },
    };
  } catch (e) {
    console.log("error", e);
    return {
      props: {
        post: {
          _id: "",
          title: "",
          content: "",
        },
      },
    };
  }
}

export async function getStaticPaths() {
  let posts = await fetch("http://localhost:3000/api/getPosts");

  let postFromServer: [Post] = await posts.json();

  return {
    paths: postFromServer.map((post) => {
      return {
        params: {
          id: post._id,
        },
      };
    }),
    fallback: false,
  };
}

function EditPost({post: {_id, title, content}}: ContentPageProps) {
  const [input, setInput] = useState({
    title: title,
    content: content,
  });
  const [err, setErr] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (input.title && input.content) {
      try {
        let response = await fetch(`http://localhost:3000/api/editPost?id=` + _id, {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            Accept: "application/json, text/plain. */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();
        setErr("success");
      } catch (err) {}
    } else {
      return setErr("Missing require");
    }
  };

  return (
    <Layout>
      <form className="form" onSubmit={handleSubmit}>
        {err === "success" ? (
          <div className="alert-msg">{err}</div>
        ) : (
          <div className="alert-err">{err}</div>
        )}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="type text"
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
            value={input.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            placeholder="content of post"
            cols={20}
            rows={8}
            onChange={(e) =>
              setInput((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
            value={input.content}
          />
        </div>
        <div>
          <button type="submit" className="submit_btn">
            Edit Post
          </button>
        </div>
      </form>
      <style jsx>
        {`
          .form {
            width: 400px;
            margin: 10px auto;
          }

          .form-group {
            width: 100%;
            margin-button: 10px;
            display: block;
          }

          .form-group input[type="text"],
          .form-group textarea {
            width: 100%;
            padding: 10px;
          }

          .alert-err {
            color: red;
          }

          .alert-msg {
            color: green;
          }
        `}
      </style>
    </Layout>
  );
}

export default EditPost;
