import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Lock, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card";
import { Switch } from "./Switch";
import { Label } from "./Label";
import { Input } from "./Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { Separator } from "./Separator";
import { toast } from "../hooks/Use-toast";

export function SettingsContent() {
  const history = useHistory(); // Changed to useHistory
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    social: true,
    updates: true,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved.",
      description: "Changes have been applied successfully.",
    });

    // In a real implementation, here you'd make an API call to save the settings

    // Redirect to the MyPage after saving
    setTimeout(() => {
      history.push("/mypage");
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, here you'd make an API call to change the password

    toast({
      title: "Password changed.",
      description: "Your password has been updated successfully.",
    });

    // Reset fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#e7f5ff]">
          <TabsTrigger value="account" className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white">
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a]">Account Settings</CardTitle>
              <CardDescription>Manage your account information and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#1e3a8a]">Change Password</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Label htmlFor="current-password" className="text-[#1e3a8a]">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        className="bg-[#e7f5ff]/30 pr-10"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#495057]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password" className="text-[#1e3a8a]">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      className="bg-[#e7f5ff]/30"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password" className="text-[#1e3a8a]">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      className="bg-[#e7f5ff]/30"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="mt-2 bg-[#4dabf7] text-white hover:bg-[#339af0]">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-medium text-[#1e3a8a]">Delete Account</h3>
                <p className="mt-1 text-sm text-[#495057]">
                  Deleting your account will permanently erase all your data. This action cannot be undone.
                </p>
                <Button variant="destructive" className="mt-3">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a]">Notification Settings</CardTitle>
              <CardDescription>Manage how and what types of notifications you receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">Email Notifications</Label>
                    <p className="text-sm text-[#495057]">Receive important notifications via email.</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={() => handleToggleNotification("email")}
                    className="data-[state=checked]:bg-[#4dabf7]"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">Social Notifications</Label>
                    <p className="text-sm text-[#495057]">Receive notifications for friends' activities and social updates.</p>
                  </div>
                  <Switch
                    checked={notifications.social}
                    onCheckedChange={() => handleToggleNotification("social")}
                    className="data-[state=checked]:bg-[#4dabf7]"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">Service Updates</Label>
                    <p className="text-sm text-[#495057]">Receive updates and changes to services.</p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={() => handleToggleNotification("updates")}
                    className="data-[state=checked]:bg-[#4dabf7]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          className="border-[#adb5bd] text-[#495057] hover:bg-[#e7f5ff] hover:text-[#1e3a8a]"
          onClick={() => history.push("/mypage")}
        >
          Cancel
        </Button>
        <Button className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]" onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
