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
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

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

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveSettings = () => {
    toast({ title: '설정 저장됨', description: '변경사항이 저장되었습니다.' });
    setTimeout(() => {
      navigate('/mypage');
    }, 1500);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('모든 비밀번호 필드를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('새 비밀번호와 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.put('/api/accounts/password', {
        currentPassword,
        newPassword,
      });

      toast.success('비밀번호가 성공적으로 변경되었습니다!');

      localStorage.removeItem('accessToken');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2초 후 로그인 페이지 이동

      // 입력값 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const raw = error?.response?.data;
      const errorMessage =
        typeof raw === 'string'
          ? raw
          : raw?.message || '현재 비밀번호가 틀렸거나 오류가 발생했습니다.';

      toast.error(errorMessage);
    }
  };

  // SettingsContent.jsx
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
      )
    ) {
      return;
    }

    try {
      await axiosInstance.delete('/api/accounts');

      toast.success('계정이 성공적으로 삭제되었습니다!');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || '계정 삭제 중 오류가 발생했습니다.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6 bg-[#e7f5ff] min-h-screen py-10 px-4">
      <Tabs defaultValue="account" className="max-w-3xl mx-auto w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#cbe4f9] rounded-xl">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white rounded-xl"
          >
            계정
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#4dabf7] data-[state=active]:text-white rounded-xl"
          >
            알림
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="bg-white rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e3a8a] font-bold">
                계정 설정
              </CardTitle>
              <CardDescription>비밀번호를 안전하게 변경하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1e3a8a]">
                  비밀번호 변경
                </h3>
                <div className="space-y-3">
                  <div>
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
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-white border border-[#d0ebff] rounded-xl px-4 py-2 pr-10 text-[#1e3a8a]"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
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
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white border border-[#d0ebff] rounded-xl px-4 py-2 text-[#1e3a8a]"
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white border border-[#d0ebff] rounded-xl px-4 py-2 text-[#1e3a8a]"
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePasswordChange}
                  className="bg-white border border-[#4dabf7] text-[#1e3a8a] hover:bg-[#d0ebff] rounded-xl px-5 py-2"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  비밀번호 변경
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold text-[#1e3a8a]">
                  계정 삭제
                </h3>
                <p className="mt-1 text-sm text-[#495057]">
                  삭제 시 모든 데이터가 영구적으로 제거됩니다. 이 작업은 되돌릴
                  수 없습니다.
                </p>
                <Button
                  onClick={handleDeleteAccount}
                  className="mt-3 border border-red-300 text-red-500 hover:bg-red-50 rounded-xl px-5 py-2"
                  variant="outline"
                >
                  계정 삭제
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 알림 설정 */}
        <TabsContent value="notifications">
          <Card className="bg-white rounded-2xl shadow-md p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-[#1e3a8a]">
                📬 알림 설정
              </CardTitle>
              <CardDescription className="text-sm text-[#495057]">
                알림 수신 방법과 종류를 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* 이메일 알림 */}
                <div className="flex items-center justify-between border-b pb-4 border-[#e9ecef]">
                  <div className="space-y-1.5">
                    <Label className="text-base font-medium text-[#1e3a8a]">
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

                {/* 소셜 알림 */}
                <div className="flex items-center justify-between border-b pb-4 border-[#e9ecef]">
                  <div className="space-y-1.5">
                    <Label className="text-base font-medium text-[#1e3a8a]">
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

                {/* 서비스 업데이트 */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <Label className="text-base font-medium text-[#1e3a8a]">
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

          {/* 저장 버튼 영역 */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              className="border-[#ced4da] text-[#495057] rounded-xl hover:bg-[#f1f3f5]"
              onClick={() => navigate('/mypage')}
            >
              취소
            </Button>
            <Button
              className="bg-[#ffd43b] text-[#1e3a8a] font-semibold px-6 py-2 rounded-xl hover:bg-[#fcc419] transition-transform hover:scale-105"
              onClick={handleSaveSettings}
            >
              <Save className="mr-2 h-4 w-4" />
              설정 저장
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
