import React, { useState } from "react";
import Layout from "../../components/Layout";

function index() {
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const [err, setErr] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (input.title && input.content) {
      try {
        let response = await fetch(`http://localhost:3000/api/addPost`, {
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
            Add Post
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

export default index;
