<template>
  <div class="oversee-semicircle-progress">
    <canvas :id="`mountNode${id}`"></canvas>
    <div class="tip-text">
      <div class="tip-text__num">{{tipTextNum}}</div>
      <div class="tip-text__text">{{tipTextNum >= 100 ? '已完成' : '未完成'}}</div>
    </div>
  </div>
</template>

<script>
import F2 from '@antv/f2';
export default {

  name: 'oversee-semicircle-progress',
  data() {
    return {
      data : [{
        const: 'a',
        actual: this.actual,
        expect: this.expect
      }],
      tipTextNum:'',
      circleSize:100
    }
  },
  props:['id','actual','expect'],
  mounted () {
    this.getSize()
    this.initChart()
  },
  methods: {

    getSize(){
      let dom = this.$parent.$el,
        w = dom.offsetWidth
      this.circleSize = w-15
    },

    initChart () {

      let _this = this

      let _F = F2,
          Shape = _F.Shape,
          G = _F.G,
          Util = _F.Util,
          Global = _F.Global,
          Vector2 = G.Vector2;


      // 极坐标下带圆角的柱子，只对极坐标生效
      Shape.registerShape('interval', 'polar-tick', {
        draw: function draw(cfg, container) {
          let points = this.parsePoints(cfg.points);
          let style = Util.mix({
            stroke: cfg.color
          }, Global.shape.interval, cfg.style);

          let newPoints = points.slice(0);
          if (this._coord.transposed) {
            newPoints = [points[0], points[3], points[2], points[1]];
          }


          let center = cfg.center;
          let x = center.x,
            y = center.y;


          let v = [1, 0];
          let v0 = [newPoints[0].x - x, newPoints[0].y - y];
          let v1 = [newPoints[1].x - x, newPoints[1].y - y];
          let v2 = [newPoints[2].x - x, newPoints[2].y - y];

          let startAngle = Vector2.angleTo(v, v1);
          let endAngle = Vector2.angleTo(v, v2);
          let r0 = Vector2.length(v0);
          let r = Vector2.length(v1);
          // console.log("startAngle===",startAngle)
          // console.log("endAngle====",endAngle)
          if (startAngle >= 1.5 * Math.PI) {
            startAngle = startAngle - 2 * Math.PI;
          }

          if (endAngle >= 1.5 * Math.PI) {
            endAngle = endAngle - 2 * Math.PI;
          }

          let lineWidth = r - r0;
          let newRadius = r - lineWidth / 2;
          // console.log("startAngle",startAngle)
          // console.log("endAngle",endAngle)
          return container.addShape('Arc', {
            className: 'interval',
            attrs: Util.mix({
              x: x,
              y: y,
              startAngle: startAngle,
              endAngle: endAngle,
              r: newRadius,
              lineWidth: lineWidth,
              lineCap: 'round'
            }, style)
          });
        }
      });

      let chart = new F2.Chart({
        id: 'mountNode'+_this.id,
        width:_this.circleSize,
        height:_this.circleSize + 20,
        padding: [30, 0, -10],
        pixelRatio: window.devicePixelRatio
      });

      chart.source(_this.data, {
        actual: {
          max: 100,
          min: 0,
          nice: false
        }
      });

      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.8,
        startAngle: 5 * Math.PI / 6,
        endAngle: 13 * Math.PI / 6
      });

      chart.axis(false);
      chart.interval().position('const*expect').shape('polar-tick').size(8).color('#99c7fd').animate(false); // 背景条
      chart.interval().position('const*actual').shape('polar-tick').size(8).color('#2896fc').animate({
        appear: {
          duration: 1100,
          easing: 'linear',
          animation: function animation(shape, animateCfg) {
            let startAngle = shape.attr('startAngle');
            let endAngle = shape.attr('endAngle');
            if (startAngle > endAngle) {
              // -Math.PI/2 到 0
              endAngle += Math.PI * 2;
            }
            shape.attr('endAngle', startAngle);
            shape.animate().to(Util.mix({
              attrs: {
                endAngle: endAngle
              }
            }, animateCfg)).onUpdate(function(frame) {
              _this.tipTextNum = parseInt(frame * _this.actual) + '%'
            });
          }
        }
      }); // 实际进度
      /*
      chart.guide().html({
        position: ['50%', '80%'],
        html: '<div style="width: 120px;color: #fff;white-space: nowrap;text-align:center;">' + '<p style="font-size: 18px;margin:0;">本月进度</p>' + '<p id="text" style="font-size: 48px;margin:0;font-weight: bold;">0</p>' + '</div>'
      });
      */

      chart.render();
    },

  }

}


</script>


<style lang="less">
  .oversee-semicircle-progress{
    position: relative;
    display: inline-block;
    .tip-text{
      position: absolute;
      top: 15px;
      left: 0;
      width: 100%;
      font-size: @font-size-sm;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      align-content:center;
      &__num , &__text{
        text-align: center;
        display: block;
        width: 100%;
        color: @blue;
      }
      &__num {
        font-size: @font-size-xl;
        font-weight: 700;
      }
    }
  }

  /*
  canvas#mountNode {
    border-radius: 5px;
    background-color: #1890ff;
    background-image: linear-gradient(#246BFF, #2797FF);
  }
  */
</style>