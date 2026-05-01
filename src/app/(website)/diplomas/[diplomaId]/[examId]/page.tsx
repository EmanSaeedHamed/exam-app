import ExamScreen from "@/features/exam/screens/exam.screen";
import PageProp from "@/shared/lib/types/pages-props";

export default function Page({ params }: PageProp) {
  return <ExamScreen params={params} />
}
