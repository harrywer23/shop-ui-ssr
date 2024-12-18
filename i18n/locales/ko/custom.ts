export default {
  title: '맞춤 주문',
  detail: {
    title: '맞춤 주문 상세',
    orderInfo: '주문 정보',
    orderNumber: '주문 번호',
    createTime: '생성 시간',
    status: '주문 상태',
    category: '맞춤 카테고리',
    requirements: '맞춤 요구사항',
    progress: '진행 상황',
    designs: '디자인/샘플 이미지',
    estimate: '가격 견적',
    materialCost: '재료비',
    laborCost: '인건비',
    otherCost: '기타 비용',
    totalCost: '총 비용',
    confirmEstimate: '견적 확인',
    noEstimate: '아직 견적이 없습니다',
    contact: '고객 지원 문의',
    estimateConfirmed: '견적 확인됨',
    error: {
      loadFailed: '주문 정보 로드 실패',
      confirmFailed: '견적 확인 실패'
    }
  },
  status: {
    pending: '검토 대기',
    approved: '승인됨',
    rejected: '거절됨',
    deposit: '계약금 대기',
    production: '제작 중',
    final: '잔금 대기',
    shipping: '배송 대기',
    shipped: '배송됨',
    completed: '완료',
    cancelled: '취소됨',
    unknown: '알 수 없는 상태'
  },
  type: {
    clothing: '의류 맞춤',
    jewelry: '주얼리',
    furniture: '가구 맞춤',
    artwork: '예술 작품',
    other: '기타 맞춤'
  },
  list: {
    title: '내 맞춤 신청',
    empty: '맞춤 신청이 없습니다',
    filter: {
      all: '전체',
      pending: '검토 대기',
      inProgress: '진행 중',
      completed: '완료'
    },
    sort: {
      latest: '최신순',
      earliest: '오래된순',
      deadline: '납기일순'
    }
  },
  orders: {
    title: '맞춤 주문 목록'
  },
  apply: {
    error: {
      tooManyFiles: '최대 6개의 파일만 업로드할 수 있습니다',
      fileTooLarge: '파일 크기는 50MB를 초과할 수 없습니다',
      imageUploadFailed: '이미지 업로드 실패',
      attachmentUploadFailed: '첨부 파일 업로드 실패',
      invalidAttachmentType: '지원되지 않는 파일 형식입니다. PDF, Word, Excel 및 압축 파일만 지원됩니다'
    },
    imageNote: 'jpg, png, gif 형식 지원, 이미지당 최대 5MB',
    attachmentNote: 'PDF, Word, Excel 및 압축 파일(zip/rar/7z) 지원',
    fileLimitNote: '최대 {maxFiles}개 파일, 파일당 최대 {maxSize}'
  }
} 