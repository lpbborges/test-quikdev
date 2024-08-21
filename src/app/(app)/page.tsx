'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '../providers/auth-provider'
import { CommunityPosts } from './components/community-posts'
import { UserPosts } from './components/user-posts'

export default function HomePage() {
    const { getUser } = useAuth()
    const user = getUser()

    return (
        <Tabs defaultValue="my-posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-posts">Meus posts</TabsTrigger>
                <TabsTrigger value="community">Posts da comunidade</TabsTrigger>
            </TabsList>
            <TabsContent value="my-posts">
                <UserPosts userId={user?.id} />
            </TabsContent>
            <TabsContent value="community">
                <CommunityPosts />
            </TabsContent>
        </Tabs>
    )
}
