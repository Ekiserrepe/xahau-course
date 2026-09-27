/**
 * Korean code titles and slides for the Module 10 lessons that had none
 * (10.1–10.8), applied by m10-escrows-checks.js. Their Korean code comes from
 * ./code-i18n-ko.js.
 */
export const KOREAN_M10 = {
  m10l1: {
    codeTitles: ["타임 락 escrow 만들기 (FinishAfter = 2분)", "잠금 기간이 지난 escrow 완료하기"],
    slides: [
      ["Escrow란?", "자금을 잠그는 조건부 결제\n\n• 타임 락 (FinishAfter)\n• 자동 취소 (CancelAfter)\n• 암호학적 조건 (Condition)\n\n용도: 예약 결제, 베스팅, 아토믹 스왑"],
      ["Escrow의 수명 주기", "1. EscrowCreate → 자금을 잠금\n     ↓ (시간이 지남)\n2. EscrowFinish → 받는 계정에 해제\n     또는\n2. EscrowCancel → 만든 계정에 반환\n\n• Finish 전에 FinishAfter가 지나야 함\n• Cancel 전에 CancelAfter가 지나야 함"],
      ["크립토 조건", "암호학적 증명이 있는 Escrow:\n\n• Condition = SHA-256 해시\n• Fulfillment = 비밀 프리이미지\n• 비밀을 아는 사람만 완료 가능\n• Interledger Protocol 기반\n\n당사자 간 신뢰 없는 교환에 적합"],
    ],
  },
  m10l2: {
    codeTitles: ["check 만들기", "받은 check 현금화하기"],
    slides: [
      ["Check란?", "전통적인 은행 수표와 비슷함\n\n• 보내는 사람이 check를 만듦 (CheckCreate)\n• 받는 사람이 원할 때 현금화 (CheckCash)\n• 만들 때 자금이 이동하지 않음\n• 네이티브 XAH와 IOU 지원\n• 만료일을 둘 수 있음"],
      ["Check의 수명 주기", "1. CheckCreate → 보내는 사람이 check를 만듦\n     ↓ (받는 사람이 시점을 정함)\n2. CheckCash → 받는 사람이 현금화\n     또는\n2. CheckCancel → 어느 쪽이든 취소\n\n• Amount = 현금화할 정확한 금액\n• DeliverMin = 받아들일 최소 금액\n• 만료된 check는 취소할 수 있음"],
      ["Check vs Payment vs Escrow", "Payment → 즉시 이체\n\nEscrow → 조건이 걸린 잠긴 자금\n• 시간, 크립토 조건 또는 둘 다\n• 자금이 실제로 잠김\n\nCheck → 지연 결제 약속\n• 받는 사람이 현금화 시점을 정함\n• 자금이 잠기지 않음 (쓸 수 있음)\n• 더 유연하지만 보장은 적음"],
    ],
  },
  m10l3: {
    codeTitles: ["Ticket을 만들어 여러 결제를 연속으로 보내기"],
    slides: [
      ["Ticket이란?", "Sequence 번호를 미리 예약\n\n• 순서와 무관한 트랜잭션 가능\n• Sequence: 0 + TicketSequence: N\n• 사용하면 삭제됨\n• 계정당 최대 250개\n\nTicket마다 소유자 reserve를 사용"],
      ["사용 사례", "• 막힘 없는 병렬 트랜잭션\n• 나중에 보낼 트랜잭션을 미리 서명\n• 독립적인 다중 서명\n• 비상 대책과 대체 경로\n\nTicketCreate → 예약 (1-250)\n사용 → Sequence: 0 + TicketSequence\n취소 → Ticket을 쓴 빈 AccountSet"],
      ["Ticket vs 일반 Sequence", "일반 Sequence:\n• 엄격한 순서: 1, 2, 3, 4...\n• 2가 실패하면 3이 막힘\n\nTicket 사용 시:\n• 어떤 순서든: 3, 1, 2...\n• 서로 독립적\n• 각각 소유자 reserve를 사용\n• 사용하거나 취소하면 해제"],
    ],
  },
  m10l4: {
    codeTitles: ["네트워크 보상 청구하기"],
    slides: [
      ["ClaimReward", "Xahau 네이티브 보상\n\n• XAH 잔액에 따라 쌓임\n• 스테이킹이나 노드가 필요 없음\n• ClaimReward로 받음\n• 잔액에 바로 더해짐\n\n주기적으로 청구 (매일/매주)"],
      ["청구 방법", "처음 → 계정을 보상 대상으로 활성화\n이후 → 쌓인 금액을 청구\n\n필드:\n• Account: 내 계정\n• Issuer: 네트워크 제네시스 계정\n• Flags: 0 (청구) / 1 (비활성화)\n\n일반 수수료, Hook과 호환"],
    ],
  },
  m10l5: {
    codeTitles: ["다른 계정의 Hook을 Invoke로 실행하기"],
    slides: [
      ["Invoke", "Hook을 직접 실행\n\n• 자금을 이체하지 않음\n• Hook을 위한 트리거일 뿐\n• Destination 없음 → 내 Hook\n• Destination 있음 → 다른 계정의 Hook\n\nHook의 HookOn에서 Invoke가 켜져 있어야 함"],
      ["Invoke 사용 사례", "• Hook이 Invoke를 발행해\n  다른 Hook을 실행\n• 수동 트리거: 필요할 때\n  Hook의 로직을 실행\n• Invoke의 Memos나 HookParameters로\n  Hook에 데이터 전달\n\n네이티브 일정 실행은 CronSet 사용.\nInvoke는 맞춤 사례나 다른 계정의\nHook 실행에 여전히 유용"],
    ],
  },
  m10l6: {
    codeTitles: ["내 계정(AccountRoot)에 Remarks 추가 및 업데이트", "Remark 삭제 (RemarkValue 생략)"],
    slides: [
      ["SetRemarks", "원장 객체의 키-값 메타데이터\n\n• Remarks를 붙일 수 있는 곳: AccountRoot, Offer,\n  Escrow, Check, URIToken, TrustLine...\n• RemarkName + RemarkValue (hex)\n• 소유자/발행자만 수정 가능\n• 객체당 최대 32개\n\n메시지가 아니라 객체의 메타데이터"],
      ["만들기, 수정, 삭제", "만들기 / 업데이트:\n  → RemarkName + RemarkValue\n\n삭제:\n  → RemarkValue 없이 RemarkName만\n\n변경 불가 (tfImmutable = Flags: 1):\n  → 절대 수정하거나 삭제할 수 없음\n\n추가 수수료: 이름 + 값 1바이트당 1 drop"],
      ["ObjectID: 어떤 객체에 붙일까?", "원장 객체마다 고유 ID가 있음:\n\n• AccountRoot → account_data.index\n• Escrow, Check, Offer → 객체를 만들 때\n  AffectedNodes의 LedgerIndex\n\nSetRemarks는 이 ID로 메타데이터를\n붙일 객체를 알아냄"],
    ],
  },
  m10l7: {
    codeTitles: ["Remit: 결제 + URIToken 민팅을 한 트랜잭션으로"],
    slides: [
      ["Remit — 다기능 트랜잭션", "하나의 트랜잭션으로 모두:\n\n• 새 계정 활성화\n• 최대 32건 결제 (XAH + IOU)\n• 최대 32개 URIToken 전송\n• 받는 계정에 URIToken 민팅\n\n모두 원자적: 함께 일어나거나 전혀 일어나지 않음"],
      ["Remit이 reserve를 부담", "보내는 사람이 모든 비용을 부담:\n\n• 받는 계정 활성화\n• 필요한 TrustLine 생성\n• URIToken reserve\n• 일반 트랜잭션 수수료\n\n여러 개의 개별 트랜잭션보다\n수수료를 아끼고 원자성을 보장"],
    ],
  },
  m10l8: {
    codeTitles: ["TSH Collect를 켜고 CronSet 예약하기", "활성 CronSet 삭제하기"],
    slides: [
      ["CronSet이란?", "네트워크가 일정에 따라 Hook을 실행\n\n• CronSet은 계정에 Cron 객체를 저장\n• 시각마다 네트워크가 Cron 의사 트랜잭션을\n  만들어 Hook을 실행\n• StartTime: 첫 실행(0 = 지금)\n• DelaySeconds + RepeatCount: 반복\n• 실행 횟수 = 1 + RepeatCount(최대 256)"],
      ["cron 설정", "1. Flags: 5(hsfOVERRIDE + hsfCOLLECT)이고\n   HookOn에 Cron(타입 92)이 포함된 Hook\n2. AccountSet SetFlag: 11(asfTshCollect)\n3. StartTime이 있는 CronSet\n   (+ DelaySeconds와 RepeatCount)\n\n1 또는 2가 없으면 → tesSUCCESS지만 Hook은 실행 안 됨\n삭제: Flags: 1(tfCronUnset)인 CronSet\n수수료: 기본 × (2 + RepeatCount)"],
      ["Invoke vs CronSet", "주기적 Invoke:\n• 외부 트리거 (스크립트, 서버)\n• 유연함, 어떤 간격이든\n• 실행 중인 서비스에 의존\n\nCronSet:\n• 완전히 온체인\n• 추가 인프라 불필요\n• tx당 최대 256번 반복\n• 제한: DelaySeconds ≤ 365일\n\nCronSet = Hook의 완전한 자율성"],
    ],
  },
}

/** Fill in the Korean code titles and slides a lesson doesn't have. */
export function applyKoreanM10(module) {
  for (const lesson of module.lessons) {
    const ko = KOREAN_M10[lesson.id]
    if (!ko) continue
    lesson.codeBlocks?.forEach((block, i) => {
      if (ko.codeTitles[i] && !block.title.ko) block.title.ko = ko.codeTitles[i]
    })
    lesson.slides?.forEach((slide, i) => {
      if (!ko.slides[i]) return
      slide.title.ko ??= ko.slides[i][0]
      slide.content.ko ??= ko.slides[i][1]
    })
  }
}
