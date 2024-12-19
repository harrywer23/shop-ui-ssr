import { defineStore } from 'pinia'
import { ref } from 'vue'

interface CartItem {
  prodId: string | number
  skuId?: string | number
  prodName: string
  skuName?: string
  deliveryTemplateId: number
  price: number
  oriPrice: number
  pic: string
  quantity: number
  basketCount: number
  prodType: number
  presellStatus?: number
  presellPrice?: number
  presellDeposit?: number
  groupPrice?: number
  groupMinNum?: number
  seckillPrice?: number
  isVirtual: number
  isSkuItem: number
  weight?: number
  volume?: number
  translations?: any
  from: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function addDirectBuyItem(item: CartItem) {
    console.log("添加到缓存：", item)
    items.value = items.value.filter(i => i.from !== 'direct')
    items.value.push(item)
  }

  function clearDirectBuyItems() {
    items.value = items.value.filter(item => item.from !== 'direct')
  }

  function getCartItems(): CartItem[] {
    return items.value
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    addDirectBuyItem,
    clearDirectBuyItems,
    getCartItems,
    clearCart
  }
}, {
  persist: process.client ? {
    key: 'cart-storage',
    storage: localStorage
  } : false
})

// 添加热更新支持
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
