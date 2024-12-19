import { defineStore } from 'pinia'
import { ref } from 'vue'

interface OrderItem {
  orderId: number
  orderNumber: string
  kind: number
  prodName: string
  isPayed: number
  amount: number
}

interface CheckoutInfo {
  items: OrderItem[]
  amount: number
  orderNumbers: string
  isPayed: number
}

export const useCheckoutStore = defineStore('checkout', () => {
  // 存储结账信息
  const checkoutInfo = ref<CheckoutInfo | null>(null)

  // 设置结账信息
  function setCheckoutInfo(info: CheckoutInfo) {
    checkoutInfo.value = {
      items: info.items.map(item => ({
        orderId: item.orderId || 0,
        orderNumber: item.orderNumber || '',
        kind: item.kind || 0,
        prodName: item.prodName || '',
        isPayed: item.isPayed || 0,
        amount: item.amount || 0
      })),
      amount: info.amount || 0,
      orderNumbers: info.orderNumbers || '',
      isPayed: info.isPayed || 0
    }
  }

  // 获取结账信息
  function getCheckoutInfo(): CheckoutInfo | null {
    return checkoutInfo.value
  }

  // 清空结账信息
  function clearCheckoutInfo() {
    checkoutInfo.value = null
  }

  return {
    checkoutInfo,
    setCheckoutInfo,
    getCheckoutInfo,
    clearCheckoutInfo
  }
}, {
  persist: process.client ? {
    key: 'checkout-storage',
    storage: localStorage,
    paths: ['checkoutInfo']
  } : false
})
