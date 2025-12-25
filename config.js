/**
 * LOVE CONFESSION WEBSITE - CONFIGURATION
 * ========================================
 * Chỉnh sửa các giá trị bên dưới để cá nhân hóa website của bạn
 */

const CONFIG = {
    // ===== TRANG 1: INTRO =====
    introTitle: 'Chào tình yêu của anh',
    introDesc: `Chào em, xin tự giới thiệu, anh là Thịnh, chiếc web này được sinh ra với mục đích giúp anh gửi gắm đôi điều tới em cũng như ta cùng nhau nhìn lại quãng thời gian không ngắn - cũng chẳng dài vừa qua. Anh xin khai sự thật: Với mục đích mang tới cho em 1 trải nghiệm được cá nhân hóa ~ dành riêng cho em không hề giống 1 ai, anh đã vừa làm vừa tìm hiểu. Làm web không phải chuyên môn của anh và thẩm mỹ của anh cũng đã được em kiểm chứng thì anh mong rằng những gì anh mang tới phần nào khiến em vui và trân trọng khoảng thời gian vừa qua.`,
    btnIntro: 'Tiếp tục',

    // ===== TRANG 2: TIMELINE =====
    // Thêm các milestone của 2 người tại đây
    // Đặt ảnh vào thư mục img/ và thay đổi đường dẫn image
    timeline: [
        {
            date: 'Ngày đầu tiên',
            title: 'Ngày đầu tiên gặp nhau',
            image: 'img/z7358483231625_5a673dfbef2c2a02f3b37307052692c2.jpg',
            description: 'Em là người mà ngay từ khi gặp lần đầu cho anh cảm giác gần gũi đến lạ, mặc dù hôm đó hơi run nhưng em đã kéo được anh vào những câu chuyện'
        },
        {
            date: '1 ngày đi chơi như bao ngày',
            title: 'Đi tô tượng',
            image: 'img/z7358486977728_576d85cc9456463ad660f754267f5cdb.jpg',
            description: 'Là 1 ngày bình thường đi tô tượng nhưng ở cạnh người đặc biệt, lúc này là dần dần quen quen với sự hiện diện của em. Và sản phẩm thì đang được anh đặt ở công ty, ngắm hàng ngày'
        },
        {
            date: 'Ngon ngon ngon',
            title: 'Ai là vua đầu bếp',
            image: 'img/z7358486973044_95059a4f53e73deddafa9174075c35b2.jpg',
            description: 'Cũng không ngờ tới việc 1 ngày anh được em nấu cơm cho ăn, đã thế còn nấu ngon nữa ~.~ Nó thích gì đâu á'
        },
        {
            date: 'Khoảnh khắc',
            title: 'Đua xe ngày đầu gặp nhau',
            image: 'img/z7358483228990_1df803015d80a1d452235be1e896048f.jpg',
            description: 'Ai mà ngờ được đây sẽ là những hoạt động mà chúng mình đã làm vào lần đầu gặp mặt. Không phải là ăn tối, không phải ngồi cafe nói chuyện mà đó là 1 buổi dạo chơi ở Hồ Gươm, tô tượng và LẦN ĐẦU ĐI THỬ XE ĐIỆN CHUNG'
        },
        {
            date: 'Hoa không ngẫu nhiên',
            title: 'Hoa nè',
            image: 'img/z7362208920255_d65f98b073a94042a69380b8a17d077e.jpg',
            description: 'Vô tình lướt Threads thấy hoa đẹp quá nên nhắn tin đặt mua tặng em liền'
        },
        {
            date: 'Hoa ngẫu nhiên',
            title: 'Lại hoa nữa',
            image: 'img/z7362208918537_4f75cfc21fee05e3d5edaf540af86700.jpg',
            description: 'Bó hoa này là tình cờ 1 ngày đi làm về thấy hoa đẹp quá mua tặng em luôn, cũng không có động lực hay lý do gì, chỉ đơn giản là hoa đẹp + yêu em'
        },
        {
            date: 'Ngon ngon ngonnnn',
            title: 'Quái vật ăn thịt người đẹp',
            image: 'img/z7358486974154_599a02f7be63a75c6fc9255544e8a829.jpg',
            description: '"Anh ơi em béo quá" - "Anh dẫn em đi ăn Dooki nhé"'
        },
        {
            date: 'Ưng',
            title: 'Bức ảnh ưng tuyệt đối',
            image: 'img/z7358483225205_f5087cd7371c5d69d2b23cfe31c53808.jpg',
            description: 'Có thể là bức ảnh ưng nhất luôn'
        }
    ],

    // ===== TRANG 3: GALLERY =====
    // 12 ảnh từ thư mục img/
    gallery: [
        {
            src: 'img/z7358483214722_f55bfea9177477d54e92372273b24a1e.jpg'
        },
        {
            src: 'img/z7358483219029_6179d585d4d50df1a84c4505aae5a36c.jpg'
        },
        {
            src: 'img/z7358483223541_9207ef3cefcbd0dbe919f0cac437c51e.jpg'
        },
        {
            src: 'img/z7358483225205_f5087cd7371c5d69d2b23cfe31c53808.jpg'
        },
        {
            src: 'img/z7358483228862_625e3f3a461cf448bdf5ef5c7936d399.jpg'
        },
        {
            src: 'img/z7358483231625_5a673dfbef2c2a02f3b37307052692c2.jpg'
        },
        {
            src: 'img/z7358486973044_95059a4f53e73deddafa9174075c35b2.jpg'
        },
        {
            src: 'img/z7358486974154_599a02f7be63a75c6fc9255544e8a829.jpg'
        },
        {
            src: 'img/z7358486977164_450d19e40493331bba3b53128cd315a7.jpg'
        },
        {
            src: 'img/z7362207921045_07ac01e7791c2c40bc124665e5234b4c.jpg'
        },
        {
            src: 'img/z7358486977728_576d85cc9456463ad660f754267f5cdb.jpg'
        },
        {
            src: 'img/z7358486981879_e800c9e489ddf22593c412a5aaf883ad.jpg'
        }
    ],
    
    // ===== TRANG 4: CONFESSION =====
    title: 'Cảnh báo chuyển cảnh',
    desc: 'Vậy là ta đã cùng nhau nhìn lại những hình ảnh kỷ niệm của những ngày tháng vừa qua, giờ thì trải lòng 1 chút ha',
    question: '',
    btnYes: 'Ok anh tiếp tục thôi',
    btnNo: 'Không???',
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
            left: 'img/couple/a.2.jpg',
            right: 'img/couple/a.1.jpg'
        },
        {
            left: 'img/couple/b.1.jpg',
            right: 'img/couple/b.2.jpg'
        },
        {
            left: 'img/couple/c.2.jpg',
            right: 'img/couple/c.1.jpg'
        }
    ],

    // ===== TRANG 6: LOVE SCENE (Chat → Love Letter) =====
    // Có thể tùy chỉnh tin nhắn và nội dung thư tình
    loveScene: {

        
        // Nội dung thư tình (hiện sau khi chat xong)
        loveLetter: [
            'Chào em, anh là Thịnh, là người yêu em. Ngày này ba tháng trước cũng là ngày mình lần đầu nhắn tin với nhau qua Facebook, kể ra cũng nhanh phết ha. Từ hai người xa lạ không biết gì về nhau, hơn nữa bản thân anh là người rất ngại chia sẻ, luôn trong trạng thái không dám bộc lộ những thứ ẩn giấu bên trong, nhưng mọi thứ đến một cách tự nhiên, anh thậm chí không biết em đã chiếm được lòng tin của anh từ bao giờ và thoáng một cái mình đã trở thành một phần trong cuộc đời của nhau rồi. Những ngày đầu nói chuyện, những cuộc trò chuyện tưởng như rất bình thường lại khiến anh mong chờ mỗi ngày.',
            'Quãng thời gian vừa rồi, anh luôn cảm thấy mình thật may mắn khi có người đồng hành - vừa là áp lực, nhưng cũng là động lực rất lớn để anh cố gắng và phát triển hơn, và động lực ấy chính là em. Trong mối quan hệ của mình, anh biết anh không hoàn hảo, nhiều lúc vẫn hành động chưa thực sự đúng, nhưng anh mong em hiểu rằng anh luôn cố gắng bằng tất cả những gì bản thân có để mang đến cho em những điều tốt đẹp. Những ngày qua, em mang đến cho anh một cảm giác hoàn toàn khác; lần đầu anh cảm nhận được tình yêu nhiều đến vậy (chưa đến mức cấn đâu, yên tâm ^^). Sự đồng hành, sự tôn trọng và cách em đáp lại tình cảm là những điều khiến anh vừa “bất ngờ”, vừa thật sự trân trọng khi có được từ một người.',
            'Những lời nhắn này đáng ra nên được gửi tới em sớm hơn, nhưng chắc em hiểu anh đang chờ mọi chuyện xung quanh diễn ra suôn sẻ. Trước đó, anh từng tỏ tình em trực tiếp mà không có nhiều sự chuẩn bị, và bây giờ… chắc chắn không phải là một lời tỏ tình lại. Anh chỉ muốn khẳng định rằng anh thật sự nghiêm túc với em và mong mối quan hệ này đến từ cả hai phía. Anh mong chúng mình sẽ luôn chọn ở lại bên nhau, cùng lắng nghe, cùng thấu hiểu và cùng trưởng thành theo cách tự nhiên nhất. Anh yêu em.',
            'Anh yêu em. 💕',
            'Lê Đắc Thịnh'
        ]
    }
};