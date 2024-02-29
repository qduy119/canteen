"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Item",
            [
                {
                    id: 1,
                    categoryId: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441476/canteen/product/tj34mdsdgducrghs39hl.jpg",
                    name: "Chè Thái",
                    description: "bỗ dưỡng, giá cả vừa phải",
                    price: 30,
                    discount: 12.5,
                    stock: 13,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441477/canteen/product/t6n2e6223cgmo1n8pw56.jpg",
                    ]),
                    quantity: 14,
                    rating: 0,
                },
                {
                    id: 2,
                    categoryId: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441609/canteen/product/bewl0ulywtpnoeuaktzg.jpg",
                    name: "Chè Dừa",
                    description: "ngon, bổ dưỡng, mát lạnh, ăn vào sảng khoái",
                    price: 25,
                    discount: 12.5,
                    stock: 30,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441610/canteen/product/adhuqn4nhzbrrm2ajhby.jpg",
                    ]),
                    quantity: 14,
                    rating: 0,
                },
                {
                    id: 3,
                    categoryId: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441686/canteen/product/we1iq3zqcu6tgncpz6t8.jpg",
                    name: "Chè Ngô",
                    description: "béo ngậy, giàu dinh dưỡng",
                    price: 26,
                    discount: 12.5,
                    stock: 25,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441686/canteen/product/zu2fzrxxy7titzenhqee.jpg",
                    ]),
                    quantity: 14,
                    rating: 0,
                },
                {
                    id: 4,
                    categoryId: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441761/canteen/product/yxtxknrtm1tqubozjuwj.jpg",
                    name: "Chè Đậu Xanh",
                    description: "ngon, đậm vị",
                    price: 24,
                    discount: 2.5,
                    stock: 35,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441762/canteen/product/db9dfnm8jnxhegblr3te.jpg",
                    ]),
                    quantity: 14,
                    rating: 0,
                },
                {
                    id: 5,
                    categoryId: 4,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441836/canteen/product/yf87gdg5ztknzt0xojds.jpg",
                    name: "Chè Hạt Sen",
                    description: "Giàu dinh dưỡng, hợp khẩu vị, ngon",
                    price: 31,
                    discount: 2.4,
                    stock: 29,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441837/canteen/product/aiocuaiqjexu7tes4jrt.jpg",
                    ]),
                    quantity: 14,
                    rating: 0,
                },
                {
                    id: 6,
                    categoryId: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441934/canteen/product/zscvv7g2erqxovwjyblg.jpg",
                    name: "CocaCola",
                    description: "sảng khoái, mát lạnh",
                    price: 15,
                    discount: 1.4,
                    stock: 100,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704441935/canteen/product/zyl6lnbml8iz0lqklmmk.jpg",
                    ]),
                    quantity: 15,
                    rating: 0,
                },
                {
                    id: 7,
                    categoryId: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442029/canteen/product/oofoitdg6xfeqd3rfiq0.jpg",
                    name: "Seven Up",
                    description: "mát lạnh, sảng khoái",
                    price: 13,
                    discount: 1.3,
                    stock: 81,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442030/canteen/product/ejuwj6bd2pporrchxjhy.jpg",
                    ]),
                    quantity: 15,
                    rating: 0,
                },
                {
                    id: 8,
                    categoryId: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442086/canteen/product/yz3oy2fjqzssmnbl0qt2.jpg",
                    name: "Sting",
                    description: "sảng khoái, mát lạnh",
                    price: 14,
                    discount: 1.3,
                    stock: 95,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442087/canteen/product/gar0wmlzgcm4r5jisjpx.jpg",
                    ]),
                    quantity: 15,
                    rating: 0,
                },
                {
                    id: 9,
                    categoryId: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442153/canteen/product/bys2hvvmg1iqrnnbmxz0.jpg",
                    name: "Nutri Boost",
                    description: "sảng khoái, mát lạnh",
                    price: 16,
                    discount: 0.4,
                    stock: 98,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442154/canteen/product/jbnrqovhemvrxnhvsnsl.jpg",
                    ]),
                    quantity: 15,
                    rating: 0,
                },
                {
                    id: 10,
                    categoryId: 5,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442197/canteen/product/nhayfcsnvecj6gkyhahs.jpg",
                    name: "Revive",
                    description: "sảng khoái, mát lạnh",
                    price: 14,
                    discount: 0.9,
                    stock: 120,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442198/canteen/product/x5uezmvtqiphprybvdzw.jpg",
                    ]),
                    quantity: 15,
                    rating: 0,
                },
                {
                    id: 11,
                    categoryId: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442381/canteen/product/yzf2ei9fnn3vbpx5gcii.jpg",
                    name: "Thập cẩm (Dưa hấu, Thanh long, Dứa, Xampuche, Mít)",
                    description: "Ngon, tươi mát",
                    price: 30,
                    discount: 0.4,
                    stock: 13,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442382/canteen/product/caf57rmffffvsbnyzs0f.jpg",
                    ]),
                    quantity: 12,
                    rating: 0,
                },
                {
                    id: 12,
                    categoryId: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442498/canteen/product/upnfxyroinjbbzttcall.jpg",
                    name: "Thập cẩm (Mận, Ổi, Dưa hấu, Táo)",
                    description: "Ngon, tươi mát",
                    price: 25,
                    discount: 0.8,
                    stock: 29,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442499/canteen/product/in5u8hglv5ni43oimalv.jpg",
                    ]),
                    quantity: 12,
                    rating: 0,
                },
                {
                    id: 13,
                    categoryId: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442594/canteen/product/jjadr32zjwv9a8tifpif.jpg",
                    name: "Thập cẩm(Dâu tây, Dưa Hấu, Ổi, Bưởi, Dứa, Đu Đủ)",
                    description: "Ngon, tươi mát",
                    price: 31,
                    discount: 0.4,
                    stock: 20,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442595/canteen/product/dsbnhpkzpwksifs7iftw.jpg",
                    ]),
                    quantity: 12,
                    rating: 0,
                },
                {
                    id: 14,
                    categoryId: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442674/canteen/product/u4kyx7gii5yabkc922lt.jpg",
                    name: "Thập cẩm (Cam, Dâu tây, thanh long, Táo)",
                    description: "Ngon, tươi mát",
                    price: 25,
                    discount: 0.5,
                    stock: 30,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442674/canteen/product/f88ivwcmutfiaoj2hv4k.jpg",
                    ]),
                    quantity: 12,
                    rating: 0,
                },
                {
                    id: 15,
                    categoryId: 2,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442805/canteen/product/ugpo7aq3lupezl2luukm.jpg",
                    name: "Thập cẩm(Nho đen, Táo, Đu đủ, Bưởi )",
                    description: "Ngon, tươi mát",
                    price: 20,
                    discount: 0.4,
                    stock: 30,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442806/canteen/product/pc9zqmoy64wxxa9ufjj8.jpg",
                    ]),
                    quantity: 12,
                    rating: 0,
                },
                {
                    id: 16,
                    categoryId: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442891/canteen/product/qgtpge43wtcfvk277dei.jpg",
                    name: "Cơm tấm (Sườn bì chả đặc biệt)",
                    description: "Ngon, đạm đà",
                    price: 30,
                    discount: 0,
                    stock: 50,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704442892/canteen/product/td0kt8r33tknbqmzore4.jpg",
                    ]),
                    quantity: 11,
                    rating: 0,
                },
                {
                    id: 17,
                    categoryId: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443009/canteen/product/uxixrqusumbgzypw4v1z.jpg",
                    name: "Cơm tấm (gà trứng đặc biệt)",
                    description: "Ngon, đạm đà",
                    price: 30,
                    discount: 0,
                    stock: 50,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443010/canteen/product/cieg3eonezz7cddk9xal.jpg",
                    ]),
                    quantity: 11,
                    rating: 0,
                },
                {
                    id: 18,
                    categoryId: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443100/canteen/product/kbqfcyv06kadrwnsvqs6.jpg",
                    name: "cơm tấm(Sườn bì  chả trứng)",
                    description: "Ngon, đạm đà",
                    price: 25,
                    discount: 0,
                    stock: 51,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443101/canteen/product/em2wcfmhweimozputhgm.jpg",
                    ]),
                    quantity: 11,
                    rating: 0,
                },
                {
                    id: 19,
                    categoryId: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443165/canteen/product/hov6vteulyyneo37zion.jpg",
                    name: "cơm tấm(Sườn trứng)",
                    description: "Ngon, đạm đà",
                    price: 25,
                    discount: 0,
                    stock: 46,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443166/canteen/product/g8kzufesu4umc9ukk1yn.jpg",
                    ]),
                    quantity: 11,
                    rating: 0,
                },
                {
                    id: 20,
                    categoryId: 1,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443245/canteen/product/wy3dhtqbj7agqxa37hoj.jpg",
                    name: "cơm tấm (sườn nướng)",
                    description: "Ngon, đạm đà",
                    price: 20,
                    discount: 0,
                    stock: 50,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443246/canteen/product/f7ihkeg5ucytoue3ej7x.jpg",
                    ]),
                    quantity: 11,
                    rating: 0,
                },
                {
                    id: 21,
                    categoryId: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443671/canteen/product/i0vfjmyth3vozoldplsw.png",
                    name: "Mực",
                    description: "Ngon, Tươi, Sạch",
                    price: 50,
                    discount: 0.4,
                    stock: 100,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443677/canteen/product/hkxhslvyjbhqd22j2lsc.png",
                    ]),
                    quantity: 13,
                    rating: 0,
                },
                {
                    id: 22,
                    categoryId: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443731/canteen/product/uewtaqttjhpnasf9gscn.png",
                    name: "Cua Hoàng đế",
                    description: "Ngon, Tươi, Sạch",
                    price: 100,
                    discount: 0.2,
                    stock: 97,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443739/canteen/product/m9ij1nbvgi7ouzvrujp7.png",
                    ]),
                    quantity: 13,
                    rating: 0,
                },
                {
                    id: 23,
                    categoryId: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443823/canteen/product/qlvsy2o3cijkonfhck5n.png",
                    name: "Ốc",
                    description: "Ngon, Tươi, Sạch",
                    price: 50,
                    discount: 0.4,
                    stock: 99,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443832/canteen/product/dcwrgna5ryogmkoy4j0h.png",
                    ]),
                    quantity: 13,
                    rating: 0,
                },
                {
                    id: 24,
                    categoryId: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443889/canteen/product/nmkuoubpvksuiwvyrreq.png",
                    name: "Tôm",
                    description: "Ngon, Tươi, Sạch",
                    price: 50,
                    discount: 0.5,
                    stock: 50,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443895/canteen/product/elkkftpfm4j2r3nuzomc.png",
                    ]),
                    quantity: 13,
                    rating: 0,
                },
                {
                    id: 25,
                    categoryId: 3,
                    thumbnail:
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443972/canteen/product/v0nkvb0vinutvd5lvlfo.png",
                    name: "Hàu",
                    description: "Ngon, Tươi, Sạch",
                    price: 50,
                    discount: 0.4,
                    stock: 100,
                    images: JSON.stringify([
                        "https://res.cloudinary.com/dlzyiprib/image/upload/v1704443984/canteen/product/yvwwbnvhmyonrvc9wqvi.png",
                    ]),
                    quantity: 13,
                    rating: 0,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Item", null, {});
    },
};
