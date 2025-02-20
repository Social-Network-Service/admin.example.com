export class Game extends PIXI.Application {
  constructor(config) {
    super(config)
    this.init();
  }

  async init() {
    const bars = Array.apply(null, {length: 128}).map((value, index) => {
      const react = new PIXI.Graphics()
      react.x = index * (5 + 2);
      react.y = 200;
      this.stage.addChild(react)
      return react;
    });
    const bars2 = Array.apply(null, {length: 128}).map((value, index) => {
      const react = new PIXI.Graphics()
      react.x = index * (5 + 2);
      react.y = 200;
      this.stage.addChild(react)
      return react;
    });
    const line = new PIXI.Graphics()
    line.y = 300
    this.stage.addChild(line)

    const circle = new PIXI.Graphics()
    circle.x = 150
    circle.y = 450
    this.stage.addChild(circle)

    var bufferLength = 256 / 2;
    var angle_step = 540 / bufferLength;
    var filter = new PIXI.filters.GlowFilter({distance: 15, outerStrength: 2, color: 0xffffff})

    // var angle_step = 360 / 256;
    var lines = Array.apply(null, {length: bufferLength}).map((value, index) => {
      var angle = (angle_step * index) - 180
      const react = new PIXI.Graphics()
      react.x = 500;
      react.y = 450;
      // 度数 * (π / 180） = 弧度
      // 弧度 * (180 / π） = 度数
      // react.rotation = angle * (Math.PI / 180);
      react.angle = angle;
      react.filters = [filter];
      this.stage.addChild(react)
      return react;
    })

    this.ticker.add(() => {
      if (!this.dataArray || !this.dataArray.length)
        return

      circle.rotation += 0.005;

      line.clear();
      line.lineStyle(4, 0xffd900, 1);

      circle.clear();
      circle.lineStyle({
        width: 4,
        color: 0xb13aa6,
        // cap: 'ROUND',
        // join:'bevel',
        // join:'miter',
        join: 'round',
      });

      let dataArray = this.dataArray;

      for (let i = 0; i < bufferLength; i++) {
        const data = dataArray[i]
        // 最小值100，加上 0-150之间的值。
        const value = 100 + (data / 255 * 150)
        var angle = angle_step * i;
        var x = (value * Math.cos(angle * Math.PI / 180))
        var y = (value * Math.sin(angle * Math.PI / 180))

        if (i === 0) {
          circle.moveTo(x, y);
        } else {
          circle.lineTo(x, y);
        }

        let line = lines[i];
        if (line) {
          line.clear();
          line.beginFill(0x87ebfc)
          line.drawRect(0, 50, 4, (data / 255 * 250))
          line.endFill()
        }
      }
      circle.closePath()

      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        const bar2 = bars2[i];
        const data = dataArray[i]
        const barHeight = (data / 255 * 50)

        const red = 250 * (i / bufferLength);
        const green = 0;
        const blue = barHeight + (2 * (i / bufferLength));
        // console.log({red, green, blue})

        bar.clear();
        // bar.beginFill(`rgb(${parseInt(red)}, ${parseInt(green)}, ${parseInt(blue)})`)
        // bar.beginFill(`rgb(255, 255, 0)`)
        bar.beginFill(0x87ebfc)
        bar.drawRect(0, -barHeight, 5, barHeight)
        bar.endFill()

        bar2.clear();
        bar2.beginFill(0x87ebfc, 0.3)
        bar2.drawRect(0, 0, 5, barHeight)
        bar2.endFill()

        if (i === 0) {
          line.moveTo(i * 5, -barHeight);
        } else {
          line.lineTo(i * 5, -barHeight);
        }
      }
    })
  }

  set dataArray(val) {
    this._dataArray = val
  }

  get dataArray() {
    return this._dataArray;
  }
}
