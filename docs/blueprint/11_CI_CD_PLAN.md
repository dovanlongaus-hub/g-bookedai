# 11 — CI/CD Plan

## Branching

```txt
main        → production
develop     → staging
feature/*   → work in progress
hotfix/*    → emergency fix
```

## Pipeline

```txt
Pull request
→ lint
→ unit tests
→ build Docker image
→ security scan
→ deploy staging Cloud Run revision
→ smoke test
→ manual approval
→ deploy production with traffic split
```

## Release strategy

```txt
10% traffic → monitor → 50% → 100%
Rollback by Cloud Run revision if error rate increases.
```

## Smoke tests

- homepage loads
- login works
- booking page loads
- payment checkout starts
- API health passes
- agent returns structured response
