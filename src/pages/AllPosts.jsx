import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import postService from '../appwrite/postService';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.rows || []);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="p-2 w-1/4">
                                <div className="h-44 rounded-lg bg-gray-200/30 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <h1 className="text-2xl font-bold">
                    No posts available
                </h1>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;