export default {
  title: '二次元周边定制',
  subtitle: '让您的创意成为现实，打造独一无二的收藏品',

  personal: {
    title: '个人专属定制',
    subtitle: '一对一专属服务，打造独一无二的作品',
    startingPrice: '起价：¥3,000',
    deposit: '定金比例：30%-50%',

    scenarios: {
      title: '适用场景',
      scenario1: '追求独特性，想要独一无二的收藏品',
      scenario2: '有明确的创意和定制需求',
      scenario3: '注重品质，愿意为专属服务付费',
      scenario4: '需要较快的制作周期'
    },

    steps: {
      title: '服务流程',
      step1: {
        title: '提交申请',
        time: 'Day 1',
        content: '填写详细的定制需求，上传参考图片'
      },
      step2: {
        title: '需求沟通',
        time: 'Day 2-3',
        content: '专属客服一对一沟通细节需求'
      },
      step3: {
        title: '方案制定',
        time: 'Day 4-7',
        content: '设计师定制专属方案和效果图'
      },
      step4: {
        title: '支付定金',
        time: 'Day 8',
        content: '确认方案后支付30%-50%定金'
      },
      step5: {
        title: '开始制作',
        time: 'Day 9-38',
        content: '工匠开始制作，定期反馈进度'
      },
      step6: {
        title: '完成发货',
        time: 'Day 39-40',
        content: '确认成品并支付尾款后发货'
      }
    },

    privileges: {
      title: '专属特权',
      privilege1: {
        title: '专属设计',
        description: '一对一沟通，完全按照您的想法设计'
      },
      privilege2: {
        title: '版权保护',
        description: '独家版权，确保作品独一无二'
      },
      privilege3: {
        title: '优先制作',
        description: '优先排期，更快的制作周期'
      },
      privilege4: {
        title: '专人服务',
        description: '专属客服全程跟进服务'
      }
    },

    applyButton: '申请个人定制'
  },

  crowdfunding: {
    title: '众人请愿定制',
    subtitle: '集众人之力，共同实现梦想',
    estimatedPrice: '预估价：¥299-999',
    minQuantity: '最低众筹数量：100份',

    scenarios: {
      title: '适用场景',
      scenario1: '热门IP周边的集体需求',
      scenario2: '期待更实惠的定制价格',
      scenario3: '愿意等待较长制作周期',
      scenario4: '想要参与集体众筹活动'
    },

    steps: {
      title: '众筹流程',
      step1: {
        title: '发起众筹',
        time: 'Day 1',
        content: '提交众筹申请和初步方案'
      },
      step2: {
        title: '方案评估',
        time: 'Day 2-5',
        content: '评估可行性并制定众筹方案'
      },
      step3: {
        title: '开启预订',
        time: 'Day 6-35',
        content: '正式启动众筹，接受支持者预订'
      },
      step4: {
        title: '达成目标',
        time: 'Day 36',
        content: '达到目标份数，确认生产方案'
      },
      step5: {
        title: '批量生产',
        time: 'Day 37-96',
        content: '工厂开始批量生产定制商品'
      },
      step6: {
        title: '分批发货',
        time: 'Day 97-100',
        content: '完成生产后分批发货给支持者'
      }
    },

    privileges: {
      title: '支持者权益',
      item1: {
        title: '优惠价格',
        description: '批量生产，享受更优惠的价格'
      },
      item2: {
        title: '编号版本',
        description: '限量编号，专属收藏价值'
      },
      item3: {
        title: '支持者福利',
        description: '专属周边、抽选特典等福利'
      },
      item4: {
        title: '粉丝社群',
        description: '加入支持者社群，分享快乐'
      }
    },

    applyButton: '发起众筹定制'
  },
  detail: {
    title: '定制订单详情',
    orderInfo: '订单信息',
    orderNumber: '订单编号',
    createTime: '创建时间',
    status: '订单状态',
    category: '定制类别',
    requirements: '定制需求',
    progress: '进度追踪',
    designs: '设计图/样品图',
    estimate: '价格预估',
    materialCost: '材料费用',
    laborCost: '人工费用',
    otherCost: '其他费用',
    totalCost: '总费用',
    confirmEstimate: '确认预估价格',
    noEstimate: '暂无价格预估',
    contact: '联系客服',
    estimateConfirmed: '已确认预估价格',
    error: {
      loadFailed: '获取订单信息失败',
      confirmFailed: '确认预估失败'
    }
  },
  status: {
    pending: '待审核',
    approved: '已审核',
    rejected: '已拒绝',
    deposit: '待付定金',
    production: '生产中',
    final: '待付尾款',
    shipping: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消',
    unknown: '未知状态'
  },
  apply: {
    title: '定制申请',
    formTitle: '申请信息',
    name: '申请人姓名',
    contact: '联系电话',
    email: '电子邮箱',
    type: '定制类型',
    requirements: '需求描述',
    budgetMin: '最低预算',
    budgetMax: '最高预算',
    deadline: '期望交付时间',
    attachments: '附件',
    remark: '备注',
    success: '申请提交成功',
    error: {
      nameRequired: '请输入申请人姓名',
      contactRequired: '请输入联系方式',
      emailRequired: '请输入电子邮箱',
      invalidEmail: '请输入有效的电子邮箱地址',
      typeRequired: '请选择定制类型',
      requirementsRequired: '请输入需求描述',
      invalidBudget: '请输入有效的预算金额',
      budgetRange: '最高预算不能小于最低预算',
      submitFailed: '提交申请失败',
      uploadFailed: '上传失败，请重试',
      tooManyFiles: '最多只能上传6个文件',
      fileTooLarge: '单个文件大小不能超过50MB',
      imageUploadFailed: '图片上传失败',
      attachmentUploadFailed: '附件上传失败',
      invalidAttachmentType: '不支持的附件格式，仅支持 PDF、Word、Excel 和压缩文件',
      editor: {
        uploadImage: '上传图片',
        uploading: '正在上传图片...',
        uploadSuccess: '图片上传成功',
        uploadFailed: '图片上传失败',
        instanceNotFound: '编辑器实例未找到',
        formatError: '仅支持 jpg/png/gif/webp 格式图片',
        sizeError: '图片大小不能超过 2MB',
        imageTooltip: '支持 jpg/png/gif/webp 格式，单个文件不超过2MB'
      }
    },
    submit: '提交申请',
    progress: '申请进度',
    uploadSuccess: '上传成功',
    referenceImages: '参考图片',
    uploadImages: '上传图片',
    uploadAttachment: '上传附件',
    additionalRequirements: '其他要求',
    form: {
      description: '需求描述',
      descriptionRequired: '请输入需求描述',
      type: '定制类型',
      rewardDescriptionPlaceholder: '请详细描述回报内容...'
    }
  },
  cases: {
    title: '成功案例',
    items: [
      {
        title: '原神-刻晴手办',
        name: '个人定制版',
        type: '手办模型',
        customType: 'personal',
        description: '完美还原游戏中的细节，独特pose设计'
      },
      {
        title: '鬼灭之刃系列',
        name: '众筹限定版',
        type: '手办套装',
        customType: 'crowdfunding',
        description: '限量500套编号版本，众筹价格优惠'
      },
      {
        title: '海贼王-路飞',
        name: '个人定制版',
        type: '场景手办',
        customType: 'personal',
        description: '特殊场景还原，独家收藏版'
      }
    ]
  },

  faq: {
    title: '常见问题',
    items: [
      {
        question: '个人定制和众筹定制的主要区别是什么？',
        answer: '个人定制提供一对一专属服务，完全按照个人需求定制，价格较高但独特性强；众筹定制通过集体购降低成本，格更亲民，但需要达到最低众筹数量。'
      },
      {
        question: '定制周期大概需要多久？',
        answer: '个人定制一般需要30-40天，众筹定制因为涉及众筹周期和批量生产，通常需要90-100天。具体时间会在预估方案中说明。'
      },
      {
        question: '定金比例是多少？',
        answer: '个人定制一般需要支付30%-50%的定金，具体比例根据定制难度和材质决定；众筹定制需要支付全款，但众筹失败会全额退款。'
      },
      {
        question: '是否可以修改定制方案？',
        answer: '个人定制在确认方案前可以多次沟通修改；众筹定制因涉及多人，一旦方案确定后较难大幅修改，但可以在众筹前提出建议。'
      }
    ]
  },
    type: {
      clothing: '服装定制',
      jewelry: '珠宝首饰',
      furniture: '家具定制',
      artwork: '艺术作品',
      other: '其他定制'
    },
  list: {
    title: '我的定制申请',
    empty: '暂无定制申请',
    orderNumber: '订单编号',
    filter: {
      all: '全部',
      pending: '待审核',
      inProgress: '进行中',
      completed: '已完成'
    },
    sort: {
      latest: '最新创建',
      earliest: '最早创建',
      deadline: '交付时间'
    }
  },
  error: {
    invalidTargetAmount: '请输入有效的目标金额',
    minTargetAmount: '目标金额不能低于1000',
    invalidMinSupportAmount: '请输入有效的最低支持金额',
    exceedTargetAmount: '最低支持金额不能超过目标金额',
    startTimeRequired: '请选择开始时间',
    endTimeRequired: '请选择结束时间',
    invalidEndTime: '结束时间必须晚于开始时间',
    rewardTitleRequired: '请输入回报标题',
    invalidRewardAmount: '请输入有效的回报金额',
    rewardDescriptionRequired: '请输入回报描述'
  },
    orders: {
      title: '定制订单列表'
    }
}
