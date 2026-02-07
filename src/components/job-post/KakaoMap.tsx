'use client'

import { useEffect, useRef } from 'react'
import { KakaoMapType } from '@/types/kakao'

interface KakaoMapProps {
  latitude: number
  longitude: number
  level?: number
}

export default function KakaoMap({ latitude, longitude, level = 3 }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<KakaoMapType | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const { kakao } = window

    if (kakao && kakao.maps) {
      kakao.maps.load(() => {
        if (!mapContainer.current) return

        // 1. 중심 좌표 설정
        const center = new kakao.maps.LatLng(latitude, longitude)

        // 2. 지도 생성 (이미 생성이 되어있다면 중심만 이동, 아니면 새로 생성)
        if (!mapRef.current) {
          const options = {
            center: center,
            level: level,
          }
          const map = new kakao.maps.Map(mapContainer.current, options)
          mapRef.current = map

          // 3. 마커 표시
          const marker = new kakao.maps.Marker({
            position: center,
            map: map,
          })
        } else {
          // 이미 지도가 있을 경우 중심 좌표만 업데이트
          mapRef.current.setCenter(center)
        }
      })
    }
  }, [latitude, longitude, level])

  return <div ref={mapContainer} className="h-[400px] w-full rounded-lg border border-gray-200" />
}
