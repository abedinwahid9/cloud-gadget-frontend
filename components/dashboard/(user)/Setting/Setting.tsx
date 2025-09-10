"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Setting = () => {
  return (
    <div className="  space-y-8">
      {/* Profile Info */}
      <Card className="bg-primary/20 dark:bg-blue-300/20 border border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Profile Settings
          </CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              defaultValue="Abedin Wahid"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="abedin@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+880 1234 567890"
              defaultValue="+880 1234 567890"
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Password Settings
          </CardTitle>
          <CardDescription>Change your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Notification Settings
          </CardTitle>
          <CardDescription>Manage how you get notified</CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>SMS Notifications</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Promotional Offers</Label>
            <Switch defaultChecked />
          </div>
        </CardContent> */}
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">
            Privacy & Security
          </CardTitle>
          <CardDescription>Enhance your account security</CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Two-Factor Authentication</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Login Alerts</Label>
            <Switch defaultChecked />
          </div>
        </CardContent> */}
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-400">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-red-600">
            Danger Zone
          </CardTitle>
          <CardDescription>Delete or deactivate your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="destructive" className="w-full">
            Deactivate Account
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
