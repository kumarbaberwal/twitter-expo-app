import PostsList from "@/components/PostsList"
import { usePosts } from "@/hooks/usePosts"
import { useTargetUserProfile } from "@/hooks/useTargetUserProfile"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { format } from "date-fns"
import { useLocalSearchParams, useRouter } from "expo-router"
import React from 'react'
import { ActivityIndicator, Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

export default function ProfileScreen() {
  const { userName } = useLocalSearchParams()
  const targetUserName = Array.isArray(userName) ? userName[0] : userName; // safest
  const router = useRouter()
  // console.log("UserName: ", targetUserName)
  const { user: targetUser, isLoading, refetch: refetchUser, isFollowing, handleFollowUnfollowUser } = useTargetUserProfile({ targetUserName: targetUserName })
  // console.log("CurrentUser: ", targetUser)
  const { posts: targetUserPosts, refetch: refetchPosts, isLoading: isRefetching } = usePosts(targetUser?.userName)


  const insets = useSafeAreaInsets()

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={"large"} color={"#1da1f2"} />
      </View>
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            {targetUser.firstName} {targetUser.lastName}
          </Text>
          <Text className="text-gray-500 text-sm">{targetUserPosts?.length} {targetUserPosts?.length > 1 ? "Posts" : "Post"}</Text>
        </View>
        <TouchableOpacity
          className="justify-center items-center bg-transparent"
          onPress={() => router.back()}
        >
          <MaterialIcons name="close" size={36} color={"#1F2937"} />
        </TouchableOpacity>
      </View>


      <ScrollView className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 50,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetchUser()
              refetchPosts()
            }}
            colors={["#1da1f2"]}
            tintColor={"#1da1f2"}
          />
        }
      >
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" }}
          className="w-full h-48"
          resizeMode="cover"
        />


        <View className="px-4 pb-4 border-b border-gray-100">
          <View className="flex-row justify-between items-end -mt-16 mb-4">
            <Image
              source={{ uri: targetUser.profilePicture }}
              className="w-32 h-32 rounded-full border-4 border-white"
            />

            <TouchableOpacity
              className={`${isFollowing ? "bg-black border border-white" : "border border-gray-300"} px-6 py-2 rounded-full`}
              onPress={() => handleFollowUnfollowUser(targetUser._id)}
            >
              <Text className={`font-semibold ${isFollowing ? "text-white" : "text-gray-900"}`}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-bold text-gray-900 mr-1">
                {targetUser.firstName} {targetUser.lastName}
              </Text>
              <Feather name="check-circle" size={20} color={"#1da1f2"} />
            </View>
            <Text className="text-gray-500 mb-2">
              @{targetUser.userName}
            </Text>
            <Text className="text-gray-900 mb-3">
              {targetUser.bio}
            </Text>

            <View className="flex-row items-center mb-2">
              <Feather name="map-pin" size={16} color={"#657786"} />
              <Text className="text-gray-500 ml-2">
                {targetUser.location}
              </Text>
            </View>

            <View className="flex-row items-center mb-3">
              <Feather name="calendar" size={16} color={"#657786"} />
              <Text className="text-gray-500 ml-2">Joined {format(new Date(targetUser.createdAt), "MMMM yyyy")}</Text>
            </View>

            <View className="flex-row">
              <TouchableOpacity
                className="mr-6"
              >
                <Text className="text-gray-900">
                  <Text className="font-bold">{targetUser.following?.length}</Text>
                  <Text className="text-gray-500"> Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-gray-900">
                  <Text className="font-bold">{targetUser.followers?.length}</Text>
                  <Text className="text-gray-500"> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PostsList userName={targetUser?.userName} />
      </ScrollView>
    </SafeAreaView>
  )
}