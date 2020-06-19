import dayjs from 'dayjs'
export default {
  methods: {
    // 格式化时间选择组件展示信息
    formatter (type, value) {
      switch (type) {
        case 'year': return value + '年'
        case 'month': return value + '月'
        case 'day': return value + '日'
        case 'hour': return value + '时'
        case 'minute': return value + '分'
        case 'second': return value + '秒'
        default: return value
      }
    },
    // 格式化分钟间隔为 5
    filterMinute5 (type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0)
      }
      return options
    },
    //时间戳转时间
    timestamp2time(timeStamp){
      if(timeStamp != ''){
        return dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
      }
    },

    /**
     * 根据开始和结束的时间戳，拼接成页面需要的时间字符串
     * @param start 开始时间戳
     * @param end 结束时间戳
     * @returns {string} 在页面显示的字符串 开始结束为同一天，则只显示一次日期。若不是同一天，则完整显示
     */
    jointTime(time){

      let str =''
      if(typeof(time) != 'undefined' && typeof(time) != 'string' && time !== null){
        time.forEach(function ( value , index ) {
          let suffix = ''
          if(index != time.length-1){
            suffix = ', '
          }else{
            suffix = ''
          }

          if(value.beginTime != '' && value.endTime != ''){
            let startObj = dayjs(value.beginTime),
              endObj = dayjs(value.endTime)

            if(startObj.year() == endObj.year() && startObj.month() == endObj.month() && startObj.date() == endObj.date()){
              str += startObj.format("YYYY-MM-DD") +' '+ startObj.format("HH:mm") +'-'+ endObj.format("HH:mm") + suffix
            }else{
              str += startObj.format("YYYY-MM-DD HH:mm") +' -- '+ endObj.format("YYYY-MM-DD HH:mm") + suffix
            }
          }

        })
      }

      return str
    },
    /*
    jointTime(start,end){
      let str =''

      if(start != '' && end != ''){
        let startObj = dayjs(start),
          endObj = dayjs(end)
        if(startObj.year() == endObj.year() && startObj.month() == endObj.month() && startObj.date() == endObj.date()){
          str = dayjs(start).format("YYYY-MM-DD") +' '+ dayjs(start).format("HH:mm") +'-'+ dayjs(end).format("HH:mm")
        }else{
          str = dayjs(start).format("YYYY-MM-DD HH:mm") +' -- '+ dayjs(end).format("YYYY-MM-DD HH:mm")
        }
      }

      return str
    },
    */

  }
}