"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

type SiteHeaderProps = {
  userEmail?: string
}

export function SiteHeader({ userEmail }: SiteHeaderProps) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)

    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
      })

      if (!response.ok) {
        console.error("Falha ao encerrar sessão", await response.text())
        return
      }

      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Falha ao encerrar sessão", error)
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-3">
          {userEmail ? (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userEmail}
            </span>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saindo...
              </span>
            ) : (
              "Sair"
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
