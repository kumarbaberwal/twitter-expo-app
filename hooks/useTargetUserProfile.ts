import { useApiClient, userApi } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Alert } from "react-native"
import { useCurrentUser } from "./useCurrentUser"
import { useProfile } from "./useProfile"

export const useTargetUserProfile = ({ targetUserName }: { targetUserName: string }) => {
  const api = useApiClient()
  const { currentUser } = useCurrentUser()
  const { followUser } = useProfile()

  const {
    data: userProfile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["targetUser", targetUserName],
    queryFn: () => userApi.getUserProfile(api, targetUserName),
    select: (response) => response.data.user,
    enabled: !!targetUserName, // avoid running query if ID is undefined/null
  })

  const isFollowing = userProfile?.followers.includes(currentUser._id)

  const handleFollowUnfollowUser = (targetUserId: string) => {
    if (isFollowing) {
      Alert.alert("Unfollow", `Are you sure you want to unfollow ${userProfile.firstName} ${userProfile.lastName}`, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Unfollow",
          style: "destructive",
          onPress: () => followUser(targetUserId),
        },
      ])
    } else {
      followUser(targetUserId)
    }
  }

  return {
    user: userProfile,
    isLoading,
    error,
    refetch,
    isFollowing,
    handleFollowUnfollowUser,
  }
}