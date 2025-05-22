// PrivacyContent.jsx
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const PrivacyContent = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-traveling-text">개인정보 처리방침</h1>
        <p className="text-traveling-text/70">트래블링 서비스의 개인정보 처리방침입니다.</p>
      </div>

      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6 flex justify-end">
          <p className="text-sm text-traveling-text/70">최종 수정일: 2025년 4월 1일</p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="mb-2 text-traveling-text/80">
              트래블링(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
              이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를
              받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ol className="list-disc space-y-2 pl-5 text-traveling-text/80">
              <li>
                회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
                서비스 부정이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.
              </li>
              <li>
                서비스 제공: 여행 정보 제공, 여행 일정 계획, 커뮤니티 서비스 등 서비스 제공과 관련한 목적으로 개인정보를
                처리합니다.
              </li>
              <li>
                마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회
                제공, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를
                처리합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">2. 수집하는 개인정보 항목 및 수집방법</h2>
            <p className="mb-2 text-traveling-text/80">
              회사는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                수집항목
                <ol className="list-disc pl-5 pt-2">
                  <li>필수항목: 이메일 주소, 비밀번호, 이름, 출생년도,성별</li>
                  <li>선택항목: 프로필 이미지, 자기소개</li>
                  <li>
                    서비스 이용 과정에서 생성되는 정보: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록
                  </li>
                </ol>
              </li>
              <li>
                수집방법
                <ol className="list-disc pl-5 pt-2">
                  <li>회원가입, 서비스 이용, 이벤트 참여, 생성정보 수집 툴을 통한 수집</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">3. 개인정보의 보유 및 이용기간</h2>
            <p className="mb-2 text-traveling-text/80">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
              보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ol className="list-disc space-y-2 pl-5 text-traveling-text/80">
              <li>회원 가입 및 관리: 회원탈퇴 시까지</li>
              <li>다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지</li>
              <li>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지</li>
              <li>서비스 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">4. 개인정보의 파기절차 및 방법</h2>
            <p className="mb-2 text-traveling-text/80">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
              개인정보를 파기합니다.
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                파기절차
                <ol className="list-disc pl-5 pt-2">
                  <li>
                    이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타
                    관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
                  </li>
                  <li>이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.</li>
                </ol>
              </li>
              <li>
                파기방법
                <ol className="list-disc pl-5 pt-2">
                  <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                  <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">5. 개인정보의 안전성 확보 조치</h2>
            <p className="mb-2 text-traveling-text/80">
              회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고
              있습니다.
            </p>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                개인정보 취급 직원의 최소화 및 교육
                <p className="pt-2">
                  개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고
                  있습니다.
                </p>
              </li>
              <li>
                해킹 등에 대비한 기술적 대책
                <p className="pt-2">
                  회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고
                  주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및
                  차단하고 있습니다.
                </p>
              </li>
              <li>
                개인정보의 암호화
                <p className="pt-2">
                  이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는
                  파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하여 보호하고 있습니다.
                </p>
              </li>
              <li>
                접속기록의 보관 및 위변조 방지
                <p className="pt-2">
                  개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난,
                  분실되지 않도록 보안기능을 사용하고 있습니다.
                </p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">6. 개인정보 보호책임자</h2>
            <p className="mb-2 text-traveling-text/80">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
              피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="rounded-lg bg-traveling-background p-4 text-traveling-text/80">
              <p>▶ 개인정보 보호책임자</p>
              <p>성명: 홍길동</p>
              <p>직책: 개인정보보호팀장</p>
              <p>연락처: privacy@traveling.com</p>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/signup" className="inline-flex items-center text-traveling-purple hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            회원가입으로 돌아가기
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyContent;
