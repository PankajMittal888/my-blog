import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/Index";
import service from "../authservice/config";
import { useParams, useNavigate } from "react-router-dom";

const Editpost = () => {
  const [post, setPosts] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((po) => {
        if (po) {
          setPosts(po);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default Editpost;
