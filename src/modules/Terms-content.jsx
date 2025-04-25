import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../Card';
import { Link } from 'react-router-dom';

export function TermsContent() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-traveling-text">이용약관</h1>
        <p className="text-traveling-text/70">트래블링 서비스 이용약관입니다.</p>
      </div>

      <Card className="bg-white p-6 shadow-md">
        <div className="mb-6 flex justify-end">
          <p className="text-sm text-traveling-text/70">최종 수정일: 2025년 4월 1일</p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제1조 (목적)</h2>
            <p className="text-traveling-text/80">
              이 약관은 트래블링(이하 "회사"라 함)이 제공하는 여행 정보 서비스(이하 "서비스"라 함)를 이용함에 있어
              회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제2조 (정의)</h2>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>"서비스"란 회사가 제공하는 여행 정보 제공, 여행 일정 계획, 커뮤니티 등의 서비스를 의미합니다.</li>
              <li>
                "이용자"란 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
              </li>
              <li>
                "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가
                제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </li>
              <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제3조 (약관의 게시와 개정)</h2>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</li>
              <li>회사는 필요한 경우 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
              <li>
                회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그
                적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
              </li>
              <li>
                이용자는 개정된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있으며, 개정된 약관의 효력 발생일로부터
                7일 이후에도 거부의사를 표시하지 않고 서비스를 계속 이용할 경우 약관의 변경 사항에 동의한 것으로
                간주됩니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제4조 (서비스의 제공 및 변경)</h2>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                회사는 다음과 같은 서비스를 제공합니다.
                <ol className="list-disc pl-5 pt-2">
                  <li>여행 정보 제공 서비스</li>
                  <li>여행 일정 계획 서비스</li>
                  <li>여행 관련 커뮤니티 서비스</li>
                  <li>
                    기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 이용자에게 제공하는 일체의 서비스
                  </li>
                </ol>
              </li>
              <li>
                회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및
                제공일자 등을 그 변경 전에 해당 서비스 초기화면에 게시하여 이용자에게 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제5조 (서비스 이용계약의 성립)</h2>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                이용계약은 이용자가 약관의 내용에 대하여 동의를 하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후
                이용신청을 하고 회사가 이를 승낙함으로써 성립됩니다.
              </li>
              <li>
                회사는 다음 각 호에 해당하는 이용신청에 대하여는 이를 승낙하지 아니할 수 있습니다.
                <ol className="list-disc pl-5 pt-2">
                  <li>이미 가입된 회원과 동일한 이메일 주소를 이용하여 신청한 경우</li>
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위의 정보를 기재하거나, 회사가 요구하는 내용을 기재하지 않은 경우</li>
                  <li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</li>
                </ol>
              </li>
            </ol>
          </section>

          {/* 추가 조항들 */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제6조 (회원정보의 변경)</h2>
            <p className="text-traveling-text/80">
              회원은 개인정보 관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스
              관리를 위해 필요한 이메일 등은 수정이 불가능합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-traveling-text">제7조 (회원의 의무)</h2>
            <ol className="list-decimal space-y-2 pl-5 text-traveling-text/80">
              <li>
                회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.
                <ol className="list-disc pl-5 pt-2">
                  <li>다른 회원의 아이디를 부정 사용하는 행위</li>
                  <li>범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위</li>
                  <li>타인의 지적재산권을 침해하는 행위</li>
                  <li>
                    회사의 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나 상업적으로
                    이용하는 행위
                  </li>
                  <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
                  <li>회사의 서비스 운영을 방해하는 행위</li>
                  <li>기타 관계법령에 위배되는 행위</li>
                </ol>
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/signup" className="inline-flex items-center text-traveling-purple hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            회원가입으로 돌아가기
          </Link>
        </div>
      </Card>
    </div>
  );
}
