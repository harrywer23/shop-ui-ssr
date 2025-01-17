export default {
  title: 'アニメグッズカスタマイズ',
  subtitle: 'アイデアを現実に、唯一無二のコレクションを作成',

  personal: {
    title: 'パーソナルカスタム',
    subtitle: '1対1の専属サービスで独自の作品を制作',
    startingPrice: '開始価格：¥99',
    deposit: '契約金：30%-50%',

    scenarios: {
      title: '適用シーン',
      scenario1: 'ユニークな作品、世界に一つだけのコレクションを求める方',
      scenario2: '明確なアイデアとカスタマイズ要件がある方',
      scenario3: '品質を重視し、専属サービスに価値を見出す方',
      scenario4: '比較的早い制作サイクルを必要とする方'
    },

    steps: {
      title: 'サービスの流れ',
      step1: {
        title: '申請提出',
        time: 'Day 1',
        content: '詳細なカスタマイズ要件を記入し、参考画像をアップロード'
      },
      step2: {
        title: '要件相談',
        time: 'Day 2-3',
        content: '専属カスタマーサービスと1対1で詳細を相談'
      },
      step3: {
        title: 'プラン作成',
        time: 'Day 4-7',
        content: 'デザイナーが専用プランとレンダリングを作成'
      },
      step4: {
        title: '契約金支払い',
        time: 'Day 8',
        content: 'プラン確認後、30%-50%の契約金を支払い'
      },
      step5: {
        title: '制作開始',
        time: 'Day 9-38',
        content: '職人が制作を開始し、定期的に進捗を報告'
      },
      step6: {
        title: '発送完了',
        time: 'Day 39-40',
        content: '完成品を確認し、残金支払い後に発送'
      }
    },

    privileges: {
      title: '特別特典',
      privilege1: {
        title: '専属デザイン',
        description: '1対1のコミュニケーションで、アイデアを忠実に再現'
      },
      privilege2: {
        title: '著作権保護',
        description: '独占的な著作権で、作品の唯一性を保証'
      },
      privilege3: {
        title: '優先制作',
        description: '優先スケジュールで、より早い制作サイクル'
      },
      privilege4: {
        title: '専属サポート',
        description: '専属カスタマーサービスが全過程をサポート'
      }
    },

    applyButton: 'パーソナルカスタムを申請'
  },

  crowdfunding: {
    title: 'クラウドファンディング制作',
    subtitle: '皆の力を集めて、夢を実現',
    estimatedPrice: '予想価格：¥19-999',
    minQuantity: '最小製作数：10個',

    scenarios: {
      title: '適用シーン',
      scenario1: '人気IPグッズの集団需要',
      scenario2: 'よりお手頃な制作価格を期待',
      scenario3: '長めの制作期間でも構わない方',
      scenario4: 'クラウドファンディングへの参加希望'
    },

    steps: {
      title: 'クラウドファンディングの流れ',
      step1: {
        title: 'クラウドファンディング申請',
        time: 'Day 1',
        content: 'クラウドファンディング申請と初期プラン提出'
      },
      step2: {
        title: 'プラン評価',
        time: 'Day 2-5',
        content: '実現可能性を評価しプランを策定'
      },
      step3: {
        title: '予約開始',
        time: 'Day 6-35',
        content: 'クラウドファンディングを開始し、サポーター予約を受付'
      },
      step4: {
        title: '目標達成',
        time: 'Day 36',
        content: '目標数に達成し、製作プランを確定'
      },
      step5: {
        title: '量産開始',
        time: 'Day 37-96',
        content: '工場で商品の量産を開始'
      },
      step6: {
        title: '出荷開始',
        time: 'Day 97-100',
        content: '製作完了後、サポーターへ順次発送'
      }
    },

    privileges: {
      title: 'サポーター特典',
      item1: {
        title: 'お得な価格',
        description: '一括生産によるコストダウン'
      },
      item2: {
        title: '限定番号',
        description: '限定番号付きのコレクション価値'
      },
      item3: {
        title: 'サポーター特典',
        description: '限定グッズ、抽選特典など'
      },
      item4: {
        title: 'ファンコミュニティ',
        description: 'サポーターコミュニティへの参加'
      }
    },

    applyButton: 'クラウドファンディングを開始'
  },

  orders: {
    title: 'カスタムオーダー一覧',
    detail: {
      title: 'カスタムオーダー詳細',
      orderInfo: '注文情報',
      orderNumber: '注文番号',
      createTime: '作成日時',
      status: '注文状態',
      category: 'カスタムカテゴリー',
      requirements: 'カスタム要件',
      progress: '進捗状況',
      designs: 'デザイン/サンプル画像',
      estimate: '価格見積もり',
      materialCost: '材料費',
      laborCost: '人件費',
      otherCost: 'その他の費用',
      totalCost: '合計費用',
      confirmEstimate: '見積もり確認',
      noEstimate: '見積もりはまだありません',
      contact: 'サポートに連絡',
      estimateConfirmed: '見積もり確認済み',
      error: {
        loadFailed: '注文情報の読み込みに失敗しました',
        confirmFailed: '見積もりの確認に失敗しました'
      }
    },
    status: {
      pending: '審査待ち',
      approved: '承認済み',
      rejected: '却下',
      deposit: '入金待ち',
      production: '製作中',
      final: '残金支払い待ち',
      shipping: '発送準備中',
      shipped: '発送済み',
      completed: '完了',
      cancelled: 'キャンセル',
      unknown: '不明な状態'
    },
    apply: {
      title: 'カスタム申請',
      formTitle: '申請情報',
      name: '申請者名',
      contact: '連絡先電話番号',
      email: 'メールアドレス',
      type: 'カスタムタイプ',
      requirements: '要件説明',
      budgetMin: '最低予算',
      budgetMax: '最高予算',
      deadline: '希望納期',
      attachments: '添付ファイル',
      remark: '備考',
      success: '���請が正常に送信されました',
      error: {
        nameRequired: '申請者名を入力してください',
        contactRequired: '連絡先を入力してください',
        emailRequired: 'メールアドレスを入力してください',
        invalidEmail: '有効なメールアドレスを入力してください',
        typeRequired: 'カスタムタイプを選択してください',
        requirementsRequired: '要件を入力してください',
        invalidBudget: '有効な予算金額を入力してください',
        budgetRange: '最高予算は最低予算より小さくすることはできません',
        submitFailed: '申請の送信に失敗しました',
        uploadFailed: 'アップロードに失敗しました。もう一度お試しください'
      },
      submit: '申請を提出',
      progress: '申請進捗',
      uploadSuccess: 'アップロード成功',
      referenceImages: '参考画像',
      uploadImages: '画像をアップロード',
      uploadAttachment: '添付ファイルをアップロード',
      additionalRequirements: 'その他の要件',
      form: {
        description: '要件の説明',
        descriptionRequired: '要件の説明を入力してください',
        type: 'カスタムタイプ',
        rewardDescriptionPlaceholder: 'リワードの詳細を説明してください...'
      }
    },
    error: {
      tooManyFiles: 'ファイルは最大6個まで添付可能です',
      fileTooLarge: 'ファイルサイズは50MBを超えることはできません',
      imageUploadFailed: '画像のアップロードに失敗しました',
      attachmentUploadFailed: '添付ファイルのアップロードに失敗しました',
      invalidAttachmentType: '対応していないファイル形式です。PDF、Word、Excel、圧縮ファイルのみ対応しています'
    },
    imageNote: 'jpg、png、gif形式対応、1枚あたり最大5MB',
    attachmentNote: 'PDF、Word、Excel、圧縮ファイル(zip/rar/7z)対応',
    fileLimitNote: '最大{maxFiles}個のファイル、1個あたり最大{maxSize}まで'
  },

  list: {
    title: 'マイカスタム申請',
    empty: 'カスタム申請はありません',
    orderNumber: '注文番号',
    filter: {
      all: '全て',
      pending: '審査待ち',
      inProgress: '進行中',
      completed: '完了'
    },
    sort: {
      latest: '新しい順',
      earliest: '古い順',
      deadline: '納期順'
    }
  },

  status: {
    pending: '審査待ち',
    approved: '承認済み',
    rejected: '却下',
    inProgress: '進行中',
    completed: '��了',
    cancelled: 'キャンセル'
  },

  type: {
    figure: 'フィギュアモデル',
    clothing: '衣装カスタム',
    accessory: 'アクセサリーカスタム',
    other: 'その他カスタム'
  },

  error: {
    invalidTargetAmount: '有効な目標金額を入力してください',
    minTargetAmount: '目標金額は1000以上である必要があります',
    invalidMinSupportAmount: '有効な最低支援金額を入力してください',
    exceedTargetAmount: '最低支援金額は目標金額を超えることはできません',
    startTimeRequired: '開始時間を選択してください',
    endTimeRequired: '終了時間を選択してください',
    invalidEndTime: '終了時間は開始時間より後である必要があります',
    rewardTitleRequired: 'リワードタイトルを入力してください',
    invalidRewardAmount: '有効なリワード金額を入力してください',
    rewardDescriptionRequired: 'リワードの説明を入力してください',
    editor: {
      uploadImage: '画像をアップロード',
      uploading: '画像をアップロード中...',
      uploadSuccess: '画像のアップロードが完了しました',
      uploadFailed: '画像のアップロードに失敗しました',
      instanceNotFound: 'エディターインスタンスが見つかりません',
      formatError: 'jpg/png/gif/webp形式のみ対応しています',
      sizeError: '画像サイズは2MBを超えることはできません',
      imageTooltip: 'jpg/png/gif/webp形式対応、1ファイルあたり最大2MB'
    }
  }
}
