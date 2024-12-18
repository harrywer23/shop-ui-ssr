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
    // ... existing translations ...
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
  }
} 