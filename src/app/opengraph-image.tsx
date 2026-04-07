import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "2026 고유가 피해지원금 - 대상 확인 및 예상 금액 계산";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "60px 80px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "#3b82f6",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            2026 고유가 피해지원금
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#1e293b",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            대상 확인 및 예상 금액 계산
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#64748b",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            소득 하위 70% · 1인당 최대 25만원 · 89개 인구감소지역 추가 혜택
          </div>
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.8)",
            marginTop: "24px",
          }}
        >
          support.fazr.co.kr
        </div>
      </div>
    ),
    { ...size }
  );
}
