// 地区选项接口
export interface AreaOption {
  value: string | number
  label: string
  children?: AreaOption[]
}
