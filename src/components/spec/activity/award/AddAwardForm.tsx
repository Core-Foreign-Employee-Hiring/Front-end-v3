import { SpecAwardType, SpecExperienceType } from '@/types/spec'
import { Spacing } from '@/components/common'
import { AwardAcquiredDate, AwardDescription, AwardDocumentUrl, AwardHost, AwardName } from '@/components/spec'

interface AddAwardFormProps {
  index: number
  activity: SpecAwardType
  onUpdate: (index: number, newData: SpecAwardType | SpecExperienceType) => void
}
export default function AddAwardForm({ index, activity, onUpdate }: AddAwardFormProps) {
  return (
    <div>
      <Spacing height={24} />
      <AwardName index={index} activity={activity} onUpdate={onUpdate} awardName={activity.awardName} />

      <Spacing height={24} />
      <AwardHost index={index} activity={activity} onUpdate={onUpdate} host={activity.host} />

      <Spacing height={24} />
      <AwardAcquiredDate index={index} activity={activity} onUpdate={onUpdate} acquiredDate={activity.acquiredDate} />

      <Spacing height={24} />
      <AwardDescription index={index} activity={activity} onUpdate={onUpdate} description={activity.description} />

      <Spacing height={24} />
      <AwardDocumentUrl index={index} activity={activity} onUpdate={onUpdate} documentURL={activity.documentUrl} />
    </div>
  )
}
