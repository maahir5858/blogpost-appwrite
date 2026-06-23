import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/postService";
import storageService from "../appwrite/storageService";
import { Button, Container } from "../components";
import parse from "html-react-parser";                  // IMPORTANT
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;       // Control over EDIT & DELETE btns 

    useEffect(() => {
        if (slug) {
            postService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );
        if (!confirmDelete) return;

        setIsDeleting(true);
        
        postService.deletePost(post.$id).then((status) => {
            if (status) {
                if (post.featuredImage) {
                    storageService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }

            setIsDeleting(false);
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage && (
                        <img
                            src={storageService.getFile(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-w-1/2 object-cover rounded-xl"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="browser-css text-white text-center">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}