import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Post } from "@/types";
import { Feather } from "@expo/vector-icons";
import React from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

export default function CommentsModal({ selectedPost, onClose }: CommentsModalProps) {
  const { commentText, setCommentText, createComment, isCreatingComment, deleteComment, isDeletingComment, } = useComments()
  const { currentUser } = useCurrentUser()

  // console.log("Content", selectedPost?.comments)

  const handleDelete = (commentId: string) => {
    Alert.alert("Delete Comment", "Are you sure you want to delete this comment?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteComment(commentId),
      },
    ])
  }

  const handleClose = () => {
    onClose();
    setCommentText("")
  }
  return (
    <Modal visible={!!selectedPost} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={handleClose}>
          <Text className="text-blue-500 text-lg">
            Close
          </Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">
          Comments
        </Text>
        <View className="w-12" />
      </View>

      {selectedPost && (
        <ScrollView className="flex-1">
          <View className="border-b border-gray-100 bg-white p-4">
            <View className="flex-row">
              <Image source={{ uri: selectedPost.user.profilePicture }}
                className="w-12 h-12 rounded-full mr-3"
              />

              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-gray-900 mr-1">
                    {selectedPost.user.firstName} {selectedPost.user.lastName}
                  </Text>
                  <Text className="text-gray-500 ml-1">
                    @{selectedPost.user.userName}
                  </Text>
                </View>

                {selectedPost.content && (
                  <Text className="text-gray-900 text-base leading-5 mb-3">
                    {selectedPost.content}
                  </Text>
                )}

                {selectedPost.image && (
                  <Image
                    source={{ uri: selectedPost.image }}
                    className="w-full h-48 rounded-2xl mb-3"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>

          {selectedPost.comments.map((comment) => (
            <View key={comment._id} className="border-b border-gray-100 bg-white p-4">
              <View className="flex-row">
                <Image source={{ uri: comment.user.profilePicture }} className="w-10 h-10 rounded-full mr-3" />

                <View className="flex-1">
                  <View className="flex-row justify-between items-center mb-1">
                    <View className="flex-row items-center">
                      <Text className="font-bold text-gray-900 mr-1">
                        {comment.user.firstName} {comment.user.lastName}
                      </Text>
                      <Text className="text-gray-500 text-sm ml-1">
                        @{comment.user.userName}
                      </Text>
                    </View>
                    {comment.user._id === currentUser._id && (
                      <TouchableOpacity onPress={() => handleDelete(comment._id)} disabled={isDeletingComment}>
                        {isDeletingComment ? (
                          <ActivityIndicator size={"small"} color={"#657786"} />
                        ) : (
                          <Feather name="trash" size={18} color={"#e0245e"} />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text className="text-gray-900 text-base leading-5 mb-2">{comment.content}</Text>
                </View>

              </View>
            </View>
          ))}

          {/* Add comment INput */}
          <View className="p-4 border-t border-gray-100">
            <View className="flex-row">
              <Image
                source={{ uri: currentUser.profilePicture }}
                className="size-10 rounded-full mr-3"
              />

              <View className="flex-1">
                <TextInput
                  className="border border-gray-200 rounded-lg text-base p-3 mb-3"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />


                <TouchableOpacity
                  className={`px-4 py-2 rounded-lg self-start ${commentText.trim() ? "bg-blue-500" : "bg-gray-300"}`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}
                >
                  {isCreatingComment ? (
                    <ActivityIndicator size={'small'} color={"white"} />
                  ) : (

                    <Text className={`font-semibold ${commentText.trim() ? "text-white" : "text-gray-500"}`}>
                      Reply
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )
      }
    </Modal >
  )
}