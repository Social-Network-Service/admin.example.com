import {useEffect} from "react";
import {Game} from "./Game";
import './index.scss'

export default () => {
  useEffect(() => {
    const template = `
    <div id="app" class="layout">
      <div class="left">
        <ul>
          <li v-for="music,index in music_list" @click="onClickMusic(music)">
            <span>{{index+1}} {{music.name}}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <canvas id="canvas"></canvas>
      </div>
    </div>`

    let game = null;
    let app = null;
    app = new Vue({
      el: '#app',
      template,
      data: {
        music_list: [
          {name: '采样练习3(无音乐)', url: 'allenvee - 采样练习3.mp3'},
          {name: 'Coral Sea (Chillout Mix)(无音乐)', url: 'Black Pearl - Coral Sea (Chillout Mix).mp3'},
          {name: '点击音乐', url: 'btn.mp3'},
          {name: '背景音乐1', url: 'trump_day1_bg.mp3'},
          {name: '背景音乐2', url: 'trump_day2_bg.mp3'},
        ]
      },
      mounted() {
        const width = $('.right').width();
        const height = $('.right').height();
        game = this.game = new Game({
          view: document.getElementById('canvas'),
          width,
          height,
          backgroundColor: 0x1099bb
        })
      },
      methods: {
        onClickMusic(music) {
          // 创建音频上下文
          const audCtx = new AudioContext()

          const audioEle = document.createElement('audio');
          audioEle.onloadedmetadata = function () {
            // 输出音频的元数据
            console.log('音频标题:', audioEle.title);
            console.log('音频艺术家:', audioEle.artist);
            console.log('音频专辑:', audioEle.album);
            console.log('音频时长(秒):', audioEle.duration.toFixed(2));
          };
          audioEle.onplay = () => {
            const sourceNode = audCtx.createMediaElementSource(audioEle)

            const analyserNode = audCtx.createAnalyser()
            analyserNode.fftSize = 256;
            sourceNode.connect(analyserNode)

            analyserNode.connect(audCtx.destination)

            const render = () => {
              const bufferLength = analyserNode.frequencyBinCount;
              const dataArray = new Uint8Array(bufferLength)
              analyserNode.getByteFrequencyData(dataArray)
              // console.log(dataArray)

              this.game.dataArray = dataArray;

              requestAnimationFrame(render)
            }

            render()
          }
          audioEle.onended = () => {

          }
          audioEle.onerror = (error) => {
            console.log(error);
          }
          audioEle.preload = true;
          audioEle.src = `/sound/${music.url}`
          audioEle.play();
        }
      }
    })

    return () => {
      if (game)
        game.destroy();

      if (app) {
        app.$destroy();
        app.$el.innerHTML = '';
        app = null;
      }
    }
  }, [])

  return (
    <div className="audio-visualization-page">
      <div id='app'></div>
    </div>

  )
}