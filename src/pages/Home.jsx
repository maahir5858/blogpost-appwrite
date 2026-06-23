import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import postService from '../appwrite/postService';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (!authStatus) {
            setPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        postService.getPosts()
            .then((posts) => {
                setPosts(posts?.rows || []);
            })
            .finally(() => setLoading(false));

    }, [authStatus]);

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
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {authStatus
                                    ? "No posts available yet"
                                    : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;