declare global {
  interface Window {
    kakao: {
      maps: {
        // 공통 load 함수
        load: (callback: () => void) => void

        // 지도를 그릴 때 필요한 타입들
        LatLng: new (lat: number, lng: number) => any
        Map: new (container: HTMLElement, options: any) => any
        Marker: new (options: any) => any

        // 주소 검색(Geocoder)에 필요한 타입들
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: any[], status: 'OK' | 'ZERO_RESULT' | 'ERROR') => void
            ) => void
          }
          Status: {
            OK: 'OK'
            ZERO_RESULT: 'ZERO_RESULT'
            ERROR: 'ERROR'
          }
        }
      }
    }
  }
}

export interface KakaoNamespace {
  maps: {
    LatLng: new (lat: number, lng: number) => KakaoLatLng
    Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap
    Marker: new (options: KakaoMarkerOptions) => KakaoMarker
    load: (callback: () => void) => void
  }
}

export interface KakaoLatLng {
  getLat: () => number
  getLng: () => number
}

export interface KakaoMapOptions {
  center: KakaoLatLng
  level: number
}

export interface KakaoMapType {
  setCenter: (latlng: KakaoLatLng) => void
  relayout: () => void
  // 필요한 메서드가 있다면 여기에 추가
}

export interface KakaoMarkerOptions {
  position: KakaoLatLng
  map?: KakaoMap
}

export interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void
}

export interface KakaoGeocoder {
  addressSearch: (
    address: string,
    callback: (result: KakaoAddressResult[], status: 'OK' | 'ZERO_RESULT' | 'ERROR') => void
  ) => void
}

export interface KakaoAddressResult {
  address_name: string
  x: string // longitude
  y: string // latitude
}
