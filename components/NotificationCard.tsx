import { Notification } from "@/types"
import { formatDate } from "@/utils/formatters"
import { Feather } from "@expo/vector-icons"
import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'

export default function NotificationCard({ notification, onDelete }: { notification: Notification, onDelete: (notificationId: string) => void }) {


  const getNotificationText = () => {
    const name = `${notification.from.firstName} ${notification.from.lastName}`
    switch (notification.type) {
      case "like":
        return `${name} liked your post`
      case "comment":
        return `${name} commented on your post`
      case "follow":
        return `${name} started following you`
      default:
        return ""
    }
  }

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "like":
        return <Feather name="heart" size={20} color={"#e0245e"} />
      case "comment":
        return <Feather name="message-circle" size={20} color={"#1da1f2"} />
      case "follow":
        return <Feather name="user-plus" size={20} color={"#17bf63"} />
      default:
        return <Feather name="bell" size={20} color={"#657786"} />
    }
  }

  const handleDelete = () => {
    Alert.alert("Delete Notification", "Are you sure you want to delete this notification?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(notification._id)
      }
    ])
  }

  return (
    <View className="border-b border-gray-100 bg-white">
      <View className="flex-row p-4">
        <View className="relative mr-3">
          <Image
            source={{ uri: notification.from.profilePicture }}
            className="size-12 rounded-full"
          />

          <View className="absolute -bottom-1 -right-1 size-6 bg-white items-center justify-center">
            {getNotificationIcon()}
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <View className="flex-1">
              <Text className="text-gray-900 text-base leading-5 mb-1">
                <Text className="font-semibold">
                  {notification.from.firstName} {notification.from.lastName}
                </Text>
                <Text className="text-gray-500">@{notification.from.userName}</Text>
              </Text>
              <Text className="text-gray-700 text-sm mb-2">{getNotificationText()}</Text>
            </View>
            <TouchableOpacity className="ml-2 p-1" onPress={handleDelete}>
              <Feather name="trash" size={16} color={"#e0245e"} />
            </TouchableOpacity>
          </View>

          {notification.post && (
            <View className="bg-gray-50 rounded-lg p-3 mb-2">
              <Text className="text-gray-700 text-sm mb-1" numberOfLines={3}>
                {notification.post.content}
              </Text>

              {notification.post.image && (
                <Image
                  source={{ uri: notification.post.image }}
                  className="w-full h-32 rounded-lg mt2"
                  resizeMode="cover"
                />
              )}
            </View>
          )}

          {notification.comment && (
            <View className="bg-blue-50 rounded-lg p-3 mb-3">
              <Text className="text-gray-600 text-xs mb-1">
                Comment:
              </Text>
              <Text className="text-gray-700 text-sm" numberOfLines={2}>
                &ldquo;{notification.comment.content}&ldquo;
              </Text>
            </View>
          )}

          <Text className="text-gray-400 text-xs">{formatDate(notification.createdAt)}</Text>


        </View>
      </View>
    </View>
  )
}