import { Button, Label, Spacing, TextInput } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { useSpecStore } from '@/store/specStore'

interface AddLangFormProps {
  index: number
  title: string
  score: string
}
export default function AddLangForm({ index, title, score }: AddLangFormProps) {
  const removeLanguageSkills = useSpecStore((state) => state.removeLanguageSkills)
  const updateLanguageSkills = useSpecStore((state) => state.updateLanguageSkills)

  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleLanguageChange = (index: number, fieldName: 'title' | 'score', value: string) => {
    // 기존 값들을 유지하면서, 전달받은 fieldName에 해당하는 값만 새로운 value로 교체합니다.
    updateLanguageSkills(index, {
      title: fieldName === 'title' ? value : title,
      score: fieldName === 'score' ? value : score,
    })
  }

  return (
    <>
      <Spacing height={16} />

      <Label
        label={'외국어'}
        className="kr-subtitle-lg"
        rightElement={
          <Button
            onClick={() => removeLanguageSkills(index)}
            leftIcon={<DeleteIcon width={20} height={20} />}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            삭제
          </Button>
        }
      />
      <Spacing height={24} />

      <div className="flex gap-x-4">
        <TextInput
          value={title}
          inputType={'text'}
          onChange={(e) => handleLanguageChange(index, 'title', e.target.value)}
          placeholder="외국어 시험명을 입력해주세요"
        />
        <TextInput
          value={score}
          inputType={'text'}
          onChange={(e) => handleLanguageChange(index, 'score', e.target.value)}
          placeholder="점수를 입력해주세요."
        />
      </div>
    </>
  )
}
