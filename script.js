/**
 * 지식재산처 대국민 소개 웹 앱 스크립트
 * 무설치, 독립 실행형 (Pure JavaScript, No dependencies)
 */

// 1. 탭 전환 기능 (주요 업무)
function switchTab(tabId) {
  // 모든 탭 버튼 비활성화
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // 모든 탭 패널 숨기기
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabPanels.forEach(panel => panel.classList.remove('active'));

  // 클릭된 버튼 활성화
  const targetBtn = Array.from(tabButtons).find(btn => btn.getAttribute('onclick').includes(tabId));
  if (targetBtn) {
    targetBtn.classList.add('active');
  }

  // 대상 패널 노출
  const activePanel = document.getElementById(tabId);
  if (activePanel) {
    activePanel.classList.add('active');
  }
}

// 2. 내 아이디어 매칭기 (가이드 시뮬레이터)
const categoryData = {
  tech: {
    title: '⚙️ 특허권 (Patent) 추천',
    desc: '기능, 구조, 원리, 제조방법 등 기술적 사상이 고도화된 발명입니다. 특허 출원을 통해 20년간 독점적인 사업 권리를 확보할 수 있습니다.',
    tip: '출원 전 제품을 대중에게 공개하거나 판매하면 신규성 상실로 거절될 수 있으니 꼭 출원 먼저 진행하세요!'
  },
  shape: {
    title: '🔧 실용신안권 (Utility Model) 추천',
    desc: '이미 존재하는 물건의 형상이나 구조를 실용적으로 개량하여 편리하게 만든 아이디어입니다. 특허보다 등록 요건이 유연하며 존속기간은 10년입니다.',
    tip: '생활 밀착형 아이디어 상품이나 일상용품의 간단한 구조 변경에 매우 유리합니다.'
  },
  design: {
    title: '🎨 디자인권 (Design) 추천',
    desc: '물품의 형태, 모양, 색채, 재질 등 시각적으로 독창적인 아름다움을 주는 외관 디자인입니다. 등록 시 20년간 독점 보호받습니다.',
    tip: '스마트폰 외관, 가구 디자인, 포장 용기, 캐릭터 형태, 폰트 디자인 등이 이에 해당합니다.'
  },
  brand: {
    title: '🏷️ 상표권 (Trademark) 추천',
    desc: '소비자가 내 브랜드나 상품을 타인의 것과 구별할 수 있게 해주는 이름, 로고, 슬로건 등입니다. 10년마다 갱신하여 영구적으로 유지할 수 있습니다.',
    tip: '상표는 먼저 출원한 사람에게 권리를 부여하는 ‘선출원주의’이므로 사업 시작 전 미리 상표 등록을 완료하는 것이 필수적입니다.'
  }
};

function checkCategory(type) {
  const resultBox = document.getElementById('categoryResult');
  const data = categoryData[type];

  if (!data) return;

  resultBox.innerHTML = `
    <h4 style="font-size:1.15rem; font-weight:800; color:#111827; margin-bottom:8px;">${data.title}</h4>
    <p style="color:#4b5563; margin-bottom:12px; font-size:0.95rem; line-height:1.6;">${data.desc}</p>
    <div style="background:#ffffff; border-left:3px solid #111827; padding:10px 14px; font-size:0.88rem; color:#374151; border-radius:4px; border:1px solid #e5e7eb; border-left-width:3px;">
      💡 <strong>전문가 팁:</strong> ${data.tip}
    </div>
  `;
  resultBox.classList.remove('hidden');
}

// 3. 지식재산 상식 OX 퀴즈
const quizList = [
  {
    question: 'Q1. 특허권은 한 번 등록되면 100년 동안 영구적으로 권리가 유지된다?',
    answer: false,
    explanation: '❌ 정답은 X입니다! 특허권의 존속기간은 출원일로부터 최대 20년입니다. 기간이 지나면 공공의 자산이 되어 누구나 자유롭게 활용할 수 있습니다. (단, 상표권은 10년마다 갱신하면 영구 유지가 가능합니다)'
  },
  {
    question: 'Q2. 대한민국에서 특허를 등록받으면 미국이나 일본에서도 자동으로 특허권이 보호된다?',
    answer: false,
    explanation: '❌ 정답은 X입니다! 지식재산권은 ‘속지주의’가 원칙입니다. 즉, 특허를 받고자 하는 각 나라(미국, 유럽 등)에 개별적으로 출원하거나 PCT 국제출원 제도를 이용해야 합니다.'
  },
  {
    question: 'Q3. 국가핵심기술을 고의로 해외에 유출하거나 기술을 탈취하면 징벌적 손해배상이 적용된다?',
    answer: true,
    explanation: '⭕ 정답은 O입니다! 최근 법령 강화로 고의적인 특허 침해 및 핵심기술 탈취 시 실제 손해액의 최대 5배까지 배상하도록 하는 징벌적 손해배상 제도가 시행되고 있으며, 지식재산처 기술경찰이 집중 수사합니다.'
  }
];

let currentQuizIdx = 0;
let quizAnswered = false;

function renderQuiz() {
  const current = quizList[currentQuizIdx];
  document.getElementById('quizQuestion').innerText = current.question;
  document.getElementById('quizProgress').innerText = `문제 ${currentQuizIdx + 1} / ${quizList.length}`;
  
  const expBox = document.getElementById('quizExplanation');
  expBox.classList.add('hidden');
  expBox.innerText = '';

  const nextBtn = document.getElementById('nextQuizBtn');
  nextBtn.classList.add('hidden');

  quizAnswered = false;
}

function handleQuizAnswer(userChoice) {
  if (quizAnswered) return;
  quizAnswered = true;

  const current = quizList[currentQuizIdx];
  const expBox = document.getElementById('quizExplanation');
  const isCorrect = (userChoice === current.answer);

  expBox.innerHTML = `
    <div style="font-weight:700; margin-bottom:6px; color:#111827; font-size:1.05rem;">
      ${isCorrect ? '✓ 정답입니다!' : '✕ 오답입니다!'}
    </div>
    <div style="color:#4b5563; line-height:1.6;">${current.explanation}</div>
  `;
  expBox.classList.remove('hidden');

  const nextBtn = document.getElementById('nextQuizBtn');
  if (currentQuizIdx < quizList.length - 1) {
    nextBtn.innerText = '다음 문제 ▶';
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.innerText = '처음부터 다시 풀기 🔄';
    nextBtn.classList.remove('hidden');
  }
}

function nextQuiz() {
  if (currentQuizIdx < quizList.length - 1) {
    currentQuizIdx++;
  } else {
    currentQuizIdx = 0;
  }
  renderQuiz();
}

// 4. "나는 지식재산처로부터 어떤 도움을 받을 수 있을까?" 맞춤 혜택 진단 시스템
const roleData = {
  individual: {
    title: '일반 국민 · 개인 발명가 · 학생 맞춤 혜택',
    checkItems: [
      { id: 'ind_1', title: '좋은 생활 아이디어가 떠올랐는데 특허 출원 비용이나 변리사 선임료가 부담돼요.', category: 'cost' },
      { id: 'ind_2', title: '내 아이디어가 이미 다른 사람에 의해 등록되어 있는지 무료로 검색하고 싶어요.', category: 'search' },
      { id: 'ind_3', title: '특허 명세서를 혼자서 쓰는 게 너무 어렵고 출원 절차를 1:1로 지도받고 싶어요.', category: 'counsel' },
      { id: 'ind_4', title: '내 발명품을 공모전에 출품하거나 시제품을 제작해 대중에게 선보이고 싶어요.', category: 'contest' }
    ]
  },
  startup: {
    title: '예비 창업자 · 초기 스타트업 맞춤 혜택',
    checkItems: [
      { id: 'sta_1', title: '부동산이나 매출 담보는 없지만 보유한 특허 기술력으로 사업화 자금을 대출/투자받고 싶어요.', category: 'finance' },
      { id: 'sta_2', title: '창업 3~5년 이내 기업으로서 특허·디자인·상표를 패키지로 빠르게 등록하고 싶어요.', category: 'fast' },
      { id: 'sta_3', title: '우리 스타트업만의 핵심 원천기술에 대해 체계적인 특허 포트폴리오를 구축하고 싶어요.', category: 'strategy' },
      { id: 'sta_4', title: '정부의 R&D 지원 사업이나 공공 특허 이전(기술이전)을 연계받고 싶어요.', category: 'transfer' }
    ]
  },
  sme: {
    title: '중소·벤처기업 &amp; 연구원 맞춤 혜택',
    checkItems: [
      { id: 'sme_1', title: '핵심 연구 인력의 이직이나 영업비밀/국가핵심기술 유출이 극도로 우려돼요.', category: 'security' },
      { id: 'sme_2', title: '해외(미국, 유럽, 중국 등) 시장에 진출하려는데 현지 특허 침해 소송 위험을 미리 차단하고 싶어요.', category: 'global' },
      { id: 'sme_3', title: '해외 전시회나 이커머스에서 우리 제품의 위조품(짝퉁)이나 모방 상품이 유통되고 있어요.', category: 'fake' },
      { id: 'sme_4', title: 'R&D 연구과제를 시작하기 전 전 세계 6억 건 특허 데이터를 분석해 중복 연구를 피하고 싶어요.', category: 'rnd_patent' }
    ]
  },
  merchant: {
    title: '소상공인 · 자영업자 맞춤 혜택',
    checkItems: [
      { id: 'mer_1', title: '힘들게 키운 맛집 식당/카페 이름(상호)이나 간판 로고를 남들이 베끼지 못하게 독점하고 싶어요.', category: 'trademark' },
      { id: 'mer_2', title: '누군가 내 가게 상호와 비슷한 상표를 먼저 등록했다며 경고장을 보내왔어요.', category: 'dispute' },
      { id: 'mer_3', title: '자영업자·전통시장 상인으로서 상표 출원 시 전문가 무료 상담이나 수수료 감면을 받고 싶어요.', category: 'aid' },
      { id: 'mer_4', title: '우리 매장의 시그니처 포장 패키지나 굿즈 디자인 권리를 선점하고 싶어요.', category: 'design' }
    ]
  }
};

// 지원 프로그램 라이브러리
const programDirectory = {
  cost: {
    icon: '💰',
    badge: '비용 전액/감면 지원',
    title: '공익변리사 특허상담센터 &amp; 출원 수수료 감면',
    summary: '경제적 여건이 취약한 개인, 학생, 영세발명가를 위해 공익변리사가 무료로 출원 서류 작성을 대리하고 심판 변론을 지원하며, 법정 수수료를 최대 85%까지 감면해 드립니다.',
    dept: '지식재산처 산업재산정책국',
    linkText: '공익변리사 무료상담 예약',
    url: 'https://www.picc.org'
  },
  search: {
    icon: '🔍',
    badge: '대국민 무료 검색',
    title: '특허정보넷 키프리스(KIPRIS) &amp; AI 유사특허 분석',
    summary: '전 세계 6억 건의 특허, 실용신안, 상표, 디자인 공보를 국민 누구나 무료로 무제한 열람할 수 있습니다. 최근 도입된 일상 언어 기반 AI 검색으로 선행기술을 5분 만에 조회할 수 있습니다.',
    dept: '지식재산처 정보고객정책국',
    linkText: '키프리스(KIPRIS) 무료 검색',
    url: 'http://www.kipris.or.kr'
  },
  counsel: {
    icon: '👨‍🏫',
    badge: '1:1 밀착 멘토링',
    title: '지역지식재산센터(RIPC) 국민 디딤돌 프로그램',
    summary: '전국 27개 지역 센터에서 전문 컨설턴트가 발명 아이디어 구체화부터 도면 작성, 3D 프린팅 시제품 제작, 출원까지 원스톱으로 무료 지도합니다.',
    dept: '지식재산처 지역산업재산과',
    linkText: '지역지식재산센터 찾기',
    url: 'https://www.ripc.org'
  },
  contest: {
    icon: '🏆',
    badge: '발명 사업화 &amp; 포상',
    title: '대한민국 발명특허대전 &amp; 생활발명코리아',
    summary: '여성, 청소년, 일반 국민의 우수 아이디어를 발굴하여 대통령상 시상, 시제품 제작 지원, 크라우드 펀딩 연계 및 TV 홈쇼핑 입점까지 전폭 지원합니다.',
    dept: '지식재산처 발명정책과',
    linkText: '생활발명코리아 안내',
    url: 'https://www.womanidea.net'
  },
  finance: {
    icon: '📈',
    badge: 'IP 금융 우대 지원',
    title: '지식재산(IP) 담보대출 &amp; IP 가치평가 지원사업',
    summary: '우수 특허를 보유한 스타트업에게 감정평가 비용의 90% 이상을 정부가 지원하고, 시중 은행에서 부동산 없이 특허권만으로 저금리 사업화 자금(수억 원~수십억 원)을 대출받을 수 있도록 보증합니다.',
    dept: '지식재산처 산업재산활용과',
    linkText: 'IP 금융 포털 바로가기',
    url: 'https://www.kibo.or.kr'
  },
  fast: {
    icon: '⚡',
    badge: '신속 권리화',
    title: '스타트업 지식재산 바우처 &amp; 우선심사 제도',
    summary: '창업기업이 원하는 IP 서비스(국내외 출원, 특허조사, 브랜드 개발 등)를 골라 쓸 수 있는 바우처(최대 2,000만원)를 지급하며, 일반 심사보다 1년 이상 빠른 우선심사를 적용합니다.',
    dept: '지식재산처 특허심사기획국',
    linkText: 'IP 바우처 사업 공고',
    url: 'https://www.kipa.org'
  },
  strategy: {
    icon: '🧭',
    badge: '특허전략 컨설팅',
    title: 'IP-R&D 연계 바우처 및 맞춤형 특허망 구축',
    summary: '특허 전문가와 R&D 전문가가 한 팀이 되어, 경쟁사 핵심 특허를 회피하고 원천·공백 기술을 선점할 수 있는 촘촘한 특허 방어막 설계를 밀착 지원합니다.',
    dept: '지식재산처 산업재산창출과',
    linkText: 'IP-R&D 지원사업 안내',
    url: 'https://www.ippro.or.kr'
  },
  transfer: {
    icon: '🤝',
    badge: '공공기술 이전',
    title: '국가 공공연구기관 미활용 특허 무상·염가 이전 지원',
    summary: '대학 및 정부출연연구소가 보유한 유망 특허 기술을 민간 스타트업에게 무상 또는 파격적인 조건으로 이전하여 사업화 성공률을 높여드립니다.',
    dept: '지식재산처 지식재산거래센터',
    linkText: '지식재산거래정보망',
    url: 'https://www.ipmarket.or.kr'
  },
  security: {
    icon: '🚨',
    badge: '기술안보 긴급 대응',
    title: '지식재산처 기술경찰(특사경) 수사 및 기술유출 신고센터',
    summary: '석·박사 및 변리사 출신의 첨단 전문 수사관이 기술 유출 혐의를 직접 디지털 포렌식으로 조사하여 영업비밀 침해를 신속히 차단하고 형사 처벌을 진행합니다.',
    dept: '지식재산처 기술디자인특별사법경찰과',
    linkText: '산업기술유출 24시 신고센터',
    url: 'https://www.kipo.go.kr'
  },
  global: {
    icon: '🌐',
    badge: '해외 진출 안심 케어',
    title: '국제 지식재산권 분쟁 대응 컨설팅 지원',
    summary: '해외 수출 과정에서 발생하는 특허 괴물(NPE)의 경고장이나 침해 소송에 대해 국내외 전문 로펌 대응 비용 및 전략 수립 비용(최대 1억원 한도)을 지원합니다.',
    dept: '지식재산처 산업재산보호정책과',
    linkText: '국제지재권분쟁센터',
    url: 'https://www.ip-navi.or.kr'
  },
  fake: {
    icon: '🛡️',
    badge: 'K-브랜드 위조 근절',
    title: '해외 K-브랜드 위조상품 차단 및 지재권 분쟁 대응센터',
    summary: '중국, 동남아 등 해외 대형 이커머스에서 무단 복제된 짝퉁 상품의 유통을 모니터링하여 즉각 판매 중단(Takedown) 조치하고 현지 단속을 지원합니다.',
    dept: '지식재산처 상표특별사법경찰',
    linkText: 'K-브랜드 보호 종합포털',
    url: 'https://www.kipo.go.kr'
  },
  rnd_patent: {
    icon: '📊',
    badge: '빅데이터 분석',
    title: '국가전략기술 특허 빅데이터 센터 분석 리포트',
    summary: '이차전지, 반도체, 미래 모빌리티 등 첨단 분야의 전 세계 특허 출원 동향을 국가별·기업별로 심층 분석하여 R&D 실패 위험을 원천 차단하는 지표를 제공합니다.',
    dept: '지식재산처 특허빅데이터담당관',
    linkText: '특허빅데이터 분석리포트 열람',
    url: 'https://www.kipo.go.kr'
  },
  trademark: {
    icon: '🏷️',
    badge: '상표 권리 독점',
    title: '소상공인 IP(지식재산) 역량강화 지원사업',
    summary: '지역 소상공인과 골목가게 상인들을 위해 상호와 로고 디자인 개발, 그리고 상표 출원 대리 비용을 최대 80%까지 지원하여 상표권 분쟁을 사전 예방합니다.',
    dept: '지식재산처 지역산업재산과',
    linkText: '소상공인 IP 지원 신청',
    url: 'https://www.ripc.org'
  },
  dispute: {
    icon: '⚖️',
    badge: '무료 분쟁조정',
    title: '산업재산권 분쟁조정위원회 (소송 없는 신속 화해)',
    summary: '법원에 비싼 소송 비용을 들이지 않고도, 법조인과 교수 등 중립적인 전문가로 구성된 위원회를 통해 3개월 이내에 상표·특허 분쟁을 원만하고 무료로 합의·해결합니다.',
    dept: '지식재산처 산업재산분쟁조정위원회',
    linkText: '분쟁조정 신청 포털',
    url: 'https://www.kipo.go.kr'
  },
  aid: {
    icon: '🤝',
    badge: '소상공인 안심 동행',
    title: '전통시장·골목상권 지식재산 지킴이 &amp; 출원 수수료 면제',
    summary: '소상공인 및 간이과세자를 대상으로 출원 관납료 면제 혜택과 함께, 지식재산 전문 컨설턴트가 직접 사업장을 방문하는 찾아가는 1:1 권리화 상담을 무료 제공합니다.',
    dept: '지식재산처 산업재산정책국',
    linkText: '소상공인 감면 안내',
    url: 'https://www.patent.go.kr'
  },
  design: {
    icon: '🎨',
    badge: '디자인 지식재산화',
    title: '소상공인 브랜드·패키지 디자인 개발 및 권리화 지원',
    summary: '독창적인 제품 포장 박스, 매장 굿즈, 용기 디자인을 전문 디자이너와 매칭하여 개발해 드리고 디자인권 등록까지 일괄 지원합니다.',
    dept: '지식재산처 디자인심사과',
    linkText: '지역지식재산센터 디자인 지원',
    url: 'https://www.ripc.org'
  }
};

let selectedRole = 'individual';

function goToStep(stepNumber) {
  const step1 = document.getElementById('surveyStep1');
  const step2 = document.getElementById('surveyStep2');
  const result = document.getElementById('surveyResult');

  if (stepNumber === 1) {
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    result.classList.add('hidden');
  } else if (stepNumber === 2) {
    // 선택된 유형 가져오기
    const selectedRadio = document.querySelector('input[name="userRole"]:checked');
    if (selectedRadio) {
      selectedRole = selectedRadio.value;
    }

    // 체크리스트 동적 렌더링
    renderChecklist(selectedRole);

    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    result.classList.add('hidden');
  }
}

function renderChecklist(roleKey) {
  const container = document.getElementById('checklistContainer');
  const role = roleData[roleKey] || roleData.individual;

  let html = '';
  role.checkItems.forEach((item, index) => {
    html += `
      <label class="check-item" for="${item.id}">
        <input type="checkbox" id="${item.id}" value="${item.category}" ${index === 0 ? 'checked' : ''}>
        <div class="check-item-content">
          <div class="check-item-title">${item.title}</div>
          <div class="check-item-desc">관련 항목을 체크하시면 지식재산처의 해당 전담 지원사업과 연계해 드립니다.</div>
        </div>
      </label>
    `;
  });

  container.innerHTML = html;
}

function calculateBenefits() {
  const step2 = document.getElementById('surveyStep2');
  const result = document.getElementById('surveyResult');
  const role = roleData[selectedRole];

  // 체크된 카테고리 수집
  const checkedBoxes = document.querySelectorAll('#checklistContainer input[type="checkbox"]:checked');
  let selectedCategories = Array.from(checkedBoxes).map(cb => cb.value);

  // 아무것도 체크 안 했을 경우 전체 추천
  if (selectedCategories.length === 0) {
    selectedCategories = role.checkItems.map(item => item.category);
  }

  // 타이틀 설정
  document.getElementById('resultRoleTitle').innerHTML = `📌 ${role.title}`;

  // 추천 카드 목록 생성
  const listContainer = document.getElementById('benefitCardList');
  let cardsHtml = '';

  selectedCategories.forEach(cat => {
    const prog = programDirectory[cat];
    if (prog) {
      cardsHtml += `
        <div class="benefit-card">
          <div class="benefit-icon">${prog.icon}</div>
          <div class="benefit-body">
            <span class="benefit-badge">${prog.badge}</span>
            <h4 class="benefit-name">${prog.title}</h4>
            <p class="benefit-summary">${prog.summary}</p>
            <div class="benefit-action-row">
              <span class="benefit-dept">담당부서: ${prog.dept}</span>
              <a href="${prog.url}" target="_blank" rel="noopener noreferrer" class="benefit-direct-link">
                ${prog.linkText} &rarr;
              </a>
            </div>
          </div>
        </div>
      `;
    }
  });

  listContainer.innerHTML = cardsHtml;

  step2.classList.add('hidden');
  result.classList.remove('hidden');

  // 부드럽게 결과 영역으로 스크롤 이동
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetSurvey() {
  goToStep(1);
}

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();
  renderChecklist('individual');
});

