import { productsApi } from 'api'
import hiTea from 'assets/images/taglige_hitea-07_89e4f6b4f55f49568bbabf39b723b48c.svg'
import Image from 'next/image'
import { useQuery } from 'react-query'
import prod1 from 'assets/images/dau-tay-man-muoi-aloe-vera__1__079e6c7f133542e79e9404c7ed5f9589.webp'
import Link from 'next/link'
import prod2 from 'assets/images/xoai-aloe-vera_9f3f43d34b734fa5bad900d76d564ed0.webp'
import prod3 from 'assets/images/sb-yuzu-aloe-vera_b613897273ea446bac8b2ac5dc46857a.webp'
import prod4 from 'assets/images/sb-man-muoi-aloevera_5311a28e76d34cdc97711c27a9df8a09.webp'

const PROD_TOP = {
    name: 'Hi-Tea Dâu Tây Mận Muối Aloe Vera',
    info: 'Sự kết hợp độc đáo giữa 3 sắc thái hương vị khác nhau: trà hoa Hibiscus chua thanh, Mận muối mặn mặn và Dâu tây tươi Đà Lạt cô đặc ngọt dịu. Ngoài ra, topping Aloe Vera tươi mát, ngon ngất ngây, đẹp đắm say, hứa hẹn sẽ khuấy đảo hè này.',
    slug: 'hi-tea-dau-tay-man-muoi-aloe-vera',
    img: prod1.src,
}

const PRODS = [
    {
        name: 'Hi-Tea Xoài Aloe Vera',
        info: 'Vị ngọt thanh, thơm phức từ xoài chín mọng kết hợp cùng vị chua đặc trưng của trà hoa Hibiscus tự nhiên, sẽ khiến bạn khó lòng quên được thức uống “chân ái” này. Đặc biệt, topping Aloe Vera tự nhiên không chỉ nhâm nhi vui miệng mà còn giúp bạn “nâng tầm nhan sắc”.',
        slug: 'hi-tea-xoai-aloe-vera',
        img: prod2.src,
    },
    {
        name: 'Hi-Tea Đá Tuyết Yuzu Aloe Vera',
        info: 'Vị chua tươi mát của trà hoa Hibiscus, cùng đá tuyết Yuzu (quýt Nhật) chua dịu sẽ trở nên hài hòa hơn nhờ topping Aloe Vera giòn ngọt, sẽ khiến bạn thích thú ngay lần chạm môi đầu tiên.',
        slug: 'hi-tea-da-tuyet-yuzu-aloe-vera',
        img: prod3.src,
    },
    {
        name: 'Hi-Tea Đá Tuyết Mận Muối Aloe Vera',
        info: '“Have a mặn mà” và chua chua từ Mận muối xay cùng đá tuyết, hoà quyện với vị trà hoa Hibiscus chua dịu và chút ngọt thanh tao bởi topping Aloe Vera, Hi-Tea Đá Tuyết Mận Muối Aloe Vera là thức uống “must try” để đánh tan cơn khát mùa hè.',
        slug: 'hi-tea-da-tuyet-man-muoi-aloe-vera',
        img: prod4.src,
    },
]

const HomeBrand = () => {
    return (
        <section className="mt-10 py-16 bg-[#FFE9D4]">
            <div className="layout flex flex-col items-center">
                <img src={hiTea.src} className="w-[500px]" alt="Hi-tea" />
                <p className="mt-2 mb-3 text-[15px] font-semibold max-w-[764px] text-center break-words">
                    Được chiết xuất từ 100% hoa Hibiscus tự nhiên, không chứa
                    caffeine cùng topping trái cây đa dạng, Hi-Tea Healthy là
                    lựa chọn cho những ai muốn chăm sức khoẻ và yêu chiều bản
                    thân. Nay có thêm 4 vị mới cực hấp dẫn kèm topping Aloe Vera
                    ngon ngất ngây, đẹp đắm say.
                </p>
                <p className="text-xl font-medium">Thử đi chờ chi!</p>
                <div className="w-full h-[300px] rounded-[10px] mt-[120px] shadow-card2 bg-white relative">
                    <div className="absolute w-[35%] left-0 bottom-3">
                        <div className="pt-[100%] relative">
                            <Image
                                src={PROD_TOP.img}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className="ml-[35%] flex flex-col items-center mt-9 h-full">
                        <h3 className="text-[18px] font-semibold">
                            Hi-Tea Dâu Tây Mận Muối Aloe Vera
                        </h3>
                        <p className="text-sm text-center max-w-[90%] break-words mt-2 leading-[1.6]">
                            Sự kết hợp độc đáo giữa 3 sắc thái hương vị khác
                            nhau: trà hoa Hibiscus chua thanh, Mận muối mặn mặn
                            và Dâu tây tươi Đà Lạt cô đặc ngọt dịu. Ngoài ra,
                            topping Aloe Vera tươi mát, ngon ngất ngây, đẹp đắm
                            say, hứa hẹn sẽ khuấy đảo hè này.
                        </p>
                        <Link href={`/products/${PROD_TOP.slug}`}>
                            <a className="px-28 mt-10 primary-btn">Thử ngay</a>
                        </Link>
                    </div>
                </div>
                <div className="mt-[150px] w-full grid grid-cols-3 gap-x-6">
                    {PRODS.map((prod, index) => (
                        <div
                            className="py-6 px-4 rounded-[10px] shadow-card2 bg-white h-[504px]"
                            key={index}
                        >
                            <div className="pt-[100%] relative -left-3 bottom-[115px]">
                                <div className="absolute w-[calc(100%+32px)] h-[calc(100%+32px)] left-0 bottom-0">
                                    <Image
                                        src={prod.img}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <div className="max-w-[370px] h-[232px] flex flex-col top-[-115px] relative">
                                <h3 className="font-semibold text-[18px] mb-2">
                                    {prod.name}
                                </h3>
                                <p className="text-sm break-words leading-[1.6] mb-3 line-clamp-6">
                                    {prod.info}
                                </p>
                                <Link href={`/products/${prod.slug}`}>
                                    <a className="w-full primary-btn mt-auto">
                                        Thử Ngay
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeBrand
