import { commentApi, useApiClient } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Alert } from "react-native"

export const useComments = () => {
    const [commentText, setCommentText] = useState("")
    const api = useApiClient()

    const queryClient = useQueryClient()

    const createCommentMutation = useMutation({
        mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
            const respone = await commentApi.createComment(api, postId, content)
            return respone.data
        },
        onSuccess: () => {
            setCommentText("")
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: (error) => {
            console.log("Error creating comment: ", error);

            Alert.alert("Error", "Failed to post comment. Try again.")
        }
    })

    const deleteCommentMutation = useMutation({
        mutationFn: (commentId: string) => commentApi.deleteComment(api, commentId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    })

    const createComment = (postId: string) => {
        if (!commentText.trim()) {
            Alert.alert("Empty Comment", "Please write something before posting!")
            return
        }

        createCommentMutation.mutate({ postId: postId, content: commentText.trim() })
    }

    return {
        commentText,
        setCommentText,
        createComment,
        isCreatingComment: createCommentMutation.isPending,
        deleteComment: (commentId: string) => deleteCommentMutation.mutate(commentId),
        isDeletingComment: deleteCommentMutation.isPending,
    }
}