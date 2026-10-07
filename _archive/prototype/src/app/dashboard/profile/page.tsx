"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Lock, Save, Camera, Shield } from "lucide-react"
import { PageContainer, SectionWrapper } from "@/components/layout/section-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 700))
    toast({ title: "Profile updated", description: "Your changes have been saved.", variant: "success" })
  }

  return (
    <SectionWrapper className="bg-stone-50">
      <PageContainer narrow>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-teal-700 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Profile Settings</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-100 p-6 flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-2xl">U</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-teal-700 rounded-full flex items-center justify-center text-white hover:bg-teal-800 transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Profile Photo</h3>
              <p className="text-sm text-stone-500 mt-0.5">Optional, your privacy is always protected.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="font-bold text-stone-900 mb-5 flex items-center gap-2"><User className="h-5 w-5 text-teal-600" />Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label htmlFor="p_name">Display Name</Label><Input id="p_name" defaultValue="Anonymous User" placeholder="Your name or alias" /></div>
              <div className="space-y-1.5"><Label htmlFor="p_email">Email Address</Label><Input id="p_email" type="email" defaultValue="user@example.com" /></div>
              <div className="space-y-1.5"><Label htmlFor="p_phone">Phone (optional)</Label><Input id="p_phone" type="tel" placeholder="+234…" /></div>
              <div className="space-y-1.5"><Label htmlFor="p_location">Location (optional)</Label><Input id="p_location" placeholder="City, Country" /></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="font-bold text-stone-900 mb-5 flex items-center gap-2"><Shield className="h-5 w-5 text-teal-600" />Privacy Preferences</h2>
            <div className="space-y-4">
              {[
                { id: "notif_email", label: "Email notifications for my requests", defaultChecked: true },
                { id: "notif_resources", label: "New resource alerts in my categories", defaultChecked: false },
                { id: "profile_private", label: "Keep my profile completely private", defaultChecked: true },
              ].map(({ id, label, defaultChecked }) => (
                <div key={id} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                  <label htmlFor={id} className="text-sm text-stone-700 cursor-pointer">{label}</label>
                  <input type="checkbox" id={id} defaultChecked={defaultChecked} className="h-5 w-5 rounded border-stone-300 text-teal-700 focus:ring-teal-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 p-6">
            <h2 className="font-bold text-stone-900 mb-5 flex items-center gap-2"><Lock className="h-5 w-5 text-teal-600" />Change Password</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2"><Label>Current Password</Label><Input type="password" placeholder="Current password" /></div>
              <div className="space-y-1.5"><Label>New Password</Label><Input type="password" placeholder="New password" /></div>
              <div className="space-y-1.5"><Label>Confirm New Password</Label><Input type="password" placeholder="Confirm new password" /></div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="font-bold text-red-800 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">Delete My Account</Button>
          </div>
          <div className="flex gap-3">
            <Button size="lg" onClick={handleSave}><Save className="h-4 w-4" />Save Changes</Button>
            <Button variant="outline" size="lg" asChild><Link href="/dashboard">Cancel</Link></Button>
          </div>
        </div>
      </PageContainer>
    </SectionWrapper>
  )
}
