import { memo, useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser'
import { mdParser } from './EditorField'

interface IInfoAndStoryProps {
    info: string
    story: string
}

const InfoAndStory: React.FC<IInfoAndStoryProps> = ({ info, story }) => {
    const [isViewMore, setIsViewMore] = useState<boolean>(false)
    const [storyHeight, setStoryHeight] = useState<number>(0)
    const storyRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (storyRef.current) {
            setStoryHeight(storyRef.current.clientHeight)
        }
    }, [])

    return (
        <div className="grid grid-cols-2">
            <div>
                <div className="w-3/4">
                    <h2 className="text-[18px] mb-2 font-semibold">
                        Thông tin
                    </h2>
                    <div className="text-sm leading-6">
                        {parse(mdParser.render(info || ''))}
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-[18px] mb-2 font-semibold">Câu chuyện</h2>
                <div
                    ref={storyRef}
                    className={`text-sm leading-6 overflow-hidden transition-all duration-300`}
                    style={{
                        height:
                            storyHeight === 0
                                ? undefined
                                : isViewMore
                                ? storyHeight
                                : 120,
                    }}
                >
                    {parse(mdParser.render(story || ''))}
                </div>
                <button
                    className="text-primary font-semibold text-sm"
                    onClick={() => setIsViewMore(!isViewMore)}
                >
                    {isViewMore ? 'Ẩn bớt' : 'Xem thêm'}
                </button>
            </div>
        </div>
    )
}

export default memo(InfoAndStory)
