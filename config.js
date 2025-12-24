/**
 * LOVE CONFESSION WEBSITE - CONFIGURATION
 * ========================================
 * Chỉnh sửa các giá trị bên dưới để cá nhân hóa website của bạn
 */

const CONFIG = {
    // ===== TRANG 1: INTRO =====
    introTitle: 'Xin chào em...',
    introDesc: `Trái đất vốn lạ thường
Mà sao em cứ đi nhầm đường
Lạc vào tim anh lẻ loi
Đằng sau chữ yêu đây là thương`,
    btnIntro: 'Tiếp tục',

    // ===== TRANG 2: TIMELINE =====
    // Thêm các milestone của 2 người tại đây
    // Đặt ảnh vào thư mục img/ và thay đổi đường dẫn image
    timeline: [
        {
            icon: '💫',
            date: 'Ngày đầu tiên',
            title: 'Lần đầu gặp nhau',
            image: 'img/z7358483214722_f55bfea9177477d54e92372273b24a1e.jpg',
            description: 'Khoảnh khắc mà trái tim anh bắt đầu rung động...'
        },
        {
            icon: '💬',
            date: 'Những ngày sau đó',
            title: 'Những cuộc trò chuyện',
            image: 'img/z7358483219029_6179d585d4d50df1a84c4505aae5a36c.jpg',
            description: 'Mỗi tin nhắn, mỗi cuộc gọi đều làm anh thêm nhớ em...'
        },
        {
            icon: '☕',
            date: 'Kỷ niệm đẹp',
            title: 'Những lần hẹn hò',
            image: 'img/z7358483223541_9207ef3cefcbd0dbe919f0cac437c51e.jpg',
            description: 'Bên em, thời gian như ngừng trôi...'
        },
        {
            icon: '💕',
            date: 'Hôm nay',
            title: 'Khoảnh khắc này',
            image: 'img/z7358483225205_f5087cd7371c5d69d2b23cfe31c53808.jpg',
            description: 'Anh muốn nói với em điều quan trọng...'
        }
    ],

    // ===== TRANG 3: GALLERY =====
    // 12 ảnh từ thư mục img/
    gallery: [
        {
            src: 'img/z7358483214722_f55bfea9177477d54e92372273b24a1e.jpg',
            caption: 'Kỷ niệm đầu tiên 💕'
        },
        {
            src: 'img/z7358483219029_6179d585d4d50df1a84c4505aae5a36c.jpg',
            caption: 'Bên nhau mãi mãi 💗'
        },
        {
            src: 'img/z7358483223541_9207ef3cefcbd0dbe919f0cac437c51e.jpg',
            caption: 'Những nụ cười 😊'
        },
        {
            src: 'img/z7358483225205_f5087cd7371c5d69d2b23cfe31c53808.jpg',
            caption: 'Hạnh phúc bên em 🥰'
        },
        {
            src: 'img/z7358483228862_625e3f3a461cf448bdf5ef5c7936d399.jpg',
            caption: 'Khoảnh khắc ngọt ngào 💖'
        },
        {
            src: 'img/z7358483228990_1df803015d80a1d452235be1e896048f.jpg',
            caption: 'Yêu em nhiều lắm 💝'
        },
        {
            src: 'img/z7358483231625_5a673dfbef2c2a02f3b37307052692c2.jpg',
            caption: 'Những phút giây bên em 💞'
        },
        {
            src: 'img/z7358486973044_95059a4f53e73deddafa9174075c35b2.jpg',
            caption: 'Nụ cười của em 😊'
        },
        {
            src: 'img/z7358486974154_599a02f7be63a75c6fc9255544e8a829.jpg',
            caption: 'Khoảnh khắc hạnh phúc 🌸'
        },
        {
            src: 'img/z7358486977164_450d19e40493331bba3b53128cd315a7.jpg',
            caption: 'Yêu em từng ngày 💓'
        },
        {
            src: 'img/z7358486977728_576d85cc9456463ad660f754267f5cdb.jpg',
            caption: 'Những giấc mơ chung 🌙'
        },
        {
            src: 'img/z7358486981879_e800c9e489ddf22593c412a5aaf883ad.jpg',
            caption: 'Mãi mãi bên em 💕'
        }
    ],

    // ===== TRANG 4: CONFESSION =====
    title: 'Phải chăng em đã yêu ngay từ cái nhìn đầu tiên 😙',
    desc: 'Phải chăng em đã say ngay từ lúc thấy nụ cười ấy',
    question: 'Em có muốn làm người yêu của anh không? 💕',
    btnYes: 'Có! Em đồng ý 💕',
    btnNo: 'Để em suy nghĩ... 🤔',
    btnReply: 'Gửi cho anh <3',
    reply: 'Yêu thì yêu mà không yêu thì yêu <33333333',

    // ===== TRANG 5: FINAL MESSAGE =====
    mess: 'Anh biết mà! 🥰',
    messDesc: 'Tối nay 7h anh qua đón nhé, công chúa của anh 👑',
    btnAccept: 'Okiiiii lun <3',
    
    // Link messenger của bạn (thay bằng link thật)
    // VD: https://m.me/username hoặc https://zalo.me/phone
    messLink: 'http://fb.com',

    // ===== COUPLE GALLERY: Ảnh song song =====
    // 6 ảnh couple với hiệu ứng side-by-side
    coupleGallery: [
        {
            left: 'img/couple/a.1.jpg',
            right: 'img/couple/a.2.jpg',
            caption: 'Khoảnh khắc bên nhau 💕'
        },
        {
            left: 'img/couple/b.1.jpg',
            right: 'img/couple/b.2.jpg',
            caption: 'Cùng nhau mỗi ngày 💗'
        },
        {
            left: 'img/couple/c.1.jpg',
            right: 'img/couple/c.2.jpg',
            caption: 'Hạnh phúc song hành 💞'
        }
    ],

    // ===== TRANG 6: LOVE SCENE (Chat → Love Letter) =====
    // Có thể tùy chỉnh tin nhắn và nội dung thư tình
    loveScene: {
        // Tin nhắn trong chat panel
        // type: 'sent' = anh gửi (bên phải), 'received' = em (bên trái)
        messages: [
            { type: 'sent', text: 'Em ơi...' },
            { type: 'received', text: 'Gì vậy anh?' },
            { type: 'sent', text: 'Anh có điều muốn nói với em...' },
            { type: 'received', text: 'Nói đi anh 😊' },
            { type: 'sent', text: 'Từ lần đầu gặp em, anh đã biết em là người đặc biệt' },
            { type: 'sent', text: 'Mỗi ngày trôi qua, cảm xúc ấy càng lớn hơn...' },
            { type: 'received', text: '...' },
            { type: 'sent', text: 'Em khiến anh muốn trở thành người tốt hơn 💕' },
            { type: 'sent', text: 'Anh không giỏi nói lời hoa mỹ...' },
            { type: 'sent', text: 'Nhưng anh muốn em biết rằng...' },
            { type: 'sent', text: 'Trái tim anh, từ lâu đã thuộc về em rồi 💝' },
            { type: 'received', text: 'Anh... 🥺💕' }
        ],
        
        // Nội dung thư tình (hiện sau khi chat xong)
        loveLetter: [
            'Em yêu của anh,',
            '',
            'Có những điều anh muốn nói, nhưng lời nói thật khó diễn tả được hết tâm tư này...',
            '',
            'Từ lần đầu gặp em, ánh mắt của em đã làm anh nhận ra rằng,',
            'Có một người đã khiến trái tim anh rung động theo một cách mà anh chưa từng biết.',
            '',
            'Mỗi ngày trôi qua bên em, anh thấy mình may mắn biết bao.',
            'Em là ánh sáng trong những ngày tối, là niềm vui trong những khoảnh khắc buồn.',
            'Em là lý do khiến anh muốn trở thành phiên bản tốt hơn của chính mình.',
            '',
            'Anh không giỏi lời văn hoa mỹ như những bài thơ,',
            'Nhưng anh muốn em biết rằng...',
            '',
            'Trong trái tim anh, em là duy nhất.',
            'Em là người anh muốn chia sẻ mọi khoảnh khắc,',
            'Từ những điều nhỏ nhặt nhất đến những giấc mơ lớn lao nhất.',
            '',
            'Anh hứa sẽ luôn ở bên em, yêu thương em, trân trọng em,',
            'Và mỗi ngày, anh sẽ cố gắng để em luôn cảm thấy hạnh phúc.',
            '',
            'Em chính là câu trả lời mà anh đã tìm kiếm suốt bấy lâu nay.',
            '',
            'Mãi bên em,',
            'Người yêu em nhất trên đời 💕'
        ]
    }
};