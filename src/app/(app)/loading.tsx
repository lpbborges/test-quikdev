import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <ul className="mt-12 space-y-6">
            <li>
                <Skeleton className="h-6 max-w-[300px]" />
                <div className="my-4 space-y-2">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                </div>
                <Skeleton className="h-3 max-w-[50px]" />
            </li>
            <li>
                <Skeleton className="h-6 max-w-[300px]" />
                <div className="my-4 space-y-2">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                </div>
                <Skeleton className="h-3 max-w-[50px]" />
            </li>
            <li>
                <Skeleton className="h-6 max-w-[300px]" />
                <div className="my-4 space-y-2">
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                    <Skeleton className="h-4" />
                </div>
                <Skeleton className="h-3 max-w-[50px]" />
            </li>
        </ul>
    )
}
