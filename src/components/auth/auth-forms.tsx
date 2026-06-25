"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from "@/lib/validations"
import { useToast } from "@/hooks/use-toast"
import { Controller } from "react-hook-form"
import { supabase } from "@/lib/supabase"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) as never })

  const onSubmit = async (data: LoginFormData) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    const userId = authData.user?.id
    if (!userId) {
      router.push("/dashboard")
      return
    }

    // Fetch role from the public users table
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single()

    toast({ title: "Welcome back!", variant: "success" })

    if (profile?.role === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="login_email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input id="login_email" type="email" placeholder="your@email.com" className="pl-11" {...register("email")} error={errors.email?.message} />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login_password">Password</Label>
          <Link href="/auth/forgot-password" className="text-xs text-teal-700 hover:underline">Forgot password?</Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            id="login_password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className="pl-11 pr-11"
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting
          ? <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in…</span>
          : <><LogIn className="h-4 w-4" />Sign In</>
        }
      </Button>
      <p className="text-center text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-teal-700 font-semibold hover:underline">Create one</Link>
      </p>
    </form>
  )
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) as never, defaultValues: { terms: false } })

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
      },
    })

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Account created",
      description: "Please sign in with your new credentials.",
      variant: "success",
    })

    router.push("/auth/login")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="reg_name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input id="reg_name" placeholder="Your full name" className="pl-11" {...register("name")} error={errors.name?.message} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="reg_email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input id="reg_email" type="email" placeholder="your@email.com" className="pl-11" {...register("email")} error={errors.email?.message} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="reg_password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input
            id="reg_password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-11 pr-11"
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="reg_confirm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <Input id="reg_confirm" type="password" placeholder="Repeat your password" className="pl-11" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Checkbox id="reg_terms" checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <div>
          <label htmlFor="reg_terms" className="text-sm text-stone-700 cursor-pointer">
            I agree to the{" "}
            <Link href="/terms" className="text-teal-700 hover:underline">Terms of Service</Link>{" "}and{" "}
            <Link href="/privacy" className="text-teal-700 hover:underline">Privacy Policy</Link>
          </label>
          {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>}
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting
          ? <span className="flex items-center gap-2"><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account…</span>
          : <><UserPlus className="h-4 w-4" />Create Account</>
        }
      </Button>
      <p className="text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-teal-700 font-semibold hover:underline">Sign in</Link>
      </p>
    </form>
  )
}
