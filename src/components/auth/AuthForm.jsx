"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@hyprr/components/ui/button"
import { Input } from "@hyprr/components/ui/input"
import { Label } from "@hyprr/components/ui/label"

// ------------------
// ZOD SCHEMAS
// ------------------
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters required"),
})

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters required"),
})

// ------------------
// COMPONENT
// ------------------
export default function AuthForm({ type = "login" }) {
  const router = useRouter()
  const isLogin = type === "login"

  const schema = isLogin ? loginSchema : registerSchema

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data)

    // FAKE AUTH (Backend later)
    document.cookie = "hyprr-auth=true; path=/"

    router.push("/feed")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-background">
      
      {/* TOP */}
      <div className="w-full max-w-xs space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            HYPRR
          </h1>
          <p className="text-sm text-muted-foreground">
            Share everyday moments with your close network
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {!isLogin && (
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                placeholder="Your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              placeholder="you@hyprr.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            className="w-full rounded-full mt-2"
            disabled={isSubmitting}
          >
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground pt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-primary"
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-primary"
              >
                Log in
              </a>
            </>
          )}
        </p>
      </div>

      {/* BOTTOM */}
      <div className="text-xs text-muted-foreground">
        from HYPRR Platform
      </div>
    </div>
  )
}
