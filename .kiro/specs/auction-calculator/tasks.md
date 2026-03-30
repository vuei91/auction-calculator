# 구현 계획: 부동산 경매 수익 계산기

## 개요

React 18 + TypeScript + Vite 기반으로 부동산 경매 수익 계산기를 구현한다. 계산 로직은 순수 함수로 분리하고, UI 컴포넌트는 입력/표시 역할만 담당한다. fast-check을 사용한 속성 기반 테스트로 계산 정확성을 검증한다.

## Tasks

- [x] 1. 프로젝트 초기 설정
  - [x] 1.1 TypeScript 및 테스트 환경 구성
    - 기존 Vite + React 프로젝트에 TypeScript 설정 추가 (tsconfig.json)
    - Vitest 및 fast-check 설치 및 설정 (vitest.config.ts)
    - src/utils, src/components, src/types 디렉토리 구조 생성
    - _Requirements: 전체_

- [x] 2. 타입 정의 및 포맷터 구현
  - [x] 2.1 타입 정의 파일 생성
    - src/types/index.ts에 AcquisitionHouseCount, PublicPriceHouseCount, HouseType, TaxBracket 등 모든 타입/인터페이스 정의
    - AcquisitionTaxResult, PropertyTaxResult, ComprehensiveRealEstateTaxResult, BrokerageFeeResult, CapitalGainsTaxResult, AllCosts, TotalResult 인터페이스 정의
    - PROGRESSIVE_TAX_BRACKETS 상수 정의
    - _Requirements: 2.1, 9.1, 11.1_

  - [x] 2.2 숫자 포맷터 및 입력 검증 유틸리티 구현
    - src/utils/formatters.ts에 formatNumber, getNumericValue, handleNumberInput 구현
    - formatNumber: 천 단위 콤마 삽입
    - getNumericValue: 빈 문자열/null/undefined → 0 변환
    - handleNumberInput: 음수 거부, 정수/소수점 구분 처리
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 13.1, 13.2_

  - [ ]* 2.3 포맷터 속성 기반 테스트 작성
    - **Property 9: 숫자 포맷팅 정확성**
    - **Validates: Requirements 1.5**

  - [ ]* 2.4 입력 검증 속성 기반 테스트 작성
    - **Property 10: 입력 검증 정확성**
    - **Validates: Requirements 1.3, 1.4, 13.1**

- [x] 3. 핵심 계산 함수 구현 (취득 단계)
  - [x] 3.1 누진세율 계산 함수 구현
    - src/utils/calculators.ts에 calculateProgressiveTax 함수 구현
    - 8구간 누진세율 (6%~45%) 구간별 초과분 적용 합산
    - _Requirements: 11.7, 11.8, 11.9_

  - [ ]* 3.2 누진세율 속성 기반 테스트 작성
    - **Property 2: 누진세율 계산 정확성**
    - **Validates: Requirements 11.7, 11.8, 11.9**

  - [x] 3.3 취득세 계산 함수 구현
    - calculateAcquisitionTax: 주택 수(1주택/2주택 비조정·조정/3주택)와 금액 구간별 세율 적용
    - baseTax, localTax, totalTax, description 반환
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 3.4 취득세 속성 기반 테스트 작성
    - **Property 1: 취득세 계산 정확성**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

- [x] 4. 핵심 계산 함수 구현 (보유 단계)
  - [x] 4.1 단순 비용 계산 함수 구현
    - calculateLoanInterest: 낙찰금액 × 대출비율 × 금리 × (보유기간/12)
    - calculateEarlyRepaymentFee: 낙찰금액 × 대출비율 × 수수료율
    - calculateOwnershipTransferFee: 월 관리비 × 보유기간
    - calculateGuaranteeInsurance: 공시가격 × 1.26
    - _Requirements: 4.4, 5.2, 6.4, 7.2_

  - [ ]* 4.2 단순 비용 계산 속성 기반 테스트 작성
    - **Property 3: 단순 비용 계산 공식 정확성**
    - **Validates: Requirements 4.4, 5.2, 6.4, 7.2**

  - [x] 4.3 재산세 계산 함수 구현
    - calculatePropertyTax: 과세표준(공시가격 × 60%), 4구간 누진세율, 지방교육세(20%) 합산
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 4.4 재산세 속성 기반 테스트 작성
    - **Property 4: 재산세 계산 정확성**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5, 8.6**

  - [x] 4.5 종합부동산세 계산 함수 구현
    - calculateComprehensiveRealEstateTax: 주택 수별 공제금액, 과세표준, 1주택/다주택 누진세율
    - _Requirements: 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8_

  - [ ]* 4.6 종합부동산세 속성 기반 테스트 작성
    - **Property 5: 종합부동산세 계산 정확성**
    - **Validates: Requirements 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8**

- [x] 5. Checkpoint - 보유 단계까지 테스트 확인
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. 핵심 계산 함수 구현 (매도 단계)
  - [x] 6.1 중개수수료 계산 함수 구현
    - calculateBrokerageFee: 6구간 요율, 한도액 적용, VAT 10% 가산
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_

  - [ ]* 6.2 중개수수료 속성 기반 테스트 작성
    - **Property 6: 중개수수료 계산 정확성**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8**

  - [x] 6.3 양도소득세 계산 함수 구현
    - calculateCapitalGainsTax: 필요경비, 양도차익, 기본공제, 보유기간별 세율/누진세율, 지방소득세
    - _Requirements: 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10, 11.11_

  - [ ]* 6.4 양도소득세 속성 기반 테스트 작성
    - **Property 7: 양도소득세 계산 파이프라인 정확성**
    - **Validates: Requirements 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 11.10**

  - [x] 6.5 최종 결과 계산 함수 구현
    - calculateTotalResult: 총 비용 합산, 총 투자금액, 순수익, 수익률, 시세차익, 대출금액, 현금투입
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [ ]* 6.6 최종 결과 속성 기반 테스트 작성
    - **Property 8: 최종 결과 계산 정확성**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7**

- [x] 7. Checkpoint - 모든 계산 함수 테스트 확인
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. UI 컴포넌트 구현
  - [x] 8.1 BasicInfo 컴포넌트 구현
    - 낙찰금액, 판매예상금액 입력 필드
    - 숫자 입력 검증 적용
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 8.2 AcquisitionCost 컴포넌트 구현
    - 주택 수 선택, 취득세 자동계산 버튼, 경매집행비용/법무비/미납관리비 입력
    - 기본값 설정 (경매집행비용 280만, 법무비 100만)
    - 자동계산 + 수동 오버라이드 지원
    - _Requirements: 2.1, 2.8, 2.9, 3.1, 3.2, 3.3, 3.4_

  - [x] 8.3 HoldingCost 컴포넌트 구현
    - 보유기간, 인테리어, 입주청소, 월 관리비, 소유권이후 관리비, 명도비, 대출비율/금리/이자, 중도상환수수료, 관리비
    - 기본값 설정 (보유기간 24개월, 인테리어 1000만, 대출비율 65%, 금리 4.5%, 수수료율 1%)
    - 대출이자/중도상환수수료/소유권이후 관리비 자동계산 버튼
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 5.1, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [x] 8.4 PublicPriceInfo 컴포넌트 구현
    - 공시가격, 보증보험료, 주택 수 선택, 재산세, 종부세
    - 보증보험료/재산세/종부세 자동계산 버튼
    - _Requirements: 7.1, 7.3, 7.4, 8.7, 8.8, 9.1, 9.8, 9.9_

  - [x] 8.5 SaleCost 컴포넌트 구현
    - 중개수수료, 주택 유형 선택, 양도소득세, 지방소득세
    - 중개수수료/양도소득세 자동계산 버튼
    - _Requirements: 10.9, 10.10, 11.1, 11.11, 11.12, 11.13_

  - [x] 8.6 ResultDisplay 컴포넌트 구현
    - 낙찰가, 매도가, 총 비용, 시세차익, 과세표준, 양도세, 지방소득세, 순수익, 총 투자금액, 경락자금대출, 현금투입, 수익률
    - 순수익 양수/음수 색상 구분 (녹색/빨간색)
    - 숫자 포맷팅 (천 단위 콤마)
    - _Requirements: 12.8, 12.9, 12.10_

- [x] 9. App 컴포넌트 및 통합
  - [x] 9.1 App 컴포넌트 구현
    - 전체 상태 관리 (useState)
    - 각 컴포넌트에 props 전달
    - 자동계산 버튼 핸들러에서 순수 계산 함수 호출 후 상태 업데이트
    - 에러 메시지 처리 (선행 입력값 검증)
    - 계산하기 버튼으로 최종 결과 산출
    - _Requirements: 12.1, 13.3, 13.4_

  - [x] 9.2 CSS 스타일링
    - 섹션별 구분, 입력 그룹 레이아웃
    - 자동계산 버튼 스타일
    - 결과 표시 영역 스타일 (순수익 색상 구분 포함)
    - _Requirements: 12.8, 12.9_

- [x] 10. Final Checkpoint - 전체 통합 테스트 확인
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- 모든 계산 함수는 순수 함수로 구현하여 테스트 가능성 확보
- UI 컴포넌트는 계산 로직을 직접 포함하지 않음
- Property 테스트는 fast-check 라이브러리 사용, 최소 100회 반복
