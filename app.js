// 공문 데이터 정의 (압축파일 내 3개 표준 서식 분석 기반)
const DOCS_DATA = [
  {
    id: "doc1",
    number: "별지 제1호서식",
    title: "일반기안문 (시행문 겸용)",
    category: "대외",
    badgeColor: "blue",
    purpose: "행정기관 대외 발송 공문 및 일반 기안 시행 시 사용하는 가장 대표적인 표준 공문서",
    target: "타 행정기관, 공공기관, 민간단체, 국민 수신용",
    summary: "기안과 발송(시행)을 동시에 처리할 수 있는 다목적 표준 공문 서식입니다. 수신처 및 발신명의, 직인 인영란, 접수 및 시행 정보가 포함됩니다.",
    keyFields: [
      "행정기관명",
      "수신 (경유)",
      "제목 및 본문",
      "발신명의 및 <직인>",
      "기안자 / 검토자 / 결재권자 (직위, 성명, 서명)",
      "협조자",
      "시행: 처리과명-연도별 일련번호(시행일)",
      "접수: 처리과명-연도별 일련번호(접수일)",
      "우편번호, 도로명주소, 홈페이지 주소",
      "전화번호, 팩스번호, 공무원의 전자우편주소, 공개 구분"
    ],
    rules: [
      "문서 작성 시 '행정기관명', '발신명', '기안자', '검토자', '결재권자', '직위(직급) 서명', '처리과명-연도별 일련번호(시행일)', '도로명주소', '홈페이지 주소', '전자우편주소', '공개 구분' 등의 용어는 출력하지 않고 해당 실제 값만 기재합니다.",
      "대외 발송 시에는 기관의 직인을 날인하거나 전자이미지직인을 사용합니다."
    ],
    downloads: {
      pdf: "docs/doc1_general.pdf",
      hwp: "docs/doc1_general.hwp"
    }
  },
  {
    id: "doc2",
    number: "별지 제2호서식",
    title: "내부결재기안문",
    category: "내부",
    badgeColor: "emerald",
    purpose: "기관 내부 의사결정, 방침 수립, 기획, 사업계획 등 대외 발송이 없는 순수 내부 보고용",
    target: "기관 내부 부서장, 국장, 실장, 기관장 등 내부 결재선",
    summary: "대외 발송 없이 행정기관 내부에서 방침을 확정하거나 의사를 결정할 때 작성하는 기안문입니다. 수신자나 발신명의 없이 보고근거, 요약, 결재라인 중심으로 간결하게 구성됩니다.",
    keyFields: [
      "생산등록번호 및 등록일",
      "결재일",
      "공개 구분",
      "협조자 결재란",
      "( 제    목 )",
      "보고근거 및 보고내용 요약란 (필요시 작성)",
      "결재라인란 (크기 및 결재란 수 조정 가능)",
      "발의 부서: ○○○○부(처ㆍ청 또는 위원회) ○○○○국 ○○○○과"
    ],
    rules: [
      "결재란의 크기 및 결재란 수는 기관의 내부 결재 규칙 및 필요에 따라 유연하게 조정하여 사용할 수 있습니다.",
      "필요한 경우 제목 하단에 [보고근거] 및 [보고내용]을 사전에 1~2줄로 요약하여 적을 수 있습니다.",
      "외부 수신처나 직인이 필요하지 않습니다."
    ],
    downloads: {
      pdf: "docs/doc2_internal.pdf",
      hwp: "docs/doc2_internal.hwp"
    }
  },
  {
    id: "doc3",
    number: "별지 제3호서식",
    title: "대통령결재기안문",
    category: "고위",
    badgeColor: "purple",
    purpose: "국가 최고 의사결정권자인 대통령(및 국무총리)의 재가나 결재를 받아야 하는 중요 국가 정책 공문",
    target: "대통령, 국무총리, 국무위원 등 국가 최고위 의결권자",
    summary: "대통령의 결재 및 재가를 직접 수반하는 최고 규격 기안문입니다. 국무총리 경유 여부와 관련 부처 간 사전 협조 여부가 매우 핵심적인 항목으로 배치되어 있습니다.",
    keyFields: [
      "행정기관명 및 연락처/도로명주소",
      "생산등록번호, 등록일, 결재일, 시행일",
      "관련기관 협조여부 (부처 간 협의 필수)",
      "공개 구분",
      "최고위 결재라인: [대통령], [국무총리], [검토란]",
      "수신 (또는 '받는 자')",
      "발신 (또는 '보내는 자') [인]",
      "제목 및 상정 본문"
    ],
    rules: [
      "결재란의 수와 크기는 필요에 따라 조정하여 사용하되, 국무총리의 결재를 받는 문서에는 그 결재 절차에 맞게 직위/직급을 변경하여 표시합니다.",
      "'수신'은 '받는 자'로, '발신'은 '보내는 자'로 변경하여 사용할 수 있습니다.",
      "관계 중앙행정기관과의 사전 협조 여부를 명확히 표기해야 합니다."
    ],
    downloads: {
      pdf: "docs/doc3_presidential.pdf",
      hwp: "docs/doc3_presidential.hwp"
    }
  }
];

// 비교 테이블 매트릭스 데이터
const COMPARE_MATRIX = [
  {
    item: "주요 용도",
    type1: "대외 발송 공문 및 일반 기안 (시행문 겸용)",
    type2: "기관 내부 방침 결정 및 내부 보고용",
    type3: "대통령 및 국무총리 결재·재가 안건"
  },
  {
    item: "수신처 및 발신명의",
    type1: "필수 (수신처 및 기관장 발신명의 포함)",
    type2: "없음 (대외 발송 없음)",
    type3: "있음 ('받는 자', '보내는 자'로 변경 가능)"
  },
  {
    item: "직인/인영 날인",
    type1: "기관 직인 날인란 필수",
    type2: "없음 (직인 불필요)",
    type3: "발신자 [인] 날인란 존재"
  },
  {
    item: "결재선 구조",
    type1: "기안자 - 검토자 - 결재권자 (협조자)",
    type2: "기관 맞춤형 결재라인 (칸 수 조정 가능)",
    type3: "기안 부처 검토 ➡️ 국무총리 ➡️ 대통령"
  },
  {
    item: "특화 기재 항목",
    type1: "시행일 및 접수일, 발송/접수 번호",
    type2: "보고근거 및 보고내용 사전 요약란",
    type3: "관련기관 협조여부 필수 표기"
  },
  {
    item: "작성 비고 규칙",
    type1: "기관명, 기안자 등 11개 레이블 용어 표시 생략",
    type2: "결재란 크기/수 조정 허용",
    type3: "총리 결재 절차별 직위 변경, 수신/발신 용어 치환"
  },
  {
    item: "공통 규격",
    type1: "A4 (210×297mm) 백상지 80g/㎡",
    type2: "A4 (210×297mm) 백상지 80g/㎡",
    type3: "A4 (210×297mm) 백상지 80g/㎡"
  }
];

// DOM 로드 완료 후 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderDocCards(DOCS_DATA);
  renderCompareTable();
  setupTabs();
  setupSearchAndFilter();
  setupModal();
});

// 서식 카드 렌더링
function renderDocCards(docs) {
  const container = document.getElementById("docCardsGrid");
  container.innerHTML = "";

  if (docs.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 12px; color: #64748b;">
        🔍 검색 조건과 일치하는 공문 서식이 없습니다.
      </div>
    `;
    return;
  }

  docs.forEach(doc => {
    const card = document.createElement("div");
    card.className = "doc-card";
    
    // 주요 구성 요소 상위 4개 추출
    const previewFields = doc.keyFields.slice(0, 4).join(", ") + "...";

    card.innerHTML = `
      <div class="card-top">
        <span class="doc-number">${doc.number}</span>
        <span class="doc-type-badge">${doc.category === '대외' ? '대외·발송용' : doc.category === '내부' ? '내부의결용' : '최고의결용'}</span>
      </div>
      <h3 class="doc-title">${doc.title}</h3>
      <p class="doc-desc">${doc.purpose}</p>
      
      <div class="doc-features">
        <div class="feature-item">
          <span class="feature-key">대상 범위</span>
          <span class="feature-val">${doc.target}</span>
        </div>
        <div class="feature-item">
          <span class="feature-key">주요 항목</span>
          <span class="feature-val">${previewFields}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="btn-detail" onclick="openDocDetail('${doc.id}')">
          <span>상세 요약 보기</span> ➔
        </button>
        <a class="btn-download" href="${doc.downloads.pdf}" target="_blank" title="PDF 표준 양식 다운로드">
          📄 PDF
        </a>
        <a class="btn-download" href="${doc.downloads.hwp}" download title="한글(HWP) 표준 양식 다운로드">
          📝 HWP
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

// 비교표 렌더링
function renderCompareTable() {
  const tbody = document.getElementById("compareTableBody");
  tbody.innerHTML = "";

  COMPARE_MATRIX.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${row.item}</strong></td>
      <td>${row.type1}</td>
      <td>${row.type2}</td>
      <td>${row.type3}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 탭 전환 기능
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = `tab-${tab.dataset.tab}`;
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add("active");
    });
  });
}

// 검색 및 카테고리 필터
function setupSearchAndFilter() {
  const searchInput = document.getElementById("searchInput");
  const chips = document.querySelectorAll(".chip");

  let currentFilter = "all";
  let searchKeyword = "";

  function filterData() {
    const filtered = DOCS_DATA.filter(doc => {
      const matchFilter = (currentFilter === "all") || (doc.category === currentFilter);
      const query = searchKeyword.toLowerCase();
      const matchSearch = doc.title.toLowerCase().includes(query) ||
                          doc.number.toLowerCase().includes(query) ||
                          doc.purpose.toLowerCase().includes(query) ||
                          doc.keyFields.some(f => f.toLowerCase().includes(query));
      return matchFilter && matchSearch;
    });
    renderDocCards(filtered);
  }

  searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value.trim();
    filterData();
  });

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentFilter = chip.dataset.filter;
      filterData();
    });
  });
}

// 상세 모달 열기
window.openDocDetail = function(id) {
  const doc = DOCS_DATA.find(d => d.id === id);
  if (!doc) return;

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div class="modal-header">
      <span class="badge" style="background:#2563eb;">${doc.number}</span>
      <h2>${doc.title}</h2>
      <p style="color:#64748b; font-size: 0.95rem; margin-top: 0.35rem;">${doc.purpose}</p>
    </div>

    <div class="modal-section">
      <h4>📌 서식 개요 및 작성 대상</h4>
      <p style="color: #334155; line-height: 1.6; font-size: 0.92rem;">
        ${doc.summary}
      </p>
      <div style="margin-top: 0.6rem; background: #f8fafc; padding: 0.65rem 0.9rem; border-radius: 6px; font-size: 0.88rem;">
        <strong>권장 사용 대상:</strong> ${doc.target}
      </div>
    </div>

    <div class="modal-section">
      <h4>📑 포함 필수 서식 항목</h4>
      <div class="field-tag-list">
        ${doc.keyFields.map(f => `<span class="field-tag">✓ ${f}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h4>⚠️ 서식별 필수 준수 규칙 (시행규칙 비고)</h4>
      <div class="notice-box">
        <ul style="padding-left: 1.25rem;">
          ${doc.rules.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="modal-section" style="margin-top: 2rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <a href="${doc.downloads.pdf}" target="_blank" class="btn-detail" style="text-decoration:none; display:inline-flex;">
        <span>PDF 표준 서식 열기 / 다운로드</span>
      </a>
      <a href="${doc.downloads.hwp}" download class="btn-download" style="display:inline-flex; align-items:center;">
        <span>한글(.HWP) 파일 다운로드</span>
      </a>
    </div>
  `;

  const modal = document.getElementById("detailModal");
  modal.classList.add("open");
};

// 모달 닫기
function setupModal() {
  const modal = document.getElementById("detailModal");
  const closeBtn = document.getElementById("modalCloseBtn");

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      modal.classList.remove("open");
    }
  });
}
