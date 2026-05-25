# 7주차 팀 프로젝트 - 반응형 배달 주문 사이트

멋쟁이사자처럼 14기 7주차 팀 프로젝트로 진행하는 반응형 배달 주문 사이트입니다.  
React와 Tailwind CSS를 사용하여 로그인/회원가입, 음식점 목록, 음식점 카드, 메뉴 모달, 반응형 Navbar를 구현합니다.

---

## 프로젝트 개요

본 프로젝트는 사용자가 음식점을 탐색하고, 음식점 카드를 클릭하여 메뉴 정보를 확인할 수 있는 배달 주문 사이트입니다.

과제 요구사항에 맞춰 다음 기능을 중심으로 구현합니다.

- 로그인 페이지
- 회원가입 페이지
- 회원가입 입력값 유효성 검사
- 음식점 데이터 기반 카드 렌더링
- 음식점 메뉴 모달
- 반응형 Navbar
- 반응형 Grid Layout

---

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Version Control | Git / GitHub |

---

## 프로젝트 실행 방법

### 1. Repository Clone

```bash
git clone 레포지토리주소
```

### 2. 프로젝트 폴더 이동

```bash
cd 프로젝트폴더명
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

실행 후 브라우저에서 아래 주소로 접속합니다.

```bash
http://localhost:5173
```

---

## 프로젝트 폴더 구조

```txt
src
 ┣ assets
 ┃ ┗ images
 ┃   ┗ hero.png
 ┣ components
 ┃ ┣ cart
 ┃ ┃ ┣ CartItem.jsx
 ┃ ┃ ┗ CartList.jsx
 ┃ ┣ common
 ┃ ┃ ┣ Badge.jsx
 ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┣ Input.jsx
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┗ QuantityControl.jsx
 ┃ ┣ payment
 ┃ ┃ ┣ PaymentBox.jsx
 ┃ ┃ ┗ PaymentMethodButton.jsx
 ┃ ┗ restaurant
 ┃   ┣ MenuModal.jsx
 ┃   ┗ RestaurantCard.jsx
 ┣ data
 ┃ ┗ restaurants.js
 ┣ pages
 ┃ ┣ Login.jsx
 ┃ ┣ Main.jsx
 ┃ ┗ Signup.jsx
 ┣ routes
 ┃ ┗ Router.jsx
 ┣ App.jsx
 ┣ index.css
 ┗ main.jsx
```

---

## 주요 기능

### 1. 로그인 / 회원가입 페이지

- 로그인 페이지에서 회원가입 페이지로 이동할 수 있습니다.
- 회원가입 페이지에서는 이름과 비밀번호를 입력할 수 있습니다.
- 하나의 항목이라도 입력하지 않으면 회원가입 버튼이 활성화되지 않습니다.
- 선택 기능으로 비밀번호 정규식 조건을 추가할 수 있습니다.

### 2. 메인 페이지

- 음식점 데이터를 `json` 객체 형태로 관리합니다.
- 음식점 데이터를 카드 컴포넌트에 `props`로 전달하여 렌더링합니다.
- 음식점 카드는 재사용 가능한 컴포넌트로 분리합니다.

### 3. 음식점 카드

- 음식점 이름, 카테고리, 설명, 평점, 배달 시간을 표시합니다.
- 카드를 클릭하면 해당 음식점의 메뉴 모달이 나타납니다.

### 4. 메뉴 모달

- 음식점 카드 클릭 시 메뉴 정보를 모달로 보여줍니다.
- 메뉴 모달은 별도 컴포넌트로 분리하여 관리합니다.

### 5. 반응형 Navbar

- 데스크톱 환경에서는 상단 Navigation Bar로 표시합니다.
- 모바일 환경에서는 햄버거 메뉴 형태로 표시합니다.

### 6. 반응형 Grid Layout

과제 조건에 맞춰 다음 breakpoint를 사용합니다.

```css
@theme {
  --breakpoint-ph: 402px;
  --breakpoint-dt: 1725px;
}
```

화면 크기에 따라 음식점 카드 배열이 달라집니다.

| 환경 | 카드 배열 |
|---|---|
| dt | 한 줄에 4개 |
| ph | 한 줄에 1개 |

---

## 팀원 역할 분담

| 이름 | 브랜치 | 담당 기능 |
|---|---|---|
| 이남혁 | lnh | 초기 세팅, PR 병합, 공통 구조 관리, Navbar / 메뉴 모달 / 공통 컴포넌트 |
| 한정후 | hjh | 로그인 / 회원가입 페이지, 입력값 유효성 검사 |
| 조민서 | cms | 메인 페이지, 음식점 데이터, 음식점 카드 컴포넌트, 반응형 Grid |

---

## Git 협업 규칙

### 1. main 브랜치 직접 작업 금지

`main` 브랜치는 제출 가능한 상태로 유지합니다.  
각자 개인 브랜치에서 작업한 뒤 Pull Request를 생성합니다.

### 2. 작업 전 main 최신화

```bash
git checkout main
git pull origin main
```

### 3. 개인 브랜치 생성

```bash
git checkout -b 본인이니셜
```

예시:

```bash
git checkout -b lnh
git checkout -b hjh
git checkout -b cms
```

### 4. 작업 후 커밋

```bash
git add .
git commit -m "feat: 작업 내용"
```

### 5. 원격 브랜치 push

```bash
git push origin 본인이니셜
```

예시:

```bash
git push origin lnh
git push origin hjh
git push origin cms
```

### 6. Pull Request 생성

GitHub에서 개인 브랜치에서 `main` 브랜치로 Pull Request를 생성합니다.  
PR 확인 후 병합 담당자가 `main` 브랜치에 merge합니다.

---

## 커밋 컨벤션

| 타입 | 의미 |
|---|---|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| style | CSS, UI 스타일 수정 |
| refactor | 코드 리팩토링 |
| chore | 세팅, 폴더 구조, 패키지 설치 등 |
| docs | 문서 수정 |
| remove | 파일 또는 코드 삭제 |

### 커밋 예시

```bash
git commit -m "chore: 프로젝트 초기 세팅"
git commit -m "docs: README 작성"
git commit -m "feat: 회원가입 페이지 구현"
git commit -m "feat: 음식점 카드 컴포넌트 구현"
git commit -m "feat: 메뉴 모달 컴포넌트 구현"
git commit -m "style: 메인 페이지 반응형 grid 적용"
```

---

## 브랜치 목록

```txt
main
lnh
hjh
cms
```

---

## 구현 체크리스트

### 필수 기능

- [ ] 로그인 페이지 구현
- [ ] 회원가입 페이지 구현
- [ ] 회원가입 버튼 이동 구현
- [ ] 이름 / 비밀번호 입력 구현
- [ ] 입력값 유효성 검사 구현
- [ ] 음식점 json 데이터 생성
- [ ] 음식점 카드 컴포넌트 구현
- [ ] props 기반 음식점 카드 렌더링
- [ ] 음식점 메뉴 모달 컴포넌트 구현
- [ ] 반응형 Navbar 구현
- [ ] dt 환경 카드 4개 배열 구현
- [ ] ph 환경 카드 1개 배열 구현

### 선택 기능

- [ ] 디자인 시스템 정리
- [ ] 비밀번호 정규식 검사 구현
- [ ] 최소 8자, 최대 16자 조건 구현
- [ ] 영문, 숫자, 특수문자 포함 조건 구현

---

## 제출 내용

최종 제출 시 아래 항목을 포함합니다.

- 구현 화면 캡처본
- GitHub Repository 링크

---

## Git 작업 흐름

본 프로젝트는 개인 브랜치에서 작업한 뒤 Pull Request를 통해 `main` 브랜치에 병합합니다.

---

### 1. 작업 전 main 최신화

작업을 시작하기 전에 항상 `main` 브랜치를 최신 상태로 맞춥니다.

```bash
git checkout main
git pull origin main
```

---

### 2. 개인 브랜치로 이동

본인 브랜치가 이미 있다면 해당 브랜치로 이동합니다.

```bash
git checkout lnh
```

브랜치가 없다면 새로 생성합니다.

```bash
git checkout -b lnh
```

팀원별 브랜치명은 다음과 같습니다.

```txt
이남혁: lnh
한정후: hjh
조민서: cms
```

---

### 3. 작업 진행 후 커밋

작업이 끝나면 변경된 파일을 확인합니다.

```bash
git status
```

변경사항을 스테이징하고 커밋합니다.

```bash
git add .
git commit -m "feat: 작업 내용"
```

커밋 메시지는 작업 내용에 맞게 작성합니다.

```bash
git commit -m "feat: 로그인 페이지 구현"
git commit -m "feat: 음식점 카드 컴포넌트 구현"
git commit -m "style: 반응형 레이아웃 적용"
git commit -m "docs: README 수정"
```

---

### 4. 개인 브랜치 push

작업한 개인 브랜치를 GitHub에 push합니다.

```bash
git push origin 브랜치명
```

예시:

```bash
git push origin lnh
git push origin hjh
git push origin cms
```

---

### 5. Pull Request 생성

GitHub에서 개인 브랜치에서 `main` 브랜치로 Pull Request를 생성합니다.

```txt
base repository: 원본 레포지토리
base branch: main

compare branch: 본인 브랜치
```

Fork 방식으로 작업하는 경우에는 Pull Request 방향을 반드시 확인합니다.

```txt
base repository: 이남혁 원본 레포지토리
base branch: main

head repository: 본인 fork 레포지토리
compare branch: 본인 브랜치
```

---

### 6. Pull Request 병합

PR 병합 담당자가 코드를 확인한 뒤 GitHub에서 `Merge Pull Request`를 진행합니다.

PR이 병합되면 GitHub의 `main` 브랜치에 작업 내용이 반영됩니다.

---

### 7. PR 병합 후 로컬 main 최신화

GitHub에서 PR이 병합된 뒤에는 로컬 `main` 브랜치도 최신화해야 합니다.

```bash
git checkout main
git pull origin main
```

이 과정을 통해 GitHub의 최신 `main` 내용이 내 로컬에도 반영됩니다.

---

### 8. 다음 작업 시작 전 브랜치 최신화

다음 작업을 시작할 때는 다시 `main`을 최신화한 뒤 개인 브랜치에 반영합니다.

```bash
git checkout main
git pull origin main
git checkout 본인브랜치명
git merge main
```

예시:

```bash
git checkout main
git pull origin main
git checkout lnh
git merge main
```

---

## 주의사항

- `main` 브랜치에서 직접 작업하지 않습니다.
- 기능 단위로 커밋을 나눕니다.
- PR을 만들 때 `base branch`가 `main`인지 확인합니다.
- Fork 방식에서는 PR 방향이 원본 레포지토리의 `main`으로 향하는지 확인합니다.
- GitHub에서 PR을 merge했다면 로컬에서 `git merge main lnh` 같은 명령어는 실행하지 않습니다.
- PR 병합 후에는 반드시 `git checkout main` 후 `git pull origin main`을 실행해 로컬 main을 최신화합니다.
