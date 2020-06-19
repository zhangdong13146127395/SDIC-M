export default {
  methods: {
    // 冒泡排序
    bubbleSort (arr, key) {
      let len = arr.length
      for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (key) {
            if (arr[j][key] > arr[j + 1][key]) {
              let temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
            }
          } else {
            if (arr[j] > arr[j + 1]) {
              let temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
            }
          }
        }
      }
      return arr
    }
  }
}