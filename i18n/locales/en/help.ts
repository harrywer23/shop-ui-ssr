export default {
  title: 'Help Center',
  searchPlaceholder: 'Search FAQ...',
  categories: {
    order: 'Orders',
    customization: 'Customization',
    payment: 'Payment',
    shipping: 'Shipping',
    refund: 'Refunds & Returns',
    account: 'Account',
    returnPolicy: 'Return Policy'
  },
  wasHelpful: 'Was this answer helpful?',
  yes: 'Yes',
  no: 'No',
  feedbackThankYou: 'Thank you for your feedback!',
  feedbackSorry: 'Sorry we couldn\'t help. Please contact customer service for more assistance.',
  noResults: 'No results found',
  tryOtherKeywords: 'Try different keywords or contact customer service',
  needMoreHelp: 'Couldn\'t find an answer?',
  contactSupport: 'Contact our support team and we\'ll get back to you shortly',
  contactUs: 'Contact Us',
  faqs: {
    order: {
      howToOrder: {
        question: 'How do I place an order?',
        answer: '1. Select your desired item and click "Add to Cart" or "Buy Now"<br>2. Review items in your cart<br>3. Enter shipping address and contact information<br>4. Select payment method and complete payment<br>5. Order will be automatically generated and can be viewed in "My Orders"'
      },
      orderStatus: {
        question: 'How can I check my order status?',
        answer: 'You can check your order status by:<br>1. Login to your account and go to "My Orders"<br>2. Click on the specific order to view details<br>3. System will notify you of order status changes via SMS or email'
      },
      cancelOrder: {
        question: 'How do I cancel an order?',
        answer: 'You can cancel orders before shipping:<br>1. Go to "My Orders" page<br>2. Find the order you want to cancel<br>3. Click "Cancel Order" button<br>4. Select cancellation reason and confirm<br>Note: Orders cannot be cancelled after shipping, please request a return instead'
      },
      autoCancel: {
        question: 'Will orders be automatically cancelled?',
        answer: 'Yes, orders will be automatically cancelled or completed in these cases:<br>1. Orders will be automatically cancelled if payment is not received within 24 hours after placing the order<br>2. Orders will be automatically confirmed as received if no confirmation is made within 30 days after shipping'
      }
    },
    customization: {
      howToCustomize: {
        question: 'How do I customize a product?',
        answer: '1. Select "Customization Service" on the product page<br>2. Upload your design or enter requirements<br>3. Select customization parameters (size, material, etc.)<br>4. Submit customization request<br>5. Wait for customer service confirmation and quote<br>6. Production begins after payment confirmation'
      },
      customizationTime: {
        question: 'How long does customization take?',
        answer: 'Production time varies by product type and requirements:<br>1. Simple customization: 5-15 business days<br>2. Medium complexity: 1-2 months<br>3. Complex customization: 1-3 months<br>Specific timeline will be provided upon order confirmation'
      },
      requirements: {
        question: 'What are the customization requirements?',
        answer: '1. Design image: Resolution above 300DPI<br>2. File formats: JPG, PNG, AI, PSD supported<br>3. Content restrictions: No illegal or inappropriate content<br>4. Size requirements: Varies by product category<br>5. Material selection: Choose appropriate materials based on product type'
      }
    },
    payment: {
      methods: {
        question: 'What payment methods are accepted?',
        answer: 'We support multiple payment methods:<br>1. Online payment: Alipay, WeChat Pay, UnionPay<br>2. Credit cards: Visa, Mastercard, JCB, etc.<br>3. Balance payment: Use account balance<br>4. Installment plans: Various installment services supported'
      },
      security: {
        question: 'Is payment secure?',
        answer: 'We implement multiple security measures:<br>1. SSL encryption<br>2. Identity verification<br>3. Payment verification codes<br>4. Risk management system monitoring<br>5. Professional payment platform partnerships<br>All payment information is encrypted for your security'
      }
    },
    shipping: {
      time: {
        question: 'How long does shipping take?',
        answer: '1. In-stock items: 1-3 business days<br>2. Pre-order items: Refer to product page details<br>3. Custom items: Depends on customization complexity<br>4. International shipping: 7-15 business days<br>Shipping times may be longer during holidays'
      },
      tracking: {
        question: 'How do I track my order?',
        answer: '1. Login to your account and go to "My Orders"<br>2. Click on order details<br>3. View tracking information<br>4. Click tracking number to visit carrier\'s website<br>You can also receive shipping updates via SMS or email'
      }
    },
    refund: {
      howToRefund: {
        question: 'How do I request a refund?',
        answer: '1. Go to "My Orders" page<br>2. Select the order for refund<br>3. Click "Request Refund"<br>4. Select refund reason and upload supporting documents<br>5. Submit request and wait for review<br>6. Refund will be processed to original payment method after approval'
      },
      refundTime: {
        question: 'How long do refunds take?',
        answer: 'Refund processing timeline:<br>1. Refund will be processed within 7-20 business days after receiving the returned item<br>2. Refunds will be credited to your account balance by default, which can be used for future purchases or withdrawn<br>3. If you prefer a refund to original payment method, processing time varies:<br>- Alipay/WeChat Pay: 1-3 business days<br>- Credit cards: 3-15 business days<br>- Bank transfer: 3-7 business days<br>Final receipt time depends on financial institution processing'
      },
      conditions: {
        question: 'What are the refund conditions?',
        answer: 'Refunds are available in these cases:<br>1. Within 7 days of receipt, unused and unopened<br>2. Product quality issues<br>3. Product differs from description<br>4. Shipping deadline not met<br>5. Received wrong item<br>Note: Custom items may not be eligible for refund, please confirm before purchase'
      }
    },
    account: {
      forgotPassword: {
        question: 'Forgot password?',
        answer: 'Reset your password by following these steps:<br>1. Click "Forgot Password" on login page<br>2. Enter registered email<br>3. Get verification code<br>4. Set new password<br>5. Login with new password after reset'
      },
      security: {
        question: 'How do I keep my account secure?',
        answer: 'We recommend these security measures:<br>1. Set a strong password<br>2. Enable two-factor authentication<br>3. Change password regularly<br>4. Don\'t save login info on public devices<br>5. Monitor account notifications'
      }
    },
    returnPolicy: {
      returnWindow: {
        question: 'What is the return window?',
        answer: 'Returns are accepted within 7 days after receiving the item. Please note:<br>1. We only accept returns for new and unused items<br>2. Some items must remain in original unopened packaging<br>3. Customized items, food, and personal care products cannot be returned<br>4. Customized items include but are not limited to: personalized items, size customization, material customization, etc.<br>5. Please carefully confirm before purchasing customized items as they cannot be returned once ordered'
      },
      returnShipping: {
        question: 'Who pays for return shipping?',
        answer: 'The seller covers return shipping costs. We will provide a return shipping label, you just need to follow the return process.<br><br>Default Return Address:<br>Building 31, Unit 301, Area 41, An Le Village, Xin\'an Street, Bao\'an District, Shenzhen，China'
      },
      returnProcess: {
        question: 'How do I return an item?',
        answer: '1. Log into your account and go to "My Orders"<br>2. Select the order you want to return<br>3. Click "Request Return"<br>4. Fill in return reason and item condition<br>5. Get return address and shipping label<br>6. Ship the item<br>7. Wait for refund processing (up to 30 days)'
      },
      supportedCountries: {
        question: 'Which countries support returns?',
        answer: 'We support returns from the following countries and regions:<br>Denmark, Russia, Canada, Hungary, Taiwan, Austria, Panama, Greece, Germany, Italy, Norway, Singapore, Japan, Chile, Belgium, France, Poland, Ireland, Sweden, Switzerland, USA, Finland, UK, Netherlands, Portugal, Spain, South Korea, Hong Kong'
      },
      exchangePolicy: {
        question: 'Do you support exchanges?',
        answer: 'Sorry, we currently do not support product exchanges. If you receive an item with issues, you can:<br>1. Request a return and refund<br>2. Place a new order after the return is processed'
      }
    }
  }
} 