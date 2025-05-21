import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../../modules/Button";
import { Label } from "../../modules/Label";
import { TabsContent } from "../../modules/Tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import PropTypes from "prop-types";

function PaymentInfo({
  flight,
  passengerCount,
  selectedSeats,
  passengerData,
  contactData,
  formatPrice,
  handleBooking,
  setTabValue,
  isKakaoModalOpen,
  setIsKakaoModalOpen,
  qrCodeUrl,
  setQrCodeUrl,
  kakaoTid,
  setKakaoTid,
  paymentError,
  setPaymentError,
}) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const totalPrice = Math.floor(
    parseFloat(flight.price) * passengerCount +
      parseFloat(flight.price) * passengerCount * 0.1 +
      selectedSeats.length * 20000
  ); // 정수로 변환

  const handleCardChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const validatePayment = () => {
    if (!termsAgreed) {
      alert("이용약관과 개인정보 처리방침에 동의해주세요.");
      return false;
    }
    if (paymentMethod === "card") {
      if (!cardDetails.number || !/^\d{16}$/.test(cardDetails.number.replace(/-/g, ""))) {
        alert("유효한 카드 번호를 입력해주세요.");
        return false;
      }
      if (!cardDetails.name) {
        alert("카드 소유자 이름을 입력해주세요.");
        return false;
      }
      if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        alert("유효한 유효 기간을 입력해주세요 (MM/YY).");
        return false;
      }
      if (!cardDetails.cvv || !/^\d{3}$/.test(cardDetails.cvv)) {
        alert("유효한 CVV 코드를 입력해주세요.");
        return false;
      }
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email && emailRegex.test(email);
  };

  const handleKakaoPay = async () => {
    if (!termsAgreed) {
      alert("이용약관과 개인정보 처리방침에 동의해주세요.");
      return;
    }
    console.log("handleKakaoPay 호출, flight 객체:", flight);
    const flightId = flight.flightId || flight.id;
    if (!flightId) {
      console.error("flightId가 정의되지 않았습니다:", flight);
      setPaymentError("항공편 ID가 없습니다. 다시 시도해주세요.");
      setIsKakaoModalOpen(true);
      return;
    }

    // contactData 검증 및 기본값 설정
    const validatedContact = {
      email: validateEmail(contactData.email)
        ? contactData.email
        : `user_${Date.now()}@example.com`,
      phone: contactData.phone && contactData.phone.trim() !== ""
        ? contactData.phone
        : "01000000000",
    };

    try {
      const bookingData = {
        flightId: flightId,
        passengerCount,
        selectedSeats,
        totalPrice, // 정수로 전송
        passengers: passengerData,
        contact: validatedContact,
      };
      console.log("카카오페이 결제 요청 데이터:", JSON.stringify(bookingData, null, 2));
      const response = await axiosInstance.post("/api/payments/kakaopay/ready", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("카카오페이 결제 준비 응답:", response.data);
      if (response.data.success) {
        setQrCodeUrl(response.data.qrCodeUrl);
        setKakaoTid(response.data.tid);
        localStorage.setItem("kakaoTid", response.data.tid);
        localStorage.setItem("partnerOrderId", response.data.partnerOrderId);
        localStorage.setItem("partnerUserId", response.data.partnerUserId);
        setPaymentError(null);
        setIsKakaoModalOpen(true);
      } else {
        throw new Error(response.data.message || "카카오페이 결제 준비에 실패했습니다.");
      }
    } catch (error) {
      console.error("카카오페이 결제 준비 실패:", error);
      const errorMessage = error.response?.data?.message || error.message || "카카오페이 서버에 연결할 수 없습니다. 네트워크를 확인해주세요.";
      setPaymentError(errorMessage);
      setIsKakaoModalOpen(true);
    }
  };

  const handleNext = async () => {
    if (paymentMethod === "kakao") {
      await handleKakaoPay();
    } else if (validatePayment()) {
      console.log("PaymentInfo: 예약 완료 버튼 클릭, 예약 처리");
      await handleBooking();
    }
  };

  const handlePrevious = () => {
    console.log("PaymentInfo: 이전 버튼 클릭, 탭 전환 to passenger-info");
    setTabValue("passenger-info");
  };

  return (
    <TabsContent value="payment" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">결제 정보</h3>
        {paymentError && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">{paymentError}</div>
        )}
        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h4 className="mb-3 text-md font-medium text-traveling-text">결제 요약</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-traveling-text/70">항공권 요금 (성인 {passengerCount}명)</span>
              <span className="font-medium text-traveling-text">
                {formatPrice(parseFloat(flight.price) * passengerCount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-traveling-text/70">세금 및 수수료</span>
              <span className="font-medium text-traveling-text">
                {formatPrice(parseFloat(flight.price) * passengerCount * 0.1)}
              </span>
            </div>
            {selectedSeats.length > 0 && (
              <div className="flex justify-between">
                <span className="text-traveling-text/70">좌석 선택 ({selectedSeats.length}석)</span>
                <span className="font-medium text-traveling-text">{formatPrice(selectedSeats.length * 20000)}</span>
              </div>
            )}
            <div className="border-t border-traveling-text/10 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-traveling-text">총 결제 금액</span>
                <span className="text-lg font-bold text-traveling-text">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h3 className="mb-3 text-md font-medium text-traveling-text">결제 수단</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-card"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <Label htmlFor="payment-card">신용/체크카드</Label>
            </div>
            {paymentMethod === "card" && (
              <div className="rounded-lg border border-traveling-text/10 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">카드 번호</Label>
                    <input
                      id="card-number"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="0000-0000-0000-0000"
                      value={cardDetails.number}
                      onChange={(e) => handleCardChange("number", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">카드 소유자 이름</Label>
                    <input
                      id="card-name"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="카드에 표시된 이름"
                      value={cardDetails.name}
                      onChange={(e) => handleCardChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry">유효 기간</Label>
                    <input
                      id="card-expiry"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardChange("expiry", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvv">보안 코드 (CVV)</Label>
                    <input
                      id="card-cvv"
                      className="w-full rounded-md border border-traveling-text/20 p-2 text-sm"
                      placeholder="000"
                      type="password"
                      maxLength={3}
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardChange("cvv", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-bank"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              <Label htmlFor="payment-bank">계좌이체</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="payment-kakao"
                name="payment-method"
                className="h-4 w-4 text-traveling-pink"
                checked={paymentMethod === "kakao"}
                onChange={() => setPaymentMethod("kakao")}
              />
              <Label htmlFor="payment-kakao">카카오페이</Label>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-traveling-text/10 bg-white p-4">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms-agree"
              className="mt-1 h-4 w-4 text-traveling-pink"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
            />
            <Label htmlFor="terms-agree" className="text-sm">
              본인은 <span className="text-traveling-pink">이용약관</span>과{" "}
              <span className="text-traveling-pink">개인정보 처리방침</span>에 동의하며, 위 내용이 사실과 다를 경우
              발생하는 불이익에 대한 책임은 본인에게 있음을 확인합니다.
            </Label>
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full border-traveling-text/30 text-traveling-text"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전: 탑승객 정보
          </Button>
          <Button className="rounded-full btn-flight" onClick={handleNext}>
            예약 완료
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Transition show={isKakaoModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsKakaoModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    카카오페이로 결제
                  </DialogTitle>
                  <div className="mt-2">
                    {paymentError ? (
                      <div className="rounded-md bg-red-100 p-4 text-red-700">{paymentError}</div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">
                          아래 QR 코드를 카카오페이 앱으로 스캔하여 결제를 완료해주세요.
                        </p>
                        {qrCodeUrl ? (
                          <div className="mt-4 flex justify-center">
                            <img src={qrCodeUrl} alt="카카오페이 QR 코드" className="h-48 w-48" />
                          </div>
                        ) : (
                          <p className="mt-4 text-sm text-red-500">QR 코드를 로드할 수 없습니다. 네트워크를 확인해주세요.</p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      className="rounded-full border-gray-300 text-gray-700"
                      onClick={() => setIsKakaoModalOpen(false)}
                    >
                      취소
                    </Button>
                    {!paymentError && (
                      <Button
                        className="rounded-full bg-traveling-pink text-white"
                        onClick={async () => {
                          try {
                            console.log("결제 상태 확인 요청, tid:", kakaoTid);
                            const response = await axiosInstance.get(`/api/payments/kakaopay/status/${kakaoTid}`, {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                              },
                            });
                            console.log("카카오페이 결제 상태 확인:", response.data);
                            if (response.data.success && response.data.status === "SUCCESS") {
                              alert("결제가 완료되었습니다!");
                              setIsKakaoModalOpen(false);
                              // 로컬 스토리지 정리
                              localStorage.removeItem("kakaoTid");
                              localStorage.removeItem("partnerOrderId");
                              localStorage.removeItem("partnerUserId");
                              // 마이페이지로 이동
                              window.location.href = "/mypage";
                            } else {
                              const errorMessage = response.data.message || "결제 상태 확인에 실패했습니다.";
                              setPaymentError(errorMessage);
                              console.error("결제 상태 확인 실패:", response.data);
                            }
                          } catch (error) {
                            console.error("결제 상태 확인 중 오류:", error);
                            const errorMessage = error.response?.data?.message || error.message || "결제 상태 확인 중 오류가 발생했습니다.";
                            setPaymentError(errorMessage);
                          }
                        }}
                      >
                        결제 상태 확인
                      </Button>
                    )}
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </TabsContent>
  );
}

PaymentInfo.propTypes = {
  flight: PropTypes.object.isRequired,
  passengerCount: PropTypes.number.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  passengerData: PropTypes.array.isRequired,
  contactData: PropTypes.object.isRequired,
  formatPrice: PropTypes.func.isRequired,
  handleBooking: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
  isKakaoModalOpen: PropTypes.bool.isRequired,
  setIsKakaoModalOpen: PropTypes.func.isRequired,
  qrCodeUrl: PropTypes.string,
  setQrCodeUrl: PropTypes.func.isRequired,
  kakaoTid: PropTypes.string,
  setKakaoTid: PropTypes.func.isRequired,
  paymentError: PropTypes.string,
  setPaymentError: PropTypes.func.isRequired,
};

export default PaymentInfo;