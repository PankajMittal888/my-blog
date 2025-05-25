import React, { useEffect, useState } from 'react';
import { PostCard, Container } from '../components/Index';
import service from '../authservice/config';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((res) => {
            if (res) {
                setPosts(res.documents); 
            }
        });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((item) => (
                        <div key={item.$id} className="p-2 w-1/4">
                            <PostCard {...item} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
