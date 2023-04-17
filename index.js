const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
//tag
const heading = $('header h2');
//class
const cdImg = $('.cd-thumb');
//id
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const playlist = $('.playlist')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const PLAYER_STORAGE_KEY = 'MaxPro Player'

const app = {
    currentIndex: 0,
    isRepeat: false,
    isRandom: false,
    isPlaying: false,

    configs: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Anh nhớ ra',
            singer: 'Vũ, Trang',
            path: './Song/AnhNhoRaFeatTrang-Vu-8279183.mp3',
            img: './Img/download.jpg',
        },
    
        {
            name: 'Cupid',
            singer: 'Fifty Fifty',
            path: './Song/Cupid - FIFTY FIFTY.mp3',
            img: 'Img/fifty-fifty-022723-1-scaled.jpg',
        },
    
        {
            name: 'Gone',
            singer: 'Rose',
            path: './Song/Gone - Rosé (BlackPink).mp3',
            img: './Img/1615526283085.jpg',
        },

        {
            name: 'Hình Trái Tim',
            singer: 'Thắng, Vũ Thanh Vân',
            path: 'Song/Hình Trái Tim.mp3',
            img: 'Img/1668715703983_640.jpg',
        },

        {
            name: 'Chuyện những người yêu xa',
            singer: 'Vũ',
            path: 'Song/TaiNhacHay.Biz - Chuyện Những Người Yêu Xa.mp3',
            img: 'Img/1676527903905_640.jpg'
        },
    ],

    setconfigs: function (key, value) {
        this.configs[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.configs))
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        
       playlist.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty (this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function() {

        //Xu ly CD quay
        const cdImgAni = cdImg.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000, // 10s
            iterations: Infinity,
        })
        cdImgAni.pause()

        const cdWidth = cd.offsetWidth

        // Xu ly phong to thu nho CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }

        //Xu ly khi click play
        playBtn.onclick = function() {
            if (app.isPlaying === false) {
                audio.play();
                cdImgAni.play();
            } else {
                audio.pause();
                cdImgAni.pause();
            }


          // khi dang play 
          audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing')
          }

          //khi dang pause
          audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing')
          }
        }

        //Xu ly thanh chay
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const songProgress = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = songProgress;
            }
        }

        //Xu ly tua
       progress.onchange = function(e) {
        const tua = e.target.value / 100 * audio.duration;
        audio.currentTime = tua;
       }

       //Xu ly bai tiep theo
       nextBtn.onclick = function() {
        if (app.isRandom == true) {
            app.randomSong()
        } else {
            app.nextSong();
        }
        audio.play();
        app.render();
        app.scrollToView()
       }

       //Xu ly bai truoc do
       preBtn.onclick = function() {
        if (app.isRandom == true) {
            app.randomSong()
        } else {
            app.preSong();
        }
        audio.play();
        app.render();
        app.scrollToView();
       }

       //Xu ly random song
       randomBtn.onclick = function() {
        app.isRandom = !app.isRandom;
        app.setconfigs('isRandom', app.isRandom)
        randomBtn.classList.toggle('active', app.isRandom)
       }

       //Xu ly khi repeat
       repeatBtn.onclick = function() {
        app.isRepeat = !app.isRepeat;
        app.setconfigs('isRepeat', app.isRepeat)
        repeatBtn.classList.toggle('active', app.isRepeat)
       }

        //Xu ly khi audio end
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

         //Lang nghe hanh vi click vao playlist
         playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                // Xu ly khi click vao song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
                if (e.target.closet('.option')) {

                }
            }
        }
    },

    scrollToView: function() {
        setTimeout(function() {
            $('.song.active').scrollIntoView({
                behavior: "smooth",
                block: "end",
                incline: "nearest",
                
            })
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdImg.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path;
    },

    loadConfig: function() {
        this.isRandom = this.configs.isRandom;
        this.isRepeat = this.configs.isRepeat;
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    preSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },

    randomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex) 
        // newIndex = currentIndex thì chạy tiếp còn ko thì dừng

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    

    start: function() {
        this.loadConfig();

        //Dinh nghia cac thuoc tinh
        this.defineProperties();

        //Xu ly cac su kien
        this.handleEvent();

        //Tai thong tin bai hat dau tien
        this.loadCurrentSong();

        //Render playlist
        this.render()

        randomBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle('active', app.isRepeat);
    }
}

app.start()
