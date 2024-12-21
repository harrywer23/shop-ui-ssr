export default {
  title: '애니메이션 굿즈 커스터마이징',
  subtitle: '아이디어를 현실로, 독특한 컬렉션 제작',
  
  personal: {
    title: '개인 맞춤 제작',
    subtitle: '1대1 전용 서비스로 독특한 작품 제작',
    startingPrice: '시작가: ¥3,000',
    deposit: '계약금: 30%-50%',
    
    scenarios: {
      title: '적용 시나리오',
      scenario1: '독특함을 추구하는 분, 세상에 하나뿐인 컬렉션을 원하시는 분',
      scenario2: '명확한 아이디어와 맞춤 요구사항이 있으신 분',
      scenario3: '품질을 중시하고 전용 서비스에 가치를 두시는 분',
      scenario4: '비교적 빠른 제작 주기가 필요하신 분'
    },
    
    steps: {
      title: '서비스 과정',
      step1: {
        title: '신청서 제출',
        time: 'Day 1',
        content: '상세한 맞춤 요구사항 작성 및 참고 이미지 업로드'
      },
      step2: {
        title: '요구사항 상담',
        time: 'Day 2-3',
        content: '전담 고객 서비스와 1대1 상세 상담'
      },
      step3: {
        title: '계획 수립',
        time: 'Day 4-7',
        content: '디자이너가 전용 계획과 렌더링 작성'
      },
      step4: {
        title: '계약금 지불',
        time: 'Day 8',
        content: '계획 확인 후 30%-50% 계약금 지불'
      },
      step5: {
        title: '제작 시작',
        time: 'Day 9-38',
        content: '장인이 제작을 시작하고 정기적으로 진행 상황 보고'
      },
      step6: {
        title: '배송 완료',
        time: 'Day 39-40',
        content: '완성품 확인 및 잔금 지불 후 배송'
      }
    },
    
    privileges: {
      title: '전용 특권',
      privilege1: {
        title: '전용 디자인',
        description: '1대1 소통으로 아이디어를 완벽하게 구현'
      },
      privilege2: {
        title: '저작권 보호',
        description: '독점 저작권으로 작품의 유일성 보장'
      },
      privilege3: {
        title: '우선 제작',
        description: '우선 일정 배정으로 더 빠른 제작 주기'
      },
      privilege4: {
        title: '전담 서비스',
        description: '전담 고객 서비스가 전 과정 지원'
      }
    },
    
    applyButton: '개인 맞춤 신청'
  },
  
  crowdfunding: {
    title: '크라우드펀딩 제작',
    subtitle: '함께하는 힘으로 꿈을 실현',
    estimatedPrice: '예상 가격: ¥299-999',
    minQuantity: '최소 제작 수량: 100개',
    
    scenarios: {
      title: '적용 시나리오',
      scenario1: '인기 IP 상품의 단체 수요',
      scenario2: '더 저렴한 제작 가격 기대',
      scenario3: '긴 제작 기간 수용 가능',
      scenario4: '크라우드펀딩 참여 희망'
    },
    
    steps: {
      title: '크라우드펀딩 과정',
      step1: {
        title: '크라우드펀딩 신청',
        time: 'Day 1',
        content: '크라우드펀딩 신청 및 초기 계획 제출'
      },
      step2: {
        title: '계획 평가',
        time: 'Day 2-5',
        content: '실현 가능성 평가 및 계획 수립'
      },
      step3: {
        title: '예약 시작',
        time: 'Day 6-35',
        content: '크라우드펀딩 시작 및 서포터 예약 접수'
      },
      step4: {
        title: '목표 달성',
        time: 'Day 36',
        content: '목표 수량 달성 및 제작 계획 확정'
      },
      step5: {
        title: '대량 생산',
        time: 'Day 37-96',
        content: '공장에서 상품 대량 생산 시작'
      },
      step6: {
        title: '배송 시작',
        time: 'Day 97-100',
        content: '제작 완료 후 서포터에 ���차 배송'
      }
    },
    
    privileges: {
      title: '서포터 혜택',
      item1: {
        title: '할인 가격',
        description: '대량 생산을 통한 가격 절감'
      },
      item2: {
        title: '넘버링 에디션',
        description: '한정 번호 부여로 수집 가치 보장'
      },
      item3: {
        title: '서포터 특전',
        description: '전용 상품, 추첨 특전 등'
      },
      item4: {
        title: '팬 커뮤니티',
        description: '서포터 커뮤니티 참여'
      }
    },
    
    applyButton: '크라우드펀딩 시작'
  },
  
  orders: {
    title: '맞춤 주문 목록',
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
        confirmFailed: '견적 확인 실패',
        editor: {
          uploadImage: '이미지 업로드',
          uploading: '이미지 업로드 중...',
          uploadSuccess: '이미지 업로드 성공',
          uploadFailed: '이미지 업로드 실패',
          instanceNotFound: '에디터 인스턴스를 찾을 수 없습니다',
          formatError: 'jpg/png/gif/webp 형식만 지원됩니다',
          sizeError: '이미지 크기는 2MB를 초과할 수 없습니다',
          imageTooltip: 'jpg/png/gif/webp 형식 지원, 파일당 최대 2MB'
        }
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
    apply: {
      title: '맞춤 신청',
      formTitle: '신청 정보',
      submit: '신청 제출',
      progress: '신청 진행 상황',
      uploadSuccess: '업로드 성공',
      referenceImages: '참고 이미지',
      uploadImages: '이미지 업로드',
      uploadAttachment: '첨부 파일 업로드',
      additionalRequirements: '추가 요구사항',
      form: {
        description: '요구사항 설명',
        descriptionRequired: '요구사항 설명을 입력해주세요',
        type: '맞춤 유형',
        rewardDescriptionPlaceholder: '리워드 내용을 자세히 설명해주세요...'
      }
    }
  },
  
  list: {
    title: '내 맞춤 신청',
    empty: '맞춤 신청이 없습니다',
    orderNumber: '주문 번호',
    filter: {
      all: '전체',
      pending: '검토 대기',
      inProgress: '진행 중',
      completed: '완��'
    },
    sort: {
      latest: '최신순',
      earliest: '오래된순',
      deadline: '납기일순'
    }
  },
  
  status: {
    pending: '검토 대기',
    approved: '승인됨',
    rejected: '거절됨',
    inProgress: '진행 중',
    completed: '완료',
    cancelled: '취소됨'
  },
  
  type: {
    figure: '피규어 모델',
    clothing: '의류 맞춤',
    accessory: '액세서리 맞춤',
    other: '기타 맞춤'
  }
} 