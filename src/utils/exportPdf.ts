// @/utils/exportPdf.ts
import jsPDF from 'jspdf'
import { domToCanvas } from 'modern-screenshot'

export const exportComponentToPdf = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId)
  if (!element) return

  try {
    // html2canvas 대신 modern-screenshot 사용 (lab(), lch() 등 지원)
    const canvas = await domToCanvas(element, {
      scale: 2,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    // 첫 페이지
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // 다중 페이지 처리
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`${fileName}.pdf`)
  } catch (error) {
    console.error('PDF 생성 중 에러 발생:', error)
    alert('PDF 생성에 실패했습니다. 다시 시도해 주세요.')
  }
}
