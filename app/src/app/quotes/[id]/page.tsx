import { Tabs } from "@/app/features/QuoteDetails"

type Props = {
    params: {
        id: string
    }
}
export default function Quote({ params }: Props) {
    return (
        <Tabs />
    )
}