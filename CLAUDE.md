# CLAUDE.md

이 저장소에서 작업할 때 따르는 규칙입니다. 개인 포트폴리오를 정리하고, 이를 정적 웹 페이지로 만드는 것을 기준으로 합니다.

## 프로젝트 구성

| 경로 | 내용 |
| --- | --- |
| `README.md` | 저장소 소개 |
| `PORTFOLIO.md` | 포트폴리오 본문 (경력, 역량, 프로젝트, 학력). 페이지 내용의 원본 |
| `src/` | Angular 앱 소스 (아래 구조 참고) |
| `public/` | 그대로 배포하는 정적 자원 (글꼴, 이미지, 공개 파일) |
| `scripts/` | 빌드 후 A4 PDF 생성(`export-pdf.mjs`), 정적 서버(`serve-static.mjs`) |
| `e2e/` | Playwright 테스트 (화면, 인쇄, PDF) |
| `references/` | 이전 포트폴리오 초안, 아이콘, 이력서 PDF 등 원본 자료. 빌드에 포함하지 않음 |
| `docs/` | 기능 명세서 등 개발 문서 |
| `.claude/skills/` | 이 저장소에서 쓰는 Claude Code 스킬 (아래 "스킬" 참고) |

페이지는 Angular standalone 컴포넌트로 만들고, 빌드할 때 정적 HTML로 prerender합니다. 구조는 `docs/feature-spec.md` 6.2절을 따릅니다.

```
src/
  index.html
  styles.css            # Hallmark 스탬프와 전역 스타일 import
  styles/
    tokens.css          # :root 디자인 토큰 (라이트 모드만)
    fonts.css           # @font-face (public/fonts의 글꼴)
    base.css            # 리셋, 타이포그래피
    layout.css          # 섹션 틀, 버튼 등 공통 규칙
    print.css           # @page와 인쇄 전용 공통 규칙
  app/
    data/               # portfolio.data.ts(콘텐츠), portfolio.model.ts(타입)
    sections/           # 섹션 컴포넌트
    layout/             # 내비게이션, 꼬리말
    print/              # 인쇄 버튼, PrintService
    shared/             # 파이프, 작은 공용 컴포넌트
public/
  fonts/  images/          # dist의 files/portfolio.pdf는 export:pdf가 생성
```

### 명령

| 명령 | 내용 |
| --- | --- |
| `npm start` | 개발 서버 |
| `npm run build` | 정적 HTML 빌드 (`dist/howto-portfolio/browser`) |
| `npm run build:pages` | GitHub Pages용 빌드 (`baseHref: /howto-portfolio/`) |
| `npm run export:pdf` | 빌드 결과를 화면 디자인 그대로 A4 PDF로 생성 (`src/styles/export.css`). 2쪽이나 1MB를 넘으면 실패 |
| `npm run preview` | 빌드 결과를 로컬 정적 서버로 열기 |
| `npm test` | 단위 테스트 (Vitest) |
| `npm run test:e2e` | Playwright 테스트. build와 export:pdf를 먼저 실행 |

## Git

### 초기화

새로 저장소를 만들 때는 기본 브랜치를 `main`으로 둡니다.

```sh
git init -b main
git config user.name "<이름>"
git config user.email "<이메일>"
```

`.gitignore`에는 최소한 다음을 넣습니다.

```gitignore
.DS_Store
node_modules/
dist/
.env
.env.*
*.log
.vscode/
.idea/
.angular/
test-results/
playwright-report/
```

### 커밋 규칙

- **커밋은 기능 단위로 나눕니다.** 하나의 커밋에는 하나의 목적만 담습니다. 예를 들어 "프로젝트 섹션 추가"와 "다크 모드 적용"은 같은 날 작업했더라도 별도 커밋으로 남깁니다.
- 기능을 구성하는 HTML, CSS, JS, 이미지는 같은 커밋에 함께 넣습니다. 파일 종류별로 커밋을 쪼개지 않습니다.
- 서식 정리, 파일 이동, 이름 변경처럼 동작이 바뀌지 않는 변경은 기능 변경과 섞지 않고 따로 커밋합니다.
- 커밋하기 전에 `git status`와 `git diff --staged`로 의도하지 않은 파일이 섞이지 않았는지 확인합니다. `git add -A`보다 파일을 지정해서 추가합니다.
- 커밋 메시지는 다음 형식을 따릅니다.

```
<type>: <요약>

<필요하면 변경 이유와 세부 내용>
```

| type | 용도 |
| --- | --- |
| `feat` | 새 섹션, 페이지, 기능 추가 |
| `fix` | 깨진 링크, 레이아웃 오류 등 버그 수정 |
| `style` | 동작 변화 없는 디자인·서식 조정 |
| `refactor` | 구조 개선 (동작 변화 없음) |
| `docs` | README, PORTFOLIO.md 등 문서 내용 수정 |
| `chore` | 설정, .gitignore, 파일 정리 |

요약은 50자 안팎으로, 무엇을 했는지 현재형으로 씁니다. 예: `feat: 프로젝트 카드에 사용 기술 태그 추가`

### 브랜치

- `main`은 항상 배포 가능한 상태로 유지합니다.
- 기능 작업은 `feat/<기능명>`, 수정은 `fix/<내용>` 브랜치에서 진행한 뒤 `main`에 합칩니다.
- 사용자가 요청하지 않으면 커밋하거나 푸시하지 않습니다.

## 배포

같은 페이지를 두 저장소의 GitHub Pages로 배포합니다. 소스는 `howto-portfolio` 저장소의 `main` 하나뿐이고, `0x1A84.github.io` 저장소에는 빌드 결과만 올립니다.

| 주소 | 저장소 | 배포 브랜치 | 빌드 명령 |
| --- | --- | --- | --- |
| https://0x1a84.github.io/howto-portfolio/ | `0x1A84/howto-portfolio` | `gh-pages` | `npm run build:pages` (`baseHref: /howto-portfolio/`) |
| https://0x1a84.github.io/ | `0x1A84/0x1A84.github.io` | `main` | `npm run build` (`baseHref: /`) |

### 규칙

- 배포는 외부에 공개되는 작업이므로 사용자가 요청할 때만 합니다.
- 두 사이트에는 항상 같은 소스 커밋으로 만든 빌드를 함께 올립니다. 한쪽만 갱신하지 않습니다.
- `0x1A84.github.io` 저장소의 파일은 직접 고치지 않습니다. 고칠 내용은 `howto-portfolio`의 소스에서 고친 뒤 다시 빌드해 올립니다.
- 빌드 결과에는 Jekyll 처리를 막는 빈 `.nojekyll` 파일을 넣습니다.
- 배포 커밋 메시지는 `deploy: <소스 커밋 해시> 빌드 결과`로 씁니다.
- `references/`는 개인 정보가 있어 어느 저장소에도 올리지 않습니다 (`.gitignore`).

### 수동 배포 (현재 방식)

자동 배포를 켜기 전까지는 아래 순서로 직접 배포합니다. 두 빌드 모두 PDF 생성과 e2e 테스트를 통과해야 올립니다.

1. 소스를 `howto-portfolio`의 `main`에 푸시합니다.
2. `npm run build:pages && npm run export:pdf && npm run test:e2e`로 만든 `dist/howto-portfolio/browser`를 `howto-portfolio` 저장소의 `gh-pages` 브랜치에 강제 푸시합니다.
3. `npm run build && npm run export:pdf && npm run test:e2e`로 다시 빌드한 `dist/howto-portfolio/browser`를 `0x1A84.github.io` 저장소의 `main` 브랜치에 강제 푸시합니다.
4. `gh-pages`나 `main`을 처음 만든 직후처럼 Pages 빌드가 시작되지 않으면 `gh api -X POST repos/<저장소>/pages/builds`로 빌드를 요청합니다.
5. 두 주소에서 페이지, 이미지, `files/portfolio.pdf`가 200으로 응답하고 콘솔 오류가 없는지 확인합니다.

### 자동 배포 (준비 중)

`.github/workflows/deploy.yml`은 `howto-portfolio`의 `main`에 푸시하면 빌드, PDF 생성, e2e 테스트를 거쳐 `/howto-portfolio/` 사이트를 배포합니다. 이 파일은 아직 원격에 올리지 못했습니다. 켜려면 다음이 필요합니다.

1. 사용자가 터미널에서 `gh auth refresh -h github.com -s workflow`를 실행해 토큰에 `workflow` 권한을 줍니다. 이 권한이 없으면 `.github/workflows/` 파일이 들어간 푸시는 거절됩니다.
2. 워크플로를 푸시한 뒤 `howto-portfolio`의 Pages 배포 방식을 `gh-pages` 브랜치에서 GitHub Actions로 바꿉니다 (`gh api -X PUT repos/0x1A84/howto-portfolio/pages -f build_type=workflow`).
3. `0x1A84.github.io`에도 자동으로 올리려면, 워크플로에 기본 경로(`npm run build`)로 다시 빌드해 그 저장소의 `main`에 푸시하는 작업을 추가합니다. 다른 저장소에 푸시하려면 `0x1A84.github.io`에만 쓰기 권한이 있는 fine-grained 토큰이나 배포 키를 `howto-portfolio`의 Actions 시크릿으로 등록해야 합니다. 토큰을 만들고 등록하는 일은 사용자가 합니다.

자동 배포를 켠 뒤에는 이 절의 "수동 배포"를 지우고, 표의 배포 브랜치를 실제 방식에 맞게 고칩니다.

## 파일 작성 규칙

### 공통

- 파일과 폴더 이름은 영문 소문자와 하이픈(kebab-case)을 씁니다. 예: `project-card.css`, `profile-photo.jpg`
- 인코딩은 UTF-8, 줄바꿈은 LF, 들여쓰기는 공백 2칸입니다. 파일 끝에는 빈 줄을 하나 둡니다.
- 경로는 상대 경로로 씁니다. 로컬 절대 경로(`/Users/...`)를 넣지 않습니다.

### HTML

- `<!doctype html>`, `<html lang="ko">`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`를 항상 넣습니다.
- `header`, `nav`, `main`, `section`, `footer` 등 시맨틱 태그로 구조를 잡고, 제목은 `h1`부터 순서대로 씁니다. 페이지당 `h1`은 하나입니다.
- 모든 `img`에 `alt`를 넣습니다. 장식용 이미지는 `alt=""`로 둡니다.
- 인라인 스타일과 인라인 스크립트는 쓰지 않습니다. 컴포넌트 스타일은 `styleUrl`로 분리한 CSS 파일에, 전역 스타일은 `src/styles/`에 둡니다. Angular 빌드가 산출물에 넣는 `<style>`, `<script>`는 예외입니다.
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`로 엽니다.

### CSS

- 색상, 간격, 글꼴은 `:root`의 CSS 변수(디자인 토큰)로 정의하고 그 값을 참조합니다.
- 화면은 항상 라이트 모드입니다. `prefers-color-scheme: dark` 규칙이나 다크 모드 토큰을 만들지 않습니다.
- 모바일 우선으로 작성하고 넓은 화면은 `min-width` 미디어 쿼리로 확장합니다. 360px 너비에서 가로 스크롤이 생기지 않아야 합니다.
- 클래스 이름은 kebab-case로, 역할이 드러나게 짓습니다. 예: `.project-card`, `.project-card__title`
- `!important`와 ID 선택자 스타일링은 피합니다.

### JavaScript

- Angular 프로젝트에서는 TypeScript와 Angular API를 씁니다. 컴포넌트는 standalone, `ChangeDetectionStrategy.OnPush`, `input()` 신호 입력을 기본으로 합니다.
- 페이지 내용은 템플릿에 직접 쓰지 않고 `src/app/data/portfolio.data.ts`에서 가져옵니다.
- 브라우저 API(`window`, `IntersectionObserver` 등)는 prerender 중에 실행되지 않도록 `afterNextRender`나 `isPlatformBrowser` 안에서 씁니다.
- 직접 추가하는 스크립트는 `<script type="module" src="..."></script>` 또는 `defer`로 불러옵니다.
- `const`를 기본으로, 재할당이 필요할 때만 `let`을 씁니다. `var`는 쓰지 않습니다.
- 스크립트가 없어도 본문 내용은 읽을 수 있어야 합니다.

### 이미지와 자료

- 사진은 WebP 또는 JPG, 아이콘과 로고는 SVG를 우선 사용합니다.
- 웹에 올리는 이미지는 실제 표시 크기에 맞게 줄이고 용량을 최적화합니다.
- 이력서 PDF처럼 개인 정보가 담긴 자료는 공개 전에 노출해도 되는 내용인지 확인합니다.

### Markdown

- 문서는 한국어로 작성하고, 고유명사와 기술 이름은 원어 표기를 따릅니다.
- 제목은 `#` 하나로 시작해 단계를 건너뛰지 않습니다.
- `PORTFOLIO.md`의 내용을 바꾸면 `src/app/data/portfolio.data.ts`도 같은 커밋에서 함께 고칩니다.

## 스킬

`.claude/skills/`에 있는 스킬을 작업 종류에 맞게 사용합니다.

| 스킬 | 사용하는 경우 |
| --- | --- |
| `hallmark` | 새 페이지, 섹션, 컴포넌트의 디자인과 스타일을 만들 때 |
| `korean-writing` | 한국어 문장을 쓰거나 고칠 때 (문서, 페이지 문구, 커밋 메시지, 답변) |
| `natural-flow` | `PORTFOLIO.md`의 소개, 프로젝트 설명 같은 문단을 새로 쓰거나 다시 쓸 때 |

### hallmark

- 새로 만드는 화면에만 씁니다. 이미 만든 디자인은 사용자가 `hallmark`를 직접 지정할 때만 고칩니다 (`/hallmark redesign <경로>`, `/hallmark audit <경로>`).
- 스킬의 Floor 규칙은 예외 없이 지킵니다. 이 저장소의 CSS 규칙(디자인 토큰, 라이트 모드 고정, 360px)과 겹치는 부분은 둘 다 만족하게 작성합니다.
- `PORTFOLIO.md`에서 가운뎃점(·)으로 이은 정보(예: `마시모두띠 잠실점 · 패션 어드바이저`)를 페이지에 옮길 때는 Floor 10번에 따라 근무처와 직무를 별도 요소로 나눠 표시합니다.
- 인쇄·PDF 스타일(`@media print`)도 같은 토큰을 거쳐 색과 글꼴을 지정합니다.
- 스타일 작업을 마치면 Node가 있을 때 `node .claude/skills/hallmark/scripts/sloplint.mjs <출력 경로> --render`를 실행하고, `FAIL`은 모두 고칩니다.
- sloplint는 폴더 단위로 파일을 묶어 검사하므로 컴포넌트 CSS를 따로 검사하면 스탬프가 없다고 나옵니다. `ng build --configuration development --output-path <임시 폴더>`로 만든 산출물(`browser/`)을 검사합니다. 개발 빌드의 `styles.css`는 맨 앞에 경로 주석이 붙으므로, 검사 전에 `src/styles.css`의 스탬프 줄을 맨 앞에 붙입니다.
- `PORTFOLIO.md`의 기간 표기(`2025.03–현재`)는 데이터에 그대로 두고, 화면에서는 `app-period` 컴포넌트로 대시 글자 없이 표시합니다 (Floor 19).

### korean-writing

- 한국어로 쓰는 모든 글에 적용합니다. `PORTFOLIO.md`, 페이지 문구, `docs/`, README, 커밋 메시지, 사용자에게 보내는 답변이 모두 해당합니다.
- 문체는 스킬의 문체 표를 따릅니다. 본문과 문서는 합니다체, 표 항목은 명사형, UI 문구는 짧은 명사구입니다.
- 글을 넘기기 전에 스킬의 점검표로 번역투, 근거 없는 수식어, 지어낸 사실이 없는지 확인합니다.

### natural-flow

- 문단으로 된 글(소개, 프로젝트 설명, 안내 문단)에만 씁니다. 표 칸과 UI 문구는 `korean-writing`의 명사형 규칙을 따릅니다.
- 흐름을 먼저 `natural-flow`로 잡고, 마지막에 `korean-writing` 점검표로 문장을 다듬습니다.
- 원본에 없는 사실, 동기, 성과를 넣지 않습니다. 다시 쓴 글의 분량은 원래 길이의 ±15% 안에 둡니다.

## 확인 절차

변경을 마치면 다음을 확인합니다.

1. 브라우저에서 페이지를 열어 레이아웃과 링크가 정상인지 확인합니다.
2. 모바일 너비(360px)와 데스크톱 너비에서 모두 확인합니다.
3. 시스템을 다크 모드로 바꿔도 페이지가 라이트 모드로 보이는지 확인합니다.
4. 브라우저 콘솔에 오류가 없는지 확인합니다.
5. `npm run build && npm run export:pdf && npm run test:e2e`가 모두 통과하는지 확인합니다. 인쇄본과 PDF가 A4 2쪽 이내인지도 이 단계에서 검사합니다.
