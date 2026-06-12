# Wedding Credits

> Our Story Begins Here.

모바일 웨딩 청첩장 + 방명록 + 엔딩 크레딧.  
**Supabase 무료 플랜** + **GitHub Pages** 정적 배포.

## 기술 스택

- React + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Supabase (guestbook)
- GitHub Pages (Actions 자동 배포)

## 로컬 개발

```bash
npm install
cp .env.example .env   # Supabase 키 입력 (선택)
npm run dev
```

Supabase 미설정 시 방명록은 **브라우저 localStorage**에 저장됩니다.

## Supabase 설정 (무료 플랜)

1. [supabase.com](https://supabase.com) 에서 프로젝트 생성
2. **SQL Editor** 에서 `supabase/guestbook.sql` 실행
3. **Project Settings → API** 에서 URL, `anon` key 복사
4. `.env` 파일에 입력:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### RLS 정책 요약

| 작업 | 권한 |
|------|------|
| SELECT | 누구나 (anon) |
| INSERT | 누구나 (anon), 이름 1~50자, 메시지 500자 이하 |
| UPDATE/DELETE | 불가 |

`anon` key는 클라이언트에 노출되어도 됩니다. RLS로 쓰기 범위가 제한됩니다.

## GitHub Pages 배포

### 1. 저장소 생성 & 푸시

```bash
git init
git add .
git commit -m "feat: Wedding Credits 초기 구현"
git remote add origin https://github.com/USERNAME/invite.git
git push -u origin main
```

### 2. base 경로 수정

저장소 이름이 `invite`가 아니면 `vite.config.ts`의 base 경로를 변경:

```ts
base: process.env.GITHUB_PAGES === 'true' ? '/YOUR-REPO-NAME/' : '/',
```

### 3. GitHub Secrets 등록

**Settings → Secrets and variables → Actions** 에 추가:

| Secret | 값 |
|--------|-----|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |

### 4. Pages 활성화

**Settings → Pages → Build and deployment → Source: GitHub Actions**

`main` 브랜치에 push하면 자동 배포됩니다.

배포 URL: `https://USERNAME.github.io/invite/`

## 커스터마이징

`src/config/wedding.ts` 에서 커플 이름, 날짜, 장소, 계좌, 이미지 등을 수정하세요.

## 프로젝트 구조

```
src/
├── config/wedding.ts      # 웨딩 정보 설정
├── lib/supabase.ts        # Supabase + localStorage 폴백
├── hooks/useGuestbook.ts
├── components/
│   ├── layout/            # Header, BottomNav, ScrollProgress
│   ├── sections/          # Hero, Invitation, Gallery, ...
│   └── credits/           # Guestbook, End Credits, 별자리
```
