"use client";

import { AdminSettingsForm } from "@/components/forms/AdminSettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-4">
          <Settings className="h-8 w-8 text-lime-400" />
          <h1 className="text-3xl font-bold text-lime-400">Admin Settings</h1>
        </div>
        
        <Card className="bg-gray-800 border-gray-700 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-lime-400 text-2xl">Profile Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your admin profile information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSettingsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
