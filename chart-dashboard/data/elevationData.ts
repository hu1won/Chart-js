// 고도 데이터 타입 정의
export interface ElevationPoint {
    lat: number;
    lng: number;
    elevation: number;
  }
  
  // 고도 범위 정의
  export const elevationRanges = [
    { min: 0, max: 200, color: '#FFB5B5' },    // 저지대 (분홍색)
    { min: 201, max: 600, color: '#90EE90' },  // 중간고도 (연두색)
    { min: 601, max: 1000, color: '#87CEEB' }, // 고지대 (하늘색)
    { min: 1001, max: 2000, color: '#4169E1' } // 한라산 정상 부근 (진한 파란색)
  ];
  
  // 제주도 영역 내부인지 확인하는 함수
  function isInJeju(lat: number, lng: number): boolean {
    // 제주도 중심점과 반경 설정
    const centerLat = 33.35;
    const centerLng = 126.5;
    const radiusLat = 0.25; // 약 25km
    const radiusLng = 0.4;  // 약 40km
  
    // 타원형 영역 체크
    return (Math.pow((lat - centerLat) / radiusLat, 2) + 
            Math.pow((lng - centerLng) / radiusLng, 2)) <= 1;
  }
  
  // 격자 데이터 생성 함수
  export function generateGridData(): ElevationPoint[] {
    const points: ElevationPoint[] = [];
    const gridSize = 0.005; // 더 조밀한 격자
  
    // 제주도 영역 정의
    const bounds = {
      minLat: 33.1,
      maxLat: 33.6,
      minLng: 126.1,
      maxLng: 126.9
    };
  
    // 한라산 중심점
    const hallasanCenter = {
      lat: 33.362,
      lng: 126.533
    };
  
    for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += gridSize) {
      for (let lng = bounds.minLng; lng <= bounds.maxLng; lng += gridSize) {
        // 제주도 영역 내부인 경우만 포함
        if (!isInJeju(lat, lng)) continue;
  
        // 한라산으로부터의 거리 계산
        const distance = Math.sqrt(
          Math.pow(lat - hallasanCenter.lat, 2) + 
          Math.pow(lng - hallasanCenter.lng, 2)
        );
  
        // 거리에 따른 고도 계산
        let elevation;
        if (distance < 0.05) { // 한라산 정상 부근
          elevation = 1950 - (distance * 15000);
        } else if (distance < 0.15) { // 중간 고도
          elevation = 800 - (distance * 3000);
        } else { // 저지대
          elevation = 200 - (distance * 500);
        }
  
        // 약간의 랜덤성 추가
        elevation += (Math.random() - 0.5) * 50;
        elevation = Math.max(0, Math.round(elevation));
  
        points.push({ lat, lng, elevation });
      }
    }
  
    return points;
  }
  
  