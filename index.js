const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    currentIndex: 0,
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
        {

        },

        {

        },

        {
            
        },

        {

        },
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
        
       $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty (this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function() {
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }
    },

    loadCurrentSong: function() {

    },

    start: function() {
        //Dinh nghia cac thuoc tinh
        this.defineProperties();

        //Xu ly cac su kien
        this.handleEvent();

        this.loadCurrentSong();

        //Render playlist
        this.render()
    }
}

app.start()
