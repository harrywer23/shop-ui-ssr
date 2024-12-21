export default {
  title: '二次元周邊定制',
  subtitle: '讓您的創意成為現實，打造獨一無二的收藏品',

  personal: {
    title: '個人專屬定制',
    subtitle: '一對一專屬服務，打造獨一無二的作品',
    startingPrice: '起價：¥3,000',
    deposit: '定金比例：30%-50%',

    scenarios: {
      title: '適用場景',
      scenario1: '追求獨特性，想要獨一無二的收藏品',
      scenario2: '有明確的創意和定制需求',
      scenario3: '注重品質，願意為專屬服務付費',
      scenario4: '需要較快的製作週期'
    },

    steps: {
      title: '服務流程',
      step1: {
        title: '提交申請',
        time: 'Day 1',
        content: '填寫詳細的定制需求，上傳參考圖片'
      },
      step2: {
        title: '需求溝通',
        time: 'Day 2-3',
        content: '專屬客服一對一溝通細節需求'
      },
      step3: {
        title: '方案制定',
        time: 'Day 4-7',
        content: '設計師定制專屬方案和效果圖'
      },
      step4: {
        title: '支付定金',
        time: 'Day 8',
        content: '確認方案後支付30%-50%定金'
      },
      step5: {
        title: '開始製作',
        time: 'Day 9-38',
        content: '工匠開始製作，定期反饋進度'
      },
      step6: {
        title: '完成發貨',
        time: 'Day 39-40',
        content: '確認成品並支付尾款後發貨'
      }
    },

    privileges: {
      title: '專屬特權',
      privilege1: {
        title: '專屬設計',
        description: '一對一溝通，完全按照您的想法設計'
      },
      privilege2: {
        title: '版權保護',
        description: '獨家版權，確保作品獨一無二'
      },
      privilege3: {
        title: '優先製作',
        description: '優先排期，更快的製作週期'
      },
      privilege4: {
        title: '專人服務',
        description: '專屬客服全程跟進服務'
      }
    },

    applyButton: '申請個人定制'
  },

  crowdfunding: {
    title: '眾人請願定制',
    subtitle: '集眾人之力，共同實現夢想',
    estimatedPrice: '預估價：¥299-999',
    minQuantity: '最低眾籌數量：100份',

    scenarios: {
      title: '適用場景',
      scenario1: '熱門IP周邊的集體需求',
      scenario2: '期待更實惠的定制價格',
      scenario3: '願意等待較長製作���期',
      scenario4: '想要參與集體眾籌活動'
    },

    steps: {
      title: '眾籌流程',
      step1: {
        title: '發起眾籌',
        time: 'Day 1',
        content: '提交眾籌申請和初步方案'
      },
      step2: {
        title: '方案評估',
        time: 'Day 2-5',
        content: '評估可行性並制定眾籌方案'
      },
      step3: {
        title: '開啟預訂',
        time: 'Day 6-35',
        content: '正式啟動眾籌，接受支持者預訂'
      },
      step4: {
        title: '達成目標',
        time: 'Day 36',
        content: '達到目標份數，確認生產方案'
      },
      step5: {
        title: '批量生產',
        time: 'Day 37-96',
        content: '工廠開始批量生產定制商品'
      },
      step6: {
        title: '分批發貨',
        time: 'Day 97-100',
        content: '完成生產後分批發貨給支持者'
      }
    },

    privileges: {
      title: '支持者權益',
      item1: {
        title: '優惠價格',
        description: '批量生產，享受更優惠的價格'
      },
      item2: {
        title: '編號版本',
        description: '限量編號，專屬收藏價值'
      },
      item3: {
        title: '支持者福利',
        description: '專屬周邊、抽選特典等福���'
      },
      item4: {
        title: '粉絲社群',
        description: '加入支持者社群，分享快樂'
      }
    },
   },
    applyButton: '發起眾籌定制',
    detail: {
    title: '定制訂單詳情',
    orderInfo: '訂單信息',
    orderNumber: '訂單編號',
    createTime: '創建時間',
    status: '訂單狀態',
    category: '定制類別',
    requirements: '定制需求',
    progress: '進度追蹤',
    designs: '設計圖/樣品圖',
    estimate: '價格預估',
    materialCost: '材料費用',
    laborCost: '人工費用',
    otherCost: '其他費用',
    totalCost: '總費用',
    confirmEstimate: '確認預估價格',
    noEstimate: '暫無價格預估',
    contact: '聯繫客服',
    estimateConfirmed: '已確認預估價格',
    error: {
      loadFailed: '獲取訂單信息失敗',
      confirmFailed: '確認預估失敗'
    }
  },
  status: {
    pending: '待審核',
    approved: '已審核',
    rejected: '已拒絕',
    deposit: '待付定金',
    production: '生產中',
    final: '待付尾款',
    shipping: '待發貨',
    shipped: '已發貨',
    completed: '已完成',
    cancelled: '已取消',
    unknown: '未知狀態'
  },
  apply: {
    form: {
      applicationType: '申請類型',
      personalApplication: '個人申請',
      crowdfundingApplication: '眾籌申請',
      targetAmount: '目標金額',
      minSupportAmount: '最低支持金額',
      startTime: '開始時間',
      endTime: '結束時間',
      rewards: '回報設置',
      rewardTitle: '回報標題',
      rewardAmount: '回報金額',
      rewardDescription: '回報描述',
      addReward: '添加回報',
      title: '申請標題',
      titleRequired: '請輸入申請標題'
    },
    error: {
      tooManyFiles: '最多只能上傳6個文件',
      fileTooLarge: '單個文件大小不能超過50MB',
      imageUploadFailed: '圖片上傳失敗',
      attachmentUploadFailed: '附件上傳失敗',
      invalidAttachmentType: '不支持的附件格式，僅支持 PDF、Word、Excel 和壓縮文件'
    },
    imageNote: '支持 jpg、png、gif 格式，單張圖片不超過 5MB',
    attachmentNote: '支持 PDF、Word、Excel 和壓縮文件(zip/rar/7z)',
    fileLimitNote: '最多可上傳{maxFiles}個文件，每個文件大小不超過{maxSize}',
    title: '定製申請',
    formTitle: '申請信息',
    submit: '提交申請',
    progress: '申請進度',
    uploadSuccess: '上傳成功',
    referenceImages: '參考圖片',
    uploadImages: '上傳圖片',
    uploadAttachment: '上傳附件',
    additionalRequirements: '其他要求',
    form: {
      description: '需求描述',
      descriptionRequired: '請輸入需求描述',
      type: '定製類型',
      rewardDescriptionPlaceholder: '請詳細描述回報內容...'
    }
  },
  orders: {
    title: '定製訂單列表',
    detail: {
      title: '定製訂單詳情',
      orderInfo: '訂單信息',
      orderNumber: '訂單編號',
      createTime: '創建時間',
      status: '訂單狀態',
      category: '定製類別',
      requirements: '定製需求',
      progress: '進度追蹤',
      designs: '設計圖/樣品圖',
      estimate: '價格預估',
      materialCost: '材料費用',
      laborCost: '人工費用',
      otherCost: '其他費用',
      totalCost: '總費用',
      confirmEstimate: '確認預估價格',
      noEstimate: '暫無價格預估',
      contact: '聯繫客服',
      estimateConfirmed: '已確認預估價格',
      error: {
        loadFailed: '獲取訂單信息失敗',
        confirmFailed: '確認預估失敗'
      }
    },
    status: {
      pending: '待審核',
      approved: '已審核',
      rejected: '已拒絕',
      deposit: '待付定金',
      production: '生產中',
      final: '待付尾款',
      shipping: '待發貨',
      shipped: '已發貨',
      completed: '已完成',
      cancelled: '已取消',
      unknown: '未知狀態'
    },
    apply: {
      form: {
        applicationType: '申請類型',
        personalApplication: '個人申請',
        crowdfundingApplication: '眾籌申請',
        targetAmount: '目標金額',
        minSupportAmount: '最低支持金額',
        startTime: '開始時間',
        endTime: '結束時間',
        rewards: '回報設置',
        rewardTitle: '回報標題',
        rewardAmount: '回報金額',
        rewardDescription: '回報描述',
        addReward: '添加回報',
        title: '申請標題',
        titleRequired: '請輸入申請標題'
      }
    },
    error: {
      tooManyFiles: '最多只能上傳6個文件',
      fileTooLarge: '單個文件大小不能超過50MB',
      imageUploadFailed: '圖片上傳失敗',
      attachmentUploadFailed: '附件上傳失敗',
      invalidAttachmentType: '不支持的附件格式，僅支持 PDF、Word、Excel 和壓縮文件'
    },
    imageNote: '支持 jpg、png、gif 格式，單張圖片不超過 5MB',
    attachmentNote: '支持 PDF、Word、Excel 和壓縮文件(zip/rar/7z)',
    fileLimitNote: '最多可上傳{maxFiles}個文件，每個文件大小不超過{maxSize}'
  },
  list: {
    title: '我的定製申請',
    empty: '暫無定製申請',
    orderNumber: '訂單編號',
    filter: {
      all: '全���',
      pending: '待審核',
      inProgress: '進行中',
      completed: '已完成'
    },
    sort: {
      latest: '最新創建',
      earliest: '最早創建',
      deadline: '交付時間'
    }
  },
  status: {
    pending: '待審核',
    approved: '已審核',
    rejected: '已拒絕',
    inProgress: '進行中',
    completed: '已完成',
    cancelled: '已取消'
  },
  type: {
    figure: '手辦模型',
    clothing: '服裝定製',
    accessory: '配件定製',
    other: '其他定製'
  },
  error: {
    invalidTargetAmount: '請輸入有效的目標金額',
    minTargetAmount: '目標金額不能低於1000',
    invalidMinSupportAmount: '請輸入有效的最低支持金額',
    exceedTargetAmount: '最低支持金額不能超過目標金額',
    startTimeRequired: '請選擇開始時間',
    endTimeRequired: '請選擇結束時間',
    invalidEndTime: '結束時間必須晚於開始時間',
    rewardTitleRequired: '請輸入回報標題',
    invalidRewardAmount: '請輸入有效的回報金額',
    rewardDescriptionRequired: '請輸入回報描述',
    editor: {
      uploadImage: '上傳圖片',
      uploading: '正在上傳圖片...',
      uploadSuccess: '圖片上傳成功',
      uploadFailed: '圖片上傳失敗',
      instanceNotFound: '編輯器實例未找到',
      formatError: '僅支持 jpg/png/gif/webp 格式圖片',
      sizeError: '圖片大小不能超過 2MB',
      imageTooltip: '支持 jpg/png/gif/webp 格式，單個文件不超過2MB'
    }
  }
}
