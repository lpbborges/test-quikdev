'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function HomePage() {
    return (
        <Tabs defaultValue="my-posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="my-posts">Meus posts</TabsTrigger>
                <TabsTrigger value="community">Posts da comunidade</TabsTrigger>
            </TabsList>
            <TabsContent value="my-posts"></TabsContent>
            <TabsContent value="community"></TabsContent>
        </Tabs>
    )
}
