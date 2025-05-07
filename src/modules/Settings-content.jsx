import { useState } from 'react';
import { Lock, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '../modules/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../modules/Card';
import { Switch } from '../modules/Switch';
import { Label } from '../modules/Label';
import { Input } from '../modules/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../modules/Tabs';
import { Separator } from '../modules/Separator';
import { toast } from '../hooks/Use-toast';
import { useNavigate } from 'react-router-dom';

export function SettingsContent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 알림 설정 상태
  const [notifications, setNotifications] = useState({
    email: true,
    social: true,
    updates: true,
  });

  const handleSaveSettings = () => {
    toast({ title: '설정 저장됨', description: '변경사항이 저장되었습니다.' });
    setTimeout(() => {
      navigate('/mypage');
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: '오류',
        description: '모든 비밀번호 필드를 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: '오류',
        description: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        variant: 'destructive',
      });
      return;
    }

    // 실제 구현에서는 여기서 API 호출 등을 통해 비밀번호 변경

    toast({
      title: '비밀번호가 변경되었습니다.',
      description: '새 비밀번호로 성공적으로 변경되었습니다.',
    });

    // 필드 초기화
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            계정
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white"
          >
            알림
          </TabsTrigger>
        </TabsList>

        {/* 계정 설정 */}
        <TabsContent value="account">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a]">
                계정 설정
              </CardTitle>
              <CardDescription>
                계정 정보 및 비밀번호를 관리하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#1e3a8a]">
                  비밀번호 변경
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Label
                      htmlFor="current-password"
                      className="text-[#1e3a8a]"
                    >
                      현재 비밀번호
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? 'text' : 'password'}
                        className="bg-[#e7f5ff]/30 pr-10"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#495057]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password" className="text-[#1e3a8a]">
                      새 비밀번호
                    </Label>
                    <Input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      className="bg-[#e7f5ff]/30"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="confirm-password"
                      className="text-[#1e3a8a]"
                    >
                      비밀번호 확인
                    </Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      className="bg-[#e7f5ff]/30"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePasswordChange}
                  className="mt-2 bg-[#4dabf7] text-white hover:bg-[#339af0]"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  비밀번호 변경
                </Button>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-lg font-medium text-[#1e3a8a]">
                  계정 삭제
                </h3>
                <p className="mt-1 text-sm text-[#495057]">
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
                  되돌릴 수 없습니다.
                </p>
                <Button variant="destructive" className="mt-3">
                  계정 삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 설정 */}
        <TabsContent value="notifications">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a]">
                알림 설정
              </CardTitle>
              <CardDescription>
                알림 수신 방법과 종류를 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">
                      이메일 알림
                    </Label>
                    <p className="text-sm text-[#495057]">
                      중요 알림을 이메일로 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={() => handleToggleNotification('email')}
                    className="data-[state=checked]:bg-[#4dabf7]"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">
                      소셜 알림
                    </Label>
                    <p className="text-sm text-[#495057]">
                      친구 활동 및 소셜 업데이트를 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.social}
                    onCheckedChange={() => handleToggleNotification('social')}
                    className="data-[state=checked]:bg-[#4dabf7]"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-[#1e3a8a]">
                      서비스 업데이트
                    </Label>
                    <p className="text-sm text-[#495057]">
                      서비스 변경 및 업데이트 정보를 받습니다.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={() => handleToggleNotification('updates')}
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
          onClick={() => navigate('/mypage')} // ✅ 수정
        >
          취소
        </Button>
        <Button
          className="bg-[#ffd43b] text-[#1e3a8a] hover:bg-[#fcc419]"
          onClick={handleSaveSettings}
        >
          <Save className="mr-2 h-4 w-4" />
          설정 저장
        </Button>
      </div>
    </div>
  );
}
