import React, { useState, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../modules/Button";
import { Label } from "../../modules/Label";
import { TabsContent } from "../../modules/Tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import PropTypes from "prop-types";
import { QRCodeCanvas } from 'qrcode.react';

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
  const [termsAgreed, setTermsAgreed] = useState(false);
  const navigate = useNavigate();

  const totalPrice = Math.floor(
    parseFloat(flight.price) * passengerCount +
      parseFloat(flight.price) * passengerCount * 0.1 +
      selectedSeats.length * 20000
  );

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|co\.kr)$/;
    return email && emailRegex.test(email);
  };

  const handleKakaoPay = async () => {
    if (!termsAgreed) {
      alert("이용약관과 개인정보 처리방침에 동의해주세요.");
      return;
    }

    const flightId = flight.flightId || flight.id;
    if (!flightId) {
      setPaymentError("항공편 ID가 없습니다. 다시 시도해주세요.");
      setIsKakaoModalOpen(true);
      return;
    }

    const validatedContact = {
      email: validateEmail(contactData.email)
        ? contactData.email
        : `user_${Date.now()}@example.com`,
      phone: contactData.phone?.trim() || "01000000000",
    };

    try {
      const bookingData = {
        flightId,
        passengerCount,
        selectedSeats,
        totalPrice,
        passengers: passengerData,
        contact: validatedContact,
        itemName: `AirTicket_${passengerCount}`,
      };
      const response = await axiosInstance.post(
        "/api/payments/ready",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success && response.data.qrCodeUrl) {
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
      const errorMessage =
        error.response?.data?.message || error.message ||
        "카카오페이 서버에 연결할 수 없습니다.";
      setPaymentError(errorMessage);
      setIsKakaoModalOpen(true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tid = urlParams.get("tid");
    const storedTid = localStorage.getItem("kakaoTid");

    if (tid && tid === storedTid) {
      handlePaymentSuccess(tid);
    }
  }, []);

  const handlePaymentSuccess = async (tid) => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/status/${tid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success && response.data.status === "SUCCESS") {
        await handleBooking();
        setIsKakaoModalOpen(false);
        localStorage.removeItem("kakaoTid");
        localStorage.removeItem("partnerOrderId");
        localStorage.removeItem("partnerUserId");
      } else {
        throw new Error(response.data.message || "결제 상태 확인에 실패했습니다.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message ||
        "결제 상태 확인 중 오류가 발생했습니다.";
      setPaymentError(errorMessage);
      setIsKakaoModalOpen(true);
    }
  };

  const handleNext = async () => {
    await handleKakaoPay();
    // Start 15-second timer to redirect
    setTimeout(() => {
      navigate("/payment/success");
    }, 15000);
  };

  const handlePrevious = () => setTabValue("passenger-info");

  return (
    <TabsContent value="payment" className="space-y-6">
      <div className="rounded-lg bg-traveling-background p-6">
        <h3 className="mb-4 text-lg font-bold text-traveling-text">결제 정보</h3>
        {paymentError && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
            {paymentError}
          </div>
        )}

        {/* Summary */}
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
                <span className="text-traveling-text/70">
                  좌석 선택 ({selectedSeats.length}석)
                </span>
                <span className="font-medium text-traveling-text">
                  {formatPrice(selectedSeats.length * 20000)}
                </span>
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

        {/* Kakao Pay */}
        <div className="mb-6 rounded-lg border border-traveling-text/10 bg-white p-4">
          <h3 className="mb-3 text-md font-medium text-traveling-text">결제 수단: 카카오페이</h3>
          <p className="text-sm text-gray-500">
            버튼을 눌러 카카오페이 QR 코드를 받아 결제를 진행하세요.
          </p>
        </div>

        {/* Terms */}
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
              본인은 <span className="text-traveling-pink">이용약관</span>과{' '}
              <span className="text-traveling-pink">개인정보 처리방침</span>에 동의합니다.
            </Label>
          </div>
        </div>

        {/* Actions */}
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
            결제 진행
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Kakao Modal */}
      <Transition show={isKakaoModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsKakaoModalOpen(false)}
        >
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
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    카카오페이로 결제
                  </DialogTitle>
                  <div className="mt-2">
                    {paymentError ? (
                      <div className="rounded-md bg-red-100 p-4 text-red-700">
                        {paymentError}
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">
                          아래 QR 코드를 카카오페이 앱으로 스캔하여 결제를 완료해주세요.
                        </p>
                        {qrCodeUrl ? (
                          <div className="mt-4 flex justify-center">
                            <QRCodeCanvas
                              value={qrCodeUrl}
                              size={256}
                              level="H"
                              style={{ margin: "auto" }}
                            />
                          </div>
                        ) : (
                          <p className="mt-4 text-sm text-red-500">
                            QR 코드를 로드할 수 없습니다.
                          </p>
                        )}
                        {qrCodeUrl && (
                          <p className="mt-2 text-sm text-gray-500 text-center">
                            또는{' '}
                            <a
                              href={qrCodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-traveling-pink underline"
                            >
                              여기를 클릭
                            </a>
                            하여 결제 페이지로 이동하세요.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      className="rounded-full border-gray-300 text-gray-700"
                      onClick={() => setIsKakaoModalOpen(false)}
                    >
                      취소
                    </Button>
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
