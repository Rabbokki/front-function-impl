import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { saveReqDto, travelPlanId } = state || {};

  useEffect(() => {
      async function saveFlight() {
        try {
          await axiosInstance.post(
            `/api/flights/save`,
            saveReqDto,
            { params: { travelPlanId } }
          );
        } catch (err) {
          console.error('항공편 저장 오류', err);
        }
      }
      if (saveReqDto && travelPlanId) {
        saveFlight();
      }

      const timer = setTimeout(() => {
        navigate('/');
      }, 4000);
      return () => clearTimeout(timer);
    }, [saveReqDto, travelPlanId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-traveling-background p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-traveling-pink" />
        <h2 className="text-2xl font-bold text-traveling-text mb-2">결제가 성공적으로 완료되었습니다!</h2>
        <p className="text-traveling-text/70 mb-6">이용해 주셔서 감사합니다. 잠시 후 메인 페이지로 이동합니다.</p>
        <div className="inline-block bg-traveling-pink/10 text-traveling-pink rounded-full px-4 py-2 font-medium">
          4초 후 자동 이동
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;


// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";

// function PaymentSuccess() {
//   // const [searchParams] = useSearchParams();
//   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   const pgToken = searchParams.get("pg_token");
//   //   const tid = localStorage.getItem("kakaoTid");
//   //   const partnerOrderId = localStorage.getItem("partnerOrderId");
//   //   const partnerUserId = localStorage.getItem("partnerUserId");

//     // if (!pgToken || !tid || !partnerOrderId || !partnerUserId) {
//     //   console.error("결제 정보 누락:", { pgToken, tid, partnerOrderId, partnerUserId });
//     //   alert("결제 정보가 올바르지 않습니다. 다시 시도해주세요.");
//     //   navigate("/flight-search");
//     //   return;
//     // }

// //     async function approveKakaoPay() {
// //       try {
// //         console.log("카카오페이 승인 요청:", { tid, pgToken, partnerOrderId, partnerUserId });
// //         const response = await axiosInstance.post(
// //           "/api/payments/kakaopay/approve",
// //           {
// //             tid,
// //             pg_token: pgToken,
// //             partner_order_id: partnerOrderId,
// //             partner_user_id: partnerUserId,
// //           },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
// //             },
// //           }
// //         );
// //         console.log("카카오페이 승인 응답:", response.data);
// //         if (response.data.success) {
// //           alert("결제가 완료되었습니다!");
// //           navigate("/mypage");
// //         } else {
// //           console.error("결제 승인 실패:", response.data);
// //           alert(`결제 승인에 실패했습니다: ${response.data.message || "알 수 없는 오류"}`);
// //           navigate("/flight-search");
// //         }
// //       } catch (error) {
// //         console.error("결제 승인 실패:", {
// //           message: error.message,
// //           response: error.response?.data,
// //           status: error.response?.status,
// //         });
// //         alert(`결제 승인 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
// //         navigate("/flight-search");
// //       } finally {
// //         console.log("로컬 스토리지 정리: kakaoTid, partnerOrderId, partnerUserId");
// //         localStorage.removeItem("kakaoTid");
// //         localStorage.removeItem("partnerOrderId");
// //         localStorage.removeItem("partnerUserId");
// //       }
// //     }

// //     approveKakaoPay();
// //   }, [searchParams, navigate]);

// //   return (
// //     <div className="flex justify-center py-12">
// //       <div className="text-center">
// //         <h2 className="text-2xl font-bold text-traveling-text">결제 처리 중...</h2>
// //         <p className="mt-2 text-traveling-text/70">결제 승인 요청을 처리하고 있습니다. 잠시만 기다려주세요.</p>
// //       </div>
// //     </div>
// //   );
// }

// export default PaymentSuccess;