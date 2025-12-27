import { SpecAwardType, SpecExperienceType } from '@/types/spec'
import { Spacing } from '@/components/common'
import { ExpDescription, ExpDuration, Experience, ExpImprovementRate } from '@/components/spec'

interface AddExperienceFormProps {
  index: number
  activity: SpecExperienceType
  onUpdate: (index: number, newData: SpecAwardType | SpecExperienceType) => void
}
export default function AddExperienceForm({ index, activity, onUpdate }: AddExperienceFormProps) {
  return (
    <div>
      <Spacing height={24} />
      <Experience experience={activity.experience} index={index} activity={activity} onUpdate={onUpdate} />

      <Spacing height={24} />
      <ExpDuration
        index={index}
        activity={activity}
        startDate={activity.startDate}
        endDate={activity.endDate}
        onUpdate={onUpdate}
      />

      <Spacing height={24} />
      <ExpDescription index={index} activity={activity} onUpdate={onUpdate} description={activity.description} />

      <Spacing height={24} />
      <ExpImprovementRate
        index={index}
        activity={activity}
        onUpdate={onUpdate}
        afterImprovementRate={activity.afterImprovementRate}
        beforeImprovementRate={activity.beforeImprovementRate}
      />
    </div>
  )
}
