import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <h1 className="text-3xl font-medium">Post</h1>
                <Separator className="my-5" />
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center w-full">
                    <div>
                        <h2 className="text-lg font-medium text-foreground">
                            Editando
                        </h2>
                    </div>
                    <div className="hidden items-center gap-2 lg:flex">
                        <Button variant="outline" type="button" disabled>
                            Voltar
                        </Button>
                        <Button type="submit" className="gap-2" disabled>
                            Salvar
                        </Button>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-8">
                    <div className="space-y-2">
                        <Label>Título</Label>
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label>Conteúdo</Label>
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
                <div className="lg:hidden block">
                    <Separator className="my-4" />
                    <div className="mt-4 lg:hidden items-center gap-2 flex justify-end">
                        <Button variant="outline" type="button" disabled>
                            Voltar
                        </Button>
                        <Button type="submit" className="gap-2" disabled>
                            Publicar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
