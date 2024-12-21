export default {
  orders: {
    title: 'Custom Orders',
    detail: {
      title: 'Custom Order Details',
      orderInfo: 'Order Information',
      orderNumber: 'Order Number',
      createTime: 'Create Time',
      status: 'Order Status',
      category: 'Custom Category',
      requirements: 'Custom Requirements',
      progress: 'Progress Tracking',
      designs: 'Design/Sample Images',
      estimate: 'Price Estimate',
      materialCost: 'Material Cost',
      laborCost: 'Labor Cost',
      otherCost: 'Other Costs',
      totalCost: 'Total Cost',
      confirmEstimate: 'Confirm Estimate',
      noEstimate: 'No Price Estimate Yet',
      contact: 'Contact Support',
      estimateConfirmed: 'Estimate Confirmed',
      error: {
        loadFailed: 'Failed to load order information',
        confirmFailed: 'Failed to confirm estimate'
      }
    },
    status: {
      pending: 'Pending Review',
      approved: 'Approved',
      rejected: 'Rejected',
      deposit: 'Awaiting Deposit',
      production: 'In Production',
      final: 'Awaiting Final Payment',
      shipping: 'Ready to Ship',
      shipped: 'Shipped',
      completed: 'Completed',
      cancelled: 'Cancelled',
      unknown: 'Unknown Status'
    },
    apply: {
      form: {
        applicationType: 'Application Type',
        personalApplication: 'Personal Application',
        crowdfundingApplication: 'Crowdfunding Application',
        targetAmount: 'Target Amount',
        minSupportAmount: 'Minimum Support Amount',
        startTime: 'Start Time',
        endTime: 'End Time',
        rewards: 'Reward Settings',
        rewardTitle: 'Reward Title',
        rewardAmount: 'Reward Amount',
        rewardDescription: 'Reward Description',
        addReward: 'Add Reward',
        title: 'Application Title',
        titleRequired: 'Please enter application title'
      },
      name: 'Applicant Name',
      contact: 'Contact Phone',
      email: 'Email Address',
      error: {
        nameRequired: 'Please enter applicant name',
        contactRequired: 'Please enter contact information',
        emailRequired: 'Please enter email address',
        invalidEmail: 'Please enter a valid email address'
      }
    },
    error: {
      tooManyFiles: 'Maximum 6 files allowed',
      fileTooLarge: 'File size cannot exceed 50MB',
      imageUploadFailed: 'Image upload failed',
      attachmentUploadFailed: 'Attachment upload failed',
      invalidAttachmentType: 'Unsupported file format. Only PDF, Word, Excel and compressed files are supported'
    },
    imageNote: 'Supports jpg, png, gif formats, maximum 5MB per image',
    attachmentNote: 'Supports PDF, Word, Excel and compressed files (zip/rar/7z)',
    fileLimitNote: 'Maximum {maxFiles} files, up to {maxSize} per file'
  },
  title: 'Anime Merchandise Customization',
  subtitle: 'Turn your ideas into reality, create unique collectibles',

  personal: {
    title: 'Personal Customization',
    subtitle: 'One-on-one exclusive service for unique creations',
    startingPrice: 'Starting from: ¥3,000',
    deposit: 'Deposit: 30%-50%',

    scenarios: {
      title: 'Suitable Scenarios',
      scenario1: 'Seeking uniqueness, wanting one-of-a-kind collectibles',
      scenario2: 'Having clear creative ideas and customization needs',
      scenario3: 'Valuing quality, willing to pay for exclusive service',
      scenario4: 'Needing faster production cycle'
    },

    steps: {
      title: 'Service Process',
      step1: {
        title: 'Submit Application',
        time: 'Day 1',
        content: 'Fill in detailed customization requirements, upload reference images'
      },
      step2: {
        title: 'Requirements Discussion',
        time: 'Day 2-3',
        content: 'One-on-one communication with dedicated customer service'
      },
      step3: {
        title: 'Plan Development',
        time: 'Day 4-7',
        content: 'Designer creates exclusive plan and renderings'
      },
      step4: {
        title: 'Deposit Payment',
        time: 'Day 8',
        content: 'Pay 30%-50% deposit after confirming the plan'
      },
      step5: {
        title: 'Start Production',
        time: 'Day 9-38',
        content: 'Craftsmen begin production with regular progress updates'
      },
      step6: {
        title: 'Complete Shipping',
        time: 'Day 39-40',
        content: 'Confirm final product and ship after final payment'
      }
    },

    privileges: {
      title: 'Exclusive Privileges',
      privilege1: {
        title: 'Exclusive Design',
        description: 'One-on-one communication, designed exactly to your ideas'
      },
      privilege2: {
        title: 'Copyright Protection',
        description: 'Exclusive copyright, ensuring unique pieces'
      },
      privilege3: {
        title: 'Priority Production',
        description: 'Priority scheduling, faster production cycle'
      },
      privilege4: {
        title: 'Dedicated Service',
        description: 'Personal customer service throughout the process'
      }
    },

    applyButton: 'Apply for Personal Custom'
  },

  list: {
    title: 'My Custom Applications',
    empty: 'No custom applications yet',
    orderNumber: 'Order Number',
    filter: {
      all: 'All',
      pending: 'Pending Review',
      inProgress: 'In Progress',
      completed: 'Completed'
    },
    sort: {
      latest: 'Latest Created',
      earliest: 'Earliest Created',
      deadline: 'Delivery Time'
    }
  },

  status: {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  },

  type: {
    figure: 'Figure Model',
    clothing: 'Clothing Custom',
    accessory: 'Accessory Custom',
    other: 'Other Custom'
  },

  crowdfunding: {
    title: 'Crowdfunding Customization',
    subtitle: 'Unite together to make dreams come true',
    estimatedPrice: 'Estimated Price: ¥299-999',
    minQuantity: 'Minimum Quantity: 100 pieces',

    scenarios: {
      title: 'Suitable Scenarios',
      scenario1: 'Collective demands for popular IP merchandise',
      scenario2: 'Looking for more affordable customization prices',
      scenario3: 'Willing to wait for longer production cycles',
      scenario4: 'Want to participate in collective crowdfunding'
    },

    steps: {
      title: 'Crowdfunding Process',
      step1: {
        title: 'Submit Crowdfunding',
        time: 'Day 1',
        content: 'Submit crowdfunding application and initial plan'
      },
      step2: {
        title: 'Plan Evaluation',
        time: 'Day 2-5',
        content: 'Evaluate feasibility and develop crowdfunding plan'
      },
      step3: {
        title: 'Start Pre-order',
        time: 'Day 6-35',
        content: 'Launch crowdfunding and accept supporter pre-orders'
      },
      step4: {
        title: 'Reach Goal',
        time: 'Day 36',
        content: 'Reach target quantity and confirm production plan'
      },
      step5: {
        title: 'Mass Production',
        time: 'Day 37-96',
        content: 'Factory starts mass production of custom items'
      },
      step6: {
        title: 'Batch Shipping',
        time: 'Day 97-100',
        content: 'Complete production and ship in batches to supporters'
      }
    },

    privileges: {
      title: 'Supporter Benefits',
      item1: {
        title: 'Discounted Price',
        description: 'Enjoy better prices through batch production'
      },
      item2: {
        title: 'Numbered Edition',
        description: 'Limited numbered editions with collection value'
      },
      item3: {
        title: 'Supporter Perks',
        description: 'Exclusive merchandise and lucky draw benefits'
      },
      item4: {
        title: 'Fan Community',
        description: 'Join supporter community to share joy'
      }
    },

    applyButton: 'Start Crowdfunding'
  },

  cases: {
    title: 'Success Cases',
    items: [
      {
        title: 'Genshin Impact - Keqing Figure',
        name: 'Personal Custom Version',
        type: 'Figure Model',
        customType: 'personal',
        description: 'Perfect recreation of in-game details, unique pose design'
      },
      {
        title: 'Demon Slayer Series',
        name: 'Crowdfunding Limited Edition',
        type: 'Figure Set',
        customType: 'crowdfunding',
        description: 'Limited 500 sets numbered edition, crowdfunding special price'
      },
      {
        title: 'One Piece - Luffy',
        name: 'Personal Custom Version',
        type: 'Scene Figure',
        customType: 'personal',
        description: 'Special scene recreation, exclusive collection version'
      }
    ]
  },

  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What are the main differences between personal and crowdfunding customization?',
        answer: 'Personal customization provides one-on-one exclusive service, completely customized to individual needs, higher price but more unique; crowdfunding customization reduces costs through collective purchasing, more affordable, but requires reaching minimum crowdfunding quantity.'
      },
      {
        question: 'How long does the customization cycle take?',
        answer: 'Personal customization usually takes 30-40 days, while crowdfunding customization typically takes 90-100 days due to crowdfunding period and mass production. Specific timing will be explained in the preliminary plan.'
      },
      {
        question: 'What is the deposit ratio?',
        answer: 'Personal customization requires a 30%-50% deposit, specific ratio depends on customization difficulty and materials; crowdfunding requires full payment, but will be fully refunded if crowdfunding fails.'
      },
      {
        question: 'Can the customization plan be modified?',
        answer: 'Personal customization can be modified multiple times before confirming the plan; crowdfunding customization is difficult to modify significantly once confirmed due to multiple participants, but suggestions can be made before crowdfunding starts.'
      }
    ]
  },

  apply: {
    title: 'Custom Application',
    formTitle: 'Application Information',
    name: 'Applicant Name',
    contact: 'Contact Phone',
    email: 'Email Address',
    type: 'Custom Type',
    requirements: 'Requirements Description',
    budgetMin: 'Minimum Budget',
    budgetMax: 'Maximum Budget',
    deadline: 'Expected Delivery Date',
    attachments: 'Attachments',
    remark: 'Remarks',
    success: 'Application Submitted Successfully',
    error: {
      nameRequired: 'Please enter applicant name',
      contactRequired: 'Please enter contact information',
      emailRequired: 'Please enter email address',
      invalidEmail: 'Please enter a valid email address',
      typeRequired: 'Please select custom type',
      requirementsRequired: 'Please enter requirements description',
      invalidBudget: 'Please enter valid budget amount',
      budgetRange: 'Maximum budget cannot be less than minimum budget',
      submitFailed: 'Failed to submit application',
      uploadFailed: 'Upload failed, please try again'
    },
    submit: 'Submit Application',
    progress: 'Application Progress',
    uploadSuccess: 'Upload Successful',
    referenceImages: 'Reference Images',
    uploadImages: 'Upload Images',
    uploadAttachment: 'Upload Attachments',
    additionalRequirements: 'Additional Requirements',
    form: {
      description: 'Requirements Description',
      descriptionRequired: 'Please enter requirements description',
      type: 'Custom Type',
      rewardDescriptionPlaceholder: 'Please describe the reward details...'
    }
  },

  error: {
    invalidTargetAmount: 'Please enter valid target amount',
    minTargetAmount: 'Target amount cannot be less than 1000',
    invalidMinSupportAmount: 'Please enter valid minimum support amount',
    exceedTargetAmount: 'Minimum support amount cannot exceed target amount',
    startTimeRequired: 'Please select start time',
    endTimeRequired: 'Please select end time',
    invalidEndTime: 'End time must be later than start time',
    rewardTitleRequired: 'Please enter reward title',
    invalidRewardAmount: 'Please enter valid reward amount',
    rewardDescriptionRequired: 'Please enter reward description',
    editor: {
      uploadImage: 'Upload Image',
      uploading: 'Uploading image...',
      uploadSuccess: 'Image uploaded successfully',
      uploadFailed: 'Failed to upload image',
      instanceNotFound: 'Editor instance not found',
      formatError: 'Only jpg/png/gif/webp formats are supported',
      sizeError: 'Image size cannot exceed 2MB',
      imageTooltip: 'Supports jpg/png/gif/webp formats, max 2MB per file'
    }
  }
}
