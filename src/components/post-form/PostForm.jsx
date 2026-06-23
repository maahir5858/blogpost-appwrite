import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import postService from '../../appwrite/postService'
import storageService from '../../appwrite/storageService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [isLoading, setIsLoading] = useState(false);
    
    const submit = async (data) => {
        setIsLoading(true);

        try {
            if (post) {
                const file = data.image && data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

                const dbPost = await postService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    if (file && post.featuredImage) {
                        await storageService.deleteFile(
                            post.featuredImage
                        );
                    }

                    navigate(`/post/${dbPost.$id}`);
                }

            } else {
                const file = data.image && data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

                const dbPost = await postService.createPost({
                    ...data,
                    featuredImage: file ? file.$id : null,
                    userId: userData.$id,
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("PostForm Error:", error);
            alert("An error occurred while saving the post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")            // to collapse multiple hyphens
        }

        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => {                              // CleanUp/UnMount code --> .unsubscribe()
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/avif"
                    {...register("image")}          // { required: !post }
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFile(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="
                        w-full
                        transition-all duration-200
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        disabled:scale-100
                        hover:scale-[1.02]
                        active:scale-[0.98]
                    "
                    disabled={isLoading}
                >
                    {
                        isLoading
                            ? (post ? "Updating..." : "Creating...")
                            : (post ? "Update" : "Submit")
                    }
                </Button>
            </div>
        </form>
    );
}

export default PostForm