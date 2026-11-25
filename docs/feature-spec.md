# 포트폴리오 웹 페이지 기능 명세서

| 항목 | 내용 |
| --- | --- |
| 문서 상태 | 초안 |
| 작성일 | 2026-11-25 |
| 대상 | `PORTFOLIO.md`를 Angular로 만든 단일 포트폴리오 페이지 |
| 핵심 요구 | 화면에서 읽는 페이지이면서 A4 용지로 바로 인쇄하고, A4 PDF 파일로 내려받을 수 있을 것 |

## 1. 개요

### 1.1 목적

`PORTFOLIO.md`에 정리한 경력, 프로젝트, 학력을 한 장짜리 웹 페이지로 공개합니다. 채용 담당자가 링크로 열어 보거나, 인쇄 버튼으로 A4 용지에 인쇄하거나, PDF 버튼으로 A4 PDF 파일을 내려받을 수 있게 합니다. 화면, 인쇄, PDF는 모두 같은 HTML을 쓰고 CSS만 다르게 적용합니다. PDF는 인쇄 스타일을 그대로 써서 빌드할 때 미리 만들어 두므로, 인쇄본과 PDF의 모양이 같습니다.

### 1.2 범위

| 포함 | 제외 |
| --- | --- |
| 단일 페이지(`/`) 구성과 섹션 내비게이션 | 여러 페이지 라우팅, 블로그, 게시판 |
| 라이트 모드 고정 | 다크 모드와 테마 전환 토글 |
| A4 인쇄 버튼과 인쇄 전용 스타일 | 요청이 올 때마다 서버에서 PDF를 만드는 기능 |
| 빌드 시 A4 PDF 생성과 내려받기 버튼 | 브라우저에서 화면을 이미지로 떠서 PDF로 만드는 라이브러리(html2pdf, jsPDF 등) |
| 빌드 시 정적 HTML 생성(prerender)과 정적 호스팅 배포 | 백엔드 API, 데이터베이스, 관리자 화면 |
| 한국어 본문 | 다국어 전환 (2차 검토) |

### 1.3 용어

| 용어 | 뜻 |
| --- | --- |
| 화면 모드 | 브라우저에서 페이지를 볼 때 적용되는 레이아웃 |
| 인쇄 모드 | `@media print`가 적용된 레이아웃. 인쇄 미리보기, 브라우저의 PDF 저장, 빌드 시 PDF 생성에 모두 쓰임 |
| PDF 내보내기 | 빌드 단계에서 인쇄 모드로 렌더링한 페이지를 A4 PDF 파일로 만들어 배포하고, 페이지에서 내려받게 하는 기능 |
| 콘텐츠 데이터 | 페이지에 표시할 내용을 담은 TypeScript 데이터 파일 |

## 2. 콘텐츠 구조

페이지 섹션은 `PORTFOLIO.md`의 순서를 그대로 따릅니다.

| 순서 | 섹션 | 원본 (`PORTFOLIO.md`) | 표시 내용 |
| --- | --- | --- | --- |
| 1 | 머리말 (`header`) | `# 이재훈 · 0x1a84`와 소개 문단 | 이름, 핸들, 아이콘, 소개 문단, 연락 링크 |
| 2 | 경력 | `## 경력` | ITX 코리아, 서비스와 물류, 웹 개발 순으로 묶은 근무처·직무·기간·주요 업무 목록 |
| 3 | 역량 | `## 역량` | 분야별 역량 표, 관심 분야 문단 |
| 4 | 프로젝트 | `## 프로젝트` | 프로젝트 카드 (제목, 한 줄 설명, 세부 항목, 사용 기술 태그) |
| 5 | 학력 | `## 학력` | 학교, 학과, 기간, 상태 |
| 6 | 이력서 | `## 이력서` | 국문 이력서 PDF 링크 |
| 7 | 꼬리말 (`footer`) | 없음 | 저작권, 최종 갱신일, 저장소 링크 |

### 2.1 콘텐츠 데이터 모델

내용은 컴포넌트 템플릿에 직접 쓰지 않고 `src/app/data/portfolio.data.ts`에 타입을 붙여 둡니다. 템플릿은 이 데이터를 반복 출력하기만 합니다.

```ts
export interface Portfolio {
  profile: {
    name: string;          // 이재훈
    handle: string;        // 0x1a84
    summary: string;       // 소개 문단
    links: ContactLink[];
  };
  experienceGroups: ExperienceGroup[]; // ITX 코리아 → 서비스와 물류 → 웹 개발
  projects: Project[];
  education: Education[];
  resume: { label: string; href: string } | null;
  updatedAt: string;       // ISO 날짜. footer와 인쇄본에 표시
}

export interface Experience {
  organization: string;    // 마시모두띠 잠실점
  role: string;            // 패션 어드바이저
  duties: string[];
}

export interface Project {
  id: string;              // howto-dig-fashion (앵커와 key로 사용)
  title: string;
  subtitle: string;        // 패션 학습과 매장 운영
  description: string;
  highlights: { label: string; text: string }[];
  stack: string[];
  url?: string;
}

export interface Education {
  school: string;
  major: string;
  period: string;          // 2023–2026
  status?: string;         // 휴학
  gpa?: string;            // 3.87
}

export interface ContactLink {
  kind: 'email' | 'github' | 'web';
  label: string;
  href: string;
  printText: string;       // 인쇄본에 글자로 찍을 값 (예: github.com/0x1a84)
}
```

- `PORTFOLIO.md`가 원본입니다. 내용을 바꾸면 `portfolio.data.ts`도 같은 커밋에서 함께 고칩니다 (CLAUDE.md의 Markdown 규칙).
- 연락처(이메일, 전화번호)는 공개해도 되는 값만 넣습니다. 전화번호는 기본으로 넣지 않습니다.

## 3. 기능 요구사항

우선순위: **필수**는 1차 배포에 반드시 포함, **권장**은 1차에 넣되 일정에 따라 미룰 수 있음, **선택**은 2차 검토.

### 3.1 페이지 구성

| ID | 우선순위 | 요구사항 | 인수 기준 |
| --- | --- | --- | --- |
| FR-01 | 필수 | 2장의 섹션을 한 페이지에 순서대로 표시한다. | 모든 섹션이 `section` 요소와 `h2` 제목을 가진다. `h1`은 이름 하나뿐이다. |
| FR-02 | 필수 | 각 섹션에 앵커 ID를 두고 상단 내비게이션에서 해당 섹션으로 이동한다. | `/#projects`처럼 해시가 붙은 주소로 열면 해당 섹션으로 스크롤된다. |
| FR-03 | 권장 | 스크롤 위치에 따라 내비게이션의 현재 섹션을 강조한다. | `IntersectionObserver`로 구현하고, `aria-current="true"`를 현재 항목에 붙인다. JS가 없어도 링크 이동은 된다. |
| FR-04 | 필수 | 프로젝트 카드에 사용 기술을 태그로 표시한다. | `stack` 배열의 각 항목이 목록(`ul > li`)으로 렌더링된다. |
| FR-05 | 필수 | 외부 링크는 새 탭으로 연다. | `target="_blank" rel="noopener noreferrer"`가 붙어 있다. |
| FR-06 | 필수 | 이력서 PDF 링크를 제공한다. | 링크가 `public/files/resume.pdf`를 가리키고 404가 나지 않는다. 이력서 PDF는 공개하기로 확정했다 (2026-11-25). |

### 3.2 인쇄

| ID | 우선순위 | 요구사항 | 인수 기준 |
| --- | --- | --- | --- |
| FR-10 | 필수 | 화면에 "A4로 인쇄" 버튼을 둔다. 누르면 브라우저 인쇄 대화상자를 연다. | 버튼 클릭 시 `window.print()`가 호출된다. 버튼은 `button` 요소이고 키보드로 누를 수 있다. |
| FR-11 | 필수 | 인쇄 용지는 A4 세로로 고정한다. | `@page { size: A4 portrait; }`가 적용되어 인쇄 미리보기 기본 용지가 A4로 잡힌다 (Chrome, Edge 기준). |
| FR-12 | 필수 | 인쇄 시 화면 전용 요소를 숨긴다. | 내비게이션, 인쇄 버튼, 맨 위로 버튼 등 `.screen-only` 요소가 인쇄본에 나오지 않는다. |
| FR-13 | 필수 | 인쇄본은 항상 라이트 색상으로 출력한다. | 시스템이 다크 모드여도 흰 바탕에 어두운 글자로 인쇄된다. |
| FR-14 | 필수 | 카드, 표의 행, 제목이 페이지 경계에서 잘리지 않는다. | 프로젝트 카드와 경력 항목에 `break-inside: avoid`, 제목에 `break-after: avoid`가 적용된다. |
| FR-15 | 필수 | 링크는 인쇄본에서도 주소를 알 수 있어야 한다. | 외부 링크 뒤에 `printText` 또는 `attr(href)`가 괄호로 출력된다. 내부 앵커(`#...`)는 출력하지 않는다. |
| FR-16 | 권장 | 인쇄본 머리말에 웹 주소와 갱신일을 표시한다. | `.print-only` 영역에 웹 주소와 갱신일이 각각 한 줄로 인쇄된다 (예: "웹 버전 <배포 주소>", "2026년 11월 25일 기준"). |
| FR-17 | 권장 | 인쇄본은 A4 2쪽 이내로 끝난다. | 현재 `PORTFOLIO.md` 내용으로 인쇄했을 때 2쪽을 넘지 않는다 (검증: 8장 Playwright 테스트). |
| FR-18 | 선택 | 인쇄본 머리말에 웹 페이지로 가는 QR 코드를 넣는다. | 빌드 시 생성한 SVG를 `.print-only`로 표시한다. 런타임 라이브러리는 쓰지 않는다. |
| FR-19 | 선택 | 화면에서 A4 미리보기를 볼 수 있다. | `?view=a4`로 열면 인쇄 스타일을 화면에 적용하고 210mm 폭 용지 틀을 보여 준다. |

### 3.3 PDF 내보내기

PDF는 사용자의 브라우저에서 만들지 않고, 빌드할 때 Playwright(Chromium)로 prerender된 페이지를 인쇄 모드로 렌더링해 만듭니다. 그래서 브라우저 종류나 인쇄 설정과 관계없이 같은 파일이 나오고, 글자를 선택하거나 검색할 수 있으며, 링크도 눌립니다.

| ID | 우선순위 | 요구사항 | 인수 기준 |
| --- | --- | --- | --- |
| FR-30 | 필수 | 화면에 "PDF로 저장" 링크 버튼을 둔다. | `a` 요소가 `files/portfolio.pdf`를 가리키고 `download` 속성으로 파일을 내려받는다. JS가 없어도 동작한다. |
| FR-31 | 필수 | 빌드할 때 A4 PDF를 만든다. | `npm run build` 뒤에 `npm run export:pdf`가 실행되어 `dist/<프로젝트>/browser/files/portfolio.pdf`가 생긴다. 배포 파이프라인에서 두 명령을 차례로 실행한다. |
| FR-32 | 필수 | PDF는 인쇄 모드와 같은 모양이다. | `page.emulateMedia({ media: 'print', colorScheme: 'light' })` 상태에서 `page.pdf({ preferCSSPageSize: true, printBackground: true })`로 만든다. 용지 크기와 여백은 4.1절의 `@page`를 따른다. |
| FR-33 | 필수 | PDF의 글자는 이미지가 아니라 텍스트다. | `pdftotext`로 뽑은 결과에 이름과 모든 섹션 제목이 들어 있다. 사용한 글꼴이 PDF에 포함되어 있다 (`pdffonts`로 확인). |
| FR-34 | 필수 | PDF 안의 외부 링크를 누를 수 있다. | 이메일, 저장소, 웹 주소 링크가 PDF 뷰어에서 열린다. 링크 주소도 글자로 함께 찍힌다 (FR-15). |
| FR-35 | 권장 | PDF 문서 정보를 채운다. | 제목은 페이지 `title`, 언어는 `ko`로 들어간다. `page.pdf({ tagged: true, outline: true })`로 태그와 책갈피(섹션 제목)를 넣는다. |
| FR-36 | 권장 | 파일 이름과 용량을 관리한다. | 내려받는 파일 이름은 `lee-jaehoon-portfolio.pdf` (`download` 속성 값). 용량은 1MB 이하. 글꼴은 서브셋만 포함한다. |
| FR-37 | 권장 | 내용이 바뀌면 PDF도 다시 만든다. | PDF는 저장소에 커밋하지 않고 빌드 산출물로만 둔다. 그래서 배포할 때마다 최신 내용으로 다시 생성된다. |
| FR-38 | 선택 | PDF 버튼 옆에 쪽수와 용량을 표시한다. | 빌드 스크립트가 쪽수와 용량을 `files/portfolio.json`에 기록하고, 템플릿이 빌드 시 읽어 "A4 2쪽, 180KB"처럼 표시한다. |

### 3.4 테마

| ID | 우선순위 | 요구사항 | 인수 기준 |
| --- | --- | --- | --- |
| FR-20 | 필수 | 시스템 설정과 관계없이 항상 라이트 모드로 표시한다. | `:root`에 `color-scheme: light`를 두고 `prefers-color-scheme: dark` 규칙을 두지 않는다. 시스템이 다크 모드여도 화면 색이 같다. 컴포넌트 스타일에는 색상 값을 직접 쓰지 않는다. |

## 4. 인쇄 상세 명세

### 4.1 용지와 여백

```css
@page {
  size: A4 portrait;     /* 210mm × 297mm */
  margin: 14mm 16mm;     /* 본문 폭 178mm */
}
```

- 브라우저가 넣는 머리글·바닥글(날짜, URL, 쪽 번호)은 CSS로 끌 수 없습니다. 인쇄 버튼 옆에 "인쇄 대화상자에서 '머리글과 바닥글'을 끄면 깔끔하게 인쇄됩니다"라는 안내를 `.screen-only`로 둡니다.
- 쪽 번호는 `@page` 여백 상자(`@bottom-center`)가 Chrome 131 이후 지원되므로 권장 수준으로 넣고, 지원하지 않는 브라우저에서는 생략되어도 됩니다.

### 4.2 인쇄 레이아웃

| 요소 | 화면 모드 | 인쇄 모드 |
| --- | --- | --- |
| 글꼴 크기 | 본문 16px 기준 | 본문 10pt, 제목 14–18pt |
| 단 구성 | 모바일 1단, 넓은 화면 2단 카드 | 1단. 경력은 2열 표 형태 |
| 색상 | 테마 토큰 | 흰 바탕, 본문 `#111`, 보조 `#555`, 강조색은 테두리·태그에만 |
| 배경·그림자 | 사용 | 제거 (`box-shadow: none`, 배경색 제거) |
| 내비게이션·버튼 | 표시 | 숨김 |
| 링크 | 밑줄 + 색상 | 검정 글자 + 괄호 안 주소 |
| 아이콘 | SVG | SVG 유지 (흑백 인쇄에서도 구분 가능해야 함) |

인쇄 스타일은 `src/styles/print.css` 한 파일에 모읍니다. 컴포넌트별 인쇄 예외가 필요하면 해당 컴포넌트 CSS 안의 `@media print` 블록에 씁니다.

```css
@media print {
  :root {
    /* 다크 모드 여부와 관계없이 라이트 토큰으로 덮어씀 */
    --color-bg: #fff;
    --color-text: #111;
    --color-text-muted: #555;
    --color-border: #ccc;
    color-scheme: light;
  }
  .screen-only { display: none; }
  .print-only { display: block; }
  .project-card, .experience-item { break-inside: avoid; }
  h2, h3 { break-after: avoid; }
  a[href^="http"]::after { content: " (" attr(data-print-text) ")"; }
}
```

### 4.3 인쇄 버튼 동작

1. 사용자가 "A4로 인쇄" 버튼을 누릅니다.
2. `PrintService.print()`가 `window.print()`를 호출합니다. SSR(prerender) 중에는 `isPlatformBrowser`로 막아 오류가 나지 않게 합니다.
3. `beforeprint` 이벤트에서 접혀 있는 내용(예: `details`)을 모두 펼치고, `afterprint`에서 원래 상태로 되돌립니다.
4. 단축키(Ctrl/Cmd + P)로 인쇄해도 같은 결과가 나와야 하므로, 인쇄 결과는 버튼 동작이 아니라 CSS에 의존하게 만듭니다.

### 4.4 PDF 생성 스크립트

`scripts/export-pdf.mjs`가 빌드 산출물을 대상으로 다음 순서로 동작합니다.

1. `dist/<프로젝트>/browser`를 로컬 정적 서버로 띄웁니다 (Node 내장 `http` 모듈, 임의 포트).
2. Playwright Chromium으로 `/`를 엽니다. `document.fonts.ready`를 기다려 웹 폰트가 모두 불러와진 뒤에 진행합니다.
3. 화면 너비 1360px, `page.emulateMedia({ media: 'screen', colorScheme: 'light' })`로 화면 디자인을 그대로 씁니다. `<html data-export="pdf">`를 붙여 `src/styles/export.css`의 규칙(여백 축소, 화면 전용 요소 숨김, 인쇄용 사진)을 적용합니다.
4. 아래 옵션으로 PDF를 만들어 `files/portfolio.pdf`에 저장합니다. 페이지에는 내려받기 버튼을 두지 않습니다.

   ```js
   await page.pdf({
     path: outFile,
     preferCSSPageSize: true,  // export.css의 @page portfolio-export (A4, 여백 0)
     scale: 793.7 / 1360,      // 1360px 화면을 A4 너비에 맞춤
     printBackground: true,    // 필드, 배경색, 구분선 색 유지
     tagged: true,             // 접근성 태그
     outline: true,            // 섹션 제목으로 책갈피 생성
   });
   ```

5. 쪽수가 FR-17의 기준(2쪽)을 넘거나 파일이 1MB를 넘으면 0이 아닌 코드로 종료해 배포를 막습니다.

브라우저 인쇄 대화상자의 "PDF로 저장"과 달리 빌드 PDF에는 브라우저 머리글·바닥글이 들어가지 않습니다. 사용자가 인쇄 버튼으로 직접 PDF를 저장하는 경로도 막지 않고 그대로 둡니다.

## 5. 비기능 요구사항

| ID | 구분 | 요구사항 |
| --- | --- | --- |
| NFR-01 | 반응형 | 모바일 우선으로 작성하고, 360px 너비에서 가로 스크롤이 생기지 않는다. 넓은 화면은 `min-width` 미디어 쿼리로 확장한다. |
| NFR-02 | JS 없이 읽기 | 빌드 시 prerender한 HTML에 본문 내용이 모두 들어 있어, 스크립트를 꺼도 읽고 인쇄할 수 있다. |
| NFR-03 | 접근성 | 시맨틱 태그와 제목 순서를 지킨다. 모든 `img`에 `alt`가 있다. 색 대비는 WCAG AA(본문 4.5:1) 이상이다. Lighthouse 접근성 95점 이상. |
| NFR-04 | 성능 | 초기 JS 전송량 gzip 100KB 이하. Lighthouse 성능 90점 이상 (모바일). |
| NFR-05 | 글꼴 | 화면과 인쇄본의 글자 모양을 맞추기 위해 Pretendard 서브셋을 `public/fonts/`에 두고 직접 제공한다. `font-display: swap`. |
| NFR-06 | 브라우저 | Chrome, Edge, Safari, Firefox 최신 2개 버전. 인쇄 결과는 Chrome·Edge 기준으로 검증하고 Safari·Firefox는 깨지지 않는 수준이면 된다. |
| NFR-07 | SEO·공유 | `title`, `meta description`, Open Graph 태그(제목, 설명, 이미지)를 넣는다. |
| NFR-08 | 개인 정보 | 이력서 PDF, 연락처는 공개 동의가 확인된 항목만 배포한다. |

## 6. 기술 구성

### 6.1 스택

| 항목 | 선택 | 이유 |
| --- | --- | --- |
| 프레임워크 | Angular (최신 안정 버전), standalone 컴포넌트 | NgModule 없이 컴포넌트 단위로 구성 |
| 상태 | Signals | 현재 섹션 강조, 미리보기 모드 정도만 상태로 다룸 |
| 변경 감지 | zoneless (`provideZonelessChangeDetection`) | 번들 크기 축소 |
| 렌더링 | `@angular/ssr`의 빌드 시 prerender (`outputMode: "static"`) | 정적 호스팅, NFR-02 충족 |
| 스타일 | 순수 CSS + CSS 변수 | CLAUDE.md의 디자인 토큰 규칙 |
| 테스트 | 단위: Angular 기본 테스트 러너 / E2E·인쇄: Playwright | 인쇄 결과를 PDF로 만들어 검증 |
| PDF 생성 | Playwright Chromium `page.pdf()` (빌드 후 스크립트) | 텍스트 PDF, 글꼴 포함, 링크 유지. 테스트와 같은 도구를 씀 |
| 배포 | GitHub Pages 또는 Cloudflare Pages | 정적 파일만 배포 |

### 6.2 디렉터리 구조

```
src/
  index.html
  main.ts
  styles/
    tokens.css            # :root 디자인 토큰 (라이트 모드만)
    base.css              # 리셋, 타이포그래피
    print.css             # @page와 인쇄 전용 규칙
  app/
    app.component.ts
    data/
      portfolio.data.ts   # 콘텐츠 데이터 (2.1절)
      portfolio.model.ts  # 인터페이스
    sections/
      profile-header/
      experience-section/
      project-section/
        project-card/
      education-section/
      resume-section/
    layout/
      site-nav/
      site-footer/
    print/
      print-button/
      print.service.ts
public/
  images/                 # icon.svg, og-image.png
  fonts/
  files/                  # resume.pdf (references/에서 복사). portfolio.pdf는 빌드 때 생성
scripts/
  export-pdf.mjs          # 빌드 후 A4 PDF 생성 (4.4절)
e2e/
  print.spec.ts
  pdf.spec.ts
references/               # 원본 자료 (빌드에 포함하지 않음)
```

### 6.3 컴포넌트

| 컴포넌트 | 입력 | 역할 |
| --- | --- | --- |
| `ProfileHeaderComponent` | `profile` | 이름(`h1`), 소개, 연락 링크, 인쇄용 웹 주소 |
| `SiteNavComponent` | 섹션 목록 | 앵커 내비게이션, 현재 섹션 강조 (`.screen-only`) |
| `ExperienceSectionComponent` | `groups` | 분야별로 묶은 경력 목록 |
| `ProjectSectionComponent` | `projects` | 프로젝트 카드 목록 |
| `ProjectCardComponent` | `project` | 카드 하나. 기술 태그 포함 |
| `EducationSectionComponent` | `education` | 학력 목록 |
| `ResumeSectionComponent` | `resume` | PDF 링크. `null`이면 렌더링하지 않음 |
| `PrintButtonComponent` | 없음 | 인쇄 버튼과 안내 문구 (`.screen-only`) |
| `SiteFooterComponent` | `updatedAt`, `repoUrl` | 영어 꼬리말: 맺음말, 갱신일, 저장소 링크 (`lang="en"`) |

모든 컴포넌트는 `ChangeDetectionStrategy.OnPush`와 `input()` 신호 입력을 씁니다. 스타일은 `styleUrl`로 분리된 CSS 파일에 둡니다.

## 7. CLAUDE.md와 맞춰야 할 사항

현재 CLAUDE.md는 빌드 도구 없는 정적 페이지(`index.html` + `assets/`)를 기준으로 쓰여 있습니다. Angular로 진행하면 아래 항목을 CLAUDE.md에 반영해야 합니다.

| 현재 규칙 | Angular에서의 처리 | 조치 |
| --- | --- | --- |
| 진입 페이지는 루트 `index.html`, 자원은 `assets/` | `src/index.html`, 정적 자원은 `public/` | 프로젝트 구성 표를 6.2절 구조로 교체 |
| 인라인 스타일·스크립트 금지 | 빌드가 critical CSS를 `<style>`로 인라인하고, 테마 깜빡임 방지 스크립트가 필요할 수 있음 | `angular.json`에서 `optimization.styles.inlineCritical: false`로 끄거나, 빌드 산출물은 예외로 명시 |
| 바닐라 JS 우선 | Angular 채택 자체가 예외 | "Angular 프로젝트에서는 TypeScript와 Angular API를 쓴다"로 갱신 |
| `<script type="module">` 또는 `defer` | Angular CLI가 자동 처리 | 규칙 삭제 또는 "직접 추가하는 스크립트에만 적용"으로 한정 |
| `.gitignore` | `.angular/` 캐시 추가 필요. 생성된 PDF는 `dist/`에만 생기므로 이미 제외됨 | `.gitignore`에 `.angular/` 추가 |

## 8. 검증

CLAUDE.md의 확인 절차에 인쇄 항목을 더해 다음을 확인합니다.

| 항목 | 방법 | 기준 |
| --- | --- | --- |
| 레이아웃·링크 | 브라우저에서 직접 확인, Playwright로 링크 상태 확인 | 깨진 링크 0개 |
| 반응형 | Playwright 뷰포트 360px, 1280px | `document.documentElement.scrollWidth <= 360` |
| 라이트 고정 | Playwright `colorScheme: 'dark'`로 열어 라이트와 비교 | 배경색이 라이트와 같음 (FR-20) |
| 콘솔 오류 | Playwright `page.on('console')` | 오류 0개 |
| A4 인쇄 쪽수 | `page.emulateMedia({ media: 'print' })` 후 `page.pdf({ preferCSSPageSize: true })`, 쪽수 계산 | 2쪽 이하 (FR-17) |
| 인쇄 숨김 요소 | 인쇄 미디어 에뮬레이션 상태에서 `.screen-only` 가시성 확인 | 모두 보이지 않음 (FR-12) |
| 다크 모드 인쇄 | `colorScheme: 'dark'` + 인쇄 미디어에서 `body` 배경색 확인 | `rgb(255, 255, 255)` (FR-13) |
| 인쇄 시각 회귀 | 생성한 PDF의 각 쪽 스크린샷 비교 | 기준 이미지와 차이 없음 |
| JS 없이 읽기 | `javaScriptEnabled: false`로 열기 | 모든 섹션 제목과 본문이 보임 (NFR-02) |
| PDF 생성 | `npm run build && npm run export:pdf` | `files/portfolio.pdf`가 생기고 스크립트가 0으로 끝남 (FR-31) |
| PDF 용지·쪽수 | 생성된 PDF의 쪽 크기와 쪽수 확인 (`pdfinfo` 또는 `pdf-lib`) | 595×842pt(A4), 2쪽 이하 |
| PDF 텍스트·글꼴 | `pdftotext`, `pdffonts` | 이름과 섹션 제목이 추출되고, 글꼴이 모두 포함됨 (FR-33) |
| PDF 링크 | PDF 주석의 URI 목록 확인 | 데이터의 외부 링크와 일치 (FR-34) |
| PDF 내려받기 | Playwright `page.waitForEvent('download')` 후 버튼 클릭 | 파일 이름이 `lee-jaehoon-portfolio.pdf`이고 내용이 비어 있지 않음 (FR-30, FR-36) |

## 9. 작업 순서와 커밋 단위

CLAUDE.md 규칙에 따라 `feat/<기능명>` 브랜치에서 기능 단위로 커밋합니다.

| 순서 | 브랜치 | 커밋 예시 |
| --- | --- | --- |
| 1 | `chore/angular-setup` | `chore: Angular 프로젝트 생성과 prerender 설정` |
| 2 | `docs/claude-md-angular` | `docs: CLAUDE.md를 Angular 구조에 맞게 갱신` |
| 3 | `feat/design-tokens` | `feat: 디자인 토큰 적용` |
| 4 | `feat/portfolio-sections` | `feat: 포트폴리오 데이터와 섹션 컴포넌트 추가` |
| 5 | `feat/site-nav` | `feat: 섹션 내비게이션과 현재 위치 강조 추가` |
| 6 | `feat/a4-print` | `feat: A4 인쇄 버튼과 인쇄 전용 스타일 추가` |
| 7 | `feat/pdf-export` | `feat: 빌드 시 A4 PDF 생성과 내려받기 버튼 추가` |
| 8 | `feat/print-e2e` | `feat: 인쇄·PDF 쪽수와 반응형 Playwright 테스트 추가` |
| 9 | `chore/deploy` | `chore: 정적 호스팅 배포와 PDF 생성 단계 설정` |

## 10. 결정이 필요한 사항

| # | 질문 | 제안 |
| --- | --- | --- |
| 1 | 인쇄본 분량을 1쪽으로 할지 2쪽으로 할지 | 현재 내용 기준 2쪽. 1쪽이 필요하면 프로젝트 세부 항목을 인쇄본에서 요약형으로 바꿈 |
| 2 | 이력서 PDF와 연락처를 공개할지 | 결정함 (2026-11-25): 이력서 PDF는 전화번호, 주소, 사진이 담긴 그대로 공개한다. 페이지 본문의 연락처는 이메일만 표시한다 |
| 3 | `references/gpt.resume.md`의 내용(핵심 역량, 추가 프로젝트, 패션에 대한 관점)을 페이지에 넣을지 | 1차는 `PORTFOLIO.md` 범위만. 추가하려면 먼저 `PORTFOLIO.md`에 반영 |
| 4 | 배포처와 도메인 | GitHub Pages (`<사용자>.github.io/howto-portfolio`). 이 경우 `baseHref` 설정 필요 |
| 5 | 수동 테마 토글, 영문 버전 | 2차로 미룸 |
| 6 | PDF 파일 이름에 실명을 넣을지 | `lee-jaehoon-portfolio.pdf`. 실명을 빼려면 `0x1a84-portfolio.pdf` |
| 7 | 포트폴리오 PDF와 이력서 PDF를 따로 둘지 | 따로 둠. 포트폴리오 PDF는 페이지에서 자동 생성, 이력서 PDF는 직접 만든 원본 |
